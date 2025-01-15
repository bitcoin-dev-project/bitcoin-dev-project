import React, { useMemo, useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MultiFundingVisualization from "./MultiFundingVisualization"

interface FundingEntry {
    funder: string
    recipient: string
    amount: string
    date: string
    source_url: string | null
    notes: string | null
}

interface ParsedAmount {
    value: number
    currency: string
}

// Helper function to parse amount strings
const parseAmount = (amountStr: string | null): ParsedAmount | null => {
    if (!amountStr || amountStr === "NA") return null

    // Remove commas and split into parts
    const parts = amountStr.replace(/,/g, "").split(" ")
    const value = parseFloat(parts[0])
    const currency = parts[1]

    if (isNaN(value) || !currency) return null

    return { value, currency }
}

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

interface FundingStatsProps {
    data: FundingEntry[]
    searchQuery?: string
    selectedFunder?: string
    selectedRecipient?: string
    selectedYear?: string
}

const FundingStats: React.FC<FundingStatsProps> = ({
    data,
    searchQuery = "",
    selectedFunder = "all",
    selectedRecipient = "all",
    selectedYear = "all"
}) => {
    // Determine initial view mode based on filters
    const determineInitialViewMode = () => {
        if (selectedRecipient !== "all") return "funder"
        if (selectedFunder !== "all") return "recipient"
        return "recipient"
    }

    const [viewMode, setViewMode] = useState<"recipient" | "funder">(
        determineInitialViewMode()
    )

    // Automatically adjust view mode when filters change
    useEffect(() => {
        setViewMode(determineInitialViewMode())
    }, [selectedRecipient, selectedFunder])

    // Generate dynamic subtitle
    const getSubtitle = useMemo(() => {
        const conditions: string[] = []

        // Search query condition
        if (searchQuery) {
            conditions.push(`matching "${searchQuery}"`)
        }

        // Funder condition
        if (selectedFunder !== "all") {
            conditions.push(`from ${selectedFunder}`)
        }

        // Recipient condition
        if (selectedRecipient !== "all") {
            conditions.push(`to ${selectedRecipient}`)
        }

        // Year condition
        if (selectedYear !== "all") {
            conditions.push(`in ${selectedYear}`)
        }

        // Combine conditions
        const subtitleText =
            conditions.length > 0
                ? conditions.join(" • ")
                : "all funding entries"

        return subtitleText
    }, [searchQuery, selectedFunder, selectedRecipient, selectedYear])

    const { visualizationData, totals, stats } = useMemo(() => {
        const groupedData = new Map<string, { usd: number; btc: number }>()
        let totalUSD = 0
        let totalBTC = 0

        // Process all entries
        data.forEach((entry) => {
            const amount = parseAmount(entry.amount)
            if (!amount) return

            const key =
                viewMode === "recipient" ? entry.recipient : entry.funder
            const current = groupedData.get(key) || { usd: 0, btc: 0 }

            if (amount.currency === "USD") {
                current.usd += amount.value
                totalUSD += amount.value
            } else if (amount.currency === "BTC") {
                current.btc += amount.value
                totalBTC += amount.value
            }

            groupedData.set(key, current)
        })

        // Convert to visualization format
        const vizData = Array.from(groupedData.entries())
            .map(([name, amounts]) => ({
                name,
                usdAmount: amounts.usd,
                btcAmount: amounts.btc
            }))
            .sort((a, b) => b.usdAmount - a.usdAmount)

        return {
            visualizationData: vizData,
            totals: { usd: totalUSD, btc: totalBTC },
            stats: {
                uniqueFunders: new Set(data.map((d) => d.funder)).size,
                uniqueRecipients: new Set(data.map((d) => d.recipient)).size
            }
        }
    }, [data, viewMode])

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Funding
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrencies(totals.usd, totals.btc)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            from {stats.uniqueFunders} funders to{" "}
                            {stats.uniqueRecipients} recipients
                        </p>
                    </CardContent>
                </Card>
            </div>

            <MultiFundingVisualization
                data={visualizationData}
                subtitle={getSubtitle}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
            />
        </div>
    )
}

export default FundingStats
