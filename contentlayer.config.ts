import { defineDocumentType, ComputedFields } from "contentlayer2/source-files"
import { spawn } from "node:child_process"
import { makeSource } from "contentlayer2/source-remote-files"

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
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js"

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

export const Blog = defineDocumentType(() => ({
    name: "Blog",
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
                url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`
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

const syncContentFromGit = async (contentDir: string) => {
    const syncRun = async () => {
        const gitUrl = "https://github.com/jrakibi/glossary"
        await runBashCommand(`
      if [ -d  "${contentDir}" ];
        then
          cd "${contentDir}"; git pull;
        else
          git clone --depth 1 --single-branch ${gitUrl} ${contentDir};
      fi
    `)
    }

    let wasCancelled = false
    let syncInterval: any

    const syncLoop = async () => {
        console.log("Syncing content files from git")

        await syncRun()

        if (wasCancelled) return

        syncInterval = setTimeout(syncLoop, 1000 * 60)
    }

    // Block until the first sync is done
    await syncLoop()

    return () => {
        wasCancelled = true
        clearTimeout(syncInterval)
    }
}

const runBashCommand = (command: string) =>
    new Promise((resolve, reject) => {
        const child = spawn(command, [], { shell: true })

        child.stdout.setEncoding("utf8")
        child.stdout.on("data", (data) => process.stdout.write(data))

        child.stderr.setEncoding("utf8")
        child.stderr.on("data", (data) => process.stderr.write(data))

        child.on("close", function (code) {
            if (code === 0) {
                resolve(void 0)
            } else {
                reject(new Error(`Command failed with exit code ${code}`))
            }
        })
    })

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(allBlogs: any[]) {
    const tagCount: Record<string, number> = {}
    allBlogs.forEach((file) => {
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

// function createSearchIndex(allBlogs: any[]) {
//   if (
//     siteMetadata?.search?.provider === 'kbar' &&
//     siteMetadata.search.kbarConfig.searchDocumentsPath
//   ) {
//     writeFileSync(
//       `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
//       JSON.stringify(allCoreContent(sortPosts(allBlogs)))
//     )
//     console.log('Local search index generated...')
//   }
// }

export default makeSource({
    syncFiles: syncContentFromGit,
    contentDirPath: "public/glossary-repo",
    contentDirInclude: ["topics", "authors"],
    documentTypes: [Blog, Authors],
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
            [rehypeCitation, { path: path.join(root, "data") }],
            [rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
            rehypePresetMinify
        ]
    },
    onSuccess: async (importData) => {
        const { allBlogs } = await importData()
        createTagCount(allBlogs)
        // createSearchIndex(allBlogs)
    }
})
