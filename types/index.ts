export type ProjectProperties = {
    name: string
    repo_url: string
    org: string
    issue: string
    tags: string[]
    lang: string[]
}

export type Projects = {
    [key: string]: ProjectProperties
}

export type Issue = {
    title: string
    url: string
    number: number
    publishedAt: string
    labels: {
        edges: {
            node: {
                name: string
            }
        }[]
    }
}

export type RepositoryIssues = {
    url: string
    publishedAt: string
    title: string
    labels: string[]
    tags: string[]
}

export type IssueCardElement = RepositoryIssues & {
    owner: string
    languages: string[]
    repo: string
    number: number
}
