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
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform,
    useSpring,
    PanInfo
} from "framer-motion"
import { ChevronRight } from "lucide-react"
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
    const isHomePage: boolean = pathname === "/topics"
    const [isNavOpen, setIsNavOpen] = useState(false)
    const swipeX = useMotionValue(0)
    const swipeXSmooth = useSpring(swipeX, { stiffness: 300, damping: 30 })
    const swipeOpacity = useTransform(swipeXSmooth, [-50, 0, 50], [0.5, 0, 0.5])

    const { title, tags }: { title: string; tags: string[] } = content

    const toggleNav = () => setIsNavOpen(!isNavOpen)

    const handleDragEnd = (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        if (info.offset.x > 50 && !isNavOpen) {
            setIsNavOpen(true)
        } else if (info.offset.x < -50 && isNavOpen) {
            setIsNavOpen(false)
        }
    }

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

    const githubEditUrl = `https://github.com/jrakibi/bitcoin-topics/edit/main/topics/${content.slug}.mdx`

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

    const isInsideTopic =
        pathname && pathname.startsWith("/topics/") && pathname !== "/topics"

    return (
        <div className="flex w-full flex-col">
            {isHomePage && <Hero />}

            <div className="relative mx-auto flex w-full max-w-9xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
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

                {/* Mobile Navigation with Swipe */}
                <motion.div
                    className="lg:hidden w-full"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    style={{ x: swipeXSmooth }}
                >
                    {/* Swipe indicator */}
                    <motion.div
                        className="fixed inset-y-0 left-0 w-1 bg-orange-500 pointer-events-none"
                        style={{ opacity: swipeOpacity }}
                    />

                    {/* Sidebar Toggle Button */}
                    <motion.button
                        onClick={toggleNav}
                        className="fixed top-24 left-0 z-50 p-1 bg-white/60 dark:bg-gray-800/60 text-gray-400 dark:text-gray-500 rounded-r-sm shadow-sm backdrop-blur-sm"
                        initial={{ x: -6 }}
                        animate={{ x: isNavOpen ? -6 : 0 }}
                        whileHover={{
                            x: 0,
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            color: "rgba(0, 0, 0, 0.6)"
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                        }}
                    >
                        <ChevronRight
                            size={16}
                            className={`transform transition-transform duration-300 ${isNavOpen ? "rotate-180" : ""}`}
                        />
                    </motion.button>

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
                                className="fixed inset-0 z-40"
                            >
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-50"
                                    onClick={toggleNav}
                                />
                                <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 overflow-y-auto">
                                    <div className="py-16 px-8 xl:px-10">
                                        <Navigation
                                            content={content}
                                            onLinkClick={toggleNav}
                                            className="space-y-6"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Mobile Main Content */}
                    <motion.div
                        className="min-w-0 max-w-3xl flex-auto px-4 py-16 mx-auto"
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
                            {/* Add the GitHub edit button for mobile */}
                            <div className="max-w-3xl mx-auto mt-8 flex justify-end">
                                <EditOnGitHubButton />
                            </div>
                        </article>
                        <PrevNextLinks prev={prev} next={next} />
                    </motion.div>
                </motion.div>

                {/* Desktop Main Content */}
                <div className="hidden lg:block min-w-0 max-w-3xl flex-auto px-4 py-16 lg:mx-auto lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
                    <article>
                        <TopicHeader
                            title={title}
                            tags={tags}
                            summary={content.summary}
                        />
                        <Prose>{children}</Prose>

                        {/* Add the GitHub edit button for desktop */}
                        <div className="max-w-3xl mx-auto mt-8 flex justify-end">
                            <EditOnGitHubButton />
                        </div>
                    </article>
                    <PrevNextLinks prev={prev} next={next} />
                </div>
            </div>
        </div>
    )
}
