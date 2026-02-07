"use client"
import { ICurriculum } from "@/types/curriculum"
import { BDPCard } from "@bitcoin-dev-project/bdp-ui"
import React from "react"

const ResourceNotFound = () => (
    <div className="border border-brand-stroke-on-base p-6 flex flex-col items-center justify-center min-h-[290px] w-full rounded-2xl bg-brand-card-bg col-span-full">
        <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-brand-gray-200 mb-4"
        >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
        <h6 className="font-montserrat text-lg font-semibold text-brand-dark mb-1">
            No resources found
        </h6>
        <p className="font-quicksand text-sm text-brand-gray-300 text-center">
            Try adjusting your search or filters
        </p>
    </div>
)

const CardContainers: React.FC<ICurriculum> = ({ allCurriculum }) => {
    if (!allCurriculum) {
        return null
    }

    return (
        <div className="learn-cards-container grid md:grid-cols-2 justify-between w-full gap-5">
            {allCurriculum.length === 0 ? (
                <ResourceNotFound />
            ) : (
                allCurriculum.map((curriculum, index) => (
                    <BDPCard
                        key={`${curriculum.title}-${curriculum.link}-${index}`}
                        onClick={() => {}}
                        {...curriculum}
                    />
                ))
            )}
        </div>
    )
}

export default CardContainers
