import { ProjectProperties, Projects } from "@/types"
import projects from "../public/opensource-projects/index.json"

export const SORTOPTIONS = ["sort", "relevance", "newest first", "oldest first"]

export const ISSUEOPTIONS = [
    "issue_type",
    "good-first-issue",
    "bugs",
    "help-wanted"
]

export const FILTERTAGS = [
    "search",
    "sort",
    "issue_type",
    "lang",
    "tags",
    "name",
    "org"
]

export function getValues(key: keyof ProjectProperties) {
    let properties: string[] = []

    Object.values(projects as Projects).map((project) => {
        if (Array.isArray(project[key])) {
            properties.push(...(project[key] as string[]))
        } else {
            properties.push(project[key] as string)
        }
    })

    properties = Array.from(new Set([key, ...properties]).values())

    return { properties }
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
    dataSet: Array<Record<string, string | string[] | number>>,
    sortKey: string | null,
    searchQuery: string | null
) {
    let result: Array<Record<string, string | string[] | number>> = []

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
    result: Array<Record<string, string | string[] | number>>
) => {
    switch (sortKey) {
        case "relevance":
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
    dataSet: Array<Record<string, string | string[] | number>>,
    filterArgNkey: { key: string; filter: string }[],
    result: Array<Record<string, string | string[] | number>>
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
            let valueInCheck = resultValue?.[key]

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
    result: Array<Record<string, string | string[] | number>>
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

const { properties: languages } = getValues("lang")
const { properties: tags } = getValues("tags")
const { properties: repos } = getValues("name")
const { properties: orgs } = getValues("org")

export const filterPropertiesDataSet = [
    // keeping these here until some issues are clarified
    // { title: "Issue type", placeholder: "Search issues", args: ISSUEOPTIONS },
    {
        title: "Language",
        placeholder: "Search languages",
        args: languages
    },
    { title: "Tags", placeholder: "Search Tags", args: tags },
    {
        title: "Repositories",
        placeholder: "Search Repositories",
        args: repos
    },
    {
        title: "Organisations",
        placeholder: "Search Organisations",
        args: orgs
    }
]
