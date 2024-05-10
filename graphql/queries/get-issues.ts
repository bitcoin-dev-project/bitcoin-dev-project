import { gql } from "@apollo/client"

export const GET_REPO_ISSUES = gql`
    query GetIssues(
        $owner: String!
        $name: String!
        $labels: [String!]
        $states: [IssueState!]
    ) {
        repository(owner: $owner, name: $name) {
            issues(first: 10, labels: $labels, states: $states) {
                edges {
                    node {
                        title
                        url
                        number
                        publishedAt
                    }
                }
            }
        }
    }
`
