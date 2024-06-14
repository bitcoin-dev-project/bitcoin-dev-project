import React from "react"

import RepositoryIssues from "@/components/repository-issues"
import { getRepoIssues } from "@/lib/get-repo-issues"

const Contribute = async () => {
    const issues = await getRepoIssues()
    return (
        <main className="container mx-auto">
            <RepositoryIssues issues={issues} />
        </main>
    )
}

export default Contribute
