"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header"
import { RebrandedHeader } from "./rebranded-header"

export function ConditionalHeader() {
    const pathname = usePathname()

    // Hide old header on rebranded pages
    const rebrandedPages = ["/projects", "/career", "/learn", "/contribute"]
    const isRebrandedPage = rebrandedPages.some((page) =>
        pathname?.startsWith(page)
    )

    if (isRebrandedPage) {
        return <RebrandedHeader />
    }

    return <Header />
}
