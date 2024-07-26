import "css/prism.css"
import "katex/dist/katex.css"

import { MDXLayoutRenderer } from "pliny/mdx-components"
import {
    sortPosts,
    coreContent,
    allCoreContent
} from "pliny/utils/contentlayer"
import { allTopics, allAuthors } from "contentlayer/generated"
import type { Authors, Topic } from "contentlayer/generated"
import { notFound } from "next/navigation"
import TopicLayout from "@/components/bitcoin-topics/layouts/TopicLayout"
import { components } from "@/components/bitcoin-topics/markdown-ui/MDXComponents"
import { Metadata } from "next"
import siteMetadata from "@/data/siteMetadata"
import { getAuthorDetails } from "@/utils/content-utils"

export async function generateMetadata({
    params
}: {
    params: { slug: string[] }
}): Promise<Metadata | undefined> {
    const slug = decodeURI(params.slug.join("/"))
    const post = allTopics.find((p) => p.slug === slug)
    const authorList = post?.authors || ["default"]
    const authorDetails = getAuthorDetails(authorList)
    if (!post) {
        return
    }

    const publishedAt = new Date(post.date).toISOString()
    const modifiedAt = new Date(post.lastmod || post.date).toISOString()
    const authors = authorDetails.map((author) => author.name)
    let imageList = [siteMetadata.socialBanner]
    if (post.images) {
        imageList =
            typeof post.images === "string" ? [post.images] : post.images
    }
    const ogImages = imageList.map((img) => {
        return {
            url: img.includes("http") ? img : siteMetadata.siteUrl + img
        }
    })

    return {
        title: post.title,
        description: post.summary,
        openGraph: {
            title: post.title,
            description: post.summary,
            siteName: siteMetadata.title,
            locale: "en_US",
            type: "article",
            publishedTime: publishedAt,
            modifiedTime: modifiedAt,
            url: "./",
            images: ogImages,
            authors: authors.length > 0 ? authors : [siteMetadata.author]
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.summary,
            images: imageList
        }
    }
}

export const generateStaticParams = async () => {
    const paths = allTopics.map((p) => ({ slug: p.slug.split("/") }))

    return paths
}

export default async function Page({ params }: { params: { slug: string[] } }) {
    const slug = decodeURI(params.slug.join("/"))
    // Filter out drafts in production
    const sortedCoreContents = allCoreContent(sortPosts(allTopics))
    const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
    if (postIndex === -1) {
        return notFound()
    }

    const prev = sortedCoreContents[postIndex + 1]
    const next = sortedCoreContents[postIndex - 1]
    const post = allTopics.find((p) => p.slug === slug) as Topic
    const authorList = post?.authors || ["default"]
    const authorDetails = getAuthorDetails(authorList)
    const mainContent = coreContent(post)
    const jsonLd = post.structuredData
    jsonLd["author"] = authorDetails.map((author) => {
        return {
            "@type": "Person",
            name: author.name
        }
    })

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <TopicLayout
                content={mainContent}
                authorDetails={authorDetails}
                next={next}
                prev={prev}
            >
                <MDXLayoutRenderer
                    code={post.body.code}
                    components={components}
                    toc={post.toc}
                />
            </TopicLayout>
        </>
    )
}
