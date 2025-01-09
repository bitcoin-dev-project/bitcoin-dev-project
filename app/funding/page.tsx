"use client"

import { Wrapper } from "@/components/Wrapper"
import { genPageMetadata } from "../seo"
import { useEffect, useState, useMemo } from "react"
import Papa from "papaparse"
import { ExternalLink, Search, ArrowDown, ArrowUp } from "lucide-react"

interface FundingData {
    funder: string
    recipient: string
    amount: string
    date: string
    source_url: string
    notes: string
}

const GITHUB_CSV_URL =
    "https://raw.githubusercontent.com/bitcoin-dev-project/who-funds-bitcoin-development/refs/heads/main/funding.csv"

// export const metadata = genPageMetadata({
//     title: "Bitcoin Open Source Funding History",
//     keywords: "bitcoin, open source, funding, grants, bitcoin development",
//     description: "A comprehensive history of Bitcoin open source funding and grants.",
//     openGraph: {
//         images: [
//             {
//                 url: "https://bitcoindevs.xyz/images/pages-thumbnails/funding.png",
//                 alt: "Bitcoin Funding History"
//             }
//         ],
//         title: "Bitcoin Open Source Funding History",
//         url: "https://bitcoindevs.xyz/funding",
//         type: "website",
//         description: "A comprehensive history of Bitcoin open source funding and grants."
//     },
//     twitter: {
//         images: ["https://bitcoindevs.xyz/images/pages-thumbnails/funding.png"],
//         card: "summary_large_image",
//         title: "Bitcoin Open Source Funding History",
//         creator: "@Bitcoin_Devs",
//         description: "A comprehensive history of Bitcoin open source funding and grants."
//     }
// })

