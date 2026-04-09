"use client"
import { BITCOINPATHS } from "@/utils"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export const ExploreSection = () => {
    return (
        <div className="bg-[#F5EFE7] pt-24">
            <div className="max-w-7xl mx-auto px-8 py-12 sm:py-16 md:py-20 lg:py-24">
                <h2 className="text-2xl leading-[1.75rem] font-bold text-[#2C2C2C] text-center uppercase font-montserrat">
                    explore your path to bitcoin
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 md:mt-16">
                    {BITCOINPATHS.map((path) => (
                        <div key={path.title} className="flex flex-col gap-4">
                            {/* Image Card */}
                            <div className="relative rounded-[20px] overflow-hidden aspect-square bg-brand-gray border border-brand-stroke-on-base">
                                <Image
                                    src={path.image}
                                    alt={path.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col gap-3 px-1">
                                <h3 className="text-xl sm:text-2xl font-bold text-brand-dark uppercase font-montserrat">
                                    {path.title}
                                </h3>
                                <p className="text-brand-dark text-sm sm:text-base font-quicksand leading-relaxed">
                                    {path.description}
                                </p>
                                <Link
                                    href={path.link}
                                    className="inline-flex items-center bg-brand-gray border border-[#A9A49B]/75 rounded-full px-4 py-2 w-fit transition-colors duration-200 hover:bg-[#A9A49B]/20"
                                >
                                    <span className="text-xs sm:text-sm font-normal text-brand-dark font-quicksand">
                                        {path.cta}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExploreSection
