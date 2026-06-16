"use client"

import { useState } from "react"
import Image from "next/image"
import clsx from "clsx"
import { Check } from "lucide-react"
import { FUNDING_CHECKLIST, type ChecklistLink } from "@/data/get-funded"

/**
 * Render a label string, turning any segments listed in `links` into anchors.
 * Link clicks stop propagation so they open the URL instead of toggling the row.
 */
const renderLabel = (label: string, links?: ChecklistLink[]) => {
    if (!links?.length) return label

    const escaped = links.map((l) =>
        l.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    )
    const parts = label.split(new RegExp(`(${escaped.join("|")})`, "g"))

    return parts.map((part, i) => {
        const link = links.find((l) => l.text === part)
        if (!link) return part
        return (
            <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-brand-orange-100 underline underline-offset-2 transition-colors hover:text-brand-orange-200"
            >
                {part}
            </a>
        )
    })
}

const CheckBox = ({
    checked,
    onToggle,
    label,
    links
}: {
    checked: boolean
    onToggle: () => void
    label: string
    links?: ChecklistLink[]
}) => (
    <div className="flex items-center gap-4 text-left font-quicksand">
        <button
            type="button"
            onClick={onToggle}
            aria-pressed={checked}
            aria-label={label}
            className={clsx(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors",
                checked
                    ? "border-brand-orange-100 bg-brand-orange-100 text-white"
                    : "border-brand-gray-200 bg-brand"
            )}
        >
            {checked && <Check className="h-4 w-4" strokeWidth={3} />}
        </button>
        <span
            onClick={onToggle}
            className={clsx(
                "cursor-pointer text-lg leading-snug transition-colors",
                checked
                    ? "text-brand-dark/50 line-through"
                    : "text-brand-dark/90"
            )}
        >
            {renderLabel(label, links)}
        </span>
    </div>
)

/**
 * Interactive "Check off your funding prep" checklist; state is local (resets
 * on reload). Styled as a tear-off ticket with a scalloped left edge.
 */
const FundingChecklist = () => {
    const [checked, setChecked] = useState<Record<string, boolean>>({})
    const toggle = (key: string) =>
        setChecked((prev) => ({ ...prev, [key]: !prev[key] }))

    return (
        <div className="relative overflow-hidden rounded-2xl bg-brand-card">
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
            {/* Dashed tear line (long dashes) */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-y-6 left-10 w-px"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(to bottom, #A9A49B 0 10px, transparent 10px 18px)"
                }}
            />

            <div className="py-7 pl-14 pr-5 lg:pl-20 lg:pr-10">
                <div className="mb-6 flex items-end justify-center gap-3 border-b border-brand-gray-100 sm:gap-4">
                    <Image
                        src="/images/get-funded/checklist.webp"
                        alt=""
                        width={317}
                        height={240}
                        className="h-16 w-auto shrink-0 lg:h-24"
                    />
                    <h3 className="pb-3 font-montserrat text-lg font-semibold italic text-brand-dark lg:text-2xl">
                        Check off your funding prep
                    </h3>
                </div>

                <div className="flex flex-col gap-5">
                    {FUNDING_CHECKLIST.map((item) => {
                        const key = item.label
                        return (
                            <div key={key} className="flex flex-col gap-5">
                                <CheckBox
                                    checked={!!checked[key]}
                                    onToggle={() => toggle(key)}
                                    label={item.label}
                                    links={item.links}
                                />
                                {item.children && (
                                    <div className="ml-8 flex flex-col gap-5 sm:ml-12">
                                        {item.children.map((child) => {
                                            const childKey = `${key}::${child.label}`
                                            return (
                                                <CheckBox
                                                    key={childKey}
                                                    checked={
                                                        !!checked[childKey]
                                                    }
                                                    onToggle={() =>
                                                        toggle(childKey)
                                                    }
                                                    label={child.label}
                                                    links={child.links}
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
                    Note: Just because you finish this checklist doesn&apos;t
                    mean you&apos;re necessarily ready – it may take multiple
                    applications and projects to land a grant.
                    Don&apos;t give up!
                </p>
            </div>
        </div>
    )
}

export default FundingChecklist
