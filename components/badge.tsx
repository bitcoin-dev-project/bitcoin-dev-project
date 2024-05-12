import React from "react"
import clsx from "clsx"

const Badge = ({ name, className }: { name: string; className?: string }) => {
    return (
        <>
            <div
                className={clsx(
                    "inline-flex w-fit items-center whitespace-nowrap rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gray-100 text-gray-600 hover:bg-gray-100/80 px-2 py-1 text-xs",
                    className
                )}
            >
                {name}
            </div>
        </>
    )
}

export default Badge
