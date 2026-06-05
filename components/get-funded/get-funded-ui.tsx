import React from "react"

/**
 * Inline hyperlink used throughout the get-funded path-and-stories content.
 * Per the Figma spec all hyperlinks are underlined and use the "bdp orange"
 * text colour (brand-orange-100 / #EB5234).
 */
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

/**
 * Highlighted quote / tip box that appears inside some answers.
 * Inset box with a left "bdp orange" bar on a muted background.
 */
export const Callout = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-r-lg border-l-[3px] border-brand-orange-100 bg-brand-gray/70 px-5 py-4 italic text-brand-dark/90">
        {children}
    </div>
)
