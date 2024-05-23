import { gql } from "@apollo/client"

type Repository = {
    owner: string
    name: string
    labels: string[]
    states: string[]
}
function sanitize(name: string) {
    return name.replace(/[^a-zA-Z0-9_]/g, "")
}

export function constructRepoQueries(inputs: Repository[]) {
    const queryParts = inputs.map((input, index) => {
        const labelsFormatted = JSON.stringify(input.labels)
        const statesFormatted = input.states
            .map((state) => state.toUpperCase())
            .join(", ")
        const alias = `${sanitize(input.name)}`

        return `
            ${alias}: repository(owner: "${input.owner}", name: "${input.name}") {
                issues(first: 99, labels: ${labelsFormatted}, states: ${statesFormatted}) {
                    edges {
                        node {
                            title
                            url
                            number
                            publishedAt
                            labels (first: 5) {
                                edges {
                                    node {
                                        name
                                    }
                                }
                            }
                        }
                    }
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                }
            }
        `
    })

    return gql`
        query GetIssues {
            ${queryParts.join("\n")}
        }
    `
}
