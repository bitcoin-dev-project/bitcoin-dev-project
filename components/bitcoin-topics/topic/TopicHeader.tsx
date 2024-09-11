"use client"

import { usePathname } from "next/navigation"
import Summary from "./summary"

export function TopicHeader({ title, tags, summary }: any) {
    const pathname = usePathname()
    const isBitcoinHistory = pathname === "/topics/bitcoin-history"

    return (
        <header className="mb-9 space-y-1 mt-8">
            {!isBitcoinHistory && (
                <header className="pt-6 xl:pb-6">
                    <div className="space-y-1 text-center">
                        <h1 className="text-6xl font-bold mb-6">{title}</h1>
                    </div>
                </header>
            )}
            {summary && <Summary summary={summary} />}
        </header>
    )
}
