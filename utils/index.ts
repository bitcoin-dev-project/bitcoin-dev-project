import type { IssueCardElement } from "../types"

export const SORTOPTIONS = ["sort", "randomn", "newest first", "oldest first"]

export const ISSUEOPTIONS = ["labels", "good first issue", "bug", "help wanted"]

export const FILTERTAGS = [
    "search",
    "sort",
    "labels",
    "languages",
    "tags",
    "repo",
    "owner"
]

export function getValues({
    key,
    issues
}: {
    key: keyof IssueCardElement
    issues: IssueCardElement[]
}) {
    const properties = issues.reduce(
        (acc, issue) => {
            const project = issue[key]
            if (Array.isArray(project)) {
                return acc.concat(project)
            }
            acc.push(project as string)
            return acc
        },
        [key] as string[]
    )
    const uniqueProperties = Array.from(new Set(properties).values())

    return { properties: uniqueProperties }
}

export const createSortKeys = () => {
    const sortKeys = SORTOPTIONS.slice(1).map((key) => {
        const dashed_key = key.split(" ").join("-")
        return { key: dashed_key, label: key }
    })

    return { sortKeys }
}

export function filterIssues(
    filterArgNkey: { key: string; filter: string }[],
    dataSet: IssueCardElement[],
    sortKey: string | null,
    searchQuery: string | null
) {
    let result: IssueCardElement[] = []

    if (!filterArgNkey.length || filterArgNkey.length === 0) {
        return dataSet
    }

    if (filterArgNkey.length) {
        applyFilter(dataSet, filterArgNkey, result)
    }

    if (sortKey) {
        result = result.length === 0 ? dataSet : result
        applySort(sortKey, result)
    }

    if (searchQuery) {
        result = result.length === 0 ? dataSet : result
        return applySearch(searchQuery, result)
    }

    return result
}

// applies sort to the dataset or result
// Sorts according to newest-issues, oldest-issues and relevance which is the default state
export const applySort = (
    sortKey: string | null,
    result: IssueCardElement[]
) => {
    switch (sortKey) {
        case "randomn":
            return result
        case "newest-first":
            return result.sort(
                (a, b) =>
                    new Date(b.publishedAt as string).getTime() -
                    new Date(a.publishedAt as string).getTime()
            )
        case "oldest-first":
            return result.sort(
                (a, b) =>
                    new Date(a.publishedAt as string).getTime() -
                    new Date(b.publishedAt as string).getTime()
            )
        default:
            break
    }
}

// applies filter to the dataset or result
// filter searhes each item in the dataset based on filter key selected and returns results as expected
export const applyFilter = (
    dataSet: IssueCardElement[],
    filterArgNkey: { key: string; filter: string }[],
    result: IssueCardElement[]
) => {
    const rename_keys = filterArgNkey.map(({ key, filter }) => {
        switch (key) {
            case "name":
                return { key: "repo", filter }
            case "lang":
                return { key: "languages", filter }
            case "org":
                return { key: "owner", filter }
            default:
                return { key, filter }
        }
    })

    dataSet.filter((resultValue) => {
        rename_keys.map(({ key, filter }) => {
            filter = filter.toLowerCase()
            const isPresent = result.some(
                (val) => val.number === resultValue.number
            )
            let valueInCheck = resultValue?.[key as keyof IssueCardElement]

            if (Array.isArray(valueInCheck)) {
                valueInCheck = valueInCheck.map((val) => val.toLowerCase())
                if (valueInCheck.includes(filter)) {
                    if (isPresent) return
                    return result.push(resultValue)
                }
            } else if (
                typeof valueInCheck === "string" &&
                valueInCheck.toLowerCase() === filter.toLowerCase()
            ) {
                if (isPresent) return
                return result.push(resultValue)
            }
        })
    })
}

// applies search to the dataset or result
// Search is based on title, repository and language
export const applySearch = (
    searchQuery: string | null,
    result: IssueCardElement[]
) => {
    const nullableSearchTerm = searchQuery?.toLocaleLowerCase() ?? ""

    return result.filter((item) => {
        return (
            (item?.title as string)
                .toLowerCase()
                .includes(nullableSearchTerm) ||
            (item?.owner as string)
                .toLowerCase()
                .includes(nullableSearchTerm) ||
            (item?.repo as string).toLowerCase().includes(nullableSearchTerm) ||
            (item?.languages as string[]).some((val) =>
                val.toLowerCase().includes(nullableSearchTerm)
            )
        )
    })
}

export function shuffle(data: IssueCardElement[]) {
    let currIndex = data.length

    while (currIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currIndex)
        currIndex--
        ;[data[currIndex], data[randomIndex]] = [
            data[randomIndex],
            data[currIndex]
        ]
    }

    return data
}

export const swapImageUrl = (name: string, imageUrl: string) => {
    switch (name) {
        case "polar":
            return "/images/projects/polar.jpg"
        case "lnd":
            return "/images/projects/lnd.png"
        default:
            return imageUrl
    }
}
