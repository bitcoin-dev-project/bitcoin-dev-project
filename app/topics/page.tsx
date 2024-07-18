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
import PostBDP from "@/components/bitcoin-topics/layouts/PostBDP"
import { components } from "@/components/bitcoin-topics/markdown-ui/MDXComponents"
import { genPageMetadata } from "../seo"

export const metadata = genPageMetadata({
    title: "Bitcoin Topics",
    keywords:
        "bitcoin, bitcoin topics, bitcoin privacy, bitcoin grant, open source, tools, bitcoin resources, bitcoin tools, career, good first issues, bitcoin development, bitcoin topics",

    description:
        "Simplifying bitcoin tech to help you learn as efficiently as possible",
    openGraph: {
        images: [
            {
                url: "https://bitcoindevs.xyz/images/pages-thumbnails/topics.png",
                alt: "Bitcoin career"
            }
        ],
        title: "Bitcoin Topics",
        url: "https://bitcoindevs.xyz/topics",
        type: "website",
        description:
            "Simplifying bitcoin tech to help you learn as efficiently as possible"
    },
    twitter: {
        images: ["https://bitcoindevs.xyz/images/pages-thumbnails/topics.png"],
        card: "summary_large_image",
        title: "Bitcoin Topics",
        creator: "@Bitcoin_Devs",
        description:
            "Simplifying bitcoin tech to help you learn as efficiently as possible"
    }
})

// Default page to display in home page for topics
const slug = "segwit"

export default async function Page() {
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
    const authorDetails = authorList.map((author) => {
        const authorResults = allAuthors.find((p) => p.slug === author)
        return coreContent(authorResults as Authors)
    })
    const mainContent = coreContent(post)
    const jsonLd = post.structuredData
    jsonLd["author"] = authorDetails.map((author) => {
        return {
            "@type": "Person",
            name: author.name
        }
    })

    const Layout = PostBDP

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Layout
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
            </Layout>
        </>
    )
}
