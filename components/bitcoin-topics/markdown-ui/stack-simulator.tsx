"use client"

import { useState } from "react"
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type StackItem = string | number | boolean | bigint

interface Opcode {
    name: string
    execute: (stack: StackItem[]) => StackItem[]
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
            const a = stack[stack.length - 1]
            return [...stack, a]
        }
    },
    {
        name: "OP_SWAP",
        execute: (stack) => {
            if (stack.length < 2) return [...stack, "Error: Insufficient items"]
            const [b, a] = [stack.pop(), stack.pop()] as [StackItem, StackItem]
            return [...stack, b, a]
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

    const push = (): void => {
        if (input.trim()) {
            const newItem = input.trim()
            let stackItem: StackItem
            if (newItem === "true" || newItem === "false") {
                stackItem = newItem === "true"
            } else if (!isNaN(Number(newItem))) {
                stackItem = BigInt(newItem)
            } else {
                stackItem = newItem
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
        return "bg-[#5A6270] text-[#E5E6F1]"
    }

    return (
        <div className="w-full max-w-2xl mx-auto py-1">
            <motion.div
                className="bg-white dark:bg-[#272E35] p-4 sm:p-6 rounded-lg text-sm sm:text-base shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-[#E5E6F1]">
                    Bitcoin StackSimulator
                </div>
                <div className="flex space-x-2 mb-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter value or opcode"
                        className="flex-grow px-3 py-2 border border-gray-300 dark:border-[#454C54] rounded-md bg-gray-50 dark:bg-[#454C54] text-gray-800 dark:text-[#E5E6F1] focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                        className="px-4 py-2 bg-gray-200 dark:bg-[#454C54] text-gray-800 dark:text-[#E5E6F1] rounded-md hover:bg-gray-300 dark:hover:bg-[#5A6270] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
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
                                className="px-2 py-1 bg-gray-100 dark:bg-[#454C54] text-gray-800 dark:text-[#E5E6F1] rounded-md hover:bg-gray-200 dark:hover:bg-[#5A6270] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 text-sm"
                            >
                                {opcode.name}
                            </motion.button>
                        ))}
                    </div>
                )}
                <div className="border border-gray-300 dark:border-[#454C54] rounded-md p-4 bg-gray-50 dark:bg-[#272E35]">
                    <div className="font-semibold mb-2 text-gray-800 dark:text-[#E5E6F1]">
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
                                className="text-gray-500 dark:text-[#E5E6F1] text-center py-2"
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
                                            {item.toString()}
                                        </motion.div>
                                    ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
                {lastOperation && (
                    <div className="mt-4 text-center text-gray-600 dark:text-[#E5E6F1]">
                        Last operation: {lastOperation}
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default StackSimulator
