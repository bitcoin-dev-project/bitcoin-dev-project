import { ProjectProperties, Projects } from "@/types"
import projects from "../public/opensource-projects/index.json"

export const SORTOPTIONS = ["sort", "relevance", "newest first", "oldest first"]

export const ISSUETYPEOPTIONS = [
    "issue_type",
    "good-first-issue",
    "bugs",
    "help-wanted"
]

export const FILTERTAGS = ["sort", "issue_type", "lang", "tags", "name", "org"]

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

export const filterIssues = (
    filterArg: string[],
    filterArgNkey: { [key: string]: string }[],
    dataSet: {
        owner: string
        languages: string[]
        repo: string
        title: string
        url: string
        number: number
        publishedAt: string
    }[]
) => {
    /** Things to account for: 
		- sort: publishedAt
		- issue_type: labels
		- lang: languages
		- tags: tags in repo against the one we created
		- name: repos
		- org: organisation
		**/

    let result = dataSet
    const extractSortKeys = filterArgNkey.filter((item) => item.key === "sort")

    const sortKeys = {
        sort_asc: "+",
        sort_desc: "-"
    }
}
