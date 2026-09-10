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
import * as m from "framer-motion/m"
import {
    FaCheck,
    FaChevronDown,
    FaChevronRight,
    FaLightbulb,
    FaUsers
} from "react-icons/fa"

interface NavigationLink {
    title: string
    href: string
    project: boolean
    children?: NavigationLink[]
    icon?: string
    completed?: boolean
}

interface NavigationCategory {
    title: string
    links: NavigationLink[]
}

const categoryOrder = [
    "Introduction",
    "Tools",
    "History",
    "Transactions",
    "Scripts",
    "Keys and Addresses",
    "Taproot",
    "BIPS",
    "Others",
    "References",
    "Contribution"
]

type DotState = "completed" | "active" | "todo"

// One status marker that sits on the timeline rail.
// completed = filled brand-green + check · active = orange dot · todo = hollow ring
function StatusDot({
    state,
    size
}: {
    state: DotState
    size: "parent" | "child"
}) {
    const parent = size === "parent"
    if (state === "completed") {
        return (
            <span
                className={clsx(
                    "flex items-center justify-center rounded-full bg-brand-green",
                    parent ? "h-[18px] w-[18px]" : "h-[14px] w-[14px]"
                )}
            >
                <FaCheck
                    className={clsx(
                        "text-white",
                        parent ? "h-2.5 w-2.5" : "h-2 w-2"
                    )}
                    aria-label="Completed"
                />
            </span>
        )
    }
    if (state === "active") {
        return (
            <span
                className={clsx(
                    "rounded-full bg-orange-500 ring-4 ring-orange-500/15",
                    parent ? "h-[9px] w-[9px]" : "h-[7px] w-[7px]"
                )}
            />
        )
    }
    return (
        <span
            className={clsx(
                "rounded-full border border-brand-gray-200 bg-vscode-navigation-light dark:border-gray-600 dark:bg-vscode-navigation-dark",
                parent ? "h-[12px] w-[12px]" : "h-[9px] w-[9px]"
            )}
        />
    )
}

