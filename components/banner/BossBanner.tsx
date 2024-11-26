"use client"

import { Banner } from "@bitcoin-dev-project/bdp-ui"

const BossBanner = () => {
    return (
        <div className={`w-full dark:bg-black bg-white sticky top-[66px] z-20`}>
            <Banner
                headingText="Start your career in bitcoin open source —"
                linkText="APPLY TODAY"
                linkTo="https://learning.chaincode.com/#BOSS"
                hasBoss
                styles={{
                    link: "dark:text-orange-400 text-orange-500"
                }}
            />
        </div>
    )
}

export default BossBanner
