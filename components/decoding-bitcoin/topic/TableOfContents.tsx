"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import clsx from "clsx"

interface Heading {
    id: string
    text: string
    level: 2 | 3
}

// A heading may contain KaTeX (which injects a hidden MathML annotation holding
// the raw LaTeX source) and a prepended autolink anchor. Strip both so the TOC
// shows clean text instead of e.g. "Part 2: t×Gt \times G".
function headingText(el: HTMLElement): string {
    const clone = el.cloneNode(true) as HTMLElement
    clone
        .querySelectorAll(".katex-mathml, .sr-only, .content-header")
        .forEach((n) => n.remove())
    return (clone.textContent ?? "").replace(/^#\s*/, "").trim()
}

/**
 * "On this page" rail for lessons. Reads the rendered headings from the
 * desktop lesson content (marked with data-toc-root, since the MDX renders
 * twice — once for mobile, once for desktop — and we want the visible copy),
 * then highlights the current section with a scroll-spy.
 */
export function TableOfContents() {
    const pathname = usePathname()
    const [headings, setHeadings] = useState<Heading[]>([])
    const [activeId, setActiveId] = useState<string>("")
    const elementsRef = useRef<HTMLElement[]>([])

    // Collect headings from the visible (desktop) lesson content.
    useEffect(() => {
        const collect = () => {
            const root = document.querySelector("[data-toc-root]")
            if (!root) return false
            const els = Array.from(
                root.querySelectorAll<HTMLElement>("h2, h3")
            ).filter((el) => el.id)
            elementsRef.current = els
            setHeadings(
                els.map(
                    (el): Heading => ({
                        id: el.id,
                        text: headingText(el),
                        level: el.tagName === "H2" ? 2 : 3
                    })
                )
            )
            return els.length > 0
        }
        // The content is already committed to the DOM by the time this runs,
        // but retry once in case an async MDX component added headings late.
        if (!collect()) {
            const t = setTimeout(collect, 400)
            return () => clearTimeout(t)
        }
    }, [pathname])

    // Scroll-spy: highlight the heading nearest the top of the viewport.
    useEffect(() => {
        if (elementsRef.current.length === 0) return
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top - b.boundingClientRect.top
                    )
                if (visible.length > 0) {
                    setActiveId((visible[0].target as HTMLElement).id)
                }
            },
            { rootMargin: "-80px 0px -66% 0px" }
        )
        elementsRef.current.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [headings])

    if (headings.length < 2) return null

    const go = (index: number, id: string) => {
        elementsRef.current[index]?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
        setActiveId(id)
        history.replaceState(null, "", `#${id}`)
    }

    return (
        <nav aria-label="On this page" className="font-inter text-sm">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-gray-200 dark:text-gray-500">
                On this page
            </p>
            <ul className="border-l border-brand-gray-100 dark:border-gray-700">
                {headings.map((h, i) => (
                    <li key={h.id}>
                        <a
                            href={`#${h.id}`}
                            onClick={(e) => {
                                e.preventDefault()
                                go(i, h.id)
                            }}
                            className={clsx(
                                "-ml-px block border-l-2 py-1 leading-snug transition-colors",
                                h.level === 3 ? "pl-7" : "pl-4",
                                activeId === h.id
                                    ? "border-orange-500 font-medium text-orange-600 dark:text-orange-500"
                                    : "border-transparent text-brand-gray-300 hover:text-brand-dark dark:text-gray-400 dark:hover:text-gray-200"
                            )}
                        >
                            {h.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
