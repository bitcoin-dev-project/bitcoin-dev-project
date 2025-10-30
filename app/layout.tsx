import { Barlow, Montserrat, Quicksand } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { ThemeProvider } from "next-themes"
import "remark-github-blockquote-alert/alert.css"
import siteMetadata from "@/data/siteMetadata"
import FooterComponent from "@/components/footer-component"
import { ConditionalHeader } from "@/components/conditional-header"

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

const barlow = Barlow({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--barlow-font",
    preload: true,
    display: "swap",
    subsets: ["latin"]
})

const quicksand = Quicksand({
    weight: ["300", "400", "500", "600", "700"],
    variable: "--quicksand-font",
    preload: true,
    display: "swap",
    subsets: ["latin"]
})

const montserrat = Montserrat({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--montserrat-font",
    preload: true,
    display: "swap",
    subsets: ["latin"]
})

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang={siteMetadata.language}
            suppressHydrationWarning={process.env.NODE_ENV === "production"}
        >
            <head>
                <script
                    async
                    src="https://visits.bitcoindevs.xyz/script.js"
                    data-website-id="4ee856e4-582c-4a9c-a1c5-10757123803e"
                    data-domains="bitcoindevs.xyz,learn.bitcoindevs.xyz"
                />
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    href="/feed.xml"
                />
            </head>
            <body
                className={`${barlow.variable} ${quicksand.variable} ${montserrat.variable} bg-white dark:bg-black text-vscode-text-light dark:text-vscode-text-dark`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme={siteMetadata.theme}
                >
                    <ConditionalHeader />
                    <main>{children}</main>
                    <FooterComponent />
                </ThemeProvider>
            </body>
        </html>
    )
}
