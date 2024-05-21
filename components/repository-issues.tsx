"use client"

import Link from "next/link"
import React from "react"

import { useGetRepositoryIssues } from "@/hooks/useGetRepositoryIssues"

import Badge from "./badge"
import Skeleton from "./skeleton"
import { Issue } from "@/types"
import SearchInput from "./search-input"
import SidebarFilter from "./sidebar-filter"
import { useUrlManager } from "@/hooks/useUrlManager"
import { filterIssues } from "@/utils"

const RepositoryIssues = () => {
    const { error, issues, loading } = useGetRepositoryIssues()
    const {
        currentFilterValues,
        currentFilterValuesAndKeys,
        sortKey,
        searchQuery
    } = useUrlManager()

    const memoizedIssues = React.useMemo(
        () =>
            filterIssues(
                currentFilterValuesAndKeys,
                issues,
                sortKey,
                searchQuery
            ),
        [currentFilterValuesAndKeys, issues, sortKey, searchQuery]
    )

    if (error) return <div>Error: {error.message}</div>

    return (
        <main className="w-full min-h-[calc(100vh-88px)]">
            <div className="flex w-full gap-6 lg:gap-2">
                <section className="md:w-full block md:hidden py-6 px-14 lg:px-5">
                    <SidebarFilter toggle={() => {}} />
                </section>

                <section className="flex w-full flex-col items-center gap-6 px-10 lg:px-4 pl-0 md:pl-4">
                    <SearchInput
                        filtersCount={
                            currentFilterValues.length === 0
                                ? null
                                : currentFilterValues.length
                        }
                    />
                    {loading || !issues.length || issues.length === 0 ? (
                        <div className="grid gap-4 sm:grid-cols-1 grid-cols-3 w-full">
                            {Array.from({ length: 13 }).map((_, index) => (
                                <div
                                    key={`skeleton-${index}`}
                                    className="w-full"
                                >
                                    <Skeleton className="block rounded-lg border border-gray-200 bg-white p-6 h-48 shadow-sm transition-all hover:shadow-md dark:border-gray-300 dark:bg-gray-400 opacity-10" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 grid-cols-3">
                            {memoizedIssues.map((issue, index) => (
                                <section key={`issue-${index}-${issue.number}`}>
                                    <IssueCard
                                        issue={
                                            issue as unknown as IssueCardElement
                                        }
                                        index={index}
                                        keys={currentFilterValues}
                                    />
                                </section>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}

export default RepositoryIssues

type IssueCardElement = Issue & {
    owner: string
    languages: string[]
    repo: string
}

const IssueCard = React.memo(function IssueCard({
    issue,
    index,
    keys
}: {
    issue: IssueCardElement
    index: number
    keys: string[]
}): JSX.Element {
    return (
        <Link
            key={`issue-${index}-${issue.number}`}
            className="flex flex-col justify-between min-h-[180px] md:min-h-36 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md"
            href={issue.url}
            rel="noopener noreferrer"
            target="_blank"
        >
            <div className="flex flex-col justify-between">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                        {`${issue.repo}/${issue.owner}`}
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
                    <span className="text-gray-500">#{issue.number}</span>{" "}
                    {issue.title}
                </h3>
            </div>
            <div className="flex flex-wrap mt-2 gap-2">
                {issue.languages.map((lang) => (
                    <Badge
                        key={lang}
                        name={lang}
                        className="mr-2"
                        keys={keys}
                    />
                ))}
            </div>
        </Link>
    )
})
