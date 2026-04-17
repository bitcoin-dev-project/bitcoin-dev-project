"use client"

import { usePathname } from "next/navigation"
import { RebrandedHeader } from "./rebranded-header"

export function ConditionalHeader() {
    const pathname = usePathname()

    if (pathname === "/") {
        return <></>
    }
    return <RebrandedHeader />
}

