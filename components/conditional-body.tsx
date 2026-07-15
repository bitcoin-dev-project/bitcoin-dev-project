"use client"

import { usePathname } from "next/navigation"
import { ThemeProvider } from "next-themes"
import siteMetadata from "@/data/siteMetadata"
import { ConditionalBackground } from "./conditional-background"
import { RebrandedHeader } from "./rebranded-header"
import FooterComponent from "./footer-component"

export function ConditionalBody({
    children,
    fontVariables
}: {
    children: React.ReactNode
    fontVariables: string
}) {
    const pathname = usePathname()

    const rebrandedPages = ["/projects", "/get", "/about", "/", "/career"]
    const isRebrandedPage = rebrandedPages.some(
        (page) =>
            pathname === page || (page !== "/" && pathname?.startsWith(page))
    )

    const bodyClass = isRebrandedPage
        ? `${fontVariables} text-vscode-text-light dark:text-vscode-text-dark`
        : `${fontVariables} bg-white dark:bg-black text-vscode-text-light dark:text-vscode-text-dark`

    return (
        <body className={bodyClass}>
            {/* storageKey bump forces existing visitors (who have "dark" stored
                under the old key) to pick up the new light default */}
            <ThemeProvider
                attribute="class"
                defaultTheme={siteMetadata.theme}
                storageKey="bdp-theme"
            >
                <ConditionalBackground>
                    {pathname !== "/" && <RebrandedHeader />}
                    <main>{children}</main>
                    <FooterComponent />
                </ConditionalBackground>
            </ThemeProvider>
        </body>
    )
}
