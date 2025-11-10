"use client"

import { CurriculumProvider } from "@/context/FilterContext"
import { usePathname } from "next/navigation"
import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    // Determine the path based on the current route
    const dataPath = pathname.includes("/contribute")
        ? "/contribute/index.json"
        : "/learn/index.json"

    return (
        <CurriculumProvider
            path={dataPath}
        >
            <div className="flex flex-col w-full  bg-brand-orange ">
                <div className="flex flex-col w-full px-4 max-w-7xl mx-auto py-[3.75rem]">
                    {children}
                </div>
            </div>
        </CurriculumProvider>
    )
}

export default Layout
