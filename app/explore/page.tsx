"use client"

import { Wrapper } from "@/components/Wrapper"
import { RebrandedHeader } from "@/components/rebranded-header"
import { ExploreContent } from "@/components/explore/ExploreContent"
import Image from "next/image"
import { useState } from "react"

type Section = "learn" | "contribute" | "funded"

export default function Explore() {
    const [activeSection, setActiveSection] = useState<Section>("learn")

    const images = {
        learn: "/images/explore/backpack-illustration.png",
        contribute: "/images/explore/contribute-illustration.png",
        funded: "/images/explore/funded-illustration.png"
    }

    return (
        <>
            <Wrapper>
                <div className="flex flex-col text-brand-dark lg:flex-row items-center justify-between gap-16 py-16 px-8 max-sm:px-4 min-h-[calc(100vh-80px)]">
                    {/* Left Content */}
                    <ExploreContent onSectionChange={setActiveSection} />

                    {/* Right Image - Changes based on active section */}
                    <div className="flex-1 max-w-2xl w-full">
                        <Image
                            key={activeSection}
                            src={images[activeSection]}
                            alt={`${activeSection} illustration`}
                            width={600}
                            height={600}
                            className="w-full h-auto object-contain transition-opacity duration-300"
                        />
                    </div>
                </div>
            </Wrapper>
        </>
    )
}
