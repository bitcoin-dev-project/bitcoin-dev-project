import siteMetadata from "@/data/siteMetadata"

import Footer from "@/components/topics/topics/footer"
import NavBar from "@/components/topics/topics/nav-bar"
import type { Metadata } from "next"
import "./globals.css"
import "remixicon/fonts/remixicon.css"
import Fonts, { barlow } from "@/components/topics/topics/font"

export const metadata: Metadata = {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
        default: siteMetadata.title,
        template: `%s | ${siteMetadata.title}`
    },
    description: siteMetadata.description,
    openGraph: {
        title: siteMetadata.title,
        description: siteMetadata.description,
        url: "./",
        siteName: siteMetadata.title,
        images: [siteMetadata.socialBanner],
        locale: "en_US",
        type: "website"
    },
    alternates: {
        canonical: "./",
        types: {
            "application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`
        }
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1
        }
    },
    twitter: {
        title: siteMetadata.title,
        card: "summary_large_image",
        images: [siteMetadata.socialBanner]
    }
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang={siteMetadata.language}
            className={`scroll-smooth`}
            suppressHydrationWarning
        >
            <link
                rel="apple-touch-icon"
                sizes="76x76"
                href="/static/favicons/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/static/favicons/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/static/favicons/favicon-16x16.png"
            />
            <link rel="manifest" href="/static/favicons/site.webmanifest" />
            <link
                rel="mask-icon"
                href="/static/favicons/safari-pinned-tab.svg"
                color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta
                name="theme-color"
                media="(prefers-color-scheme: light)"
                content="#fff"
            />
            <meta
                name="theme-color"
                media="(prefers-color-scheme: dark)"
                content="#000"
            />
            <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
            <script
                async
                src="https://visits.bitcoindevs.xyz/script.js"
                data-website-id="4ee856e4-582c-4a9c-a1c5-10757123803e"
            />
            <body className={barlow.className}>
                <Fonts />
                <NavBar />
                <div className="">{children}</div>
                <Footer />
            </body>
        </html>
    )
}
