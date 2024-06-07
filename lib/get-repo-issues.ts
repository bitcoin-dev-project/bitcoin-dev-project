import fs from "node:fs"
import path from "node:path"

import type { IssueCardElement, Projects, RepositoryIssues } from "@/types"
import { sanitize } from "@/utils/sanitize"
import projects from "../public/open-source-projects/index.json"
import { swapImageUrl } from "@/utils"

const projectRepoMetadata = Object.entries(projects as Projects).map(
    ([_, project]) => ({
        name: project.name,
        owner: project.org,
        languages: project.lang,
        tags: project.tags
    })
)

export const getRepoIssues = async (): Promise<IssueCardElement[]> => {
    try {
        const issuesPromises = projectRepoMetadata.map(async (repo) => {
            // remove special characters from repo name
            const repoName = sanitize(repo.name)
            const repoPath = path.join(
                "public",
                "open-source-projects",
                "issues",
                repoName,
                "index.json"
            )

            return fs.promises
                .readFile(path.join(process.cwd(), repoPath), "utf-8")
                .then<RepositoryIssues[]>(JSON.parse)
                .then((res) =>
                    res.map((issue) => ({
                        ...issue,
                        owner: repo.owner,
                        languages: repo.languages,
                        repo: repo.name,
                        tags: repo.tags,
                        number: parseInt(issue.url?.split("/").pop() || ""),
                        imageUrl: swapImageUrl(
                            repo.name.toLowerCase(),
                            issue.imageUrl
                        )
                    }))
                )
                .catch((error) => {
                    console.log("No issues found", error)
                    return []
                })
        })

        const issuesArrays = await Promise.all(issuesPromises)
        const allIssues = issuesArrays.flat()
        return allIssues.sort(
            (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
        )
    } catch (error) {
        console.error("Error processing repository issues:", error)
        return []
    }
}
