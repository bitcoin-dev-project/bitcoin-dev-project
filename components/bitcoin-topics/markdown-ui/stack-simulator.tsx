"use client"

import { useState, useEffect } from "react"
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import * as bitcoin from "bitcoinjs-lib"
import bs58 from "bs58"
import crypto from "crypto"
import { ec as EC } from "elliptic"

const ec = new EC("secp256k1")

type StackItem = string | number | boolean | bigint | Buffer

interface Opcode {
    name: string
    execute: (stack: StackItem[]) => StackItem[]
}

const sha256 = (data: Buffer): Buffer => {
    return crypto.createHash("sha256").update(data).digest()
}

const ripemd160 = (data: Buffer): Buffer => {
    return crypto.createHash("ripemd160").update(data).digest()
}

const hash160 = (data: Buffer): Buffer => {
    return ripemd160(sha256(data))
}
const opcodes: Opcode[] = [
    {
        name: "OP_ADD",
        execute: (stack) => {
            if (stack.length < 2) return [...stack, "Error: Insufficient items"]
            const [b, a] = [stack.pop(), stack.pop()] as [StackItem, StackItem]
            if (typeof a === "bigint" && typeof b === "bigint") {
                return [...stack, a + b]
            }
            return [...stack, "Error: Non-numeric values"]
        }
    },
    {
        name: "OP_EQUAL",
        execute: (stack) => {
            if (stack.length < 2) return [...stack, "Error: Insufficient items"]
            const [b, a] = [stack.pop(), stack.pop()] as [StackItem, StackItem]
            return [...stack, a === b]
        }
    },
    {
        name: "OP_VERIFY",
        execute: (stack) => {
            if (stack.length < 1) return [...stack, "Error: Insufficient items"]
            const a = stack.pop()
            if (a === true || a === BigInt(1)) return stack
            return [...stack, "Error: Verification failed"]
        }
    },
    {
        name: "OP_DUP",
        execute: (stack) => {
            if (stack.length < 1) return [...stack, "Error: Insufficient items"]
            return [...stack, stack[stack.length - 1]]
        }
    },
    {
        name: "OP_HASH160",
        execute: (stack) => {
            if (stack.length < 1) return [...stack, "Error: Insufficient items"]
            const element = stack.pop()
            if (element instanceof Buffer) {
                return [...stack, hash160(element)]
            }
            return [...stack, "Error: Invalid input for OP_HASH160"]
        }
    },
    {
        name: "OP_EQUAL",
        execute: (stack) => {
            if (stack.length < 2) return [...stack, "Error: Insufficient items"]
            const [b, a] = [stack.pop(), stack.pop()] as [StackItem, StackItem]
            if (a instanceof Buffer && b instanceof Buffer) {
                return [...stack, Buffer.compare(a, b) === 0]
            }
            return [...stack, a === b]
        }
    },
    {
        name: "OP_EQUALVERIFY",
        execute: (stack) => {
            const newStack = opcodes
                .find((op) => op.name === "OP_EQUAL")!
                .execute(stack)
            if (newStack[newStack.length - 1] === true) {
                newStack.pop()
                return newStack
            }
            return [...newStack, "Error: EQUALVERIFY failed"]
        }
    },
    {
        name: "OP_CHECKSIG",
        execute: (stack) => {
            if (stack.length < 2) return [...stack, "Error: Insufficient items"]
            const [pubKeyBuffer, signatureBuffer] = [
                stack.pop(),
                stack.pop()
            ] as [Buffer, Buffer]
            try {
                const pubKey = ec.keyFromPublic(pubKeyBuffer)
                const signature = signatureBuffer.slice(0, -1) // Remove the hash type
                const messageHash = sha256(Buffer.from("message to sign"))
                const isValid = pubKey.verify(messageHash, signature)
                return [...stack, isValid]
            } catch (error) {
                return [...stack, "Error: Invalid signature or public key"]
            }
        }
    },
    {
        name: "OP_CHECKMULTISIG",
        execute: (stack) => {
            if (stack.length < 4) return [...stack, "Error: Insufficient items"]
            const m = Number(stack.pop())
            const pubKeys = []
            for (let i = 0; i < m; i++) {
                pubKeys.push(stack.pop() as Buffer)
            }
            const n = Number(stack.pop())
            const signatures = []
            for (let i = 0; i < n; i++) {
                signatures.push(stack.pop() as Buffer)
            }
            try {
                const messageHash = sha256(Buffer.from("message to sign"))
                let validCount = 0
                for (const signature of signatures) {
                    for (const pubKeyBuffer of pubKeys) {
                        const pubKey = ec.keyFromPublic(pubKeyBuffer)
                        if (
                            pubKey.verify(messageHash, signature.slice(0, -1))
                        ) {
                            validCount++
                            break
                        }
                    }
                }
                return [...stack, validCount >= m]
            } catch (error) {
                return [...stack, "Error: Invalid signatures or public keys"]
            }
        }
    }
]

interface StackSimulatorProps {
    showOperations: boolean
}

