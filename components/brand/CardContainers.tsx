"use client"
import { ICurriculum } from "@/types/curriculum"
import { BDPCard } from "@bitcoin-dev-project/bdp-ui"
import React from "react"

const CardContainers: React.FC<ICurriculum> = ({ allCurriculum }) => {
    return (
        <div className="grid md:grid-cols-2 justify-between w-full gap-5">
            {allCurriculum.map((curriculum, index) => (
                <BDPCard
                    key={`${curriculum.title}-${curriculum.link}-${index}`}
                    onClick={() => {}}
                    {...curriculum}
                />
            ))}
        </div>
    )
}

export default CardContainers
