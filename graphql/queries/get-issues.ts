import { gql } from "@apollo/client"

type Repository = {
    owner: string
    name: string
    labels: string[]
    states: string[]
}

export function constructRepoQueries(inputs: Repository[]) {
    const queryParts = inputs.map((input, index) => {
        const labelsFormatted = JSON.stringify(input.labels)
        const statesFormatted = input.states
            .map((state) => state.toUpperCase())
            .join(", ")

        return `
            repo${index}: repository(owner: "${input.owner}", name: "${input.name}") {
                issues(first: 5, labels: ${labelsFormatted}, states: ${statesFormatted}) {
                    edges {
                        node {
                            title
                            url
                            number
                            publishedAt
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
