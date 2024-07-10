"use client"

import Link from "next/link"
import React, { useState } from "react"

import { useUrlManager } from "@/hooks/useUrlManager"
import { IssueCardElement } from "@/types"
import { filterIssues } from "@/utils"

import Badge from "./badge"
import SearchInput from "./search-input"
import SidebarFilter from "./sidebar-filter"
import Skeleton from "./skeleton"
import { usePaginatedResult } from "@/hooks/usePagination"
import Pagination from "./Pagination"
import Image from "next/image"
import { slugify } from "@/utils/slugify"

const RepositoryIssues = ({ issues }: { issues: IssueCardElement[] }) => {
    const loading = !issues.length
    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(!open)

    React.useEffect(() => {
        document.body.classList.toggle("overflow-hidden", open)
    }, [open])

    const {
        extractFilterValues,
        currentFilterValuesAndKeys,
        onlyFilterValues,
        sortKey,
        searchQuery,
        addFilterParam
    } = useUrlManager()

    const { filterValues: filterSortSearchValues } = extractFilterValues(
        currentFilterValuesAndKeys
    )
    const { filterValues } = extractFilterValues(onlyFilterValues)

    const memoizedIssues = React.useMemo(
        () =>
            filterIssues(filterSortSearchValues, issues, sortKey, searchQuery),
        [filterSortSearchValues, issues, sortKey, searchQuery]
    )

    const { currentPage, paginatedResult, setCurrentPage } =
        usePaginatedResult(memoizedIssues)

    const pageSize = 15

    const pages = React.useMemo(
        () => Math.ceil((memoizedIssues?.length ?? 0) / pageSize),
        [memoizedIssues?.length]
    )
    const noIssuesFound = paginatedResult.length === 0

    return (
        <div className="w-full min-h-[calc(100vh-88px)]">
            <div className="flex w-full gap-6 max-lg:gap-2 relative">
                <section className="max-md:w-full block max-md:hidden py-6 px-14 max-lg:px-5 max-h-[calc(100vh-88px)] sticky top-[88px] min-w-fit overflow-y-scroll">
                    <section className="pb-4 w-full">
                        <InfoTab />
                    </section>
                    <SidebarFilter issues={issues} toggle={() => {}} />
                </section>

                <section className="flex w-full flex-col items-center gap-6 px-10 max-lg:px-2 pl-0 max-md:pl-2 min-h-[calc(100vh-112px)] max-md:min-h-[calc(100vh-100px)]">
                    <div className=" w-full">
                        <section className="hidden max-md:block pt-6">
                            <InfoTab />
                        </section>
                        <SearchInput
                            filtersCount={
                                filterValues.length === 0
                                    ? null
                                    : filterValues.length
                            }
                            toggle={toggle}
                        />
                    </div>
                    {loading || !issues.length || issues.length === 0 ? (
                        <div className="grid gap-4 max-sm:grid-cols-1 grid-cols-3 w-full">
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
                        <div
                            className={`grid auto-rows-max gap-4  ${noIssuesFound ? "grid-col-1" : "max-sm:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-2 grid-cols-3"} flex-1`}
                        >
                            {noIssuesFound ? (
                                <div className="w-full flex justify-center items-center">
                                    <p className="text-center text-lg text-gray-800 dark:text-gray-100">
                                        No issues found for this page.
                                    </p>
                                </div>
                            ) : (
                                paginatedResult.map((issue, index) => (
                                    <section
                                        key={`issue-${index}-${issue.number}`}
                                    >
                                        <IssueCard
                                            issue={
                                                issue as unknown as IssueCardElement
                                            }
                                            index={index}
                                            keys={filterValues}
                                            addFilterParam={addFilterParam}
                                        />
                                    </section>
                                ))
                            )}
                        </div>
                    )}
                    <div className="bg-white dark:bg-black flex flex-wrap overflow-x-auto no-scrollbar max-w-2xl max-md:max-w-full">
                        <Pagination
                            currentPage={currentPage}
                            pages={pages}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </section>
            </div>
            {open ? (
                <div className="w-full bg-white dark:bg-black fixed top-[78px] bottom-0 opacity-100 z-40 p-4 pt-3 pb-8 overflow-scroll">
                    <SidebarFilter
                        issues={issues}
                        toggle={() => setOpen(!open)}
                    />
                </div>
            ) : null}
        </div>
    )
}

export default RepositoryIssues

function IssueCard({
    issue,
    index,
    keys,
    addFilterParam
}: {
    issue: IssueCardElement
    index: number
    keys: Array<{ [key: string]: string }>
    addFilterParam: (key: string, value: string) => void
}) {
    return (
        <div
            key={`issue-${index}-${issue.number}`}
            className="flex flex-col justify-between min-h-[216px] max-md:min-h-36 rounded-lg border border-gray-200 dark:border-black-800 bg-white dark:bg-black p-4 shadow-sm transition-all hover:shadow-md"
        >
            <div className="flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <section
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() =>
                            addFilterParam("repo", issue.repo.toLowerCase())
                        }
                        data-umami-event={`${slugify(issue.repo)}-repo-filter-clicked`}
                    >
                        {issue.imageUrl ? (
                            <Image
                                src={issue?.imageUrl}
                                alt={`${issue.repo}-repository-image`}
                                className="w-6 h-6 rounded-md"
                                width={24}
                                height={24}
                            />
                        ) : (
                            <div className="w-6 h-6 bg-gray-100 dark:bg-gray-800 rounded-md"></div>
                        )}
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:font-semibold">
                            {`${issue.repo}/${issue.owner}`}
                        </span>
                    </section>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
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
                <Link
                    href={issue.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="mt-2 text-base font-medium text-gray-800 dark:text-gray-300 text-wrap break-words hover:underline"
                    data-umami-event={`${slugify(issue.repo)}-issue-url-clicked`}
                >
                    <span className="text-gray-500 dark:text-gray-500">
                        #{issue.number}
                    </span>{" "}
                    {issue.title}
                </Link>
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
        </div>
    )
}

function InfoTab() {
    return (
        <div>
            <div className="w-[300px] max-lg:w-[250px] max-md:w-full flex flex-col gap-4 relative">
                <div className="bg-gray-100 dark:bg-gray-900 border dark:border-black-700 border-gray-400 p-4 max-md:p-3 rounded-xl">
                    <p className="max-md:text-[15px]">
                        Use this tool to explore vetted Free Open Source
                        Software (FOSS) projects and find your way in bitcoin
                        open source.
                    </p>
                </div>
            </div>
        </div>
    )
}
