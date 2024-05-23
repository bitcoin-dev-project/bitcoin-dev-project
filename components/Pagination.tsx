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

    // const pagesToShow = useMemo(() => {
    //     const pagesArray = []

    //     // Always show the first page
    //     pagesArray.push(1)

    //     // Determine the range around the current page
    //     let start = Math.max(2, currentPage - 2)
    //     let end = Math.min(pages - 1, currentPage + 2)

    //     if (start > 2) {
    //         pagesArray.push("...")
    //     }

    //     for (let i = start; i <= end; i++) {
    //         pagesArray.push(i)
    //     }

    //     if (end < pages - 1) {
    //         pagesArray.push("...")
    //     }

    //     // Always show the last page if there are at least two pages
    //     if (pages > 1) {
    //         pagesArray.push(pages)
    //     }

    //     return pagesArray
    // }, [currentPage, pages])

    const pagesToShow = useMemo(() => {
        let pagesArray = []
        let start, end

        // Always show the first page
        pagesArray.push(1)

        // Always include the first page if not already included in the dynamic range
        // if (currentPage > 3) {
        //     pagesArray.push(1)
        // }

        if (currentPage > 4) {
            pagesArray.push("...")
        }

        // Calculate the dynamic window of pages around the current page
        start = Math.max(2, currentPage - 2)
        end = Math.min(pages - 1, currentPage + 2)

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

    // const React.useMemo(() => pagesToShow, [])

    return (
        <>
            {/* <div className="justify-center flex gap-3">
                <section className="flex gap-3">
                    {pages > 1 &&
                        Array.from(
                            { length: pages },
                            (_, index) => index + 1
                        ).map((item) => (
                            <button
                                onClick={() => handleNextPage(item)}
                                key={item}
                                className={`rounded-md h-12 w-12 cursor-pointer ${currentPage === item ? "font-bold bg-gray-10 bg-[#2d2d2d] text-white cursor-none" : "font-normal bg-transparent border-none hover:bg-gray-100 cursor-pointer"}`}
                            >
                                {item}
                            </button>
                        ))}
                </section>
            </div> */}

            {/* CHAT */}

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
                            key={item}
                            // className={`border border-gray-400 rounded-md p-2 ${currentPage === item ? "bg-blue-500 text-white font-semibold" : "font-normal"}`}
                            className={`rounded-md h-12 w-12 cursor-pointer ${currentPage === item ? "font-bold bg-gray-10 bg-[#2d2d2d] text-white cursor-none" : "font-normal bg-transparent border-none hover:bg-gray-100 cursor-pointer"}`}
                        >
                            {item}
                        </button>
                    )
                })}

                {currentPage < pages && (
                    <button
                        onClick={() => handleNextPage(currentPage + 1)}
                        className="border border-gray-400 rounded-md h-10 w-10"
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