export function Navigation({
    className,
    onLinkClick
}: {
    className?: string
    onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
    const pathname = usePathname()
    const posts = useMemo(() => allCoreContent(sortPosts(allTopics)), [])
    const [expandedTopics, setExpandedTopics] = useState<
        Record<string, boolean>
    >({})
    const [initialLoad, setInitialLoad] = useState(true)
    const [completedTopics, setCompletedTopics] = useState<Set<string>>(
        new Set()
    )

    // Define handleCompletionChange outside of useEffect hooks
    const handleCompletionChange = useCallback(() => {
        const saved = localStorage.getItem("completedTopics")
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                const completedSet = new Set(
                    Object.keys(parsed).filter((key) => parsed[key])
                )
                setCompletedTopics(completedSet)
            } catch (error) {
                console.error("Error parsing completedTopics:", error)
            }
        }
    }, [])

    // Load completed topics and add listener
    useEffect(() => {
        handleCompletionChange()
        window.addEventListener(
            "topicCompletionChanged",
            handleCompletionChange
        )
        return () => {
            window.removeEventListener(
                "topicCompletionChanged",
                handleCompletionChange
            )
        }
    }, [handleCompletionChange])

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

    // Mark initial load complete after first render
    useEffect(() => {
        setInitialLoad(false)
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

    // normalize paths
    const normalizePath = (path: string) => {
        return path.replace("/decoding/", "").replace("/", "")
    }

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

    // Auto-expand the section you're currently in — whether you're on the
    // parent page itself or one of its children — so your context is open.
    // Only on initial load to prevent re-expanding after user collapses.
    useEffect(() => {
        if (!initialLoad) return
        
        navigation.forEach((section) => {
            section.links.forEach((link) => {
                const onChild = link.children?.some(
                    (child) => child.href === pathname
                )
                const onSelf =
                    link.href === pathname && (link.children?.length ?? 0) > 0
                if (onChild || onSelf) {
                    setExpandedTopics((prev) => {
                        return { ...prev, [link.href]: true }
                    })
                }
            })
        })
    }, [pathname, navigation, initialLoad])

    // Scroll the active lesson to the middle of the sidebar on load / nav,
    // scoped to the sidebar's own scroll container (never the main page).
    const scrollActiveIntoView = useCallback((el: HTMLLIElement | null) => {
        if (!el) return
        const container = el.closest(".brand-scrollbar") as HTMLElement | null
        if (!container) {
            el.scrollIntoView({ block: "center" })
            return
        }
        const cRect = container.getBoundingClientRect()
        const eRect = el.getBoundingClientRect()
        container.scrollTop +=
            eRect.top -
            cRect.top -
            container.clientHeight / 2 +
            eRect.height / 2
    }, [])

    const handleTopicClick = useCallback(
        (link: NavigationLink) => {
            const topicData = {
                href: link.href,
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
        <nav className={clsx("text-md lg:text-sm font-normal", className)}>
            <Link
                className="mb-8 flex flex-row items-center gap-3 hover:no-underline"
                href="/decoding"
            >
                <div className="h-6 w-1 rounded-full bg-[#e77429]"></div>
                <h6 className="text-xl font-bold text-brand-dark-100 dark:text-white">
                    Learn
                </h6>
            </Link>

            {/* Secondary destinations — quiet links, not cards */}
            <div className="mb-8 space-y-0.5">
                <Link
                    href="/decoding/communities"
                    className="group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-brand-gray-300 transition-colors hover:bg-brand-gray hover:text-brand-dark-100 dark:text-gray-400 dark:hover:bg-gray-800/40 dark:hover:text-gray-200"
                >
                    <FaUsers className="h-3.5 w-3.5 shrink-0 text-brand-gray-200 group-hover:text-orange-500 dark:text-gray-500" />
                    Communities
                </Link>
                <Link
                    href="/explainers"
                    className="group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-brand-gray-300 transition-colors hover:bg-brand-gray hover:text-brand-dark-100 dark:text-gray-400 dark:hover:bg-gray-800/40 dark:hover:text-gray-200"
                >
                    <FaLightbulb className="h-3.5 w-3.5 shrink-0 text-brand-gray-200 group-hover:text-orange-500 dark:text-gray-500" />
                    Explainers
                </Link>
            </div>

            <ul role="list" className="space-y-7">
                {navigation.map((section) => {
                    const lessonLinks = section.links.flatMap((l) => [
                        l,
                        ...(l.children || [])
                    ])
                    const doneCount = lessonLinks.filter((l) =>
                        completedTopics.has(normalizePath(l.href))
                    ).length
                    return (
                        <li key={section.title}>
                            <div className="mb-3 flex items-baseline justify-between gap-2">
                                <h2 className="font-display text-sm font-bold text-brand-dark-100 dark:text-white">
                                    {section.title}
                                </h2>
                                <span className="shrink-0 text-[11px] font-medium tabular-nums text-brand-gray-200 dark:text-gray-500">
                                    {doneCount}/{lessonLinks.length}
                                </span>
                            </div>
                            <ul role="list" className="relative">
                                {section.links.map((link, i) => {
                                    const isActive = link.href === pathname
                                    const isDone = completedTopics.has(
                                        normalizePath(link.href)
                                    )
                                    const state: DotState = isDone
                                        ? "completed"
                                        : isActive
                                          ? "active"
                                          : "todo"
                                    const children = link.children ?? []
                                    const hasChildren = children.length > 0
                                    const isExpanded =
                                        !!expandedTopics[link.href]
                                    const showSpineBelow =
                                        i < section.links.length - 1 ||
                                        (hasChildren && isExpanded)
                                    return (
                                        <li
                                            key={link.href}
                                            className="relative"
                                            ref={
                                                isActive
                                                    ? scrollActiveIntoView
                                                    : undefined
                                            }
                                        >
                                            {i > 0 && (
                                                <span
                                                    aria-hidden
                                                    className="absolute left-[12px] top-0 h-[18px] w-px bg-brand-gray-200 dark:bg-gray-700"
                                                />
                                            )}
                                            {showSpineBelow && (
                                                <span
                                                    aria-hidden
                                                    className="absolute left-[12px] top-[18px] bottom-0 w-px bg-brand-gray-200 dark:bg-gray-700"
                                                />
                                            )}
                                            <span
                                                aria-hidden={
                                                    state !== "completed"
                                                }
                                                className="absolute left-[3px] top-[9px] z-10 flex h-[18px] w-[18px] items-center justify-center"
                                            >
                                                <StatusDot
                                                    state={state}
                                                    size="parent"
                                                />
                                            </span>
                                            <div
                                                className="flex items-stretch"
                                                onClick={() =>
                                                    hasChildren &&
                                                    toggleTopic(link.href)
                                                }
                                            >
                                                <span
                                                    className="w-8 shrink-0"
                                                    aria-hidden
                                                />
                                                <div
                                                    className={clsx(
                                                        "flex min-w-0 flex-1 items-center rounded-md transition-colors duration-150",
                                                        isActive
                                                            ? "bg-orange-500/10"
                                                            : "hover:bg-brand-gray dark:hover:bg-gray-800/40"
                                                    )}
                                                >
                                                    <Link
                                                        href={link.href}
                                                        title={link.title}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            onLinkClick &&
                                                                onLinkClick(e)
                                                            handleTopicClick(
                                                                link
                                                            )
                                                        }}
                                                        className={clsx(
                                                            "min-w-0 flex-1 truncate py-2 pl-2 pr-2 text-sm leading-snug",
                                                            isActive
                                                                ? "font-semibold text-orange-500"
                                                                : isDone
                                                                  ? "text-brand-gray-300 hover:text-orange-500 dark:text-gray-400"
                                                                  : "text-brand-dark-100 hover:text-orange-500 dark:text-gray-200"
                                                        )}
                                                    >
                                                        {link.title}
                                                    </Link>
                                                    {hasChildren && (
                                                        <button
                                                            type="button"
                                                            aria-label={
                                                                isExpanded
                                                                    ? "Collapse"
                                                                    : "Expand"
                                                            }
                                                            className={clsx(
                                                                "mr-2 shrink-0 rounded p-1.5",
                                                                isActive
                                                                    ? "text-orange-500"
                                                                    : "text-brand-gray-200 hover:text-brand-dark-100 dark:text-gray-500 dark:hover:text-gray-300"
                                                            )}
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                toggleTopic(
                                                                    link.href
                                                                )
                                                            }}
                                                        >
                                                            {isExpanded ? (
                                                                <FaChevronDown className="h-2.5 w-2.5" />
                                                            ) : (
                                                                <FaChevronRight className="h-2.5 w-2.5" />
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            {hasChildren && isExpanded && (
                                                <ul
                                                    role="list"
                                                    className="relative"
                                                >
                                                    <span
                                                        aria-hidden
                                                        className="absolute left-[12px] top-0 h-[16px] w-[20px] rounded-bl-[10px] border-b border-l border-brand-gray-200 dark:border-gray-700"
                                                    />
                                                    {children.map(
                                                        (child, ci) => {
                                                            const childActive =
                                                                child.href ===
                                                                pathname
                                                            const childDone =
                                                                completedTopics.has(
                                                                    normalizePath(
                                                                        child.href
                                                                    )
                                                                )
                                                            const childState: DotState =
                                                                childDone
                                                                    ? "completed"
                                                                    : childActive
                                                                      ? "active"
                                                                      : "todo"
                                                            const childLast =
                                                                ci ===
                                                                children.length -
                                                                    1
                                                            return (
                                                                <li
                                                                    key={
                                                                        child.href
                                                                    }
                                                                    className="relative"
                                                                    ref={
                                                                        childActive
                                                                            ? scrollActiveIntoView
                                                                            : undefined
                                                                    }
                                                                >
                                                                    {ci > 0 && (
                                                                        <span
                                                                            aria-hidden
                                                                            className="absolute left-[32px] top-0 h-[16px] w-px bg-brand-gray-200 dark:bg-gray-700"
                                                                        />
                                                                    )}
                                                                    {!childLast && (
                                                                        <span
                                                                            aria-hidden
                                                                            className="absolute left-[32px] top-[16px] bottom-0 w-px bg-brand-gray-200 dark:bg-gray-700"
                                                                        />
                                                                    )}
                                                                    <span
                                                                        aria-hidden={
                                                                            childState !==
                                                                            "completed"
                                                                        }
                                                                        className="absolute left-[25px] top-[9px] z-10 flex h-[14px] w-[14px] items-center justify-center"
                                                                    >
                                                                        <StatusDot
                                                                            state={
                                                                                childState
                                                                            }
                                                                            size="child"
                                                                        />
                                                                    </span>
                                                                    <div className="flex items-stretch">
                                                                        <span
                                                                            className="w-11 shrink-0"
                                                                            aria-hidden
                                                                        />
                                                                        <div
                                                                            className={clsx(
                                                                                "flex min-w-0 flex-1 items-center rounded-md transition-colors duration-150",
                                                                                childActive
                                                                                    ? "bg-orange-500/10"
                                                                                    : "hover:bg-brand-gray dark:hover:bg-gray-800/40"
                                                                            )}
                                                                        >
                                                                            <Link
                                                                                href={
                                                                                    child.href
                                                                                }
                                                                                title={
                                                                                    child.title
                                                                                }
                                                                                onClick={(
                                                                                    e
                                                                                ) => {
                                                                                    handleTopicClick(
                                                                                        child
                                                                                    )
                                                                                    onLinkClick &&
                                                                                        onLinkClick(
                                                                                            e
                                                                                        )
                                                                                }}
                                                                                className={clsx(
                                                                                    "min-w-0 flex-1 truncate py-1.5 pl-1 pr-2 text-[13px] leading-snug",
                                                                                    childActive
                                                                                        ? "font-medium text-orange-500"
                                                                                        : childDone
                                                                                          ? "text-brand-gray-300 hover:text-orange-500 dark:text-gray-500"
                                                                                          : "text-brand-gray-300 hover:text-orange-500 dark:text-gray-400"
                                                                                )}
                                                                            >
                                                                                {
                                                                                    child.title
                                                                                }
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )
                                                        }
                                                    )}
                                                </ul>
                                            )}
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
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
        <div className="my-6 border-t border-brand-gray-100 mt-12 pt-4 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Bitcoin Only Newsletter
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
                <m.button
                    type="submit"
                    className="ml-2 px-3 py-1 text-sm font-medium text-orange-500 hover:text-orange-600 focus:outline-none"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                >
                    {loading ? "Subscribing..." : "Subscribe"}
                </m.button>
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
