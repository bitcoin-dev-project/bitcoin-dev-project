import { allTopics, Topic, Authors, allAuthors } from "contentlayer/generated"
import { notFound } from "next/navigation"
import { coreContent, CoreContent } from "pliny/utils/contentlayer"

export function getAuthorDetails(authorList: string[]): CoreContent<Authors>[] {
    return authorList
        .map((author) => {
            const authorResults = allAuthors.find((p) => p.slug === author)
            return authorResults ? coreContent(authorResults) : null
        })
        .filter((author): author is CoreContent<Authors> => author !== null)
}

interface TopicTreeNode {
    topic: Topic
    children: TopicTreeNode[]
}

function buildTopicTree(topics: Topic[]): TopicTreeNode[] {
    const topicMap = new Map<string, TopicTreeNode>()
    const rootNodes: TopicTreeNode[] = []

    topics.forEach((topic) => {
        topicMap.set(topic.slug, { topic, children: [] })
    })

    topics.forEach((topic) => {
        const node = topicMap.get(topic.slug)!
        if (topic.parent) {
            const parentNode = topicMap.get(topic.parent)
            if (parentNode) {
                parentNode.children.push(node)
            }
        } else {
            rootNodes.push(node)
        }
    })

    const sortNodes = (nodes: TopicTreeNode[]) => {
        nodes.sort((a, b) => (a.topic.order || 0) - (b.topic.order || 0))
        nodes.forEach((node) => sortNodes(node.children))
    }
    sortNodes(rootNodes)

    return rootNodes
}

function findTopicInTree(
    slug: string,
    nodes: TopicTreeNode[]
): TopicTreeNode | null {
    for (const node of nodes) {
        if (node.topic.slug === slug) return node
        const found = findTopicInTree(slug, node.children)
        if (found) return found
    }
    return null
}

function findNextTopic(
    current: TopicTreeNode,
    nodes: TopicTreeNode[]
): TopicTreeNode | null {
    const index = nodes.findIndex(
        (node) => node.topic.slug === current.topic.slug
    )

    // First, check if there are any children
    if (current.children.length > 0) {
        return current.children[0]
    }

    // If no children, look for the next sibling
    if (index < nodes.length - 1) {
        return nodes[index + 1]
    }

    // If no next sibling, go up to the parent and find its next sibling
    if (current.topic.parent) {
        const parentNode = findTopicInTree(current.topic.parent, topicTree)
        if (parentNode) {
            return findNextTopic(parentNode, topicTree)
        }
    }

    return null
}

function findPrevTopic(
    current: TopicTreeNode,
    nodes: TopicTreeNode[]
): TopicTreeNode | null {
    const index = nodes.findIndex(
        (node) => node.topic.slug === current.topic.slug
    )

    if (index > 0) {
        // Get the previous sibling
        let prevSibling = nodes[index - 1]
        // If the previous sibling has children, get its last descendant
        while (prevSibling.children.length > 0) {
            prevSibling = prevSibling.children[prevSibling.children.length - 1]
        }
        return prevSibling
    }

    // If this is the first sibling, return the parent
    if (current.topic.parent) {
        return findTopicInTree(current.topic.parent, topicTree)
    }

    return null
}

const topicTree = buildTopicTree(allTopics)
export function getTopicData(slug: string): {
    prev: { path: string; title: string }
    next: { path: string; title: string }
    post: Topic
    authorDetails: CoreContent<Authors>[]
    mainContent: CoreContent<Topic>
    jsonLd: any
} {
    const postNode = findTopicInTree(slug, topicTree)

    if (!postNode) {
        notFound()
    }

    const post = postNode.topic
    const parentNode = post.parent
        ? findTopicInTree(post.parent, topicTree)
        : null
    const siblings = parentNode ? parentNode.children : topicTree

    const nextTopic = findNextTopic(postNode, siblings)
    const prevTopic = findPrevTopic(postNode, siblings)

    const prev = nextTopic
        ? {
              path: `topics/${nextTopic.topic.slug}`,
              title: nextTopic.topic.title
          }
        : undefined
    const next = prevTopic
        ? {
              path: `topics/${prevTopic.topic.slug}`,
              title: prevTopic.topic.title
          }
        : undefined

    const authorList = post.authors || ["default"]
    const authorDetails = getAuthorDetails(authorList)
    const mainContent = coreContent(post)
    const jsonLd = post.structuredData
    jsonLd["author"] = authorDetails.map((author) => ({
        "@type": "Person",
        name: author.name
    }))

    return {
        prev,
        next,
        post,
        authorDetails,
        mainContent,
        jsonLd
    }
}

export function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ")
}
