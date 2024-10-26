"use client"
import React, { useState, useEffect, useRef, useCallback } from "react"
import * as d3 from "d3"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Plus, ZoomIn, ZoomOut, Minus } from "lucide-react"

interface ScriptNode {
    id: string
    hash: string
    children?: ScriptNode[]
}

const MerkleTreeExplainer: React.FC = () => {
    const [scripts, setScripts] = useState<ScriptNode[]>([])
    const [selectedScriptId, setSelectedScriptId] = useState<string | null>(
        null
    )
    const [merkleRoot, setMerkleRoot] = useState<ScriptNode | null>(null)
    const [transform, setTransform] = useState<d3.ZoomTransform>(
        d3.zoomIdentity
    )
    const zoomRef = useRef<any>()
    const svgRef = useRef<SVGSVGElement | null>(null)
    const treeGroupRef = useRef<SVGGElement>(null)
    const [merkleProofNodes, setMerkleProofNodes] = useState<string[]>([])
    const [merklePathNodes, setMerklePathNodes] = useState<string[]>([])
    const { theme } = useTheme()
    const [previousRoot, setPreviousRoot] = useState<ScriptNode | null>(null)
    const [scriptInput, setScriptInput] = useState<string>("")
    const [scriptCounter, setScriptCounter] = useState<number>(1)

    const getTextColor = useCallback(
        (d?: d3.HierarchyPointNode<ScriptNode>) => {
            return theme === "dark" ? "#ffffff" : "#333333"
        },
        [theme]
    )

    // Function to simulate hash calculation
    const calculateHash = (input: string) => {
        let hash = 0
        for (let i = 0; i < input.length; i++) {
            const char = input.charCodeAt(i)
            hash = (hash << 5) - hash + char
            hash |= 0
        }
        return `Hash(${Math.abs(hash)})`
    }

    // Function to add a new script
    const addScript = () => {
        const scriptId = scriptInput.trim() || `Script ${scriptCounter}`
        const newScript: ScriptNode = {
            id: scriptId,
            hash: calculateHash(scriptId)
        }
        setScripts([...scripts, newScript])
        setScriptInput("") // Clear input
        setScriptCounter((prev) => prev + 1)
    }

    // Update the buildMerkleTree function
    const buildMerkleTree = (leafNodes: ScriptNode[]): ScriptNode | null => {
        if (leafNodes.length === 0) return null

        // Create hash nodes for each script
        let hashNodes: ScriptNode[] = leafNodes.map((script, index) => ({
            id: `Hash_${index + 1}`,
            hash: calculateHash(script.hash),
            children: [script]
        }))

        while (hashNodes.length > 1) {
            const tempNodes: ScriptNode[] = []
            for (let i = 0; i < hashNodes.length; i += 2) {
                const left = hashNodes[i]
                const right = hashNodes[i + 1] || hashNodes[i] // Duplicate last node if odd number
                const combinedHash = calculateHash(left.hash + right.hash)
                const parentNode: ScriptNode = {
                    id: `Node_${left.id.split("_")[1]}${right.id.split("_")[1]}`,
                    hash: combinedHash,
                    children: [left, right]
                }
                tempNodes.push(parentNode)
            }
            hashNodes = tempNodes
        }

        return hashNodes[0]
    }

    // Updated function to get Merkle proof nodes and path nodes
    const getMerkleProof = (
        root: ScriptNode,
        targetId: string
    ): { proof: string[]; path: string[] } => {
        const proof: string[] = []
        const path: string[] = []

        const traverse = (
            node: ScriptNode,
            currentPath: ScriptNode[] = []
        ): boolean => {
            if (!node.children) {
                if (node.id === targetId) {
                    currentPath.forEach((parent) => {
                        path.push(parent.hash)
                        const sibling = parent.children!.find(
                            (child) =>
                                child.id !==
                                currentPath[currentPath.indexOf(parent) + 1]?.id
                        )
                        if (sibling) {
                            proof.push(sibling.hash)
                        }
                    })
                    return true
                }
                return false
            }

            for (const child of node.children) {
                if (traverse(child, [...currentPath, node])) {
                    return true
                }
            }

            return false
        }

        traverse(root)
        return { proof, path }
    }

    // Update the handleScriptSelect function
    const handleScriptSelect = useCallback(
        (id: string) => {
            setSelectedScriptId(id)
            if (merkleRoot) {
                const { proof, path } = getMerkleProof(merkleRoot, id)
                setMerkleProofNodes(proof)
                setMerklePathNodes(path)
            }
        },
        [merkleRoot]
    )

    const handleZoom = useCallback((zoomLevel: number) => {
        if (zoomRef.current && svgRef.current) {
            d3.select(svgRef.current)
                .transition()
                .duration(750)
                .call(zoomRef.current.scaleTo, zoomLevel)
        }
    }, [])

    useEffect(() => {
        if (svgRef.current && treeGroupRef.current) {
            const svg = d3.select(svgRef.current)
            const g = d3.select(treeGroupRef.current)

            const zoom: any = d3
                .zoom<SVGSVGElement, undefined>()
                .scaleExtent([0.1, 2])
                .on(
                    "zoom",
                    (event: d3.D3ZoomEvent<SVGSVGElement, undefined>) => {
                        g.attr("transform", event.transform.toString())
                        setTransform(event.transform)
                    }
                )

            svg.call(zoom)
            zoomRef.current = zoom
            svg.call(zoom.transform, d3.zoomIdentity.scale(1))
        }
    }, [])

    // Function to wrap text inside nodes
    const wrapText = useCallback((text: any, width: number) => {
        text.each(function (this: d3.BaseType) {
            const textElement = d3.select(this)
            const words = textElement.text().split("\n")
            const lineHeight = 1.1 // ems
            const y = textElement.attr("y")
            const dy = parseFloat(textElement.attr("dy") || "0")

            textElement.text(null)

            words.forEach((word, i) => {
                textElement
                    .append("tspan")
                    .attr("x", 0)
                    .attr("y", y)
                    .attr("dy", `${i * lineHeight + dy}em`)
                    .text(word)
            })
        })
    }, [])

    // Function to check if a node is in the Merkle path
    const isInMerklePath = useCallback(
        (node: d3.HierarchyPointNode<ScriptNode>): boolean => {
            if (!selectedScriptId) return false
            if (!node.children) {
                return node.data.id === selectedScriptId
            }
            return node.children.some((child) => isInMerklePath(child))
        },
        [selectedScriptId]
    )

    // Update the getNodeText function
    const getNodeText = useCallback((d: any): string => {
        if (!d.parent) {
            return "Merkle Root"
        } else if (!d.children) {
            return d.data.id // Just "Script X" for leaf nodes
        } else if (d.data.id.startsWith("Hash_")) {
            return `H${d.data.id.split("_")[1]}` // H1, H2, ..., Hn for direct hash nodes
        } else {
            // For combined hash nodes, use the pattern H12, H1234, etc.
            const childIds = d.children
                .map((child: any) => child.data.id.split("_")[1])
                .join("")
            return `H${childIds}`
        }
    }, [])

    // Update the drawTree function
    const drawTree = useCallback(
        (rootNode: ScriptNode, previousRoot: ScriptNode | null) => {
            if (!treeGroupRef.current) return

            const treeGroup = d3.select(treeGroupRef.current)

            const nodeWidth = 100
            const nodeHeight = 40
            const horizontalSpacing = 15 // Reduced from 20
            const verticalSpacing = 50 // Reduced from 60
            const topPadding = 60

            // Use the full SVG dimensions
            const svgWidth = svgRef.current?.clientWidth || 800
            const svgHeight = svgRef.current?.clientHeight || 600

            const root = d3.hierarchy<ScriptNode>(rootNode)
            const previousHierarchy = previousRoot
                ? d3.hierarchy(previousRoot)
                : null

            // Calculate the tree width based on the number of leaves
            const treeWidth = Math.max(
                root.leaves().length * (nodeWidth + horizontalSpacing),
                svgWidth
            )
            // Use the full height of the SVG
            const treeHeight = svgHeight

            const treeLayout = d3
                .tree<ScriptNode>()
                .size([treeWidth, treeHeight - nodeHeight])
                .nodeSize([
                    nodeWidth + horizontalSpacing,
                    nodeHeight + verticalSpacing
                ])

            treeLayout(root)

            // Adjust y-coordinates to start from the top with increased padding
            root.each((d) => {
                d.y = d.depth * (nodeHeight + verticalSpacing) + topPadding
            })

            // Center the tree horizontally
            const leftmostNode = root
                .descendants()
                .reduce((min, node: any) => Math.min(min, node.x), Infinity)
            const rightmostNode = root
                .descendants()
                .reduce((max, node: any) => Math.max(max, node.x), -Infinity)
            const horizontalCenter = (leftmostNode + rightmostNode) / 2
            const horizontalShift = svgWidth / 2 - horizontalCenter
            root.each((d: d3.HierarchyNode<ScriptNode>) => {
                if (d.x !== undefined) {
                    d.x += horizontalShift
                }
            })

            // Clear the existing content of the tree group
            treeGroup.selectAll("*").remove()

            // Create a separate group for links
            const linkGroup = treeGroup.append("g").attr("class", "links")

            // Create a separate group for nodes
            const nodeGroup = treeGroup.append("g").attr("class", "nodes")

            // Function to check if a node is new or changed
            const isNewOrChanged = (
                node: d3.HierarchyPointNode<ScriptNode>
            ) => {
                if (!previousHierarchy) return true
                const previousNode: any = previousHierarchy.find(
                    (n) => n.data.id === node.data.id
                )
                if (!previousNode) return true // New node

                // Check if position changed significantly
                const positionChanged =
                    Math.abs(previousNode.x - node.x) > 1 ||
                    Math.abs(previousNode.y - node.y) > 1

                return positionChanged
            }

            // Update node colors
            const getNodeColor = (d?: any) => {
                if (!d) return theme === "dark" ? "#1e1e1e" : "#ffffff"

                if (!d.children) {
                    return "#effef3" // Leaf nodes (scripts)
                } else if (merkleProofNodes.includes(d.data.hash)) {
                    return "#ffe8d8" // Orange background for Merkle proof nodes
                } else if (merklePathNodes.includes(d.data.hash)) {
                    return theme === "dark" ? "#3c3c3c" : "#ffffff"
                } else {
                    return theme === "dark" ? "#1e1e1e" : "#ffffff"
                }
            }

            // Define getBorderColor function
            const getBorderColor = (d?: d3.HierarchyPointNode<ScriptNode>) => {
                if (!d)
                    return theme === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.1)"

                if (!d.children) {
                    return "#28b648" // Border for leaf nodes (scripts)
                } else if (merkleProofNodes.includes(d.data.hash)) {
                    return "#f36228" // Orange border for Merkle proof nodes
                }
                return theme === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)"
            }

            // Add a filter definition for the drop shadow
            const defs = treeGroup.append("defs")
            defs.append("filter")
                .attr("id", "drop-shadow")
                .attr("height", "130%")
                .append("feDropShadow")
                .attr("dx", 0)
                .attr("dy", 3)
                .attr("stdDeviation", 3)
                .attr(
                    "flood-color",
                    theme === "dark"
                        ? "rgba(0, 0, 0, 0.5)"
                        : "rgba(0, 0, 0, 0.3)"
                )

            // Update links
            const link = linkGroup
                .selectAll<
                    SVGPathElement,
                    d3.HierarchyPointLink<ScriptNode>
                >("path.link")
                .data(root.links())

            // Remove old links with animation only for removed links
            link.exit().transition().duration(500).style("opacity", 0).remove()

            // Add new links with animation only for new connections
            const linkEnter = link
                .enter()
                .append("path")
                .attr("class", "link")
                .attr("fill", "none")
                .attr("stroke", "#ccc")
                .attr("data-source", (d) => d.source.data.id)
                .attr("data-target", (d) => d.target.data.id)
                .style("opacity", 0)

            // Merge enter and update selections with conditional animation
            link.merge(linkEnter)
                .attr(
                    "d",
                    d3
                        .linkVertical<any, any>()
                        .x((d) => d.x)
                        .y((d) => d.y)
                )
                .each(function (d: any) {
                    const isNew =
                        isNewOrChanged(d.source) || isNewOrChanged(d.target)
                    if (isNew) {
                        // Only animate new or changed links
                        const pathLength = this.getTotalLength()
                        d3.select(this)
                            .attr(
                                "stroke-dasharray",
                                pathLength + " " + pathLength
                            )
                            .attr("stroke-dashoffset", pathLength)
                            .style("opacity", 1)
                            .transition()
                            .duration(1000)
                            .attr("stroke-dashoffset", 0)
                    } else {
                        // Existing links should maintain their current state
                        d3.select(this)
                            .attr("stroke-dasharray", null)
                            .attr("stroke-dashoffset", null)
                            .style("opacity", 1)
                    }
                })

            // Update nodes
            const node = nodeGroup
                .selectAll<
                    SVGGElement,
                    d3.HierarchyPointNode<ScriptNode>
                >("g.node")
                .data(root.descendants())

            // Remove old nodes with animation
            node.exit().transition().duration(500).style("opacity", 0).remove()

            // Add new nodes with animation only for new nodes
            const nodeEnter = node
                .enter()
                .append("g")
                .attr("class", "node")
                .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
                .style("opacity", 0)

            // Add rectangles for new nodes
            nodeEnter
                .append("rect")
                .attr("x", -nodeWidth / 2)
                .attr("y", -nodeHeight / 2)
                .attr("width", nodeWidth)
                .attr("height", nodeHeight)
                .attr("fill", getNodeColor)
                .attr("stroke", (d: any) => getBorderColor(d))
                .attr("stroke-width", 1)
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("filter", "url(#drop-shadow)")

            // Add text for new nodes
            nodeEnter
                .append("text")
                .attr("text-anchor", "middle")
                .attr("dy", 0)
                .attr("font-size", "10px")
                .attr("fill", (d: any) => getTextColor(d))
                .text((d) => getNodeText(d))
                .call(wrapText, nodeWidth - 10)
                .style("font-size", "10px") // Adjust font size to fit
                .each(function () {
                    const text = d3.select(this)
                    const words = text.text().split(/\s+/)
                    let line = ""
                    let lineNumber = 0
                    const lineHeight = 1.1 // ems
                    const y = text.attr("y")
                    const dy = parseFloat(text.attr("dy") || "0")
                    let tspan = text
                        .text(null)
                        .append("tspan")
                        .attr("x", 0)
                        .attr("y", y)
                        .attr("dy", dy + "em")

                    for (let i = 0; i < words.length; i++) {
                        let word = words[i]
                        line += word + " "
                        tspan.text(line.trim())

                        if (
                            tspan.node()!.getComputedTextLength() >
                            nodeWidth - 10
                        ) {
                            line = word + " "
                            tspan = text
                                .append("tspan")
                                .attr("x", 0)
                                .attr("y", y)
                                .attr(
                                    "dy",
                                    ++lineNumber * lineHeight + dy + "em"
                                )
                                .text(word)
                        }
                    }
                })

            // Merge enter and update selections with conditional animation
            node.merge(nodeEnter).each(function (d: any) {
                const nodeSelection = d3.select(this)
                if (isNewOrChanged(d)) {
                    // Animate only new or changed nodes
                    nodeSelection
                        .transition()
                        .duration(1000)
                        .attr("transform", `translate(${d.x}, ${d.y})`)
                        .style("opacity", 1)
                } else {
                    // Instantly update existing nodes without animation
                    nodeSelection
                        .attr("transform", `translate(${d.x}, ${d.y})`)
                        .style("opacity", 1)
                }
            })

            // Update node colors and borders
            node.merge(nodeEnter)
                .select("rect")
                .attr("fill", getNodeColor)
                .attr("stroke", getBorderColor())

            // Update node text
            node.merge(nodeEnter)
                .select("text")
                .text((d) => getNodeText(d))
                .call(wrapText, nodeWidth - 10)
                .style("font-size", "10px")
                .style("fill", getTextColor())
                .each(function () {
                    const text = d3.select(this)
                    const words = text.text().split(/\s+/)
                    let line = ""
                    let lineNumber = 0
                    const lineHeight = 1.1 // ems
                    const y = text.attr("y")
                    const dy = parseFloat(text.attr("dy") || "0")
                    let tspan = text
                        .text(null)
                        .append("tspan")
                        .attr("x", 0)
                        .attr("y", y)
                        .attr("dy", dy + "em")

                    for (let i = 0; i < words.length; i++) {
                        let word = words[i]
                        line += word + " "
                        tspan.text(line.trim())

                        if (
                            tspan.node()!.getComputedTextLength() >
                            nodeWidth - 10
                        ) {
                            line = word + " "
                            tspan = text
                                .append("tspan")
                                .attr("x", 0)
                                .attr("y", y)
                                .attr(
                                    "dy",
                                    ++lineNumber * lineHeight + dy + "em"
                                )
                                .text(word)
                        }
                    }
                })

            // Add click event to leaf nodes
            node.merge(nodeEnter)
                .filter((d) => !d.children)
                .style("cursor", "pointer")
                .on("click", (event, d) => {
                    handleScriptSelect(d.data.id)
                })

            // Add a new function to handle node hover
            node.merge(nodeEnter).on("click", (event, d) => {
                if (!d.children) {
                    handleScriptSelect(d.data.id)
                }
            })

            // Add "Spend" button to leaf nodes
            nodeEnter
                .filter((d) => !d.children)
                .append("g")
                .attr("class", "spend-button")
                .attr("transform", `translate(0, ${nodeHeight / 2 + 10})`) // Center the button
                .style("cursor", "pointer")
                .on("click", (event, d) => {
                    event.stopPropagation() // Prevent triggering the node click event
                    handleSpend(d.data.id)
                })
                .each(function () {
                    const button = d3.select(this)
                    button
                        .append("rect")
                        .attr("x", -30)
                        .attr("y", -15)
                        .attr("width", 60)
                        .attr("height", 30)
                        .attr("rx", 15)
                        .attr("ry", 15)
                        .attr("fill", "#4CAF50")
                        .attr("stroke", "#45a049")
                        .attr("stroke-width", 2)

                    button
                        .append("text")
                        .attr("text-anchor", "middle")
                        .attr("dy", 5)
                        .attr("fill", "white") // Keep this white for contrast on the green button
                        .attr("font-size", "12px")
                        .text("Spend")
                })
        },
        [
            selectedScriptId,
            merkleProofNodes,
            merklePathNodes,
            handleScriptSelect,
            getNodeText,
            wrapText,
            theme,
            getTextColor
        ]
    )

    const nodeWidth = 120 // Adjust this value as needed
    const nodeHeight = 60 // Adjust this value as needed

    const showNextEquation = (
        index: number,
        pathNodes: d3.Selection<
            SVGGElement,
            d3.HierarchyPointNode<ScriptNode>,
            SVGElement,
            unknown
        >,
        nodeGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
        getNodeText: (d: any) => string
    ) => {
        if (index >= pathNodes.size()) return

        pathNodes.each(function (d, i) {
            if (i === index) {
                const node = d3.select(this)
                let equationText: any = node.select(".equation-text")
                let borderPath: any = node.select(".border-path")
                const rect = node.select("rect")

                // Create elements if they don't exist
                if (equationText.empty()) {
                    equationText = node
                        .append("text")
                        .attr("class", "equation-text")
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "middle")
                        .style("font-size", "10px") // Reduced from 12px to 10px
                        .style("font-weight", "300") // Light font weight
                        .style("fill", getTextColor())
                }

                // Get rectangle dimensions
                const width = parseFloat(rect.attr("width"))
                const height = parseFloat(rect.attr("height"))
                const x = parseFloat(rect.attr("x"))
                const y = parseFloat(rect.attr("y"))

                // Only create and animate border for non-script nodes
                if (!d.children) {
                    // This is a script node, so we don't add a green border
                    if (borderPath.size() > 0) {
                        borderPath.remove() // Remove existing border if any
                    }
                } else {
                    if (borderPath.empty()) {
                        borderPath = node
                            .append("path")
                            .attr("class", "border-path")
                            .attr("fill", "none")
                            .attr("stroke", "#28b648") // Green border for hash calculation
                            .attr("stroke-width", 2)
                    }

                    // Add background and text color transition
                    rect.transition()
                        .duration(1000)
                        .attr("fill", "#effef3") // Green background
                        .attr("stroke", "#28b648") // Green border

                    // Update text color
                    node.select("text")
                        .transition()
                        .duration(1000)
                        .style("fill", "#333333") // Green text
                }

                // Set equation text color to black/white based on theme
                equationText
                    .text(getEquation(d, i, pathNodes.size()))
                    .attr("x", x + width / 2)
                    .attr("y", y)
                    .style("opacity", 0)
                    .style("fill", theme === "dark" ? "#ffffff" : "#333333") // Black/white text for equation
                    .style("font-size", "10px")
                    .style("font-weight", "300")
                    .transition()
                    .duration(1000)
                    .attr("y", y - height / 2 + 6)
                    .style("opacity", 1)

                // Animate the line to the parent node
                if (i < pathNodes.size() - 1) {
                    const parentNode = pathNodes
                        .filter((_, j) => j === i + 1)
                        .datum()
                    const line = nodeGroup.select(
                        `path.link[data-source="${parentNode.data.id}"][data-target="${d.data.id}"]`
                    )
                    line.transition()
                        .duration(500)
                        .attr("stroke", "#4CAF50") // Changed to green
                        .attr("stroke-width", 2)
                        .attr("opacity", 1)
                }
                setTimeout(
                    () =>
                        showNextEquation(
                            index + 1,
                            pathNodes,
                            nodeGroup,
                            getNodeText
                        ),
                    1000
                )
            }
        })
    }

    const handleSpend = useCallback(
        (id: string) => {
            setSelectedScriptId(id)
            if (merkleRoot) {
                const { proof, path } = getMerkleProof(merkleRoot, id)
                setMerkleProofNodes(proof)
                setMerklePathNodes(path)
                const nodeGroup = d3.select(treeGroupRef.current)
                const pathNodes: d3.Selection<
                    SVGGElement,
                    d3.HierarchyPointNode<ScriptNode>,
                    SVGGElement | null,
                    unknown
                > = nodeGroup
                    .selectAll<SVGGElement, d3.HierarchyPointNode<ScriptNode>>(
                        "g.node"
                    )
                    .filter(
                        (d: d3.HierarchyPointNode<ScriptNode>) =>
                            path.includes(d.data.hash) || d.data.id === id
                    )
                    .sort(
                        (
                            a: d3.HierarchyPointNode<ScriptNode>,
                            b: d3.HierarchyPointNode<ScriptNode>
                        ) => d3.descending(a.depth, b.depth)
                    )

                // Reset all lines to gray
                nodeGroup
                    .selectAll("path.link")
                    .attr("stroke", theme === "dark" ? "#555" : "#ccc")
                    .attr("stroke-width", 1)
                    .attr("opacity", 0.3)

                // Update node colors and opacity
                nodeGroup
                    .selectAll<
                        SVGGElement,
                        d3.HierarchyPointNode<ScriptNode>
                    >("g.node")
                    .each(function (d) {
                        const node = d3.select(this)
                        const rect = node.select("rect")
                        const text = node.select("text")
                        const isPartOfPath =
                            path.includes(d.data.hash) ||
                            proof.includes(d.data.hash) ||
                            d.data.id === id

                        rect.attr("fill", () => {
                            if (d.data.id === id) return "#4CAF50"
                            if (proof.includes(d.data.hash)) return "#ffe8d8" // Changed from #ffd700 to #ffe8d8
                            if (path.includes(d.data.hash))
                                return theme === "dark" ? "#4a4a4a" : "#ffffff"
                            return theme === "dark" ? "#2d2d2d" : "#ffffff"
                        })
                            .attr("stroke", () => {
                                if (proof.includes(d.data.hash) && d.children)
                                    return "#f36228" // Orange border for Merkle proof nodes (non-leaf)
                                if (!d.children) return "#28b648" // Green border for leaf nodes (scripts)
                                return theme === "dark" ? "#555" : "none" // Default border for other nodes
                            })
                            .attr("stroke-width", 1)
                            .transition()
                            .duration(500)
                            .attr("opacity", isPartOfPath ? 1 : 0.3)

                        text.transition()
                            .duration(500)
                            .attr("opacity", isPartOfPath ? 1 : 0.3)
                            .style(
                                "fill",
                                theme === "dark" ? "#ffffff" : "#333333"
                            ) // Always black/white text

                        if (!d.children) {
                            node.select(".spend-button")
                                .transition()
                                .duration(500)
                                .attr("opacity", isPartOfPath ? 1 : 0.3)
                        }
                    })

                // Update the function call
                showNextEquation(
                    0,
                    pathNodes as any,
                    nodeGroup as any,
                    getNodeText
                )
            }
        },
        [merkleRoot, getMerkleProof, theme]
    )

    const getEquation = (
        node: d3.HierarchyPointNode<ScriptNode>,
        index: number,
        pathLength: number
    ): string => {
        if (!node.children) {
            return `Hash(${node.data.id})` // For leaf nodes, show Hash(Script X)
        }

        const leftChild = node.children[0]
        const rightChild = node.children[1]

        const getLabel = (child: d3.HierarchyPointNode<ScriptNode>) => {
            if (!child.children) {
                return `Script ${child.data.id.split(" ")[1]}` // Directly use the script name
            }
            return getNodeText(child) // Use the getNodeText function for consistency
        }

        const leftLabel = getLabel(leftChild)
        const rightLabel = rightChild ? getLabel(rightChild) : leftLabel // Use left label if right child doesn't exist

        if (node.parent === null) {
            return `Merkle Root = Hash(${leftLabel} + ${rightLabel})`
        }

        return `${getNodeText(node)} = Hash(${leftLabel} + ${rightLabel})`
    }

    const resetTree = useCallback(() => {
        setScripts([])
        setSelectedScriptId(null)
        setMerkleRoot(null)
        setMerkleProofNodes([])
        setMerklePathNodes([])

        // Clear the SVG
        if (treeGroupRef.current) {
            d3.select(treeGroupRef.current).selectAll("*").remove()
        }

        // Reset zoom
        if (zoomRef.current && svgRef.current) {
            d3.select(svgRef.current)
                .transition()
                .duration(750)
                .call(zoomRef.current.transform, d3.zoomIdentity)
        }
    }, [])

    // Ensure drawTree is not called in useEffect when handleSpend is triggered
    useEffect(() => {
        if (merkleRoot && !selectedScriptId) {
            drawTree(merkleRoot, previousRoot)
            setPreviousRoot(merkleRoot)
        }
    }, [merkleRoot, drawTree, selectedScriptId])

    // Rebuild the Merkle tree whenever scripts change
    useEffect(() => {
        const root = buildMerkleTree(scripts)
        setMerkleRoot(root)
    }, [scripts])

    const removeScript = () => {
        if (scripts.length > 0) {
            const newScripts = scripts.slice(0, -1)
            setScripts(newScripts)
            setSelectedScriptId(null)
        }
    }

    return (
        <div className="mx-auto py-1 full-width">
            <div className="container mx-auto py-4 px-2">
                <div className="bg-vscode-background-light dark:bg-vscode-background-dark border rounded-lg p-4">
                    <div className="bg-vscode-container-light dark:bg-vscode-container-dark border rounded-lg p-4 mb-4">
                        <div className="flex flex-col items-center">
                            {/* Main container with items aligned at bottom */}
                            <div className="flex items-end gap-3">
                                {" "}
                                {/* Changed to items-end */}
                                {/* Input group with its label */}
                                <div className="flex flex-col items-center">
                                    {/* Label centered only above the input controls */}
                                    <span
                                        className="block text-center text-sm italic mb-3"
                                        style={{
                                            color: "#37b950",
                                            width: "calc(40px + 192px + 40px + 24px)" // width of minus + input + plus + gaps
                                        }}
                                    >
                                        Add script
                                    </span>

                                    {/* Input controls group */}
                                    <div className="flex items-center gap-3">
                                        <motion.button
                                            onClick={removeScript}
                                            className="flex items-center justify-center w-10 h-10 rounded-full shadow-sm transition-colors duration-200"
                                            style={{
                                                backgroundColor: "#effef3",
                                                border: "1px solid #37b950"
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            title="Remove script"
                                        >
                                            <Minus size={20} color="#37b950" />
                                        </motion.button>

                                        <div className="relative w-48">
                                            <input
                                                type="text"
                                                value={scriptInput}
                                                onChange={(e) =>
                                                    setScriptInput(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={`Script ${scriptCounter}`}
                                                className="w-full px-4 py-2 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-[#37b950] transition-all duration-200 placeholder-[#37b950]"
                                                style={{
                                                    backgroundColor: "#effef3",
                                                    border: "1px solid #37b950",
                                                    color: "#37b950"
                                                }}
                                            />
                                        </div>

                                        <motion.button
                                            onClick={addScript}
                                            className="flex items-center justify-center w-10 h-10 rounded-full shadow-sm transition-colors duration-200"
                                            style={{
                                                backgroundColor: "#effef3",
                                                border: "1px solid #37b950"
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            title="Add script"
                                        >
                                            <Plus size={20} color="#37b950" />
                                        </motion.button>
                                    </div>
                                </div>
                                {/* Reset button */}
                                <motion.button
                                    onClick={() => {
                                        resetTree()
                                        setScriptCounter(1)
                                        setScriptInput("")
                                    }}
                                    className="flex border items-center justify-center ml-2 px-4 h-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Reset
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    <div
                        className="w-full h-[600px] rounded-lg overflow-hidden relative mb-4"
                        style={{ cursor: "grab" }}
                    >
                        <svg ref={svgRef} width="100%" height="100%">
                            <g ref={treeGroupRef}></g>
                        </svg>

                        {/* Legend (bottom-left) */}
                        <div className="absolute bottom-2 left-2 bg-vscode-container-light dark:bg-vscode-container-dark p-2 rounded-md shadow-md opacity-80 hover:opacity-100 transition-opacity duration-200">
                            <span className="text-sm font-semibold mb-1 text-vscode-text-light dark:text-vscode-text-dark">
                                Legend:
                            </span>
                            <div className="grid grid-cols-1 gap-y-1">
                                {[
                                    {
                                        color: "#effef3",
                                        borderColor: "#28b648",
                                        label: "Selected Script"
                                    },
                                    {
                                        color: "#ffe8d8",
                                        borderColor: "#f36228",
                                        label: "Merkle Proof Nodes"
                                    }
                                ].map(({ color, borderColor, label }) => (
                                    <div
                                        key={label}
                                        className="flex items-center"
                                    >
                                        <div
                                            className="w-3 h-3 rounded-full mr-2"
                                            style={{
                                                backgroundColor: color,
                                                border: `1px solid ${borderColor}`
                                            }}
                                        ></div>
                                        <span className="text-xs text-vscode-text-light dark:text-vscode-text-dark">
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Zoom controls (centered at bottom) */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center items-center space-x-2 bg-vscode-container-light dark:bg-vscode-container-dark p-2 rounded-md shadow-md opacity-80 hover:opacity-100 transition-opacity duration-200">
                            <motion.button
                                onClick={() => handleZoom(transform.k / 1.2)}
                                className="p-1 bg-vscode-file-light dark:bg-vscode-file-dark text-vscode-text-light dark:text-vscode-text-dark rounded-full hover:bg-vscode-hover-light dark:hover:bg-vscode-hover-dark transition-colors duration-200"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ZoomOut size={16} />
                            </motion.button>
                            {[0.5, 1, 1.5].map((zoomLevel) => (
                                <motion.button
                                    key={zoomLevel}
                                    onClick={() => handleZoom(zoomLevel)}
                                    className={`px-2 py-1 rounded-md text-xs font-medium transition-colors duration-200 ${
                                        Math.abs(transform.k - zoomLevel) < 0.1
                                            ? "bg-orange-500 text-white"
                                            : "bg-vscode-file-light dark:bg-vscode-file-dark text-vscode-text-light dark:text-vscode-text-dark hover:bg-vscode-hover-light dark:hover:bg-vscode-hover-dark"
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {zoomLevel * 100}%
                                </motion.button>
                            ))}
                            <motion.button
                                onClick={() => handleZoom(transform.k * 1.2)}
                                className="p-1 bg-vscode-file-light dark:bg-vscode-file-dark text-vscode-text-light dark:text-vscode-text-dark rounded-full hover:bg-vscode-hover-light dark:hover:bg-vscode-hover-dark transition-colors duration-200"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ZoomIn size={16} />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MerkleTreeExplainer
