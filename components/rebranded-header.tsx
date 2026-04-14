"use client"

import Link from "next/link"
import BDPLogo from "./assets/BDPLogo"
import BDPLogoDark from "./assets/BDPLogoDark"
import BDPMenu from "./assets/BDPMenu"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import MobileMenu from "./brand/MobileMenu"
import { useState } from "react"
import StartExploringDropdown from "@/components/StartExploringDropdown"

export function RebrandedHeader() {
    const pathname = usePathname()
    const isHomepage = pathname === "/"
    const isDecoding = pathname?.startsWith("/decoding")
    const isDarkMode = isDecoding
    const [isOpen, setIsOpen] = useState(false)
    const onOpen = () => {
        setIsOpen((prev) => !prev)
    }
    return (
        <>
            <header className={clsx("sticky top-0 z-50", isDarkMode ? "bg-black" : "bg-brand-orange")}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
                    <div className="flex items-center justify-between h-20 ">
                        <Link href="/">
                            {isDarkMode ? <BDPLogoDark /> : <BDPLogo />}
                        </Link>
                        <div className="hidden items-center gap-6 lg:flex lg:flex-row">
                            <Link
                                href="/about"
                                className={clsx("font-quicksand transition-colors text-base", isDarkMode ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700")}
                            >
                                About
                            </Link>
                            <StartExploringDropdown
                                variant={isHomepage ? "light" : "dark"}
                            />
                        </div>
                        <BDPMenu
                            onClick={onOpen}
                            className={clsx("lg:hidden", {
                                "text-white": isHomepage || isDarkMode,
                                "text-black": !isHomepage && !isDarkMode
                            })}
                        />
                    </div>
                </div>
            </header>
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}
