import { useCurriculum } from "@/context/FilterContext"
import { Curriculum, Difficulty, ICurriculum, TagType as CurriculumTagType } from "@/types/curriculum"
import { fetchJsonData } from "@/utils/fetchJson"
import { Tag, TagType } from "@bitcoin-dev-project/bdp-ui"
import { Button } from "@bitcoin-dev-project/bdp-ui"
import { Leaf } from "@bitcoin-dev-project/bdp-ui"
import { Search } from "@bitcoin-dev-project/bdp-ui"
import React, {
    ChangeEvent,
    FormEvent,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react"

interface IFilters extends ICurriculum {
    path?: string
}
const Filters: React.FC<IFilters> = ({ allCurriculum, path }) => {
   const {clearFilters, setSearch, selectedTags, setSelectedTags, difficulty, setDifficulty} = useCurriculum()


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const toggleTag = (tag: CurriculumTagType) => {
        setSelectedTags((prev) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
        )
    }

    const handleDifficultyClick = (level: Difficulty) => {
        setDifficulty(difficulty === level ? "" : level)
    }

    return (
        <div className="border font-quicksand bg-brand-gray flex flex-col gap-5 border-brand-gray-100 rounded-xl px-3 py-5">
            <h3 className="font-bold text-xl font-montserrat">
                Search & Filter by:
            </h3>

            <div
                className="flex flex-col gap-5"
                role="form"
                id="filter"
                aria-label="Contact Information"
            >
                <div role="" className="flex flex-col gap-2">
                    <label className="font-semibold" htmlFor="search">
                        Resource name or Description
                    </label>
                    <Search id="search" onChange={handleInputChange} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Resource type</label>
                    <div className="flex flex-wrap gap-2">
                        {(["guide", "seminar", "tool", "interactive"] as CurriculumTagType[]).map(
                            (type) => (
                                <Tag
                                    key={type}
                                    type={type as TagType}
                                    className={`capitalize font-bold text-sm cursor-pointer transition-opacity ${
                                        selectedTags.includes(type)
                                            ? "opacity-100 ring-2 ring-orange-500"
                                            : "opacity-60 hover:opacity-100"
                                    }`}
                                    onClick={() => toggleTag(type)}
                                >
                                    {type}
                                </Tag>
                            )
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold">Resource Difficulty</h3>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { count: 1, level: "easy" as Difficulty },
                            { count: 2, level: "medium" as Difficulty },
                            { count: 3, level: "hard" as Difficulty }
                        ].map(({ count, level }) => (
                            <div
                                key={count}
                                onClick={() => handleDifficultyClick(level)}
                                className={`cursor-pointer transition-opacity ${
                                    difficulty === level
                                        ? "opacity-100 ring-2 ring-orange-500 rounded-full"
                                        : "opacity-60 hover:opacity-100"
                                }`}
                            >
                                <Leaf leavesCount={count} withBorder />
                            </div>
                        ))}
                    </div>
                </div>

                <Button
                    label="Clear Filters"
                    variant="rebrand"
                    onClick={clearFilters}
                ></Button>
            </div>
        </div>
    )
}

export default Filters
