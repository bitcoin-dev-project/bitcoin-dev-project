"use client"

import Link from "next/link"
import BDPLogo from "./assets/BDPLogo"

export function RebrandedHeader() {
    return (
        <header className="bg-brand-orange ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-20">
                    <Link href="/">
                        <BDPLogo />
                    </Link>
                    <div className="flex items-center gap-6">
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
                </div>
            </div>
        </header>
    )
}
