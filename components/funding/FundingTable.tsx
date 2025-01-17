import { FundingEntry } from "@/app/funding/page"
import { ExternalLink, ArrowDown, ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

interface FundingTableProps {
    data: FundingEntry[]
    sortDirection: "asc" | "desc"
    setSortDirection: (direction: "asc" | "desc") => void
}

const FundingTable: React.FC<FundingTableProps> = ({
    data,
    sortDirection,
    setSortDirection
}) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Table view for desktop remains the same as before
    const TableView: React.FC = () => (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                        Donor
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
                            setSortDirection(
                                sortDirection === "desc" ? "asc" : "desc"
                            )
                        }
                    >
                        <div className="flex items-center gap-2">
                            Date
                            <span className="text-gray-400 dark:text-gray-500">
                                {sortDirection === "desc" ? (
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
                {data.length === 0 ? (
                    <tr>
                        <td
                            colSpan={6}
                            className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                        >
                            No matching records found
                        </td>
                    </tr>
                ) : (
                    data.map((row, index) => (
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
                                {row.amount === "NA" ? "" : row.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {row.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {row.source_url ? (
                                    <a
                                        href={row.source_url}
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
    )

    // Updated Card view for mobile
    const CardView: React.FC = () => (
        <div className="space-y-4">
            {data.length === 0 ? (
                <div className="text-center py-10 text-sm text-gray-500 dark:text-gray-400">
                    No matching records found
                </div>
            ) : (
                data.map((row, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 flex flex-col border border-gray-200 dark:border-gray-700"
                    >
                        {/* Header with Funder and Amount */}
                        <div className="flex justify-between items-start mb-1">
                            <div className="font-medium text-base">
                                {row.funder}
                            </div>
                            <div className="text-sm font-medium">
                                {row.amount === "NA" ? "" : row.amount}
                            </div>
                        </div>

                        {/* Recipient */}
                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                            to {row.recipient}
                        </div>

                        {/* Notes (if they exist) */}
                        {row.notes && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                                {row.notes}
                            </div>
                        )}

                        {/* Footer with Date and Source */}
                        <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1">
                                <span className="text-gray-500 dark:text-gray-400">
                                    Date:
                                </span>
                                <span>{row.date}</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <span className="text-gray-500 dark:text-gray-400">
                                    Source:
                                </span>
                                {row.source_url ? (
                                    <a
                                        href={row.source_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-orange-500 hover:text-orange-600 inline-flex items-center gap-1"
                                    >
                                        Link{" "}
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                ) : (
                                    <span>-</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )

    return (
        <div className="overflow-x-auto md:rounded-lg md:border md:border-gray-200 md:dark:border-gray-700">
            <div className="hidden md:block">
                <TableView />
            </div>
            <div className="md:hidden">
                <CardView />
            </div>
        </div>
    )
}

export default FundingTable
