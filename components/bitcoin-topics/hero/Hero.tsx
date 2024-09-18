import React, { useState, useEffect, useMemo, Fragment } from "react"
import Image from "next/image"
import clsx from "clsx"
import { Highlight } from "prism-react-renderer"
import { useRouter } from "next/navigation"
import {
    ArrowRightIcon,
    BookOpenIcon,
    ClockIcon,
    HistoryIcon
} from "lucide-react"
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer"
import { allTopics } from "@/.contentlayer/generated"
import { FaDiscord } from "react-icons/fa"
import { motion } from "framer-motion"

import { Button } from "./Button"
import blurOrangeImage from "@/public/images/topics-hero/blur-orange.png"
import blurIndigoImage from "@/public/images/topics-hero/blur-indigo.png"
import { HeroBackground } from "@/public/images/topics-hero/HeroBackground"

const codeLanguage = "c"
const code = `CAmount GetBlockSubsidy(int nHeight, const Consensus) {
    // Calculate block subsidy based on height
    int halvings = nHeight / consensusParams.nSubsidy
    if (halvings >= 64) return 0; 
    return 50 * COIN >> halvings;
}`

const tabs = [
    { name: "validation.cpp", isActive: true },
    { name: "base58.cpp", isActive: false },
    { name: "bip324.h", isActive: false }
]

function TrafficLightsIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
            <circle cx="5" cy="5" r="4.5" />
            <circle cx="21" cy="5" r="4.5" />
            <circle cx="37" cy="5" r="4.5" />
        </svg>
    )
}

function useTypingEffect(text: string, speed = 20) {
    const [displayedText, setDisplayedText] = useState("")
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        let i = 0
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i))
                i++
            } else {
                clearInterval(timer)
                setIsComplete(true)
            }
        }, speed)

        return () => clearInterval(timer)
    }, [text, speed])

    return { displayedText, isComplete }
}

