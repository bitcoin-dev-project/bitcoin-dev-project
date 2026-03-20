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


    return (
        <body className={`${fontVariables} text-vscode-text-light dark:text-vscode-text-dark`}>
            <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
                <ConditionalBackground>
                    {pathname !== "/" && <RebrandedHeader />}
                    <main>{children}</main>
                    <FooterComponent />
                </ConditionalBackground>
            </ThemeProvider>
        </body>
    )
}
