"use client"

import { useState } from "react"
import Image from "next/image"
import clsx from "clsx"
import { Check, Download } from "lucide-react"
import { FUNDING_CHECKLIST } from "@/data/get-funded"

const CheckBox = ({
    checked,
    onToggle,
    label
}: {
    checked: boolean
    onToggle: () => void
    label: string
}) => (
    <button
        type="button"
        onClick={onToggle}
        aria-pressed={checked}
        className="flex items-center gap-4 text-left font-quicksand"
    >
        <span
            className={clsx(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors",
                checked
                    ? "border-brand-orange-100 bg-brand-orange-100 text-white"
                    : "border-brand-gray-200 bg-brand"
            )}
        >
            {checked && <Check className="h-4 w-4" strokeWidth={3} />}
        </span>
        <span
            className={clsx(
                "text-lg leading-snug transition-colors",
                checked
                    ? "text-brand-dark/50 line-through"
                    : "text-brand-dark/90"
            )}
        >
            {label}
        </span>
    </button>
)

/**
 * Interactive "Check off your funding prep" checklist. State is local — it
 * resets on reload and is purely a self-tracking aid for the reader. The card
 * is styled as a tear-off "ticket" with a scalloped left edge and dashed line.
 */
const FundingChecklist = () => {
    const [checked, setChecked] = useState<Record<string, boolean>>({})
    const toggle = (key: string) =>
        setChecked((prev) => ({ ...prev, [key]: !prev[key] }))

    return (
        <div className="relative overflow-hidden rounded-2xl bg-brand-gray">
            {/* Scalloped left edge (page-coloured notches) */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-4"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at left, #F6F0E6 0 7px, transparent 7.5px)",
                    backgroundSize: "100% 26px",
                    backgroundRepeat: "repeat-y"
                }}
            />
            {/* Dashed tear line */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-y-6 left-10 border-l border-dashed border-brand-gray-200"
            />

            <div className="py-7 pl-14 pr-5 lg:pl-20 lg:pr-10">
                {/* Header */}
                <div className="mb-6 flex items-center gap-3 border-b border-brand-gray-100 pb-5 sm:gap-4">
                    <Image
                        src="/images/get-funded/checklist.webp"
                        alt=""
                        width={120}
                        height={80}
                        className="h-14 w-auto shrink-0 lg:h-20"
                    />
                    <h3 className="flex-1 font-montserrat text-lg font-bold italic text-brand-dark lg:text-2xl">
                        Check off your funding prep
                    </h3>
                    <a
                        href="/images/get-funded/funding-prep-checklist.pdf"
                        download
                        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-gray-200 px-3 py-2 font-quicksand text-sm font-medium text-brand-dark/60 transition-colors hover:border-brand-orange-100 hover:text-brand-orange-100 lg:px-4"
                    >
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">
                            Download Checklist
                        </span>
                    </a>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-5">
                    {FUNDING_CHECKLIST.map((item) => {
                        const key = item.label
                        return (
                            <div key={key} className="flex flex-col gap-5">
                                <CheckBox
                                    checked={!!checked[key]}
                                    onToggle={() => toggle(key)}
                                    label={item.label}
                                />
                                {item.children && (
                                    <div className="ml-8 flex flex-col gap-5 sm:ml-12">
                                        {item.children.map((child) => {
                                            const childKey = `${key}::${child}`
                                            return (
                                                <CheckBox
                                                    key={childKey}
                                                    checked={
                                                        !!checked[childKey]
                                                    }
                                                    onToggle={() =>
                                                        toggle(childKey)
                                                    }
                                                    label={child}
                                                />
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <p className="mt-7 border-t border-brand-gray-100 pt-5 font-quicksand text-sm italic text-brand-dark/60">
                    Note: just because you finish this checklist doesn&apos;t
                    mean you&apos;ll be developer-ready — it may take multiple
                    applications and a lot of prep to land a grant. It&apos;s
                    like dating: not every project and grantor is a compatible
                    match. Don&apos;t give up!
                </p>
            </div>
        </div>
    )
}

export default FundingChecklist