export default function Funding() {
    const [fundingData, setFundingData] = useState<FundingData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Filter states
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedFunder, setSelectedFunder] = useState<string>("all")
    const [selectedRecipient, setSelectedRecipient] = useState<string>("all")
    const [selectedYear, setSelectedYear] = useState<string>("all")
    const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(GITHUB_CSV_URL)
                const csvText = await response.text()

                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setFundingData(results.data as FundingData[])
                        setIsLoading(false)
                    },
                    error: (error: any) => {
                        setError("Error parsing CSV data")
                        setIsLoading(false)
                        console.error("CSV parsing error:", error)
                    }
                })
            } catch (error) {
                setError("Error loading funding data")
                setIsLoading(false)
                console.error("Error loading funding data:", error)
            }
        }

        fetchData()
    }, [])

    // Compute unique values for filters
    const { funders, recipients, years } = useMemo(() => {
        const fundersSet = new Set<string>()
        const recipientsSet = new Set<string>()
        const yearsSet = new Set<string>()

        fundingData.forEach((row) => {
            if (row.funder) fundersSet.add(row.funder)
            if (row.recipient) recipientsSet.add(row.recipient)
            if (row.date) {
                const year = row.date.split("/")[0]
                if (year) yearsSet.add(year)
            }
        })

        return {
            funders: Array.from(fundersSet).sort(),
            recipients: Array.from(recipientsSet).sort(),
            years: Array.from(yearsSet).sort().reverse()
        }
    }, [fundingData])

    // Helper function to parse YYYY/MM dates
    const parseDateString = (dateStr: string) => {
        if (!dateStr) return 0
        const [year, month] = dateStr.split("/").map((num) => parseInt(num))
        // Create a date using year and month (month - 1 because JS months are 0-based)
        return new Date(year, month ? month - 1 : 0).getTime()
    }

    // Sort function for dates
    const sortData = (data: FundingData[]) => {
        return [...data].sort((a, b) => {
            const dateA = parseDateString(a.date)
            const dateB = parseDateString(b.date)
            return sortDirection === "desc" ? dateB - dateA : dateA - dateB
        })
    }

    // Filter and sort the data
    const filteredData = useMemo(() => {
        const filtered = fundingData.filter((row) => {
            const matchesSearch =
                searchQuery === "" ||
                Object.values(row).some((value) =>
                    value?.toLowerCase().includes(searchQuery.toLowerCase())
                )

            const matchesFunder =
                selectedFunder === "all" || row.funder === selectedFunder

            const matchesRecipient =
                selectedRecipient === "all" ||
                row.recipient === selectedRecipient

            const matchesYear =
                selectedYear === "all" ||
                (row.date && row.date.startsWith(selectedYear))

            return (
                matchesSearch &&
                matchesFunder &&
                matchesRecipient &&
                matchesYear
            )
        })

        return sortData(filtered)
    }, [
        fundingData,
        searchQuery,
        selectedFunder,
        selectedRecipient,
        selectedYear,
        sortDirection
    ])

    return (
        <Wrapper>
            <div className="flex flex-col p-14 max-sm:p-7 mx-auto my-0">
                <div className="flex flex-col mb-12 gap-y-10 w-2/3 max-md:w-full self-center">
                    <h1 className="text-[58px] max-lg:text-[36px] max-md:text-center font-bold leading-tight">
                        Who Funds Bitcoin Development?
                    </h1>
                    <p className="text-xl max-md:text-lg">
                        A historical record of the financial contributors and
                        organizations supporting Bitcoin development.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center min-h-[400px] text-red-500">
                        {error}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            {/* Search Input */}
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-8 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                            </div>

                            {/* Filter Selects */}
                            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                                <select
                                    value={selectedFunder}
                                    onChange={(e) =>
                                        setSelectedFunder(e.target.value)
                                    }
                                    className="rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
                                >
                                    <option value="all">All Funders</option>
                                    {funders.map((funder) => (
                                        <option key={funder} value={funder}>
                                            {funder}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={selectedRecipient}
                                    onChange={(e) =>
                                        setSelectedRecipient(e.target.value)
                                    }
                                    className="rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
                                >
                                    <option value="all">All Recipients</option>
                                    {recipients.map((recipient) => (
                                        <option
                                            key={recipient}
                                            value={recipient}
                                        >
                                            {recipient}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={selectedYear}
                                    onChange={(e) =>
                                        setSelectedYear(e.target.value)
                                    }
                                    className="rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
                                >
                                    <option value="all">All Years</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                        >
                                            Funder
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                        >
                                            Recipient
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                        >
                                            Amount
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer group"
                                            onClick={() =>
                                                setSortDirection((prev) =>
                                                    prev === "desc"
                                                        ? "asc"
                                                        : "desc"
                                                )
                                            }
                                        >
                                            <div className="flex items-center gap-2">
                                                Date
                                                <span className="text-gray-400 dark:text-gray-500">
                                                    {sortDirection ===
                                                    "desc" ? (
                                                        <ArrowDown className="h-4 w-4" />
                                                    ) : (
                                                        <ArrowUp className="h-4 w-4" />
                                                    )}
                                                </span>
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                        >
                                            Source
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                        >
                                            Notes
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredData.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                                            >
                                                No matching records found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredData.map((row, index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    {row.funder}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {row.recipient}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {row.amount === "NA"
                                                        ? ""
                                                        : row.amount}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {row.date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {row.source_url ? (
                                                        <a
                                                            href={
                                                                row.source_url
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-orange-500 hover:text-orange-600 inline-flex items-center gap-1"
                                                        >
                                                            Link{" "}
                                                            <ExternalLink className="h-4 w-4" />
                                                        </a>
                                                    ) : (
                                                        "-"
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    {row.notes || ""}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                                Data from{" "}
                                <a
                                    href="https://github.com/bitcoin-dev-project/who-funds-bitcoin-development"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-orange-500 hover:text-orange-600 inline-flex items-center gap-1"
                                >
                                    bitcoin-dev-project/who-funds-bitcoin-development{" "}
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                            <div>
                                Showing {filteredData.length} of{" "}
                                {fundingData.length} entries
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Wrapper>
    )
}
