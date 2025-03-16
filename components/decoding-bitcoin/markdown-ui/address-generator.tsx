"use client"
import { useState, useCallback, useEffect } from "react"
import * as bitcoin from "bitcoinjs-lib"
import clsx from "clsx"
import { Copy, Check, RefreshCw, Hash, Info, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import bs58 from "bs58"

// Define network types
const NETWORKS = {
    mainnet: bitcoin.networks.bitcoin,
    testnet: bitcoin.networks.testnet
}

// Define address types with their inputs
const ADDRESS_TYPES = [
    {
        id: "p2pkh",
        name: "P2PKH",
        description:
            "Pay to Public Key Hash - Original Bitcoin address format starting with '1'",
        prefix: "1",
        encoding: "base58check",
        prefixHex: "00",
        testnetPrefixHex: "6f",
        input: "Public Key Hash",
        bitcoinUsage: [
            "Standard address format until 2017",
            "Original wallet addresses",
            "Compatible with all Bitcoin wallets and services"
        ]
    },
    {
        id: "p2sh",
        name: "P2SH",
        description: "Pay to Script Hash - Compatible format starting with '3'",
        prefix: "3",
        encoding: "base58check",
        prefixHex: "05",
        testnetPrefixHex: "c4",
        input: "Script Hash",
        bitcoinUsage: [
            "Multi-signature wallets",
            "SegWit compatibility layer (P2SH-wrapped SegWit)",
            "Complex spending conditions"
        ]
    },
    {
        id: "p2wpkh",
        name: "P2WPKH",
        description:
            "Pay to Witness Public Key Hash - SegWit format starting with 'bc1q'",
        prefix: "bc1q",
        encoding: "bech32",
        prefixHex: "bc1",
        testnetPrefixHex: "tb1",
        input: "Witness Program",
        bitcoinUsage: [
            "Native SegWit single-sig addresses",
            "Lower transaction fees",
            "Better scaling for the Bitcoin network"
        ]
    },
    {
        id: "p2wsh",
        name: "P2WSH",
        description:
            "Pay to Witness Script Hash - SegWit format for scripts starting with 'bc1q'",
        prefix: "bc1q",
        encoding: "bech32",
        prefixHex: "bc1",
        testnetPrefixHex: "tb1",
        input: "Witness Program",
        bitcoinUsage: [
            "Native SegWit multi-sig addresses",
            "Complex SegWit scripts",
            "More efficient script execution"
        ]
    },
    {
        id: "p2tr",
        name: "P2TR",
        description:
            "Pay to Taproot - Latest address format with advanced features starting with 'bc1p'",
        prefix: "bc1p",
        encoding: "bech32m",
        prefixHex: "bc1",
        testnetPrefixHex: "tb1",
        input: "Taproot Output Key",
        bitcoinUsage: [
            "Enhanced privacy for complex contracts",
            "Key and script path spending",
            "Schnorr signatures"
        ]
    }
]

// Example inputs for different address types
const EXAMPLE_INPUTS = {
    p2pkh: [
        {
            value: "751e76e8199196d454941c45d1b3a323f1433bd6",
            description: "Public Key Hash example"
        },
        {
            value: "91b24bf9f5288532960ac687abb035127b1d28a5",
            description: "BTC Core's example"
        }
    ],
    p2sh: [
        {
            value: "9ded082e689c0d409cae7e414983a1fc528fd61f",
            description: "Script Hash example"
        },
        {
            value: "f815b036d9bbbce5e9f2a00abd1bf3dc91e95510",
            description: "Multi-sig script hash"
        }
    ],
    p2wpkh: [
        {
            value: "751e76e8199196d454941c45d1b3a323f1433bd6",
            description: "Witness program example"
        },
        {
            value: "1863143c14c5166804bd19203356da136c985678",
            description: "SegWit pubkey hash"
        }
    ],
    p2wsh: [
        {
            value: "1863143c14c5166804bd19203356da136c985678cd556306c91a03ba99ba90c6a",
            description: "Witness script hash"
        },
        {
            value: "ff25429251b5a84f452230a3c75fd886b7fc5a7865ce4a7bb7a9d7c5be6da3db",
            description: "Complex script hash"
        }
    ],
    p2tr: [
        {
            value: "cc8a4bc64d897bddc5fbc2f670f7a8ba0b386779106cf1223c6fc5d7cd6fc115",
            description: "Taproot output key"
        },
        {
            value: "a60869f0dbcf1dc659c9cecbaf8050135ea9e8cdc487053f1dc6880949dc684c",
            description: "P2TR example"
        }
    ]
}

// Add near top of file
type AddressType = "p2pkh" | "p2sh" | "p2wpkh" | "p2wsh" | "p2tr"

const AddressGenerator = () => {
    const [addressType, setAddressType] = useState<AddressType>("p2pkh")
    const [network, setNetwork] = useState<"mainnet" | "testnet">("mainnet")
    const [inputData, setInputData] = useState<string>("")
    const [prefix, setPrefix] = useState<string>("00")
    const [witnessVersion, setWitnessVersion] = useState<string>("0")
    const [generatedAddress, setGeneratedAddress] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [copied, setCopied] = useState<boolean>(false)
    const [showInfo, setShowInfo] = useState<boolean>(false)
    const [checksum, setChecksum] = useState<string>("")

    // Get current address type information
    const selectedAddressType = ADDRESS_TYPES.find((t) => t.id === addressType)

    // Determine if current address type uses bech32
    const isSegwitAddress = useCallback(() => {
        return (
            selectedAddressType?.encoding === "bech32" ||
            selectedAddressType?.encoding === "bech32m"
        )
    }, [selectedAddressType])

    // Update prefix based on address type and network
    useEffect(() => {
        const addressTypeInfo = ADDRESS_TYPES.find((t) => t.id === addressType)
        if (addressTypeInfo) {
            setPrefix(
                network === "mainnet"
                    ? addressTypeInfo.prefixHex
                    : addressTypeInfo.testnetPrefixHex
            )
        }
    }, [addressType, network])

    // Generate random input data based on the address type
    const generateRandomInputData = useCallback(() => {
        try {
            // Different address types require different input data lengths
            let length = 20 // Default for P2PKH and P2WPKH
            if (addressType === "p2wsh" || addressType === "p2tr") {
                length = 32 // P2WSH and P2TR use 32-byte hashes
            }

            // Generate random bytes and convert to hex
            const randomBytes = crypto.getRandomValues(new Uint8Array(length))
            const randomHex = Array.from(randomBytes)
                .map((b) => b.toString(16).padStart(2, "0"))
                .join("")

            setInputData(randomHex)
        } catch (err) {
            setError("Failed to generate random data")
            console.error(err)
        }
    }, [addressType])

    // Generate Bitcoin address
    const generateAddress = useCallback(() => {
        try {
            setError("")

            // Validate input
            if (!inputData || inputData.length === 0) {
                setError("Please enter input data")
                return
            }

            // Validate hex format
            if (!/^[0-9a-fA-F]+$/.test(inputData)) {
                setError("Input must be in hexadecimal format")
                return
            }

            let result = ""
            const inputBuffer = Buffer.from(inputData, "hex")

            // Generate based on address type
            if (addressType === "p2pkh") {
                // Create P2PKH address
                const p2pkh = bitcoin.payments.p2pkh({
                    hash: inputBuffer,
                    network: NETWORKS[network]
                })
                result = p2pkh.address || ""
            } else if (addressType === "p2sh") {
                // Create P2SH address
                const p2sh = bitcoin.payments.p2sh({
                    hash: inputBuffer,
                    network: NETWORKS[network]
                })
                result = p2sh.address || ""
            } else if (addressType === "p2wpkh") {
                // Create P2WPKH address
                const p2wpkh = bitcoin.payments.p2wpkh({
                    hash: inputBuffer,
                    network: NETWORKS[network]
                })
                result = p2wpkh.address || ""
            } else if (addressType === "p2wsh") {
                // Create P2WSH address
                const p2wsh = bitcoin.payments.p2wsh({
                    hash: inputBuffer,
                    network: NETWORKS[network]
                })
                result = p2wsh.address || ""
            } else if (addressType === "p2tr") {
                // Create P2TR address
                const p2tr = bitcoin.payments.p2tr({
                    internalPubkey: inputBuffer,
                    network: NETWORKS[network]
                })
                result = p2tr.address || ""
            }

            setGeneratedAddress(result)

            // Calculate and display checksum for base58 addresses
            if (addressType === "p2pkh" || addressType === "p2sh") {
                const prefixByte = Buffer.from(prefix, "hex")
                const dataWithPrefix = Buffer.concat([prefixByte, inputBuffer])
                const hash = bitcoin.crypto.hash256(dataWithPrefix)
                const checksumBytes = hash.slice(0, 4)
                setChecksum(checksumBytes.toString("hex"))
            }
        } catch (err) {
            setError(
                "Failed to generate address: " +
                    (err instanceof Error ? err.message : String(err))
            )
            console.error(err)
        }
    }, [addressType, inputData, network, prefix])

    // Generate address when inputs change
    useEffect(() => {
        if (inputData) {
            generateAddress()
        }
    }, [inputData, addressType, network, prefix, generateAddress])

    // Handle copy to clipboard
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="bg-white dark:bg-vscode-background-dark rounded-xl max-w-4xl mx-auto border border-vscode-border-light dark:border-vscode-border-dark shadow-lg overflow-hidden">
            {/* Simplified Header with Network Toggle */}
            <div className="bg-gradient-to-r from-orange-500 to-dark-200 p-3 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    <span className="text-lg font-bold py-2">
                        Bitcoin Address Generator
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() =>
                            setNetwork(
                                network === "mainnet" ? "testnet" : "mainnet"
                            )
                        }
                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                            network === "mainnet"
                                ? "bg-orange-600 text-white"
                                : "bg-purple-600 text-white"
                        }`}
                    >
                        {network === "mainnet" ? "Mainnet" : "Testnet"}
                    </button>
                    <button
                        onClick={() => setShowInfo(!showInfo)}
                        className="text-white/80 hover:text-white transition-colors"
                    >
                        <Info className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Simplified Information Panel */}
            <AnimatePresence>
                {showInfo && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-2 bg-gray-50 dark:bg-gray-800/50 border-b border-vscode-border-light dark:border-vscode-border-dark">
                            <h3 className="font-medium text-vscode-text-light dark:text-vscode-text-dark text-sm">
                                {selectedAddressType?.name} -{" "}
                                {selectedAddressType?.description}
                            </h3>
                            <div className="mt-1 text-xs text-vscode-text-light dark:text-vscode-text-dark opacity-80">
                                <div className="flex flex-wrap gap-x-4 gap-y-1">
                                    {selectedAddressType?.bitcoinUsage.map(
                                        (usage, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start gap-1"
                                            >
                                                <span>•</span>
                                                <span>{usage}</span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main content */}
            <div className="p-4">
                {/* Address Type Selection - Bigger and more prominent with full abbreviation */}
                <div className="mb-5">
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                        {ADDRESS_TYPES.map((type) => (
                            <button
                                key={type.id}
                                onClick={() =>
                                    setAddressType(type.id as AddressType)
                                }
                                className={clsx(
                                    "py-2 px-3 text-center rounded-md text-sm font-medium transition-colors flex flex-col items-center justify-center h-16",
                                    addressType === type.id
                                        ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-b-2 border-orange-500 shadow-sm"
                                        : "bg-gray-100 dark:bg-gray-800 text-vscode-text-light dark:text-vscode-text-dark hover:bg-orange-50 dark:hover:bg-orange-900/10"
                                )}
                            >
                                <span className="font-bold">{type.name}</span>
                                <span className="text-xs mt-1 opacity-70 line-clamp-1">
                                    {type.description.split("-")[0].trim()}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Improved Input with Examples */}
                <div className="mb-5">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark">
                            {selectedAddressType?.input || "Input Data"}
                        </label>
                        <div className="flex items-center gap-2">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Examples:
                            </div>
                            {EXAMPLE_INPUTS[addressType as AddressType]?.map(
                                (example, i) => (
                                    <button
                                        key={i}
                                        onClick={() =>
                                            setInputData(example.value)
                                        }
                                        className="text-sm py-1 px-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-orange-50 dark:hover:bg-orange-900/10"
                                        title={example.description}
                                    >
                                        {i + 1}
                                    </button>
                                )
                            )}
                            <button
                                onClick={generateRandomInputData}
                                className="text-sm py-1 px-2 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-300 rounded-md border border-orange-200 dark:border-orange-800 hover:bg-orange-200 dark:hover:bg-orange-900/30 flex items-center gap-1"
                                title="Generate random data"
                            >
                                <RefreshCw className="w-3.5 h-3.5" />
                                <span>Random</span>
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                            placeholder={`Enter ${selectedAddressType?.input || "data"}...`}
                            className="w-full bg-white dark:bg-gray-800 rounded-md px-3 py-2.5 text-sm border border-gray-200 dark:border-gray-700"
                        />
                    </div>
                </div>

                {/* PRESERVED: Section Title with encoding type badge */}
                <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xs font-medium text-vscode-text-light dark:text-vscode-text-dark">
                        {isSegwitAddress()
                            ? "Bech32 Components"
                            : "Base58Check Components"}
                    </h3>
                    <span className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full">
                        {isSegwitAddress()
                            ? addressType === "p2tr"
                                ? "Bech32m Encoding"
                                : "Bech32 Encoding"
                            : "Base58 Encoding"}
                    </span>
                </div>

                {/* PRESERVED: Encoding Components - but slightly simplified */}
                <div className="mb-4">
                    {!isSegwitAddress() ? (
                        // Base58Check components - simplified
                        <div className="grid grid-cols-12 gap-2 bg-gray-50 dark:bg-gray-800/40 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="col-span-2">
                                <label className="block text-xs mb-1 text-gray-500 dark:text-gray-400">
                                    Prefix
                                </label>
                                <input
                                    type="text"
                                    value={prefix}
                                    onChange={(e) => setPrefix(e.target.value)}
                                    className="w-full bg-white dark:bg-gray-800 rounded px-2 py-1 text-xs border border-gray-200 dark:border-gray-700"
                                />
                            </div>
                            <div className="col-span-8">
                                <label className="block text-xs mb-1 text-gray-500 dark:text-gray-400">
                                    {selectedAddressType?.input || "Input"}
                                </label>
                                <input
                                    type="text"
                                    value={inputData}
                                    onChange={(e) =>
                                        setInputData(e.target.value)
                                    }
                                    className="w-full bg-white dark:bg-gray-800 rounded px-2 py-1 text-xs border border-gray-200 dark:border-gray-700"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs mb-1 text-gray-500 dark:text-gray-400">
                                    CheckSum
                                </label>
                                <input
                                    type="text"
                                    value={checksum || "auto"}
                                    readOnly
                                    className="w-full bg-white dark:bg-gray-800 rounded px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 opacity-75"
                                />
                            </div>
                        </div>
                    ) : (
                        // Bech32 components - simplified
                        <div className="grid grid-cols-12 gap-2 bg-gray-50 dark:bg-gray-800/40 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="col-span-2">
                                <label className="block text-xs mb-1 text-gray-500 dark:text-gray-400">
                                    HRP
                                </label>
                                <input
                                    type="text"
                                    value={network === "mainnet" ? "bc" : "tb"}
                                    readOnly
                                    className="w-full bg-white dark:bg-gray-800 rounded px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 opacity-75"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs mb-1 text-gray-500 dark:text-gray-400">
                                    Version
                                </label>
                                <input
                                    type="text"
                                    value={
                                        addressType === "p2tr"
                                            ? "1"
                                            : witnessVersion
                                    }
                                    onChange={(e) =>
                                        addressType !== "p2tr" &&
                                        setWitnessVersion(e.target.value)
                                    }
                                    readOnly={addressType === "p2tr"}
                                    className="w-full bg-white dark:bg-gray-800 rounded px-2 py-1 text-xs border border-gray-200 dark:border-gray-700"
                                />
                            </div>
                            <div className="col-span-6">
                                <label className="block text-xs mb-1 text-gray-500 dark:text-gray-400">
                                    {selectedAddressType?.input ||
                                        "Witness Program"}
                                </label>
                                <input
                                    type="text"
                                    value={inputData}
                                    onChange={(e) =>
                                        setInputData(e.target.value)
                                    }
                                    className="w-full bg-white dark:bg-gray-800 rounded px-2 py-1 text-xs border border-gray-200 dark:border-gray-700"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs mb-1 text-gray-500 dark:text-gray-400">
                                    CheckSum
                                </label>
                                <input
                                    type="text"
                                    value="auto"
                                    readOnly
                                    className="w-full bg-white dark:bg-gray-800 rounded px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 opacity-75"
                                />
                            </div>
                        </div>
                    )}

                    {/* PRESERVED: Accolade visualization */}
                    <div className="relative w-full my-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="30"
                            viewBox="0 0 1154 61"
                            fill="none"
                            className="m-0"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M1 1V1C1 19.9986 16.4014 35.4 35.4 35.4H549.935C562.942 35.4 574.467 43.7813 578.475 56.155L578.749 57L579.023 56.1549C583.031 43.7813 594.556 35.4 607.563 35.4H1118.6C1137.6 35.4 1153 19.9986 1153 1V1"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                className="text-gray-400 dark:text-gray-600"
                            />
                        </svg>
                    </div>

                    {/* PRESERVED: Encode Button - but simplified */}
                    <div className="flex justify-center mb-3">
                        <div className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                            {isSegwitAddress()
                                ? addressType === "p2tr"
                                    ? "Encode Bech32m"
                                    : "Encode Bech32"
                                : "Encode Base58"}
                        </div>
                    </div>

                    {/* PRESERVED: Arrow - but simplified */}
                    <div className="flex justify-center mb-3">
                        <div className="p-0.5 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                            <svg
                                className="w-4 h-4 text-orange-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Error Display - Simplified */}
                {error && (
                    <div className="mb-3 p-1.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-400 text-xs flex items-center gap-1">
                        <svg
                            className="w-3 h-3 flex-shrink-0"
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

                {/* Generated Address - Simplified */}
                <div className="relative">
                    <div
                        className={`w-full px-3 py-2 text-center break-all border rounded ${
                            generatedAddress
                                ? "bg-green-50 dark:bg-green-900/10 border-green-300 dark:border-green-700"
                                : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        }`}
                    >
                        <div className="flex items-center justify-center text-sm font-mono">
                            {generatedAddress || "Address will appear here..."}
                        </div>
                        {generatedAddress && (
                            <button
                                onClick={() =>
                                    copyToClipboard(generatedAddress)
                                }
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-1 rounded border border-gray-200 dark:border-gray-700 text-orange-500 hover:text-orange-600 transition-colors"
                                title="Copy to clipboard"
                            >
                                {copied ? (
                                    <Check className="w-3 h-3 text-green-500" />
                                ) : (
                                    <Copy className="w-3 h-3" />
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressGenerator
