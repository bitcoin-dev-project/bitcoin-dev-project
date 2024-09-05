"use client"

import { opcodeData } from "@/content/opcode-explorer"
import { Switch } from "@headlessui/react"
import { motion, AnimatePresence } from "framer-motion"
import {
    SearchIcon,
    RewindIcon,
    PauseIcon,
    PlayIcon,
    FastForwardIcon
} from "lucide-react"
import React, { useState, useRef, useEffect, useCallback } from "react"

interface SvgatorPlayer {
    ready: (callback: () => void) => void
    pause: () => void
    seekTo: (time: number) => void
    play: () => void
    duration: number
    currentTime: number
}

const OpCodeExplorer = () => {
    const [selectedOpCode, setSelectedOpCode] = useState<
        keyof typeof opcodeData
    >(Object.keys(opcodeData)[0] as keyof typeof opcodeData)
    const [isAsm, setIsAsm] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentStep, setCurrentStep] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)
    const [totalSteps, setTotalSteps] = useState(4)
    const [isAnimating, setIsAnimating] = useState(false)
    const svgRef = useRef<HTMLObjectElement | null>(null)
    const playerRef = useRef<SvgatorPlayer | null>(null)
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const opCodes = Object.keys(opcodeData)
    const currentOpCode = opcodeData[selectedOpCode]

    const filteredOpCodes = opCodes.filter((opCode) =>
        opCode.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        const el = svgRef.current
        if (el) {
            const onWheel = (e: WheelEvent) => {
                if (e.deltaY === 0) return
                e.preventDefault()
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY,
                    behavior: "smooth"
                })
            }
            el.addEventListener("wheel", onWheel)
            return () => el.removeEventListener("wheel", onWheel)
        }
    }, [])

    const initializeSvgPlayer = useCallback(() => {
        if (svgRef.current && svgRef.current.contentDocument) {
            const svgElement = svgRef.current.contentDocument.getElementById(
                currentOpCode.svgId
            ) as unknown as SVGSVGElement & { svgatorPlayer: SvgatorPlayer }
            if (svgElement && svgElement.svgatorPlayer) {
                playerRef.current = svgElement.svgatorPlayer
                playerRef.current.ready(() => {
                    playerRef.current?.pause()
                    playerRef.current?.seekTo(0)
                    const totalSeconds = Math.ceil(
                        (playerRef.current?.duration || 0) / 1000
                    )
                    setTotalSteps(totalSeconds)
                })
            }
        }
    }, [currentOpCode.svgId])

    useEffect(() => {
        setCurrentStep(0)
        setIsPlaying(false)
        setHasStarted(false)
        playerRef.current = null
        setTimeout(initializeSvgPlayer, 100)
    }, [selectedOpCode, initializeSvgPlayer])

    useEffect(() => {
        if (playerRef.current && isPlaying) {
            const interval = setInterval(() => {
                const currentTime = playerRef.current?.currentTime || 0
                const duration = playerRef.current?.duration || 0
                const newStep = Math.floor(currentTime / 1000)
                if (newStep !== currentStep) {
                    setCurrentStep(newStep)
                }
                if (currentTime >= duration) {
                    setIsPlaying(false)
                    setCurrentStep(0)
                    playerRef.current?.seekTo(0)
                    clearInterval(interval)
                }
            }, 100)
            return () => clearInterval(interval)
        }
    }, [isPlaying, currentStep, totalSteps])

    const playOneSecond = useCallback((startTime: number) => {
        if (playerRef.current) {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current)
            }
            setIsAnimating(true)
            setIsPlaying(true)
            playerRef.current.seekTo(startTime)
            playerRef.current.play()
            animationTimeoutRef.current = setTimeout(() => {
                playerRef.current?.pause()
                setIsAnimating(false)
                setIsPlaying(false)
                setHasStarted(true)
            }, 1000)
        }
    }, [])

    const handlePrevious = useCallback(() => {
        if (isAnimating) return
        setCurrentStep((prev) => {
            const newStep = Math.max(0, prev - 1)
            playOneSecond(newStep * 1000)
            return newStep
        })
    }, [isAnimating, playOneSecond])

    const handleNext = useCallback(() => {
        if (isAnimating) return
        if (!hasStarted) {
            playOneSecond(0)
            setCurrentStep(0)
        } else {
            setCurrentStep((prev) => {
                const newStep = Math.min(totalSteps - 1, prev + 1)
                playOneSecond(newStep * 1000)
                return newStep
            })
        }
    }, [isAnimating, playOneSecond, totalSteps, hasStarted])

    const handlePlay = useCallback(() => {
        if (playerRef.current) {
            if (isAnimating) {
                playerRef.current.play()
            } else {
                playOneSecond(currentStep * 1000)
            }
            setIsPlaying(true)
        }
    }, [currentStep, isAnimating, playOneSecond])

    const handlePause = useCallback(() => {
        if (playerRef.current) {
            playerRef.current.pause()
            setIsPlaying(false)
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current)
            }
            setIsAnimating(false)
        }
    }, [])

    useEffect(() => {
        return () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current)
            }
        }
    }, [])

    return (
        <div className="mx-auto py-1 full-width">
            <motion.div
                className="bg-vscode-container-light dark:bg-vscode-container-dark rounded-lg text-vscode-text-light dark:text-vscode-text-dark font-normal shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="bg-vscode-titleBar-light dark:bg-vscode-titleBar-dark text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark p-2 flex items-center">
                    <div className="flex-grow text-center text-sm font-medium">
                        Bitcoin OpCode Explorer
                    </div>
                </div>

                {/* Main content */}
                <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
                        <div
                            ref={svgRef}
                            className="w-full sm:flex-grow overflow-x-auto"
                            style={{
                                scrollbarWidth: "none",
                                msOverflowStyle: "none"
                            }}
                        >
                            <div className="flex">
                                {filteredOpCodes.map((opCode) => (
                                    <motion.button
                                        key={opCode}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 17
                                        }}
                                        className={`px-4 py-2 rounded-lg mr-3 whitespace-nowrap text-sm font-medium ${
                                            selectedOpCode === opCode
                                                ? "bg-orange-500 text-white"
                                                : "bg-vscode-file-light dark:bg-vscode-file-dark text-vscode-text-light dark:text-vscode-text-dark hover:bg-vscode-hover-light dark:hover:bg-vscode-hover-dark"
                                        }`}
                                        onClick={() =>
                                            setSelectedOpCode(
                                                opCode as keyof typeof opcodeData
                                            )
                                        }
                                    >
                                        {opCode}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedOpCode}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-vscode-background-light dark:bg-vscode-background-dark p-4 sm:p-6 rounded-lg"
                        >
                            <div className="text-xl sm:text-2xl font-bold mb-4 text-center text-vscode-text-light dark:text-vscode-text-dark">
                                <span className="text-orange-500">
                                    {selectedOpCode}
                                </span>{" "}
                                ({currentOpCode.hex})
                            </div>
                            <div className="text-base sm:text-lg mb-6 text-center text-vscode-text-light dark:text-vscode-text-dark">
                                {currentOpCode.description}
                            </div>

                            <div className="flex flex-col lg:flex-row mb-6">
                                <div className="w-full lg:w-2/5 mb-4 lg:mb-0 lg:pr-6 lg:border-r border-vscode-lineNumber-light dark:border-vscode-lineNumber-dark">
                                    <div className="bg-vscode-container-light dark:bg-vscode-container-dark text-vscode-text-light dark:text-vscode-text-dark p-4 rounded-lg shadow-lg">
                                        <div className="flex items-center justify-between mb-3 border-b border-vscode-lineNumber-light dark:border-vscode-lineNumber-dark pb-2">
                                            <span className="text-sm font-medium">
                                                Example
                                            </span>
                                            <div className="flex items-center bg-vscode-navButton-light dark:bg-vscode-navButton-dark rounded-full p-1">
                                                <button
                                                    className={`px-3 py-1 text-xs rounded-full transition-colors duration-300 ${
                                                        !isAsm
                                                            ? "bg-orange-500 text-white"
                                                            : "text-vscode-text-light dark:text-vscode-text-dark"
                                                    }`}
                                                    onClick={() =>
                                                        setIsAsm(false)
                                                    }
                                                >
                                                    HEX
                                                </button>
                                                <button
                                                    className={`px-3 py-1 text-xs rounded-full transition-colors duration-300 ${
                                                        isAsm
                                                            ? "bg-orange-500 text-white"
                                                            : "text-vscode-text-light dark:text-vscode-text-dark"
                                                    }`}
                                                    onClick={() =>
                                                        setIsAsm(true)
                                                    }
                                                >
                                                    ASM
                                                </button>
                                            </div>
                                        </div>
                                        <motion.div
                                            className="font-mono text-sm leading-relaxed"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <pre className="whitespace-pre-wrap !bg-vscode-file-light dark:!bg-vscode-input-dark p-3 rounded overflow-x-auto !text-vscode-text-light dark:!text-vscode-text-dark">
                                                {isAsm
                                                    ? currentOpCode.asm
                                                    : currentOpCode.hexCode}
                                            </pre>
                                        </motion.div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-3/5 lg:pl-6">
                                    <div className="bg-vscode-container-light dark:bg-vscode-container-dark h-64 sm:h-80 rounded-lg mb-4">
                                        <object
                                            ref={svgRef}
                                            type="image/svg+xml"
                                            data={currentOpCode.svgPath}
                                            className="w-full h-full"
                                            onLoad={initializeSvgPlayer}
                                        >
                                            Your browser does not support SVG
                                        </object>
                                    </div>
                                    <div className="border-2 border-dashed border-vscode-lineNumber-light dark:border-vscode-lineNumber-dark p-3 rounded-lg bg-vscode-background-light dark:bg-vscode-background-dark flex items-center justify-center">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <RewindIcon
                                                className={`h-6 w-6 mr-4 cursor-pointer ${
                                                    isAnimating
                                                        ? "text-vscode-lineNumber-light dark:text-vscode-lineNumber-dark"
                                                        : "text-vscode-text-light dark:text-vscode-text-dark hover:text-orange-500"
                                                } transition-colors duration-300`}
                                                onClick={handlePrevious}
                                            />
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {isPlaying ? (
                                                <PauseIcon
                                                    className="h-6 w-6 mr-4 cursor-pointer text-vscode-text-light dark:text-vscode-text-dark hover:text-orange-500 transition-colors duration-300"
                                                    onClick={handlePause}
                                                />
                                            ) : (
                                                <PlayIcon
                                                    className="h-6 w-6 mr-4 cursor-pointer text-vscode-text-light dark:text-vscode-text-dark hover:text-orange-500 transition-colors duration-300"
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
                                                    isAnimating
                                                        ? "text-vscode-lineNumber-light dark:text-vscode-lineNumber-dark"
                                                        : "text-vscode-text-light dark:text-vscode-text-dark hover:text-orange-500"
                                                } transition-colors duration-300`}
                                                onClick={handleNext}
                                            />
                                        </motion.div>
                                        <div className="flex-grow bg-vscode-lineNumber-light dark:bg-vscode-lineNumber-dark h-2 rounded-full">
                                            <motion.div
                                                className="bg-orange-500 h-2 rounded-full"
                                                initial={{ width: "0%" }}
                                                animate={{
                                                    width: `${(currentStep / (totalSteps - 1)) * 100}%`
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
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    )
}

export default OpCodeExplorer
