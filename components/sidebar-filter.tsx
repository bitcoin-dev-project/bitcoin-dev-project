import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { useUrlManager } from "@/hooks/useUrlManager"
import { IssueCardElement } from "@/types"
import { createSortKeys, getValues, ISSUEOPTIONS, SORTOPTIONS } from "@/utils"

import useOnclickOut from "@/hooks/useOnclickOut"
import { FilterSvgIcon } from "@/public/FilterSvgIcon"
import { SortSvgIcon } from "@/public/SortSvgIcon"
import { CrossSvgIcon } from "@/public/CrossSvgIcon"
import { SearchSvgIcon } from "@/public/SearchSvgIcon"
import { CloseSidebarSvgIcon } from "@/public/CloseSidebarSvgIcon"
import { LightningSvgIcon } from "@/public/LightningSvgIcon"
import { UpArrowSvgIcon } from "@/public/UpArrowSvgIcon"

const SidebarFilter = ({
    toggle,
    issues
}: {
    toggle: () => void
    issues: IssueCardElement[]
}) => {
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
        <div className="w-[300px] max-lg:w-[250px] max-md:w-full flex flex-col gap-5">
            <FilterMenu toggle={toggle} />

            <section className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-2">
                    <SortSvgIcon />
                    <h5 className="text-base font-bold dark:text-white-400 opacity-85">
                        Sort by
                    </h5>
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

function FilterMenu({ toggle }: { toggle: () => void }) {
    const {
        deleteFilterParam,
        clearAllFilters,
        extractFilterValues,
        onlyFilterValues
    } = useUrlManager()
    const { filterValues } = extractFilterValues(onlyFilterValues)

    return (
        <>
            <div className="pb-2">
                <div className="py-3 border-b border-b-gray-400 flex justify-between">
                    <section className="flex items-center gap-2">
                        <FilterSvgIcon />
                        <p className="text-base max-md:text-xl font-bold">
                            Filters
                        </p>
                    </section>
                    <button
                        className="self-end rsor-pointer w- border border-gray-400 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg hidden max-md:block h-[46px] w-[41.68px]"
                        onClick={toggle}
                    >
                        <CloseSidebarSvgIcon />
                    </button>
                </div>
            </div>
            {filterValues.length ? (
                <div className="flex flex-col gap-4 border-b-gray-400 border-b pb-7">
                    <section className="flex items-center justify-between">
                        <p className="text-base font-bold">Applied Filters</p>
                        <button
                            className="cursor-pointer flex gap-2 items-center leading-[100%] hover:underline"
                            onClick={clearAllFilters}
                        >
                            Clear all
                            <span className="p-[6px] max-2xl:p-2 rounded-md bg-[#a4a4a8] text-white">
                                <CrossSvgIcon className="h-2 w-2 dark:text-black" />
                            </span>
                        </button>
                    </section>
                    <div className="flex flex-wrap gap-2">
                        {filterValues?.map((v) => (
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
            className="border border-gray-400 dark:border-black-800 px-3 py-2.5 rounded-md text-sm leading-[100%] hover:bg-gray-100 dark:hover:bg-gray-800  flex gap-2 items-center font-semibold capitalize bg-gray-200 dark:bg-gray-800"
        >
            {text}
            <CrossSvgIcon className="h-2 w-2" />
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
    ) ?? { key: "random", label: "random" }

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
                    className="w-full bg-white dark:bg-black border-[1.2px] dark:border-black-800 border-gray-300 rounded-lg cursor-pointer p-3 before:absolute capitalize font-medium flex items-center justify-between"
                    onClick={toggle}
                >
                    <p className="font-semibold text-custom-primary-text">
                        {currentSortKey.label}
                    </p>
                    <span
                        className={`group-aria-[expanded=false]/menuBtn:rotate-180 transition-transform ${isOpen && "rotate-180 transition-transform"}`}
                    >
                        <UpArrowSvgIcon className="w-[11px] h-[7px]" />
                    </span>
                </div>
            </section>

            <section
                className={`focus-visible:shadow-none focus-visible:outline-none mt-2 absolute z-50 right-0 left-0 bg-white dark:bg-black max-h-[300px] overflow-scroll font-medium rounded-xl shadow-md py-2 border border-gray-400 dark:border-black-800 ${isOpen ? "block" : "hidden"}`}
            >
                {sortKeys.map((item, index) => (
                    <div
                        key={`${item.label}_${index}`}
                        onClick={() => handleChange(item.key)}
                        data-selected={currentSortKey.key === item.key}
                        className="group"
                    >
                        <div className="w-full px-5 py-[8px] flex gap-2 group-data-[selected=false]:hover:bg-gray-200 dark:group-data-[selected=false]:hover:bg-gray-800 dark:hover:bg-gray-800 hover:bg-gray-200 cursor-pointer items-center">
                            <LightningSvgIcon className="group-data-[selected=false]:invisible w-4 h-4 text-[#2d2d2d] dark:text-inherit" />
                            <span
                                className={
                                    "group-data-[selected=true]:text-[#2d2d2d] dark:group-data-[selected=true]:text-white text-gray-400 group-data-[selected=true]:font-bold capitalize"
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
    const { addFilterParam, urlParams, extractFilterValues, onlyFilterValues } =
        useUrlManager()
    const { filterValues } = extractFilterValues(onlyFilterValues)
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

    const isSelected = useCallback(
        (value: string) =>
            filterValues.some(
                (val) => val.filter.toLowerCase() === value.toLowerCase()
            ),
        [filterValues]
    )

    const filterArgs = useMemo(() => {
        if (searchTerm === "")
            return args
                .map((val) => ({
                    title: val,
                    isSelected: isSelected(val)
                }))
                .slice(1)
        return args
            .slice(1)
            .map((arg) => ({
                title: arg.toLowerCase(),
                isSelected: isSelected(arg)
            }))
            .filter((arg) =>
                arg.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
    }, [args, searchTerm, isSelected])

    type SortObject = { title: string; isSelected: boolean }

    function customSort(a: SortObject, b: SortObject) {
        const alphabeticalSort = a.title
            .toLowerCase()
            .localeCompare(b.title.toLowerCase())

        const isSelectedSort =
            a.isSelected === b.isSelected ? 0 : a.isSelected ? -1 : 1

        return isSelectedSort || alphabeticalSort
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <h5 className="text-base font-bold dark:text-white-400 opacity-85">
                {title}
            </h5>
            <div className="w-full relative" ref={wrapperRef}>
                <section className="group/menuBtn">
                    <div className="relative" ref={contentRef}>
                        <input
                            className="text-base bg-white dark:bg-black font-medium w-full pl-12 pr-10 py-4 rounded-xl border-[1px] border-gray-300 dark:border-black-800 focus:outline-none focus:outline-offset-0 leading-none placeholder:text-gray-400 dark:text-gray-400 placeholder:font-medium dark:placeholder:text-gray-600"
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
                            <SearchSvgIcon className=" dark:text-gray-500 stroke-red-700" />
                        </span>
                        <span
                            data-is-open={isOpen}
                            onClick={toggle}
                            className="absolute p-2 cursor-pointer top-1/2 -translate-y-1/2 right-[18px] data-[is-open=false]:rotate-180 transition-transform"
                        >
                            <UpArrowSvgIcon className="w-[11px] h-[7px]" />
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
                    className={`focus-visible:shadow-none focus-visible:outline-none mt-2 absolute z-50 right-0 left-0 bg-white dark:bg-black max-h-[300px] overflow-scroll font-medium rounded-xl shadow-md py-2 border border-gray-400 dark:border-black-800 ${isOpen ? "block" : "hidden"}`}
                >
                    {filterArgs.length < 1 && (
                        <p className="w-full text-sm max-2xl:text-base text-center px-2">
                            No matching options
                        </p>
                    )}
                    {filterArgs.sort(customSort).map((item, index) => (
                        <div
                            key={`${item}_${index}`}
                            onClick={() => addFilter(item.title)}
                            data-selected={isSelected(item.title)}
                            className="group"
                        >
                            <div className="w-full px-5 py-[8px] flex gap-2 group-data-[selected=false]:hover:bg-gray-100 dark:hover:bg-gray-800 dark:group-data-[selected=false]:hover:bg-gray-800 hover:bg-gray-200  cursor-pointer items-center">
                                <LightningSvgIcon className="group-data-[selected=false]:invisible w-4 h-4 text-[#2d2d2d] dark:text-inherit" />
                                <span
                                    className={
                                        "group-data-[selected=true]:text-[#2d2d2d] dark:group-data-[selected=true]:text-white text-gray-400 group-data-[selected=true]:font-bold capitalize"
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
