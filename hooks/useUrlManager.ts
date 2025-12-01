import React from "react"
import { FILTERTAGS } from "@/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const useUrlManager = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const urlParams = new URLSearchParams(Array.from(searchParams.entries()))

    const currentFilterValuesAndKeys = FILTERTAGS.flatMap((key) => {
        if (!urlParams.has(key)) {
            return []
        }

        return urlParams.getAll(key).map((val) => ({ key, filter: val }))
    })

    const onlyFilterValues = currentFilterValuesAndKeys.filter(
        (v) => v.key !== "search" && v.key !== "sort"
    )

    const extractFilterValues = (args: typeof onlyFilterValues) => {
        let filterValues: typeof onlyFilterValues = []

        args.map((val) => {
            const splitValues = val.filter
                .split(",")
                .map((filter) => ({ key: val.key, filter }))
            filterValues.push(...splitValues)
        })

        return { filterValues }
    }

    const addBadgeFilterParam = (key: string, value: string) => {
        value = value.toLowerCase()

        if (urlParams.get(key) === value) {
            urlParams.delete(key, value)
        } else {
            urlParams.set(key, value)
        }

        router.push(`${pathname}?${urlParams.toString()}`)
    }

    const addFilterParam = (key: string, value: string) => {
        value = value.toLowerCase()
        // if the urlParams already have the filter key
        if (urlParams.has(key)) {
            const isFilterPresent = urlParams
                .get(key)
                ?.split(",")
                .includes(value)

            // if the urlParams already have the filter key and the filter value is present
            if (isFilterPresent) {
                // delete key and filter param
                const valueInCheck = urlParams
                    .get(key)
                    ?.split(",")
                    .find((params) => params === value)

                if (valueInCheck) {
                    deleteFilterParam(key, valueInCheck)
                }
            } else {
                // if urlParam already have the filter key and the filter value is not present
                const getKeysAndJoin = [...urlParams.getAll(key), value].join(
                    ","
                )

                urlParams.set(key, getKeysAndJoin)
            }
        } else {
            // if urlParams doesn't have the key
            urlParams.append(key, value)
        }

        router.push(`${pathname}?${urlParams.toString()}`)
    }

    const addSortParam = (key: string, value: string) => {
        const filterGroup = urlParams.getAll(key)
        if (filterGroup.includes(value)) return
        if (key) {
            urlParams.set(key, value)
        }

        router.push(`${pathname}?${urlParams.toString()}`)
    }

    const sortKey = urlParams.get("sort")

    const searchQuery = urlParams.get("search")

    const addSearchQuery = (value: string) => {
        if (value) {
            urlParams.set("search", value)
        } else {
            urlParams.delete("search")
        }

        router.push(`${pathname}?${urlParams.toString()}`)
    }

    const deleteFilterParam = (key: string, value: string) => {
        const filterGroup = urlParams.get(key)?.split(",")

        if (filterGroup) {
            if (!filterGroup.includes(value)) return

            const valueToDelete = filterGroup
                ?.filter((val) => val !== value)
                .join(",")

            if (filterGroup?.length === 1) urlParams.delete(key, value)
            else {
                urlParams.set(key, valueToDelete)
            }
        }

        router.push(`${pathname}?${urlParams.toString()}`)
    }

    const clearAllFilters = () => {
        urlParams.set("page", String(1))

        const allKeys = FILTERTAGS.flatMap((key) => {
            if (!urlParams.has(key)) {
                return []
            }

            return urlParams.getAll(key).map((val) => ({ key, filter: val }))
        })

        allKeys.map((val) => urlParams.delete(val.key, val.filter))
        router.push(`${pathname}?${urlParams.toString()}`)
    }

    const currentFilterValues = FILTERTAGS.flatMap((key) => {
        if (!urlParams.has(key)) {
            return []
        }

        return urlParams.getAll(key)
    })

    const pageNumber = urlParams.get("page")

    const handleNextPage = (
        page: number,
        setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    ) => {
        urlParams.set("page", String(page))
        setCurrentPage(page)
        router.replace(`${pathname}?${urlParams.toString()}`)
    }

    return {
        addFilterParam,
        addBadgeFilterParam,
        currentFilterValues,
        currentFilterValuesAndKeys,
        onlyFilterValues,
        deleteFilterParam,
        clearAllFilters,
        addSortParam,
        sortKey,
        searchQuery,
        addSearchQuery,
        urlParams,
        pageNumber,
        router,
        handleNextPage,
        extractFilterValues
    }
}
