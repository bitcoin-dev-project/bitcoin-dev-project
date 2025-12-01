"use client"

import React from "react"
import AsideGoTO from "@/components/aside-go-to"
import CardContainers from "@/components/brand/CardContainers"
import { useCurriculum } from "@/context/FilterContext"

const ContributePage = () => {
    const { filteredCurriculum: allCurriculum } = useCurriculum()

    return (
        <div className="w-full text-brand-dark flex flex-col lg:flex-row lg:gap-[90px]">
            <div className="gap-5 lg:hidden">
                <h2 className="text-[2rem] lg:text-[3.5rem] font-extrabold font-montserrat leading">
                    CONTRIBUTE
                </h2>
                <p className="text-[1.125rem] lg:text-xl font-quicksand">
                    Find ways to make your first contributions to ₿OSS.
                </p>
            </div>
            <div className="w-full lg:w-[300px] flex flex-col gap-6">
                <AsideGoTO
                    selected="contribute"
                    allCurriculum={allCurriculum}
                />
            </div>
            <div className="flex flex-col gap-8">
                <div className="gap-5 hidden lg:flex lg:flex-col">
                    <h2 className="text-[2rem] lg:text-[3.5rem] font-extrabold font-montserrat leading">
                        CONTRIBUTE
                    </h2>
                    <p className="text-[1.125rem] lg:text-xl font-quicksand">
                        Find ways to make your first contributions to ₿OSS.
                    </p>
                </div>
                <CardContainers allCurriculum={allCurriculum} />
            </div>
        </div>
    )
}

export default ContributePage
