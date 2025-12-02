"use client"
import clsx from "clsx"
import { useEffect, useState } from "react"

const BANNER_KEY = "queuer-banner"

const defaultStyles = {
    container:
        "gap-2 flex items-center justify-between w-full px-2 sm:px-4 shadow-md transition-all duration-200 ease-in-out text-center",
    bannerInfoContainer: `flex flex-col flex-[1_1_auto]`,
    headingText: "font-semibold text-brand-dark text-sm md:text-lg",
    bodyText: "text-sm md:text-base",
    link: "text-brand-orange-100 underline font-semibold text-xs md:text-sm",
    icon: "text-orange-500  transition-all duration-200 ease-in-out",
    boss: "text-bdp-accent text-base md:text-lg"
} as const

const BossBanner = () => {
    const [showBanner, setShowBanner] = useState(false)

    const handleClose = () => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem(BANNER_KEY, "hidden")
        }
        setShowBanner(false)
    }

    useEffect(() => {
        //  to make BossBanner Render only once
        const banner_in_session = window.sessionStorage.getItem(BANNER_KEY)
        if (banner_in_session === "hidden") {
            setShowBanner(false)
        } else {
            setShowBanner(true)
        }
    }, [])

    return (
        <div className={`w-full bg-white sticky top-0 z-[60] font-quicksand`}>
            <div
                data-show-banner={showBanner}
                data-has-heading
                className={clsx(
                    defaultStyles.container,
                    "data-[has-heading='true']:h-16",
                    "data-[has-heading='false']:h-12",
                    "data-[show-banner='false']:h-0 overflow-hidden"
                )}
            >
                <div className={clsx(defaultStyles.bannerInfoContainer)}>
                    <h3 className={clsx(defaultStyles.headingText)}>
                        Start your career in bitcoin open source —
                        <span
                            className={clsx(
                                defaultStyles.boss,
                                "text-orange-500"
                            )}
                        >
                            {" "}
                            ₿OSS
                        </span>
                    </h3>
                    <a
                        onClick={handleClose}
                        target="_blank"
                        className={clsx(
                            defaultStyles.link,
                            "dark:text-orange-400 text-orange-500"
                        )}
                        href="https://bosschallenge.xyz"
                    >
                        APPLY FOR THE ₿OSS CHALLENGE TODAY
                    </a>
                </div>
                <button
                    onClick={handleClose}
                    data-show-banner={showBanner}
                    className={clsx(
                        defaultStyles.icon,
                        "opacity-1",
                        "data-[show-banner='false']:opacity-0"
                    )}
                >
                    <svg
                        className="h-[20px] w-[20px] md:h-6 md:w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width="24"
                        height="24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default BossBanner
