"use client"

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

const opcodeData = {
    OP_CHECKSIG: {
        hex: "0xAC",
        description:
            "Verifies a signature against a public key and the transaction data. If the signature is valid, it pushes 1 onto the stack; otherwise, it pushes 0.",
        asm: "<sig> <pubkey> OP_CHECKSIG",
        hexCode: "<sig> <pubkey> 0xAC",
        svgPath:
            "/bitcoin-topics/static/images/topics/overview/OP_CHECKSIG.svg",
        svgId: "etLaMCOGQ3q1"
    },
    OP_CHECKMULTISIG: {
        hex: "0xAE",
        description:
            "Verifies multiple signatures against multiple public keys. It checks if at least m of n signatures are valid. If yes push 1 (true) to the stack, otherwise 0 (false)",
        asm: "0 <Signature2> <Signature3> 2 <PublicKey1> <PublicKey2> <PublicKey3> 3 OP_CHECKMULTISIG",
        hexCode:
            "0x00 <Signature2> <Signature3> 0x52 <PublicKey1> <PublicKey2> <PublicKey3> 0x53 0xAE",
        svgPath:
            "/bitcoin-topics/static/images/topics/overview/OP_CHECKMULTISIG.svg",
        svgId: "eMfFZSNeGgU1"
    },
    OP_RETURN: {
        hex: "0x6A",
        description:
            "Marks the output as containing data and makes it unspendable. It is often used to embed arbitrary data into the blockchain.",
        asm: "OP_RETURN <data>",
        hexCode: "0x6A <data>",
        svgPath: "/bitcoin-topics/static/images/topics/overview/OP_RETURN.svg",
        svgId: "ePRvDAyVHFs1"
    },
    OP_DUP: {
        hex: "0x76",
        description:
            "Duplicates the top item on the stack and pushes it onto the stack again.",
        asm: "5 OP_DUP",
        hexCode: "0x05 0x76",
        svgPath: "/bitcoin-topics/static/images/topics/overview/OP_DUP.svg",
        svgId: "eGP7zSnXZvb1"
    },
    OP_EQUAL: {
        hex: "0x87",
        description:
            "Compares the top two items on the stack. If they are equal, it pushes 1 onto the stack; otherwise, it pushes 0.",
        asm: "5 5 OP_EQUAL",
        hexCode: "0x05 0x05 0x87",
        svgPath: "/bitcoin-topics/static/images/topics/overview/OP_EQUAL.svg",
        svgId: "enWCL7dSHsN1"
    },
    OP_HASH160: {
        hex: "0xA9",
        description:
            "Hashes the top item on the stack twice: first with SHA-256 and then with RIPEMD-160.",
        asm: "<data> OP_HASH160",
        hexCode: "<data> 0xA9",
        svgPath: "/bitcoin-topics/static/images/topics/overview/OP_HASH160.svg",
        svgId: "enqhsG8NxoX1"
    },
    OP_EQUALVERIFY: {
        hex: "0x88",
        description:
            "Compares the top two items on the stack for equality. If they are not equal, the script fails.",
        asm: "5 5 OP_EQUAL",
        hexCode: "0x05 0x05 0x87",
        svgPath:
            "/bitcoin-topics/static/images/topics/overview/OP_EQUALVERIFY.svg",
        svgId: "eO6lxqRz2Gw1"
    },
    OP_IF: {
        hex: "0x63",
        description:
            "Evaluates a condition. If the condition is true (non-zero), it executes the statements after OP_IF. Otherwise, it jumps to the code after OP_ELSE, if present, or OP_ENDIF.",
        asm: "<condition> OP_IF <true branch code> OP_ELSE <false branch code> OP_ENDIF",
        hexCode:
            "<condition> 0x63 <true branch code> 0x67 <false branch code> 0x68",
        svgPath: "/bitcoin-topics/static/images/topics/overview/OP_IF.svg",
        svgId: "eXi1yJfSEOH1"
    },
    OP_ELSE: {
        hex: "0x67",
        description:
            "Marks the beginning of the false branch of a conditional execution (used after OP_IF). The code after OP_ELSE is executed if the condition evaluated by OP_IF is false (zero).",
        asm: "OP_IF <true_statements> OP_ELSE <false_statements> OP_ENDIF",
        hexCode: "0x63 <true_statements> 0x67 <false_statements> 0x68",
        svgPath: "/bitcoin-topics/static/images/topics/overview/OP_ELSE.svg",
        svgId: "exNKX69acQq1"
    }
}
interface SvgatorPlayer {
    ready: (callback: () => void) => void
    pause: () => void
    seekTo: (time: number) => void
    play: () => void
    duration: number
    currentTime: number
}

