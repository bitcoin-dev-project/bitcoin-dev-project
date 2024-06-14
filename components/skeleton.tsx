import React from "react"
import clsx from "clsx"

const Skeleton = ({ className }: { className?: string }) => {
    return (
        <>
            <div
                className={clsx(
                    "animate-pulse rounded-md bg-muted w-full",
                    className
                )}
            >
                <div className="flex items-center justify-between">
                    <div className="animate-pulse rounded-md bg-muted w-12"></div>
                    <div className="animate-pulse rounded-md bg-muted w-16"></div>
                </div>
            </div>
        </>
    )
}

export default Skeleton
