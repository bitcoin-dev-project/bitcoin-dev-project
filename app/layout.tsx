import Fonts, { barlow } from "@/components/font"
import Footer from "@/components/footer"
import NavBar from "@/components/nav-bar"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: "The Bitcoin Dev Project",
    description: "Find your way in bitcoin open source",
    openGraph: {
        images: ["https://bitcoindevs.xyz/hero.jpg"],
        title: "The Bitcoin Dev Project",
        url: "https://bitcoindevs.xyz",
        description: "Find your way in bitcoin open source"
    },
    twitter: {
        images: ["https://bitcoindevs.xyz/landscape_2_1.jpg?v1"],
        card: "summary_large_image"
    },
    keywords:
        "bitcoin, lightning, bitcoin development, bitcoin open source, bitcoin FOSS, bitcoin career, free open source software, open source, bitcoin development, bitcoin development community, bitcoin development resources, bitcoin development tools, bitcoin development guides, bitcoin development courses"
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <script
                async
                src="https://visits.bitcoindevs.xyz/script.js"
                data-website-id="4ee856e4-582c-4a9c-a1c5-10757123803e"
            />
            <body className={barlow.className}>
                <Fonts />
                <NavBar />
                <div className="">
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    )
}
