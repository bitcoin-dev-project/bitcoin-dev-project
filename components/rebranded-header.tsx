"use client"

import Link from "next/link"
import BDPLogo from "./assets/BDPLogo"

export function RebrandedHeader() {
    return (
        <header className="bg-brand-orange ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-20">
                    <BDPLogo />
                    <div className="flex items-center gap-6">
                        <Link
                            href="/about"
                            className="text-black font-semibold hover:text-gray-700 transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#EB5234] text-[#F6F0E6] font-semibold rounded-[10px] hover:bg-[#d94428] transition-all duration-200 hover:scale-105"
                        >
                            <span>Start exploring</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
