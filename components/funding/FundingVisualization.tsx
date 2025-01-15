import React, { useState } from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Simplified version of the existing types
interface FundingData {
    name: string
    usdAmount: number
    btcAmount: number
}

interface FundingVisualizationProps {
    data: FundingData[]
    title?: string
    viewMode?: "recipient" | "funder"
    onViewModeChange?: (mode: "recipient" | "funder") => void
}

const FundingVisualization: React.FC<FundingVisualizationProps> = ({
    data,
    title = "Funding Distribution",
    viewMode = "recipient",
    onViewModeChange
}) => {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>{title}</CardTitle>
                {onViewModeChange && (
                    <div className="flex gap-2">
                        <button
                            className={`px-4 py-2 rounded-md ${
                                viewMode === "recipient"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground"
                            }`}
                            onClick={() => onViewModeChange("recipient")}
                        >
                            By Recipient
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${
                                viewMode === "funder"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground"
                            }`}
                            onClick={() => onViewModeChange("funder")}
                        >
                            By Funder
                        </button>
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                            label={{
                                value: "Amount (USD)",
                                angle: -90,
                                position: "insideLeft"
                            }}
                        />
                        <Tooltip
                            formatter={(value, name) => [
                                typeof value === "number"
                                    ? new Intl.NumberFormat("en-US", {
                                          style: "currency",
                                          currency: "USD"
                                      }).format(value)
                                    : value,
                                name
                            ]}
                        />
                        <Legend />
                        <Bar
                            dataKey="usdAmount"
                            fill="#8884d8"
                            name="USD Amount"
                        />
                        <Bar
                            dataKey="btcAmount"
                            fill="#82ca9d"
                            name="BTC Amount"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export default FundingVisualization
