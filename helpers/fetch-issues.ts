import fs from "node:fs"
import path from "node:path"

import { constructRepoQueries } from "../graphql/queries/get-issues"
import { getClient } from "../lib/apollo-client"
import projects from "../public/open-source-projects/index.json"
import type { Issue, Projects } from "../types"

type ProjectIssue = {
    url: string
    publishedAt: string
    title: string
    labels: string[]
    imageUrl: string
}

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

const fetchAndSaveIssues = async () => {
    try {
        const apolloClient = getClient()
        const query = constructRepoQueries(repoWithLabelsAndStates)
        console.log("Fetching issues...")
        const { data } = await apolloClient.query({ query })
        for (const [key, issuesData] of Object.entries(data)) {
            if (!issuesData) continue
            const issues = (issuesData as any)?.issues?.edges as any[]
            const repositoryImage = (issuesData as any)?.owner
                ?.avatarUrl as string
            const projectIssues: ProjectIssue[] = issues.map(
                (edge: { node: Issue }) => ({
                    url: edge.node.url,
                    publishedAt: edge.node.publishedAt,
                    title: edge.node.title,
                    labels: edge.node.labels.edges.map(
                        (label: { node: { name: string } }) => label.node.name
                    ),
                    imageUrl: repositoryImage
                })
            )
            const repoPath = `public/open-source-projects/issues/${key}/index.json`
            const dir = path.dirname(repoPath)
            if (!fs.existsSync(dir)) {
                await fs.promises.mkdir(dir, {
                    recursive: true
                })
            }
            await fs.promises.writeFile(
                repoPath,
                JSON.stringify(projectIssues, null, 2)
            )
            console.log(`Saved issues for ${key} in ${repoPath} successfully!`)
        }
        return data
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

fetchAndSaveIssues()
    .then(() => console.log("Fetched and saved issues successfully!"))
    .catch((error) => {
        console.error("Error fetching and saving issues", error)
        process.exit(1)
    })
