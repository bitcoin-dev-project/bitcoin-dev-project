"use client"
import { useState, useEffect, useCallback } from "react"
import * as bitcoin from "bitcoinjs-lib"
import clsx from "clsx"
import { Code, Hash, ArrowRight, Info } from "lucide-react"
import { motion } from "framer-motion"

interface HashFunction {
    id: string
    name: string
    description: string
    bitcoinUsage: string[]
    exampleInputs: Array<{
        value: string
        description: string
    }>
    compute: (input: Buffer) => string
}

const HASH_FUNCTIONS: HashFunction[] = [
    {
        id: "sha256",
        name: "SHA256",
        description:
            "Single SHA256 hash, foundational cryptographic hash function used widely in Bitcoin processes.",
        bitcoinUsage: [
            "First step in Hash256 (double-SHA256)",
            "Checksum calculation in BIP39 mnemonic generation",
            "Tagged hashes in Taproot (BIP340/BIP341)"
        ],
        exampleInputs: [
            {
                value: "0000000000000000000000000000000000000000000000000000000000000000",
                description: "Zero hash (32 bytes)"
            }
        ],
        compute: (input) => bitcoin.crypto.sha256(input).toString("hex")
    },
    {
        id: "hash256",
        name: "Double SHA256 (Hash256)",
        description:
            "Double SHA256 (SHA256 applied twice), standard Bitcoin hashing method for IDs and proofs.",
        bitcoinUsage: [
            "Block hash calculation",
            "Transaction ID (txid) generation",
            "Merkle tree node hashing",
            "Proof-of-Work mining"
        ],
        exampleInputs: [
            {
                value: "0060e722ce6ea8011b3ae43537b262f79f72e97821bd7e1aef87020000000000000000001490faf2130be1ba514695dca7282d86dd0dd806f812f96176775eb3080a17fc410b1167cd0e03171ca9a6f6",
                description: "Sample block header"
            },
            {
                value: "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff08040e80001c020102ffffffff0100f2052a010000004341049e5f852a2a7c501eed92e4a139910c8482f39c822033ea9ddd97e3e885e25b7af9a34028a02b6baa5d829f8de2f63ee0f39f5212290fac6b9470165f019a21f4ac00000000",
                description: "Sample transaction data"
            }
        ],
        compute: (input) => bitcoin.crypto.hash256(input).toString("hex")
    },
    {
        id: "ripemd160",
        name: "RIPEMD160",
        description:
            "RIPEMD160 hash function, used in combination with SHA256 for creating shorter addresses.",
        bitcoinUsage: [
            "Second step in Hash160 (SHA256 + RIPEMD160)",
            "Used after SHA256 in public key hashing",
            "Ensures shorter, fixed-length address representation"
        ],
        exampleInputs: [
            {
                value: "02b4632d08485ff1df2db55b9dafd23347d1c47a457072a1e87be26896549a8737",
                description: "Sample public key (compressed)"
            }
        ],
        compute: (input) => bitcoin.crypto.ripemd160(input).toString("hex")
    },
    {
        id: "hash160",
        name: "Hash160 (SHA256 + RIPEMD160)",
        description:
            "SHA256 followed by RIPEMD160, standard method to hash public keys and scripts for Bitcoin addresses.",
        bitcoinUsage: [
            "P2PKH address generation",
            "P2SH script hash calculation",
            "P2WPKH (SegWit) witness program"
        ],
        exampleInputs: [
            {
                value: "02b4632d08485ff1df2db55b9dafd23347d1c47a457072a1e87be26896549a8737",
                description: "Sample public key (compressed)"
            }
        ],
        compute: (input) => bitcoin.crypto.hash160(input).toString("hex")
    }
]

interface HashFunctionCardProps {
    hash: HashFunction
    isSelected: boolean
    onSelect: (id: string) => void
}

const HashFunctionCard = ({
    hash,
    isSelected,
    onSelect
}: HashFunctionCardProps) => (
    <div
        className={clsx(
            "p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md",
            isSelected
                ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-md"
                : "border-vscode-border-light dark:border-vscode-border-dark hover:border-orange-300"
        )}
        onClick={() => onSelect(hash.id)}
    >
        <div className="flex items-center gap-2">
            <div
                className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    isSelected
                        ? "bg-orange-500"
                        : "bg-gray-200 dark:bg-gray-700"
                )}
            >
                <Hash
                    className={clsx(
                        "w-4 h-4",
                        isSelected
                            ? "text-white"
                            : "text-gray-600 dark:text-gray-300"
                    )}
                />
            </div>
            <h3 className="font-medium text-vscode-text-light dark:text-vscode-text-dark">
                {hash.name}
            </h3>
        </div>
        <p className="mt-2 text-sm text-vscode-text-light dark:text-vscode-text-dark opacity-80">
            {hash.description}
        </p>
        <div className="mt-3">
            <div className="text-xs font-medium text-vscode-text-light dark:text-vscode-text-dark mb-1">
                Used in Bitcoin for:
            </div>
            <ul className="list-disc list-inside text-xs text-vscode-text-light dark:text-vscode-text-dark opacity-80 space-y-1">
                {hash.bitcoinUsage.map((usage, i) => (
                    <li key={i}>{usage}</li>
                ))}
            </ul>
        </div>
    </div>
)

