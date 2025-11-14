"use client"

import { usePathname } from "next/navigation"

export function ConditionalBackground({
    children
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    // Apply rebranded background color to these pages
    const rebrandedPages = ["/projects", "/career", "/about", "/explore", "/"]
    const isRebrandedPage = rebrandedPages.some((page) =>
        pathname === page || (page !== "/" && pathname?.startsWith(page))
    )

    return (
        <div className={isRebrandedPage ? "bg-[#F6F0E6] min-h-screen" : ""}>
            {children}
        </div>
    )
}

