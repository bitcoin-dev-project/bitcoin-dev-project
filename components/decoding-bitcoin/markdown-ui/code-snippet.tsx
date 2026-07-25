"use client"
import { CheckIcon, ClipboardIcon } from "lucide-react"
import React, { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
// Night Owl matches css/prism.css, which themes the markdown fenced code blocks,
// so <CodeSnippet> and ```fences``` render as one consistent surface.
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism"

type CodeSnippetProps = {
    code: string
    language?: string
    highlightLines?: number[]
    showLineNumbers?: boolean
}

export const CodeSnippet = ({
    code,
    language = "text",
    highlightLines = [],
    showLineNumbers = false
}: CodeSnippetProps) => {
    const theme = nightOwl
    const [isCopied, setIsCopied] = useState(false)

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
        <div className="relative overflow-hidden rounded-lg bg-[#1e1e1e]">
            <div className="bg-[#252526] px-4 py-2 text-sm text-[#9d9d9d]">
                {language}
            </div>
            <button
                onClick={handleCopyClick}
                className="absolute right-2 top-2 flex items-center space-x-1 text-xs text-[#9d9d9d] transition-colors hover:text-orange-500"
                aria-label="Copy code"
            >
                {isCopied ? (
                    <>
                        <CheckIcon className="h-4 w-4" />
                        <span>Copied!</span>
                    </>
                ) : (
                    <>
                        <ClipboardIcon className="h-4 w-4" />
                        <span>Copy</span>
                    </>
                )}
            </button>
            <SyntaxHighlighter
                language={language}
                style={{
                    ...theme,
                    'pre[class*="language-"]': {
                        ...theme['pre[class*="language-"]'],
                        padding: "12px 0",
                        background: "transparent",
                        margin: 0
                    },
                    'code[class*="language-"]': {
                        ...theme['code[class*="language-"]'],
                        background: "transparent"
                    },
                    'pre[class*="language-"]::before': {
                        content: "none"
                    },
                    ".linenumber": {
                        minWidth: "1.5em",
                        paddingRight: "0.5em",
                        textAlign: "center",
                        userSelect: "none",
                        opacity: "0.5"
                    }
                }}
                customStyle={{
                    fontSize: "14px",
                    backgroundColor: "transparent"
                }}
                showLineNumbers={showLineNumbers}
                lineNumberStyle={{
                    minWidth: "1.5em",
                    paddingRight: "0.5em",
                    textAlign: "center",
                    userSelect: "none",
                    opacity: "0.5",
                    color: "#858585"
                }}
                lineProps={(lineNumber) => {
                    const style: React.CSSProperties = { display: "block" }
                    if (highlightLines.includes(lineNumber)) {
                        style.backgroundColor = "rgba(241, 118, 13, 0.1)"
                        style.borderLeft = "3px solid #f1760d"
                        style.width = "calc(100% + 1em)"
                        style.marginLeft = "-1em"
                        style.paddingLeft = showLineNumbers ? "1em" : "0.5em"
                    }
                    return { style }
                }}
                wrapLines={true}
                codeTagProps={{
                    style: {
                        display: "block",
                        paddingLeft: showLineNumbers ? "1em" : "0.5em"
                    },
                    className: "text-[#d4d4d4]"
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

export default CodeSnippet
