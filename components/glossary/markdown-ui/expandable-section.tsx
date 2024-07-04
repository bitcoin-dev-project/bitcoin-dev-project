"use client"
import { BookIcon } from "lucide-react"
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
        <div className="mx-auto mb-4">
            <div className="border-l-4 border-[#635FC7] bg-[#F7F8FA] p-6 rounded-lg">
                <div>
                    <h4 className="mt-0 mb-0" style={{ display: "flex" }}>
                        <BookIcon className="text-[#635FC7] mr-3" /> {title}
                    </h4>
                </div>
                <div className="flex items-start space-x-4">
                    <div>
                        <p>{preview}</p>
                    </div>
                </div>
                {isExpanded && <div className="mt-4">{children}</div>}
                <button
                    className="text-orange-500 underline focus:outline-none"
                    onClick={handleToggle}
                >
                    {isExpanded ? "See Less" : "See More"}
                </button>
            </div>
        </div>
    )
}
