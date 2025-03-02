"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Hash, Clock, Timer, Activity, ArrowUpDown, Zap } from "lucide-react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts"
import clsx from "clsx"

interface DifficultyData {
    currentDifficulty: number
    averageBlockTime: number
    estimatedAdjustment: number
    remainingBlocks: number
    remainingTime: string
    networkHashrate: number
    historicalData: Array<{
        date: string
        hashrate: number
    }>
    estimatedRetargetDate: number
}

interface HistoricalDataPoint {
    date: string
    hashrate: number
    timestamp: number
}

interface CountdownTime {
    days: number
    hours: number
    minutes: number
    seconds: number
}

interface StatCardProps {
    icon: React.ElementType
    title: string
    value: string | number
    subtitle?: string
    valueClassName?: string
    children?: React.ReactNode
}

interface BlockProgressProps {
    remainingBlocks: number
}

const formatTimeRemaining = (remainingMilliseconds: number) => {
    const remainingSeconds = remainingMilliseconds / 1000
    const days = Math.floor(remainingSeconds / (24 * 3600))
    const hours = Math.floor((remainingSeconds % (24 * 3600)) / 3600)
    return `${days}d ${hours}h`
}

const getAdjustmentColor = (adjustment: number) => {
    if (adjustment > 5) return "text-red-500"
    if (adjustment < -5) return "text-yellow-500"
    return "text-green-500"
}

const StatCard: React.FC<StatCardProps> = ({
    icon: Icon,
    title,
    value,
    subtitle,
    valueClassName = "",
    children
}) => (
    <div className="basis-1/2 bg-vscode-input-dark p-4 rounded-lg">
        <div className="flex items-center mb-2">
            <Icon className="w-4 h-4 mr-2 text-orange-500" />
            <span className="font-medium">{title}</span>
        </div>
        <div className={clsx("text-2xl font-bold", valueClassName)}>
            {children || value}
        </div>
        {subtitle && <div className="text-sm opacity-70">{subtitle}</div>}
    </div>
)

const BlockProgress: React.FC<BlockProgressProps> = ({ remainingBlocks }) => (
    <div
        className="mt-4 bg-vscode-hover-dark p-2 rounded-lg overflow-hidden"
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, 6px)",
            gap: "2px",
            justifyContent: "center"
        }}
    >
        {Array.from({ length: 2016 }).map((_, i) => (
            <div
                key={i}
                style={{ width: "6px", height: "6px" }}
                className={clsx(
                    "transition-colors duration-300 rounded-sm",
                    i < 2016 - remainingBlocks
                        ? "bg-orange-500"
                        : "bg-orange-500/20"
                )}
            />
        ))}
    </div>
)


