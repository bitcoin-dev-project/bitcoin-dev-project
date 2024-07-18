import { ReactNode } from "react"
import { CoreContent } from "pliny/utils/contentlayer"
import type { Topic, Authors } from "contentlayer/generated"
import siteMetadata from "@/data/siteMetadata"
import Summary from "../topic/summary"
import Metadata from "../topic/metadata"
import Link from "../markdown-ui/Link"
import { Navigation } from "../Navigation"
import clsx from "clsx"

const editUrl = (path: string) =>
    `${siteMetadata.topicsRepo}/blob/main/topics/${path}`

interface LayoutProps {
    content: CoreContent<Topic>
    authorDetails: CoreContent<Authors>[]
    next?: { path: string; title: string }
    prev?: { path: string; title: string }
    children: ReactNode
}

export default function PostLayout({
    content,
    authorDetails,
    next,
    prev,
    children
}: LayoutProps) {
    const { filePath, path, date, title, tags } = content
    const basePath = path.split("/")[0]

    return (
        <>
            {/* <div className="flex bg-[#F6F6F6]"> */}
            <div className="flex pt-10 mx-auto  max-w-7xl">
                <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-6 pl-0.5 pr-4 xl:w-72 xl:pr-8">
                    <Navigation content={content} />
                </div>
                <div className="mx-auto flex-1 p-6 pt-0">
                    <div>
                        <header className="pt-6 xl:pb-6">
                            <div className="space-y-1 text-center">
                                <div>
                                    <h1 className="text-6xl font-bold mb-6">
                                        {title}
                                    </h1>
                                </div>
                            </div>
                        </header>
                    </div>
                    <div className="flex">
                        <div className="w-4/4 pr-8">
                            <div className="mb-5">
                                <Metadata badges={tags} />
                            </div>

                            {content.summary && (
                                <Summary summary={content.summary} />
                            )}

                            <div className="prose max-w-none pb-8 pt-10">
                                {children}
                            </div>
                            <footer>
                                <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                                    <div className=""></div>
                                    {(next || prev) && (
                                        <div className="flex justify-between items-center py-4 xl:py-8">
                                            {next && next.path && (
                                                <PageLink
                                                    dir="previous"
                                                    title={next.title}
                                                    href={`/${next.path}`}
                                                />
                                            )}
                                            {prev && prev.path && (
                                                <PageLink
                                                    dir="next"
                                                    title={prev.title}
                                                    href={`/${prev.path}`}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function PageLink({
    title,
    href,
    dir = "next",
    ...props
}: Omit<React.ComponentPropsWithoutRef<"div">, "dir" | "title"> & {
    title: string
    href: string
    dir?: "previous" | "next"
}) {
    return (
        <div {...props}>
            {/* <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
        {dir === 'next' ? 'Next' : 'Previous'}
      </dt> */}
            <dd className="mt-1">
                <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {dir} Topic
                </h2>
                <Link
                    href={href}
                    className={clsx(
                        "flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300",
                        dir === "previous" && "flex-row-reverse"
                    )}
                >
                    {title}
                    <ArrowIcon
                        className={clsx(
                            "h-4 w-4 flex-none fill-current",
                            dir === "previous" && "-scale-x-100"
                        )}
                    />
                </Link>
            </dd>
        </div>
    )
}

function ArrowIcon(props: React.ComponentPropsWithoutRef<"svg">) {
    return (
        <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
            <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z" />
        </svg>
    )
}
