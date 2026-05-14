import { MetadataRoute } from "next"
import { allTopics } from "contentlayer/generated"
import siteMetadata from "@/data/siteMetadata"
import { getAllCommunities } from "@/lib/utils/communities"

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = siteMetadata.siteUrl
    const topicRoutes = allTopics
        .filter((post) => !post.draft)
        .map((post) => ({
            url: `${siteUrl}/${post.path}`,
            lastModified: post.lastmod || post.date
        }))

    const communityRoutes = getAllCommunities().map((community) => ({
        url: `${siteUrl}/decoding/communities/${community.id}`,
        lastModified: community.currentCohort.endDate
    }))

    const routes = [
        "",
        "decoding",
        "about",
        "explainers",
        "learn",
        "contribute",
        "get-funded",
        "decoding/communities",
        "good-first-issues",
        "projects",
        "tools",
        "bitcoin-core",
        "lightning-open-source"
    ].map((route) => ({
        url: `${siteUrl}/${route}`,
        lastModified: new Date().toISOString().split("T")[0]
    }))

    return [...routes, ...topicRoutes, ...communityRoutes]
}
