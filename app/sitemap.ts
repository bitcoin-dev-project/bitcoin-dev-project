import { MetadataRoute } from "next"
import { allTopics } from "contentlayer/generated"
import siteMetadata from "@/data/siteMetadata"

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = siteMetadata.siteUrl
    const topicRoutes = allTopics
        .filter((post) => !post.draft)
        .map((post) => ({
            url: `${siteUrl}/${post.path}`,
            lastModified: post.lastmod || post.date
        }))

    const routes = [
        "",
        "learn",
        "career",
        "good-first-issues",
        "projects",
        "tools",
        "bitcoin-core",
        "lightning-open-source"
    ].map((route) => ({
        url: `${siteUrl}/${route}`,
        lastModified: new Date().toISOString().split("T")[0]
    }))

    return [...routes, ...topicRoutes]
}
