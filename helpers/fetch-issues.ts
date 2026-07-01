import fs from "node:fs"
import path from "node:path"

import fetch from "cross-fetch"
import dotenv from "dotenv"

import { constructRepoQueries } from "../graphql/queries/get-issues"
import { getClient } from "../lib/apollo-client"
import projects from "../public/open-source-projects/index.json"
import type { Issue, Projects } from "../types"
import { sanitize } from "../utils/sanitize"

dotenv.config()

type ProjectIssue = {
    url: string
    publishedAt: string
    title: string
    labels: string[]
    imageUrl: string
}

const labels = ["good first issue", "bug", "help wanted"]
const states = ["OPEN"]

const allProjects = Object.entries(projects as Projects)
const githubProjects = allProjects.filter(
    ([_, p]) => !p.platform || p.platform === "github"
)
const gitlabProjects = allProjects.filter(([_, p]) => p.platform === "gitlab")

const githubRepoMetadata = githubProjects.map(([_, project]) => ({
    name: project.name,
    owner: project.org,
    languages: project.lang
}))

const repoWithLabelsAndStates = githubRepoMetadata.map((repo) => ({
    ...repo,
    labels,
    states
}))

const saveIssuesToFile = async (
    repoName: string,
    projectIssues: ProjectIssue[]
) => {
    const repoPath = `public/open-source-projects/issues/${repoName}/index.json`
    const dir = path.dirname(repoPath)
    if (!fs.existsSync(dir)) {
        await fs.promises.mkdir(dir, { recursive: true })
    }
    await fs.promises.writeFile(
        repoPath,
        JSON.stringify(projectIssues, null, 2)
    )
    console.log(`Saved issues for ${repoName} in ${repoPath} successfully!`)
}

const fetchGithubIssues = async () => {
    const apolloClient = getClient()
    const query = constructRepoQueries(repoWithLabelsAndStates)
    console.log("Fetching GitHub issues...")
    const { data } = await apolloClient.query({ query })
    for (const [key, issuesData] of Object.entries(data)) {
        if (!issuesData) continue
        const issues = (issuesData as any)?.issues?.edges as any[]
        const repositoryImage = (issuesData as any)?.owner?.avatarUrl as string
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
        await saveIssuesToFile(key, projectIssues)
    }
}

const fetchGitlabIssues = async () => {
    const gitlabToken = process.env.GITLAB_TOKEN
    const authHeaders: Record<string, string> = gitlabToken
        ? { Authorization: `Bearer ${gitlabToken}` }
        : {}

    for (const [_, project] of gitlabProjects) {
        const encodedPath = encodeURIComponent(`${project.org}/${project.name}`)
        const issuesMap = new Map<number, ProjectIssue>()

        let imageUrl = ""
        try {
            const groupRes = await fetch(
                `https://gitlab.com/api/v4/groups/${project.org}`,
                { headers: authHeaders }
            )
            const group = await groupRes.json()
            imageUrl = (group as any).avatar_url || ""
        } catch {
            // non-fatal: imageUrl stays empty
        }

        const gitlabLabels = project.gitlab_labels ?? labels
        for (const label of gitlabLabels) {
            const url =
                `https://gitlab.com/api/v4/projects/${encodedPath}/issues` +
                `?state=opened&labels=${encodeURIComponent(label)}&per_page=99`
            const res = await fetch(url, { headers: authHeaders })
            const issues: any[] = await res.json()

            for (const issue of issues) {
                if (!issuesMap.has(issue.iid)) {
                    issuesMap.set(issue.iid, {
                        url: issue.web_url,
                        publishedAt: issue.created_at,
                        title: issue.title,
                        labels: issue.labels,
                        imageUrl
                    })
                }
            }
        }

        const repoName = sanitize(project.name)
        await saveIssuesToFile(repoName, Array.from(issuesMap.values()))
    }
}

const fetchAndSaveIssues = async () => {
    try {
        await fetchGithubIssues()
        if (gitlabProjects.length > 0) {
            console.log("Fetching GitLab issues...")
            await fetchGitlabIssues()
        }
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
