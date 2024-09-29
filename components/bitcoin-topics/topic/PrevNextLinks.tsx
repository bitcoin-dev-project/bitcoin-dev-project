"use client"

import Link from "next/link"
import clsx from "clsx"
import { useCallback } from "react"

function ArrowIcon(props: React.ComponentPropsWithoutRef<"svg">) {
    return (
        <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
            <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z" />
        </svg>
    )
}

function PageLink({
    title,
    href,
    direction = "next",
    onClick,
    ...props
}: Omit<React.ComponentPropsWithoutRef<"div">, "direction" | "title"> & {
    title: string
    href: string
    direction?: "previous" | "next"
    onClick: () => void
}) {
    return (
        <div {...props}>
            <Link href={href} onClick={onClick} className="block">
                <dt className="font-display text-sm font-medium text-gray-900 dark:text-white">
                    {direction === "next" ? "Next" : "Previous"}
                </dt>
                <dd className="mt-1">
                    <span
                        className={clsx(
                            "flex items-center gap-x-1 text-base font-semibold text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
                            direction === "previous" && "flex-row-reverse"
                        )}
                    >
                        {title}
                        <ArrowIcon
                            className={clsx(
                                "h-4 w-4 flex-none fill-current",
                                direction === "previous" && "-scale-x-100"
                            )}
                        />
                    </span>
                </dd>
            </Link>
        </div>
    )
}

export function PrevNextLinks({
    next,
    prev
}: {
    next?: { path: string; title: string }
    prev?: { path: string; title: string }
}) {
    const handleTopicClick = useCallback((href: string) => {
        const topicData = {
            href,
            children: []
        }
        localStorage.setItem("lastVisitedTopic", JSON.stringify(topicData))
    }, [])

    if (!next && !prev) {
        return null
    }

    return (
        <dl className="mt-12 flex border-t border-gray-200 pt-6 dark:border-gray-800">
            {next?.path && (
                <PageLink
                    direction="previous"
                    title={next.title}
                    href={`/${next.path}`}
                    onClick={() => handleTopicClick(`/${next.path}`)}
                />
            )}
            {prev?.path && (
                <PageLink
                    className="ml-auto text-right"
                    title={prev.title}
                    href={`/${prev.path}`}
                    onClick={() => handleTopicClick(`/${prev.path}`)}
                />
            )}
        </dl>
    )
}
