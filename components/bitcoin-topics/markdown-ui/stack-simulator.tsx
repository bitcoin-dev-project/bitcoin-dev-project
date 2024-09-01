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
            return item ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }
        if (typeof item === "string" && item.startsWith("Error:")) {
            return "bg-red-500 text-white"
        }
        return "bg-gray-600 text-gray-100" // Changed from "bg-[#5A6270] text-[#E5E6F1]"
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
                className="bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 rounded-lg text-sm sm:text-base shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                    Bitcoin StackSimulator
                </div>
                <div className="flex space-x-2 mb-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter value or opcode"
                        className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                    >
                        <ArrowUpCircle className="inline-block w-5 h-5 mr-1" />
                        Pop
                    </motion.button>
                </div>
                {showOperations && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4">
                        {opcodes.map((opcode) => (
                            <motion.button
                                key={opcode.name}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => executeOpcode(opcode)}
                                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 text-sm"
                            >
                                {opcode.name}
                            </motion.button>
                        ))}
                    </div>
                )}
                <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-950">
                    <div className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
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
                                className="text-gray-500 dark:text-gray-400 text-center py-2"
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
                                            className={`p-2 rounded-md ${getItemColor(
                                                item
                                            )}`}
                                        >
                                            {formatStackItem(item)}
                                        </motion.div>
                                    ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
                {lastOperation && (
                    <div className="mt-4 text-center text-gray-600 dark:text-gray-300">
                        Last operation: {lastOperation}
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default StackSimulator
