import React from "react"
import Image from "next/image"
import FilterIcon from "../public/filter.svg"
import SortIcon from "../public/sort-icon.svg"
import CrossIcon from "../public/cross-icon.svg"
import CloseSidebarIcon from "../public/close-sidebar.svg"
import { useUrlManager } from "@/hooks/useUrlManager"
import {
    getValues,
    SORTOPTIONS,
    ISSUETYPEOPTIONS,
    createSortKeys
} from "@/utils"

const SidebarFilter = ({ toggle }: { toggle: () => void }) => {
    const { currentFilterValuesAndKeys } = useUrlManager()

    const { properties: languages } = getValues("lang")
    const { properties: tags } = getValues("tags")
    const { properties: repos } = getValues("name")
    const { properties: orgs } = getValues("org")

    return (
        <div className="w-[300px] lg:w-[250px] md:w-full flex flex-col gap-5">
            <FilterMenu
                filterFields={currentFilterValuesAndKeys}
                toggle={toggle}
            />

            <section className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-2">
                    <Image
                        src={SortIcon}
                        alt="filter"
                        className="w-[20px] 2xl:w-[25px]"
                    />
                    <h5 className="text-base font-bold">Sort by</h5>
                </div>
                <div className=" flex gap-3 flex-wrap">
                    <CustomSortSelect args={SORTOPTIONS} />
                </div>
            </section>

            <section className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-2">
                    <h5 className="text-base font-bold">Issue type</h5>
                </div>
                <div className=" flex gap-3 flex-wrap">
                    <CustomSelect args={ISSUETYPEOPTIONS} />
                </div>
            </section>

            <section className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-2">
                    <h5 className="text-base font-bold">Language</h5>
                </div>
                <div className=" flex gap-3 flex-wrap">
                    <CustomSelect args={languages} />
                </div>
            </section>

            <section className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-2">
                    <h5 className="text-base font-bold">Tags</h5>
                </div>
                <div className=" flex gap-3 flex-wrap">
                    <CustomSelect args={tags} />
                </div>
            </section>

            <section className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-2">
                    <h5 className="text-base font-bold">Repositories</h5>
                </div>
                <div className=" flex gap-3 flex-wrap">
                    <CustomSelect args={repos} />
                </div>
            </section>

            <section className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-2">
                    <h5 className="text-base font-bold">Organisations</h5>
                </div>
                <div className=" flex gap-3 flex-wrap">
                    <CustomSelect args={orgs} />
                </div>
            </section>
        </div>
    )
}

export default SidebarFilter

const FilterMenu = React.memo(function FilterMenu({
    filterFields,
    toggle
}: {
    filterFields: Array<{ [key: string]: string }>
    toggle: () => void
}) {
    const { deleteFilterParam, clearAllFilters } = useUrlManager()
    filterFields = filterFields.filter((v) => v.key !== "search")

    return (
        <>
            <div className="pb-2">
                <div className="py-3 border-b border-b-gray-400 flex justify-between pr-[7px]">
                    <section className="flex items-center gap-2">
                        <Image
                            src={FilterIcon}
                            alt="filter"
                            className="w-[20px] 2xl:w-[25px]"
                        />
                        <p className="text-base font-bold">Filters</p>
                    </section>
                    <button
                        className="self-end rsor-pointer w-fit border border-gray-400 bg-gray-100 p-3 rounded-lg hidden md:block"
                        onClick={toggle}
                    >
                        <Image
                            src={CloseSidebarIcon}
                            alt="filter icon"
                            className="h-3 w-3"
                        />
                    </button>
                </div>
            </div>
            {filterFields.length ? (
                <div className="flex flex-col gap-4 border-b-gray-400 border-b pb-7">
                    <section className="flex items-center justify-between">
                        <p className="text-base font-bold">Applied Filters</p>
                        <button
                            className="cursor-pointer flex gap-2 items-center leading-[100%] hover:underline"
                            onClick={clearAllFilters}
                        >
                            Clear all
                            <span className="p-[6px] 2xl:p-2 rounded-md bg-[#a4a4a8] text-white">
                                <Image
                                    src={CrossIcon}
                                    alt="filter icon"
                                    className="h-2 w-2 fill-white"
                                />
                            </span>
                        </button>
                    </section>
                    <div className="flex flex-wrap gap-2">
                        {filterFields?.map((v) => (
                            <section key={v.filter}>
                                <FilterPill
                                    text={v.filter}
                                    onClick={() =>
                                        deleteFilterParam(v.key, v.filter)
                                    }
                                />
                            </section>
                        ))}
                    </div>
                </div>
            ) : null}
        </>
    )
})

const FilterPill = React.memo(function FilterPill({
    text,
    onClick
}: {
    text: string
    onClick: (text: string) => void
}): JSX.Element {
    return (
        <button
            onClick={() => onClick(text)}
            className="border border-gray-400 px-3 py-2.5 rounded-md text-sm leading-[100%] hover:bg-gray-100 flex gap-2 items-center font-semibold capitalize bg-gray-200"
        >
            {text}
            <Image
                src={CrossIcon}
                alt="filter icon"
                className="h-2 w-2 fill-white"
            />
        </button>
    )
})

const CustomSelect = React.memo(function CustomSelect({
    args
}: {
    args: string[]
}): JSX.Element {
    const { addFilterParam } = useUrlManager()
    const [value, setValue] = React.useState("")

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault()
        setValue(event.target.value)
        addFilterParam(args[0].toLowerCase(), event.target.value)
    }

    return (
        <form className="w-full">
            <select
                value={value}
                onChange={handleChange}
                className="w-full bg-white border-[1.2px] border-gray-300 rounded-lg cursor-pointer p-3 before:absolute capitalize font-medium"
            >
                {args.slice(1).map((val) => (
                    <option key={val} value={val.toLowerCase()}>
                        {val}
                    </option>
                ))}
            </select>
        </form>
    )
})

const CustomSortSelect = React.memo(function CustomSortSelect({
    args
}: {
    args: string[]
}): JSX.Element {
    const { addSortParam } = useUrlManager()
    const { sortKeys } = createSortKeys()
    const [value, setValue] = React.useState("")

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault()
        setValue(event.target.value)
        addSortParam(args[0].toLowerCase(), event.target.value)
    }

    return (
        <form className="w-full">
            <select
                value={value}
                onChange={handleChange}
                className="w-full bg-white border-[1.2px] border-gray-300 rounded-lg cursor-pointer p-3 before:absolute capitalize font-medium"
            >
                {sortKeys.map(({ key, sort }) => (
                    <option key={key} value={key.toLowerCase()}>
                        {sort}
                    </option>
                ))}
            </select>
        </form>
    )
})
