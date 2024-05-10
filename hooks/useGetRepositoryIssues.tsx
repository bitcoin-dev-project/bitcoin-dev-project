import { Issue } from "@/types"
import { useQuery } from "@apollo/client"

import { GET_REPO_ISSUES } from "../graphql/queries/get-issues"

export function useGetRepositoryIssues({
    owner,
    name
}: {
    owner: string
    name: string
}) {
    const labels = ["good first issue", "bug", "help wanted"]
    const states = ["OPEN"]

    const { data, loading, error } = useQuery(GET_REPO_ISSUES, {
        variables: {
            owner,
            name,
            labels,
            states
        },
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    })

    return {
        issues: data?.repository.issues.edges.map(
            (edge: { node: Issue }) => edge.node
        ) as Issue[],
        loading,
        error
    }
}
