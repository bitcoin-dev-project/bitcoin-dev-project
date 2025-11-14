"use client"

import Image from "next/image"
import { useState, useRef } from "react"

export function PhotoSlider() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const photos = [
        { 
            src: "/images/about/bitcoinrodeo-2024.png", 
            alt: "Bitcoinrodeo 24 Conference",
            badge: "@Bitcoinrodeo 24'",
            badgeColor: "bg-orange-500",
            rotation: "-rotate-3"
        },
        { 
            src: "/images/about/african-bitcoin-conference-2024.png", 
            alt: "African Bitcoin Conference 2024",
            badge: "@African Bitcoin Conference '24",
            badgeColor: "bg-pink-500",
            rotation: "rotate-2"
        },
        { 
            src: "/images/about/saving-satoshi-team-tabconf-2024.png", 
            alt: "Saving Satoshi Team at TABConf 2024",
            badge: "Saving Satoshi @ TABConf '24",
            badgeColor: "bg-purple-500",
            rotation: "-rotate-2"
        },
        { 
            src: "/images/about/warnet-tabconf-2025.png", 
            alt: "Warnet at TABCONF 2025",
            badge: "Warnet @TABCONF '25",
            badgeColor: "bg-orange-600",
            rotation: "rotate-3"
        },
        { 
            src: "/images/about/bdp-contributor.png", 
            alt: "BDP Contributor",
            badge: "Become World's Best Contributor with BDP",
            badgeColor: "bg-green-600",
            rotation: "-rotate-1"
        },
        { 
            src: "/images/about/bitcoin-presentation.png", 
            alt: "Bitcoin Presentation",
            badge: "",
            badgeColor: "",
            rotation: "rotate-2"
        },
    ]

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            })
            setTimeout(checkScroll, 300)
        }
    }

    return (
        <div className="w-full py-16 px-8 max-sm:px-4">
            
            <div className="relative max-w-7xl mx-auto">
                {/* Previous Button */}
                {canScrollLeft && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-xl transition-all hover:scale-110"
                        aria-label="Previous photos"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                )}

                {/* Photos Container */}
                <div 
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className="flex gap-8 overflow-x-auto scroll-smooth hide-scrollbar pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {photos.map((photo, index) => (
                        <div 
                            key={index}
                            className={`flex-shrink-0 relative w-80 h-96 transform ${photo.rotation} transition-transform hover:rotate-0 hover:scale-105`}
                        >
                            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                                <Image 
                                    src={photo.src}
                                    alt={photo.alt}
                                    fill
                                    className="object-cover"
                                />
                                {photo.badge && (
                                    <div className={`absolute ${index === 0 ? 'top-4 left-4' : 'bottom-4 left-4'} z-20`}>
                                        <span className={`${photo.badgeColor} text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg whitespace-nowrap`}>
                                            {photo.badge}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Next Button */}
                {canScrollRight && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-xl transition-all hover:scale-110"
                        aria-label="Next photos"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                )}
            </div>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    )
}
