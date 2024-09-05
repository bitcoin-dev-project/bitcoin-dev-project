"use client"
import { CheckIcon, ClipboardIcon } from "lucide-react"
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
    language = "text",
    highlightLines = [],
    showLineNumbers = false
}: CodeSnippetProps) => {
    const theme = solarizedlight
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
        <div className="relative rounded-lg bg-vscode-codeSnippetBackground-light dark:bg-vscode-codeSnippetBackground-dark border border-vscode-input-light dark:border-vscode-input-dark shadow-md overflow-hidden">
            <div className="bg-vscode-titleBar-light dark:bg-vscode-titleBar-dark px-4 py-2 text-sm text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark">
                {language}
            </div>
            <button
                onClick={handleCopyClick}
                className="absolute right-2 top-2 flex items-center space-x-1 text-xs text-vscode-text-light dark:text-vscode-text-dark hover:text-vscode-selectedFile-light dark:hover:text-vscode-selectedFile-dark transition-colors"
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
                    'pre[class*="language-"]::before': {
                        content: "none"
                    },
                    ".linenumber": {
                        minWidth: "1.5em",
                        paddingRight: "0.5em",
                        textAlign: "center",
                        userSelect: "none",
                        opacity: "0.5"
                    },
                    ".token": {
                        color: "var(--vscode-editorForeground-light)"
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
                    color: "var(--vscode-lineNumber-light)"
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
                    className:
                        "text-vscode-editorForeground-light dark:text-vscode-editorForeground-dark"
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

export default CodeSnippet
