"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const TransactionParts = [
    "marker",
    "version",
    "flag",
    "input_count",
    "txid",
    "vout",
    "scriptsig_size",
    "scriptsig",
    "sequence",
    "output_count",
    "amount",
    "scriptpubkey_size",
    "scriptpubkey",
    "witness",
    "locktime"
] as const

type TransactionPart = (typeof TransactionParts)[number]

interface TransactionField {
    name: string
    size: string
    format: string
    description: string
    example: string
}

interface TransactionCreationProps {
    enabledFields?: TransactionPart[]
}

export default function TransactionCreation({
    enabledFields
}: TransactionCreationProps = {}) {
    const [activeSection, setActiveSection] = useState<TransactionPart>(() => {
        if (enabledFields && enabledFields.length > 0) {
            const section = TransactionParts.includes(enabledFields[0])
            if (section) {
                return enabledFields[0]
            }
        }
        return "version"
    })

    const transactionFields: Record<TransactionPart, TransactionField> = {
        version: {
            name: "Version",
            size: "4 bytes",
            format: "Little-Endian",
            description:
                "The version number for the transaction. Used to enable new features.",
            example: "02000000"
        },
        marker: {
            name: "Marker",
            size: "1 byte",
            format: "-",
            description: "Used to indicate a segwit transaction. Must be 00.",
            example: "00"
        },
        flag: {
            name: "Flag",
            size: "1 byte",
            format: "-",
            description:
                "Used to indicate a segwit transaction. Must be 01 or greater.",
            example: "01"
        },
        input_count: {
            name: "Input Count",
            size: "variable",
            format: "Compact Size",
            description: "Indicates the number of inputs.",
            example: "01"
        },
        txid: {
            name: "Previous TXID",
            size: "32 bytes",
            format: "Natural Byte Order",
            description:
                "The TXID of the transaction containing the output you want to spend.",
            example:
                "7967a5185e907a25225574544c31f7b059c1a191d65b53dcc1554d339c4f9efc"
        },
        vout: {
            name: "Output Index",
            size: "4 bytes",
            format: "Little-Endian",
            description: "The index number of the output you want to spend.",
            example: "01000000"
        },
        scriptsig_size: {
            name: "ScriptSig Size",
            size: "variable",
            format: "Compact Size",
            description: "The size in bytes of the upcoming ScriptSig.",
            example: "6b"
        },
        scriptsig: {
            name: "ScriptSig",
            size: "variable",
            format: "Script",
            description:
                "The unlocking script that fulfills the conditions of the output.",
            example: "483045022100..."
        },
        sequence: {
            name: "Sequence",
            size: "4 bytes",
            format: "Little-Endian",
            description: "Transaction version as defined by the sender.",
            example: "ffffffff"
        },
        output_count: {
            name: "Output Count",
            size: "variable",
            format: "Compact Size",
            description: "Number of outputs in this transaction.",
            example: "02"
        },
        amount: {
            name: "Amount",
            size: "8 bytes",
            format: "Little-Endian",
            description: "The value in satoshis to be transferred.",
            example: "e803000000000000"
        },
        scriptpubkey_size: {
            name: "ScriptPubKey Size",
            size: "variable",
            format: "Compact Size",
            description: "The size of the output script.",
            example: "19"
        },
        scriptpubkey: {
            name: "ScriptPubKey",
            size: "variable",
            format: "Script",
            description:
                "The locking script defining the conditions to spend this output.",
            example: "76a914...88ac"
        },
        witness: {
            name: "Witness",
            size: "variable",
            format: "Witness Structure",
            description: "Segregated witness data (if present).",
            example: "02483045..."
        },
        locktime: {
            name: "Locktime",
            size: "4 bytes",
            format: "Little-Endian",
            description:
                "The block number or timestamp at which this transaction is unlocked.",
            example: "00000000"
        }
    }

    // Helper function to check if a field is enabled
    const isFieldEnabled = (fieldName: TransactionPart): boolean => {
        if (!enabledFields || enabledFields.length === 0) return true
        return enabledFields.includes(fieldName)
    }

    return (
        <div className="mx-auto p-4 bg-white dark:bg-vscode-container-dark rounded-xl shadow-lg full-width">
            {/* Compact Header */}
            <div className="flex items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                        Transaction
                    </span>
                    <span className="text-sm text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                        →
                    </span>
                    <span className="text-sm font-medium text-orange-500">
                        {transactionFields[activeSection].name}
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {/* Transaction Structure */}
                <div className="overflow-x-auto">
                    <motion.div
                        className="flex flex-nowrap gap-1 p-2 min-w-max"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {/* All blocks container with consistent baseline */}
                        <div className="flex items-end gap-1">
                            {" "}
                            {/* items-end ensures baseline alignment */}
                            {/* Version */}
                            <div className="flex flex-col">
                                <div className="text-[10px] text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark mb-0.5 text-center opacity-0">
                                    Structure
                                </div>
                                <div className="pt-3 px-2 pb-2">
                                    <div className="flex gap-1 items-center">
                                        <TransactionBlock
                                            field={transactionFields.version}
                                            fieldName="version"
                                            isActive={
                                                activeSection === "version"
                                            }
                                            isEnabled={isFieldEnabled(
                                                "version"
                                            )}
                                            onClick={() =>
                                                isFieldEnabled("version") &&
                                                setActiveSection("version")
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Segwit Indicator */}
                            <div className="flex flex-col">
                                <div className="text-[10px] text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark mb-0.5 text-center">
                                    Segwit (Optional)
                                </div>
                                <div className="rounded-lg bg-gray-50 dark:bg-vscode-input-dark pt-3 px-2 pb-2">
                                    <div className="flex gap-1 items-end">
                                        <TransactionBlock
                                            field={transactionFields.marker}
                                            fieldName="marker"
                                            isActive={
                                                activeSection === "marker"
                                            }
                                            isEnabled={isFieldEnabled("marker")}
                                            onClick={() =>
                                                isFieldEnabled("marker") &&
                                                setActiveSection("marker")
                                            }
                                        />
                                        <TransactionBlock
                                            field={transactionFields.flag}
                                            fieldName="flag"
                                            isActive={activeSection === "flag"}
                                            isEnabled={isFieldEnabled("flag")}
                                            onClick={() =>
                                                isFieldEnabled("flag") &&
                                                setActiveSection("flag")
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Input Count */}
                            <div className="flex flex-col">
                                <div className="text-[10px] text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark mb-0.5 text-center opacity-0">
                                    Structure
                                </div>
                                <div className="pt-3 px-2 pb-2 mt-[-8px]">
                                    <div className="flex gap-1 items-center">
                                        <TransactionBlock
                                            field={
                                                transactionFields.input_count
                                            }
                                            fieldName="input_count"
                                            isActive={
                                                activeSection === "input_count"
                                            }
                                            isEnabled={isFieldEnabled(
                                                "input_count"
                                            )}
                                            onClick={() =>
                                                isFieldEnabled("input_count") &&
                                                setActiveSection("input_count")
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Input Structure */}
                            <div className="flex flex-col">
                                <div className="text-[10px] text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark mb-0.5 text-center">
                                    Input Structure
                                </div>
                                <div className="rounded-lg bg-gray-50 dark:bg-vscode-input-dark pt-3 px-2 pb-2 mt-[-8px]">
                                    <div className="flex gap-1 items-center">
                                        {[
                                            "txid",
                                            "vout",
                                            "scriptsig_size",
                                            "scriptsig",
                                            "sequence"
                                        ].map((field) => (
                                            <TransactionBlock
                                                key={field}
                                                field={
                                                    transactionFields[
                                                        field as TransactionPart
                                                    ]
                                                }
                                                fieldName={
                                                    field as TransactionPart
                                                }
                                                isActive={
                                                    activeSection === field
                                                }
                                                isEnabled={isFieldEnabled(
                                                    field as TransactionPart
                                                )}
                                                onClick={() =>
                                                    isFieldEnabled(
                                                        field as TransactionPart
                                                    ) &&
                                                    setActiveSection(
                                                        field as TransactionPart
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Output Count */}
                            <div className="flex flex-col">
                                <div className="text-[10px] text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark mb-0.5 text-center opacity-0">
                                    Structure
                                </div>
                                <div className="pt-3 px-2 pb-2 mt-[-8px]">
                                    <div className="flex gap-1 items-center">
                                        <TransactionBlock
                                            field={
                                                transactionFields.output_count
                                            }
                                            fieldName="output_count"
                                            isActive={
                                                activeSection === "output_count"
                                            }
                                            isEnabled={isFieldEnabled(
                                                "output_count"
                                            )}
                                            onClick={() =>
                                                isFieldEnabled(
                                                    "output_count"
                                                ) &&
                                                setActiveSection("output_count")
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Output Structure */}
                            <div className="flex flex-col">
                                <div className="text-[10px] text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark mb-0.5 text-center">
                                    Output Structure
                                </div>
                                <div className="rounded-lg bg-gray-50 dark:bg-vscode-input-dark pt-3 px-2 pb-2 mt-[-8px]">
                                    <div className="flex gap-1 items-center">
                                        {[
                                            "amount",
                                            "scriptpubkey_size",
                                            "scriptpubkey"
                                        ].map((field) => (
                                            <TransactionBlock
                                                key={field}
                                                field={
                                                    transactionFields[
                                                        field as TransactionPart
                                                    ]
                                                }
                                                fieldName={
                                                    field as TransactionPart
                                                }
                                                isActive={
                                                    activeSection === field
                                                }
                                                isEnabled={isFieldEnabled(
                                                    field as TransactionPart
                                                )}
                                                onClick={() =>
                                                    isFieldEnabled(
                                                        field as TransactionPart
                                                    ) &&
                                                    setActiveSection(
                                                        field as TransactionPart
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Witness */}
                            <div className="flex flex-col">
                                <div className="text-[10px] text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark mb-0.5 text-center opacity-0">
                                    Structure
                                </div>
                                <div className="pt-3 px-2 pb-2 mt-[-8px]">
                                    <div className="flex gap-1 items-center">
                                        <TransactionBlock
                                            field={transactionFields.witness}
                                            fieldName="witness"
                                            isActive={
                                                activeSection === "witness"
                                            }
                                            isEnabled={isFieldEnabled(
                                                "witness"
                                            )}
                                            onClick={() =>
                                                isFieldEnabled("witness") &&
                                                setActiveSection("witness")
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Locktime */}
                            <div className="flex flex-col">
                                <div className="text-[10px] text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark mb-0.5 text-center opacity-0">
                                    Structure
                                </div>
                                <div className="pt-3 px-2 pb-2 mt-[-8px]">
                                    <div className="flex gap-1 items-center">
                                        <TransactionBlock
                                            field={transactionFields.locktime}
                                            fieldName="locktime"
                                            isActive={
                                                activeSection === "locktime"
                                            }
                                            isEnabled={isFieldEnabled(
                                                "locktime"
                                            )}
                                            onClick={() =>
                                                isFieldEnabled("locktime") &&
                                                setActiveSection("locktime")
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Two Column Layout for Details and Byte Viewer */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {/* Enhanced Details Panel */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            className="bg-white dark:bg-gray-800 p-4 rounded-lg lg:order-1 shadow-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-300">
                                        Size
                                    </h3>
                                    <p className="text-gray-900 dark:text-white">
                                        {transactionFields[activeSection].size}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-300">
                                        Format
                                    </h3>
                                    <p className="text-gray-900 dark:text-white">
                                        {
                                            transactionFields[activeSection]
                                                .format
                                        }
                                    </p>
                                </div>
                                <div className="col-span-2">
                                    <h3 className="font-medium text-gray-700 dark:text-gray-300">
                                        Description
                                    </h3>
                                    <p className="text-gray-900 dark:text-white">
                                        {
                                            transactionFields[activeSection]
                                                .description
                                        }
                                    </p>
                                </div>
                                <div className="col-span-2">
                                    <h3 className="font-medium text-gray-700 dark:text-gray-300">
                                        Example
                                    </h3>
                                    <div className="group relative">
                                        <code className="block w-full bg-gray-200 dark:bg-gray-700 px-2 py-1.5 rounded text-sm">
                                            {
                                                transactionFields[activeSection]
                                                    .example
                                            }
                                        </code>
                                        <button
                                            onClick={() =>
                                                navigator.clipboard.writeText(
                                                    transactionFields[
                                                        activeSection
                                                    ].example
                                                )
                                            }
                                            className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity
                                            px-1.5 py-0.5 rounded bg-gray-300 dark:bg-gray-600 text-xs"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Enhanced Byte Viewer */}
                    <div className="bg-gray-50 dark:bg-black p-4 rounded-lg lg:order-2 shadow-sm">
                        <h3 className="text-sm text-gray-400 mb-2">
                            Byte Visualization
                        </h3>
                        <div className="flex gap-4 overflow-x-auto">
                            {transactionFields[activeSection].example
                                .match(/.{1,2}/g)
                                ?.map((byte, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex flex-col items-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.03 }}
                                    >
                                        <div className="text-orange-500 dark:text-orange-400 text-lg font-mono font-bold">
                                            {byte}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Byte {index + 1}
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface TransactionBlockProps {
    field: TransactionField
    isActive: boolean
    isEnabled?: boolean
    onClick: () => void
    fieldName: TransactionPart
}

function TransactionBlock({
    field,
    isActive,
    isEnabled = true,
    onClick,
    fieldName
}: TransactionBlockProps) {
    const getByteWidth = (size: string): string => {
        if (size.includes("variable")) {
            return "w-[64px]"
        }
        if (size === "1 byte") {
            return "w-[48px]"
        }
        const numBytes = parseInt(size)
        return `w-[${Math.max(numBytes * 16, 48)}px]`
    }

    const byteWidth = getByteWidth(field.size)

    return (
        <motion.div
            className={`${byteWidth} p-2 rounded-md transition-all h-[64px] flex flex-col justify-between ${
                !isEnabled
                    ? "opacity-30 bg-gray-100 text-gray-400 dark:bg-gray-800/30 dark:text-gray-500 cursor-not-allowed"
                    : isActive
                      ? "bg-orange-500 text-white dark:bg-orange-600 ring-2 ring-orange-200 dark:ring-orange-900 cursor-pointer"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-orange-50 dark:hover:bg-orange-900/50 cursor-pointer shadow-sm"
            }`}
            onClick={onClick}
            whileHover={{ scale: isEnabled ? 1.02 : 1 }}
        >
            <div className="flex flex-col flex-grow justify-center">
                <div className="text-xs font-medium truncate">{field.name}</div>
                <div className="text-[10px] truncate opacity-60">
                    {field.size}
                </div>
            </div>
            <div className="flex gap-px">
                {field.size.includes("variable") ? (
                    <div className="h-1 bg-current opacity-10 flex-1" />
                ) : (
                    [...Array(parseInt(field.size))].map((_, i) => (
                        <div
                            key={i}
                            className="h-1 bg-current opacity-10 flex-1"
                        />
                    ))
                )}
            </div>
        </motion.div>
    )
}
