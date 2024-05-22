import React, { useState, useRef, useEffect, useMemo } from "react"
import Image from "next/image"
import FilterIcon from "../public/filter.svg"
import SortIcon from "../public/sort-icon.svg"
import CrossIcon from "../public/cross-icon.svg"
import CloseSidebarIcon from "../public/close-sidebar.svg"
import { useUrlManager } from "@/hooks/useUrlManager"
import { SORTOPTIONS, createSortKeys, filterPropertiesDataSet } from "@/utils"

const SidebarFilter = ({ toggle }: { toggle: () => void }) => {
    const { currentFilterValuesAndKeys } = useUrlManager()

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

            {filterPropertiesDataSet.map((obj, index) => (
                <section key={`filter-section-${index}`}>
                    <CustomMultiCheckBox {...obj} />
                </section>
            ))}
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

    filterFields = filterFields.filter(
        (v) => v.key !== "search" && v.key !== "sort"
    )

    return (
        <>
            <div className="pb-2">
                <div className="py-3 border-b border-b-gray-400 flex justify-between pr-[7p]">
                    <section className="flex items-center gap-2">
                        <Image
                            src={FilterIcon}
                            alt="filter"
                            className="w-[20px] 2xl:w-[25px]"
                        />
                        <p className="text-base md:text-xl font-bold">
                            Filters
                        </p>
                    </section>
                    <button
                        className="self-end rsor-pointer w- border border-gray-400 bg-gray-100 p-3 rounded-lg hidden md:block h-[46px] w-[41.68px]"
                        onClick={toggle}
                    >
                        <Image
                            src={CloseSidebarIcon}
                            alt="filter icon"
                            className="h-4 w-4"
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

const CustomSortSelect = React.memo(function CustomSortSelect({
    args
}: {
    args: string[]
}): JSX.Element {
    const { addSortParam, sortKey } = useUrlManager()
    const { sortKeys } = createSortKeys()
    const [isOpen, setOpen] = useState(false)
    const toggle = () => setOpen(!isOpen)

    const handleChange = (value: string) => {
        addSortParam(args[0].toLowerCase(), value)
        toggle()
    }

    const url_sort_key = sortKey ?? ""

    const currentSortKey = sortKeys.find(
        (sort_key) => sort_key.key === url_sort_key
    ) ?? { key: "relevance", label: "relevance" }

    return (
        <form className="w-full relative">
            <section className="group/menuBtn">
                <div
                    className="w-full bg-white border-[1.2px] border-gray-300 rounded-lg cursor-pointer p-3 before:absolute capitalize font-medium flex items-center justify-between"
                    onClick={toggle}
                >
                    <p className="font-semibold text-custom-primary-text">
                        {currentSortKey.label}
                    </p>
                    <span
                        className={`group-aria-[expanded=false]/menuBtn:rotate-180 transition-transform ${isOpen && "rotate-180 transition-transform"}`}
                    >
                        <Image
                            src="./up_arrow.svg"
                            width={11}
                            height={7}
                            alt="arrow"
                        />
                    </span>
                </div>
            </section>

            {isOpen && (
                <section className="focus-visible:shadow-none focus-visible:outline-none mt-2 absolute z-50 right-0 left-0 bg-white max-h-[300px] overflow-scroll font-medium rounded-xl shadow-md py-2 border border-gray-400">
                    {sortKeys.map((item, index) => (
                        <div
                            key={`${item.label}_${index}`}
                            onClick={() => handleChange(item.key)}
                            data-selected={currentSortKey.key === item.key}
                            className="group"
                        >
                            <div className="w-full px-5 py-[8px] flex gap-2 group-data-[selected=false]:hover:bg-gray-100 cursor-pointer">
                                <Image
                                    className="group-data-[selected=false]:invisible"
                                    src="./lightning_icon_filled.svg"
                                    height={16}
                                    width={16}
                                    alt=""
                                />
                                <span
                                    className={
                                        "group-data-[selected=true]:text-[#2d2d2d] group-data-[selected=true]:font-bold capitalize"
                                    }
                                >
                                    {item.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </section>
            )}
        </form>
    )
})

const CustomMultiCheckBox = React.memo(function CustomMultiCheckBox({
    title,
    placeholder,
    args
}: {
    title: string
    placeholder: string
    args: string[]
}) {
    const { addFilterParam, currentFilterValues } = useUrlManager()
    const [isOpen, setOpen] = useState(false)

    const [searchTerm, setSearchTerm] = useState("")
    const searchRef = useRef<HTMLInputElement>(null)

    const toggle = () => setOpen(!isOpen)

    useEffect(() => {
        const handleFocusIn = () => setOpen(true)

        let searchRefInput = searchRef.current
        if (!searchRefInput) return
        searchRefInput.addEventListener("focusin", () => handleFocusIn())

        return () => {
            searchRefInput &&
                searchRefInput.removeEventListener("focusin", () =>
                    handleFocusIn()
                )
        }
    }, [isOpen])

    const addFilter = (value: string) => {
        addFilterParam(args[0].toLowerCase(), value)
    }

    const isSelected = (value: string) => currentFilterValues.includes(value)

    const filterArgs = useMemo(() => {
        if (searchTerm === "") return args
        return args.filter((arg) =>
            arg.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [args, searchTerm])

    return (
        <div className="w-full flex flex-col gap-4">
            <h5 className="text-base font-bold">{title}</h5>
            <form className="w-full relative">
                <section className="group/menuBtn">
                    <div className="relative">
                        <input
                            className="text-base font-medium w-full pl-12 pr-10 py-4 rounded-xl border-[1px] border-gray-300 focus:outline-none focus:outline-offset-0 leading-none placeholder:text-gray-400 placeholder:font-medium"
                            type="text"
                            placeholder={placeholder}
                            onChange={(e) => {
                                e.preventDefault
                                setSearchTerm(e.target.value)
                            }}
                            value={searchTerm}
                            ref={searchRef}
                        />

                        <span className="absolute top-1/2 -translate-y-1/2 left-[18px]">
                            <Image
                                src="./search_icon.svg"
                                width={18}
                                height={18}
                                alt="search"
                                className=""
                            />
                        </span>
                        <span
                            data-is-open={isOpen}
                            onClick={toggle}
                            className="absolute p-2 cursor-pointer top-1/2 -translate-y-1/2 right-[18px] data-[is-open=false]:rotate-180 transition-transform"
                        >
                            <Image
                                src="./up_arrow.svg"
                                alt="arrow"
                                width={11}
                                height={7}
                            />
                        </span>
                    </div>
                </section>

                {isOpen && (
                    <section className="focus-visible:shadow-none focus-visible:outline-none mt-2 absolute z-50 right-0 left-0 bg-white max-h-[300px] overflow-scroll font-medium rounded-xl shadow-md py-2 border border-gray-400">
                        {filterArgs.length < 1 && (
                            <p className="w-full text-sm 2xl:text-base text-center px-2">
                                No matching options
                            </p>
                        )}
                        {filterArgs.slice(1).map((item, index) => (
                            <div
                                key={`${item}_${index}`}
                                onClick={() => addFilter(item)}
                                data-selected={isSelected(item)}
                                className="group"
                            >
                                <div className="w-full px-5 py-[8px] flex gap-2 group-data-[selected=false]:hover:bg-gray-100 cursor-pointer">
                                    <Image
                                        className="group-data-[selected=false]:invisible"
                                        src="./lightning_icon_filled.svg"
                                        height={16}
                                        width={16}
                                        alt=""
                                    />
                                    <span
                                        className={
                                            "group-data-[selected=true]:text-[#2d2d2d] group-data-[selected=true]:font-bold capitalize"
                                        }
                                    >
                                        {item}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </form>
        </div>
    )
})
