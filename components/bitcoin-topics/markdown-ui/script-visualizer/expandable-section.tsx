"use client"
import { BookIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import React, { useState } from "react"

interface ExpandableContentProps {
    title: string
    preview: string
    children: React.ReactNode
}

export default function ExpandableSection({
    title,
    preview,
    children
}: ExpandableContentProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleToggle = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className="mx-auto py-3">
            <div className="rounded-lg border-l-4 border-[#635FC7] bg-[#F7F8FA] p-6">
                <div>
                    <h4 className="mb-0 mt-0" style={{ display: "flex" }}>
                        <BookIcon className="mr-3 text-[#635FC7]" /> {title}
                    </h4>
                </div>
                <div className="flex items-start space-x-4">
                    <div>
                        <p>{preview}</p>
                    </div>
                </div>
                <button
                    className="text-black font-bold mt-6 focus:outline-none flex items-center"
                    onClick={handleToggle}
                    style={{ textDecoration: "none" }}
                >
                    {isExpanded ? (
                        <ChevronUpIcon className="mr-2 w-5 h-5" />
                    ) : (
                        <ChevronDownIcon className="mr-2 w-5 h-5" />
                    )}
                    <span>{isExpanded ? "Show Less" : "Show More"}</span>
                </button>
                {/* {isExpanded && <div className="mt-4">{children}</div>}
                {isExpanded && <div className="mt-4">{children}</div>}
                <button
                    className="text-[#635FC7] underline focus:outline-none"
                    onClick={handleToggle}
                >
                    {isExpanded ? "See Less" : "See More"}
                </button> */}
            </div>
        </div>
    )
}
