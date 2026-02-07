"use client"

import { ReactNode, useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Navigation } from "@/components/decoding-bitcoin/Navigation"
import { motion, AnimatePresence } from "framer-motion"
import { MoreVertical } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function DecodingLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [currentPath, setCurrentPath] = useState<string[]>([])
    const [isScrolled, setIsScrolled] = useState(false)

    const isInsideTopic =
        pathname &&
        pathname.startsWith("/decoding/") &&
        pathname !== "/decoding"

    // Communities pages have their own full-width layout
    const isCommunityPage = pathname?.startsWith("/decoding/communities")

    const toggleNav = () => setIsNavOpen(!isNavOpen)

    useEffect(() => {
        if (isNavOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isNavOpen])

    useEffect(() => {
        if (pathname) {
            const pathParts = pathname.split("/").filter(Boolean)
            setCurrentPath(pathParts)
        }
    }, [pathname])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Close mobile nav on route change
    useEffect(() => {
        setIsNavOpen(false)
    }, [pathname])

    // Communities pages render without the topic sidebar
    if (isCommunityPage) {
        return <>{children}</>
    }

    return (
        <div className="flex w-full flex-col bg-vscode-background-light dark:bg-vscode-background-dark">
            {/* Mobile */}
            <div className="lg:hidden w-full">
                <div className="">
                    {/* File Tree and Navigation Toggle */}
                    <div
                        className={`fixed left-0 right-0 z-20 flex items-center border-b border-gray-200 dark:border-gray-700 px-4 py-2 transition-all duration-300 ${
                            isScrolled
                                ? "bg-white/0 dark:bg-gray-900/0 backdrop-blur-md"
                                : "bg-transparent"
                        }`}
                    >
                        <button
                            onClick={toggleNav}
                            className="p-2 rounded-md text-gray-600 dark:text-gray-300 backdrop-blur-sm"
                        >
                            <MoreVertical size={20} />
                        </button>
                        <div className="flex-1 overflow-x-auto">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                                {currentPath.map((part, index) => (
                                    <React.Fragment key={index}>
                                        {index > 0 && (
                                            <span className="mx-1">/</span>
                                        )}
                                        <Link
                                            href={`/${currentPath
                                                .slice(0, index + 1)
                                                .join("/")}`}
                                            className="hover:text-orange-500"
                                        >
                                            {part}
                                        </Link>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation Sidebar */}
                    <AnimatePresence>
                        {isNavOpen && (
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }}
                                className="fixed inset-0 z-[50]"
                            >
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-50"
                                    onClick={toggleNav}
                                />
                                <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 overflow-y-auto">
                                    <div className="py-4 px-4">
                                        <Navigation
                                            onLinkClick={toggleNav}
                                            className="space-y-4"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile Main Content */}
                <div className="">
                    {children}
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden lg:relative lg:block">
                <div className="relative mx-auto flex w-full max-w-9xl flex-auto justify-center sm:pl-2 lg:pl-8 xl:pl-12">
                    {/* Desktop Navigation — persistent across route changes */}
                    <div className="lg:relative lg:flex-none border-r border-orange">
                        {isInsideTopic && (
                            <div className="absolute inset-y-0 right-0 w-[50vw] dark:bg-vscode-navigation-dark bg-vscode-navigation-light" />
                        )}
                        <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-4 xl:w-72 xl:pr-8">
                            <Navigation />
                        </div>
                    </div>

                    {/* Desktop Main Content — only this slot updates on navigation */}
                    <div className="min-w-0 max-w-3xl flex-auto pb-16 lg:mx-auto lg:max-w-none lg:pr-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
