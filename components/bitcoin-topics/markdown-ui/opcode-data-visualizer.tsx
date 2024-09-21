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
                            "The OP_PUSHBYTES_X opcodes (0x01 to 0x4b) are used to push up to 75 bytes on to the stack. Just replace the X with the number of upcoming bytes you want pushed on to the stack.",
                        example:
                            "OP_DATAPUSH_32 0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
                        funFact:
                            "This is the most commonly used opcode for pushing data on to the stack"
                    }
                    break
                case "op_push_data_1":
                    data = {
                        opcode: "OP_PUSHDATA1",
                        description: "Dynamic data pushing (76-255 bytes)",
                        details:
                            "The OP_PUSHDATA1 opcode (0x4c) is followed by 1 byte indicating the number of bytes you want pushed on to the stack, followed by the actual bytes.  This is used when you want to push more data on the stack than you can with OP_PUSHBYTES_X.",
                        example: "OP_PUSHDATA1 4c "
                    }
                    break
                case "op_push_data_2":
                    data = {
                        opcode: "OP_PUSHDATA2",
                        description: "Data between 256-65535 bytes",
                        details:
                            "The OP_PUSHDATA2 opcode (0x4d) works in the same was as OP_PUSHDATA1, except it's followed by 2 bytes to indicate the number of upcoming bytes to be pushed on to the stack.  This is used when you want to push more data on the stack than you can with OP_PUSHDATA1.",
                        example: "OP_PUSHDATA2 0001 "
                    }
                    break
                case "op_push_data_4":
                    data = {
                        opcode: "OP_PUSHDATA4",
                        description: "Data between 65536-4294967295 bytes",
                        details:
                            "The OP_PUSHDATA4 opcode (0x4e) works in the same was as OP_PUSHDATA2, but is followed by 4 bytes to indicate the number of upcoming bytes to be pushed on to the stack.  This is used when you want to push more data on the stack than you can with OP_PUSHDATA2.",
                        example: "OP_PUSHDATA4 00000100 [65536 bytes]"
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
            <p className="mb-0 text-center text-gray-600">
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
            className="max-w-3xl mx-auto bg-gradient-to-br from-white-50 to-gray-100 rounded-xl overflow-hidden shadow-lg border border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-gradient-to-r from-gray-400 to-gray-500 px-4 py-2">
                <span className="text-xl font-bold text-white flex items-center">
                    <span className="font-mono bg-white text-gray-700 px-2 py-1 rounded mr-2 text-sm">
                        {opcode}
                    </span>
                    <span className="text-sm font-normal">{description}</span>
                </span>
            </div>

            <div className="p-4 space-y-3">
                <p className="text-gray-700">{details}</p>

                <div className="bg-white rounded-lg shadow-inner p-3 border border-gray-200">
                    <h3 className="text-md font-semibold text-gray-700 mb-1">
                        Example Usage:
                    </h3>
                    <pre className="font-mono text-xs bg-gray-50 p-2 rounded border border-gray-200 text-gray-600">
                        {example}
                    </pre>
                </div>

                {funFact && (
                    <div className="bg-gray-50 border-l-4 border-gray-400 p-2 rounded-r-lg">
                        <p className="font-bold text-gray-800 text-sm">
                            Fun Fact:
                        </p>
                        <p className="text-gray-700">{funFact}</p>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
