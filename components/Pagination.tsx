import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react"

type IPagination = {
    pages: number
    currentPage: number
    setCurrentPage: Dispatch<SetStateAction<number>>
}
const Pagination = ({ pages, currentPage, setCurrentPage }: IPagination) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const urlParams = new URLSearchParams(searchParams)

    const pageNumber = urlParams.get("page")

    const handleNextPage = (page: number) => {
        urlParams.set("page", String(page))
        setCurrentPage(page)
        router.replace(`${pathname}?${urlParams.toString()}`)
    }

    useEffect(() => {
        if (pageNumber) {
            setCurrentPage(Number(pageNumber as string))
        }
    }, [router, setCurrentPage, pageNumber])

    const pagesToShow = useMemo(() => {
        let pagesArray = []
        let start, end

        // Always show the first page
        pagesArray.push(1)
        if (currentPage === pages) {
            pagesArray.push(2)
        }

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
        if (end < pages) {
            pagesArray.push(pages)
        }

        return pagesArray
    }, [currentPage, pages])

    return (
        <>
            <div className="flex justify-center items-center gap-2">
                {currentPage > 1 && (
                    <button
                        onClick={() => handleNextPage(currentPage - 1)}
                        className="border border-gray-400 rounded-md h-10 w-10"
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
                            onClick={() => handleNextPage(Number(item))}
                            key={Number(item) * Math.random() * 3.142}
                            className={`rounded-md h-12 w-12 cursor-pointer ${currentPage === item ? "font-bold bg-gray-10 bg-[#2d2d2d] text-white cursor-none" : "font-normal bg-transparent hover:border hover:border-gray-400 cursor-pointer"}`}
                        >
                            {item}
                        </button>
                    )
                })}

                {currentPage < pages && (
                    <button
                        onClick={() => handleNextPage(currentPage + 1)}
                        className="flex items-center justify-center rounded-md h-12 w-12 hover:border hover:border-gray-400"
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
