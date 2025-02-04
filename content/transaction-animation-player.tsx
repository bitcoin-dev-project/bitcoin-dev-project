"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { PlayIcon, PauseIcon, FastForwardIcon, RewindIcon } from "lucide-react"
import { motion } from "framer-motion"

interface SvgatorPlayer {
    ready: (callback: () => void) => void
    pause: () => void
    seekTo: (time: number) => void
    play: () => void
    duration: number
    currentTime: number
}

interface TransactionAnimationPlayerProps {
    svgPaths: string[]
    svgId: string
}

export default function TransactionAnimationPlayer({
    svgPaths,
    svgId
}: TransactionAnimationPlayerProps) {
    const [currentSvgIndex, setCurrentSvgIndex] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const svgRef = useRef<HTMLObjectElement>(null)
    const playerRef = useRef<SvgatorPlayer | null>(null)

    // Initialize SVG player
    const initializeSvgPlayer = useCallback(() => {
        if (svgRef.current && svgRef.current.contentDocument) {
            const svgElement = svgRef.current.contentDocument.getElementById(
                svgId
            ) as (SVGSVGElement & { svgatorPlayer: SvgatorPlayer }) | null

            if (svgElement && svgElement.svgatorPlayer) {
                playerRef.current = svgElement.svgatorPlayer
                playerRef.current.ready(() => {
                    playerRef.current?.pause()
                    playerRef.current?.seekTo(0)
                })
            }
        }
    }, [svgId])

    useEffect(() => {
        const timer = setTimeout(() => {
            initializeSvgPlayer()
        }, 100)
        return () => clearTimeout(timer)
    }, [initializeSvgPlayer, currentSvgIndex])

    const handlePlay = useCallback(() => {
        if (playerRef.current) {
            playerRef.current.play()
            setIsPlaying(true)
        }
    }, [])

    const handlePause = () => {
        if (playerRef.current) {
            playerRef.current.pause()
            setIsPlaying(false)
        }
    }

    const handleStepChange = useCallback(
        (direction: "next" | "prev") => {
            setCurrentSvgIndex((prev) => {
                const newIndex =
                    direction === "next"
                        ? Math.min(prev + 1, svgPaths.length - 1)
                        : Math.max(prev - 1, 0)
                return newIndex
            })
        },
        [svgPaths.length]
    )

    return (
        <div className="mx-auto py-1 full-width">
            {/* Main SVG Display - Added fixed dimensions */}
            <div className="bg-[#3C3C3C] rounded-lg shadow-lg overflow-hidden mb-4">
                <div
                    className="relative w-full"
                    style={{ aspectRatio: "16/9" }}
                >
                    <object
                        ref={svgRef}
                        type="image/svg+xml"
                        data={svgPaths[currentSvgIndex]}
                        className="absolute top-0 left-0 w-full h-full bg-[#3C3C3C] object-contain"
                        aria-label="Transaction Animation"
                    />
                </div>
            </div>

            {/* Control Panel */}
            <div className="border border-gray-300 dark:border-vscode-input-dark p-3 rounded-lg bg-gray-100 dark:bg-vscode-background-dark flex items-center justify-center">
                <div className="flex items-center gap-4">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <RewindIcon
                            className={`h-6 w-6 cursor-pointer ${
                                currentSvgIndex > 0
                                    ? "text-vscode-text-light dark:text-vscode-text-dark hover:text-orange-500"
                                    : "text-vscode-text-light dark:text-vscode-text-dark opacity-50"
                            } transition-colors duration-300`}
                            onClick={() => handleStepChange("prev")}
                        />
                    </motion.div>

                    {/* Step indicator */}
                    <span className="text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark min-w-[80px] text-center">
                        {currentSvgIndex + 1} of {svgPaths.length}
                    </span>

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FastForwardIcon
                            className={`h-6 w-6 cursor-pointer ${
                                currentSvgIndex < svgPaths.length - 1
                                    ? "text-vscode-text-light dark:text-vscode-text-dark hover:text-orange-500"
                                    : "text-vscode-text-light dark:text-vscode-text-dark opacity-50"
                            } transition-colors duration-300`}
                            onClick={() => handleStepChange("next")}
                        />
                    </motion.div>
                </div>

                <div className="flex-grow ml-4 bg-gray-300 dark:bg-vscode-input-dark h-2 rounded-full">
                    <motion.div
                        className="bg-orange-500 h-2 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{
                            width: `${((currentSvgIndex + 1) / svgPaths.length) * 100}%`
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
