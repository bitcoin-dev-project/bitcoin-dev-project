"use client"

import { ReactNode, useState, useEffect } from "react"
import { CoreContent } from "pliny/utils/contentlayer"
import type { Topic, Authors } from "contentlayer/generated"
import { Hero } from "../hero/Hero"
import { PrevNextLinks } from "../topic/PrevNextLinks"
import { TopicHeader } from "../topic/TopicHeader"
import { usePathname } from "next/navigation"
import React from "react"

interface LayoutProps {
    content: CoreContent<Topic>
    next?: { path: string; title: string }
    prev?: { path: string; title: string }
    children: ReactNode
}

export default function FullWidthLayout({
    content,
    next,
    prev,
    children
}: LayoutProps) {
    const pathname = usePathname()
    const isHomePage = pathname === "/decoding"
    const isRoadmapPage = pathname === "/decoding/interactive-roadmap"

    const { title, tags } = content

    return (
        <>
            {/* Mobile Content - FULL WIDTH */}
            <div className="lg:hidden">
                {isHomePage && <Hero />}

                <div
                    className={`w-full px-0 ${isRoadmapPage ? "py-0 mt-0" : "py-16 mt-12"}`}
                >
                    <article className="w-full">
                        {!isRoadmapPage && (
                            <div className="px-4 mb-9">
                                <TopicHeader
                                    title={title}
                                    tags={tags}
                                    summary={content.summary}
                                />
                            </div>
                        )}
                        <div className="w-full">{children}</div>
                    </article>
                    <div className="px-4 mt-8">
                        <PrevNextLinks prev={prev} next={next} />
                    </div>
                </div>
            </div>

            {/* Desktop Content - FULL WIDTH */}
            <div className="hidden lg:block">
                {isHomePage && <Hero />}
                <div
                    className={`min-w-0 flex-auto w-full ${isRoadmapPage ? "pb-0" : "pb-16"}`}
                >
                    <article className="w-full">
                        {!isRoadmapPage && (
                            <div className="px-8 mb-9">
                                <TopicHeader
                                    title={title}
                                    tags={tags}
                                    summary={content.summary}
                                />
                            </div>
                        )}
                        <div className="w-full px-0">{children}</div>
                    </article>
                    <div className="px-8 xl:px-16">
                        <PrevNextLinks prev={prev} next={next} />
                    </div>
                </div>
            </div>
        </>
    )
}
