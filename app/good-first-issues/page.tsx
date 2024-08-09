import React from "react"

import RepositoryIssues from "@/components/repository-issues"
import { getRepoIssues } from "@/lib/get-repo-issues"
import { genPageMetadata } from "../seo"

export const metadata = genPageMetadata({
    title: "Good First Issues | Bitcoin Dev Project",
    keywords: "bitcoin, open source, good first issues, bitcoin development",
    description:
        "Explore Good First Issues from vetted Bitcoin open-source projects and start making impactful contributions today!",
    openGraph: {
        images: [
            {
                url: "https://bitcoindevs.xyz/images/pages-thumbnails/good-first-issues.png",
                alt: "Good First Issues"
            }
        ],
        title: "Good First Issues",
        url: "https://bitcoindevs.xyz/good-first-issues",
        type: "website",
        description:
            "Explore Good First Issues from vetted Bitcoin open-source projects and start making impactful contributions today!"
    },
    twitter: {
        images: [
            "https://bitcoindevs.xyz/images/pages-thumbnails/good-first-issues.png"
        ],
        card: "summary_large_image",
        title: "Good First Issues | Bitcoin Dev Project",
        creator: "@Bitcoin_Devs",
        description:
            "Explore Good First Issues from vetted Bitcoin open-source projects and start making impactful contributions today!"
    }
})

const Contribute = async () => {
    const issues = await getRepoIssues()
    return (
        <main className="mx-auto">
            <RepositoryIssues issues={issues} />
        </main>
    )
}

export default Contribute
