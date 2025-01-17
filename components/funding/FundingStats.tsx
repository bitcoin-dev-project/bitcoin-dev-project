import React, { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FundingEntry {
    funder: string
    recipient: string
    amount: string
    date: string
    source_url: string | null
    notes: string | null
}

interface FundingStatsProps {
    data: FundingEntry[]
    searchQuery?: string
    selectedFunder: string
    selectedRecipient: string
    selectedYear: string
}

const FundingStats: React.FC<FundingStatsProps> = ({
    data,
    searchQuery = "",
    selectedFunder = "all",
    selectedRecipient = "all",
    selectedYear = "all"
}) => {
    // Process data and calculate totals
    const { uniqueFunders, uniqueRecipients, yearRange } = useMemo(() => {
        const funders = new Set(data.map((d) => d.funder))
        const recipients = new Set(data.map((d) => d.recipient))

        // Calculate year range
        const years = data
            .map((d) => parseInt(d.date.split("/")[0]))
            .filter(Boolean)
        const minYear = Math.min(...years)
        const maxYear = Math.max(...years)

        return {
            uniqueFunders: funders.size,
            uniqueRecipients: recipients.size,
            yearRange: { minYear, maxYear }
        }
    }, [data])

    // Generate dynamic subtitle based on filters
    const subtitle = useMemo(() => {
        const parts = []

        // Funder part
        if (selectedFunder !== "all") {
            parts.push(`from ${selectedFunder}`)
        } else {
            parts.push(
                `from ${uniqueFunders} ${uniqueFunders === 1 ? "funder" : "donors"}`
            )
        }

        // Recipient part
        if (selectedRecipient !== "all") {
            parts.push(`to ${selectedRecipient}`)
        } else {
            parts.push(
                `to ${uniqueRecipients} ${uniqueRecipients === 1 ? "recipient" : "recipients"}`
            )
        }

        // Year part
        if (selectedYear !== "all") {
            parts.push(`in ${selectedYear}`)
        } else if (yearRange.minYear && yearRange.maxYear) {
            if (yearRange.minYear === yearRange.maxYear) {
                parts.push(`in ${yearRange.minYear}`)
            } else {
                parts.push(`from ${yearRange.minYear} to ${yearRange.maxYear}`)
            }
        }

        return parts.join(" ")
    }, [
        selectedFunder,
        selectedRecipient,
        selectedYear,
        uniqueFunders,
        uniqueRecipients,
        yearRange
    ])

    const { formattedTotals } = useMemo(() => {
        let totalUSD = 0
        let totalBTC = 0

        data.forEach((entry) => {
            if (!entry.amount || entry.amount === "NA") return

            // Parse amount string and split into value and currency
            const amountStr = entry.amount.replace(/,/g, "")
            const match = amountStr.match(/^(\d+(?:\.\d+)?)\s*(BTC|USD)?$/)

            if (match) {
                const [, value, currency] = match
                const numValue = parseFloat(value)

                if (currency === "BTC") {
                    totalBTC += numValue
                } else {
                    totalUSD += numValue
                }
            }
        })

        return {
            formattedTotals: formatCurrencies(totalUSD, totalBTC)
        }
    }, [data])

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Public Donations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formattedTotals}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            {subtitle}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

// Helper function to format currency amounts
const formatCurrencies = (usd: number, btc: number): string => {
    const usdStr = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(usd)

    if (btc === 0) return usdStr
    if (usd === 0) return `${btc.toFixed(2)} BTC`
    return `${usdStr} & ${btc.toFixed(2)} BTC`
}

export default FundingStats
