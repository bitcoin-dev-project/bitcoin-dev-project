"use client"

import React, { useEffect } from "react"
import GoodFirstIssuesFooter from "@/components/good-first-issues-footer"
import GoodFirstIssuesNavbar from "@/components/good-first-issue"
const GoodFirstIssuesLayout = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        document.body.classList.add("gfi-page")
        return () => {
            document.body.classList.remove("gfi-page")
        }
    }, [])

    return (
        <>
            <style jsx global>{`
                body.gfi-page > div > header {
                    display: none;
                }
                body.gfi-page > div > footer {
                    display: none;
                }
            `}</style>
            <GoodFirstIssuesNavbar setIsOpen={() => {}} />
            {children}
            <GoodFirstIssuesFooter />
        </>
    )
}

export default GoodFirstIssuesLayout
