"use client"

import { Pill, Tag } from "@bitcoin-dev-project/bdp-ui"
import Image from "next/image"
import React from "react"
import Filters from "./brand/Filters"
import { FILTERSGUIDE, REBRANDMOTTOS } from "@/utils"
import { useRouter } from "next/navigation"
import { Mottos } from "@/types"
import { ICurriculum } from "@/types/curriculum"

interface IGoTO extends ICurriculum {
    selected: Mottos
    path?: string
}
const AsideGoTO: React.FC<IGoTO> = ({ selected, allCurriculum, path }) => {
    const router = useRouter()
    const selectChange = (currentSelect: Mottos) => {
        router.push(currentSelect)
    }
    return (
        <>
            <div className="flex-col flex top-10 lg:sticky gap-6">
                <aside className="flex-shrink-0 flex flex-col gap-6">
                    <div className=" hidden lg:flex flex-col gap-4">
                        <h2 className="text-xl font-bold text-brand-dark/60 font-montserrat">
                            GO TO
                        </h2>
                        <div className="flex gap-2 flex-wrap font-quicksand">
                            {REBRANDMOTTOS.map((mottos) => (
                                <Pill
                                    key={mottos.slug}
                                    onClick={() => {
                                        selectChange(mottos.slug)
                                    }}
                                    selected={mottos.slug === selected}
                                >
                                    {mottos.name}
                                </Pill>
                            ))}
                        </div>
                    </div>

                    {selected === "career" && (
                        <div className="mt-4">
                            <Image
                                src="/images/hotair-balloon.png"
                                alt="Hot Air Balloon"
                                width={400}
                                height={600}
                                className="w-full h-auto"
                            />
                        </div>
                    )}

                    {selected !== "career" && (
                        <Filters allCurriculum={allCurriculum} path={path} />
                    )}
                </aside>
                {selected !== "career" && (
                    <div className="hidden lg:flex lg:flex-col font-quicksand gap-1.5 border rounded-lg p-2 border-brand-stroke-on-base">
                        {FILTERSGUIDE.map((guide) => (
                            <div key={guide.tag} className="flex items-center">
                                <Tag
                                    type={guide.tag}
                                    className="capitalize font-bold text-sm !border-0 !bg-transparent"
                                />
                                <p className="text-sm">{guide.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default AsideGoTO
