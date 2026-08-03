"use client"
import React, { useState } from "react"
import {
    CheckCircleIcon,
    AlertTriangleIcon,
    InfoIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    CopyIcon,
    CheckIcon
} from "lucide-react"
import * as m from "framer-motion/m"
import { AnimatePresence } from "framer-motion"
import clsx from "clsx"

interface ExpandableAlertProps {
    title: string
    children: React.ReactNode
    type?: "important" | "warning" | "info" | "success" | "solution"
    expandable?: boolean
    initialLines?: number
}

export default function ExpandableAlert({
    title,
    children,
    type = "important",
    expandable = false,
    initialLines = 2
}: ExpandableAlertProps) {
    const [isExpanded, setIsExpanded] = useState(!expandable)
    const [isCopied, setIsCopied] = useState(false)

    // Fills are mixed down onto the brand cream (#F6F0E6) rather than taken
    // from Tailwind's stock -50 tints, which read cool and chalky next to it.
    // They also sit slightly DARKER than the page, so the alert is a recessed
    // panel and a nested ScriptBlock (#FFFDF5) still reads as the raised card
    // on top of it. Borders are the same hue, one step down.
    const alertStyles = {
        important: {
            // brand orange (#EB5234) pulled onto the cream
            borderColor: "border-[#F0CFC2] dark:border-orange-800/60",
            bgColor: "bg-[#FAEBE3] dark:bg-orange-900/20",
            headerColor: "!text-orange-700 dark:!text-orange-300",
            Icon: CheckCircleIcon
        },
        warning: {
            borderColor: "border-[#EBD9AE] dark:border-amber-800/60",
            bgColor: "bg-[#F9F0DA] dark:bg-amber-900/20",
            headerColor: "!text-amber-700 dark:!text-amber-300",
            Icon: AlertTriangleIcon
        },
        info: {
            // brand-gray on brand cream: same hue as the page, one step down
            borderColor: "border-brand-stroke-on-base dark:border-stone-700",
            bgColor: "bg-brand-gray dark:bg-stone-800/40",
            headerColor: "!text-stone-600 dark:!text-stone-300",
            Icon: InfoIcon
        },
        success: {
            // warm olive-leaning green so it stays in the cream family
            borderColor: "border-[#CDDCBE] dark:border-emerald-800/60",
            bgColor: "bg-[#ECF2E3] dark:bg-emerald-900/20",
            headerColor: "!text-emerald-700 dark:!text-emerald-300",
            Icon: CheckCircleIcon
        },
        solution: {
            borderColor: "border-[#C2D6B1] dark:border-green-800/60",
            bgColor: "bg-[#E6EFDB] dark:bg-green-900/20",
            headerColor: "!text-green-700 dark:!text-green-300",
            Icon: CheckCircleIcon
        }
    }

    const { borderColor, bgColor, headerColor, Icon } = alertStyles[type]

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const handleCopy = () => {
        const extractText = (node: React.ReactNode): string => {
            if (typeof node === "string") {
                return node
            } else if (React.isValidElement(node)) {
                if (typeof node.props.children === "string") {
                    return node.props.children
                } else if (Array.isArray(node.props.children)) {
                    return node.props.children.map(extractText).join("")
                } else if (React.isValidElement(node.props.children)) {
                    return extractText(node.props.children)
                }
            } else if (Array.isArray(node)) {
                return node.map(extractText).join("")
            }
            return ""
        }

        const codeContent = extractText(children)

        navigator.clipboard
            .writeText(codeContent)
            .then(() => {
                setIsCopied(true)
                setTimeout(() => setIsCopied(false), 2000)
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err)
            })
    }

    const childrenArray = React.Children.toArray(children)
    // Only split when there is a "Show more" button to reveal the rest.
    // Otherwise everything past initialLines would silently never render.
    const initialContent = expandable
        ? childrenArray.slice(0, initialLines)
        : childrenArray
    const expandedContent = expandable ? childrenArray.slice(initialLines) : []

    return (
        <div className="mx-auto my-6 prose max-w-3xl">
            <div
                className={clsx(
                    "rounded-lg border px-5 py-4",
                    borderColor,
                    bgColor,
                    "text-gray-800 dark:text-gray-200" // Default text color for body
                )}
            >
                {/* No bottom margin when nothing is showing below the header,
                    otherwise a collapsed alert renders as a header floating in
                    an empty box. */}
                <div
                    className={clsx(
                        "flex items-center justify-between gap-3",
                        (initialContent.length > 0 || isExpanded) && "mb-3"
                    )}
                >
                    <div className="flex items-center min-w-0">
                        <Icon
                            className={`mr-2 w-4 h-4 shrink-0 ${headerColor}`}
                        />
                        <h4
                            className={`mt-0 mb-0 text-sm font-semibold ${headerColor}`}
                        >
                            {title}
                        </h4>
                        {/* The toggle lives in the header rather than on its own
                            row below it: with initialLines={0} there is nothing
                            between the title and the toggle, so a separate row
                            read as an orphaned link. */}
                        {expandable && expandedContent.length > 0 && (
                            <button
                                onClick={toggleExpand}
                                className={`ml-3 flex shrink-0 items-center gap-1 text-xs font-medium ${headerColor}`}
                            >
                                {isExpanded ? (
                                    <ChevronUpIcon className="w-3.5 h-3.5" />
                                ) : (
                                    <ChevronDownIcon className="w-3.5 h-3.5" />
                                )}
                                {isExpanded ? "Show less" : "Show more"}
                            </button>
                        )}
                    </div>
                    {type === "solution" && (
                        // Same size and weight as the Show more/less toggle so
                        // the two controls read as a pair against the title.
                        <button
                            onClick={handleCopy}
                            className={`flex shrink-0 items-center gap-1 text-xs font-medium ${headerColor}`}
                        >
                            {isCopied ? (
                                <CheckIcon className="w-3.5 h-3.5" />
                            ) : (
                                <CopyIcon className="w-3.5 h-3.5" />
                            )}
                            {isCopied ? "Copied!" : "Copy code"}
                        </button>
                    )}
                </div>

                {/* Collapse the outer margins of the first/last block so the
                    padding above stays the padding, and pull nested cards
                    (ScriptBlock ships my-6) in to match the tighter rhythm. */}
                <div className="relative [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_.not-prose]:my-4">
                    {initialContent}
                </div>

                {expandable && expandedContent.length > 0 && (
                    <AnimatePresence>
                        {isExpanded && (
                            <m.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_.not-prose]:my-4"
                            >
                                {expandedContent}
                            </m.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </div>
    )
}
