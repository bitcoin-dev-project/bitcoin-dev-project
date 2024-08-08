"use client"

import React, { useEffect, useRef, useState } from "react"
import {
    PlayIcon,
    PauseIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckIcon
} from "@heroicons/react/20/solid"
import Image from "next/image"

const svgPaths = [
    "/bitcoin-topics/static/images/topics/p2pk/p2pk-1.svg",
    "bitcoin-topics/static/images/topics/p2pk/p2pk-2.svg",
    "bitcoin-topics/static/images/topics/p2pk/p2pk-3.svg"
]

const svgSteps = [
    {
        name: "Step 1",
        description: "Push <signature> onto the stack",
        svgPath: "/bitcoin-topics/static/images/topics/p2pk/p2pk-1.svg",
        fallbackImagePath:
            "/bitcoin-topics/static/images/topics/p2pk/p2pk-1.png",
        status: "complete",
        code: "[Signature]",
        category: "UnlockScript"
    },
    {
        name: "Step 2",
        description: "Push <pubkey> onto the stack",
        svgPath: "/bitcoin-topics/static/images/topics/p2pk/p2pk-2.svg",
        fallbackImagePath:
            "/bitcoin-topics/static/images/topics/p2pk/p2pk-.png",
        status: "current",
        code: "[Public Key]",
        category: "PubKeyScript"
    },
    {
        name: "Step 3",
        description: "Pop two items (pub-key & sign.) & verify ECDSA signature",
        svgPath: "/bitcoin-topics/static/images/topics/p2pk/p2pk-3.svg",
        fallbackImagePath:
            "/bitcoin-topics/static/images/topics/p2pk/p2pk-3.png",
        status: "upcoming",
        code: "<OP_CHECKSIG>",
        category: "PubKeyScript"
    }
]

interface ScriptStackVisualizerProps {
    type: string
    children: React.ReactNode
}

export default function ScriptStackVisualizer({
    type,
    children
}: ScriptStackVisualizerProps) {
    const [svgIndex, setSvgIndex] = useState(0)
    const svgRef = useRef<HTMLObjectElement>(null)

    const handlePlayerAction = (action: string) => {
        if (svgRef.current && svgRef.current.contentDocument) {
            const svgElement =
                svgRef.current.contentDocument.getElementById("p2pk")
            if (svgElement && (svgElement as any).svgatorPlayer) {
                ;(svgElement as any).svgatorPlayer.ready(() => {
                    ;(svgElement as any).svgatorPlayer[action]()
                })
            }
        }
    }

    useEffect(() => {
        handlePlayerAction("play")
    }, [svgIndex])

    const handleSvgSelect = (index: number) => {
        setSvgIndex(index)
        setTimeout(() => handlePlayerAction("play"), 100)
    }

    // Function to handle switching SVGs and autoplay
    const handleSvgSwitch = (direction: "next" | "prev") => {
        setSvgIndex((prev) => {
            const newIndex =
                direction === "next"
                    ? (prev + 1) % svgPaths.length
                    : (prev - 1 + svgPaths.length) % svgPaths.length
            setTimeout(() => handlePlayerAction("play"), 100) // A slight delay to ensure the SVG is loaded

            return newIndex
        })
    }

    const getStatusIcon = (index: number) => {
        if (index < svgIndex) {
            return (
                <CheckIcon
                    className="h-5 w-5 text-green-500"
                    aria-hidden="true"
                />
            )
        } else if (index === svgIndex) {
            return <span className="h-2.5 w-2.5 rounded-full bg-orange-600" />
        } else {
            return (
                <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
            )
        }
    }

    return (
        <div className="flex flex-col items-center justify-center py-3">
            <div className="mx-auto flex w-full max-w-6xl space-x-2 rounded-lg bg-gray-50 dark:bg-gray-900 p-2 shadow-md">
                <nav aria-label="Progress" className="w-2/5">
                    {/* Control Buttons */}
                    <div className="mb-2 flex justify-center space-x-1">
                        <button
                            onClick={() => handleSvgSwitch("prev")}
                            className={`p-1 ${svgIndex > 0 ? "text-orange-500 hover:text-orange-700" : "text-gray-400"} cursor-pointer rounded`}
                            disabled={svgIndex === 0}
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => handlePlayerAction("play")}
                            className="cursor-pointer rounded p-1 text-orange-500 hover:text-orange-700"
                        >
                            <PlayIcon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => handlePlayerAction("pause")}
                            className="cursor-pointer rounded p-1 text-orange-500 hover:text-orange-700"
                        >
                            <PauseIcon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => handleSvgSwitch("next")}
                            className={`p-1 ${svgIndex < svgSteps.length - 1 ? "text-orange-500 hover:text-orange-700" : "text-gray-400"} cursor-pointer rounded`}
                            disabled={svgIndex === svgSteps.length - 1}
                        >
                            <ArrowRightIcon className="h-4 w-4" />
                        </button>
                    </div>

                    <ol role="list" className="overflow-hidden">
                        {svgSteps.map((step, index) => (
                            <li key={step.name} className="relative pb-4">
                                <button
                                    onClick={() => handleSvgSelect(index)}
                                    className="group relative flex w-full items-start text-left"
                                >
                                    <span className="flex h-8 items-center">
                                        <span
                                            className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full ${index === svgIndex ? "bg-orange-600" : index < svgIndex ? "bg-green-500" : "border-2 border-gray-300 bg-white"} group-hover:bg-orange-800`}
                                        >
                                            {getStatusIcon(index)}
                                        </span>
                                    </span>
                                    <span className="ml-2 flex min-w-0 flex-col justify-center">
                                        <span
                                            className={`text-xs font-medium ${index <= svgIndex ? "text-orange-600" : "text-gray-500"}`}
                                        >
                                            {step.name}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {step.description}
                                        </span>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ol>
                </nav>

                <div className="relative h-auto w-3/5">
                    <object
                        ref={svgRef}
                        type="image/svg+xml"
                        data={svgSteps[svgIndex].svgPath}
                        className="h-auto w-full rounded-lg bg-white shadow-md"
                        aria-labelledby="svgAnimation"
                        role="img"
                    >
                        <Image
                            src={svgSteps[svgIndex].fallbackImagePath}
                            alt="Static representation of SVG animation"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg bg-white shadow-md"
                        />
                    </object>
                </div>
            </div>
        </div>
    )
}