const ContinueReadingComp: React.FC<{
    lastVisitedTopicTitle: string | null
    lastVisitedTime: string | null
    handleContinueReading: () => void
}> = ({ lastVisitedTopicTitle, lastVisitedTime, handleContinueReading }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vscode-background-light to-vscode-background-light dark:from-vscode-background-dark dark:to-vscode-background-dark">
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative">
                    {/* Background elements */}
                    <Image
                        className="absolute bottom-full right-full -mb-56 -mr-72 opacity-50"
                        src={blurOrangeImage}
                        alt="Blur orange image"
                        width={530}
                        height={530}
                        unoptimized
                        priority
                    />
                    <Image
                        className="absolute -top-64 -right-64"
                        src={blurOrangeImage}
                        alt="Blur orange image"
                        width={530}
                        height={530}
                        unoptimized
                        priority
                    />
                    <Image
                        className="absolute -bottom-40 -right-44"
                        src={blurIndigoImage}
                        alt="Blur indigo image"
                        width={567}
                        height={567}
                        unoptimized
                        priority
                    />
                    <div className="absolute inset-x-[-50vw] -bottom-48 -top-32 lg:-bottom-32 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0 [mask-image:linear-gradient(transparent,white,transparent)] lg:[mask-image:linear-gradient(transparent,white,white,transparent)]">
                        <HeroBackground className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%] opacity-20 lg:opacity-100" />
                    </div>

                    {/* Left column: Welcome back and CTA */}
                    <div className="space-y-8 relative z-10 lg:pr-8 pt-20 md:pt-24 pb-20 md:pb-24">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
                            Welcome back to{" "}
                            <span className="text-orange-500">
                                Bitcoin Topics
                            </span>
                        </h1>
                        <p className="text-xl text-gray-800 dark:text-gray-300">
                            Continue from where you left off
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={handleContinueReading}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out text-lg flex items-center justify-center"
                            >
                                <ArrowRightIcon className="mr-2 h-5 w-5" />
                                Resume Reading
                            </Button>
                            <Button
                                href="/topics/bitcoin-history"
                                className="flex-1 bg-transparent hover:bg-vscode-header-background-light  dark:hover:bg-vscode-hover-dark text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out text-lg flex items-center justify-center border border-gray-300 dark:border-gray-600"
                            >
                                <HistoryIcon className="mr-2 h-5 w-5 text-gray-900 dark:text-gray-200" />
                                <span className="text-gray-900 dark:text-gray-200">
                                    {" "}
                                    {/* Added span for light mode text color */}
                                    Start from the beginning
                                </span>
                            </Button>
                        </div>
                    </div>

                    {/* Right column: Progress card and Discord card */}
                    <div className="space-y-6 lg:pl-8">
                        {/* Progress card */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl opacity-20 blur-lg"></div>
                            <div className="relative bg-white dark:bg-vscode-navButton-background-dark rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Your Progress
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <BookOpenIcon className="h-6 w-6 text-orange-500 mr-3" />
                                        <div>
                                            <p className="font-medium text-base text-gray-900 dark:text-white">
                                                {lastVisitedTopicTitle}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Last visited topic
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <ClockIcon className="h-6 w-6 text-orange-500 mr-3" />
                                        <div>
                                            <p className="font-medium text-base text-gray-900 dark:text-white">
                                                {lastVisitedTime}{" "}
                                                {/* Display last visited time */}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Last visit date
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    onClick={handleContinueReading}
                                    className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center justify-center text-sm"
                                >
                                    Continue Learning
                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Improved Discord card */}
                        <motion.a
                            href="https://discord.gg/EAy9XMufbY"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative overflow-hidden cursor-pointer group block"
                            whileTap={{ scale: 0.98 }}
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-xl opacity-10 blur-lg"></div>
                            <div className="relative bg-white/45 dark:bg-gray-800/45 rounded-xl p-6 transition-all duration-300 group-hover:bg-indigo-50/90 dark:group-hover:bg-indigo-900/30">
                                <div className="flex items-center space-x-3 mb-3">
                                    <motion.div
                                        animate={{
                                            y: isHovered ? -5 : 0,
                                            rotate: isHovered ? -10 : 0
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 10
                                        }}
                                    >
                                        <FaDiscord
                                            size={30}
                                            className="text-indigo-500 dark:text-indigo-400"
                                        />
                                    </motion.div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                                        Join our Community
                                    </h2>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                                    Connect with fellow Bitcoin enthusiasts, get
                                    support, and stay updated.
                                </p>
                                <motion.div
                                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    animate={{ x: isHovered ? [0, 10, 0] : 0 }}
                                    transition={{
                                        repeat: isHovered ? Infinity : 0,
                                        duration: 1.5,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <ArrowRightIcon className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
                                </motion.div>
                            </div>
                        </motion.a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Hero() {
    const { displayedText, isComplete } = useTypingEffect(code)
    const [lastVisitedTopic, setLastVisitedTopic] = useState<string | null>(
        null
    )
    const [lastVisitedTime, setLastVisitedTime] = useState<string | null>(null)
    const router = useRouter()

    const posts = useMemo(() => allCoreContent(sortPosts(allTopics)), [])

    useEffect(() => {
        const savedLastVisitedTopic = localStorage.getItem("lastVisitedTopic")
        if (savedLastVisitedTopic) {
            try {
                const { href, time } = JSON.parse(savedLastVisitedTopic)
                setLastVisitedTopic(href)
                setLastVisitedTime(new Date(time).toLocaleString())
            } catch (error) {
                console.error("Error parsing last visited topic:", error)
            }
        }
    }, [])

    const handleContinueReading = () => {
        if (lastVisitedTopic) {
            router.push(lastVisitedTopic)
        }
    }

    const lastVisitedTopicTitle = useMemo(() => {
        if (!lastVisitedTopic) return null
        const topic = posts.find((post) => `/${post.path}` === lastVisitedTopic)
        return topic ? topic.title : "Last Topic"
    }, [lastVisitedTopic, posts])

    return (
        <>
            {lastVisitedTopic &&
            lastVisitedTopic !== "/topics" &&
            lastVisitedTopicTitle ? (
                <ContinueReadingComp
                    lastVisitedTopicTitle={lastVisitedTopicTitle}
                    lastVisitedTime={lastVisitedTime}
                    handleContinueReading={handleContinueReading}
                />
            ) : (
                // Original Hero content for new users
                <div className="overflow-hidden -mb-32 mt-[-4.75rem] pb-32 pt-[4.75rem]">
                    <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
                        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
                            <div className="relative z-10 md:text-center lg:text-left">
                                <Image
                                    className="absolute bottom-full right-full -mb-56 -mr-72 opacity-50"
                                    src={blurOrangeImage}
                                    alt="Blur orange image"
                                    width={530}
                                    height={530}
                                    unoptimized
                                    priority
                                />
                                <div className="relative">
                                    <p className="inline bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600 dark:from-orange-200 dark:via-orange-400 dark:to-orange-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                                        Bitcoin Topics
                                    </p>
                                    <p className="mt-3 text-2xl tracking-tight text-gray-400">
                                        The interactive learning experience
                                        designed to help you become confident in
                                        Bitcoin development.
                                    </p>
                                    <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
                                        <Button href="/topics/bitcoin-history">
                                            Get started
                                        </Button>
                                        <Button
                                            href="https://github.com/bitcoin-dev-project/bitcoin-topics"
                                            target="_blank"
                                            variant="secondary"
                                        >
                                            View on GitHub
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="relative lg:static xl:pl-10">
                                <div className="absolute inset-x-[-50vw] -bottom-48 -top-32 lg:-bottom-32 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0  [mask-image:linear-gradient(transparent,white,transparent)] lg:[mask-image:linear-gradient(white,white,transparent)]">
                                    <HeroBackground className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
                                </div>
                                <div className="relative">
                                    <Image
                                        className="absolute -right-64 -top-64"
                                        src={blurOrangeImage}
                                        alt="Blur orange image"
                                        width={530}
                                        height={530}
                                        unoptimized
                                        priority
                                    />
                                    <Image
                                        className="absolute -bottom-40 -right-44"
                                        src={blurIndigoImage}
                                        alt="Blur indigo image"
                                        width={567}
                                        height={567}
                                        unoptimized
                                        priority
                                    />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-orange-300 via-orange-300/70 to-orange-300 opacity-10 blur-lg" />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-orange-300 via-orange-300/70 to-orange-300 opacity-10" />
                                    <div className="relative rounded-2xl bg-[#fefefd] dark:bg-[#1e1e1e]/90 ring-1 dark:ring-white/10 ring-orange/10 backdrop-blur">
                                        <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-orange-300/0 via-orange-300/70 to-orange-300/0" />
                                        <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-orange-400/0 via-orange-400 to-orange-400/0" />
                                        <div className="pl-4 pt-4">
                                            <TrafficLightsIcon className="h-2.5 w-auto stroke-gray-500/30" />
                                            <div className="mt-4 flex space-x-2 text-xs">
                                                {tabs.map((tab) => (
                                                    <div
                                                        key={tab.name}
                                                        className={clsx(
                                                            "flex h-6 rounded-full",
                                                            tab.isActive
                                                                ? "bg-gradient-to-r from-orange-400/30 via-orange-400 to-orange-400/30 p-px font-medium text-orange-300"
                                                                : "text-gray-500"
                                                        )}
                                                    >
                                                        <div
                                                            className={clsx(
                                                                "flex items-center rounded-full px-2.5",
                                                                tab.isActive &&
                                                                    "bg-gray-800"
                                                            )}
                                                        >
                                                            {tab.name}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-6 flex items-start px-1 text-sm">
                                                <div
                                                    aria-hidden="true"
                                                    className="select-none border-r border-gray-300/5 pr-4 font-mono text-gray-600"
                                                >
                                                    {Array.from({
                                                        length: code.split("\n")
                                                            .length
                                                    }).map((_, index) => (
                                                        <Fragment key={index}>
                                                            {(index + 1)
                                                                .toString()
                                                                .padStart(
                                                                    2,
                                                                    "0"
                                                                )}
                                                            <br />
                                                        </Fragment>
                                                    ))}
                                                </div>
                                                <Highlight
                                                    code={displayedText}
                                                    language={codeLanguage}
                                                    theme={{
                                                        plain: {},
                                                        styles: []
                                                    }}
                                                >
                                                    {({
                                                        className,
                                                        style,
                                                        tokens,
                                                        getLineProps,
                                                        getTokenProps
                                                    }) => (
                                                        <pre
                                                            className={clsx(
                                                                className,
                                                                "flex overflow-x-auto pb-6"
                                                            )}
                                                            style={style}
                                                        >
                                                            <code className="px-4">
                                                                <div
                                                                    style={{
                                                                        height: "150px",
                                                                        overflowY:
                                                                            "hidden"
                                                                    }}
                                                                >
                                                                    {tokens.map(
                                                                        (
                                                                            line,
                                                                            lineIndex
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    lineIndex
                                                                                }
                                                                                {...getLineProps(
                                                                                    {
                                                                                        line
                                                                                    }
                                                                                )}
                                                                            >
                                                                                {line.map(
                                                                                    (
                                                                                        token,
                                                                                        tokenIndex
                                                                                    ) => (
                                                                                        <span
                                                                                            key={
                                                                                                tokenIndex
                                                                                            }
                                                                                            {...getTokenProps(
                                                                                                {
                                                                                                    token
                                                                                                }
                                                                                            )}
                                                                                        />
                                                                                    )
                                                                                )}
                                                                            </div>
                                                                        )
                                                                    )}
                                                                    {isComplete && (
                                                                        <div className="mt-1 inline-block">
                                                                            <span className="animate-smooth-blink text-orange-400 inline-block w-[2px] h-[1.2em] bg-current"></span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </code>
                                                        </pre>
                                                    )}
                                                </Highlight>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
