"use client"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Network } from "bitcoinjs-lib"
import TransactionDecoder, { DecodedTransaction } from "./decodeTransaction"

interface TransactionsDisplayProps {
    rawTx: string
    txId?: string
    txTitle?: string
    highlightIndex?: { input?: number; output?: number }
    network: Network
}

interface ScriptDetail {
    asm: string
    hex: string
    type?: string
}

const BitcoinTransactionViewer: React.FC<{ detail: ScriptDetail }> = ({
    detail
}) => {
    const displayAsStack = (asm: string): JSX.Element[] => {
        if (!asm) return []
        const parts = asm.split(" ")
        return parts.map((part, index) => (
            <div
                key={index}
                className={
                    part.startsWith("OP_")
                        ? "font-bold text-orange-500"
                        : "text-gray-700 dark:text-gray-300"
                }
            >
                {part}
            </div>
        ))
    }

    return (
        <div className="h-full space-y-4 rounded-lg bg-gray-50 dark:bg-[#272E35] p-3 font-mono text-sm">
            <div className="flex flex-col gap-3 lg:flex-row">
                <div className="w-full p-2 lg:w-1/2">
                    <strong className="mb-2 block text-gray-700 dark:text-[#E5E6F1]">
                        ASM:
                    </strong>
                    <div className="mt-1 whitespace-pre-wrap break-words rounded-md border border-gray-300 dark:border-[#454C54] bg-gray-50 dark:bg-[#272E35] p-2 text-gray-700 dark:text-[#E5E6F1]">
                        {detail.asm
                            ? displayAsStack(detail.asm)
                            : "ASM data not available"}
                    </div>
                </div>
                <div className="w-full p-2 lg:w-1/2">
                    <strong className="mb-2 block text-gray-700 dark:text-[#E5E6F1]">
                        HEX:
                    </strong>
                    <div className="mt-1 whitespace-pre-wrap break-words rounded-md border border-gray-300 dark:border-[#454C54] bg-gray-50 dark:bg-[#272E35] p-2 text-gray-700 dark:text-[#E5E6F1]">
                        {detail.hex || "HEX data not available"}
                    </div>
                </div>
            </div>
        </div>
    )
}

