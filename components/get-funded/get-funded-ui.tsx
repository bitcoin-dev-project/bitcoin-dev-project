import React from "react"

/** Inline hyperlink: underlined and "bdp orange" (brand-orange-100), per Figma. */
export const ExtLink = ({
    href,
    children
}: {
    href: string
    children: React.ReactNode
}) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-orange-100 underline underline-offset-2 hover:opacity-80"
    >
        {children}
    </a>
)

/** Highlighted quote/tip box with a left "bdp orange" bar. */
export const Callout = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-r-lg border-l-[3px] border-brand-orange-100 bg-brand-gray px-5 py-4 italic text-brand-dark/90">
        {children}
    </div>
)
