"use client"

import { Banner } from "@bitcoin-dev-project/bdp-ui"
import { usePathname } from "next/navigation"

const BossBanner = () => {
    const pathname = usePathname()
    const isHomePage = pathname === "/"

    return (
        <div
            className={`w-full dark:bg-black bg-white sticky top-[60px] lg:top-[64px] z-20 ${isHomePage ? "block" : "hidden"}`}
        >
            <Banner
                headingText="Start your career in bitcoin open source —"
                linkText="APPLY TODAY"
                linkTo="https://learning.chaincode.com/#BOSS"
                hasBoss
                styles={{
                    link: "dark:text-orange-400 text-orange-500",
                    boss: "dark:text-orange-400 text-orange-500"
                }}
            />
        </div>
    )
}

export default BossBanner
