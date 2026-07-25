"use client"

import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
} from "react"
import clsx from "clsx"
import { Loader2, Play, RotateCcw } from "lucide-react"
import { formatPythonError, loadPyodideOnce } from "./python/pyodide-loader"
import { highlightPython } from "./python/highlight"
import { PRESETS } from "./python/secp256k1-source"
import styles from "./python/editor.module.css"

type PythonPlaygroundProps = {
    /** Starting contents of the editable file. */
    code: string
    /** Read-only helper files mounted alongside it, keyed by filename. */
    modules?: Record<string, string>
    /** Named bundle of helper files, e.g. "secp256k1". */
    preset?: keyof typeof PRESETS
    /** Name of the editable file. */
    filename?: string
    /** Editor height in CSS units. */
    height?: string
}

const MAIN_TAB = "__main__"

function gutter(lineCount: number): string {
    let s = ""
    for (let i = 1; i <= lineCount; i++) s += (i > 1 ? "\n" : "") + i
    return s
}

/** Editable file: transparent textarea over a syntax-highlighted layer, with a
    scroll-synced line-number gutter. */
function CodeEditor({
    value,
    onChange,
    height,
    label
}: {
    value: string
    onChange: (next: string) => void
    height: string
    label: string
}) {
    const html = useMemo(() => highlightPython(value), [value])
    const lineCount = useMemo(() => value.split("\n").length, [value])
    const taRef = useRef<HTMLTextAreaElement>(null)
    const preRef = useRef<HTMLPreElement>(null)
    const gutRef = useRef<HTMLDivElement>(null)

    // The textarea owns scrolling (it follows the caret natively); mirror its
    // offset onto the highlight layer and the gutter.
    const sync = useCallback(() => {
        const ta = taRef.current
        if (!ta) return
        if (preRef.current) {
            preRef.current.scrollTop = ta.scrollTop
            preRef.current.scrollLeft = ta.scrollLeft
        }
        if (gutRef.current) gutRef.current.scrollTop = ta.scrollTop
    }, [])

    // Re-apply after every render: setting innerHTML resets the pre's scroll.
    useLayoutEffect(sync, [sync, html])

    // Tab inserts four spaces instead of moving focus out of the editor.
    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key !== "Tab") return
        e.preventDefault()
        const el = e.currentTarget
        const { selectionStart: start, selectionEnd: end } = el
        onChange(value.slice(0, start) + "    " + value.slice(end))
        requestAnimationFrame(() => {
            el.selectionStart = el.selectionEnd = start + 4
        })
    }

    return (
        <div className={styles.body} style={{ height }}>
            <div className={styles.gutter} ref={gutRef} aria-hidden="true">
                <div className={styles.gutterInner}>{gutter(lineCount)}</div>
            </div>
            <pre
                className={clsx(styles.code, styles.pre)}
                ref={preRef}
                aria-hidden="true"
            >
                <code dangerouslySetInnerHTML={{ __html: html + "\n" }} />
            </pre>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onScroll={sync}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                wrap="off"
                className={clsx(styles.code, styles.textarea)}
                ref={taRef}
                aria-label={label}
            />
        </div>
    )
}

/** Read-only helper file: highlighted, selectable, with a synced gutter. */
function CodeView({ value, height }: { value: string; height: string }) {
    const html = useMemo(() => highlightPython(value), [value])
    const lineCount = useMemo(() => value.split("\n").length, [value])
    const preRef = useRef<HTMLPreElement>(null)
    const gutRef = useRef<HTMLDivElement>(null)
    const sync = () => {
        if (preRef.current && gutRef.current) {
            gutRef.current.scrollTop = preRef.current.scrollTop
        }
    }
    return (
        <div className={styles.body} style={{ height }}>
            <div className={styles.gutter} ref={gutRef} aria-hidden="true">
                <div className={styles.gutterInner}>{gutter(lineCount)}</div>
            </div>
            <pre
                className={clsx(styles.code, styles.preScroll)}
                ref={preRef}
                onScroll={sync}
            >
                <code dangerouslySetInnerHTML={{ __html: html }} />
            </pre>
        </div>
    )
}

