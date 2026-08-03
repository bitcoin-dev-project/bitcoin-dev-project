import React from "react"

interface ExerciseProps {
    /**
     * Heading for the exercise. Rendered as a real <h2 id> so it still reaches
     * the "On this page" rail, which collects headings from the DOM.
     */
    title: string
    /** One line under the title: what the reader builds, and that it's skippable. */
    intro?: string
    /** Pill text. Pass an empty string to drop the pill. */
    badge?: string
    children: React.ReactNode
}

// Matches rehype-slug closely enough for the ids MDX headings would have had.
const slugify = (text: string) =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")

/**
 * Wraps an optional, hands-on block (playground + hint + solution) so it reads
 * as a different zone of the page than the lesson body. The panel is lighter
 * than the page cream, i.e. a lit workbench the prose sits around, and the
 * pill states up front that skipping it costs the reader nothing.
 */
export default function Exercise({
    title,
    intro,
    badge = "Optional",
    children
}: ExerciseProps) {
    return (
        <section
            aria-label={`${badge ? `${badge} exercise` : "Exercise"}: ${title}`}
            // full-width is Prose's escape hatch: direct children are otherwise
            // clamped to the 760px reading column, which left the code editor
            // inside narrower than it was before it got a panel around it.
            className="full-width mx-auto my-12 rounded-xl border border-brand-stroke-on-base bg-brand-gray px-8 py-7 dark:border-stone-700 dark:bg-stone-900/40"
        >
            {/* Pill above the title, not beside it, so the pill, heading,
                intro and body all start on the same left edge. */}
            <div className="not-prose">
                {badge && (
                    <span className="inline-block rounded-full bg-[#FAEBE3] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                        {badge}
                    </span>
                )}
                {/* !mt/!mb are load-bearing: Prose sets [&_h2]:mt-[1.9em] as a
                    descendant rule, which outranks a plain m-0 here and which
                    not-prose does not switch off (it only disables the
                    typography plugin's own :where() rules). */}
                <h2
                    id={slugify(title)}
                    className={`!mb-0 text-lg font-semibold ${
                        badge ? "!mt-2" : "!mt-0"
                    }`}
                >
                    {title}
                </h2>
            </div>

            {intro && (
                <p className="not-prose mt-2 text-sm leading-relaxed text-brand-gray-300 dark:text-stone-400">
                    {intro}
                </p>
            )}

            {/* Collapse the outer margins of the first/last block so the
                section padding stays the padding, and drop the inner blocks'
                own width caps (ExpandableAlert ships max-w-3xl) so everything
                lines up with the panel edges rather than floating centered. */}
            <div className="mt-5 [&>*]:!max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                {children}
            </div>
        </section>
    )
}
