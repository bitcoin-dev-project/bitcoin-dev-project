import { defineDocumentType, ComputedFields } from "contentlayer2/source-files"
import { makeSource } from "contentlayer2/source-files"

import { writeFileSync } from "fs"
import readingTime from "reading-time"
import { slug } from "github-slugger"
import path from "path"
// Remark packages
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import {
    remarkExtractFrontmatter,
    remarkCodeTitles,
    remarkImgToJsx,
    extractTocHeadings
} from "pliny/mdx-plugins/index.js"
// Rehype packages
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypeCitation from "rehype-citation"
import rehypePrismPlus from "rehype-prism-plus"
import rehypePresetMinify from "rehype-preset-minify"
import siteMetadata from "./data/siteMetadata"

const root = process.cwd()
const isProduction = process.env.NODE_ENV === "production"

const computedFields: ComputedFields = {
    readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
    slug: {
        type: "string",
        resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, "")
    },
    path: {
        type: "string",
        resolve: (doc) => doc._raw.flattenedPath
    },
    filePath: {
        type: "string",
        resolve: (doc) => doc._raw.sourceFilePath
    },
    toc: { type: "string", resolve: (doc) => extractTocHeadings(doc.body.raw) }
}

export const Topic = defineDocumentType(() => ({
    name: "Topic",
    filePathPattern: "topics/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: { type: "string", required: true },
        date: { type: "date", required: true },
        tags: { type: "list", of: { type: "string" }, default: [] },
        lastmod: { type: "date" },
        draft: { type: "boolean" },
        featured: { type: "boolean" },
        summary: { type: "string" },
        thumbnail: { type: "string" },
        images: { type: "json" },
        authors: { type: "list", of: { type: "string" } },
        layout: { type: "string" },
        bibliography: { type: "string" },
        canonicalUrl: { type: "string" },
        relatedtopics: { type: "list", of: { type: "string" } }
    },
    computedFields: {
        ...computedFields,
        structuredData: {
            type: "json",
            resolve: (doc) => ({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: doc.title,
                datePublished: doc.date,
                dateModified: doc.lastmod || doc.date,
                description: doc.summary,
                image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
                url: `${siteMetadata.siteUrl}/topics/${doc._raw.flattenedPath}`
            })
        }
    }
}))

export const Authors = defineDocumentType(() => ({
    name: "Authors",
    filePathPattern: "authors/**/*.mdx",
    contentType: "mdx",
    fields: {
        name: { type: "string", required: true },
        nym: { type: "string" },
        avatar: { type: "string" },
        occupation: { type: "string" },
        company: { type: "string" },
        email: { type: "string" },
        twitter: { type: "string" },
        nostr: { type: "string" },
        linkedin: { type: "string" },
        github: { type: "string" },
        layout: { type: "string" },
        volunteer: { type: "boolean" }
    },
    computedFields
}))

/**
 * Count the occurrences of all tags across topics and write to json file
 */
function createTagCount(allTopics: any[]) {
    const tagCount: Record<string, number> = {}
    allTopics.forEach((file) => {
        if (file.tags && (!isProduction || file.draft !== true)) {
            file.tags.forEach((tag: string) => {
                // Explicitly specify the type of 'tag' as 'string'
                const formattedTag = slug(tag)
                if (formattedTag in tagCount) {
                    tagCount[formattedTag] += 1
                } else {
                    tagCount[formattedTag] = 1
                }
            })
        }
    })
    writeFileSync("./app/tag-data.json", JSON.stringify(tagCount))
}

export default makeSource({
    contentDirPath: "public/bitcoin-topics",
    contentDirInclude: ["topics", "authors"],
    documentTypes: [Topic, Authors],
    disableImportAliasWarning: true,
    mdx: {
        cwd: process.cwd(),
        remarkPlugins: [
            remarkExtractFrontmatter,
            remarkGfm,
            remarkCodeTitles,
            remarkMath,
            remarkImgToJsx
        ],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypeAutolinkHeadings,
                {
                    behavior: "prepend",
                    headingProperties: {
                        className: ["content-header"]
                    }
                }
            ],
            rehypeKatex,
            [
                rehypeCitation,
                { path: path.join(root, "public/bitcoin-topics") }
            ],
            [rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
            rehypePresetMinify
        ]
    },
    onSuccess: async (importData) => {
        const { allTopics } = await importData()
        createTagCount(allTopics)
    }
})
