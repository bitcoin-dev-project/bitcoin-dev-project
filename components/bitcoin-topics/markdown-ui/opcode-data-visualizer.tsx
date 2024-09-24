"use client"
import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { OpcodeSVG } from "@/public/opCodeSVG"

interface OpcodeInfo {
    opcode: string
    description: string
    details: string
    example: string
    funFact?: string
}

const OpcodeDataVisualizer: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null)
    const [info, setInfo] = useState<OpcodeInfo | null>(null)

    useEffect(() => {
        const svgElement = svgRef.current

        const handleClick = (event: Event) => {
            const targetId = (event.target as HTMLElement).id

            let data: OpcodeInfo | null = null

            switch (targetId) {
                case "op_push_bytes":
                    data = {
                        opcode: "OP_PUSHBYTES_X",
                        description: "Dynamic data pushing (1-75 bytes)",
                        details:
                            "The OP_PUSHBYTES_X opcodes (0x01 to 0x4b) are used to push up to 75 bytes onto the stack. Replace X with the number of upcoming bytes you want pushed onto the stack.",
                        example:
                            "OP_PUSHBYTES_32 0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u",
                        funFact:
                            "This is the most commonly used opcode for pushing data onto the stack."
                    }
                    break
                case "op_push_data_1":
                    data = {
                        opcode: "OP_PUSHDATA1",
                        description: "Dynamic data pushing (76-255 bytes)",
                        details:
                            "The OP_PUSHDATA1 opcode (0x4c) is followed by 1 byte indicating the number of bytes to be pushed onto the stack, followed by the actual data.",
                        example: "OP_PUSHDATA1 0x4c [76 bytes of data]"
                    }
                    break
                case "op_push_data_2":
                    data = {
                        opcode: "OP_PUSHDATA2",
                        description: "Data between 256-65535 bytes",
                        details:
                            "The OP_PUSHDATA2 opcode (0x4d) is followed by 2 bytes indicating the number of upcoming bytes to be pushed onto the stack, followed by the actual data.",
                        example: "OP_PUSHDATA2 0x0100 [256 bytes of data]"
                    }
                    break
                case "op_push_data_4":
                    data = {
                        opcode: "OP_PUSHDATA4",
                        description: "Data between 65536-4294967295 bytes",
                        details:
                            "The OP_PUSHDATA4 opcode (0x4e) is followed by 4 bytes indicating the number of upcoming bytes to be pushed onto the stack, followed by the actual data.",
                        example: "OP_PUSHDATA4 0x00010000 [65536 bytes of data]"
                    }
                    break
                default:
                    data = null // Hide panel if clicking on a different area
            }

            setInfo((prevInfo) =>
                prevInfo?.opcode === data?.opcode ? null : data
            )
        }

        if (svgElement) {
            const clickableAreas = svgElement.querySelectorAll(
                "#op_push_bytes, #op_push_data_1, #op_push_data_2, #op_push_data_4"
            )
            clickableAreas.forEach((area) => {
                area.addEventListener("click", handleClick)
            })
        }

        return () => {
            if (svgElement) {
                const clickableAreas = svgElement.querySelectorAll(
                    "#op_push_bytes, #op_push_data_1, #op_push_data_2, #op_push_data_4"
                )
                clickableAreas.forEach((area) => {
                    area.removeEventListener(
                        "click",
                        handleClick as EventListener
                    )
                })
            }
        }
    }, [])

    return (
        <div className="flex max-w-4xl flex-col items-center p-4">
            <p className="mb-0 text-center text-vscode-text-light dark:text-vscode-text-dark">
                *Click on the colored rectangles to learn more about each
                OP_PUSH data type.
            </p>
            <OpcodeSVG svgRef={svgRef} />
            {info && (
                <div className="container mx-auto ">
                    <OpCodeInfo
                        opcode={info.opcode}
                        description={info.description}
                        details={info.details}
                        example={info.example}
                        funFact={info.funFact}
                    />
                </div>
            )}
        </div>
    )
}

export default OpcodeDataVisualizer

interface OpCodeInfoProps extends OpcodeInfo {}

const OpCodeInfo: React.FC<OpCodeInfoProps> = ({
    opcode,
    description,
    details,
    example,
    funFact
}) => {
    return (
        <motion.div
            className="max-w-3xl mx-auto bg-vscode-container-light dark:bg-vscode-container-dark rounded-xl overflow-hidden shadow-lg border border-vscode-lineNumber-light dark:border-vscode-lineNumber-dark"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-vscode-titleBar-light dark:bg-vscode-titleBar-dark px-4 py-2">
                <span className="text-xl font-bold text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark flex items-center">
                    <span className="font-mono bg-vscode-file-light dark:bg-vscode-input-dark text-vscode-text-light dark:text-vscode-text-dark px-2 py-1 rounded mr-2 text-sm">
                        {opcode}
                    </span>
                    <span className="text-sm font-normal">{description}</span>
                </span>
            </div>

            <div className="p-4 space-y-3">
                <p className="text-vscode-text-light dark:text-vscode-text-dark">
                    {details}
                </p>

                <div className="bg-vscode-file-light dark:bg-vscode-input-dark rounded-lg shadow-inner p-3 border border-vscode-lineNumber-light dark:border-vscode-lineNumber-dark">
                    <div className="text-md font-semibold text-vscode-text-light dark:text-vscode-text-dark mb-1">
                        Example Usage:
                    </div>
                    <pre className="font-mono text-xs bg-vscode-file-light dark:bg-vscode-input-dark p-2 rounded border border-vscode-lineNumber-light dark:border-vscode-lineNumber-dark text-vscode-text-light dark:text-vscode-text-dark">
                        {example}
                    </pre>
                </div>

                {funFact && (
                    <div className="bg-vscode-navButton-light dark:bg-vscode-navButton-dark border-l-4 border-vscode-lineNumber-light dark:border-vscode-lineNumber-dark p-2 rounded-r-lg space-y-1">
                        <p className="font-bold text-vscode-text-light dark:text-vscode-text-dark text-sm m-0">
                            Fun Fact:
                        </p>
                        <p className="text-vscode-text-light dark:text-vscode-text-dark m-0">
                            {funFact}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
