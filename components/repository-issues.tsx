"use client"

import Link from "next/link"
import React from "react"

import { useGetRepositoryIssues } from "@/hooks/useGetRepositoryIssues"
import { Issue } from "@/types"

import Badge from "./badge"
import Skeleton from "./skeleton"

const RepositoryIssues = ({
    owner,
    name,
    languages
}: {
    owner: string
    name: string
    languages: string[]
}) => {
    const { issues, loading, error } = useGetRepositoryIssues({ owner, name })
    console.log({ issues, loading, error })

    if (loading) {
        return (
            <div className="w-full">
                <Skeleton className="block rounded-lg border border-gray-200 bg-white p-6 h-48 shadow-sm transition-all hover:shadow-md dark:border-gray-300 dark:bg-gray-400 opacity-10" />
            </div>
        )
    }
    if (error) return <div>Error: {error.message}</div>

    return (
        <>
            {issues.map((issue: Issue, index) => (
                <Link
                    key={`issue-${index}-issue.number`}
                    className="flex flex-col justify-between min-h-[180px] md:min-h-36 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md"
                    href={issue.url}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <div className="flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">
                                {`${name}/${owner}`}
                            </span>
                            <span className="text-xs text-gray-500">
                                {new Date(issue.publishedAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    }
                                )}{" "}
                            </span>
                        </div>
                        <h3 className="mt-2 text-lg md:text-base font-medium text-gray-900">
                            <span className="text-gray-500">
                                #{issue.number}
                            </span>{" "}
                            {issue.title}
                        </h3>
                    </div>
                    <div className="flex flex-wrap mt-2">
                        {languages.map((lang) => (
                            <Badge key={lang} name={lang} className="mr-2" />
                        ))}
                    </div>
                </Link>
            ))}
        </>
    )
}

export default RepositoryIssues
