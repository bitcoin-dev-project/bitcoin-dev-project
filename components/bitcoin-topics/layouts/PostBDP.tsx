"use client"
import { ReactNode } from "react"
import { CoreContent } from "pliny/utils/contentlayer"
import type { Topic, Authors } from "contentlayer/generated"
import siteMetadata from "@/data/siteMetadata"
import Summary from "../topic/summary"
import Metadata from "../topic/metadata"
import Link from "../markdown-ui/Link"
import { Navigation } from "../Navigation"
import clsx from "clsx"
import { Hero } from "../hero/Hero"
import { PrevNextLinks } from "../topic/PrevNextLinks"
import { Prose } from "../topic/Prose"
import { TopicHeader } from "../topic/TopicHeader"
import { usePathname } from "next/navigation"

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
    debugger
    let pathname = usePathname()
    let isHomePage = pathname === "/topics"

    const { filePath, path, date, title, tags } = content

    return (
        <div className="flex w-full flex-col">
            {isHomePage && <Hero />}

            <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
                <div className="hidden lg:relative lg:block lg:flex-nne">
                    <div className="absolute inset-y-0 right-0 w-[50vw] dark:hidden" />
                    <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
                    <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
                    <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-4 xl:w-72 xl:pr-8">
                        <Navigation content={content} />
                    </div>
                </div>

                <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
                    <article>
                        <TopicHeader
                            title={title}
                            tags={tags}
                            summary={content.summary}
                        />
                        <Prose>{children}</Prose>
                    </article>
                    <PrevNextLinks prev={prev} next={next} />
                </div>
            </div>
        </div>
    )
}
