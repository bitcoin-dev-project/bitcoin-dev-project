import "css/prism.css"
import "katex/dist/katex.css"

import { MDXLayoutRenderer } from "pliny/mdx-components"
import TopicLayout from "@/components/bitcoin-topics/layouts/TopicLayout"
import { components } from "@/components/bitcoin-topics/markdown-ui/MDXComponents"
import { genPageMetadata } from "../seo"
import { getTopicData } from "@/utils/content-utils"

export const metadata = genPageMetadata({
    title: "Decoding Bitcoin",
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
        title: "Decoding Bitcoin",
        url: "https://bitcoindevs.xyz/learn",
        type: "website",
        description:
            "Simplifying bitcoin tech to help you learn as efficiently as possible"
    },
    twitter: {
        images: ["https://bitcoindevs.xyz/images/pages-thumbnails/topics.png"],
        card: "summary_large_image",
        title: "Decoding Bitcoin",
        creator: "@Bitcoin_Devs",
        description:
            "Simplifying bitcoin tech to help you learn as efficiently as possible"
    }
})

// Default page to display in home page for topics
const slug = "1-welcome"

export default async function Page() {
    const { prev, next, post, authorDetails, mainContent, jsonLd } =
        getTopicData(slug)

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
