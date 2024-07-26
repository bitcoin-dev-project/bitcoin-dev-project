"use client"

import Metadata from "./metadata"
import Summary from "./summary"

export function TopicHeader({ title, tags, summary }: any) {
    return (
        <header className="mb-9 space-y-1">
            <header className="pt-6 xl:pb-6">
                <div className="space-y-1 text-center">
                    <h1 className="text-6xl font-bold mb-6">{title}</h1>
                </div>
            </header>
            {tags.length > 0 && (
                <div className="mb-5">
                    <Metadata badges={tags} />
                </div>
            )}

            {summary && <Summary summary={summary} />}
        </header>
    )
}
