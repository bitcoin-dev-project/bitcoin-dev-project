"use client"
import { ICurriculum } from "@/types/curriculum"
import { BDPCard } from "@bitcoin-dev-project/bdp-ui"
import React from "react"
import ResourceNotFound from "./ResourceNotFound"

const CardContainers: React.FC<ICurriculum> = ({ allCurriculum }) => {
    if (!allCurriculum) {
        return null
    }

    if (allCurriculum.length === 0) {
        return <ResourceNotFound />
    }

    return (
        <div className="learn-cards-container grid md:grid-cols-2 justify-between w-full gap-5">
            {allCurriculum.map((curriculum, index) => (
                <BDPCard
                    key={`${curriculum.title}-${curriculum.link}-${index}`}
                    onClick={() => { }}
                    {...curriculum}
                />
            ))}
        </div>
    )
}

export default CardContainers
