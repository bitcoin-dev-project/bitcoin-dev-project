"use client"
import React, { useState } from "react"
import {
    CheckCircleIcon,
    AlertTriangleIcon,
    InfoIcon,
    ChevronDownIcon,
    ChevronUpIcon
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import clsx from "clsx"

interface ExpandableAlertProps {
    title: string
    children: React.ReactNode
    type?: "important" | "warning" | "info" | "success"
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

    const alertStyles = {
        important: {
            borderColor: "#4433ff",
            bgColor: "#dbe1ee",
            textColor: "#4433ff",
            Icon: CheckCircleIcon
        },
        warning: {
            borderColor: "#ff9800",
            bgColor: "#fff3e0",
            textColor: "#ff9800",
            Icon: AlertTriangleIcon
        },
        info: {
            borderColor: "#2196f3",
            bgColor: "#e3f2fd",
            textColor: "#2196f3",
            Icon: InfoIcon
        },
        success: {
            borderColor: "#008a39",
            bgColor: "#dfede2",
            textColor: "#008a39",
            Icon: CheckCircleIcon
        }
    }

    const { borderColor, bgColor, textColor, Icon } = alertStyles[type]

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const childrenArray = React.Children.toArray(children)
    const initialContent = childrenArray.slice(0, initialLines)
    const expandedContent = childrenArray.slice(initialLines)

    return (
        <div className="mx-auto mb-10 mt-10 prose max-w-3xl">
            <div
                className={`border-l-4 p-6 rounded-lg`}
                style={{
                    borderColor: borderColor,
                    backgroundColor: bgColor
                }}
            >
                <div className="flex items-center mb-4">
                    <Icon className={`mr-3`} style={{ color: textColor }} />
                    <h4
                        className="mt-0 mb-0 text-lg font-semibold"
                        style={{ color: textColor }}
                    >
                        {title}
                    </h4>
                </div>

                <div className="mt-2 ">{initialContent}</div>

                {expandable && expandedContent.length > 0 && (
                    <>
                        <button
                            onClick={toggleExpand}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="flex items-center text-base font-bold mt-3"
                            style={{ color: textColor }}
                        >
                            <motion.div
                                animate={{
                                    y: isHovered ? (isExpanded ? -3 : 3) : 0,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {isExpanded ? (
                                    <ChevronUpIcon size={20} />
                                ) : (
                                    <ChevronDownIcon size={20} />
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
