"use client"
import React, { useState } from "react"
import { LightbulbIcon } from "lucide-react"
import clsx from "clsx"

interface HintProps {
    hints: string[]
}

const Hint = ({ hints }: HintProps) => {
    const [revealedHints, setRevealedHints] = useState<number>(0)
    const allRevealed = revealedHints >= hints.length

    const revealNextHint = () => {
        if (!allRevealed) setRevealedHints(revealedHints + 1)
    }

    return (
        // not-prose matters here: the lesson's Prose adds a "•" marker and left
        // padding to every <li>, which doubled up with the lightbulb icons, and
        // its <ul> block margins padded the card out well past its own padding.
        <div className="not-prose my-6">
            {/* Clicking anywhere on the card reveals the next hint; the button
                is the visible affordance for the same action. */}
            <div
                onClick={revealNextHint}
                className={clsx(
                    "rounded-lg border border-[#EBD9AE] bg-[#F9F0DA] px-5 py-4 dark:border-amber-800/60 dark:bg-amber-900/20",
                    !allRevealed && "cursor-pointer"
                )}
            >
                <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                        {hints.length > 1 ? "Hints" : "Hint"}
                    </span>
                    {!allRevealed && (
                        <button
                            onClick={(e) => {
                                // The card handles this too — without this the
                                // click would bubble and reveal two hints.
                                e.stopPropagation()
                                revealNextHint()
                            }}
                            className="text-xs font-medium text-amber-700 underline decoration-amber-700/40 underline-offset-4 transition-colors hover:decoration-amber-700 dark:text-amber-300"
                        >
                            Reveal next ({revealedHints}/{hints.length})
                        </button>
                    )}
                </div>

                <ul className="space-y-2.5">
                    {hints.map((hint, index) => (
                        <li
                            key={index}
                            className={clsx(
                                "flex items-start gap-2",
                                index >= revealedHints &&
                                    "select-none blur-[3px]"
                            )}
                        >
                            <LightbulbIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                            <span className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                                {hint}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Hint
