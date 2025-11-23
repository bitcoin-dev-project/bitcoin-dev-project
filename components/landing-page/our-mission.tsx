import Image from "next/image"
import React from "react"
import TickGreen from "../assets/TickGreen"
import { MISSIONS } from "@/utils"

const Mission = ({
    title,
    description
}: {
    title: string
    description: string
}) => {
    return (
        <div className="flex flex-row gap-3 items-center w-full ">
            <TickGreen className="min-w-[45px]" />
            <div className="flex flex-col font-quicksand gap-1">
                <h4 className="text-sm font-bold text-brand-orange-100">
                    {title}
                </h4>
                <p className="text-base md:text-xl text-black">{description}</p>
            </div>
        </div>
    )
}
const OurMission = () => {
    return (
        <div className="bg-[#F5EFE7] pt-[144px]">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid lg:grid-cols-2 gap-4 lg:gap-16 items-center">
                    <div className="flex flex-col gap-6 lg:gap-[60px] lg:max-w-[484px]">
                        <div className="flex flex-col gap-2 items-center lg:items-start">
                            <h2 className="text-2xl font-bold text-[#2C2C2C]  text-center lg:text-left leading-[1.2] font-montserrat">
                                WHAT IS THE BITCOIN DEV PROJECT ?
                            </h2>
                            <p className="text-xl text-[#2C2C2C] leading-relaxed font-quicksand text-center lg:text-left">
                                We make tools and resources so that anyone,
                                anywhere has the opportunity to learn and
                                contribute to Bitcoin tech.
                            </p>
                        </div>
                        <div className="flex flex-col gap-5   ">
                            {MISSIONS.map((mission) => (
                                <Mission key={mission.title} {...mission} />
                            ))}
                        </div>
                    </div>
                    {/* Right Side - Mission Cart Image */}
                    <div className="relative flex items-center justify-center">
                        <div className="relative w-full max-w-lg aspect-square">
                            <Image
                                src="/images/hero/mission-cart.webp"
                                alt="Mission - Bitcoin Learning Resources"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurMission
