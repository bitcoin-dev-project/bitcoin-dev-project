"use client"

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { PlayIcon, PauseIcon, FastForwardIcon, RewindIcon } from "lucide-react"
import { motion } from "framer-motion"
import {
    ScriptExecutionConfig,
    scriptExecutionConfigs
} from "@/content/stack-steps"

interface SvgatorPlayer {
    ready: (callback: () => void) => void
    pause: () => void
    seekTo: (time: number) => void
    play: () => void
    duration: number
    currentTime: number
}

interface ScriptStackVisualizerProps {
    type: keyof typeof scriptExecutionConfigs
}

export default function ScriptStackVisualizer({
    type
}: ScriptStackVisualizerProps) {
    const [config, setConfig] = useState<ScriptExecutionConfig | null>(null)
    const [currentStep, setCurrentStep] = useState<number>(-1)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const svgRef = useRef<HTMLObjectElement>(null)
    const playerRef = useRef<SvgatorPlayer | null>(null)
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const selectedConfig = scriptExecutionConfigs[type]
        setConfig(selectedConfig || null)

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [type])

    const cumulativeDurations = useMemo(() => {
        if (!config) return []
        return config.steps.reduce<number[]>((acc, step, index) => {
            acc[index] = (acc[index - 1] || 0) + step.duration * 1000
            return acc
        }, [])
    }, [config])

    const initializeSvgPlayer = useCallback(() => {
        if (!config) return

        if (svgRef.current && svgRef.current.contentDocument) {
            const svgElement = svgRef.current.contentDocument.getElementById(
                config.svgId
            ) as (SVGSVGElement & { svgatorPlayer: SvgatorPlayer }) | null
            if (svgElement && svgElement.svgatorPlayer) {
                playerRef.current = svgElement.svgatorPlayer
                playerRef.current.ready(() => {
                    playerRef.current?.pause()
                    playerRef.current?.seekTo(0)
                })
            }
        }
    }, [config])

    useEffect(() => {
        if (!config) return

        const timer = setTimeout(() => {
            initializeSvgPlayer()
        }, 100)
        return () => clearTimeout(timer)
    }, [initializeSvgPlayer, config])

    const playStepAnimation = useCallback(
        (step: number) => {
            if (!config || !playerRef.current) return

            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current)
            }

            const startTime = step > 0 ? cumulativeDurations[step - 1] : 0
            const endTime = cumulativeDurations[step]
            playerRef.current.seekTo(startTime)
            playerRef.current.play()
            setIsPlaying(true)

            const animationDuration = endTime - startTime
            animationTimeoutRef.current = setTimeout(() => {
                playerRef.current?.pause()
                setIsPlaying(false)
            }, animationDuration)
        },
        [config, cumulativeDurations]
    )

    const handlePlay = useCallback(() => {
        if (!isPlaying && currentStep >= 0) {
            playStepAnimation(currentStep)
        }
    }, [isPlaying, currentStep, playStepAnimation])

    const handlePause = useCallback(() => {
        if (playerRef.current) {
            playerRef.current.pause()
            setIsPlaying(false)
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current)
            }
        }
    }, [])

    const handleStepChange = useCallback(
        (direction: "next" | "prev") => {
            if (!config) return

            setCurrentStep((prev) => {
                const newStep =
                    direction === "next"
                        ? Math.min(prev + 1, config.steps.length - 1)
                        : Math.max(prev - 1, 0)
                if (newStep >= 0) {
                    playStepAnimation(newStep)
                }
                return newStep
            })
        },
        [config, playStepAnimation]
    )

    const handleStepClick = useCallback(
        (index: number) => {
            setCurrentStep(index)
            playStepAnimation(index)
        },
        [playStepAnimation]
    )

    function classNames(...classes: string[]): string {
        return classes.filter(Boolean).join(" ")
    }

    const renderStepIndicators = (): React.ReactNode => {
        if (!config) return null

        if (isMobile) {
            return (
                <div className="flex justify-center space-x-2 mt-4">
                    {config.steps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleStepClick(index)}
                            className={classNames(
                                "h-2 w-2 rounded-full",
                                index === currentStep
                                    ? "bg-orange-500"
                                    : index < currentStep
                                      ? "bg-green-500"
                                      : "bg-gray-300"
                            )}
                            aria-label={`Step ${index + 1}`}
                        />
                    ))}
                </div>
            )
        }

        return (
            <nav aria-label="Progress">
                <ol role="list" className="space-y-4">
                    {config.steps.map((step, index) => (
                        <li key={step.name} className="relative">
                            <button
                                onClick={() => handleStepClick(index)}
                                className="group relative flex w-full items-start text-left"
                            >
                                <span className="flex h-9 items-center">
                                    <span
                                        className={classNames(
                                            currentStep >=
                                                config.steps.length - 1
                                                ? "bg-green-500"
                                                : index === currentStep
                                                  ? "bg-orange-500"
                                                  : index < currentStep
                                                    ? "bg-green-500"
                                                    : "bg-[#454C54]",
                                            "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-600 group-hover:border-gray-400"
                                        )}
                                    >
                                        {index < currentStep ? (
                                            <svg
                                                className="h-5 w-5 text-white"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : index === currentStep ? (
                                            <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                                        ) : (
                                            <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                                        )}
                                    </span>
                                </span>
                                <span className="ml-4 flex min-w-0 flex-col">
                                    <span
                                        className={classNames(
                                            index <= currentStep
                                                ? "text-orange-500"
                                                : "text-[#E5E6F1]",
                                            "text-sm font-medium"
                                        )}
                                    >
                                        {step.name}
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        {step.description}
                                    </span>
                                </span>
                            </button>
                        </li>
                    ))}
                </ol>
            </nav>
        )
    }

    if (!config) {
        return <div>Configuration not found for type: {type}</div>
    }

    return (
        <div className="mx-auto py-1 full-width">
            <div className="mx-auto py-1 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center py-3">
                    <div className="mx-auto flex w-full max-w-6xl flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 rounded-lg bg-[#272E35] p-4 shadow-md">
                        {!isMobile && (
                            <div className="w-full lg:w-2/5">
                                {renderStepIndicators()}
                            </div>
                        )}

                        <div className="w-full lg:w-3/5">
                            <div className="bg-[#454C54] rounded-lg shadow-md overflow-hidden mb-4">
                                <object
                                    ref={svgRef}
                                    type="image/svg+xml"
                                    data={config.svgPath}
                                    className="w-full h-full"
                                    aria-labelledby="svgAnimation"
                                    role="img"
                                ></object>
                            </div>
                            <div className="border-2 border-dashed border-[#454C54] p-3 rounded-lg bg-[#272E35] flex items-center justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <RewindIcon
                                        className={`h-6 w-6 mr-4 cursor-pointer ${
                                            currentStep > 0
                                                ? "text-[#E5E6F1] hover:text-orange-500"
                                                : "text-gray-500"
                                        } transition-colors duration-300`}
                                        onClick={() => handleStepChange("prev")}
                                    />
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {isPlaying ? (
                                        <PauseIcon
                                            className="h-6 w-6 mr-4 cursor-pointer text-[#E5E6F1] hover:text-orange-500 transition-colors duration-300"
                                            onClick={handlePause}
                                        />
                                    ) : (
                                        <PlayIcon
                                            className="h-6 w-6 mr-4 cursor-pointer text-[#E5E6F1] hover:text-orange-500 transition-colors duration-300"
                                            onClick={handlePlay}
                                        />
                                    )}
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FastForwardIcon
                                        className={`h-6 w-6 mr-4 cursor-pointer ${
                                            currentStep <
                                            config.steps.length - 1
                                                ? "text-[#E5E6F1] hover:text-orange-500"
                                                : "text-gray-500"
                                        } transition-colors duration-300`}
                                        onClick={() => handleStepChange("next")}
                                    />
                                </motion.div>
                                <div className="flex-grow bg-[#454C54] h-2 rounded-full">
                                    <motion.div
                                        className="bg-orange-500 h-2 rounded-full"
                                        initial={{ width: "0%" }}
                                        animate={{
                                            width: `${((currentStep + 1) / config.steps.length) * 100}%`
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

                        {isMobile && (
                            <div className="w-full mt-4">
                                {renderStepIndicators()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
