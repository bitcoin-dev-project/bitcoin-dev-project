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
        transpilePackages: ["@bitcoin-dev-project/bdp-ui"],
        experimental: {
            optimizePackageImports: ["react-icons"]
        },
        pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
        eslint: {
            dirs: ["app", "components", "layouts", "scripts"]
        },
        images: {
            formats: ["image/avif", "image/webp"],
            domains: ["avatars.githubusercontent.com"]
        },
        async redirects() {
            return [
                {
                    source: "/blog/20251202_GlowUp",
                    destination:
                        "https://medium.com/@bitcoindevs/glow-up-95008146d653",
                    permanent: false
                },
                {
                    source: "/explore",
                    destination: "/learn",
                    permanent: true
                }
            ]
        }
    })
}
