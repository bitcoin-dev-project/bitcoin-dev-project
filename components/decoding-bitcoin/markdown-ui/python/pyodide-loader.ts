// Loads Pyodide (real CPython compiled to WebAssembly) on demand.
//
// Deliberately lazy: the runtime is ~10MB, so nothing is fetched until a reader
// actually presses Run. One shared instance serves every playground on a page.

// Pinned. Bump deliberately, not automatically: lesson code is verified against
// this exact interpreter.
const PYODIDE_VERSION = "v0.29.4"
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`

declare global {
    interface Window {
        loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideInstance>
    }
}

export interface PyodideInstance {
    runPythonAsync: (code: string) => Promise<unknown>
    setStdout: (opts: { batched: (s: string) => void }) => void
    setStderr: (opts: { batched: (s: string) => void }) => void
    FS: {
        writeFile: (
            path: string,
            data: string,
            opts?: { encoding: string }
        ) => void
    }
}

let instance: Promise<PyodideInstance> | null = null

function injectScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const existing = document.querySelector<HTMLScriptElement>(
            `script[src="${src}"]`
        )
        if (existing) {
            existing.addEventListener("load", () => resolve())
            existing.addEventListener("error", () =>
                reject(new Error("Failed to load the Python runtime."))
            )
            if (window.loadPyodide) resolve()
            return
        }
        const script = document.createElement("script")
        script.src = src
        script.async = true
        script.onload = () => resolve()
        script.onerror = () =>
            reject(new Error("Failed to load the Python runtime."))
        document.head.appendChild(script)
    })
}

// Pyodide tracebacks open with a dozen frames of its own bootstrap code
// (_pyodide/_base.py, eval_code_async, ...) before reaching the reader's line.
// Strip those so an assertion failure points at the lesson, not the runtime.
export function formatPythonError(raw: string): string {
    const out: string[] = []
    let skipping = false
    for (const line of raw.split("\n")) {
        if (!/^\s/.test(line)) {
            skipping = false
            out.push(line)
            continue
        }
        if (/^\s+File "/.test(line)) {
            skipping = /_pyodide|pyodide\.asm|importlib\._bootstrap/.test(line)
            if (!skipping) {
                // `File "<exec>", line 15, in <module>` -> `line 15, in <module>`
                out.push("  " + line.trim().replace(/^File "<exec>", /, ""))
            }
            continue
        }
        if (!skipping) out.push(line)
    }
    return out
        .join("\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim()
}

export function loadPyodideOnce(): Promise<PyodideInstance> {
    if (instance) return instance
    instance = (async () => {
        await injectScript(`${PYODIDE_CDN}pyodide.js`)
        if (!window.loadPyodide) {
            throw new Error("Failed to load the Python runtime.")
        }
        return window.loadPyodide({ indexURL: PYODIDE_CDN })
    })().catch((err) => {
        // Let the next Run retry instead of caching a failed boot.
        instance = null
        throw err
    })
    return instance
}
