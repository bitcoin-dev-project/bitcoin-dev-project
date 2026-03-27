"use client"

import Link from "next/link"
import BDPLogo from "./assets/BDPLogo"
import BDPMenu from "./assets/BDPMenu"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import MobileMenu from "./brand/MobileMenu"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

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
                            <div className="relative group">
                                {/* Button */}
                                <button
                                    className={clsx(
                                        "px-3 py-2.5 font-quicksand capitalize font-bold rounded-[10px] transition-all duration-200 text-base flex items-center gap-1",
                                        {
                                            "bg-brand-orange text-[#EB5234] hover:bg-brand-orange-100":
                                                isHomepage,
                                            "bg-[#EB5234] text-white hover:opacity-90":
                                                !isHomepage
                                        }
                                    )}
                                >
                                    Start Exploring
                                    <span className="text-sm">
                                        <ChevronDown
                                            className="w-4 h-4 ml-0.8 mt-1 transition-transform duration-200 group-hover:rotate-180"
                                            strokeWidth={3.5}
                                        />
                                    </span>
                                </button>

                                {/* Dropdown */}
                                <div
                                    className={clsx(
                                        "absolute right-0 mt-2 w-44 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200",
                                        {
                                            "bg-brand-orange": !isHomepage
                                        }
                                    )}
                                >
                                    <div className="flex flex-col py-2 text-base font-quicksand text-black">
                                        <Link
                                            href="/learn"
                                            className="px-4 py-2 hover:text-[#EB5234] transition-colors"
                                        >
                                            Learn
                                        </Link>

                                        <Link
                                            href="/contribute"
                                            className="px-4 py-2 hover:text-[#EB5234] transition-colors"
                                        >
                                            Contribute
                                        </Link>

                                        <Link
                                            href="/get-funded"
                                            className="px-4 py-2 hover:text-[#EB5234] transition-colors"
                                        >
                                            Get Funded
                                        </Link>
                                    </div>
                                </div>
                            </div>
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
