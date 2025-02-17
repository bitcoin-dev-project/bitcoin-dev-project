"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Percent,
    Hash,
    Calculator,
    Info,
    AlertTriangle,
    BookOpen
} from "lucide-react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts"

const ReorgCalculator = () => {
    const [attackerHashrate, setAttackerHashrate] = useState(30)
    const [blocks, setBlocks] = useState(6)
    const [showInfo, setShowInfo] = useState(false)
    const [showFormula, setShowFormula] = useState(false)

    const calculateProbability = (q: number, z: number) => {
        const p = 1 - q
        if (q >= 0.5) return 1

        const qp = q / p
        const lambda = z * qp

        let sum = 0
        for (let k = 0; k <= z; k++) {
            let logPoisson = k * Math.log(lambda) - lambda - logFactorial(k)
            let poisson = Math.exp(logPoisson)

            if (k === z) {
                sum += poisson
            } else {
                sum += poisson * (1 - Math.pow(qp, z - k))
            }
        }

        return 1 - sum
    }

    const logFactorial = (n: number) => {
        let sum = 0
        for (let i = 1; i <= n; i++) {
            sum += Math.log(i)
        }
        return sum
    }

    const probability = calculateProbability(attackerHashrate / 100, blocks)
    const riskLevel =
        probability < 0.01 ? "Low" : probability < 0.1 ? "Medium" : "High"

    const getRiskColors = (probability: number) => {
        if (probability < 0.01) {
            return {
                accent: "border-t-4 border-green-500",
                text: "text-green-500",
                input: "bg-vscode-input-dark",
                indicator: "bg-green-500",
                riskBadge:
                    "bg-green-500/10 text-green-500 border border-green-500/20",
                resultPanel: "bg-green-500/5 dark:bg-green-950/30"
            }
        } else if (probability < 0.1) {
            return {
                accent: "border-t-4 border-yellow-500",
                text: "text-yellow-500",
                input: "bg-vscode-input-dark",
                indicator: "bg-yellow-500",
                riskBadge:
                    "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
                resultPanel: "bg-yellow-500/5 dark:bg-yellow-950/30"
            }
        } else {
            return {
                accent: "border-t-4 border-red-500",
                text: "text-red-500",
                input: "bg-vscode-input-dark",
                indicator: "bg-red-500",
                riskBadge:
                    "bg-red-500/10 text-red-500 border border-red-500/20",
                resultPanel: "bg-red-500/5 dark:bg-red-950/30"
            }
        }
    }

    const colors = getRiskColors(probability)

    const getHashrateDescription = (hashrate: number) => {
        if (hashrate < 10) {
            return "Small Mining Operation - Limited attack capability"
        } else if (hashrate < 25) {
            return "Medium Mining Pool - Moderate attack capability"
        } else if (hashrate < 40) {
            return "Large Mining Pool - Significant attack capability"
        } else {
            return "Mining Coalition - Very high attack capability"
        }
    }

    const getHashrateColor = (hashrate: number) => {
        if (hashrate < 10) return "text-green-500"
        if (hashrate < 25) return "text-yellow-500"
        if (hashrate < 40) return "text-orange-500"
        return "text-red-500"
    }

    const generateGraphData = () => {
        const data = []
        for (let i = 1; i <= 12; i++) {
            data.push({
                blocks: i,
                probability:
                    calculateProbability(attackerHashrate / 100, i) * 100
            })
        }
        return data
    }

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-vscode-hover-dark p-2 rounded-lg border border-vscode-border-dark text-sm">
                    <p>Blocks: {payload[0].payload.blocks}</p>
                    <p>Probability: {payload[0].value.toFixed(4)}%</p>
                </div>
            )
        }
        return null
    }

    return (
        <motion.div
            className="w-full max-w-2xl mx-auto py-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className={`rounded-lg shadow-md overflow-hidden bg-vscode-container-dark ${colors.accent} transition-colors duration-500`}
            >
                <div className="bg-vscode-titleBar-dark p-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <Calculator className="w-5 h-5 mr-2" />
                        <span className="text-lg font-semibold">
                            Reorg Calculator
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowFormula(!showFormula)}
                            className="p-2 hover:bg-vscode-hover-light dark:hover:bg-vscode-hover-dark rounded-full transition-colors"
                            title="View Formula"
                        >
                            <BookOpen className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setShowInfo(!showInfo)}
                            className="p-2 hover:bg-vscode-hover-light dark:hover:bg-vscode-hover-dark rounded-full transition-colors"
                            title="How it works"
                        >
                            <Info className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {showFormula && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-vscode-hover-light dark:bg-vscode-hover-dark p-4 border-b border-vscode-border-light dark:border-vscode-border-dark"
                        >
                            <h3 className="font-semibold mb-2 flex items-center">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Bitcoin Whitepaper Formula
                            </h3>
                            <div className="text-sm space-y-2">
                                <p>
                                    The probability of an attacker catching up
                                    is given by:
                                </p>
                                <div className="bg-vscode-input-light dark:bg-vscode-input-dark p-3 rounded-md font-mono text-xs">
                                    P(z, q) = 1 - Σ(k=0 to z) (λᵏe⁻ᵏ/k!) * (1 -
                                    (q/p)ᶻ⁻ᵏ)
                                    <br />
                                    where λ = z(q/p), p = 1-q
                                </div>
                                <p className="text-xs opacity-75">
                                    z = number of blocks behind
                                    <br />
                                    q = attacker's hashrate proportion
                                    <br />p = honest network's hashrate
                                    proportion
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showInfo && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-vscode-hover-light dark:bg-vscode-hover-dark p-4 border-b border-vscode-border-light dark:border-vscode-border-dark"
                        >
                            <h3 className="font-semibold mb-2">
                                How it works:
                            </h3>
                            <p className="text-sm mb-2">
                                This calculator computes the probability that an
                                attacker with a given percentage of the total
                                network hashrate could successfully reorganize
                                blocks, based on the conditional formula from
                                the Double Spend Races paper.
                            </p>
                            <p className="text-sm">
                                The probability depends on these parameters:
                                <ul className="list-disc ml-4 mt-1">
                                    <li>
                                        <strong>Attacker hashrate (q%)</strong>:
                                        The portion of total network hashrate
                                        controlled by the attacker
                                    </li>
                                    <li>
                                        <strong>Honest hashrate (p%)</strong>:
                                        Automatically calculated as (1 - q)
                                    </li>
                                    <li>
                                        <strong>Blocks to catch up (z)</strong>:
                                        Number of blocks the honest chain is
                                        ahead
                                    </li>
                                </ul>
                            </p>
                            <p className="text-sm mt-2 text-vscode-text-light/70 dark:text-vscode-text-dark/70">
                                Note: This implementation uses κ (kappa) = 1,
                                which assumes average block timing to match
                                Satoshi's original probability model.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="p-6 space-y-6">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                                <Percent
                                    className={`w-4 h-4 mr-2 ${colors.text}`}
                                />
                                <span className="font-medium">
                                    Attacker's Hashrate (%)
                                </span>
                            </div>
                            <span
                                className={`text-sm font-medium ${getHashrateColor(attackerHashrate)}`}
                            >
                                {attackerHashrate}%
                            </span>
                        </div>

                        <input
                            type="range"
                            value={attackerHashrate}
                            onChange={(e) =>
                                setAttackerHashrate(Number(e.target.value))
                            }
                            min={0}
                            max={50}
                            step={1}
                            className="w-full h-2 bg-vscode-input-dark rounded-lg appearance-none cursor-pointer"
                        />

                        <div className="mt-3 text-sm p-3 bg-vscode-input-dark rounded-md">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                <span className="font-medium">
                                    Network Context:
                                </span>
                            </div>
                            <p className="mt-1 text-vscode-text-light/70 dark:text-vscode-text-dark/70">
                                For reference, Foundry USA, currently the
                                largest mining pool, controls approximately
                                31.1% of the global hashrate (according to
                                mempool.space).
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center mb-2">
                            <Hash className="w-4 h-4 mr-2" />
                            <span className="font-medium">
                                Blocks to Catch Up
                            </span>
                        </div>
                        <input
                            type="number"
                            value={blocks}
                            onChange={(e) =>
                                setBlocks(
                                    Math.max(
                                        1,
                                        Math.min(100, Number(e.target.value))
                                    )
                                )
                            }
                            min={1}
                            max={100}
                            className="w-full px-3 py-2 bg-vscode-input-light dark:bg-vscode-input-dark border border-vscode-lineNumber-light dark:border-vscode-lineNumber-dark rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <div className="text-xs text-vscode-text-light/70 dark:text-vscode-text-dark/70 mt-1">
                            Recommended: 6 blocks for most transactions
                        </div>
                    </div>

                    <div className={`rounded-lg p-4 ${colors.resultPanel}`}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-sm">
                                Probability of Successful Attack:
                            </div>
                            <div
                                className={`px-2 py-1 rounded-full text-sm ${colors.riskBadge}`}
                            >
                                <span className="flex items-center">
                                    <AlertTriangle className="w-4 h-4 mr-1" />
                                    {riskLevel} Risk
                                </span>
                            </div>
                        </div>

                        <div
                            className={`relative h-2 ${colors.input} rounded-full mb-3`}
                        >
                            <motion.div
                                className={`absolute h-full rounded-full ${colors.indicator}`}
                                initial={{ width: "0%" }}
                                animate={{ width: `${probability * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        <div
                            className={`text-3xl font-bold text-center ${colors.text}`}
                        >
                            {(probability * 100).toFixed(4)}%
                        </div>

                        <div className="mt-4 text-xs opacity-70">
                            {probability < 0.01
                                ? "Very unlikely to succeed. Transaction can be considered secure."
                                : probability < 0.1
                                  ? "Some risk exists. Consider waiting for more confirmations."
                                  : "High risk of reorganization. Wait for more confirmations."}
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={generateGraphData()}
                                    margin={{
                                        top: 10,
                                        right: 20,
                                        bottom: 25,
                                        left: 25
                                    }}
                                >
                                    <XAxis
                                        dataKey="blocks"
                                        stroke="#888"
                                        label={{
                                            value: "Number of Confirmations",
                                            position: "bottom",
                                            offset: 10,
                                            style: {
                                                fontSize: "12px"
                                            }
                                        }}
                                    />
                                    <YAxis
                                        stroke="#888"
                                        label={{
                                            value: "Attack Success Rate (%)",
                                            angle: -90,
                                            position: "insideLeft",
                                            offset: -15,
                                            style: {
                                                fontSize: "12px",
                                                textAnchor: "middle"
                                            }
                                        }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line
                                        type="monotone"
                                        dataKey="probability"
                                        stroke={
                                            probability < 0.01
                                                ? "#22c55e"
                                                : probability < 0.1
                                                  ? "#eab308"
                                                  : "#ef4444"
                                        }
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default ReorgCalculator
