import { Metadata } from "next"
import React from "react"

import RepositoryIssues from "@/components/repository-issues"
import { getRepoIssues } from "@/lib/get-repo-issues"

export const metadata: Metadata = {
    title: "Good First Issues | Bitcoin Dev Project",
    keywords: "bitcoin, open source, good first issues, bitcoin development",
    description:
        "Explore Good First Issues from vetted Bitcoin open-source projects and start making impactful contributions today!",
    openGraph: {
        images: ["https://bitcoindevs.xyz/good-first-issues.png"],
        title: "Good First Issues",
        url: "https://bitcoindevs.xyz/good-first-issues",
        description:
            "Explore Good First Issues from vetted Bitcoin open-source projects and start making impactful contributions today!"
    },
    twitter: {
        images: ["https://bitcoindevs.xyz/good-first-issues.png?v1"],
        card: "summary_large_image",
        title: "Good First Issues",
        description:
            "Explore Good First Issues from vetted Bitcoin open-source projects and start making impactful contributions today!"
    }
}

const Contribute = async () => {
    const issues = await getRepoIssues()
    return (
        <main className="container mx-auto">
            <RepositoryIssues issues={issues} />
        </main>
    )
}

export default Contribute
