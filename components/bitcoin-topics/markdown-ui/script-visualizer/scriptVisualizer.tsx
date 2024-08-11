"use client"

import React, { useEffect, useRef, useState } from "react"
import {
    PlayIcon,
    PauseIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckIcon
} from "@heroicons/react/20/solid"

const svgPaths = [
    "/bitcoin-topics/static/images/topics/p2pk/p2pk-1.svg",
    "/bitcoin-topics/static/images/topics/p2pk/p2pk-2.svg",
    "/bitcoin-topics/static/images/topics/p2pk/p2pk-3.svg"
]

const svgSteps = [
    {
        name: "Step 1",
        description: "Push <signature> onto the stack",
        svgPath: "/bitcoin-topics/static/images/topics/p2pk/p2pk-1.svg",
        status: "complete",
        code: "[Signature]",
        category: "UnlockScript"
    },
    {
        name: "Step 2",
        description: "Push <pubkey> onto the stack",
        svgPath: "/bitcoin-topics/static/images/topics/p2pk/p2pk-2.svg",
        status: "current",
        code: "[Public Key]",
        category: "PubKeyScript"
    },
    {
        name: "Step 3",
        description: "Pop two items (pub-key & sign.) & verify ECDSA signature",
        svgPath: "/bitcoin-topics/static/images/topics/p2pk/p2pk-3.svg",
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
    const mobileRef = useRef<HTMLObjectElement>(null)

    const handlePlayerAction = (action: string) => {
        ;[svgRef, mobileRef].forEach((ref) => {
            if (ref.current && ref.current.contentDocument) {
                const svgElement =
                    ref.current.contentDocument.getElementById("p2pk")
                if (svgElement && (svgElement as any).svgatorPlayer) {
                    ;(svgElement as any).svgatorPlayer.ready(() => {
                        ;(svgElement as any).svgatorPlayer[action]()
                    })
                }
            }
        })
    }

    useEffect(() => {
        const timer = setTimeout(() => handlePlayerAction("play"), 100)
        return () => clearTimeout(timer)
    }, [svgIndex])

    const handleSvgSelect = (index: number) => {
        setSvgIndex(index)
    }

    const handleSvgSwitch = (direction: "next" | "prev") => {
        setSvgIndex((prev) => {
            const newIndex =
                direction === "next"
                    ? (prev + 1) % svgPaths.length
                    : (prev - 1 + svgPaths.length) % svgPaths.length
            return newIndex
        })
    }

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(" ")
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
        <div className="mx-auto py-1 -mx-4 sm:-mx-8 md:-mx-16 lg:-mx-32 xl:-mx-40">
            <div className="mx-auto py-1 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center py-3">
                    <div className="mx-auto flex w-full max-w-6xl flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 rounded-lg bg-gray-50 dark:bg-gray-900 p-4 shadow-md">
                        {/* Mobile layout */}
                        <div className="lg:hidden w-full space-y-4">
                            {svgPaths.map((path, index) => (
                                <object
                                    key={path}
                                    ref={index === svgIndex ? mobileRef : null}
                                    type="image/svg+xml"
                                    data={path}
                                    className={`h-auto w-full rounded-lg bg-white shadow-md ${index === svgIndex ? "block" : "hidden"}`}
                                    aria-labelledby="svgAnimation"
                                    role="img"
                                >
                                    Your browser does not support SVGs
                                </object>
                            ))}

                            <div className="flex justify-center items-center space-x-4">
                                <button
                                    onClick={() => handleSvgSwitch("prev")}
                                    className={`p-2 ${svgIndex > 0 ? "text-orange-500 hover:text-orange-700" : "text-gray-400"} cursor-pointer rounded`}
                                    disabled={svgIndex === 0}
                                >
                                    <ArrowLeftIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handlePlayerAction("play")}
                                    className="cursor-pointer rounded p-2 text-orange-500 hover:text-orange-700"
                                >
                                    <PlayIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handlePlayerAction("pause")}
                                    className="cursor-pointer rounded p-2 text-orange-500 hover:text-orange-700"
                                >
                                    <PauseIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleSvgSwitch("next")}
                                    className={`p-2 ${svgIndex < svgSteps.length - 1 ? "text-orange-500 hover:text-orange-700" : "text-gray-400"} cursor-pointer rounded`}
                                    disabled={svgIndex === svgSteps.length - 1}
                                >
                                    <ArrowRightIcon className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="flex justify-center space-x-2">
                                {svgSteps.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`h-2 w-2 rounded-full ${
                                            index === svgIndex
                                                ? "bg-orange-600"
                                                : "bg-gray-300"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Desktop layout */}
                        <nav
                            aria-label="Progress"
                            className="hidden lg:block w-full lg:w-2/5"
                        >
                            <div className="mb-4 flex justify-center space-x-2">
                                <button
                                    onClick={() => handleSvgSwitch("prev")}
                                    className={`p-2 ${svgIndex > 0 ? "text-orange-500 hover:text-orange-700" : "text-gray-400"} cursor-pointer rounded`}
                                    disabled={svgIndex === 0}
                                >
                                    <ArrowLeftIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handlePlayerAction("play")}
                                    className="cursor-pointer rounded p-2 text-orange-500 hover:text-orange-700"
                                >
                                    <PlayIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handlePlayerAction("pause")}
                                    className="cursor-pointer rounded p-2 text-orange-500 hover:text-orange-700"
                                >
                                    <PauseIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleSvgSwitch("next")}
                                    className={`p-2 ${svgIndex < svgSteps.length - 1 ? "text-orange-500 hover:text-orange-700" : "text-gray-400"} cursor-pointer rounded`}
                                    disabled={svgIndex === svgSteps.length - 1}
                                >
                                    <ArrowRightIcon className="h-5 w-5" />
                                </button>
                            </div>

                            <ol role="list" className="space-y-4">
                                {svgSteps.map((step, index) => (
                                    <li key={step.name} className="relative">
                                        <button
                                            onClick={() =>
                                                handleSvgSelect(index)
                                            }
                                            className="group relative flex w-full items-start text-left"
                                        >
                                            <span className="flex h-9 items-center">
                                                <span
                                                    className={classNames(
                                                        index === svgIndex
                                                            ? "bg-orange-600"
                                                            : "",
                                                        index < svgIndex
                                                            ? "bg-green-500"
                                                            : "",
                                                        "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400"
                                                    )}
                                                >
                                                    {getStatusIcon(index)}
                                                </span>
                                            </span>
                                            <span className="ml-4 flex min-w-0 flex-col">
                                                <span
                                                    className={classNames(
                                                        index <= svgIndex
                                                            ? "text-orange-600"
                                                            : "text-gray-500",
                                                        "text-sm font-medium"
                                                    )}
                                                >
                                                    {step.name}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {step.description}
                                                </span>
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ol>
                        </nav>

                        <div className="hidden lg:block w-full lg:w-3/5">
                            {svgPaths.map((path, index) => (
                                <object
                                    key={path}
                                    ref={index === svgIndex ? svgRef : null}
                                    type="image/svg+xml"
                                    data={path}
                                    className={`h-auto w-full rounded-lg bg-white shadow-md ${index === svgIndex ? "block" : "hidden"}`}
                                    aria-labelledby="svgAnimation"
                                    role="img"
                                >
                                    Your browser does not support SVGs
                                </object>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
