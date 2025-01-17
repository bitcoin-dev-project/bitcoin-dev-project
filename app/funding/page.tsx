"use client"

import { Wrapper } from "@/components/Wrapper"
import { useEffect, useState, useMemo } from "react"
import Papa from "papaparse"
import { ExternalLink, Search } from "lucide-react"
import FundingStats from "@/components/funding/FundingStats"
import FilterSelects from "@/components/funding/FilterSelects"
import FundingTable from "@/components/funding/FundingTable"

export interface FundingEntry {
    funder: string
    recipient: string
    amount: string
    date: string
    source_url: string
    notes: string
}

const GITHUB_CSV_URL =
    "https://raw.githubusercontent.com/bitcoin-dev-project/who-funds-bitcoin-development/refs/heads/main/funding.csv"

export default function Funding() {
    const [fundingData, setFundingData] = useState<FundingEntry[]>([])
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
                        setFundingData(results.data as FundingEntry[])
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

    // Helper function to parse YYYY/MM dates
    const parseDateString = (dateStr: string) => {
        if (!dateStr) return 0
        const [year, month] = dateStr.split("/").map((num) => parseInt(num))
        return new Date(year, month ? month - 1 : 0).getTime()
    }

    // Sort function for dates
    const sortData = (data: FundingEntry[]) => {
        return [...data].sort((a, b) => {
            const dateA = parseDateString(a.date)
            const dateB = parseDateString(b.date)
            return sortDirection === "desc" ? dateB - dateA : dateA - dateB
        })
    }

    // Filter and sort the data
    const filteredData = useMemo(() => {
        // First apply all filters
        const filtered = fundingData.filter((row) => {
            const matchesSearch =
                searchQuery === "" ||
                Object.values(row).some((value) =>
                    String(value)
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
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

        // Then sort the filtered data
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
                        Publicly disclosed bitcoin development funding,
                        excluding downstream allocations
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
                    <div className="space-y-8">
                        <FundingStats
                            data={filteredData}
                            searchQuery={searchQuery}
                            selectedFunder={selectedFunder}
                            selectedRecipient={selectedRecipient}
                            selectedYear={selectedYear}
                        />
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
                                <FilterSelects
                                    rawData={fundingData}
                                    filteredData={filteredData}
                                    selectedFunder={selectedFunder}
                                    selectedRecipient={selectedRecipient}
                                    selectedYear={selectedYear}
                                    onFunderChange={setSelectedFunder}
                                    onRecipientChange={setSelectedRecipient}
                                    onYearChange={setSelectedYear}
                                    onReset={() => {
                                        setSelectedFunder("all")
                                        setSelectedRecipient("all")
                                        setSelectedYear("all")
                                    }}
                                />
                            </div>

                            <FundingTable
                                data={filteredData}
                                sortDirection={sortDirection}
                                setSortDirection={setSortDirection}
                            />

                            <div className="flex flex-row-reverse text-sm text-gray-500 dark:text-gray-400">
                                Showing {filteredData.length} of{" "}
                                {fundingData.length} entries
                            </div>
                            <div className="flex items-center gap-1">
                                Contribute your data to{" "}
                                <a
                                    href="https://github.com/bitcoin-dev-project/who-funds-bitcoin-development"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-orange-500 hover:text-orange-600 inline-flex items-center gap-1"
                                >
                                    /who-funds-bitcoin-development{" "}
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Wrapper>
    )
}
