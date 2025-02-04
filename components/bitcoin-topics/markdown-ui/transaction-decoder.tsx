"use client"
import { useState } from "react"
import * as bitcoin from "bitcoinjs-lib"

interface PrevOutput {
    value: number
    address: string
    scriptPubKey: any
}

interface PrevTransactions {
    [txid: string]: PrevOutput[]
}

interface DecodedTx {
    txid: string
    version: number
    locktime: number
    size: number
    vsize: number
    inputs: {
        txid: string
        vout: number
        scriptSig: { asm: string; hex: string }
        sequence: number
        witness: string[]
        previousOutput: PrevOutput | null
    }[]
    outputs: {
        value: number
        scriptPubKey: { asm: string; hex: string; type: string }
        address: string
    }[]
}

interface AddressBadgeProps {
    address: string
    type?: string | null
}

const TransactionDecoder = ({
    previousTransactions = {} as PrevTransactions
}) => {
    const [hex, setHex] = useState("")
    const [decodedTx, setDecodedTx] = useState<DecodedTx | null>(null)
    const [error, setError] = useState("")

    const decodeTransaction = () => {
        try {
            setError("")
            const tx = bitcoin.Transaction.fromHex(hex)

            const decoded = {
                txid: tx.getId(),
                version: tx.version,
                locktime: tx.locktime,
                size: hex.length / 2,
                vsize: Math.ceil(tx.virtualSize()),
                inputs: tx.ins.map((input) => {
                    const prevTxid = input.hash.reverse().toString("hex")
                    const prevData =
                        previousTransactions[prevTxid]?.[input.index] || null

                    return {
                        txid: prevTxid,
                        vout: input.index,
                        scriptSig: {
                            asm: bitcoin.script.toASM(input.script),
                            hex: input.script.toString("hex")
                        },
                        sequence: input.sequence,
                        witness: input.witness.map((w) => w.toString("hex")),
                        previousOutput: prevData
                            ? {
                                  value: prevData.value,
                                  address: prevData.address,
                                  scriptPubKey: prevData.scriptPubKey
                              }
                            : null
                    }
                }),
                outputs: tx.outs.map((output, i) => {
                    let address = "Unknown"
                    let scriptType = "Unknown"

                    try {
                        // Try to decode the script
                        const chunks = bitcoin.script.decompile(output.script)

                        if (chunks) {
                            // Handle P2TR (Taproot) scripts
                            if (
                                chunks.length === 2 &&
                                chunks[0] === bitcoin.opcodes.OP_1
                            ) {
                                scriptType = "V1_P2TR"
                                try {
                                    // Check if chunks[1] is a Buffer before converting
                                    if (Buffer.isBuffer(chunks[1])) {
                                        address = bitcoin.address.toBech32(
                                            chunks[1],
                                            1, // Witness version 1
                                            bitcoin.networks.bitcoin.bech32
                                        )
                                    }
                                } catch (e) {
                                    console.error(
                                        "P2TR address conversion failed:",
                                        e
                                    )
                                }
                            } else {
                                // Try standard address conversion for other types
                                try {
                                    address = bitcoin.address.fromOutputScript(
                                        output.script
                                    )

                                    // Detect script type from the script structure
                                    if (
                                        chunks.length === 5 &&
                                        chunks[0] === bitcoin.opcodes.OP_DUP
                                    ) {
                                        scriptType = "P2PKH"
                                    } else if (
                                        chunks.length === 3 &&
                                        chunks[0] === bitcoin.opcodes.OP_HASH160
                                    ) {
                                        scriptType = "P2SH"
                                    } else if (
                                        chunks.length === 2 &&
                                        chunks[0] === bitcoin.opcodes.OP_0
                                    ) {
                                        // Check if chunks[1] is a Buffer before accessing length
                                        if (Buffer.isBuffer(chunks[1])) {
                                            if (chunks[1].length === 20) {
                                                scriptType = "V0_P2WPKH"
                                            } else if (
                                                chunks[1].length === 32
                                            ) {
                                                scriptType = "V0_P2WSH"
                                            }
                                        }
                                    }
                                } catch (e) {
                                    console.error(
                                        "Standard address conversion failed:",
                                        e
                                    )
                                }
                            }
                        }
                    } catch (e) {
                        console.error("Script decoding failed:", e)
                    }

                    return {
                        value: output.value,
                        scriptPubKey: {
                            asm: bitcoin.script.toASM(output.script),
                            hex: output.script.toString("hex"),
                            type: scriptType
                        },
                        address: address
                    }
                })
            }

            setDecodedTx(decoded)
        } catch (err: any) {
            setError("Invalid transaction hex: " + err.message)
            setDecodedTx(null)
        }
    }

    const AddressBadge = ({ address, type = null }: AddressBadgeProps) => {
        let addressType = type || "Unknown"
        let color = "bg-gray-100 text-gray-800"

        // Detect type from address prefix if not explicitly provided
        if (!type) {
            if (address.startsWith("1")) {
                addressType = "P2PKH"
                color = "bg-orange-100 text-orange-800"
            } else if (address.startsWith("3")) {
                addressType = "P2SH"
                color = "bg-blue-100 text-blue-800"
            } else if (address.startsWith("bc1q")) {
                addressType = "P2WPKH"
                color = "bg-purple-100 text-purple-800"
            } else if (address.startsWith("bc1p")) {
                addressType = "P2TR"
                color = "bg-pink-100 text-pink-800"
            } else if (address.startsWith("bc1")) {
                addressType = "P2WSH"
                color = "bg-indigo-100 text-indigo-800"
            }
        }

        // Override colors based on specific types
        switch (type) {
            case "V0_P2WPKH":
                addressType = "P2WPKH"
                color = "bg-purple-100 text-purple-800"
                break
            case "V0_P2WSH":
                addressType = "P2WSH"
                color = "bg-indigo-100 text-indigo-800"
                break
            case "V1_P2TR":
                addressType = "P2TR"
                color = "bg-pink-100 text-pink-800"
                break
        }

        return (
            <span
                className={`ml-2 px-2 py-1 text-xs rounded font-medium ${color}`}
            >
                {addressType}
            </span>
        )
    }

    return (
        <div className="space-y-6 p-6 bg-vscode-background-light dark:bg-vscode-background-dark rounded-xl max-w-4xl mx-auto border border-vscode-border-light dark:border-vscode-border-dark shadow-sm">
            {" "}
            <div className="space-y-4">
                <div>
                    <h1 className="text-2xl font-bold text-vscode-text-light dark:text-vscode-text-dark mb-2">
                        Bitcoin Transaction Decoder
                    </h1>
                    <p className="text-vscode-text-light dark:text-vscode-text-dark opacity-80">
                        Paste a raw transaction hex to visualize its structure
                        and components
                    </p>
                </div>

                <div className="space-y-2">
                    <textarea
                        value={hex}
                        onChange={(e) => setHex(e.target.value)}
                        placeholder="Example: 0100000001..."
                        className="w-full p-3 border-2 border-vscode-input-border-light dark:border-vscode-input-border-dark rounded-lg font-mono text-sm bg-vscode-input-light dark:bg-vscode-input-dark text-vscode-text-light dark:text-vscode-text-dark focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                        rows={5}
                    />
                    <button
                        onClick={decodeTransaction}
                        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-orange-500/50 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 2a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V2zm2 0v12h8V2H6z"
                            />
                            <path
                                fillRule="evenodd"
                                d="M10 14a1 1 0 100-2 1 1 0 000 2z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Decode Transaction
                    </button>
                </div>

                {error && (
                    <div className="p-4 bg-vscode-error-light/20 dark:bg-vscode-error-dark/20 border border-vscode-error-light/30 dark:border-vscode-error-dark/30 rounded-lg text-vscode-error-light dark:text-vscode-error-dark flex items-center gap-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-vscode-error-light dark:text-vscode-error-dark"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        {error}
                    </div>
                )}

                {decodedTx && (
                    <div className="space-y-8">
                        <div className="bg-vscode-input-light dark:bg-vscode-input-dark p-6 rounded-xl shadow-sm border border-vscode-border-light dark:border-vscode-border-dark">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-vscode-text-light dark:text-vscode-text-dark">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-blue-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                Transaction Overview
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="p-3 bg-vscode-input-light dark:bg-vscode-input-dark rounded-lg border border-vscode-border-light dark:border-vscode-border-dark">
                                    <div className="text-sm text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                                        Total Size
                                    </div>
                                    <div className="font-mono text-lg text-vscode-text-light dark:text-vscode-text-dark">
                                        {decodedTx.size} bytes
                                        <span className="ml-2 text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark text-sm">
                                            ({decodedTx.vsize} vbytes)
                                        </span>
                                    </div>
                                </div>

                                <div className="p-3 bg-vscode-input-light dark:bg-vscode-input-dark rounded-lg border border-vscode-border-light dark:border-vscode-border-dark">
                                    <div className="text-sm text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                                        Inputs
                                    </div>
                                    <div className="text-lg font-semibold text-vscode-error-light dark:text-vscode-error-dark">
                                        {decodedTx.inputs.length}
                                    </div>
                                </div>

                                <div className="p-3 bg-vscode-input-light dark:bg-vscode-input-dark rounded-lg border border-vscode-border-light dark:border-vscode-border-dark">
                                    <div className="text-sm text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                                        Outputs
                                    </div>
                                    <div className="text-lg font-semibold text-vscode-success-light dark:text-vscode-success-dark">
                                        {decodedTx.outputs.length}
                                    </div>
                                </div>

                                <div className="p-3 bg-vscode-input-light dark:bg-vscode-input-dark rounded-lg border border-vscode-border-light dark:border-vscode-border-dark">
                                    <div className="text-sm text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                                        Locktime
                                    </div>
                                    <div className="font-mono text-lg text-vscode-text-light dark:text-vscode-text-dark">
                                        {decodedTx.locktime}
                                        <span className="ml-2 text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark text-sm">
                                            Block Height
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-4 text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                            <div className="flex-1 border-t-2 border-dashed border-vscode-border-light dark:border-vscode-border-dark"></div>
                            <span className="text-sm">Transforms</span>
                            <div className="flex-1 border-t-2 border-dashed border-vscode-border-light dark:border-vscode-border-dark"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-vscode-error-light/20 dark:bg-vscode-error-dark/20 p-6 rounded-xl border border-vscode-error-light/30 dark:border-vscode-error-dark/30">
                                <h3 className="text-lg font-semibold mb-4 text-vscode-error-light dark:text-vscode-error-dark flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Inputs (Sources)
                                </h3>

                                {decodedTx.inputs.map((input, i) => (
                                    <div
                                        key={i}
                                        className="mb-4 last:mb-0 bg-vscode-input-light dark:bg-vscode-input-dark p-4 rounded-lg border border-vscode-error-light/30 dark:border-vscode-error-dark/30"
                                    >
                                        <div className="text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark mb-2">
                                            Input #{i + 1}
                                        </div>

                                        <div className="space-y-2">
                                            <div>
                                                <label className="text-xs text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                                                    Previous Transaction
                                                </label>
                                                <a
                                                    href={`https://mempool.space/tx/${input.txid}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-mono text-sm break-all text-vscode-link-light dark:text-vscode-link-dark hover:text-vscode-link-active-light dark:hover:text-vscode-link-active-dark hover:underline"
                                                >
                                                    {input.txid}
                                                </a>
                                            </div>

                                            {input.previousOutput ? (
                                                <>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div>
                                                            <label className="text-xs text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                                                                Value
                                                            </label>
                                                            <div className="font-mono">
                                                                {(
                                                                    input
                                                                        .previousOutput
                                                                        .value /
                                                                    1e8
                                                                ).toFixed(
                                                                    8
                                                                )}{" "}
                                                                BTC
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="text-xs text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                                                                Address
                                                            </label>
                                                            <div className="flex items-center">
                                                                <div className="font-mono text-sm break-all">
                                                                    {
                                                                        input
                                                                            .previousOutput
                                                                            .address
                                                                    }
                                                                </div>
                                                                <AddressBadge
                                                                    address={
                                                                        input
                                                                            .previousOutput
                                                                            .address
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                                                            ScriptPubKey
                                                        </label>
                                                        <div className="font-mono text-xs break-all text-vscode-text-light dark:text-vscode-text-dark">
                                                            {
                                                                input
                                                                    .previousOutput
                                                                    .scriptPubKey
                                                                    .asm
                                                            }
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="p-2 bg-vscode-error-light/20 text-vscode-error-light dark:text-vscode-error-dark rounded text-sm">
                                                    ⓘ Previous transaction data
                                                    not provided
                                                </div>
                                            )}

                                            <div className="pt-2">
                                                <details>
                                                    <summary className="text-xs text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark cursor-pointer hover:text-vscode-link-active-light dark:hover:text-vscode-link-active-dark">
                                                        Show Input Script
                                                        Details
                                                    </summary>
                                                    <div className="mt-1 space-y-2 p-2 bg-vscode-input-light dark:bg-vscode-input-dark rounded">
                                                        <div>
                                                            <div className="text-xs text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                                                                ScriptSig (ASM)
                                                            </div>
                                                            <div className="font-mono text-xs break-all text-vscode-text-light dark:text-vscode-text-dark">
                                                                {
                                                                    input
                                                                        .scriptSig
                                                                        .asm
                                                                }
                                                            </div>
                                                        </div>

                                                        {input.witness &&
                                                            input.witness
                                                                .length > 0 && (
                                                                <div>
                                                                    <div className="text-xs text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                                                                        Witness
                                                                        Data
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        {input.witness.map(
                                                                            (
                                                                                item,
                                                                                index
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    className="font-mono text-xs break-all text-vscode-text-light dark:text-vscode-text-dark"
                                                                                >
                                                                                    {index +
                                                                                        1}

                                                                                    :{" "}
                                                                                    {
                                                                                        item
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                    </div>
                                                </details>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-vscode-success-light/20 dark:bg-vscode-success-dark/20 p-6 rounded-xl border border-vscode-success-light/30 dark:border-vscode-success-dark/30">
                                <h3 className="text-lg font-semibold mb-4 text-vscode-success-light dark:text-vscode-success-dark flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Outputs (Destinations)
                                </h3>

                                {decodedTx.outputs.map((output, i) => (
                                    <div
                                        key={i}
                                        className="mb-4 last:mb-0 bg-vscode-input-light dark:bg-vscode-input-dark p-4 rounded-lg border border-vscode-success-light/30 dark:border-vscode-success-dark/30"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="text-sm font-medium text-vscode-text-light dark:text-vscode-text-dark">
                                                Output #{i + 1}
                                            </div>
                                            <div className="text-lg font-semibold text-vscode-success-light dark:text-vscode-success-dark">
                                                {(output.value / 1e8).toFixed(
                                                    8
                                                )}{" "}
                                                BTC
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div>
                                                <label className="text-xs text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                                                    Destination Address
                                                </label>
                                                <div className="flex items-center">
                                                    <div className="font-mono text-sm break-all text-vscode-text-light dark:text-vscode-text-dark">
                                                        {output.address}
                                                    </div>
                                                    <AddressBadge
                                                        address={output.address}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-xs text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                                                    Script Type
                                                </label>
                                                <div className="font-mono text-sm break-all">
                                                    {output.scriptPubKey.asm}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-vscode-input-light dark:bg-vscode-input-dark p-6 rounded-xl shadow-sm border border-vscode-border-light dark:border-vscode-border-dark">
                            <h2 className="text-xl font-semibold mb-4 text-vscode-text-light dark:text-vscode-text-dark">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-purple-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                                Technical Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3 bg-vscode-input-light dark:bg-vscode-input-dark rounded-lg border border-vscode-border-light dark:border-vscode-border-dark">
                                    <div className="text-sm text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                                        Transaction Version
                                    </div>
                                    <div className="font-mono text-vscode-text-light dark:text-vscode-text-dark">
                                        {decodedTx.version}
                                        <span className="ml-2 text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                                            (0x{decodedTx.version.toString(16)})
                                        </span>
                                    </div>
                                </div>

                                <div className="p-3 bg-vscode-input-light dark:bg-vscode-input-dark rounded-lg border border-vscode-border-light dark:border-vscode-border-dark">
                                    <div className="text-sm text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                                        Transaction ID
                                    </div>
                                    <a
                                        href={`https://mempool.space/tx/${decodedTx.txid}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-mono text-sm break-all text-vscode-link-light dark:text-vscode-link-dark hover:text-vscode-link-active-light dark:hover:text-vscode-link-active-dark hover:underline"
                                    >
                                        {decodedTx.txid}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TransactionDecoder