interface ExampleInputsProps {
    examples: HashFunction["exampleInputs"]
    onSelectExample: (value: string) => void
}

const ExampleInputs = ({ examples, onSelectExample }: ExampleInputsProps) => (
    <div className="bg-gray-50 dark:bg-black/40 p-4 rounded-lg border border-orange-500/20 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-md">
                <Code className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-sm font-semibold text-vscode-text-light dark:text-vscode-text-dark">
                Example Test Values
            </div>
        </div>
        <div className="flex flex-col gap-3">
            {examples.map((example, i) => (
                <motion.div
                    key={i}
                    className="bg-white dark:bg-vscode-input-dark p-3 rounded-lg border border-vscode-border-light dark:border-vscode-border-dark cursor-pointer hover:border-orange-500 transition-all hover:shadow-md"
                    onClick={() => onSelectExample(example.value)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    <div className="font-mono text-xs break-all text-vscode-text-light dark:text-vscode-text-dark bg-gray-50 dark:bg-black p-2 rounded">
                        {example.value}
                    </div>
                    <p className="text-xs text-vscode-text-light dark:text-vscode-text-dark opacity-80 mt-2">
                        {example.description}
                    </p>
                </motion.div>
            ))}
        </div>
    </div>
)

interface HashInputProps {
    input: string
    onInputChange: (value: string) => void
}

const HashInput = ({ input, onInputChange }: HashInputProps) => (
    <div className="bg-white dark:bg-vscode-input-dark p-4 rounded-lg border border-vscode-border-light dark:border-vscode-border-dark shadow-sm">
        <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
                <Hash className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-sm font-semibold text-vscode-text-light dark:text-vscode-text-dark">
                Custom Input
            </div>
        </div>
        <div className="space-y-3">
            <textarea
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="Enter hex value (e.g., 02a79cd900a43af6c1c6ff9e)"
                className="w-full p-3 border-2 border-vscode-input-border-light dark:border-vscode-input-border-dark rounded-lg font-mono text-sm bg-gray-50 dark:bg-black text-vscode-text-light dark:text-vscode-text-dark focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                rows={3}
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 italic">
                Input must be a valid hexadecimal string with an even number of
                characters
            </div>
        </div>
    </div>
)

const useHashComputation = (input: string, selectedHash: string) => {
    const [result, setResult] = useState<string>("")
    const [error, setError] = useState("")

    const computeHash = useCallback(() => {
        try {
            setError("")
            const trimmedInput = input.trim()
            if (!trimmedInput.match(/^[0-9a-fA-F]*$/)) {
                throw new Error(
                    "Input must contain only hexadecimal characters (0-9, a-f, A-F)"
                )
            }
            if (trimmedInput.length === 0) {
                throw new Error("Input cannot be empty")
            }
            if (trimmedInput.length % 2 !== 0) {
                throw new Error("Input must have an even number of characters")
            }

            const inputBuffer = Buffer.from(trimmedInput, "hex")
            const hashFunction = HASH_FUNCTIONS.find(
                (h) => h.id === selectedHash
            )
            if (hashFunction) {
                setResult(hashFunction.compute(inputBuffer))
            }
        } catch (err: any) {
            setError("Invalid hex input: " + err.message)
            setResult("")
        }
    }, [input, selectedHash])

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (input.trim()) {
                computeHash()
            } else {
                setResult("")
                setError("")
            }
        }, 500)

        return () => clearTimeout(debounceTimer)
    }, [input, computeHash])

    return { result, error }
}

const ResultDisplay = ({ result }: { result: string }) => {
    if (!result) return null
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 shadow-sm"
        >
            <div className="flex items-center gap-2 mb-2">
                <div className="bg-green-100 dark:bg-green-800/50 p-1.5 rounded-md">
                    <svg
                        className="w-4 h-4 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <div className="text-sm font-medium text-green-800 dark:text-green-400">
                    Hash Result
                </div>
            </div>
            <div className="font-mono text-sm break-all bg-white dark:bg-black/50 p-3 rounded border border-green-200 dark:border-green-800 text-vscode-text-light dark:text-vscode-text-dark">
                {result}
            </div>
        </motion.div>
    )
}

const ErrorDisplay = ({ error }: { error: string }) => {
    if (!error) return null
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg shadow-sm"
        >
            <div className="flex items-center gap-2">
                <div className="bg-red-100 dark:bg-red-800/50 p-1.5 rounded-md">
                    <svg
                        className="w-4 h-4 text-red-600 dark:text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <div className="text-sm font-medium text-red-800 dark:text-red-400">
                    {error}
                </div>
            </div>
        </motion.div>
    )
}

