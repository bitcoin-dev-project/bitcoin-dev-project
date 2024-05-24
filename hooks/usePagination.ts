import { useState } from "react"

const emptyArray = [] as const

export function usePaginatedResult<T>(result: T[] | undefined, pageSize = 15) {
    const [currentPage, setCurrentPage] = useState(1)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = currentPage * pageSize
    const defaultResult = result ?? emptyArray

    return {
        currentPage,
        paginatedResult: defaultResult.slice(startIndex, endIndex),
        setCurrentPage
    }
}
