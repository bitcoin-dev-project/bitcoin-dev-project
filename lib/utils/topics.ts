import { allTopics } from "contentlayer/generated"

export const getTopicBySlug = (slug: string) => {
    return allTopics.find((topic) => topic.slug === slug)
}

export const getTopicAndChildren = (slug: string) => {
    const topic = getTopicBySlug(slug)
    if (!topic) return null

    const children = topic.children
        ? topic.children
              .map((childSlug) => getTopicBySlug(childSlug))
              .filter(Boolean)
        : []

    return {
        topic,
        children
    }
}
