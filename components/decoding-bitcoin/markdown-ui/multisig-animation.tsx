"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
    RefreshCw,
    Maximize2,
    Minimize2,
    CheckCircle,
    Key,
    Lock,
    Unlock,
    RotateCcw
} from "lucide-react"
import Image from "next/image"

const participantNames = ["Alice", "Bob", "Carol"]

const MultisigAnimation = () => {
    const [numParticipants, setNumParticipants] = useState(2)
    const [requiredSignatures, setRequiredSignatures] = useState(2)
    const [signatures, setSignatures] = useState<boolean[]>(
        new Array(2).fill(false)
    )
    const [animatingKey, setAnimatingKey] = useState<number | null>(null)
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const signedCount = signatures.filter(Boolean).length
        setIsAuthorized(signedCount >= requiredSignatures)
    }, [signatures, requiredSignatures])

    const handleSign = (index: number) => {
        if (
            signatures[index] ||
            signatures.filter(Boolean).length >= requiredSignatures
        )
            return
        setAnimatingKey(index)
        setTimeout(() => {
            setAnimatingKey(null)
            setSignatures((prev) => {
                const newSigs = [...prev]
                newSigs[index] = true
                return newSigs
            })
        }, 1000)
    }

    const restartAnimation = () => {
        setSignatures(new Array(numParticipants).fill(false))
        setAnimatingKey(null)
        setIsAuthorized(false)
    }

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
    }

    const updateMultisigSetup = (participants: number, required: number) => {
        setNumParticipants(participants)
        setRequiredSignatures(required)
        setSignatures(new Array(participants).fill(false))
        setAnimatingKey(null)
        setIsAuthorized(false)
    }

    return (
        <div className="full-width">
            <div
                className={`mx-auto py-1 ${
                    isFullscreen
                        ? "fixed inset-0 z-50 bg-vscode-background-light dark:bg-vscode-background-dark overflow-auto"
                        : ""
                }`}
            >
                <div
                    className={`mx-auto py-4 ${
                        isFullscreen ? "w-full h-full" : "w-full max-w-7xl"
                    }`}
                    ref={containerRef}
                >
                    <div className="w-full bg-vscode-container-light dark:bg-vscode-container-dark rounded-lg overflow-hidden shadow-md">
                        <div className="bg-vscode-navButton-background-light dark:bg-vscode-navButton-background-dark p-4 flex flex-wrap justify-between items-center text-sm">
                            <div className="flex flex-wrap items-center space-x-4 mb-2 sm:mb-0">
                                <span className="text-vscode-text-light dark:text-vscode-text-dark font-semibold">
                                    Multisig Setup:
                                </span>
                                <select
                                    className="bg-vscode-input-light dark:bg-vscode-input-dark text-vscode-text-light dark:text-vscode-text-dark rounded px-4 py-1 pr-8 appearance-none"
                                    value={requiredSignatures}
                                    onChange={(e) =>
                                        updateMultisigSetup(
                                            numParticipants,
                                            Number(e.target.value)
                                        )
                                    }
                                >
                                    {Array.from(
                                        { length: numParticipants },
                                        (_, i) => i + 1
                                    ).map((n) => (
                                        <option key={n} value={n}>
                                            {n}
                                        </option>
                                    ))}
                                </select>

                                <span className="text-vscode-text-light dark:text-vscode-text-dark font-semibold">
                                    Of
                                </span>

                                <select
                                    className="bg-vscode-input-light dark:bg-vscode-input-dark text-vscode-text-light dark:text-vscode-text-dark rounded px-4 py-1 pr-8 appearance-none"
                                    value={numParticipants}
                                    onChange={(e) =>
                                        setNumParticipants(
                                            Number(e.target.value)
                                        )
                                    }
                                >
                                    {[1, 2, 3].map((n) => (
                                        <option key={n} value={n}>
                                            {n}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <button
                                    onClick={restartAnimation}
                                    className="p-2 bg-vscode-hover-light dark:bg-vscode-hover-dark text-vscode-text-light dark:text-vscode-text-dark rounded-full hover:bg-vscode-selection-light dark:hover:bg-vscode-selection-dark transition-colors mr-2"
                                >
                                    <RotateCcw size={16} />
                                </button>
                                <button
                                    onClick={toggleFullscreen}
                                    className="p-2 bg-vscode-hover-light dark:bg-vscode-hover-dark text-vscode-text-light dark:text-vscode-text-dark rounded-full hover:bg-vscode-selection-light dark:hover:bg-vscode-selection-dark transition-colors"
                                >
                                    {isFullscreen ? (
                                        <Minimize2 size={16} />
                                    ) : (
                                        <Maximize2 size={16} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="p-4 sm:p-8 relative">
                            <div className="flex flex-wrap justify-center mb-8 sm:mb-32 space-y-8 sm:space-y-0 sm:space-x-12 relative">
                                {Array.from(
                                    { length: numParticipants },
                                    (_, index) => (
                                        <div
                                            key={index}
                                            className="relative flex flex-col items-center w-full sm:w-auto"
                                        >
                                            <Participant
                                                name={participantNames[index]}
                                                onSign={() => handleSign(index)}
                                                signed={signatures[index]}
                                                disabled={
                                                    signatures.filter(Boolean)
                                                        .length >=
                                                    requiredSignatures
                                                }
                                                isAnimating={
                                                    animatingKey === index
                                                }
                                                imageUrl={`/decoding-bitcoin/static/images/topics/overview/p2ms/${participantNames[index].toLowerCase()}.jpg`}
                                            />
                                            <ConnectingLine
                                                isActive={signatures[index]}
                                                isAnimating={
                                                    animatingKey === index
                                                }
                                                isAuthorized={isAuthorized}
                                            />
                                        </div>
                                    )
                                )}
                            </div>

                            <div
                                className="relative mx-auto"
                                style={{
                                    width: `${Math.min(
                                        numParticipants * 192 +
                                            (numParticipants - 1) * 48,
                                        100
                                    )}%`,
                                    maxWidth: "100%"
                                }}
                            >
                                <MultisigWallet
                                    signatures={signatures}
                                    isAuthorized={isAuthorized}
                                    animatingKey={animatingKey}
                                    requiredSignatures={requiredSignatures}
                                    totalParticipants={numParticipants}
                                />
                            </div>

                            {isAuthorized && (
                                <div className="text-center text-vscode-success-light dark:text-vscode-success-dark flex items-center justify-center mt-8">
                                    <CheckCircle className="mr-2" size={24} />
                                    <span className="text-lg font-semibold">
                                        Transaction Authorized
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ConnectingLine = ({
    isActive,
    isAnimating,
    isAuthorized
}: {
    isActive: boolean
    isAnimating: boolean
    isAuthorized: boolean
}) => (
    <div
        className={`absolute left-1/2 top-full w-1 h-16 sm:h-32 -translate-x-1/2 transition-all duration-300 ${
            isAuthorized
                ? "bg-vscode-success-light dark:bg-vscode-success-dark"
                : isActive
                  ? "bg-orange-500"
                  : "bg-vscode-hover-light dark:bg-vscode-hover-dark"
        }`}
    >
        {isAnimating && (
            <motion.div
                className="absolute -left-2 top-0"
                initial={{ y: -20 }}
                animate={{ y: 148 }}
                transition={{ duration: 1 }}
            >
                <Key className="text-yellow-500" size={20} />
            </motion.div>
        )}
    </div>
)

const MultisigWallet = ({
    signatures,
    isAuthorized,
    animatingKey,
    requiredSignatures,
    totalParticipants
}: {
    signatures: boolean[]
    isAuthorized: boolean
    animatingKey: number | null
    requiredSignatures: number
    totalParticipants: number
}) => (
    <div
        className={`relative w-full h-24 sm:h-36 mx-auto border-2 border-vscode-hover-light dark:border-vscode-hover-dark rounded-lg p-2 sm:p-4 transform transition-all duration-300 ${
            isAuthorized
                ? "bg-vscode-success-light dark:bg-vscode-success-dark bg-opacity-20"
                : "bg-vscode-background-light dark:bg-vscode-background-dark"
        }`}
    >
        <div className="absolute top-2 right-2 flex items-center space-x-2">
            {!isAuthorized ? (
                <Lock
                    size={28}
                    className="text-vscode-text-light dark:text-vscode-text-dark"
                />
            ) : (
                <Unlock
                    size={28}
                    className="text-vscode-success-light dark:text-vscode-success-dark"
                />
            )}
        </div>
        <p
            className={`text-center mb-2 sm:mb-6 mt-2 text-base sm:text-xl font-semibold text-vscode-text-light dark:text-vscode-text-dark`}
        >
            {`${requiredSignatures} of ${totalParticipants}`}{" "}
            <span className="font-light">Multisig Wallet</span>
        </p>
        <div className="flex justify-around mb-4">
            {signatures.map((signed, index) => (
                <motion.div
                    key={index}
                    initial={false}
                    style={{
                        backgroundColor: isAuthorized
                            ? "#10B981"
                            : signed
                              ? "#F97316"
                              : animatingKey === index
                                ? "#F97316"
                                : "#D1D5DB",
                        boxShadow: isAuthorized
                            ? "0 0 10px 3px rgba(16, 185, 129, 0.7)"
                            : signed
                              ? "0 0 10px 3px rgba(249, 115, 22, 0.7)"
                              : animatingKey === index
                                ? "0 0 10px 3px rgba(249, 115, 22, 0.7)"
                                : "none",
                        transition: "all 0.3s ease-in-out"
                    }}
                    className="w-4 h-4 sm:w-6 sm:h-6 rounded-full flex items-center justify-center"
                >
                    {signed && <Key className="text-white" size={12} />}
                    {animatingKey === index && (
                        <motion.div
                            className="w-full h-full rounded-full bg-yellow-500 flex items-center justify-center"
                            animate={{ opacity: [0, 1] }}
                            transition={{
                                repeat: Infinity,
                                duration: 0.3,
                                repeatType: "reverse"
                            }}
                        >
                            <Key className="text-white" size={12} />
                        </motion.div>
                    )}
                </motion.div>
            ))}
        </div>
    </div>
)

const Participant = ({
    name,
    onSign,
    signed,
    disabled,
    isAnimating,
    imageUrl
}: {
    name: string
    onSign: () => void
    signed: boolean
    disabled: boolean
    isAnimating: boolean
    imageUrl: string
}) => (
    <div
        className={`bg-vscode-background-light dark:bg-vscode-background-dark rounded-lg shadow p-4 sm:p-6 text-center w-full sm:w-48 ${
            isAnimating ? "bg-orange-100" : ""
        }`}
    >
        <div className="flex justify-center mb-4">
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-vscode-hover-light dark:bg-vscode-hover-dark flex items-center justify-center overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={name}
                    width={80}
                    height={80}
                    className="object-cover"
                />
            </div>
        </div>
        <p className="mb-3 text-sm font-semibold text-vscode-text-light dark:text-vscode-text-dark">
            {name}
        </p>
        <button
            onClick={onSign}
            disabled={signed || disabled || isAnimating}
            className={`w-full px-4 py-2 text-sm rounded transition-colors relative overflow-hidden ${
                isAnimating
                    ? "bg-yellow-500 text-white"
                    : signed
                      ? "bg-vscode-success-light dark:bg-vscode-success-dark text-white"
                      : disabled
                        ? "bg-vscode-hover-light dark:bg-vscode-hover-dark text-vscode-text-light dark:text-vscode-text-dark"
                        : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
        >
            {isAnimating
                ? "Signing ..."
                : signed
                  ? "Signed"
                  : "Sign transaction"}
            {!signed && !disabled && !isAnimating && (
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="animate-shimmer absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
                </div>
            )}
        </button>
    </div>
)

export default MultisigAnimation
