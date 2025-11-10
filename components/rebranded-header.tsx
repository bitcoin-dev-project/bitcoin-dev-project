"use client"

import Link from "next/link"
import Image from "next/image"

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
                            className="text-black font-medium hover:text-gray-700 transition-colors text-base"
                        >
                            About
                        </Link>
                        <Link
                            href="/explore"
                            className="px-6 py-3 bg-[#EB5234] text-white font-medium rounded-[10px] hover:opacity-90 transition-all duration-200 text-base"
                        >
                            Start exploring
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