const HashFunctions = () => {
    const [input, setInput] = useState("")
    const [selectedHash, setSelectedHash] = useState<string>("sha256")
    const [showInfo, setShowInfo] = useState(false)
    const { result, error } = useHashComputation(input, selectedHash)

    const selectedFunction = HASH_FUNCTIONS.find(
        (h) => h.id === selectedHash
    ) as HashFunction

    return (
        <div className="bg-white dark:bg-vscode-background-dark rounded-xl max-w-4xl mx-auto border border-vscode-border-light dark:border-vscode-border-dark shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-dark-200 p-4 text-white">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <Hash className="w-5 h-5" />
                    Bitcoin Hash Functions
                </h1>
            </div>

            {/* Main content */}
            <div className="p-5">
                {/* Hash Function Selector */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark">
                            Select Hash Function
                        </label>
                        <button
                            onClick={() => setShowInfo(!showInfo)}
                            className="text-xs flex items-center gap-1 text-orange-500 hover:text-orange-600"
                        >
                            <Info className="w-3 h-3" />
                            {showInfo ? "Hide details" : "Show details"}
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {HASH_FUNCTIONS.map((hash) => (
                            <button
                                key={hash.id}
                                onClick={() => setSelectedHash(hash.id)}
                                className={clsx(
                                    "py-2 px-3 rounded-md text-sm font-medium transition-all",
                                    selectedHash === hash.id
                                        ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-l-4 border-orange-500"
                                        : "bg-gray-100 dark:bg-gray-800 text-vscode-text-light dark:text-vscode-text-dark hover:bg-orange-50 dark:hover:bg-orange-900/10 border-l-4 border-transparent"
                                )}
                            >
                                {hash.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Hash Function Info (Collapsible) */}
                {showInfo && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-vscode-border-light dark:border-vscode-border-dark"
                    >
                        <h3 className="font-medium text-vscode-text-light dark:text-vscode-text-dark mb-2">
                            {selectedFunction.name}
                        </h3>
                        <p className="text-sm text-vscode-text-light dark:text-vscode-text-dark opacity-80 mb-3">
                            {selectedFunction.description}
                        </p>
                        <div className="text-xs font-medium text-vscode-text-light dark:text-vscode-text-dark mb-1">
                            Used in Bitcoin for:
                        </div>
                        <ul className="list-disc list-inside text-xs text-vscode-text-light dark:text-vscode-text-dark opacity-80 space-y-1 pl-2">
                            {selectedFunction.bitcoinUsage.map((usage, i) => (
                                <li key={i}>{usage}</li>
                            ))}
                        </ul>
                    </motion.div>
                )}

                {/* Input Section */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark mb-2">
                        Input (Hex Format)
                    </label>
                    <div className="flex flex-col gap-2">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter hex value (e.g., 02a79cd900a43af6c1c6ff9e)"
                            className="w-full p-3 border border-vscode-input-border-light dark:border-vscode-input-border-dark rounded-lg font-mono text-sm bg-white dark:bg-vscode-input-dark text-vscode-text-light dark:text-vscode-text-dark focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                            rows={2}
                        />
                        <div className="text-xs text-vscode-text-light dark:text-vscode-text-dark opacity-70">
                            Input must be a valid hexadecimal string
                        </div>
                    </div>
                </div>

                {/* Example Values */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark">
                            Example Values
                        </label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {selectedFunction.exampleInputs.map((example, i) => (
                            <button
                                key={i}
                                onClick={() => setInput(example.value)}
                                className="text-xs py-1 px-2 bg-gray-100 dark:bg-gray-800 text-vscode-text-light dark:text-vscode-text-dark rounded border border-vscode-border-light dark:border-vscode-border-dark hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors"
                                title={example.description}
                            >
                                Example {i + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm flex items-center gap-2">
                        <svg
                            className="w-4 h-4 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        {error}
                    </div>
                )}

                {/* Result Display */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-vscode-border-light dark:border-vscode-border-dark overflow-hidden">
                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-vscode-border-light dark:border-vscode-border-dark">
                        <div className="text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark flex items-center gap-2">
                            <ArrowRight className="w-4 h-4 text-orange-500" />
                            Result: {selectedFunction.name}
                        </div>
                    </div>
                    <div className="p-4">
                        {result ? (
                            <div className="font-mono text-sm break-all bg-white dark:bg-vscode-input-dark p-3 rounded border border-vscode-border-light dark:border-vscode-border-dark text-vscode-text-light dark:text-vscode-text-dark">
                                {result}
                            </div>
                        ) : (
                            <div className="text-sm text-vscode-text-light dark:text-vscode-text-dark opacity-70 italic">
                                Enter a valid hex input to see the hash result
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HashFunctions