const OpCodeExplorer = () => {
    const [selectedOpCode, setSelectedOpCode] = useState<string>(
        Object.keys(opcodeData)[0]
    )
    const [isAsm, setIsAsm] = useState<boolean>(true)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [hasStarted, setHasStarted] = useState<boolean>(false)
    const [totalSteps, setTotalSteps] = useState<number>(4)
    const [isAnimating, setIsAnimating] = useState(false)
    const svgRef = useRef<HTMLObjectElement | null>(null)
    const playerRef = useRef<SvgatorPlayer | null>(null)
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const opCodes = Object.keys(opcodeData)
    const currentOpCode = opcodeData[selectedOpCode as keyof typeof opcodeData]

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
                className="bg-[#272E35] p-4 sm:p-6 rounded-lg text-sm sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
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
                                            : "bg-[#454C54] text-[#E5E6F1] hover:bg-[#5A6270]"
                                    }`}
                                    onClick={() => setSelectedOpCode(opCode)}
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
                        className="bg-[#E5E6F1] p-4 sm:p-6 rounded-lg"
                    >
                        <h2 className="text-xl sm:text-2xl font-bold mb-8 mt-8 sm:mb-12 text-center text-[#000000]">
                            {selectedOpCode} ({currentOpCode.hex}):{" "}
                            <span className="text-light sm:text-light font-light">
                                {currentOpCode.description}
                            </span>
                        </h2>

                        <div className="flex flex-col lg:flex-row mb-6">
                            <div className="w-full lg:w-2/5 mb-4 lg:mb-0 lg:pr-6 lg:border-r border-[#454C54]">
                                <div className="bg-[#272E35] text-[#E5E6F1] p-4 rounded-lg shadow-lg">
                                    <div className="flex items-center justify-between mb-3 border-b border-[#454C54] pb-2">
                                        <span className="text-sm font-medium">
                                            Example
                                        </span>
                                        <div className="flex items-center bg-[#454c54] rounded-full p-1">
                                            <button
                                                className={`px-3 py-1 text-xs rounded-full transition-colors duration-300 ${
                                                    !isAsm
                                                        ? "bg-gray-600 text-white"
                                                        : "text-gray-300"
                                                }`}
                                                onClick={() => setIsAsm(false)}
                                            >
                                                HEX
                                            </button>
                                            <button
                                                className={`px-3 py-1 text-xs rounded-full transition-colors duration-300 ${
                                                    isAsm
                                                        ? "bg-gray-600 text-white"
                                                        : "text-gray-300"
                                                }`}
                                                onClick={() => setIsAsm(true)}
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
                                        <pre className="whitespace-pre-wrap bg-[#1D2127] p-3 rounded overflow-x-auto">
                                            {isAsm
                                                ? currentOpCode.asm
                                                : currentOpCode.hexCode}
                                        </pre>
                                    </motion.div>
                                </div>
                            </div>

                            <div className="w-full lg:w-3/5 lg:pl-6">
                                <div className="bg-[#454c54] h-64 sm:h-80 rounded-lg mb-4">
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
                                <div className="border-2 border-dashed border-[#454C54] p-3 rounded-lg bg-[#272E35] flex items-center justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <RewindIcon
                                            className={`h-6 w-6 mr-4 cursor-pointer ${
                                                isAnimating
                                                    ? "text-gray-500"
                                                    : "text-[#E5E6F1] hover:text-orange-500"
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
                                                isAnimating
                                                    ? "text-gray-500"
                                                    : "text-[#E5E6F1] hover:text-orange-500"
                                            } transition-colors duration-300`}
                                            onClick={handleNext}
                                        />
                                    </motion.div>
                                    <div className="flex-grow bg-[#454C54] h-2 rounded-full">
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
            </motion.div>
        </div>
    )
}

export default OpCodeExplorer