const TransactionsDisplay: React.FC<TransactionsDisplayProps> = ({
    rawTx,
    txId,
    txTitle,
    highlightIndex,
    network
}) => {
    const [decodedTransaction, setDecodedTransaction] =
        useState<DecodedTransaction | null>(null)
    const [selectedDetail, setSelectedDetail] = useState<ScriptDetail | null>(
        null
    )
    const [highlightedItemClicked, setHighlightedItemClicked] =
        useState<boolean>(false)
    const [expandedSections, setExpandedSections] = useState<{
        inputs: boolean
        outputs: boolean
    }>({ inputs: false, outputs: false })

    useEffect(() => {
        const decoder = new TransactionDecoder(rawTx, network)
        const decoded = decoder.decode()
        setDecodedTransaction(decoded)
    }, [rawTx, network])

    const handleDetailChange = (
        detail: any,
        index: number,
        type: "inputs" | "outputs"
    ): void => {
        if ("scriptSig" in detail) {
            setSelectedDetail(
                selectedDetail === detail.scriptSig ? null : detail.scriptSig
            )
        } else if ("scriptPubKey" in detail) {
            setSelectedDetail(
                selectedDetail === detail.scriptPubKey
                    ? null
                    : detail.scriptPubKey
            )
        }

        if (
            highlightIndex &&
            highlightIndex[type as keyof typeof highlightIndex] === index
        ) {
            setHighlightedItemClicked((prev) => !prev)
        }
    }

    const renderItems = (
        items: any[],
        type: "inputs" | "outputs"
    ): JSX.Element => {
        const isExpanded = expandedSections[type]
        const displayedItems = isExpanded ? items : items.slice(0, 4)
        const remainingCount = items.length - 4

        return (
            <div className="relative">
                <div
                    className={`overflow-y-auto ${isExpanded ? "max-h-96" : "max-h-64"} p-2`}
                >
                    <AnimatePresence>
                        {displayedItems.map((item, index) => (
                            <motion.button
                                key={index}
                                className={`mb-2 w-full cursor-pointer rounded-lg p-2 border ${
                                    highlightIndex?.[
                                        type as keyof typeof highlightIndex
                                    ] === index
                                        ? "bg-orange-100 dark:bg-orange-900 border-orange-200 dark:border-orange-800"
                                        : "bg-gray-50 dark:bg-[#2D3748] border-gray-200 dark:border-gray-700"
                                } hover:bg-gray-100 dark:hover:bg-[#3A4A5E] transition-colors duration-200`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                animate={
                                    highlightIndex?.[
                                        type as keyof typeof highlightIndex
                                    ] === index && !highlightedItemClicked
                                        ? {
                                              scale: [1, 1.03, 1],
                                              transition: {
                                                  duration: 0.7,
                                                  repeat: Infinity,
                                                  repeatType: "reverse"
                                              }
                                          }
                                        : {}
                                }
                            >
                                <div className="flex items-center justify-between">
                                    <div
                                        className={`font-medium text-gray-700 dark:text-gray-200`}
                                    >
                                        {type === "inputs" ? "Input" : "Output"}{" "}
                                        {index + 1}
                                    </div>
                                    <span
                                        className={`rounded-full bg-orange-200 dark:bg-orange-800 px-3 py-1 text-xs text-orange-800 dark:text-orange-200`}
                                    >
                                        {type === "inputs"
                                            ? `Prev Out: ${item.type || "Unknown"}`
                                            : item.type || "Unknown"}
                                    </span>
                                </div>
                                {"value" in item && (
                                    <div className="text-left text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        {item.value} BTC
                                    </div>
                                )}
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>
                {!isExpanded && remainingCount > 0 && (
                    <div className="absolute bottom-0 left-0 right-0">
                        <div className="h-12 bg-gradient-to-t from-gray-50 dark:from-[#2D3748] to-transparent"></div>
                        <motion.button
                            onClick={() =>
                                setExpandedSections((prev) => ({
                                    ...prev,
                                    [type]: true
                                }))
                            }
                            className="relative z-10 w-full py-2 mt-2 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition-colors duration-200 ease-in-out text-sm font-medium"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Show all {type} ({remainingCount} remaining)
                        </motion.button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="container mx-auto py-1">
            <div className="mb-6 rounded-lg bg-gray-50 dark:bg-[#272E35] p-3">
                <div className="h-full space-y-4 rounded-lg font-mono text-sm">
                    <div className="text-center">
                        {txTitle && (
                            <h1 className="mb-1 text-base font-semibold text-gray-800 dark:text-[#E5E6F1]">
                                Transaction: {txTitle}
                            </h1>
                        )}
                        {txId && (
                            <p className="m-1 whitespace-pre-wrap break-words text-gray-600 dark:text-[#E5E6F1]">
                                Transaction ID:{" "}
                                <a
                                    href={`https://mempool.space/tx/${txId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-gray-600 dark:text-[#E5E6F1] dark:hover:text-gray-400 underline"
                                >
                                    {txId}
                                </a>
                            </p>
                        )}
                    </div>
                    <div className="relative flex flex-col items-start gap-3 lg:flex-row">
                        <div className="flex w-full flex-col p-2 lg:w-1/2">
                            <span className="font-semibold text-xl mt-4 mb-4 text-gray-800 dark:text-[#E5E6F1]">
                                Inputs{" "}
                                <span className="font-normal text-base">
                                    ({decodedTransaction?.inputs?.length})
                                </span>
                            </span>
                            {renderItems(
                                decodedTransaction?.inputs || [],
                                "inputs"
                            )}
                        </div>

                        {decodedTransaction?.inputs &&
                            decodedTransaction?.outputs &&
                            decodedTransaction.inputs.length > 0 &&
                            decodedTransaction.outputs.length > 0 && (
                                <svg
                                    className="my-4 transform fill-current text-gray-500 dark:text-[#E5E6F1] lg:mx-2 lg:my-0 lg:translate-y-1/2"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                                </svg>
                            )}
                        <div className="flex w-full flex-col p-2 lg:w-1/2">
                            <span className="font-semibold text-xl mt-4 mb-4 text-gray-800 dark:text-[#E5E6F1]">
                                Outputs{" "}
                                <span className="font-normal text-base">
                                    ({decodedTransaction?.outputs?.length})
                                </span>
                            </span>
                            {renderItems(
                                decodedTransaction?.outputs || [],
                                "outputs"
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {selectedDetail && (
                <div className="rounded-lg bg-white dark:bg-[#272E35] p-3">
                    <BitcoinTransactionViewer detail={selectedDetail} />
                </div>
            )}
        </div>
    )
}

export default TransactionsDisplay
