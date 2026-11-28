"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const BANNER_KEY = "queuer-banner"

const BossBanner = () => {
    const [showBanner, setShowBanner] = useState(false)

    const handleClose = () => {
        setShowBanner(false)
        try {
            window.sessionStorage.setItem(BANNER_KEY, "hidden")
        } catch {
            // Dismiss for this visit even when browser storage is unavailable.
        }
    }

    useEffect(() => {
        try {
            setShowBanner(
                window.sessionStorage.getItem(BANNER_KEY) !== "hidden"
            )
        } catch {
            setShowBanner(true)
        }
    }, [])

    if (!showBanner) return null

    return (
        <aside
            aria-label="BOSS Challenge"
            className="relative z-[60] w-full border-b border-orange-400/40 bg-brand-dark font-quicksand text-white"
        >
            <div className="relative mx-auto max-w-7xl px-4 py-4 pr-14 sm:px-14 sm:py-3">
                <div className="grid justify-items-start gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6">
                    <Image
                        src="/images/banners/boss-challenge.png"
                        alt="BOSS Challenge"
                        width={1910}
                        height={324}
                        sizes="(min-width: 640px) 12rem, 11rem"
                        loading="eager"
                        className="h-auto w-44 max-w-full shrink-0 sm:w-48"
                    />
                    <span
                        aria-hidden="true"
                        className="hidden h-7 w-px bg-white/20 lg:block"
                    />
                    <p className="text-base font-medium leading-relaxed text-white/90">
                        Start your career in bitcoin open source.
                    </p>
                    <a
                        onClick={handleClose}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Apply by December 31 for the BOSS Challenge"
                        className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg bg-orange-400 px-4 py-2.5 text-sm font-bold text-brand-dark transition-colors hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400 motion-reduce:transition-none"
                        href="https://bosschallenge.xyz"
                    >
                        Apply by December 31
                    </a>
                </div>
                <button
                    type="button"
                    aria-label="Dismiss BOSS Challenge banner"
                    onClick={handleClose}
                    className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 motion-reduce:transition-none sm:top-1/2 sm:-translate-y-1/2"
                >
                    <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </aside>
    )
}

export default BossBanner
