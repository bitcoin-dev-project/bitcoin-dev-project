"use client";

import React from "react"
import AsideGoTO from "@/components/aside-go-to"
import CardContainers from "@/components/brand/CardContainers";
import { useCurriculum } from "@/context/FilterContext";

const LearnPage = () => {
     const {filteredCurriculum: allCurriculum } = useCurriculum()
    return (
        <div className="w-full text-brand-dark flex flex-col lg:flex-row lg:gap-[90px]">
             <div className="lg:hidden flex flex-col">
                    <h2 className="text-[2rem] lg:text-[3.5rem] font-extrabold font-montserrat leading">
                        LEARN
                    </h2>
                    <p className="text-[1.125rem] lg:text-xl font-quicksand">
                        A curated library of guides, tools, and workshops for
                        every skill level
                    </p>
                </div>
            <div className=" lg:w-[300px] flex flex-col gap-6">
                <AsideGoTO selected="learn" allCurriculum={allCurriculum} />
            </div>

            <div className="flex flex-col gap-8">
                <div className="hidden lg:flex lg:flex-col">
                    <h2 className="text-[2rem] lg:text-[3.5rem] font-extrabold font-montserrat leading">
                        LEARN
                    </h2>
                    <p className="text-[1.125rem] lg:text-xl font-quicksand">
                        A curated library of guides, tools, and workshops for
                        every skill level
                    </p>
                </div>
               <CardContainers allCurriculum={allCurriculum} />
            </div>
        </div>
    )
}

export default LearnPage
