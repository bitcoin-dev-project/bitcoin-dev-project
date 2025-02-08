"use client"

import { useState } from "react"
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Opcode, opcodes, StackItem } from "@/content/opcode-explorer"

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
        if (Buffer.isBuffer(item)) {
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
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter value or opcode"
                            className="flex-grow px-3 py-2 border border-vscode-lineNumber-light dark:border-vscode-lineNumber-dark rounded-md bg-vscode-input-light dark:bg-vscode-input-dark text-vscode-text-light dark:text-vscode-text-dark focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <div className="flex space-x-2">
                            <motion.button
                                onClick={push}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 sm:flex-none px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                            >
                                <div className="flex items-center justify-center">
                                    <ArrowDownCircle className="w-5 h-5 mr-2" />
                                    <span>Push</span>
                                </div>
                            </motion.button>
                            <motion.button
                                onClick={pop}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 sm:flex-none px-4 py-2 bg-vscode-file-light dark:bg-vscode-file-dark text-vscode-text-light dark:text-vscode-text-dark rounded-md hover:bg-vscode-hover-light dark:hover:bg-vscode-hover-dark focus:outline-none focus:ring-2 focus:ring-vscode-hover-light dark:focus:ring-vscode-hover-dark focus:ring-opacity-50"
                            >
                                <div className="flex items-center justify-center">
                                    <ArrowUpCircle className="w-5 h-5 mr-2" />
                                    <span>Pop</span>
                                </div>
                            </motion.button>
                        </div>
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
