import React from "react"
import clsx from "clsx"

const Badge = ({
    name,
    className,
    keys
}: {
    name: string
    className?: string
    keys: string[]
}) => {
    const isSelected = keys.includes(name.toLowerCase())

    return (
        <div
            className={clsx(
                `inline-flex w-fit items-center whitespace-nowrap rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-gray-100 text-gray-600 hover:bg-gray-100/80 px-2 py-1 text-xs ${isSelected ? "border-gray-600 text-black bg-gray-200 border-[1.5px]" : ""}`,
                className
            )}
        >
            {name}
        </div>
    )
}

export default Badge
