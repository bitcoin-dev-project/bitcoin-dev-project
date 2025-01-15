import React, { useState } from "react"
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
    Treemap
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Visualization types
type VisualizationType = "bar" | "pie" | "treemap"

// Simplified version of the existing types
interface FundingData {
    name: string
    usdAmount: number
    btcAmount: number
}

interface FundingVisualizationProps {
    data: FundingData[]
    title?: string
    subtitle?: string
    viewMode?: "recipient" | "funder"
    onViewModeChange?: (mode: "recipient" | "funder") => void
}

// Color palette for visualizations
const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
    "#FF6384",
    "#36A2EB"
]

const CustomizedContent = (props: any) => {
    const { root, depth, x, y, width, height, index, payload, colors, rank } =
        props
    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                stroke="#fff"
                fill={colors[index % colors.length]}
                fillOpacity={0.8}
            />
            {depth === 1 ? (
                <text
                    x={x + width / 2}
                    y={y + height / 2 + 7}
                    textAnchor="middle"
                    fill="#fff"
                    fontWeight={500}
                >
                    {payload.name}
                </text>
            ) : null}
        </g>
    )
}

const MultiFundingVisualization: React.FC<FundingVisualizationProps> = ({
    data,
    title = "Funding Distribution",
    subtitle = "",
    viewMode = "recipient",
    onViewModeChange
}) => {
    const [visualizationType, setVisualizationType] =
        useState<VisualizationType>("bar")

    // Prepare data for pie and treemap charts (top entries)
    const topData = data.slice(0, 10)

    // Prepare treemap data structure
    const treemapData = {
        name: "Funding Distribution",
        children: topData.map((entry) => ({
            name: entry.name,
            size: entry.usdAmount
        }))
    }

    // Render different chart types
    const renderVisualization = () => {
        switch (visualizationType) {
            case "bar":
                return (
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
                )
            case "pie":
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={topData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="usdAmount"
                                nameKey="name"
                            >
                                {topData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
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
                        </PieChart>
                    </ResponsiveContainer>
                )
            case "treemap":
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <Treemap
                            data={[treemapData]}
                            dataKey="size"
                            aspectRatio={4 / 3}
                            stroke="#fff"
                            fill="#8884d8"
                        >
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
                        </Treemap>
                    </ResponsiveContainer>
                )
        }
    }

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                    <CardTitle>{title}</CardTitle>
                    {subtitle && (
                        <p className="text-sm text-muted-foreground">
                            {subtitle}
                        </p>
                    )}
                </div>
                <div className="flex gap-2">
                    {/* View Mode Buttons */}
                    {onViewModeChange && (
                        <>
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
                        </>
                    )}

                    {/* Visualization Type Buttons */}
                    <select
                        value={visualizationType}
                        onChange={(e) =>
                            setVisualizationType(
                                e.target.value as VisualizationType
                            )
                        }
                        className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground"
                    >
                        <option value="bar">Bar Chart</option>
                        <option value="pie">Pie Chart</option>
                        <option value="treemap">Treemap</option>
                    </select>
                </div>
            </CardHeader>
            <CardContent>{renderVisualization()}</CardContent>
        </Card>
    )
}

export default MultiFundingVisualization
