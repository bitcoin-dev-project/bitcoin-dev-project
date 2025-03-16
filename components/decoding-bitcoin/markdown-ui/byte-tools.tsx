"use client"
import React, { useState } from "react"

export function ByteTools() {
    const [activeTab, setActiveTab] = useState("reverse")

    return (
        <div className="bg-white dark:bg-vscode-background-dark rounded-xl max-w-4xl mx-auto border border-vscode-border-light dark:border-vscode-border-dark shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-dark-200 p-4 text-white">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    Byte Tools
                </h1>
            </div>

            <div className="p-5">
                <div className="grid grid-cols-4 gap-2 mb-6">
                    {["reverse", "endian", "base", "compact"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-2 px-3 rounded-md text-sm font-medium transition-all ${
                                activeTab === tab
                                    ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-l-4 border-orange-500"
                                    : "bg-gray-100 dark:bg-gray-800 text-vscode-text-light dark:text-vscode-text-dark hover:bg-orange-50 dark:hover:bg-orange-900/10 border-l-4 border-transparent"
                            }`}
                        >
                            {tab === "reverse" && "Reverse Bytes"}
                            {tab === "endian" && "Little Endian"}
                            {tab === "base" && "Base Converter"}
                            {tab === "compact" && "Compact Size"}
                        </button>
                    ))}
                </div>

                {activeTab === "reverse" && <ReverseBytes />}
                {activeTab === "endian" && <EndianConverter />}
                {activeTab === "base" && <BaseConverter />}
                {activeTab === "compact" && <CompactSize />}
            </div>
        </div>
    )
}

function ReverseBytes() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")

    const handleReverse = () => {
        // Remove any spaces and ensure even number of characters
        const cleanInput = input.replace(/\s+/g, "")
        if (cleanInput.length % 2 !== 0) {
            setOutput(
                "Error: Input must have an even number of characters to represent bytes"
            )
            return
        }

        // Split into bytes (2 characters each) and reverse the order
        const bytes = []
        for (let i = 0; i < cleanInput.length; i += 2) {
            bytes.push(cleanInput.substring(i, i + 2))
        }

        setOutput(bytes.reverse().join(""))
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label
                    htmlFor="reverse-input"
                    className="block text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark"
                >
                    Hex Input
                </label>
                <input
                    id="reverse-input"
                    className="w-full p-3 border border-vscode-input-border-light dark:border-vscode-input-border-dark rounded-lg font-mono text-sm bg-white dark:bg-vscode-input-dark text-vscode-text-light dark:text-vscode-text-dark focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                    placeholder="Enter hex bytes (e.g., 01020304)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <div className="text-xs text-vscode-text-light dark:text-vscode-text-dark opacity-70">
                    Input must be a valid hexadecimal string with an even number
                    of characters
                </div>
            </div>

            <button
                onClick={handleReverse}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
                Reverse Bytes
            </button>

            <div className="space-y-2">
                <label
                    htmlFor="reverse-output"
                    className="block text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark"
                >
                    Result
                </label>
                <div className="font-mono text-sm break-all bg-white dark:bg-vscode-input-dark p-3 rounded border border-vscode-border-light dark:border-vscode-border-dark text-vscode-text-light dark:text-vscode-text-dark">
                    {output || "Result will appear here"}
                </div>
            </div>
        </div>
    )
}

function EndianConverter() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [direction, setDirection] = useState("bigToLittle")

    const handleConvert = () => {
        // Remove any spaces and ensure even number of characters
        const cleanInput = input.replace(/\s+/g, "")
        if (cleanInput.length % 2 !== 0) {
            setOutput(
                "Error: Input must have an even number of characters to represent bytes"
            )
            return
        }

        // Split into bytes (2 characters each) and reverse the order
        const bytes = []
        for (let i = 0; i < cleanInput.length; i += 2) {
            bytes.push(cleanInput.substring(i, i + 2))
        }

        setOutput(bytes.reverse().join(""))
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label
                    htmlFor="endian-direction"
                    className="block text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark"
                >
                    Conversion Direction
                </label>
                <select
                    id="endian-direction"
                    className="w-full p-3 border border-vscode-input-border-light dark:border-vscode-input-border-dark rounded-lg bg-white dark:bg-vscode-input-dark text-vscode-text-light dark:text-vscode-text-dark focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                >
                    <option value="bigToLittle">
                        Big Endian to Little Endian
                    </option>
                    <option value="littleToBig">
                        Little Endian to Big Endian
                    </option>
                </select>
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="endian-input"
                    className="block text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark"
                >
                    Hex Input
                </label>
                <input
                    id="endian-input"
                    className="w-full p-3 border border-vscode-input-border-light dark:border-vscode-input-border-dark rounded-lg font-mono text-sm bg-white dark:bg-vscode-input-dark text-vscode-text-light dark:text-vscode-text-dark focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                    placeholder="Enter hex value (e.g., 01020304)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <div className="text-xs text-vscode-text-light dark:text-vscode-text-dark opacity-70">
                    Input must be a valid hexadecimal string with an even number
                    of characters
                </div>
            </div>

            <button
                onClick={handleConvert}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
                Convert
            </button>

            <div className="space-y-2">
                <label
                    htmlFor="endian-output"
                    className="block text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark"
                >
                    Result
                </label>
                <div className="font-mono text-sm break-all bg-white dark:bg-vscode-input-dark p-3 rounded border border-vscode-border-light dark:border-vscode-border-dark text-vscode-text-light dark:text-vscode-text-dark">
                    {output || "Result will appear here"}
                </div>
            </div>
        </div>
    )
}

function BaseConverter() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [fromBase, setFromBase] = useState("16")
    const [toBase, setToBase] = useState("10")

    const handleConvert = () => {
        try {
            // Parse the input in the source base
            const decimal = parseInt(input, parseInt(fromBase))

            // Check if the result is a valid number
            if (isNaN(decimal)) {
                setOutput("Error: Invalid input for the selected base")
                return
            }

            // Convert to the target base
            setOutput(decimal.toString(parseInt(toBase)))
        } catch (error) {
            setOutput("Error: Conversion failed")
        }
    }

    const bases = ["2", "8", "10", "16"]

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label
                        htmlFor="from-base"
                        className="block text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark"
                    >
                        From Base
                    </label>
                    <select
                        id="from-base"
                        className="w-full p-3 border border-vscode-input-border-light dark:border-vscode-input-border-dark rounded-lg bg-white dark:bg-vscode-input-dark text-vscode-text-light dark:text-vscode-text-dark focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                        value={fromBase}
                        onChange={(e) => setFromBase(e.target.value)}
                    >
                        {bases.map((base) => (
                            <option key={base} value={base}>
                                Base {base}{" "}
                                {base === "16"
                                    ? "(Hex)"
                                    : base === "2"
                                      ? "(Binary)"
                                      : base === "8"
                                        ? "(Octal)"
                                        : "(Decimal)"}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="to-base"
                        className="block text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark"
                    >
                        To Base
                    </label>
                    <select
                        id="to-base"
                        className="w-full p-3 border border-vscode-input-border-light dark:border-vscode-input-border-dark rounded-lg bg-white dark:bg-vscode-input-dark text-vscode-text-light dark:text-vscode-text-dark focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                        value={toBase}
                        onChange={(e) => setToBase(e.target.value)}
                    >
                        {bases.map((base) => (
                            <option key={base} value={base}>
                                Base {base}{" "}
                                {base === "16"
                                    ? "(Hex)"
                                    : base === "2"
                                      ? "(Binary)"
                                      : base === "8"
                                        ? "(Octal)"
                                        : "(Decimal)"}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="base-input"
                    className="block text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark"
                >
                    Input Value
                </label>
                <input
                    id="base-input"
                    className="w-full p-3 border border-vscode-input-border-light dark:border-vscode-input-border-dark rounded-lg font-mono text-sm bg-white dark:bg-vscode-input-dark text-vscode-text-light dark:text-vscode-text-dark focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                    placeholder={`Enter base ${fromBase} value`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>

            <button
                onClick={handleConvert}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
                Convert
            </button>

            <div className="space-y-2">
                <label
                    htmlFor="base-output"
                    className="block text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark"
                >
                    Result (Base {toBase})
                </label>
                <div className="font-mono text-sm break-all bg-white dark:bg-vscode-input-dark p-3 rounded border border-vscode-border-light dark:border-vscode-border-dark text-vscode-text-light dark:text-vscode-text-dark">
                    {output || "Result will appear here"}
                </div>
            </div>
        </div>
    )
}

function CompactSize() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [mode, setMode] = useState("encode")

    const handleProcess = () => {
        if (mode === "encode") {
            encodeCompactSize()
        } else {
            decodeCompactSize()
        }
    }

    const encodeCompactSize = () => {
        try {
            const value = parseInt(input)

            if (isNaN(value) || value < 0) {
                setOutput("Error: Please enter a valid non-negative integer")
                return
            }

            let result = ""

            if (value < 253) {
                // Direct value for 0-252
                result = value.toString(16).padStart(2, "0")
            } else if (value <= 0xffff) {
                // 2-byte value prefixed with 0xfd
                result = "fd" + value.toString(16).padStart(4, "0")
            } else if (value <= 0xffffffff) {
                // 4-byte value prefixed with 0xfe
                result = "fe" + value.toString(16).padStart(8, "0")
            } else {
                // 8-byte value prefixed with 0xff
                result = "ff" + value.toString(16).padStart(16, "0")
            }

            setOutput(result)
        } catch (error) {
            setOutput("Error: Encoding failed")
        }
    }

    const decodeCompactSize = () => {
        try {
            const hex = input.replace(/\s+/g, "").toLowerCase()

            if (!/^[0-9a-f]+$/.test(hex)) {
                setOutput("Error: Input must be a valid hex string")
                return
            }

            let value

            if (hex.startsWith("ff") && hex.length >= 18) {
                // 8-byte value
                value = BigInt("0x" + hex.substring(2, 18)).toString()
            } else if (hex.startsWith("fe") && hex.length >= 10) {
                // 4-byte value
                value = parseInt(hex.substring(2, 10), 16).toString()
            } else if (hex.startsWith("fd") && hex.length >= 6) {
                // 2-byte value
                value = parseInt(hex.substring(2, 6), 16).toString()
            } else if (hex.length >= 2) {
                // Direct value
                value = parseInt(hex.substring(0, 2), 16).toString()
            } else {
                setOutput("Error: Input too short")
                return
            }

            setOutput(value)
        } catch (error) {
            setOutput("Error: Decoding failed")
        }
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label
                    htmlFor="compact-mode"
                    className="block text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark"
                >
                    Mode
                </label>
                <select
                    id="compact-mode"
                    className="w-full p-3 border border-vscode-input-border-light dark:border-vscode-input-border-dark rounded-lg bg-white dark:bg-vscode-input-dark text-vscode-text-light dark:text-vscode-text-dark focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                >
                    <option value="encode">
                        Encode (Number to Compact Size)
                    </option>
                    <option value="decode">
                        Decode (Compact Size to Number)
                    </option>
                </select>
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="compact-input"
                    className="block text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark"
                >
                    {mode === "encode" ? "Number Input" : "Hex Input"}
                </label>
                <input
                    id="compact-input"
                    className="w-full p-3 border border-vscode-input-border-light dark:border-vscode-input-border-dark rounded-lg font-mono text-sm bg-white dark:bg-vscode-input-dark text-vscode-text-light dark:text-vscode-text-dark focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                    placeholder={
                        mode === "encode"
                            ? "Enter a number"
                            : "Enter compact size hex"
                    }
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <div className="text-xs text-vscode-text-light dark:text-vscode-text-dark opacity-70">
                    {mode === "encode"
                        ? "Enter a non-negative integer"
                        : "Enter a valid hexadecimal compact size representation"}
                </div>
            </div>

            <button
                onClick={handleProcess}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
                {mode === "encode"
                    ? "Encode to Compact Size"
                    : "Decode from Compact Size"}
            </button>

            <div className="space-y-2">
                <label
                    htmlFor="compact-output"
                    className="block text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark"
                >
                    Result
                </label>
                <div className="font-mono text-sm break-all bg-white dark:bg-vscode-input-dark p-3 rounded border border-vscode-border-light dark:border-vscode-border-dark text-vscode-text-light dark:text-vscode-text-dark">
                    {output || "Result will appear here"}
                </div>
            </div>
        </div>
    )
}
