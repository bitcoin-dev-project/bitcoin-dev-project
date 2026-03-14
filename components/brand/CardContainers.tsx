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
                <div 
                    key={`${curriculum.title}-${curriculum.link}-${index}`}
                    className="rounded-2xl transition-all duration-300 hover:ring-1 hover:ring-[rgba(169,164,155,0.75)] hover:shadow-sm"
                >
                    <BDPCard
                        onClick={() => { }}
                        {...curriculum}
                    />
                </div>
            ))}
        </div>
    )
}

export default CardContainers