const StackSimulator = ({ showOperations }: StackSimulatorProps) => {
    const [stack, setStack] = useState<StackItem[]>([])
    const [input, setInput] = useState<string>("")
    const [lastOperation, setLastOperation] = useState<string | null>(null)

    useEffect(() => {
        bitcoin.networks.testnet
    }, [])

    const push = (): void => {
        if (input.trim()) {
            const newItem = input.trim()
            let stackItem: StackItem
            if (newItem === "true" || newItem === "false") {
                stackItem = newItem === "true"
            } else if (!isNaN(Number(newItem))) {
                stackItem = BigInt(newItem)
            } else if (newItem.startsWith("0x")) {
                stackItem = Buffer.from(newItem.slice(2), "hex")
            } else {
                try {
                    stackItem = Buffer.from(bs58.decode(newItem))
                } catch {
                    stackItem = Buffer.from(newItem)
                }
            }
            setStack((prevStack) => [...prevStack, stackItem])
            setInput("")
            setLastOperation("push")
        }
    }

    const pop = (): void => {
        if (stack.length > 0) {
            setStack((prevStack) => prevStack.slice(0, -1))
            setLastOperation("pop")
        }
    }

    const executeOpcode = (opcode: Opcode): void => {
        const newStack = opcode.execute([...stack])
        setStack(newStack)
        setLastOperation(opcode.name)
    }

    const getItemColor = (item: StackItem): string => {
        if (typeof item === "boolean") {
            return item
                ? "bg-vscode-success-light dark:bg-vscode-success-dark text-vscode-text-light dark:text-vscode-text-dark"
                : "bg-vscode-error-light dark:bg-vscode-error-dark text-vscode-text-light dark:text-vscode-text-dark"
        }
        if (typeof item === "string" && item.startsWith("Error:")) {
            return "bg-vscode-error-light dark:bg-vscode-error-dark text-vscode-text-light dark:text-vscode-text-dark"
        }
        return "bg-vscode-navigation-light dark:bg-vscode-navigation-dark text-vscode-text-light dark:text-vscode-text-dark"
    }

    const formatStackItem = (item: StackItem): string => {
        if (item instanceof Buffer) {
            return `0x${item.toString("hex")}`
        }
        return item.toString()
    }

    return (
        <div className="w-full max-w-2xl mx-auto py-1">
            <motion.div
                className="bg-vscode-container-light dark:bg-vscode-container-dark rounded-lg text-vscode-text-light dark:text-vscode-text-dark font-normal shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="bg-vscode-titleBar-light dark:bg-vscode-titleBar-dark text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark p-2 flex items-center">
                    <div className="flex-grow text-center text-sm font-medium">
                        Bitcoin Stack Simulator
                    </div>
                </div>

                {/* Main content */}
                <div className="p-4 sm:p-6">
                    <div className="flex space-x-2 mb-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter value or opcode"
                            className="flex-grow px-3 py-2 border border-vscode-lineNumber-light dark:border-vscode-lineNumber-dark rounded-md bg-vscode-input-light dark:bg-vscode-input-dark text-vscode-text-light dark:text-vscode-text-dark focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <motion.button
                            onClick={push}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                        >
                            <ArrowDownCircle className="inline-block w-5 h-5 mr-1" />
                            Push
                        </motion.button>
                        <motion.button
                            onClick={pop}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-vscode-file-light dark:bg-vscode-file-dark text-vscode-text-light dark:text-vscode-text-dark rounded-md hover:bg-vscode-hover-light dark:hover:bg-vscode-hover-dark focus:outline-none focus:ring-2 focus:ring-vscode-hover-light dark:focus:ring-vscode-hover-dark focus:ring-opacity-50"
                        >
                            <ArrowUpCircle className="inline-block w-5 h-5 mr-1" />
                            Pop
                        </motion.button>
                    </div>

                    {showOperations && (
                        <div className="mb-4 bg-vscode-background-light dark:bg-vscode-background-dark p-4 rounded-lg">
                            <div className="text-sm font-medium mb-2">
                                Available Operations:
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {opcodes.map((opcode) => (
                                    <motion.button
                                        key={opcode.name}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => executeOpcode(opcode)}
                                        className="px-2 py-1 bg-vscode-file-light dark:bg-vscode-file-dark text-vscode-text-light dark:text-vscode-text-dark rounded-md hover:bg-vscode-hover-light dark:hover:bg-vscode-hover-dark focus:outline-none focus:ring-2 focus:ring-vscode-hover-light dark:focus:ring-vscode-hover-dark focus:ring-opacity-50 text-sm whitespace-nowrap"
                                    >
                                        {opcode.name}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="border border-vscode-lineNumber-light dark:border-vscode-lineNumber-dark rounded-md p-4 bg-vscode-background-light dark:bg-vscode-background-dark">
                        <div className="font-semibold mb-2 text-vscode-text-light dark:text-vscode-text-dark">
                            Stack{" "}
                            <span className="font-normal text-sm">
                                (Last-In-First-Out)
                            </span>
                            :
                        </div>
                        <AnimatePresence>
                            {stack.length === 0 ? (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-vscode-text-light dark:text-vscode-text-dark text-center py-2"
                                >
                                    Stack is empty
                                </motion.p>
                            ) : (
                                <div className="space-y-2">
                                    {stack
                                        .slice()
                                        .reverse()
                                        .map((item, index) => (
                                            <motion.div
                                                key={`${index}-${item}`}
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                transition={{ duration: 0.2 }}
                                                className={`p-2 rounded-md ${getItemColor(item)}`}
                                            >
                                                {formatStackItem(item)}
                                            </motion.div>
                                        ))}
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {lastOperation && (
                        <div className="mt-4 text-center text-sm text-vscode-text-light dark:text-vscode-text-dark">
                            Last operation:{" "}
                            <span className="font-medium">{lastOperation}</span>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}

export default StackSimulator
