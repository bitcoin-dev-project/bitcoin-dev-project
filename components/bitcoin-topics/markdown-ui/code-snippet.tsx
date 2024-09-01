"use client"
import { ClipboardCheckIcon, ClipboardIcon } from "lucide-react"
import React, { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism"

type CodeSnippetProps = {
    code: string
    language?: string
    highlightLines?: number[]
    showLineNumbers?: boolean
}

export const CodeSnippet = ({
    code,
    language = "javascript",
    highlightLines = [],
    showLineNumbers = false
}: CodeSnippetProps) => {
    const [isCopied, setIsCopied] = useState(false)
    const theme = solarizedlight

    const lineProps = (lineNumber: number) => {
        const style: React.CSSProperties = { display: "block" }
        if (highlightLines.includes(lineNumber)) {
            style.backgroundColor = "rgba(241, 118, 13, 0.1)"
            style.borderLeft = `3px solid #f1760d`
            style.paddingLeft = showLineNumbers ? "12px" : "9px"
            style.marginLeft = showLineNumbers ? "-15px" : "-12px"
        }
        return { style }
    }

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy text: ", err)
        }
    }

    return (
        <div className="bg-[#fef7f2] dark:bg-[#282c34] rounded-lg relative">
            <button
                onClick={handleCopyClick}
                className="absolute top-2 right-2 p-2 rounded-md bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                aria-label="Copy code"
            >
                {isCopied ? (
                    <ClipboardCheckIcon className="h-5 w-5 text-green-500" />
                ) : (
                    <ClipboardIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                )}
            </button>
            <SyntaxHighlighter
                language={language}
                style={{
                    ...theme,
                    'pre[class*="language-"]': {
                        ...theme['pre[class*="language-"]'],
                        padding: showLineNumbers ? "12px 15px" : "12px",
                        background: "transparent"
                    },
                    'pre[class*="language-"]::before': {
                        content: "none"
                    },
                    ".linenumber": {
                        minWidth: "2em",
                        paddingRight: "1em",
                        textAlign: "right",
                        userSelect: "none",
                        opacity: "0.5"
                    },
                    ".token": {
                        color: "#3d3533"
                    }
                }}
                customStyle={{
                    borderRadius: "8px",
                    fontSize: "14px"
                }}
                showLineNumbers={showLineNumbers}
                lineNumberStyle={
                    showLineNumbers
                        ? {
                              minWidth: "2em",
                              paddingRight: "1em",
                              textAlign: "right",
                              userSelect: "none",
                              opacity: "0.5",
                              marginRight: "10px",
                              color: "#3d3533"
                          }
                        : undefined
                }
                lineProps={lineProps}
                wrapLines={true}
                codeTagProps={{
                    className: "text-[#3d3533] dark:text-[#f1760d]"
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

export default CodeSnippet
