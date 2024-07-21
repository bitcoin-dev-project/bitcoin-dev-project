"use client"
import { CheckBadgeIcon } from "@heroicons/react/24/outline"
import {
    CheckCheckIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronUpIcon
} from "lucide-react"
import React, { useState } from "react"

interface ExpandableContentProps {
    title: string
    preview: string
    children: React.ReactNode
}

export default function CodeSolution({
    title,
    preview,
    children
}: ExpandableContentProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleToggle = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className="mx-auto mb-10 mt-10">
            <div className="border-l-4 border-[#008a39] bg-[#dfede2] p-6 rounded-lg dark:bg-[#dfede2]">
                <div>
                    <h4
                        className="mt-0 mb-0 text-lg"
                        style={{ display: "flex" }}
                    >
                        <CheckCircleIcon className="text-[#008a39] mr-3" />
                        <span className="font-bold text-black">{title}</span>
                    </h4>
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
                {isExpanded && <div className="mt-4">{children}</div>}
            </div>
        </div>
    )
}
