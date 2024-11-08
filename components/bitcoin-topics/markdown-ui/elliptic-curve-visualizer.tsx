"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as d3 from "d3"
import { Key, Lock, RefreshCw, ZoomIn, ZoomOut } from "lucide-react"

interface Point {
    x: number
    y: number
}

const EllipticCurveVisualizer = () => {
    const [privateKey, setPrivateKey] = useState<number>(0)
    const [publicKeyPoint, setPublicKeyPoint] = useState<Point | null>(null)
    const [showLine, setShowLine] = useState(true)
    const svgRef = useRef<SVGSVGElement | null>(null)
    const graphRef = useRef<SVGGElement | null>(null)

    // Constants for the curve y² = x³ + ax + b
    const a = 0
    const b = 7

    const calculateY = (x: number): number[] => {
        const y2 = Math.pow(x, 3) + a * x + b
        if (y2 < 0) return []
        const y = Math.sqrt(y2)
        return [-y, y]
    }

    const generateKeys = () => {
        // Simplified for visualization - in reality, would use proper EC math
        const newPrivateKey = Math.floor(Math.random() * 20) - 10
        setPrivateKey(newPrivateKey)

        // Generate corresponding public key point
        const x = newPrivateKey
        const ys = calculateY(x)
        if (ys.length > 0) {
            setPublicKeyPoint({ x, y: ys[0] })
        }
    }

    useEffect(() => {
        if (!svgRef.current || !graphRef.current) return

        const width = 800
        const height = 600
        const margin = 40

        // Clear previous content
        d3.select(graphRef.current).selectAll("*").remove()

        const svg = d3.select(svgRef.current)
        const g = d3.select(graphRef.current)

        // Setup scales with more appropriate domain for visualization
        const xScale = d3
            .scaleLinear()
            .domain([-5, 5])
            .range([margin, width - margin])

        const yScale = d3
            .scaleLinear()
            .domain([-5, 5])
            .range([height - margin, margin])

        // Draw axes
        const xAxis = d3.axisBottom(xScale).tickSize(-height + 2 * margin)
        const yAxis = d3.axisLeft(yScale).tickSize(-width + 2 * margin)

        // Add axes with grid lines
        g.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height / 2})`)
            .call(xAxis)
            .call((g) =>
                g
                    .selectAll(".tick line")
                    .attr("stroke", "#2c3e50")
                    .attr("stroke-opacity", 0.1)
            )

        g.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${width / 2},0)`)
            .call(yAxis)
            .call((g) =>
                g
                    .selectAll(".tick line")
                    .attr("stroke", "#2c3e50")
                    .attr("stroke-opacity", 0.1)
            )

        // Draw the curve
        const points: Point[] = []
        for (let x = -5; x <= 5; x += 0.01) {
            const ys = calculateY(x)
            ys.forEach((y) => points.push({ x, y }))
        }

        const line = d3
            .line<Point>()
            .x((d) => xScale(d.x))
            .y((d) => yScale(d.y))
            .curve(d3.curveBasis)

        // Draw the curve with a more prominent style
        g.append("path")
            .datum(points)
            .attr("class", "curve")
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "#F97316")
            .attr("stroke-width", 3)

        // Add points for private and public keys if they exist
        if (publicKeyPoint) {
            // Draw line from base point to public key point
            if (showLine) {
                g.append("line")
                    .attr("class", "key-line")
                    .attr("x1", xScale(0))
                    .attr("y1", yScale(Math.sqrt(b)))
                    .attr("x2", xScale(publicKeyPoint.x))
                    .attr("y2", yScale(publicKeyPoint.y))
                    .attr("stroke", "#3B82F6")
                    .attr("stroke-width", 2)
                    .attr("stroke-dasharray", "5,5")
            }

            // Base point (G)
            g.append("circle")
                .attr("cx", xScale(0))
                .attr("cy", yScale(Math.sqrt(b)))
                .attr("r", 6)
                .attr("fill", "#22C55E")
                .attr("stroke", "white")
                .attr("stroke-width", 2)

            // Public key point
            g.append("circle")
                .attr("cx", xScale(publicKeyPoint.x))
                .attr("cy", yScale(publicKeyPoint.y))
                .attr("r", 6)
                .attr("fill", "#3B82F6")
                .attr("stroke", "white")
                .attr("stroke-width", 2)
        }

        // Setup zoom behavior
        const zoom = d3
            .zoom()
            .scaleExtent([0.5, 5])
            .on("zoom", (event) => {
                g.attr("transform", event.transform)
            })

        svg.call(zoom)
    }, [publicKeyPoint, showLine])

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="bg-vscode-container-light dark:bg-vscode-container-dark rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-vscode-text-light dark:text-vscode-text-dark">
                        Bitcoin Key Generation
                    </h2>
                    <div className="flex space-x-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={generateKeys}
                            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Generate New Keys
                        </motion.button>
                    </div>
                </div>

                <div className="relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                    <svg
                        ref={svgRef}
                        width="800"
                        height="600"
                        className="w-full h-full"
                    >
                        <g ref={graphRef} />
                    </svg>

                    {/* Key information display */}
                    <div className="absolute top-4 left-4 space-y-2">
                        <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg shadow">
                            <div className="flex items-center">
                                <Key className="h-5 w-5 mr-2 text-green-500" />
                                <span className="font-semibold">
                                    Base Point (G)
                                </span>
                            </div>
                        </div>
                        {publicKeyPoint && (
                            <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg shadow">
                                <div className="flex items-center">
                                    <Lock className="h-5 w-5 mr-2 text-blue-500" />
                                    <span className="font-semibold">
                                        Public Key Point
                                    </span>
                                </div>
                                <p className="text-sm mt-1">
                                    ({publicKeyPoint.x.toFixed(2)},{" "}
                                    {publicKeyPoint.y.toFixed(2)})
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EllipticCurveVisualizer
