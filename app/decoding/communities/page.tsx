"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { HiUsers, HiClock, HiGlobe, HiArrowRight } from "react-icons/hi"
import { getAllCommunities } from "@/lib/data/communities"
import { formatDate } from "@/lib/utils/dates"
import TopicBanner from "@/components/bitcoin-topics/layouts/TopicBanner"

// Mock content for TopicBanner
const communitiesContent = {
    title: "Communities",
    slug: "communities",
    summary:
        "Join a community-led cohort to learn Bitcoin development with peers.",
    tags: ["community"]
    // Add other required fields from your Topic type
}

// Add a helper function to format the status display text
const getStatusDisplay = (status: string) => {
    switch (status) {
        case "in-progress":
            return {
                text: "In Progress",
                classes: "bg-green-500/20 text-green-400"
            }
        case "starting-soon":
            return {
                text: "Starting Soon",
                classes: "bg-orange-500/20 text-orange-400"
            }
        case "completed":
            return {
                text: "Completed",
                classes: "bg-blue-500/20 text-blue-400"
            }
        default:
            return {
                text: "Unknown",
                classes: "bg-gray-500/20 text-gray-400"
            }
    }
}

export default function CommunitiesPage() {
    const [filter, setFilter] = useState("all")
    const communities = getAllCommunities()

    // Filter communities based on selected filter
    const filteredCommunities = communities.filter((community) => {
        if (filter === "all") return true
        if (filter === "active")
            return community.currentCohort.status === "in-progress"
        if (filter === "upcoming")
            return community.currentCohort.status === "starting-soon"
        return true
    })

    return (
        <div>
            <div className="max-w-7xl mx-auto py-8 px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Bitcoin Development Communities
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Join a community-led cohort to learn Bitcoin development
                        with peers in your timezone and language.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex justify-center mb-8 space-x-4">
                    {["all", "active", "upcoming"].map((filterOption) => (
                        <button
                            key={filterOption}
                            onClick={() => setFilter(filterOption)}
                            className={`px-4 py-2 rounded-lg ${
                                filter === filterOption
                                    ? "bg-orange-500 text-white"
                                    : "bg-gray-800/50 text-gray-400 hover:text-white"
                            }`}
                        >
                            {filterOption.charAt(0).toUpperCase() +
                                filterOption.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Communities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCommunities.map((community) => (
                        <Link
                            key={community.id}
                            href={`/decoding/communities/${community.id}`}
                            className="bg-gray-900/40 rounded-xl p-6 hover:bg-gray-800/40 transition-all group"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 relative">
                                        <Image
                                            src={community.logo}
                                            alt={community.name}
                                            fill
                                            className="rounded-lg object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">
                                            {community.name}
                                        </h2>
                                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                                            <HiGlobe className="w-4 h-4" />
                                            <span>{community.language}</span>
                                            <span>•</span>
                                            <span>{community.timezone}</span>
                                        </div>
                                    </div>
                                </div>
                                <HiArrowRight className="w-6 h-6 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <p className="text-gray-400 mb-6">
                                {community.description}
                            </p>

                            {/* Current Cohort Info */}
                            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-300">
                                        Current Cohort #
                                        {community.currentCohort.number}
                                    </span>
                                    {community.currentCohort.status && (
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                getStatusDisplay(
                                                    community.currentCohort
                                                        .status
                                                ).classes
                                            }`}
                                        >
                                            {
                                                getStatusDisplay(
                                                    community.currentCohort
                                                        .status
                                                ).text
                                            }
                                        </span>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center text-gray-400">
                                        <HiUsers className="w-4 h-4 mr-2" />
                                        {community.currentCohort.students}{" "}
                                        Students
                                    </div>
                                    <div className="flex items-center text-gray-400">
                                        <HiClock className="w-4 h-4 mr-2" />
                                        {formatDate(
                                            community.currentCohort.startDate
                                        )}
                                    </div>
                                </div>
                                {/* Only show progress for in-progress cohorts */}
                                {community.currentCohort.status ===
                                    "in-progress" &&
                                    community.currentCohort.progress > 0 && (
                                        <div className="mt-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm text-gray-400">
                                                    Progress
                                                </span>
                                                <span className="text-sm text-orange-400">
                                                    {
                                                        community.currentCohort
                                                            .progress
                                                    }
                                                    %
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-orange-500 h-2 rounded-full transition-all"
                                                    style={{
                                                        width: `${community.currentCohort.progress}%`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                            </div>

                            {/* Community Stats */}
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">
                                    {community.totalAlumni} Alumni
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
