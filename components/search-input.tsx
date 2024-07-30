import React, { useState } from "react"
import { useUrlManager } from "@/hooks/useUrlManager"
import { FilterSvgIcon } from "@/public/FilterSvgIcon"

const SearchInput = ({
    filtersCount,
    toggle
}: {
    filtersCount: number | null
    toggle: () => void
}) => {
    const { searchQuery, addSearchQuery, urlParams } = useUrlManager()
    const [value, setValue] = useState(searchQuery ?? "")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        urlParams.set("page", String(1))

        event.preventDefault()
        setValue(event.target.value)
        addSearchQuery(event.target.value)
    }

    return (
        <div className="flex items-center justify-center w-full max-w-3xl pt-6 pr-[7px]">
            <div className="flex gap-4 max-md:gap-2 items-center w-full">
                <input
                    type="text"
                    className={
                        "text-black border-[1.5px] bg-white dark:bg-black text-base rounded-md placeholder:font-rebond placeholder:font-light outline-gray-600 border-gray-500 px-4 max-sm:px-2 max-sm:placeholder:text-[13px] placeholder:text-gray-500 dark:text-gray-300 h-12 w-full"
                    }
                    placeholder="Search by title, repository, or language"
                    onChange={handleChange}
                    value={value}
                />

                <section className="hidden max-md:block relative">
                    <button
                        className="cursor-pointer w-fit border border-gray-400 dark:border-black-800 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg relative"
                        onClick={toggle}
                    >
                        <FilterSvgIcon />
                    </button>
                    {filtersCount && filtersCount > 0 ? (
                        <section className="h-3.5 w-3.5 bg-black dark:bg-white-50 rounded-full text-white dark:text-black text-[10px] dark:font-medium flex items-center justify-center absolute top-0 right-0 mt-[-6px] mr-[-6px]">
                            <p className="leading-[90%]">{filtersCount}</p>
                        </section>
                    ) : null}
                </section>
            </div>
        </div>
    )
}

export default SearchInput
