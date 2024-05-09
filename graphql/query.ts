import { gql } from "@apollo/client"

export const GET_USER_REPOS = gql`
    query GetUserRepositories($login: String!) {
        user(login: $login) {
            repositories(
                first: 100
                orderBy: { field: CREATED_AT, direction: DESC }
            ) {
                edges {
                    node {
                        name
                        languages(first: 10) {
                            edges {
                                node {
                                    name
                                }
                                size
                            }
                        }
                    }
                }
            }
        }
    }
`
