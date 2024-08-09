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

interface NavigationLink {
    title: string
    href: string
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
    let pathname = usePathname()
    const posts = allCoreContent(sortPosts(allTopics))

    const groupedPosts: { [key: string]: NavigationLink[] } = posts.reduce(
        (acc: { [key: string]: NavigationLink[] }, post: any) => {
            const category = post.category || "Others"
            if (!acc[category]) {
                acc[category] = []
            }
            acc[category].push({
                title: post.title,
                href: `/${post.path}`
            })
            return acc
        },
        {}
    )

    const sortedCategories = Object.keys(groupedPosts).sort((a, b) => {
        return categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
    })

    const navigation: NavigationCategory[] = sortedCategories.map(
        (category) => ({
            title: category,
            links: groupedPosts[category]
        })
    )

    return (
        <nav className={clsx("text-base lg:text-sm", className)}>
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
            <ul role="list" className="space-y-9">
                {navigation.map((section) => (
                    <li key={section.title}>
                        <h2 className="font-display font-medium text-gray-900 dark:text-white">
                            {section.title}
                        </h2>
                        <ul
                            role="list"
                            className="mt-2 space-y-2 border-l-2 border-gray-100 lg:mt-4 lg:space-y-4 lg:border-gray-200 dark:border-gray-800"
                        >
                            {section.links.map((link) => (
                                <li key={link.href} className="relative">
                                    <Link
                                        href={link.href}
                                        onClick={onLinkClick}
                                        className={clsx(
                                            "block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full",
                                            link.href === pathname
                                                ? "font-semibold text-orange-500 before:bg-orange-500"
                                                : "text-gray-500 before:hidden before:bg-gray-300 hover:text-gray-600 hover:before:block dark:text-gray-400 dark:before:bg-gray-700 dark:hover:text-gray-300"
                                        )}
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
