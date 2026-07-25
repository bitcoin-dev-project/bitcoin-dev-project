import clsx from "clsx"

export function Prose<T extends React.ElementType = "div">({
    as,
    className,
    ...props
}: React.ComponentPropsWithoutRef<T> & {
    as?: T
}) {
    let Component = as ?? "div"

    return (
        <Component
            className={clsx(
                className,
                "prose mx-auto dark:prose-invert font-inter text-[16px] leading-[1.7]",
                // Text and components share one column width so they all align
                "[&>*]:max-w-[760px] [&>*]:mx-auto",
                // Override for full-width components
                "[&>.full-width]:max-w-5xl [&>.full-width]:w-full",
                // links: body-colored text, thin orange underline that strengthens on hover
                "prose-a:text-current prose-a:font-normal prose-a:underline prose-a:decoration-1 prose-a:underline-offset-4",
                "prose-a:decoration-orange-500/50 prose-a:hover:decoration-orange-500",
                // inline code (not inside pre) — subtle chip + brick-red token color, docs-style
                "prose-code:break-words prose-code:rounded prose-code:border prose-code:border-[#E5DFD4] prose-code:bg-[#F1ECE3] prose-code:px-1 prose-code:py-0.5 prose-code:font-normal prose-code:text-[#A23C31] prose-code:before:content-[''] prose-code:after:content-['']",
                "dark:prose-code:bg-[#2a2a2b]",
                // code inside pre (remove chip bg/border, keep the light fenced-code text)
                "[&_pre_code]:!bg-transparent [&_pre_code]:!border-0 [&_pre_code]:text-[#d4d4d4]",
                // Specific styles for code inside li
                // unordered list
                "prose-ul:pl-0",
                "[&_ul]:list-none",
                "[&_ul>li]:relative [&_ul>li]:pl-6",
                "[&_ul>li]:before:content-['•'] [&_ul>li]:before:absolute [&_ul>li]:before:left-1.5 [&_ul>li]:before:top-1/2 [&_ul>li]:before:-translate-y-1/2 [&_ul>li]:before:text-brand-gray-200",
                // ordered list
                "[&_ol>li]:marker:text-orange-500",
                // Cancel custom list styling for elements with not-prose class
                "[&_.not-prose_ul]:list-disc [&_.not-prose_ul]:pl-5",
                "[&_.not-prose_ol]:list-decimal [&_.not-prose_ol]:pl-5",
                "[&_.not-prose_li]:pl-0 [&_.not-prose_li]:before:content-none",
                "[&_.not-prose_ol>li]:marker:text-current",
                // Unset color for specific elements
                "[&_thead_th]:text-current",
                // Ensure headings and strong text use the current text color
                "[&_h1]:text-current [&_h2]:text-current [&_h3]:text-current [&_h4]:text-current",
                "[&_strong]:text-current",
                // Headings stay on Inter (sans) — understated weight, tight tracking
                "[&_h1]:font-inter [&_h2]:font-inter [&_h3]:font-inter [&_h4]:font-inter",
                "[&_h2]:font-semibold [&_h2]:tracking-[-0.015em] [&_h3]:font-semibold [&_h3]:tracking-[-0.01em]",
                // Claude-like vertical rhythm: roomy space above headings, tight below
                "[&_h2]:mt-[1.9em] [&_h2]:mb-[0.6em] [&_h3]:mt-[1.7em] [&_h3]:mb-[0.5em]",
                // Keep code/monospace off the serif
                "[&_code]:font-mono [&_pre]:font-mono",
                // fenced code blocks: same solid dark surface as <CodeSnippet>
                "[&_pre]:bg-[#1e1e1e] [&_pre]:text-[#d4d4d4]"
            )}
            {...props}
        />
    )
}
