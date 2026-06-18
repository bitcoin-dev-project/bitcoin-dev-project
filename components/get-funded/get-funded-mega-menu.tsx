"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import clsx from "clsx"
import { ChevronDown } from "lucide-react"
import { NAV_SECTIONS } from "@/data/path-and-stories"

/**
 * "Get Funded" header item with a hover mega-menu of the get-funded sections.
 * JS-controlled so it can close on item click (as well as mouse-leave/blur/Escape).
 */
const GetFundedMegaMenu = ({ isDarkMode }: { isDarkMode?: boolean }) => {
    const pathname = usePathname() ?? ""
    const isActive = pathname.startsWith("/get-funded")
    const [open, setOpen] = useState(false)
    const close = () => setOpen(false)

    const MenuColumn = ({ sections, close }: { sections: typeof NAV_SECTIONS; close: () => void }) => (
        <div className="flex flex-col gap-y-6">
            {sections.map((section) => (
                <div key={section.title} className="flex flex-col gap-2.5">
                    {section.href ? (
                        <Link
                            href={section.href}
                            onClick={close}
                            className="font-montserrat text-xs font-bold uppercase tracking-wide text-brand-dark/50 transition-colors hover:text-brand-orange-100"
                        >
                            {section.title}
                        </Link>
                    ) : (
                        <h3 className="font-montserrat text-xs font-bold uppercase tracking-wide text-brand-dark/50">
                            {section.title}
                        </h3>
                    )}
                    <ul className="flex flex-col gap-2">
                        {section.items.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={close}
                                    className="font-quicksand text-sm leading-snug text-brand-dark/80 transition-colors hover:text-brand-orange-100"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={close}
            onFocus={() => setOpen(true)}
            onBlur={(event) => {
                if (
                    !event.currentTarget.contains(event.relatedTarget as Node)
                ) {
                    close()
                }
            }}
            onKeyDown={(event) => {
                if (event.key === "Escape") close()
            }}
        >
            <Link
                href="/get-funded"
                onClick={close}
                aria-expanded={open}
                className={clsx(
                    "inline-flex items-center gap-1 font-quicksand text-base transition-colors",
                    isActive
                        ? "text-brand-orange-100"
                        : isDarkMode
                          ? "text-white hover:text-gray-300"
                          : "text-black hover:text-gray-700"
                )}
            >
                Get Funded
                <ChevronDown
                    className={clsx(
                        "mt-0.5 h-4 w-4 transition-transform duration-200",
                        open && "rotate-180"
                    )}
                    strokeWidth={2.5}
                />
            </Link>

            <div
                className={clsx(
                    "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-150",
                    open ? "visible opacity-100" : "invisible opacity-0"
                )}
            >
             <div className="flex w-[36rem] gap-x-10 rounded-2xl border border-black/5 bg-[#F3EFEA] p-6 shadow-lg">
                <div className="flex flex-col gap-y-6">
                    <MenuColumn sections={NAV_SECTIONS.filter(s => s.columnIndex === 1)} close={close} />
                </div>
                <div className="flex flex-col gap-y-6">
                    <MenuColumn sections={NAV_SECTIONS.filter(s => s.columnIndex === 2)} close={close} />
                </div>
                </div>
            </div>
        </div>
    )
}

export default GetFundedMegaMenu
