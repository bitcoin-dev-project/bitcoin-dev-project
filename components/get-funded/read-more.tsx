"use client"

import { useState } from "react"

/**
 * Inline expandable text. Shows `children` only after the reader clicks
 * "Read more"; collapses again on "Read less".
 */
const ReadMore = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            {open && <div className="flex flex-col gap-4">{children}</div>}
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="w-max font-quicksand font-semibold text-brand-orange-100 underline underline-offset-2 hover:opacity-80"
            >
                {open ? "Read less" : "Read more"}
            </button>
        </>
    )
}

export default ReadMore
