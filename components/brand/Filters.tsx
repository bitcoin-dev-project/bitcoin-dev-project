import React, { ChangeEvent, useState } from "react"

import { useCurriculum } from "@/context/FilterContext"
import {
    Difficulty,
    ICurriculum,
    TagType as CurriculumTagType
} from "@/types/curriculum"
import { Tag, TagType } from "@bitcoin-dev-project/bdp-ui"
import { Button } from "@bitcoin-dev-project/bdp-ui"
import { Leaf } from "@bitcoin-dev-project/bdp-ui"
import { Search } from "@bitcoin-dev-project/bdp-ui"
import FilterIcon from "../assets/FilterIcon"
import { FILTERDIFFICULTY, FILTERSGUIDE } from "@/utils"
interface IFilters extends ICurriculum {
    path?: string
}
const Filters: React.FC<IFilters> = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    const {
        clearFilters,
        setSearch,
        selectedTags,
        setSelectedTags,
        difficulty,
        setDifficulty
    } = useCurriculum()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const toggleTag = (tag: CurriculumTagType) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        )
    }

    const handleDifficultyClick = (level: Difficulty) => {
        setDifficulty(difficulty === level ? "" : level)
    }

    return (
        <>
            <div className="lg:border font-quicksand  lg:bg-brand-gray flex flex-col gap-5 lg:border-brand-gray-100 rounded-xl lg:px-3 py-5">
                <h3 className="hidden lg:flex font-bold text-xl font-montserrat">
                    Search & Filter by:
                </h3>

                <div
                    className="flex flex-col gap-5"
                    role="form"
                    id="filter"
                    aria-label="Contact Information"
                >
                    <div role="" className="flex flex-col gap-2">
                        <label
                            className="hidden lg:block font-semibold"
                            htmlFor="search"
                        >
                            Resource name or Description
                        </label>
                        <Search id="search" onChange={handleInputChange} />
                    </div>

                    <div className="flex lg:flex-col gap-2">
                        <label className="hidden lg:block font-semibold">
                            Resource type
                        </label>
                        <FilterIcon
                            role="button"
                            tabIndex={0}
                            className=" w-[28px] lg:hidden"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        />
                        <div className="flex overflow-x-auto no-scrollbar lg:flex-wrap gap-2">
                            {FILTERSGUIDE.map((type) => (
                                <Tag
                                    key={type.tag}
                                    type={type.tag}
                                    className={`capitalize font-bold text-sm cursor-pointer transition-opacity`}
                                    selected={selectedTags.includes(type.tag)}
                                    onClick={() => toggleTag(type.tag)}
                                >
                                    {type.tag}
                                </Tag>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:flex lg:flex-col gap-2">
                        <h3 className="font-semibold">Resource Difficulty</h3>
                        <div className="flex flex-wrap gap-2">
                            {FILTERDIFFICULTY.map(({ count, level }) => (
                                <div
                                    key={count}
                                    onClick={() => handleDifficultyClick(level)}
                                    className={`cursor-pointer transition-opacity`}
                                >
                                    <Leaf selected={difficulty === level} leavesCount={count} withBorder />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button
                        label="Clear Filters"
                        variant="rebrand"
                        onClick={clearFilters}
                        className="hidden lg:block"
                    ></Button>
                </div>
            </div>

            {isFilterOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
                    onClick={() => setIsFilterOpen(false)}
                />
            )}

            <div
                className={`fixed bottom-0 flex flex-col gap-10 left-0 right-0 bg-brand rounded-t-3xl shadow-2xl py-10 px-5 z-10 transition-transform duration-300 ease-in-out lg:hidden ${
                    isFilterOpen ? "translate-y-0" : "translate-y-full"
                }`}
                style={{ height: "70vh" }}
            >
                <div className="flex flex-col gap-5">
                    <h3 className="font-extrabold font-montserrat text-[22px]">
                        {" "}
                        WHAT’s WHAT
                    </h3>
                    <div className="lg:hidden flex flex-col font-quicksand gap-1.5 rounded-lg">
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
                </div>
                <div className="flex flex-col gap-5">
                    <h3 className="font-extrabold font-montserrat text-[22px]">SORT & FILTER</h3>
                    <div className="flex flex-col font-quicksand gap-2">
                        <p>Filter by resource type</p>
                        <div className="flex lg:hidden flex-wrap gap-2">
                            {FILTERSGUIDE.map((type) => (
                                <Tag
                                    key={type.tag}
                                    type={type.tag}
                                    className="capitalize font-bold text-sm cursor-pointer transition-opacity"
                                    selected={selectedTags.includes(type.tag)}
                                    onClick={() => toggleTag(type.tag)}
                                >
                                    {type.tag}
                                </Tag>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Filter by difficulty of resource</p>
                        <div className="flex flex-wrap gap-2">
                            {FILTERDIFFICULTY.map(({ count, level }) => (
                                <div
                                    key={count}
                                    onClick={() => handleDifficultyClick(level)}
                                    className={`cursor-pointer transition-opacity`}
                                >
                                    <Leaf selected={difficulty === level} leavesCount={count} withBorder />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filters
