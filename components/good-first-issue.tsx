"use client"

import Link from "next/link"
import BDPLogoDark from "./assets/BDPLogoDark"
import BDPMobileIcon from "./assets/BDPMobileIcon"
import BDPMenu from "./assets/BDPMenu"
import React, { Dispatch, SetStateAction } from "react"
import { ChevronDown } from "lucide-react"

const GoodFirstIssuesNavbar = ({
    setIsOpen
}: {
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
    const onOpen = () => {
        setIsOpen((prev) => !prev)
    }
    return (
        <nav className=" sticky top-0 z-10 flex items-center justify-between max-w-desktop-max mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-20">
            <Link href="/" className="flex items-center flex-shrink-0">
                <BDPLogoDark className="lg:w-[119px] hidden lg:block" />
                <BDPMobileIcon className="w-[45px] lg:hidden" />
            </Link>
            <div className="hidden items-center gap-6 lg:flex lg:flex-row font-quicksand">
                <Link
                    href="/about"
                    className="text-white font-medium hover:opacity-80 transition-opacity text-base"
                >
                    About
                </Link>
                <div className="relative group">
                    {/* Button */}
                    <button className="px-3 py-3 bg-brand-orange-100 text-white font-bold rounded-[10px] transition-all duration-200 text-base leading-none flex items-center gap-1 font-quicksand hover:opacity-90">
                        Start Exploring
                        <ChevronDown
                            className="w-4 h-4 mt-1 ml-0.5 transition-transform duration-200 group-hover:rotate-180"
                            strokeWidth={3.5}
                        />
                    </button>

                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-44 rounded-xl bg-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="flex flex-col py-2 text-base font-quicksand">
                            <Link
                                href="/learn"
                                className="px-4 py-2 hover:text-brand-orange-100 transition-colors"
                            >
                                Learn
                            </Link>

                            <Link
                                href="/contribute"
                                className="px-4 py-2 hover:text-brand-orange-100 transition-colors"
                            >
                                Contribute
                            </Link>

                            <Link
                                href="/get-funded"
                                className="px-4 py-2 hover:text-brand-orange-100 transition-colors"
                            >
                                Get Funded
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <BDPMenu onClick={onOpen} className="text-white lg:hidden" />
        </nav>
    )
}

export default GoodFirstIssuesNavbar
