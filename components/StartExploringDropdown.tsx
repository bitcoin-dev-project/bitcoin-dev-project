"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import clsx from "clsx"

interface Props {
    variant?: "light" | "dark"
}

export default function StartExploringDropdown({ variant = "dark" }: Props) {
    const isLight = variant === "light"

    return (
        <div className="relative group">
            {/* Button */}
            <Link
                href="/learn"
                aria-haspopup="menu"
                className={clsx(
                    "px-3 py-2.5 font-quicksand font-bold rounded-[10px] transition-all duration-200 text-base flex items-center gap-1",
                    {
                        "bg-white text-brand-orange-100 hover:bg-gray-50":
                            isLight,
                        "bg-brand-orange-100 text-white hover:opacity-90":
                            !isLight
                    }
                )}
            >
                Start Exploring
                <ChevronDown
                    className="w-4 h-4 ml-0.5 mt-0.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                    strokeWidth={3}
                />
            </Link>

            {/* Dropdown */}
            <div
                role="menu"
                className={clsx(
                    "absolute right-0 mt-2 w-full rounded-xl shadow-lg border border-black/5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200",
                    {
                        "bg-white": isLight, // homepage
                        "bg-[#F3EFEA]": !isLight // other pages
                    }
                )}
            >
                <div className="flex flex-col py-2 text-base font-quicksand text-black">
                    <Link
                        href="/learn"
                        className="px-4 py-2 hover:text-brand-orange-100"
                    >
                        Learn
                    </Link>
                    <Link
                        href="/contribute"
                        className="px-4 py-2 hover:text-brand-orange-100"
                    >
                        Contribute
                    </Link>
                    <Link
                        href="/get-funded"
                        className="px-4 py-2 hover:text-brand-orange-100"
                    >
                        Get Funded
                    </Link>
                </div>
            </div>
        </div>
    )
}
