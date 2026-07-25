"use client"

import { ReactNode, useState, useEffect, useMemo } from "react"
import { usePathname } from "next/navigation"
import { Navigation } from "@/components/decoding-bitcoin/Navigation"
import { TableOfContents } from "@/components/decoding-bitcoin/topic/TableOfContents"
import { allTopics } from "@/.contentlayer/generated"
import * as m from "framer-motion/m"
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion"
import { MoreVertical } from "lucide-react"
import Link from "next/link"
import React from "react"

// "key-tweaking" -> "Key Tweaking", for path segments with no matching topic
const humanizeSlug = (slug: string) =>
    slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

export default function DecodingLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [currentPath, setCurrentPath] = useState<string[]>([])
    const [isScrolled, setIsScrolled] = useState(false)

    // slug -> title, so the breadcrumb reads "Tweaking Keys" instead of "key-tweaking"
    const topicTitles = useMemo(
        () => new Map(allTopics.map((topic) => [topic.slug, topic.title])),
        []
    )

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
        return <div className="font-inter">{children}</div>
    }

    return (
        <LazyMotion features={domAnimation}>
            <div className="font-inter flex w-full flex-col bg-vscode-background-light dark:bg-vscode-background-dark">
                {/* Mobile */}
                <div className="lg:hidden w-full">
                    <div className="">
                        {/* File Tree and Navigation Toggle */}
                        <div
                            className={`fixed left-0 right-0 z-20 flex items-center px-4 py-2 transition-all duration-300 ${
                                isScrolled
                                    ? "border-b border-brand-gray-100 bg-brand/80 backdrop-blur-md dark:border-gray-700 dark:bg-vscode-background-dark/80"
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
                                                {index === 0
                                                    ? "Decoding"
                                                    : (topicTitles.get(
                                                          currentPath
                                                              .slice(
                                                                  1,
                                                                  index + 1
                                                              )
                                                              .join("/")
                                                      ) ?? humanizeSlug(part))}
                                            </Link>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Navigation Sidebar */}
                        <AnimatePresence>
                            {isNavOpen && (
                                <m.div
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
                                    <div className="brand-scrollbar absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 overflow-y-auto">
                                        <div className="py-4 px-4">
                                            <Navigation
                                                onLinkClick={toggleNav}
                                                className="space-y-4"
                                            />
                                        </div>
                                    </div>
                                </m.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Main Content */}
                    <div className="">{children}</div>
                </div>

                {/* Desktop */}
                <div className="hidden lg:relative lg:block">
                    <div className="relative flex w-full max-w-12xl lg:px-6 xl:px-8">
                        {/* Desktop Navigation — navigation-colored panel (the tint
                            that used to be on the header), bled to the left edge */}
                        <div className="lg:relative lg:flex-none lg:border-r lg:border-brand-gray-100 dark:lg:border-gray-700">
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-[50vw] bg-vscode-navigation-light dark:bg-vscode-navigation-dark" />
                            <div className="brand-scrollbar sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-72 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-4 xl:w-80 xl:pr-8">
                                <Navigation />
                            </div>
                        </div>

                        {/* Desktop Main Content — only this slot updates on navigation */}
                        <div className="min-w-0 flex-auto pb-16">
                            {children}
                        </div>

                        {/* Right rail — "On this page" (xl and up, inside a topic) */}
                        {isInsideTopic && (
                            <div className="hidden xl:block xl:w-80 xl:flex-none xl:pl-6">
                                <div className="brand-scrollbar sticky top-[4.75rem] max-h-[calc(100vh-4.75rem)] overflow-y-auto py-16">
                                    <TableOfContents />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LazyMotion>
    )
}
