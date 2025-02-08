"use client"

import { ReactNode } from "react"
import { CoreContent } from "pliny/utils/contentlayer"
import type { Topic, Authors } from "contentlayer/generated"
import BaseLayout from "./BaseLayout"

interface LayoutProps {
    content: CoreContent<Topic>
    authorDetails: CoreContent<Authors>[]
    next?: { path: string; title: string }
    prev?: { path: string; title: string }
    children: ReactNode
}

export default function TopicLayout({
    content,
    next,
    prev,
    children
}: LayoutProps) {
    return (
        <BaseLayout
            content={content}
            next={next}
            prev={prev}
            showBanner={false}
        >
            {children}
        </BaseLayout>
    )
}
