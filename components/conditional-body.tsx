"use client"

import { usePathname } from "next/navigation"
import { ThemeProvider } from "next-themes"
import siteMetadata from "@/data/siteMetadata"
import { ConditionalBackground } from "./conditional-background"
import { ConditionalHeader } from "./conditional-header"
import FooterComponent from "./footer-component"

export function ConditionalBody({
    children,
    fontVariables
}: {
    children: React.ReactNode
    fontVariables: string
}) {
    const pathname = usePathname()

    // Apply rebranded background color to these pages
    const rebrandedPages = [
        "/projects",
        "/get",
        "/about",
        "/explore",
        "/",
        "/career"
    ]
    const isRebrandedPage = rebrandedPages.some(
        (page) =>
            pathname === page || (page !== "/" && pathname?.startsWith(page))
    )

    const bodyClass = isRebrandedPage
        ? `${fontVariables} text-vscode-text-light dark:text-vscode-text-dark`
        : `${fontVariables} bg-white dark:bg-black text-vscode-text-light dark:text-vscode-text-dark`

    return (
        <body className={bodyClass}>
            <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
                <ConditionalBackground>
                    <ConditionalHeader />
                    <main>{children}</main>
                    <FooterComponent />
                </ConditionalBackground>
            </ThemeProvider>
        </body>
    )
}
