"use client"

import { ReactNode, useState, useEffect } from "react"
import { CoreContent } from "pliny/utils/contentlayer"
import type { Topic, Authors } from "contentlayer/generated"
import { Navigation } from "../Navigation"
import { Hero } from "../hero/Hero"
import { PrevNextLinks } from "../topic/PrevNextLinks"
import { TopicHeader } from "../topic/TopicHeader"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { MoreVertical } from "lucide-react"
import React from "react"
import Link from "next/link"

interface LayoutProps {
    content: CoreContent<Topic>
    next?: { path: string; title: string }
    prev?: { path: string; title: string }
    children: ReactNode
}

export default function FullWidthLayout({
    content,
    next,
    prev,
    children
}: LayoutProps) {
    const pathname = usePathname()
    const isHomePage = pathname === "/decoding"
    const isRoadmapPage = pathname === "/decoding/interactive-roadmap"
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [currentPath, setCurrentPath] = useState<string[]>([])
    const [isScrolled, setIsScrolled] = useState(false)

    const { title, tags } = content

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

    const isInsideTopic =
        pathname &&
        pathname.startsWith("/decoding/") &&
        pathname !== "/decoding"

    return (
        <div className="flex w-full flex-col bg-vscode-background-light dark:bg-vscode-background-dark">
            {/* Mobile */}
            <div className="lg:hidden w-full">
                {/* Mobile Navigation */}
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
                                            content={content}
                                            onLinkClick={toggleNav}
                                            className="space-y-4"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile Main Content - FULL WIDTH */}
                <div className="">
                    {/* Hero in Mobile */}
                    {isHomePage && <Hero />}

                    <motion.div
                        className={`w-full px-0 ${isRoadmapPage ? 'py-0 mt-0' : 'py-16 mt-12'}`}
                        animate={{
                            filter: isNavOpen ? "blur(4px)" : "blur(0px)"
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <article className="w-full">
                            {!isRoadmapPage && (
                                <div className="px-4 mb-9">
                                    <TopicHeader
                                        title={title}
                                        tags={tags}
                                        summary={content.summary}
                                    />
                                </div>
                            )}
                            <div className="w-full">
                                {children}
                            </div>
                        </article>
                        <div className="px-4 mt-8">
                            <PrevNextLinks prev={prev} next={next} />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden lg:relative lg:block">
                <div className="relative mx-auto flex w-full max-w-9xl flex-auto justify-center sm:pl-2 lg:pl-8 xl:pl-12">
                    {/* Desktop Navigation */}
                    <div className="lg:relative k lg:flex-none border-r border-orange">
                        {isInsideTopic && (
                            <div className="absolute inset-y-0 right-0 w-[50vw] dark:bg-vscode-navigation-dark bg-vscode-navigation-light" />
                        )}
                        <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-4 xl:w-72 xl:pr-8">
                            <Navigation content={content} />
                        </div>
                    </div>

                    {/* Desktop Main Content - FULL WIDTH */}
                    <div className={`min-w-0 flex-auto lg:mx-0 lg:max-w-none lg:pr-0 w-full ${isRoadmapPage ? 'pb-0' : 'pb-16'}`}>
                        {isHomePage && <Hero />}
                        <article className="w-full">
                            {!isRoadmapPage && (
                                <div className="px-8 mb-9">
                                    <TopicHeader
                                        title={title}
                                        tags={tags}
                                        summary={content.summary}
                                    />
                                </div>
                            )}
                            <div className="w-full px-0">
                                {children}
                            </div>
                        </article>
                        <div className="px-8 xl:px-16">
                            <PrevNextLinks prev={prev} next={next} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 