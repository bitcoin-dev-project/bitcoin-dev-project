"use client"

import Link from "next/link"
import Image from "next/image"
import { RightArrowIcon } from "@bitcoin-dev-project/bdp-ui/icons"

export function RebrandedHeader() {
    return (
        <header className="bg-[#F6F0E6] border-b-2 border-[#E1DBD0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src="/images/bdp-logo.png"
                            alt="BDP Logo"
                            width={120}
                            height={40}
                            className="h-10 w-auto"
                            priority
                        />
                    </Link>

                    {/* Navigation Links and Button */}
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
                            <RightArrowIcon
                                width={14}
                                className="text-[#F6F0E6]"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
