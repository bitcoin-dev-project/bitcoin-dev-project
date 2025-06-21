/** @type {import('next').NextConfig} */
const { withContentlayer } = require("next-contentlayer2")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true"
})

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
    const plugins = [withContentlayer, withBundleAnalyzer]
    return plugins.reduce((acc, next) => next(acc), {
        reactStrictMode: true,
        pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
        eslint: {
            dirs: ["app", "components", "layouts", "scripts"]
        },
        images: {
            domains: ["avatars.githubusercontent.com"]
        },
        async rewrites() {
            return [
                // Handle Next.js Image optimization for grants app assets
                {
                    source: "/_next/image",
                    destination:
                        "https://grant-common-app.vercel.app/_next/image",
                    has: [
                        {
                            type: "query",
                            key: "url",
                            value: "(/logos/.*|/grants/.*)"
                        }
                    ]
                },
                // Strip /grants prefix when forwarding to grants app
                {
                    source: "/grants/_next/:path*",
                    destination:
                        "https://grant-common-app.vercel.app/_next/:path*"
                },
                {
                    source: "/grants/logos/:path*",
                    destination:
                        "https://grant-common-app.vercel.app/logos/:path*"
                },
                {
                    source: "/grants/:path*",
                    destination: "https://grant-common-app.vercel.app/:path*"
                },
                {
                    source: "/grants",
                    destination: "https://grant-common-app.vercel.app/"
                }
            ]
        }
    })
}
