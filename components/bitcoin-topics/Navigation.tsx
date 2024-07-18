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
    const navigation = [
        {
            title: "Key Terms",
            links: posts.map((post) => ({
                title: post.title,
                href: "/" + post.path
            }))
        }
    ]

    return (
        <nav className={clsx("text-base lg:text-sm", className, "w-64 m-10")}>
            <a
                className="mb-6 flex flex-row items-center space-x-3 hover:no-underline"
                href="/topics"
            >
                <div className="h-11 w-1 rounded-lg bg-[#e77429]"></div>
                <div>
                    <h6 className="mt-1 font-bold text-xl">Learn</h6>
                    <div className="text-gray-600">
                        Bitcoin, Privacy &amp; Decentralization
                    </div>
                </div>
            </a>
            <ul role="list" className="space-y-9">
                {navigation.map((section) => (
                    <li key={section.title}>
                        <h2 className="font-display font-medium text-slate-900 dark:text-white">
                            {section.title}
                        </h2>
                        <ul
                            role="list"
                            className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
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
                                                : "text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
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
