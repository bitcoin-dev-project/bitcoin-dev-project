import React from "react"
import clsx from "clsx"
import { useUrlManager } from "@/hooks/useUrlManager"

const Badge = ({
    name,
    className,
    keys
}: {
    name: string
    className?: string
    keys: Array<{ [key: string]: string }>
}) => {
    const { addBadgeFilterParam } = useUrlManager()
    const isSelected = keys
        ?.map((value) => value.filter.toLowerCase())
        .includes(name.toLowerCase())

    return (
        <div
            className={clsx(
                `inline-flex w-fit items-center whitespace-nowrap rounded-full font-semibold hover:border-[1.5px] hover:border-gray-600 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 /80 px-2 py-1 text-xs cursor-pointer ${isSelected ? "border-gray-600 dark:border-black-500 text-black dark:text-white bg-gray-200 dark:bg-gray-800 border-[1.5px]" : ""}`,
                className
            )}
            onClick={() => addBadgeFilterParam("languages", name)}
            data-umami-event={`${name}-badge-filter-clicked`}
        >
            {name}
        </div>
    )
}

export default Badge
