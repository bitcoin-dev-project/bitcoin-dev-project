import "css/prism.css"
import "katex/dist/katex.css"

import { MDXLayoutRenderer } from "pliny/mdx-components"
import { allTopics } from "contentlayer/generated"
import TopicLayout from "@/components/decoding-bitcoin/layouts/TopicLayout"
import { components } from "@/components/decoding-bitcoin/markdown-ui/MDXComponents"
import siteMetadata from "@/data/siteMetadata"
import { getAuthorDetails, getTopicData } from "@/utils/content-utils"
import TopicBanner from "@/components/decoding-bitcoin/layouts/TopicBanner"
import FullWidthLayout from "@/components/decoding-bitcoin/layouts/FullWidthLayout"

const defaultLayout = "TopicLayout"
const layouts = {
    TopicLayout,
    TopicBanner,
    FullWidthLayout
}
type LayoutKey = keyof typeof layouts

export async function generateMetadata({
    params
}: {
    params: { slug: string[] }
}) {
    const slug = decodeURI(params.slug.join("/"))
    const post = allTopics.find((p) => p.slug === slug)
    if (!post) return

    const authorDetails = getAuthorDetails(post.authors || ["default"])
    const authors = authorDetails.map((author) => author.name)

    const imageList = [].concat(
        post.images?.length > 0 ? post.images : siteMetadata.socialBanner
    )
    const ogImages = imageList.map((img: string) => ({
        url: img.includes("http") ? img : siteMetadata.siteUrl + img
    }))

    return {
        title: post.title,
        description: post.summary,
        openGraph: {
            title: post.title,
            description: post.summary,
            siteName: siteMetadata.title,
            locale: "en_US",
            type: "article",
            publishedTime: new Date(post.date).toISOString(),
            modifiedTime: new Date(post.lastmod || post.date).toISOString(),
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
    return allTopics.map((p) => ({ slug: p.slug.split("/") }))
}

export default async function Page({ params }: { params: { slug: string[] } }) {
    const slug = decodeURI(params.slug.join("/"))
    const { prev, next, post, authorDetails, mainContent, jsonLd } =
        getTopicData(slug)

    const Layout = layouts[(post.layout as LayoutKey) || defaultLayout]

    return (
        <div className="scroll-smooth">
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
        </div>
    )
}
