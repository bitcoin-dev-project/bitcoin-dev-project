import { useUrlManager } from "@/hooks/useUrlManager"
import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react"

type IPagination = {
    pages: number
    currentPage: number
    setCurrentPage: Dispatch<SetStateAction<number>>
}
const Pagination = ({ pages, currentPage, setCurrentPage }: IPagination) => {
    const { pageNumber, router, handleNextPage } = useUrlManager()

    useEffect(() => {
        if (pageNumber) {
            setCurrentPage(Number(pageNumber as string))
        }
    }, [router, setCurrentPage, pageNumber])

    const pagesToShow = useMemo(() => {
        let pagesArray = []
        let start, end

        if (pages === 0) {
            return []
        }
        // Always show the first page
        pagesArray.push(1)

        // Calculate the dynamic window of pages around the current page
        start = Math.max(2, currentPage - 2)
        const numToUse = currentPage === 1 ? 4 : 2
        end = Math.min(pages - 1, currentPage + numToUse)

        // Create the range of pages based on the start and end
        for (let i = start; i <= end; i++) {
            pagesArray.push(i)
        }

        // If there are pages left after the current window, show '...' and the last page
        if (end < pages - 1) {
            pagesArray.push("...")
        }
        if (end < pages && pages >= 2) {
            pagesArray.push(pages)
        }

        return pagesArray
    }, [currentPage, pages])

    return (
        <>
            <div className="flex justify-center items-center gap-2 max-md:gap-1">
                {currentPage > 1 && (
                    <button
                        onClick={() =>
                            handleNextPage(currentPage - 1, setCurrentPage)
                        }
                        className="border border-gray-400 rounded-md h-10 w-10 max-md:h-7 max-md:w-7  flex items-center justify-center"
                        aria-label="Previous Page"
                    >
                        {"<"}
                    </button>
                )}

                {pagesToShow.map((item, index) => {
                    if (item === "...") {
                        return (
                            <span key={index} className="font-semibold">
                                ...
                            </span>
                        )
                    }
                    return (
                        <button
                            onClick={() =>
                                handleNextPage(Number(item), setCurrentPage)
                            }
                            key={Number(item) * Math.random() * 3.142}
                            className={`rounded-md h-12 w-12 max-md:h-8 max-md:w-8 cursor-pointer ${currentPage === item ? "font-bold bg-gray-10 bg-[#2d2d2d] text-white cursor-none" : "font-normal bg-transparent hover:border hover:border-gray-400 cursor-pointer"}`}
                        >
                            {item}
                        </button>
                    )
                })}

                {currentPage < pages && (
                    <button
                        onClick={() =>
                            handleNextPage(currentPage + 1, setCurrentPage)
                        }
                        className="flex items-center justify-center rounded-md h-12 w-12 max-md:h-7 max-md:w-7 hover:border hover:border-gray-400"
                        aria-label="Next Page"
                    >
                        {">"}
                    </button>
                )}
            </div>
        </>
    )
}

export default Pagination
