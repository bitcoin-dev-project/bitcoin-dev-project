"use client"

import { ReactNode, useState, useEffect } from "react"
import { CoreContent } from "pliny/utils/contentlayer"
import type { Topic, Authors } from "contentlayer/generated"
import siteMetadata from "@/data/siteMetadata"
import { Navigation } from "../Navigation"
import { Hero } from "../hero/Hero"
import { PrevNextLinks } from "../topic/PrevNextLinks"
import { Prose } from "../topic/Prose"
import { TopicHeader } from "../topic/TopicHeader"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { motion, AnimatePresence } from "framer-motion"
import { MoreVertical } from "lucide-react"
import React from "react"
import { GitHubIcon } from "@/public/images/topics-hero/GitHubIcon"

interface LayoutProps {
    content: CoreContent<Topic>
    authorDetails: CoreContent<Authors>[]
    next?: { path: string; title: string }
    prev?: { path: string; title: string }
    children: ReactNode
}

export default function TopicLayout({
    content,
    next,
    prev,
    children
}: LayoutProps) {
    const pathname: string | null = usePathname()
    const isHomePage: boolean = pathname === "/learn"
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [currentPath, setCurrentPath] = useState<string[]>([])
    const [isScrolled, setIsScrolled] = useState(false)

    const { title, tags }: { title: string; tags: string[] } = content

    const toggleNav = () => setIsNavOpen(!isNavOpen)

    const githubEditUrl = `https://github.com/bitcoin-dev-project/bitcoin-topics/edit/main/learn/${content.slug}.mdx`

    const EditOnGitHubButton = () => (
        <a
            href={githubEditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 mt-6 text-sm font-normal text-gray-600 bg-transparent border border-gray-300 rounded hover:bg-gray-50 hover:text-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
        >
            <GitHubIcon className="w-4 h-4 mr-2" />
            Suggest Edits
        </a>
    )

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
        pathname && pathname.startsWith("/learn/") && pathname !== "/learn"

    return (
        <div className="flex w-full flex-col bg-vscode-background-light dark:bg-vscode-background-dark">
            {isHomePage && <Hero />}

            <div className="relative mx-auto flex w-full max-w-9xl flex-auto justify-center sm:pl-2 lg:pl-8 xl:pl-12">
                {/* Desktop Navigation */}
                <div className="hidden lg:relative lg:block lg:flex-none border-r border-orange">
                    {isInsideTopic && (
                        <div className="absolute inset-y-0 right-0 w-[50vw] dark:bg-vscode-navigation-dark bg-vscode-navigation-light" />
                    )}
                    <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-gray-800 dark:block" />
                    <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-gray-800 dark:block" />
                    <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-4 xl:w-72 xl:pr-8">
                        <Navigation content={content} />
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden w-full">
                    {/* File Tree and Navigation Toggle */}

                    <div
                        className={`fixed top-[60px] left-0 right-0 z-40 flex items-center border-b border-gray-200 dark:border-gray-700 px-4 py-2 transition-all duration-300 ${
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
                                            href={`/${currentPath.slice(0, index + 1).join("/")}`}
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

                    {/* Mobile Main Content */}
                    <motion.div
                        className="min-w-0 max-w-3xl flex-auto px-4 py-16 mt-12 mx-auto"
                        animate={{
                            filter: isNavOpen ? "blur(4px)" : "blur(0px)"
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <article>
                            <TopicHeader
                                title={title}
                                tags={tags}
                                summary={content.summary}
                            />
                            <Prose>{children}</Prose>
                        </article>
                        <PrevNextLinks prev={prev} next={next} />
                    </motion.div>
                </div>

                {/* Desktop Main Content */}
                <div className="hidden lg:block min-w-0 max-w-3xl flex-auto px-4 py-16 lg:mx-auto lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
                    <article>
                        <TopicHeader
                            title={title}
                            tags={tags}
                            summary={content.summary}
                        />
                        <Prose>{children}</Prose>
                        {/* Add the GitHub edit button for mobile */}
                        <div className="max-w-3xl mx-auto mt-8 flex justify-end">
                            <EditOnGitHubButton />
                        </div>
                    </article>
                    <div className="xl:px-16">
                        <PrevNextLinks prev={prev} next={next} />
                    </div>
                </div>
            </div>
        </div>
    )
}
