"use client"

import { usePathname } from "next/navigation"
import Summary from "./summary"

export function TopicHeader({ title, tags, summary, titleClassName }: any) {
    const pathname = usePathname()
    const isBitcoinHistory = pathname === "/decoding/bitcoin-history"

    return (
        <header className="mb-9 space-y-1 mt-2 sm:mt-8">
            {!isBitcoinHistory && (
                <header className="pt-2 sm:pt-6 xl:pb-6">
                    <div className="space-y-1 text-left sm:text-center">
                        <h1
                            className={`text-6xl font-bold mb-6 break-words ${titleClassName}`}
                        >
                            {title}
                        </h1>
                    </div>
                </header>
            )}
            {summary && <Summary summary={summary} />}
        </header>
    )
}