export const PythonPlayground = ({
    code,
    modules,
    preset,
    filename = "main.py",
    height = "22rem"
}: PythonPlaygroundProps) => {
    const initial = useMemo(() => code.replace(/^\n/, "").trimEnd(), [code])
    const helpers = useMemo(
        () => ({ ...(preset ? PRESETS[preset] : {}), ...(modules ?? {}) }),
        [preset, modules]
    )

    const [source, setSource] = useState(initial)
    const [activeTab, setActiveTab] = useState<string>(MAIN_TAB)
    const [output, setOutput] = useState<string[]>([])
    const [failed, setFailed] = useState(false)
    const [status, setStatus] = useState<"idle" | "booting" | "running">("idle")
    const mounted = useRef(true)

    useEffect(() => {
        mounted.current = true
        return () => {
            mounted.current = false
        }
    }, [])

    const run = useCallback(async () => {
        setOutput([])
        setFailed(false)
        setStatus("booting")

        let pyodide
        try {
            pyodide = await loadPyodideOnce()
        } catch {
            if (!mounted.current) return
            setFailed(true)
            setOutput([
                "Could not load the Python runtime. Check your connection and try again."
            ])
            setStatus("idle")
            return
        }
        if (!mounted.current) return
        setStatus("running")

        const lines: string[] = []
        const collect = (s: string) => {
            lines.push(s)
        }
        pyodide.setStdout({ batched: collect })
        pyodide.setStderr({ batched: collect })

        for (const [name, contents] of Object.entries(helpers)) {
            pyodide.FS.writeFile(`/home/pyodide/${name}`, contents, {
                encoding: "utf8"
            })
        }

        try {
            await pyodide.runPythonAsync(source)
            if (!mounted.current) return
            setOutput(lines.length ? lines : ["(no output)"])
        } catch (err) {
            if (!mounted.current) return
            setFailed(true)
            setOutput([...lines, formatPythonError(String(err))])
        } finally {
            if (mounted.current) setStatus("idle")
        }
    }, [helpers, source])

    const busy = status !== "idle"
    const tabs = [MAIN_TAB, ...Object.keys(helpers)]

    return (
        <div className="not-prose my-6 overflow-hidden rounded-lg border border-black/40 shadow-sm">
            {/* Tab + action bar — one cohesive dark editor chrome. */}
            <div className="flex items-center justify-between gap-2 border-b border-black/40 bg-[#252526] px-2">
                <div className="flex min-w-0 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={clsx(
                                "shrink-0 border-b-2 px-3 py-2 font-mono text-xs transition-colors",
                                activeTab === tab
                                    ? "border-orange-500 text-white"
                                    : "border-transparent text-[#8a8a8a] hover:text-white"
                            )}
                        >
                            {tab === MAIN_TAB ? filename : tab}
                        </button>
                    ))}
                </div>
                <div className="flex shrink-0 items-center gap-1 py-1.5">
                    <button
                        onClick={() => {
                            setSource(initial)
                            setOutput([])
                            setFailed(false)
                        }}
                        disabled={busy}
                        className="rounded-md p-1.5 text-[#8a8a8a] transition-colors hover:bg-white/10 hover:text-white disabled:opacity-40"
                        aria-label="Reset code"
                        title="Reset code"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </button>
                    <button
                        onClick={run}
                        disabled={busy}
                        className="flex items-center gap-1.5 rounded-md bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-60"
                    >
                        {busy ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <Play className="h-3.5 w-3.5" />
                        )}
                        {status === "booting"
                            ? "Loading Python…"
                            : status === "running"
                              ? "Running…"
                              : "Run"}
                    </button>
                </div>
            </div>

            {activeTab === MAIN_TAB ? (
                <CodeEditor
                    value={source}
                    onChange={setSource}
                    height={height}
                    label={`${filename} editor`}
                />
            ) : (
                <CodeView value={helpers[activeTab]} height={height} />
            )}

            {output.length > 0 && (
                <div className="border-t border-black/40">
                    <div className="bg-[#252526] px-4 py-1.5 text-xs text-[#8a8a8a]">
                        Output
                    </div>
                    <pre
                        className={clsx(
                            styles.scroll,
                            "max-h-64 overflow-auto whitespace-pre-wrap break-words bg-[#1e1e1e] px-4 py-3 font-mono text-[13px] leading-relaxed",
                            failed ? "text-red-400" : "text-[#d6deeb]"
                        )}
                    >
                        {output.join("\n")}
                    </pre>
                </div>
            )}
        </div>
    )
}

export default PythonPlayground
