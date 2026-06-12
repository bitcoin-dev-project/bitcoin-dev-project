"use client"

import { useState } from "react"
import Image from "next/image"
import clsx from "clsx"
import { Check } from "lucide-react"
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
                    Note: Just because you finish this checklist doesn&apos;t
                    mean you&apos;re necessarily ready – it may take multiple
                    applications and projects to land a grant. It&apos;s like
                    dating: not every project and grantor is compatible.
                    Don&apos;t give up!
                </p>
            </div>
        </div>
    )
}

export default FundingChecklist
