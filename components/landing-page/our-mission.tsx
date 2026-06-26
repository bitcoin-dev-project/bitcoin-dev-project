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
        <div className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 border-t-[20px] border-b-[20px] border-blue-300">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid lg:grid-cols-2 gap-4 lg:gap-16 items-center">
                    <div className="flex flex-col gap-6 lg:gap-[60px] lg:max-w-[484px]">
                        <div className="flex flex-col gap-2 items-center lg:items-start">
                            <h2 className="text-4xl italic font-bold text-[#2C2C2C]  text-center lg:text-left font-montserrat pb-6">
                                The Welcome Wagon of Bitcoin Development
                            </h2>
                            <p className="text-xl text-[#2C2C2C] leading-relaxed font-quicksand text-center lg:text-left">
                                Here at the Bitcoin Dev Project, we believe
                                everyone should have access to quality bitcoin
                                technical resources. It shouldn't matter who you
                                are or where you live. From established bitcoin
                                contributors, to aspiring ones, our commitment
                                lies in growing and strengthening the developer
                                ecosystem.
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
