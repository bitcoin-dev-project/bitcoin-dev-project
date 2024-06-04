import Image from "next/image"
import React, { useEffect, useMemo, useRef, useState } from "react"

import { useUrlManager } from "@/hooks/useUrlManager"
import { IssueCardElement } from "@/types"
import { createSortKeys, getValues, ISSUEOPTIONS, SORTOPTIONS } from "@/utils"

import CloseSidebarIcon from "../public/close-sidebar.svg"
import CrossIcon from "../public/cross-icon.svg"
import FilterIcon from "../public/filter.svg"
import SortIcon from "../public/sort-icon.svg"
import useOnclickOut from "@/hooks/useOnclickOut"

const SidebarFilter = ({
    toggle,
    issues
}: {
    toggle: () => void
    issues: IssueCardElement[]
}) => {
    const { currentFilterValuesAndKeys } = useUrlManager()

    const { properties: languages } = getValues({ key: "languages", issues })
    const { properties: tags } = getValues({ key: "tags", issues })
    const { properties: repos } = getValues({ key: "repo", issues })
    const { properties: orgs } = getValues({ key: "owner", issues })

    const filterPropertiesDataSet = [
        {
            title: "Issue type",
            placeholder: "Search issues",
            args: ISSUEOPTIONS
        },
        {
            title: "Language",
            placeholder: "Search languages",
            args: languages
        },
        { title: "Tags", placeholder: "Search Tags", args: tags },
        {
            title: "Repositories",
            placeholder: "Search Repositories",
            args: repos
        },
        {
            title: "Organisations",
            placeholder: "Search Organisations",
            args: orgs
        }
    ]

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

function FilterMenu({
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
                <div className="py-3 border-b border-b-gray-400 flex justify-between">
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
}

function FilterPill({
    text,
    onClick
}: {
    text: string
    onClick: (text: string) => void
}) {
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
}

function CustomSortSelect({ args }: { args: string[] }) {
    const { addSortParam, sortKey } = useUrlManager()
    const { sortKeys } = createSortKeys()
    const [isOpen, setOpen] = useState(false)
    const wrapperRef = useRef<HTMLFormElement>(null)
    const toggle = () => setOpen(!isOpen)

    const handleChange = (value: string) => {
        addSortParam(args[0].toLowerCase(), value)
        toggle()
    }

    const url_sort_key = sortKey ?? ""

    const currentSortKey = sortKeys.find(
        (sort_key) => sort_key.key === url_sort_key
    ) ?? { key: "randomn", label: "randomn" }

    useEffect(() => {
        const handleFocusOut = (e: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleFocusOut)

        return () => {
            document.removeEventListener("mousedown", handleFocusOut)
        }
    }, [isOpen])

    return (
        <form className="w-full relative" ref={wrapperRef}>
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

            <section
                className={`focus-visible:shadow-none focus-visible:outline-none mt-2 absolute z-50 right-0 left-0 bg-white max-h-[300px] overflow-scroll font-medium rounded-xl shadow-md py-2 border border-gray-400 ${isOpen ? "block" : "hidden"}`}
            >
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
        </form>
    )
}

function CustomMultiCheckBox({
    title,
    placeholder,
    args
}: {
    title: string
    placeholder: string
    args: string[]
}) {
    const { addFilterParam, currentFilterValues, urlParams } = useUrlManager()
    const [searchTerm, setSearchTerm] = useState("")
    const searchRef = useRef<HTMLInputElement>(null)
    const { wrapperRef, contentRef, isOpen, setOpen } = useOnclickOut()

    const toggle = () => setOpen(!isOpen)

    useEffect(() => {
        const handleFocusIn = () => setOpen(true)

        let searchRefInput = searchRef.current
        searchRefInput &&
            searchRefInput.addEventListener("focusin", () => handleFocusIn())

        searchRefInput &&
            searchRefInput.addEventListener("focus", () => {
                window.scrollTo(0, 0)
                document.body.scrollTop = 0
            })

        return () => {
            searchRefInput &&
                searchRefInput.removeEventListener("focusin", () =>
                    handleFocusIn()
                )
        }
    }, [isOpen, setOpen])

    const addFilter = (value: string) => {
        urlParams.set("page", String(1))
        addFilterParam(args[0].toLowerCase(), value)
    }

    const isSelected = (value: string) => currentFilterValues.includes(value)

    const filterArgs = useMemo(() => {
        const getBooleanValue = (value: string) =>
            currentFilterValues.includes(value)

        if (searchTerm === "")
            return args
                .map((val) => ({
                    title: val,
                    isSelected: getBooleanValue(val)
                }))
                .slice(1)
        return args
            .slice(1)
            .map((arg) => ({
                title: arg.toLowerCase(),
                isSelected: getBooleanValue(arg)
            }))
            .filter((arg) =>
                arg.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
    }, [args, searchTerm, currentFilterValues])

    return (
        <div className="w-full flex flex-col gap-4">
            <h5 className="text-base font-bold">{title}</h5>
            <div className="w-full relative" ref={wrapperRef}>
                <section className="group/menuBtn">
                    <div className="relative" ref={contentRef}>
                        <input
                            className="text-base font-medium w-full pl-12 pr-10 py-4 rounded-xl border-[1px] border-gray-300 focus:outline-none focus:outline-offset-0 leading-none placeholder:text-gray-400 placeholder:font-medium"
                            type="text"
                            placeholder={placeholder}
                            onChange={(e) => {
                                e.preventDefault()
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

                <section
                    onBlur={(e) => {
                        e.stopPropagation()
                        setOpen(false)
                    }}
                    id="filter-section-dropdown"
                    data-is-open={isOpen}
                    className={`focus-visible:shadow-none focus-visible:outline-none mt-2 absolute z-50 right-0 left-0 bg-white max-h-[300px] overflow-scroll font-medium rounded-xl shadow-md py-2 border border-gray-400 ${isOpen ? "block" : "hidden"}`}
                >
                    {filterArgs.length < 1 && (
                        <p className="w-full text-sm 2xl:text-base text-center px-2">
                            No matching options
                        </p>
                    )}
                    {filterArgs
                        .sort((a, b) => {
                            return a.isSelected === b.isSelected
                                ? 0
                                : a.isSelected
                                  ? -1
                                  : 1
                        })
                        .map((item, index) => (
                            <div
                                key={`${item}_${index}`}
                                onClick={() => addFilter(item.title)}
                                data-selected={isSelected(item.title)}
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
                                        {item.title}
                                    </span>
                                </div>
                            </div>
                        ))}
                </section>
            </div>
        </div>
    )
}
