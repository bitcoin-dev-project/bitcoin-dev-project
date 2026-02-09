"use client"

import { ReactNode, useState, useEffect } from "react"
import { CoreContent } from "pliny/utils/contentlayer"
import type { Topic, Authors } from "contentlayer/generated"
import { Hero } from "../hero/Hero"
import { PrevNextLinks } from "../topic/PrevNextLinks"
import { Prose } from "../topic/Prose"
import { TopicHeader } from "../topic/TopicHeader"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Loader2, ArrowRight } from "lucide-react"
import React from "react"
import { GitHubIcon } from "@/public/images/topics-hero/GitHubIcon"

interface LayoutProps {
    content: CoreContent<Topic>
    next?: { path: string; title: string }
    prev?: { path: string; title: string }
    children: ReactNode
    showBanner?: boolean
}

export default function BaseLayout({
    content,
    next,
    prev,
    children,
    showBanner = false
}: LayoutProps) {
    const pathname = usePathname()
    const isHomePage = pathname === "/decoding"
    const [isCompleted, setIsCompleted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { title, tags } = content

    const githubEditUrl = `https://github.com/bitcoin-dev-project/decoding-bitcoin/edit/main/decoding/${content.slug}.mdx`

    const normalizePath = (path: string) => {
        return path.replace("/decoding/", "").replace("/", "")
    }

    // Mark as Completed Logic
    useEffect(() => {
        const completedTopics = JSON.parse(
            localStorage.getItem("completedTopics") || "{}"
        )
        const normalizedSlug = normalizePath(content.slug)
        setIsCompleted(!!completedTopics[normalizedSlug])
    }, [content.slug])

    const toggleCompleted = async () => {
        if (isCompleted) {
            setIsCompleted(false)
            const completedTopics = JSON.parse(
                localStorage.getItem("completedTopics") || "{}"
            )
            const normalizedSlug = normalizePath(content.slug)
            delete completedTopics[normalizedSlug]
            localStorage.setItem(
                "completedTopics",
                JSON.stringify(completedTopics)
            )
            window.dispatchEvent(new Event("topicCompletionChanged"))
            return
        }

        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 800))
        setIsLoading(false)
        setIsCompleted(true)

        const completedTopics = JSON.parse(
            localStorage.getItem("completedTopics") || "{}"
        )
        const normalizedSlug = normalizePath(content.slug)
        completedTopics[normalizedSlug] = true
        localStorage.setItem("completedTopics", JSON.stringify(completedTopics))
        window.dispatchEvent(new Event("topicCompletionChanged"))
    }

    useEffect(() => {
        const handleCompletionChange = () => {
            const saved = localStorage.getItem("completedTopics")
            if (saved) {
                const completedTopics = JSON.parse(saved)
                const normalizedSlug = normalizePath(content.slug)
                setIsCompleted(!!completedTopics[normalizedSlug])
            }
        }

        window.addEventListener("topicCompletionChange", handleCompletionChange)
        return () => {
            window.removeEventListener(
                "topicCompletionChange",
                handleCompletionChange
            )
        }
    }, [content.slug])

    const ActionButtons = () => (
        <div className="flex items-center justify-between w-full max-w-3xl mx-auto">
            <motion.a
                href={githubEditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800/50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <GitHubIcon className="w-4 h-4 mr-2" />
                Suggest Edits
            </motion.a>
            <div className="flex items-center gap-4">
                <AnimatePresence mode="wait">
                    {isCompleted ? (
                        <motion.div
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.button
                                onClick={toggleCompleted}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Completed
                            </motion.button>

                            {next?.path && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Link href={`/${next.path}`}>
                                        <motion.button
                                            className="inline-flex items-center px-4 py-2 text-sm font-medium border-2 border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-md transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Next Topic
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.button
                            onClick={toggleCompleted}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-orange-500 border-2 border-orange-500 rounded-md hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <CheckCircle className="w-4 h-4 mr-2" />
                            )}
                            {isLoading
                                ? "Marking as Complete..."
                                : "Mark as Complete"}
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )

    return (
        <>
            {/* Mobile Content */}
            <div className="lg:hidden">
                {isHomePage && <Hero />}

                <div className="min-w-0 max-w-3xl flex-auto px-4 py-16 mt-12 mx-auto">
                    {showBanner && content.bannerImage ? (
                        <>
                            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-8 sm:mb-16">
                                <Image
                                    src={content.bannerImage}
                                    alt="Project image"
                                    layout="fill"
                                    objectFit="cover"
                                />
                                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8 bg-gradient-to-t from-black/70 to-transparent">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1 sm:mb-2">
                                        Project
                                    </h2>
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white">
                                        {title}
                                    </h1>
                                </div>
                            </div>
                            <article>
                                <Prose>{children}</Prose>
                            </article>
                        </>
                    ) : (
                        <article>
                            <TopicHeader
                                title={title}
                                tags={tags}
                                summary={content.summary}
                            />
                            <Prose>{children}</Prose>
                        </article>
                    )}
                    <div className="max-w-3xl mx-auto mt-8 flex justify-between items-center">
                        <ActionButtons />
                    </div>
                    <PrevNextLinks prev={prev} next={next} />
                </div>
            </div>

            {/* Desktop Content */}
            <div className="hidden lg:block">
                {isHomePage && <Hero />}
                {showBanner && content.bannerImage ? (
                    <>
                        <div className="relative w-full h-[600px] mb-16">
                            <Image
                                src={content.bannerImage}
                                alt="Project image"
                                layout="fill"
                                objectFit="cover"
                            />
                            <div className="max-w-3xl mx-auto absolute inset-0 flex flex-col justify-end p-8 pl-0">
                                <h2 className="text-2xl font-semibold text-white mb-2">
                                    Project
                                </h2>
                                <h1 className="text-4xl font-extralight text-white">
                                    {title}
                                </h1>
                            </div>
                        </div>
                        <article>
                            <Prose>{children}</Prose>
                        </article>
                        <div className="max-w-3xl mx-auto mt-8 flex justify-between items-center">
                            <ActionButtons />
                        </div>
                    </>
                ) : (
                    <article>
                        <TopicHeader
                            title={title}
                            tags={tags}
                            summary={content.summary}
                        />
                        <Prose>{children}</Prose>
                        <div className="max-w-3xl mx-auto mt-8 flex justify-between items-center">
                            <ActionButtons />
                        </div>
                    </article>
                )}
                <div className="xl:px-16">
                    <PrevNextLinks prev={prev} next={next} />
                </div>
            </div>
        </>
    )
}
