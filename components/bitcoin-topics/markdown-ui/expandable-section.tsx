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
                    <h4 className="mt-0 mb-0 text-lg flex">
                        <BookIcon className="text-[#635FC7] mr-3" />
                        <span className="font-bold text-black">{title}</span>
                    </h4>
                </div>
                <div className="flex items-start space-x-4">
                    <div>
                        <p>{preview}</p>
                    </div>
                </div>
                <button
                    className="text-black font-bold mt-6 focus:outline-none flex items-center no-underline"
                    onClick={handleToggle}
                >
                    {isExpanded ? (
                        <ChevronUpIcon className="mr-2 w-5 h-5" />
                    ) : (
                        <ChevronDownIcon className="mr-2 w-5 h-5" />
                    )}
                    <span>{isExpanded ? "Show Less" : "Show More"}</span>
                </button>
                {isExpanded && <div className="mt-4">{children}</div>}
            </div>
        </div>
    )
}
