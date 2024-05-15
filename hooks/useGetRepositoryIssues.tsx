import { Issue, Projects } from "@/types"
import { useQuery } from "@apollo/client"

import { constructRepoQueries } from "../graphql/queries/get-issues"
import projects from "../public/opensource-projects/index.json"

const labels = ["good first issue", "bug", "help wanted"]
const states = ["OPEN"]

const projectRepoMetadata = Object.entries(projects as Projects).map(
    ([_, project]) => ({
        name: project.name,
        owner: project.org,
        languages: project.lang
    })
)
const repoWithLabelsAndStates = projectRepoMetadata.map((repo) => ({
    ...repo,
    labels,
    states
}))

export function useGetRepositoryIssues() {
    const query = constructRepoQueries(repoWithLabelsAndStates)
    const { data, loading, error, fetchMore } = useQuery(query, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    })

    const issues = data
        ? Object.entries(data).flatMap(([_, issuesData], index) => {
              if (!issuesData) return []
              return ((issuesData as any)?.issues?.edges as any[]).map(
                  (edge: { node: Issue }) => ({
                      ...edge.node,
                      owner: projectRepoMetadata[index].owner,
                      languages: projectRepoMetadata[index].languages,
                      repo: projectRepoMetadata[index].name
                  })
              )
          })
        : []

    return {
        issues,
        loading,
        error
    }
}