const DifficultyEstimator = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [difficultyData, setDifficultyData] = useState<DifficultyData>({
        currentDifficulty: 0,
        averageBlockTime: 0,
        estimatedAdjustment: 0,
        remainingBlocks: 2016,
        remainingTime: "",
        networkHashrate: 0,
        historicalData: [],
        estimatedRetargetDate: 0
    })
    const [countdown, setCountdown] = useState<CountdownTime>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    const fetchBlockData = async () => {
        try {
            setLoading(true)
            setError(null)

            const [[latestBlock], difficultyInfo, hashrateInfo] =
                await Promise.all([
                    fetch("https://mempool.space/api/blocks/tip").then((r) =>
                        r.json()
                    ),
                    fetch(
                        "https://mempool.space/api/v1/difficulty-adjustment"
                    ).then((r) => r.json()),
                    fetch(
                        "https://mempool.space/api/v1/mining/hashrate/1y"
                    ).then((r) => r.json())
                ])

            const averageBlockTime = difficultyInfo.timeAvg / (60 * 1000)

            const historicalData = hashrateInfo.hashrates
                .map(
                    (d: {
                        timestamp: number
                        avgHashrate: number
                    }): HistoricalDataPoint => ({
                        date: new Date(d.timestamp * 1000).toLocaleDateString(),
                        hashrate: d.avgHashrate / 1e18,
                        timestamp: d.timestamp
                    })
                )
                .sort(
                    (a: HistoricalDataPoint, b: HistoricalDataPoint) =>
                        a.timestamp - b.timestamp
                )
                .map(({ date, hashrate }: HistoricalDataPoint) => ({
                    date,
                    hashrate
                }))

            setDifficultyData({
                currentDifficulty: latestBlock.difficulty,
                averageBlockTime,
                estimatedAdjustment: difficultyInfo.difficultyChange,
                remainingBlocks: difficultyInfo.remainingBlocks,
                remainingTime: formatTimeRemaining(
                    difficultyInfo.remainingTime
                ),
                networkHashrate: hashrateInfo.currentHashrate / 1e18,
                historicalData,
                estimatedRetargetDate: difficultyInfo.estimatedRetargetDate
            })

            setLoading(false)
        } catch (err) {
            setError("Failed to fetch difficulty data")
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBlockData()
        const fetchInterval = setInterval(fetchBlockData, 5 * 60 * 1000)

        const countdownInterval = setInterval(() => {
            if (difficultyData.remainingTime) {
                const now = Date.now()
                const remainingMs = difficultyData.estimatedRetargetDate - now

                if (remainingMs > 0) {
                    const totalSeconds = Math.floor(remainingMs / 1000)
                    const days = Math.floor(totalSeconds / (24 * 3600))
                    const hours = Math.floor(
                        (totalSeconds % (24 * 3600)) / 3600
                    )
                    const minutes = Math.floor((totalSeconds % 3600) / 60)
                    const seconds = Math.floor(totalSeconds % 60)

                    setCountdown({ days, hours, minutes, seconds })
                } else {
                    setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                }
            }
        }, 1000)

        return () => {
            clearInterval(fetchInterval)
            clearInterval(countdownInterval)
        }
    }, [difficultyData.remainingTime])

    if (loading) {
        return (
            <div className="w-full h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full p-4 text-red-500 bg-red-500/10 rounded-lg">
                {error}
            </div>
        )
    }

    return (
        <motion.div
            className="w-full max-w-2xl mx-auto py-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="rounded-lg shadow-md overflow-hidden bg-vscode-container-dark border-t-4 border-orange-500">
                <div className="bg-vscode-titleBar-dark p-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    <span className="text-lg font-semibold">
                        Difficulty Adjustment Estimator
                    </span>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
                        <StatCard
                            icon={Hash}
                            title="Current Difficulty"
                            value={
                                (
                                    difficultyData.currentDifficulty / 1e12
                                ).toFixed(2) + " T"
                            }
                        />
                        <StatCard
                            icon={Zap}
                            title="Network Hashrate"
                            value={
                                difficultyData.networkHashrate.toFixed(2) +
                                " EH/s"
                            }
                        />
                        <StatCard
                            icon={Clock}
                            title="Average Block Time"
                            value={
                                difficultyData?.averageBlockTime?.toFixed(1) +
                                " min"
                            }
                            subtitle="Target: 10 minutes"
                        />
                        <StatCard
                            icon={ArrowUpDown}
                            title="Estimated Adjustment"
                            value=""
                            valueClassName={getAdjustmentColor(
                                difficultyData.estimatedAdjustment
                            )}
                        >
                            {difficultyData?.estimatedAdjustment > 0 && "+"}
                            {difficultyData?.estimatedAdjustment?.toFixed(2)}%
                        </StatCard>
                        <div className="bg-vscode-input-dark p-4 rounded-lg col-span-2">
                            <div className="flex items-center mb-2">
                                <Timer className="w-4 h-4 mr-2 text-orange-500" />
                                <span className="font-medium">
                                    Next Adjustment
                                </span>
                            </div>

                            <div className="relative w-full h-2 mb-4">
                                <div className="absolute w-full h-full bg-orange-500/10 rounded-full" />
                                <motion.div
                                    className="absolute h-full bg-orange-500 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{
                                        width: `${((2016 - difficultyData.remainingBlocks) / 2016) * 100}%`
                                    }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-2xl font-bold">
                                        {difficultyData.remainingBlocks} blocks
                                    </div>
                                    <div className="text-sm opacity-70">
                                        {Math.round(
                                            ((2016 -
                                                difficultyData.remainingBlocks) /
                                                2016) *
                                                100
                                        )}
                                        % complete
                                    </div>
                                </div>

                                <div>
                                    <div className="text-2xl font-bold tabular-nums">
                                        {countdown.days}d {countdown.hours}h{" "}
                                        {countdown.minutes}m {countdown.seconds}
                                        s
                                    </div>
                                    <div className="text-sm opacity-70">
                                        Estimated time remaining
                                    </div>
                                </div>
                            </div>

                            <BlockProgress
                                remainingBlocks={difficultyData.remainingBlocks}
                            />
                        </div>
                    </div>

                        </div>
                    </div>
        </motion.div>
    )
}

export default DifficultyEstimator
