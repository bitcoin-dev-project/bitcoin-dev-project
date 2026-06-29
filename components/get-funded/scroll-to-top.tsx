"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

/**
 * Scrolls to top on pathname change. Next.js' App Router doesn't reset scroll
 * between same-segment routes (interview → interview), so you'd land mid-page.
 */
const ScrollToTop = () => {
    const pathname = usePathname()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

export default ScrollToTop
