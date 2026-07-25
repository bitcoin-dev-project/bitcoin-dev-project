// Prism-based Python highlighting for the playground.
//
// We call Prism.highlight() by hand and never Prism.highlightAll(), so disable
// the DOMContentLoaded auto-highlighter — it would otherwise scan the whole
// page and fight React over our editor DOM.
import Prism from "prismjs"
import "prismjs/components/prism-python"
;(Prism as unknown as { manual: boolean }).manual = true

export function highlightPython(code: string): string {
    if (!Prism.languages.python) {
        // Grammar somehow missing: fall back to escaped plain text.
        return code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
    }
    return Prism.highlight(code, Prism.languages.python, "python")
}
