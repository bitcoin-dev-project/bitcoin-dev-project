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
    "Scripts",
    "BIPS",
    "Others",
    "References",
    "Contribution",
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
    const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({})

    // Load expanded state from localStorage on component mount
    useEffect(() => {
        const savedState = localStorage.getItem('expandedTopics')
        if (savedState) {
            setExpandedTopics(JSON.parse(savedState))
        }
    }, [])

    // Save expanded state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('expandedTopics', JSON.stringify(expandedTopics))
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
    }, [posts])

    const toggleTopic = useCallback((topicHref: string) => {
        setExpandedTopics(prev => ({
            ...prev,
            [topicHref]: !prev[topicHref]
        }))
    }, [])

    // Update expanded state when pathname changes
    useEffect(() => {
        const newExpandedState: Record<string, boolean> = {}
        navigation.forEach(section => {
            section.links.forEach(link => {
                if (link.children && (link.href === pathname || link.children.some(child => child.href === pathname))) {
                    newExpandedState[link.href] = true
                }
            })
        })
        setExpandedTopics(prev => {
            const updated = {...prev, ...newExpandedState}
            return JSON.stringify(updated) !== JSON.stringify(prev) ? updated : prev
        })
    }, [pathname, navigation])

    const getIcon = useCallback((iconName: string) => {
        const IconComponent = Icons[iconName as keyof typeof Icons] || Icons.FaQuestionCircle
        return <IconComponent className="inline-block mr-2 text-current" />
    }, [])

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
                        <ul
                            role="list"
                            className="space-y-2 pl-2"
                        >
                            {section.links.map((link) => (
                                <li key={link.href} className="relative">
                                    <div 
                                        className="flex items-center cursor-pointer"
                                        onClick={() => toggleTopic(link.href)}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onLinkClick && onLinkClick(e)
                                            }}
                                            className={clsx(
                                                "flex items-center font-medium w-full py-1 rounded-md",
                                                link.href === pathname
                                                    ? "text-orange-500"
                                                    : "text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                                            )}
                                        >
                                            {link.icon && getIcon(link.icon)}
                                            {link.title}
                                        </Link>
                                        {link.children && link.children.length > 0 && (
                                            <span className="ml-1 text-xs flex-shrink-0">
                                                {expandedTopics[link.href] 
                                                    ? <FaChevronDown className="w-3 h-3" />
                                                    : <FaChevronRight className="w-3 h-3" />
                                                }
                                            </span>
                                        )}
                                    </div>
                                    {link.children && link.children.length > 0 && expandedTopics[link.href] && (
                                        <ul className="mt-1 space-y-1 pl-4">
                                            {link.children.map((childLink) => (
                                                <li
                                                    key={childLink.href}
                                                    className="relative"
                                                >
                                                    <Link
                                                        href={childLink.href}
                                                        onClick={onLinkClick}
                                                        className={clsx(
                                                            "block font-normal w-full py-1 rounded-md",
                                                            childLink.href === pathname
                                                                ? "text-orange-500"
                                                                : "text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                                                        )}
                                                    >
                                                        {childLink.title}
                                                    </Link>
                                                </li>
                                            ))}
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Submitted:", email)
        setEmail("")
    }

    return (
        <div className="my-6 border-t  border-gray-200 mt-12 pt-4  dark:border-gray-800">
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
                >
                    Subscribe
                </motion.button>
            </form>
        </div>
    )
}
