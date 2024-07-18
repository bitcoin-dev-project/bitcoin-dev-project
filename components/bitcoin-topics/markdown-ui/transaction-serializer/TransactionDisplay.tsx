"use client"
import React, { useState, useEffect } from "react"
import TransactionDecoder from "./decodeTransaction"

interface TransactionsDisplayProps {
    rawTx: string // Required
    txId?: string // Optional
    txTitle?: string // Optional
    highlightIndex?: { input?: number; output?: number } // Optional
}
const BitcoinTransactionViewer: React.FC<{ detail: any }> = ({ detail }) => {
    const displayAsStack = (asm: string) => {
        if (!asm) return []
        const parts = asm.split(" ")
        return parts.map((part, index) => (
            <div
                key={index}
                className={
                    part.startsWith("OP_")
                        ? "font-bold text-orange-500"
                        : "text-black"
                }
            >
                {part}
            </div>
        ))
    }

    return (
        <div className="h-full space-y-4 rounded-lg bg-white p-3 font-mono text-sm">
            <div className="flex flex-col gap-3 lg:flex-row">
                <div className="w-full p-2 lg:w-1/2">
                    <strong className="mb-2 block text-gray-700">ASM:</strong>
                    <div className="mt-1 whitespace-pre-wrap break-words rounded-md border border-gray-300 bg-white p-2 text-gray-700">
                        {detail.asm
                            ? displayAsStack(detail.asm)
                            : "ASM data not available"}
                    </div>
                </div>
                <div className="w-full p-2 lg:w-1/2">
                    <strong className="mb-2 block text-gray-700">HEX:</strong>
                    <div className="mt-1 whitespace-pre-wrap break-words rounded-md border border-gray-300 bg-white p-2 text-gray-700">
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
    highlightIndex
}) => {
    const [decodedTransaction, setDecodedTransaction] = useState<any>(null)
    const [selectedDetail, setSelectedDetail] = useState<any>(null)

    useEffect(() => {
        const decoder = new TransactionDecoder(rawTx, "testnet")
        setDecodedTransaction(decoder.decode())
    }, [rawTx])

    const handleDetailChange = (detail: any) => {
        if (selectedDetail === (detail.scriptPubKey || detail.scriptSig)) {
            setSelectedDetail(null)
        } else {
            setSelectedDetail(detail.scriptPubKey || detail.scriptSig)
        }
    }

    return (
        <div className="container mx-auto py-1">
            <div className="mb-6 rounded-lg bg-gray-100 p-3">
                <div className="h-full space-y-4 rounded-lg font-mono text-sm">
                    <div className="text-center">
                        {txTitle && (
                            <h1 className="mb-1 text-base font-semibold">
                                Transaction: {txTitle}
                            </h1>
                        )}
                        {txId && (
                            <p className="m-1 whitespace-pre-wrap break-words text-sm text-gray-600">
                                Transaction ID: {txId}
                            </p>
                        )}
                    </div>
                    <div className="relative flex flex-col items-start gap-3 lg:flex-row">
                        <div className="flex w-full flex-col p-2 lg:w-1/2">
                            {decodedTransaction?.inputs?.map(
                                (input: any, index: any) => (
                                    <button
                                        key={index}
                                        className={`mb-2 cursor-pointer rounded-lg p-2 shadow ${
                                            highlightIndex?.input === index
                                                ? "bg-orange-100"
                                                : "bg-white"
                                        }`}
                                        onClick={() =>
                                            handleDetailChange(input)
                                        }
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="font-medium text-gray-800">
                                                Input {index + 1}
                                            </div>
                                            {highlightIndex?.input ===
                                                index && (
                                                <span className="text-black-800 rounded-full bg-orange-200 px-3 py-1 text-sm">
                                                    {input.scriptSig.type ||
                                                        "Type not specified"}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-left text-sm text-gray-600">
                                            Click to view details
                                        </div>
                                    </button>
                                )
                            )}
                        </div>

                        {decodedTransaction?.inputs?.length > 0 &&
                            decodedTransaction?.outputs?.length > 0 && (
                                <svg
                                    className="my-4 transform fill-current text-gray-500 lg:mx-2 lg:my-0 lg:translate-y-1/2"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                                </svg>
                            )}
                        <div className="flex w-full flex-col p-2 lg:w-1/2">
                            {decodedTransaction?.outputs?.map(
                                (output: any, index: any) => (
                                    <button
                                        key={index}
                                        className={`mb-2 cursor-pointer rounded-lg p-2 shadow ${highlightIndex?.output === index ? "bg-orange-100" : "bg-white"}`}
                                        onClick={() =>
                                            handleDetailChange(output)
                                        }
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="font-medium text-gray-800">
                                                Output {index + 1}
                                            </div>
                                            {highlightIndex?.output ===
                                                index && (
                                                <span className="text-black-800 rounded-full bg-orange-200 px-3 py-1 text-sm">
                                                    {output.scriptPubKey.type ||
                                                        "Type not specified"}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-left text-sm text-gray-600">
                                            {output.value} BTC
                                        </div>
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {selectedDetail && (
                <div className="rounded-lg bg-gray-100 p-3">
                    <BitcoinTransactionViewer detail={selectedDetail} />
                </div>
            )}
        </div>
    )
}

export default TransactionsDisplay
