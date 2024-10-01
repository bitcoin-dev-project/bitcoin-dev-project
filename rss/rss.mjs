import { writeFileSync, mkdirSync } from "fs"
import { escape } from "pliny/utils/htmlEscaper.js"
import siteMetadata from "../data/siteMetadata.js"
import { allTopics } from "../.contentlayer/generated/index.mjs"
import { sortPosts } from "pliny/utils/contentlayer.js"

const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/learn/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${config.siteUrl}/learn/${post.slug}</link>
    ${post.summary ? `<description>${escape(post.summary)}</description>` : ""}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.author}</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join("")}
  </item>
`

const generateRss = (config, posts, page = "feed.xml") => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}/learn</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.author}</managingEditor>
      <webMaster>${config.author}</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join("")}
    </channel>
  </rss>
`

async function generateRSS(config, allTopics, page = "feed.xml") {
    const publishPosts = allTopics.filter((post) => post.draft !== true)
    debugger
    if (publishPosts.length > 0) {
        const rss = generateRss(config, sortPosts(publishPosts))
        writeFileSync(`./public/${page}`, rss)
    }
}

const rss = () => {
    generateRSS(siteMetadata, allTopics)
    console.log("RSS feed generated...")
}
export default rss
