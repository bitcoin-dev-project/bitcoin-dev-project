/* 
    This file is used to create an Apollo Client instance that will be used in React Server 
    Components and not for Server Side Rendering in Client Components.
    See https://github.com/apollographql/apollo-client-nextjs?tab=readme-ov-file#usage for more details.
*/

import "server-only"
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import fetch from "cross-fetch"
import dotenv from "dotenv"

dotenv.config()

export const getClient = () => {
    const authToken =
        dotenv.config()?.parsed?.SFIGS_TOKEN || process.env.SFIGS_TOKEN
    if (!authToken) {
        console.error("SFIGS_TOKEN is not set in the environment variables")
        process.exit(1)
    }

    return new ApolloClient({
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        repository: {
                            merge(existing = {}, incoming) {
                                return {
                                    ...existing,
                                    ...incoming
                                }
                            }
                        }
                    }
                },
                Repository: {
                    fields: {
                        issues: {
                            merge(existing = { edges: [] }, incoming) {
                                return {
                                    ...existing,
                                    edges: [
                                        ...existing.edges,
                                        ...incoming.edges
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }),
        link: new HttpLink({
            uri: "https://api.github.com/graphql",
            fetch,
            headers: {
                authorization: `bearer ${authToken}`
            }
        })
    })
}
