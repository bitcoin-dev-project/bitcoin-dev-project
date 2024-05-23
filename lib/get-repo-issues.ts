import fs from "fs"

import { IssueCardElement, Projects, RepositoryIssues } from "@/types"
import { sanitize } from "@/utils/sanitize"

import projects from "../public/open-source-projects/index.json"

const projectRepoMetadata = Object.entries(projects as Projects).map(
    ([_, project]) => ({
        name: project.name,
        owner: project.org,
        languages: project.lang,
        tags: project.tags
    })
)

export const getRepoIssues = async () => {
    const result: IssueCardElement[] = []
    Promise.all(
        projectRepoMetadata.map((repo) => {
            // remove special characters from repo name
            const repoName = sanitize(repo.name)
            const repoPath = `public/open-source-projects/issues/${repoName}/index.json`
            if (!fs.existsSync(repoPath)) {
                console.log("No issues found")
                return []
            }
            const rawIssuesData = JSON.parse(
                fs.readFileSync(`${process.cwd()}/${repoPath}`, "utf-8")
            ) as RepositoryIssues[]
            const issues = rawIssuesData.map((issue) => {
                const issueNumber = issue.url?.split("/").pop() || ""
                return {
                    ...issue,
                    owner: repo.owner,
                    languages: repo.languages,
                    repo: repo.name,
                    tags: repo.tags,
                    number: parseInt(issueNumber)
                }
            })
            result.push(...issues)
        })
    )

    const randomisedIssues = result.sort(
        (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
    )
    return randomisedIssues
}
