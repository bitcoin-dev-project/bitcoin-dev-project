"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header"

export function ConditionalHeader() {
    const pathname = usePathname()

    // Hide old header on rebranded pages
    const rebrandedPages = ["/projects", "/career", "/about", "/explore", "/"]
    const isRebrandedPage = rebrandedPages.some((page) =>
        pathname === page || (page !== "/" && pathname?.startsWith(page))
    )

    if (isRebrandedPage) {
        return null
    }

    return <Header />
}
