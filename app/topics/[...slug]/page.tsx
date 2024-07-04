import "katex/dist/katex.css"

import { MDXLayoutRenderer } from "pliny/mdx-components"
import {
    sortPosts,
    coreContent,
    allCoreContent
} from "pliny/utils/contentlayer"
import { allBlogs, allAuthors } from "contentlayer/generated"
import type { Authors, Blog } from "contentlayer/generated"
import { Metadata } from "next"
import siteMetadata from "@/data/siteMetadata"
import { notFound } from "next/navigation"
import PostBDP from "@/components/topics/topics/glossary/layouts/PostBDP"
import { components } from "@/components/topics/topics/glossary/markdown-ui/MDXComponents"

export default async function Page({ params }: { params: { slug: string[] } }) {
    const slug = decodeURI(params.slug.join("/"))
    // Filter out drafts in production
    const sortedCoreContents = allCoreContent(sortPosts(allBlogs))
    const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
    if (postIndex === -1) {
        return notFound()
    }

    const prev = sortedCoreContents[postIndex + 1]
    const next = sortedCoreContents[postIndex - 1]
    const post = allBlogs.find((p) => p.slug === slug) as Blog
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

    // const Layout = layouts[post.layout || defaultLayout]
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