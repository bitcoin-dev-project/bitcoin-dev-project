"use client"

import Link from "next/link"
import BDPLogoDark from "./assets/BDPLogoDark"
import BDPMobileIcon from "./assets/BDPMobileIcon"
import BDPMenu from "./assets/BDPMenu"
import React, { Dispatch, SetStateAction } from "react"

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
                <Link
                    href="/explore"
                    className="px-3 capitalize py-3 bg-brand-orange-100 text-white font-bold rounded-[10px] hover:opacity-90 transition-all duration-200 text-base leading-none"
                >
                    Start exploring
                </Link>
            </div>
            <BDPMenu onClick={onOpen} className="text-white lg:hidden" />
        </nav>
    )
}

export default GoodFirstIssuesNavbar
