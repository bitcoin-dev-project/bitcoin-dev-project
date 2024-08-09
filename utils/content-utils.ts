import { allTopics, Topic } from "@/.contentlayer/generated"
import { allAuthors } from "contentlayer/generated"
import { Authors } from "contentlayer/generated"
import { notFound } from "next/navigation"
import {
    sortPosts,
    coreContent,
    allCoreContent
} from "pliny/utils/contentlayer"

export function getAuthorDetails(authorList: string[]) {
    return authorList.map((author) => {
        const authorResults = allAuthors.find((p) => p.slug === author)
        return coreContent(authorResults as Authors)
    })
}

export function getTopicData(slug: string) {
    const sortedCoreContents = allCoreContent(sortPosts(allTopics))
    const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)

    if (postIndex === -1) {
        notFound()
    }

    const prev = sortedCoreContents[postIndex + 1]
    const next = sortedCoreContents[postIndex - 1]
    const post = allTopics.find((p) => p.slug === slug) as Topic
    const authorList = post?.authors || ["default"]
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
