import { useMemo } from "react"
import { FundingEntry } from "@/app/funding/page"
import { XCircle } from "lucide-react"

export interface FilterSelectsProps {
    rawData: FundingEntry[]
    filteredData: FundingEntry[]
    selectedFunder: string
    selectedRecipient: string
    selectedYear: string
    onFunderChange: (value: string) => void
    onRecipientChange: (value: string) => void
    onYearChange: (value: string) => void
    onReset: () => void
}

export default function FilterSelects({
    rawData,
    filteredData,
    selectedFunder,
    selectedRecipient,
    selectedYear,
    onFunderChange,
    onRecipientChange,
    onYearChange,
    onReset
}: FilterSelectsProps) {
    // Get currently available options based on current filters
    const availableOptions = useMemo(
        () => ({
            funders: Array.from(new Set(filteredData.map((row) => row.funder)))
                .filter(Boolean)
                .sort(),
            recipients: Array.from(
                new Set(filteredData.map((row) => row.recipient))
            )
                .filter(Boolean)
                .sort(),
            years: Array.from(
                new Set(filteredData.map((row) => row.date?.split("/")[0]))
            )
                .filter(Boolean)
                .sort()
                .reverse()
        }),
        [filteredData]
    )

    // Check if any filters are active
    const hasActiveFilters =
        selectedFunder !== "all" ||
        selectedRecipient !== "all" ||
        selectedYear !== "all"

    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 relative">
            <select
                value={selectedFunder}
                onChange={(e) => onFunderChange(e.target.value)}
                className="rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
            >
                <option value="all">All Donors</option>
                {availableOptions.funders.map((funder) => (
                    <option key={funder} value={funder}>
                        {funder}
                    </option>
                ))}
            </select>

            <select
                value={selectedRecipient}
                onChange={(e) => onRecipientChange(e.target.value)}
                className="rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
            >
                <option value="all">All Recipients</option>
                {availableOptions.recipients.map((recipient) => (
                    <option key={recipient} value={recipient}>
                        {recipient}
                    </option>
                ))}
            </select>

            <select
                value={selectedYear}
                onChange={(e) => onYearChange(e.target.value)}
                className="rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
            >
                <option value="all">All Years</option>
                {availableOptions.years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>

            {/* Reset filters button */}
            {hasActiveFilters && (
                <button
                    onClick={onReset}
                    className="inline-flex items-center gap-1 px-2 py-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    title="Reset filters"
                >
                    <XCircle className="h-4 w-4" />
                    <span className="sr-only">Reset filters</span>
                </button>
            )}
        </div>
    )
}
