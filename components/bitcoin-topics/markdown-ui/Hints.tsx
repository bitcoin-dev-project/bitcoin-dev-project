"use client"
import React, { useState } from "react"
import { LightbulbIcon } from "lucide-react"

interface HintProps {
    hints: string[]
}

const Hint = ({ hints }: HintProps) => {
    const [revealedHints, setRevealedHints] = useState<number>(0)

    const revealNextHint = () => {
        if (revealedHints < hints.length) {
            setRevealedHints(revealedHints + 1)
        }
    }

    return (
        <div className="mx-auto py-2 mt-10">
            <div
                className="bg-white rounded-lg border-l-4 border-[#ebb305] p-6 rounded-lg p-4 cursor-pointer transition-all duration-300 ease-in-out"
                onClick={revealNextHint}
            >
                {/* {revealedHints < hints.length && (
                    <div className="text-center mt-4 text-md text-gray-500">
                        Click to reveal next hint ({revealedHints}/
                        {hints.length})
                    </div>
                )} */}
                <ul className="list-none space-y-3">
                    {hints.map((hint, index) => (
                        <li
                            key={index}
                            className={`flex items-start ${index < revealedHints ? "" : "blur-sm"}`}
                        >
                            <LightbulbIcon className="text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-800 leading-relaxed">
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
