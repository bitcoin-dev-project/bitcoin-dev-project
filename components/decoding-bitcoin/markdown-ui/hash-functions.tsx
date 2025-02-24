"use client"
import { useState } from "react"
import * as bitcoin from "bitcoinjs-lib"
import clsx from "clsx"
import { Code, Hash } from "lucide-react"
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
            "p-4 rounded-lg border-2 cursor-pointer transition-colors",
            isSelected
                ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                : "border-vscode-border-light dark:border-vscode-border-dark hover:border-orange-300"
        )}
        onClick={() => onSelect(hash.id)}
    >
        <h3 className="font-medium text-vscode-text-light dark:text-vscode-text-dark">
            {hash.name}
        </h3>
        <p className="mt-1 text-sm text-vscode-text-light dark:text-vscode-text-dark opacity-80">
            {hash.description}
        </p>
        <div className="mt-2">
            <div className="text-xs font-medium text-vscode-text-light dark:text-vscode-text-dark mb-1">
                Used in Bitcoin for:
            </div>
            <ul className="list-disc list-inside text-xs text-vscode-text-light dark:text-vscode-text-dark opacity-80">
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
    <div className="bg-gray-50 dark:bg-black p-4 rounded-lg border-2 border-orange-500/20">
        <div className="flex items-center gap-2 mb-4">
            <Code className="w-4 h-4 text-orange-500" />
            <div className="text-sm font-semibold text-vscode-text-light dark:text-vscode-text-dark">
                Example Test Values
            </div>
        </div>
        <div className="flex flex-col gap-3">
            {examples.map((example, i) => (
                <motion.div
                    key={i}
                    className="bg-white dark:bg-vscode-input-dark p-3 rounded-lg border border-vscode-border-light dark:border-vscode-border-dark cursor-pointer hover:border-orange-500 transition-colors"
                    onClick={() => onSelectExample(example.value)}
                    whileHover={{ scale: 1.01 }}
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
    onCompute: () => void
}

const HashInput = ({ input, onInputChange, onCompute }: HashInputProps) => (
    <div className="bg-white dark:bg-vscode-input-dark p-4 rounded-lg border border-vscode-border-light dark:border-vscode-border-dark">
        <div className="flex items-center gap-2 mb-4">
            <Hash className="w-4 h-4" />
            <div className="text-sm font-semibold text-vscode-text-light dark:text-vscode-text-dark">
                Custom Input
            </div>
        </div>
        <div className="space-y-3">
            <textarea
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="Enter hex value (e.g., 02a79cd900a43af6c1c6ff9e)"
                className="w-full p-3 border-2 border-vscode-input-border-light dark:border-vscode-input-border-dark rounded-lg font-mono text-sm bg-gray-50 dark:bg-black text-vscode-text-light dark:text-vscode-text-dark focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                rows={3}
            />
            <button
                onClick={onCompute}
                className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-orange-500/50 focus:outline-none"
            >
                <Code className="h-5 w-5" />
                Compute Hash
            </button>
        </div>
    </div>
)

const HashFunctions = () => {
    const [input, setInput] = useState("")
    const [selectedHash, setSelectedHash] = useState<string>("sha256")
    const [result, setResult] = useState<string>("")
    const [error, setError] = useState("")

    const selectedFunction = HASH_FUNCTIONS.find((h) => h.id === selectedHash)

    const computeHash = () => {
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
                const output = hashFunction.compute(inputBuffer)
                setResult(output)
            }
        } catch (err: any) {
            setError("Invalid hex input: " + err.message)
            setResult("")
        }
    }

    return (
        <div className="space-y-6 p-6 bg-vscode-background-light dark:bg-vscode-background-dark rounded-xl max-w-4xl mx-auto border border-vscode-border-light dark:border-vscode-border-dark shadow-sm">
            <div className="space-y-4">
                <div>
                    <h1 className="text-2xl font-bold text-vscode-text-light dark:text-vscode-text-dark mb-2">
                        Bitcoin Hash Functions
                    </h1>
                    <p className="text-vscode-text-light dark:text-vscode-text-dark opacity-80">
                        Select a hash function and enter a hex value to compute
                        its hash
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {HASH_FUNCTIONS.map((hash) => (
                            <HashFunctionCard
                                key={hash.id}
                                hash={hash}
                                isSelected={selectedHash === hash.id}
                                onSelect={setSelectedHash}
                            />
                        ))}
                    </div>

                    {selectedFunction && (
                        <ExampleInputs
                            examples={selectedFunction.exampleInputs}
                            onSelectExample={setInput}
                        />
                    )}

                    <HashInput
                        input={input}
                        onInputChange={setInput}
                        onCompute={computeHash}
                    />
                </div>

                {error && (
                    <div className="p-4 bg-vscode-error-light/20 dark:bg-vscode-error-dark/20 border border-vscode-error-light/30 dark:border-vscode-error-dark/30 rounded-lg text-vscode-error-light dark:text-vscode-error-dark">
                        {error}
                    </div>
                )}

                {result && (
                    <div className="p-4 bg-vscode-input-light dark:bg-vscode-input-dark rounded-lg border border-vscode-border-light dark:border-vscode-border-dark">
                        <div className="text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark mb-2">
                            Result
                        </div>
                        <div className="font-mono text-sm break-all text-vscode-text-light dark:text-vscode-text-dark">
                            {result}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HashFunctions
