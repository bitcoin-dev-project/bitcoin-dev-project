"use client"

import Link from "next/link"
import BDPLogo from "./assets/BDPLogo"
import BDPMenu from "./assets/BDPMenu"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import MobileMenu from "./brand/MobileMenu"
import { useState } from "react"

export function RebrandedHeader() {
    const pathname = usePathname()
    const isHomepage = pathname === "/"
    const [isOpen, setIsOpen] = useState(false)
    const onOpen = () => {
        setIsOpen((prev) => !prev)
    }
    return (
        <>
            <header className="bg-brand-orange sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
                    <div className="flex items-center justify-between h-20 ">
                        <Link href="/">
                            <BDPLogo />
                        </Link>
                        <div className="hidden items-center gap-6 lg:flex lg:flex-row">
                            <Link
                                href="/about"
                                className="text-black font-quicksand hover:text-gray-700 transition-colors text-base"
                            >
                                About
                            </Link>
                            <Link
                                href="/explore"
                                className="px-3 py-2.5 font-quicksand capitalize bg-[#EB5234] text-white font-bold rounded-[10px] hover:opacity-90 transition-all duration-200 text-base"
                            >
                                <span>Start exploring</span>
                            </Link>
                        </div>
                        <BDPMenu
                            onClick={onOpen}
                            className={clsx("lg:hidden", {
                                isHomepage: "text-white",
                                "text-black": !isHomepage
                            })}
                        />
                    </div>
                </div>
            </header>
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}
