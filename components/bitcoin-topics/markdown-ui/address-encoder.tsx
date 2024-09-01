"use client"

import React, { useState, useEffect, useCallback } from "react"
import * as bitcoin from "bitcoinjs-lib"
import bs58 from "bs58"
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid"
import { AnimatePresence, motion } from "framer-motion"

interface P2SHEncoderProps {
    initialScriptHash?: string
}

const P2SHEncoder: React.FC<P2SHEncoderProps> = ({
    initialScriptHash = ""
}) => {
    const [prefix, setPrefix] = useState<string>("05")
    const [scriptHash, setScriptHash] = useState<string>(initialScriptHash)
    const [checksum, setChecksum] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [network, setNetwork] = useState<string>("mainnet")
    const [isPrefixValid, setIsPrefixValid] = useState<boolean>(true)
    const [isAnimating, setIsAnimating] = useState<boolean>(true)

    const validatePrefix = (value: string): boolean => {
        return value === "05" || value === "c4"
    }

    const calculateChecksumAndAddress = useCallback(() => {
        try {
            if (scriptHash.length !== 40) {
                throw new Error("Script hash must be 40 characters long")
            }

            const versionByte = Buffer.from(prefix, "hex")
            const scriptHashBuffer = Buffer.from(scriptHash, "hex")

            // Concatenate version byte and script hash
            const payload = Buffer.concat([versionByte, scriptHashBuffer])

            // Double SHA256 hash
            const hash = bitcoin.crypto.hash256(payload)

            // Take the first 4 bytes of the second hash as checksum
            const checksumBuffer = hash.slice(0, 4)
            setChecksum(checksumBuffer.toString("hex"))

            // Concatenate payload and checksum
            const addressBytes = Buffer.concat([payload, checksumBuffer])

            // Encode in Base58
            const address = bs58.encode(addressBytes)
            setAddress(address)
        } catch (error) {
            console.error("Error calculating address:", error)
            setChecksum("")
            setAddress("")
        }
    }, [prefix, scriptHash])

    useEffect(() => {
        if (validatePrefix(prefix) && scriptHash.length === 40) {
            calculateChecksumAndAddress()
        } else {
            setAddress("")
        }
        setIsPrefixValid(validatePrefix(prefix))
    }, [prefix, scriptHash, calculateChecksumAndAddress])

    useEffect(() => {
        setPrefix(network === "mainnet" ? "05" : "c4")
    }, [network])

    const generateRandomScriptHash = () => {
        const randomBytes = crypto.getRandomValues(new Uint8Array(20))
        setScriptHash(Buffer.from(randomBytes).toString("hex"))
    }

    const subtleAnimation = {
        opacity: [0.5, 1, 0.5],
        transition: {
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }

    const handleGenerateRandomScriptHash = () => {
        generateRandomScriptHash()
        setIsAnimating(false)
    }

    return (
        <div className="mx-auto mb-4">
            <div className="bg-[#272E35] p-4 rounded-lg text-[#E5E6F1] font-normal">
                <div className="border border-[#454C54] rounded-lg py-6 px-6">
                    <div className="grid grid-cols-12 gap-3 mb-3">
                        <div className="col-span-2">
                            <label className="block text-xs mb-1">Prefix</label>
                            <input
                                type="text"
                                value={prefix}
                                onChange={(e) => setPrefix(e.target.value)}
                                className={`w-full bg-[#454C54] rounded px-2 py-1 text-sm ${
                                    isPrefixValid
                                        ? "border-[#454C54]"
                                        : "border-red-500"
                                } border`}
                            />
                        </div>
                        <div className="col-span-8">
                            <label className="block text-xs mb-1">
                                Script Hash
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={scriptHash}
                                    onChange={(e) =>
                                        setScriptHash(e.target.value)
                                    }
                                    className="w-full bg-[#454C54] rounded px-2 py-1 pr-10 text-sm border border-[#454C54]"
                                />
                                <AnimatePresence>
                                    {isAnimating && (
                                        <motion.button
                                            key="animating-button"
                                            onClick={
                                                handleGenerateRandomScriptHash
                                            }
                                            className="absolute right-2 top-1/2 transform -translate-y-1/3 text-orange-500 hover:text-orange-400 transition-colors duration-300"
                                            animate={subtleAnimation}
                                            exit={{ opacity: 1 }}
                                        >
                                            <ArrowsRightLeftIcon className="h-5 w-5" />
                                        </motion.button>
                                    )}
                                    {!isAnimating && (
                                        <motion.button
                                            key="static-button"
                                            onClick={
                                                handleGenerateRandomScriptHash
                                            }
                                            className="absolute right-2 top-1/2 transform -translate-y-1/3 text-orange-500 hover:text-orange-400 transition-colors duration-300"
                                            initial={{ opacity: 1 }}
                                        >
                                            <ArrowsRightLeftIcon className="h-5 w-5" />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs mb-1">
                                CheckSum
                            </label>
                            <input
                                type="text"
                                value={checksum}
                                readOnly
                                className="w-full bg-[#454C54] rounded px-2 py-1 text-sm border border-[#454C54]"
                            />
                        </div>
                    </div>

                    <div className="relative w-full my-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="40"
                            viewBox="0 0 1154 61"
                            fill="none"
                            className="m-0"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M1 1V1C1 19.9986 16.4014 35.4 35.4 35.4H549.935C562.942 35.4 574.467 43.7813 578.475 56.155L578.749 57L579.023 56.1549C583.031 43.7813 594.556 35.4 607.563 35.4H1118.6C1137.6 35.4 1153 19.9986 1153 1V1"
                                stroke="#757F8A"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <div className="mb-3 mt-3 flex justify-center">
                        <div className="inline-block px-3 py-1 text-sm border border-[#454C54] text-center">
                            Encode Base 58
                        </div>
                    </div>

                    <div className="relative w-full h-8 my-3 flex justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 55 71"
                            fill="none"
                            className="m-0"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <path
                                d="M20.5 51V1H35.5V51H51.5L28.5 69L4 51H20.5Z"
                                stroke="#757F8A"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <div className="flex justify-center">
                        <div
                            className={`w-2/3 bg-[#454C54] rounded-full px-3 py-1 text-sm ${
                                address
                                    ? "border-green-500"
                                    : "border-[#454C54]"
                            } border text-center`}
                        >
                            {address || "Address ..."}
                        </div>
                    </div>
                </div>

                <div className="flex items-center mt-3">
                    <label className="mr-2 text-sm">Network:</label>
                    <div className="relative">
                        <select
                            value={network}
                            onChange={(e) => setNetwork(e.target.value)}
                            className="bg-[#454C54] rounded px-2 py-1 pr-6 text-sm appearance-none"
                        >
                            <option value="mainnet">Mainnet</option>
                            <option value="testnet">Testnet</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default P2SHEncoder
