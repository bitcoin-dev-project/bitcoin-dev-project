import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { Dispatch, SetStateAction, useEffect } from "react"

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

    return (
        <div className="justify-center flex">
            {pages > 1 &&
                Array.from({ length: pages }, (_, index) => index + 1).map(
                    (item) => (
                        <button
                            onClick={() => handleNextPage(item)}
                            key={item}
                            className={`border border-gray-400 rounded-md p-4 ${currentPage === item ? "font-semibold" : "font-normal"}`}
                        >
                            {item}
                        </button>
                    )
                )}
        </div>
    )
}

export default Pagination
