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
import { motion, AnimatePresence } from "framer-motion"
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
    const [isHovered, setIsHovered] = useState(false)
    const [isCopied, setIsCopied] = useState(false)

    const alertStyles = {
        important: {
            borderColor: "border-blue-300 dark:border-blue-600",
            bgColor: "bg-blue-50 dark:bg-blue-800/20",
            headerColor: "!text-blue-700 dark:!text-blue-300",
            Icon: CheckCircleIcon
        },
        warning: {
            borderColor: "border-yellow-300 dark:border-yellow-600",
            bgColor: "bg-yellow-50 dark:bg-yellow-800/20",
            headerColor: "!text-yellow-700 dark:!text-yellow-300",
            Icon: AlertTriangleIcon
        },
        info: {
            borderColor: "border-cyan-300 dark:border-cyan-600",
            bgColor: "bg-cyan-50 dark:bg-cyan-800/20",
            headerColor: "!text-cyan-700 dark:!text-cyan-300",
            Icon: InfoIcon
        },
        success: {
            borderColor: "border-purple-300 dark:border-purple-600",
            bgColor: "bg-purple-50 dark:bg-purple-800/20",
            headerColor: "!text-purple-700 dark:!text-purple-300",
            Icon: CheckCircleIcon
        },
        solution: {
            borderColor: "border-green-300 dark:border-green-600",
            bgColor: "bg-green-50 dark:bg-green-800/20",
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
    const initialContent = childrenArray.slice(0, initialLines)
    const expandedContent = childrenArray.slice(initialLines)

    return (
        <div className="mx-auto mb-10 mt-10 prose max-w-3xl">
            <div
                className={clsx(
                    "border-l-4 p-6 rounded-lg",
                    borderColor,
                    bgColor,
                    "text-gray-800 dark:text-gray-200" // Default text color for body
                )}
            >
                <div className="flex items-center mb-4 justify-between">
                    <div className="flex items-center">
                        <Icon className={`mr-3 w-6 h-6 ${headerColor}`} />
                        <h4
                            className={`mt-0 mb-0 text-lg font-semibold ${headerColor}`}
                        >
                            {title}
                        </h4>
                    </div>
                    {type === "solution" && (
                        <button
                            onClick={handleCopy}
                            className={`flex items-center text-sm ${headerColor}`}
                        >
                            {isCopied ? (
                                <CheckIcon size={16} className="mr-1 w-4 h-4" />
                            ) : (
                                <CopyIcon size={16} className="mr-1 w-4 h-4" />
                            )}
                            {isCopied ? "Copied!" : "Copy code"}
                        </button>
                    )}
                </div>

                <div className="mt-2 relative">{initialContent}</div>

                {expandable && expandedContent.length > 0 && (
                    <>
                        <button
                            onClick={toggleExpand}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className={`flex items-center text-base font-bold mt-3 ${headerColor}`}
                        >
                            <motion.div
                                animate={{
                                    y: isHovered ? (isExpanded ? -3 : 3) : 0,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {isExpanded ? (
                                    <ChevronUpIcon
                                        size={20}
                                        className="w-5 h-5"
                                    />
                                ) : (
                                    <ChevronDownIcon
                                        size={20}
                                        className="w-5 h-5"
                                    />
                                )}
                            </motion.div>
                            <span className="ml-2">
                                {isExpanded ? "Show less" : "Show more"}
                            </span>
                        </button>
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-3 "
                                >
                                    {expandedContent}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </div>
        </div>
    )
}
