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

interface TransactionItem {
    type?: string
    value?: number
    scriptSig?: ScriptDetail
    scriptPubKey?: ScriptDetail
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
                        : "text-vscode-text-light dark:text-vscode-text-dark"
                }
            >
                {part}
            </div>
        ))
    }

    return (
        <div className="h-full space-y-4 rounded-lg bg-vscode-background-light dark:bg-vscode-background-dark p-3 font-mono text-sm">
            <div className="flex flex-col gap-3 lg:flex-row">
                <div className="w-full p-2 lg:w-1/2">
                    <strong className="mb-2 block text-sm text-orange-600 dark:text-orange-400">
                        ASM:
                    </strong>
                    <div className="mt-1 whitespace-pre-wrap break-words rounded-md border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 p-2 text-xs text-vscode-text-light dark:text-vscode-text-dark">
                        {detail.asm
                            ? displayAsStack(detail.asm)
                            : "ASM data not available"}
                    </div>
                </div>
                <div className="w-full p-2 lg:w-1/2">
                    <strong className="mb-2 block text-sm text-orange-600 dark:text-orange-400">
                        HEX:
                    </strong>
                    <div className="mt-1 whitespace-pre-wrap break-words rounded-md border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 p-2 text-xs text-vscode-text-light dark:text-vscode-text-dark">
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
        let newSelectedDetail: ScriptDetail | null = null

        if ("scriptSig" in detail) {
            newSelectedDetail =
                selectedDetail === detail.scriptSig ? null : detail.scriptSig
        } else if ("scriptPubKey" in detail) {
            newSelectedDetail =
                selectedDetail === detail.scriptPubKey
                    ? null
                    : detail.scriptPubKey
        }

        setSelectedDetail(newSelectedDetail)

        if (
            highlightIndex &&
            highlightIndex[type as keyof typeof highlightIndex] === index
        ) {
            setHighlightedItemClicked((prev) => !prev)
        }
    }

    const renderItems = (
        items: TransactionItem[],
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
                                onClick={() =>
                                    handleDetailChange(item, index, type)
                                }
                                className={`mb-2 w-full cursor-pointer rounded-lg p-2 border border-gray-200 dark:border-gray-700 ${
                                    highlightIndex?.[
                                        type as keyof typeof highlightIndex
                                    ] === index
                                        ? "bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700"
                                        : "bg-vscode-input-light dark:bg-vscode-input-dark"
                                } hover:bg-vscode-hover-light dark:hover:bg-vscode-hover-dark transition-colors duration-200`}
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
                                        className={`text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark`}
                                    >
                                        {type === "inputs" ? "Input" : "Output"}{" "}
                                        {index + 1}
                                    </div>
                                    <span
                                        className={`rounded-full bg-orange-100 dark:bg-orange-900/50 px-2 py-1 text-xs text-orange-700 dark:text-orange-300`}
                                    >
                                        {type === "inputs"
                                            ? `Prev Out: ${item.type || "Unknown"}`
                                            : item.type || "Unknown"}
                                    </span>
                                </div>
                                {"value" in item && (
                                    <div className="text-left text-xs text-vscode-text-light dark:text-vscode-text-dark mt-1">
                                        {item.value} BTC
                                    </div>
                                )}
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>
                {!isExpanded && remainingCount > 0 && (
                    <div className="absolute bottom-0 left-0 right-0">
                        <div className="h-12 bg-gradient-to-t from-vscode-background-light dark:from-vscode-background-dark to-transparent"></div>
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
            <div className="rounded-lg overflow-hidden bg-[#f3f3f3] dark:bg-[#252526] shadow-md">
                {/* Header with updated background colors and reduced height */}
                <div className="bg-[#e1e1e1] dark:bg-[#3c3c3c] py-2 px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            {txTitle && (
                                <span className="text-sm font-semibold text-vscode-text-light dark:text-vscode-text-dark truncate">
                                    {txTitle}
                                </span>
                            )}
                        </div>
                        {txId && (
                            <div className="flex-shrink-0 text-right">
                                <a
                                    href={`https://mempool.space/tx/${txId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 underline inline-flex items-center"
                                    title="View transaction on mempool.space"
                                >
                                    <span className="mr-1">
                                        TX ID: {txId.slice(0, 8)}...
                                        {txId.slice(-8)}
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Body */}
                <div className="p-4">
                    <div className="relative flex flex-col items-start gap-4 lg:flex-row">
                        <div className="flex w-full flex-col lg:w-1/2">
                            <span className="font-semibold text-sm mb-2 text-vscode-text-light dark:text-vscode-text-dark">
                                Inputs ({decodedTransaction?.inputs?.length})
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
                                <div className="flex justify-center items-center w-full lg:w-auto">
                                    <div className="w-full h-0.5 bg-orange-500 dark:bg-orange-400 lg:w-0.5 lg:h-full"></div>
                                </div>
                            )}

                        <div className="flex w-full flex-col lg:w-1/2">
                            <span className="font-semibold text-sm mb-2 text-vscode-text-light dark:text-vscode-text-dark">
                                Outputs ({decodedTransaction?.outputs?.length})
                            </span>
                            {renderItems(
                                decodedTransaction?.outputs || [],
                                "outputs"
                            )}
                        </div>
                    </div>

                    {/* Selected Detail */}
                    {selectedDetail && (
                        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <BitcoinTransactionViewer detail={selectedDetail} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TransactionsDisplay
