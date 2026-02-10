import React from "react"
import Image from "next/image"

const ResourceNotFound: React.FC = () => {
    return (
        <div className="learn-cards-container grid md:grid-cols-2 justify-between w-full gap-5">
            <div className="border border-brand-stroke-on-base p-4 pb-[22px] rounded-2xl bg-brand-card-bg w-full md:max-w-[375px] flex items-center overflow-hidden">
                <Image
                    src="/images/hedgehog-not-found.png"
                    alt="Hedgehog mascot - no resources found"
                    width={600}
                    height={600}
                    className="w-full h-auto scale-125"
                />
            </div>
        </div>
    )
}

export default ResourceNotFound
