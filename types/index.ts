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
