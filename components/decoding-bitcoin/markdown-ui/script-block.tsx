"use client"

import React, { useState } from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"
import clsx from "clsx"

type Script = {
    label?: string
    code: string
}

type ScriptBlockProps = {
    /** Preferred: explicit rows, each an optional label + its script. */
    scripts?: Script[]
    /**
     * Fallback for quick use: a single or multi-line string. Lines shaped like
     * "LABEL: OP_0 <...>" are split into a label gutter automatically.
     */
    code?: string
    /** Optional header shown above the scripts (dark title bar). */
    title?: string
    /** Show the copy button (default true). */
    copy?: boolean
    className?: string
}

// Light syntax palette tuned to the warm cream brand: a raised code card with
// real token colors so it reads as code (not a note) while staying on-brand.
const COLORS = {
    surface: "#FFFDF5", // brand-card — warm near-white code surface
    header: "#EFE9DE", // brand-gray — title strip
    border: "#E1DBD0", // brand-gray-100 — defines the card edge
    base: "#201E1E", // brand-dark — literal text / punctuation
    opcode: "#C2410C", // burnt orange — literal opcodes (OP_*)
    placeholder: "#4B7389", // brand teal-blue — <data you provide>
    label: "#6C6C6C", // brand-gray-300 — gutter annotation
    muted: "#8A857C" // copy button
}

// Split a script into typed tokens so opcodes and <placeholders> get distinct
// colors. Order matters: opcodes are matched before the generic word rule.
const TOKEN_RE = /(<[^>]*>)|(OP_[A-Z0-9]+)|(\s+)|([^\s<]+)/g

type Token = {
    type: "placeholder" | "opcode" | "space" | "text"
    value: string
}

function tokenize(code: string): Token[] {
    const tokens: Token[] = []
    let match: RegExpExecArray | null
    TOKEN_RE.lastIndex = 0
    while ((match = TOKEN_RE.exec(code)) !== null) {
        if (match[1]) tokens.push({ type: "placeholder", value: match[1] })
        else if (match[2]) tokens.push({ type: "opcode", value: match[2] })
        else if (match[3]) tokens.push({ type: "space", value: match[3] })
        else tokens.push({ type: "text", value: match[4] })
    }
    return tokens
}

// Turn a raw code string into rows. A leading "WORD:" becomes the row label.
function parseCode(code: string): Script[] {
    return code
        .replace(/\n+$/, "")
        .split("\n")
        .map((line) => {
            const m = line.match(/^\s*([A-Za-z0-9]+):\s+(.*)$/)
            return m ? { label: m[1], code: m[2] } : { code: line.trim() }
        })
}

function CodeTokens({ code }: { code: string }) {
    return (
        <>
            {tokenize(code).map((token, i) => {
                if (token.type === "space") return token.value
                const color =
                    token.type === "opcode"
                        ? COLORS.opcode
                        : token.type === "placeholder"
                          ? COLORS.placeholder
                          : COLORS.base
                return (
                    <span key={i} style={{ color }}>
                        {token.value}
                    </span>
                )
            })}
        </>
    )
}

export default function ScriptBlock({
    scripts,
    code,
    title,
    copy = true,
    className
}: ScriptBlockProps) {
    const rows: Script[] = scripts ?? (code ? parseCode(code) : [])
    const hasLabels = rows.some((r) => r.label)
    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = async () => {
        const text = rows
            .map((r) => (r.label ? `${r.label}: ${r.code}` : r.code))
            .join("\n")
        try {
            await navigator.clipboard.writeText(text)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy script: ", err)
        }
    }

    const CopyButton = ({ float }: { float?: boolean }) => (
        <button
            onClick={handleCopy}
            aria-label="Copy script"
            className={clsx(
                "flex items-center gap-1 text-xs transition-colors hover:text-orange-600",
                float && "absolute right-2 top-2 z-10 rounded py-1 pl-3 pr-2"
            )}
            style={{
                color: COLORS.muted,
                ...(float ? { backgroundColor: COLORS.surface } : {})
            }}
        >
            {isCopied ? (
                <>
                    <CheckIcon className="h-3.5 w-3.5" />
                    Copied
                </>
            ) : (
                <>
                    <ClipboardIcon className="h-3.5 w-3.5" />
                    Copy
                </>
            )}
        </button>
    )

    return (
        <div
            className={clsx(
                // not-prose: opt out of the site's inline-code chip styling
                // (prose-code:bg-brand-gray) so <code> stays on the code surface.
                "not-prose mx-auto my-6 max-w-3xl overflow-hidden rounded-lg shadow-sm",
                className
            )}
            style={{
                backgroundColor: COLORS.surface,
                border: `1px solid ${COLORS.border}`
            }}
        >
            {title && (
                <div
                    className="flex items-center justify-between px-4 py-2 text-xs"
                    style={{
                        backgroundColor: COLORS.header,
                        color: COLORS.muted,
                        borderBottom: `1px solid ${COLORS.border}`
                    }}
                >
                    <span className="font-mono">{title}</span>
                    {copy && <CopyButton />}
                </div>
            )}

            <div className="relative">
                {copy && !title && <CopyButton float />}

                <div
                    className={clsx(
                        "grid items-baseline gap-x-5 gap-y-1.5 overflow-x-auto px-4 py-3.5 font-mono text-[13.5px] leading-relaxed",
                        hasLabels ? "grid-cols-[auto_1fr]" : "grid-cols-1"
                    )}
                >
                    {rows.map((row, i) => (
                        <React.Fragment key={i}>
                            {hasLabels && (
                                <span
                                    className="select-none whitespace-nowrap"
                                    style={{ color: COLORS.label }}
                                >
                                    {row.label}
                                </span>
                            )}
                            <code
                                className="whitespace-pre"
                                style={{ color: COLORS.base }}
                            >
                                <CodeTokens code={row.code} />
                            </code>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}
