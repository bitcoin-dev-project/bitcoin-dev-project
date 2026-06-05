"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import clsx from "clsx"
import { NAV_SECTIONS, type NavItem } from "@/data/path-and-stories"

/**
 * Reusable left-hand navigation index for the get-funded page and its
 * path-and-stories sub-pages.
 *
 * - Desktop: a sticky vertical index of all sections.
 * - Mobile: a sticky dropdown the user can open to jump between sections
 *   (mirrors the behaviour of the btctranscripts transcript navigation).
 */

const isItemActive = (pathname: string, item: NavItem) => {
    // Anchor links on the main get-funded page are never "active".
    if (item.href.includes("#")) return false
    const base = item.href.replace(/\/$/, "")
    return pathname === base || pathname === `${base}/`
}

const NavTree = ({
    pathname,
    onNavigate
}: {
    pathname: string
    onNavigate?: () => void
}) => (
    <nav className="flex flex-col gap-6 font-quicksand">
        {NAV_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-2.5">
                {section.href ? (
                    <Link
                        href={section.href}
                        onClick={onNavigate}
                        className="text-sm font-bold uppercase tracking-wide text-brand-dark/50 font-montserrat hover:text-brand-orange-100"
                    >
                        {section.title}
                    </Link>
                ) : (
                    <h3 className="text-sm font-bold uppercase tracking-wide text-brand-dark/50 font-montserrat">
                        {section.title}
                    </h3>
                )}
                <ul className="flex flex-col gap-2.5">
                    {section.items.map((item) => {
                        const active = isItemActive(pathname, item)
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={onNavigate}
                                    aria-current={active ? "page" : undefined}
                                    className={clsx(
                                        "text-[15px] leading-snug transition-colors",
                                        active
                                            ? "text-brand-orange-100 font-semibold"
                                            : "text-brand-dark/80 hover:text-brand-orange-100"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        ))}
    </nav>
)

const GetFundedSidebar = () => {
    const pathname = usePathname() ?? ""
    const [open, setOpen] = useState(false)

    const activeItem = NAV_SECTIONS.flatMap((section) => section.items).find(
        (item) => isItemActive(pathname, item)
    )
    const currentLabel = activeItem?.label ?? "Browse sections"

    return (
        <>
            {/* Desktop index */}
            <aside className="hidden lg:block lg:sticky lg:top-10 self-start">
                <NavTree pathname={pathname} />
            </aside>

            {/* Mobile dropdown navigation */}
            <div className="lg:hidden sticky top-0 z-30 -mx-4 mb-2 bg-brand/95 px-4 py-3 backdrop-blur">
                <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-3 rounded-xl border border-brand-stroke-on-base bg-brand px-4 py-3 font-quicksand font-semibold text-brand-dark"
                >
                    <span className="truncate text-left">{currentLabel}</span>
                    <ChevronDown
                        className={clsx(
                            "h-5 w-5 shrink-0 transition-transform",
                            open && "rotate-180"
                        )}
                    />
                </button>
                {open && (
                    <div className="mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-brand-stroke-on-base bg-brand p-4">
                        <NavTree
                            pathname={pathname}
                            onNavigate={() => setOpen(false)}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default GetFundedSidebar
