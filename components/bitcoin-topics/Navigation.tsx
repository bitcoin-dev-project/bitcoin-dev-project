"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import {
    CoreContent,
    allCoreContent,
    sortPosts
} from "pliny/utils/contentlayer"
import { Topic, allTopics } from "@/.contentlayer/generated"
import { useState, useEffect, useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import { FaChevronRight, FaChevronDown } from "react-icons/fa"
import * as Icons from "react-icons/fa"

interface NavigationLink {
    title: string
    href: string
    project: boolean
    children?: NavigationLink[]
    icon?: string
}

interface NavigationCategory {
    title: string
    links: NavigationLink[]
}

const categoryOrder = [
    "Introduction",
    "History",
    "Scripts",
    "BIPS",
    "Others",
    "References",
    "Contribution"
]

export function Navigation({
    content,
    className,
    onLinkClick
}: {
    content: CoreContent<Topic>
    className?: string
    onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
    const pathname = usePathname()
    const posts = useMemo(() => allCoreContent(sortPosts(allTopics)), [])
    const [expandedTopics, setExpandedTopics] = useState<
        Record<string, boolean>
    >({})

    // Load expanded state from localStorage on component mount
    useEffect(() => {
        const savedState = localStorage.getItem("expandedTopics")
        if (savedState) {
            try {
                const parsedState = JSON.parse(savedState)
                setExpandedTopics(parsedState)
            } catch (error) {
                console.error(
                    "Error parsing expandedTopics from localStorage:",
                    error
                )
            }
        }
    }, [])

    // Save expanded state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("expandedTopics", JSON.stringify(expandedTopics))
        // Store expanded state for children as well
        const expandedChildren = Object.keys(expandedTopics).reduce(
            (acc, key) => {
                const children = expandedTopics[key]
                    ? navigation
                          .find((section) =>
                              section.links.some((link) => link.href === key)
                          )
                          ?.links.find((link) => link.href === key)?.children
                    : []
                if (children) {
                    acc[key] = children.map((child) => child.href)
                }
                return acc
            },
            {} as Record<string, string[]>
        )
        localStorage.setItem(
            "expandedChildren",
            JSON.stringify(expandedChildren)
        )
    }, [expandedTopics])

    const childSlugs = new Set(
        posts.flatMap(
            (post: CoreContent<Topic>) => post.childTopics?.childSlugs || []
        )
    )

    const groupedPosts: Record<string, CoreContent<Topic>[]> = posts.reduce(
        (
            acc: Record<string, CoreContent<Topic>[]>,
            post: CoreContent<Topic>
        ) => {
            if (!childSlugs.has(post.slug)) {
                const category = post.category || "Others"
                if (!acc[category]) {
                    acc[category] = []
                }
                acc[category].push(post)
            }
            return acc
        },
        {}
    )

    const sortedCategories = Object.keys(groupedPosts).sort(
        (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
    )

    Object.keys(groupedPosts).forEach((category) => {
        groupedPosts[category].sort((a, b) => {
            const orderA = a.order !== undefined ? a.order : Infinity
            const orderB = b.order !== undefined ? b.order : Infinity
            return orderA - orderB
        })
    })

    const navigation = useMemo(() => {
        const navigation: NavigationCategory[] = sortedCategories.map(
            (category) => ({
                title: category,
                links: groupedPosts[category].map((post) => ({
                    title: post.title,
                    href: `/${post.path}`,
                    project: post.project || false,
                    children: post.childTopics?.childSlugs
                        ?.map((childSlug: string) => {
                            // Explicitly typing `childSlug` as `string`
                            const childPost = posts.find(
                                (p) => p.slug === childSlug
                            )
                            return childPost
                                ? {
                                      title: childPost.title,
                                      href: `/${childPost.path}`,
                                      project: childPost.project || false
                                  }
                                : null
                        })
                        .filter(Boolean) as NavigationLink[],
                    icon: post.icon
                }))
            })
        )
        return navigation
    }, [posts, groupedPosts, sortedCategories])

    const toggleTopic = useCallback((topicHref: string) => {
        setExpandedTopics((prev) => ({
            ...prev,
            [topicHref]: !prev[topicHref]
        }))
    }, [])

    // Update expanded state when pathname changes
    useEffect(() => {
        const newExpandedState: Record<string, boolean> = {}
        navigation.forEach((section) => {
            section.links.forEach((link) => {
                if (
                    link.children &&
                    (link.href === pathname ||
                        link.children.some((child) => child.href === pathname))
                ) {
                    newExpandedState[link.href] = true
                }
            })
        })
        setExpandedTopics((prev) => {
            const updated = { ...prev, ...newExpandedState }
            return JSON.stringify(updated) !== JSON.stringify(prev)
                ? updated
                : prev
        })
    }, [pathname, navigation])

    const getIcon = useCallback((iconName: string) => {
        const IconComponent =
            Icons[iconName as keyof typeof Icons] || Icons.FaQuestionCircle
        return <IconComponent className="inline-block mr-2 text-current" />
    }, [])

    const handleTopicClick = useCallback(
        (link: NavigationLink) => {
            const topicData = {
                href: link.href,
                time: new Date().toISOString(),
                children:
                    link.children && expandedTopics[link.href]
                        ? link.children.map((child) => child.href)
                        : []
            }
            localStorage.setItem("lastVisitedTopic", JSON.stringify(topicData))
        },
        [expandedTopics]
    )

    return (
        <nav className={clsx("text-md lg:text-sm font-medium", className)}>
            <Link
                className="mb-6 flex flex-row items-center space-x-3 hover:no-underline"
                href="/topics"
            >
                <div className="h-11 w-1 rounded-lg bg-[#e77429]"></div>
                <div>
                    <h6 className="mt-1 font-bold text-xl">Learn</h6>
                    <div className="text-gray-600 dark:text-gray-400">
                        Bitcoin, Privacy &amp; Decentralization
                    </div>
                </div>
            </Link>

            <ul role="list" className="space-y-6">
                {navigation.map((section) => (
                    <li key={section.title}>
                        <h2 className="font-display font-bold text-gray-900 dark:text-white mb-2">
                            {section.title}
                        </h2>
                        <ul role="list" className="space-y-1 pl-2">
                            {section.links.map((link) => (
                                <li key={link.href} className="relative">
                                    <div
                                        className={clsx(
                                            "flex items-center cursor-pointer rounded-md",
                                            "transition-colors duration-200 ease-in-out",
                                            link.href === pathname
                                                ? "bg-orange-100 dark:bg-orange-900/20"
                                                : "hover:bg-gray-100 dark:hover:bg-gray-800/50"
                                        )}
                                        onClick={() => toggleTopic(link.href)}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onLinkClick && onLinkClick(e)
                                                handleTopicClick(link)
                                            }}
                                            className={clsx(
                                                "flex items-center font-medium w-full py-2 px-3 rounded-md",
                                                link.href === pathname
                                                    ? "text-orange-500"
                                                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                            )}
                                        >
                                            {link.icon && getIcon(link.icon)}
                                            {link.title}
                                        </Link>
                                        {link.children &&
                                            link.children.length > 0 && (
                                                <span
                                                    className={clsx(
                                                        "ml-auto mr-3 text-xs flex-shrink-0 p-2",
                                                        link.href === pathname
                                                            ? "text-orange-500"
                                                            : "text-gray-400"
                                                    )}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        toggleTopic(link.href)
                                                    }}
                                                >
                                                    {expandedTopics[
                                                        link.href
                                                    ] ? (
                                                        <FaChevronDown className="w-3 h-3" />
                                                    ) : (
                                                        <FaChevronRight className="w-3 h-3" />
                                                    )}
                                                </span>
                                            )}
                                    </div>
                                    {link.children &&
                                        link.children.length > 0 &&
                                        expandedTopics[link.href] && (
                                            <ul className="mt-1 space-y-1 pl-6">
                                                {link.children.map(
                                                    (childLink) => (
                                                        <li
                                                            key={childLink.href}
                                                            className="relative"
                                                        >
                                                            <Link
                                                                href={
                                                                    childLink.href
                                                                }
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    handleTopicClick(
                                                                        childLink
                                                                    )
                                                                    onLinkClick &&
                                                                        onLinkClick(
                                                                            e
                                                                        )
                                                                }}
                                                                className={clsx(
                                                                    "block font-normal w-full py-2 px-3 rounded-md",
                                                                    "transition-colors duration-200 ease-in-out",
                                                                    childLink.href ===
                                                                        pathname
                                                                        ? "bg-orange-100 dark:bg-orange-900/20 text-orange-500"
                                                                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
                                                                )}
                                                            >
                                                                {
                                                                    childLink.title
                                                                }
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <EmailSubscription />
        </nav>
    )
}
const EmailSubscription = () => {
    const [email, setEmail] = useState("")
    const [mailchimpResponse, setMailchimpResponse] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMailchimpResponse("")
        setError("")
        setLoading(true)

        try {
            const response = await fetch("/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })

            setLoading(false)
            if (response.ok) {
                const data = await response.json()
                setMailchimpResponse(data.message)
                setEmail("")
                return
            }

            if (response.status === 400) {
                const data = await response.json()
                if (data?.title?.toLowerCase().includes("member exists")) {
                    setError("You are already subscribed to our newsletter")
                    return
                }
            }
            throw new Error("Something went wrong. Please try again later.")
        } catch (error: any) {
            setLoading(false)
            console.error(error)
            if (error instanceof Error) {
                setError(error.message)
            }
        }
    }

    return (
        <div className="my-6 border-t border-gray-200 mt-12 pt-4 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Stay Updated
            </h3>
            <form onSubmit={handleSubmit} className="flex items-center">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-grow px-3 py-1 text-sm bg-transparent border-b border-gray-300 focus:border-orange-500 focus:outline-none dark:border-gray-700 dark:text-gray-300"
                    required
                />
                <motion.button
                    type="submit"
                    className="ml-2 px-3 py-1 text-sm font-medium text-orange-500 hover:text-orange-600 focus:outline-none"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                >
                    {loading ? "Subscribing..." : "Subscribe"}
                </motion.button>
            </form>
            {mailchimpResponse && (
                <p className="mt-2 text-sm text-green-500">
                    {mailchimpResponse}
                </p>
            )}
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    )
}
