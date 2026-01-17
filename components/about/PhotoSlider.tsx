"use client"

import Image from "next/image"
import { useState, useRef } from "react"

export function PhotoSlider() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const photos = [
        {
            src: "/images/about/developer-day-talk.webp",
            alt: "Btrust Developer Day 2024",
            badge: "@Btrust Developer Day 2024",
            badgeColor: "bg-orange-500"
        },
        {
            src: "/images/about/bdp-talk-at-developer-day.webp",
            alt: "Developer Day 2024",
            badge: "@Btrust Developer Day '24",
            badgeColor: "bg-pink-500"
        },
        {
            src: "/images/about/saving-satoshi-at-tabconf.webp",
            alt: "Saving Satoshi Team at TABConf 2024",
            badge: "Saving Satoshi @ TABConf '24",
            badgeColor: "bg-purple-500"
        },
        {
            src: "/images/about/warnet-at-tabconf.webp",
            alt: "Warnet at TABCONF 2025",
            badge: "Warnet @TABCONF '25",
            badgeColor: "bg-orange-600"
        },
        {
            src: "/images/about/become-world-best-contributors.webp",
            alt: "BDP Contributor",
            badge: "BDP Contributor with BDP",
            badgeColor: "bg-green-600"
        },
        {
            src: "/images/about/bdp-in-waterloo.webp",
            alt: "Bitcoin Presentation",
            badge: ""
        }
    ]
    const infiniteScroll = [...photos, ...photos, ...photos]

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } =
                scrollContainerRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400
            const newScrollLeft =
                scrollContainerRef.current.scrollLeft +
                (direction === "left" ? -scrollAmount : scrollAmount)
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth"
            })
            setTimeout(checkScroll, 300)
        }
    }

    return (
        <div className="w-full py-16 pl-4 lg:pl-8">
            <div className="relative  w-full">
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}

                    className="flex gap-4 md:gap-8 w-full max-w-[calc(100dvw)] overflow-x-auto scroll-smooth hide-scrollbar pb-4 snap-x snap-mandatory pr-4 lg:pr-0"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {infiniteScroll.map((photo, index) => (
                        <div
                            key={index}
                           
                            className={`flex-shrink-0 relative w-[85vw] md:w-75 h-60 lg:w-[500px] lg:h-96 snap-center`}
                        >
                            <div className="relative w-full h-full rounded-3xl overflow-hidden">
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    fill
                                    className="object-cover"
                                />
                                {photo.badge && (
                                    <div
                                        className={`absolute ${index === 0 ? "top-4 left-4" : "bottom-4 left-4"} z-20`}
                                    >
                                        <span
                                            className={`${photo.badgeColor} text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg whitespace-nowrap`}
                                        >
                                            {photo.badge}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    )
}