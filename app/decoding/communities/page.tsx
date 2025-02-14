"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { HiUsers, HiClock, HiGlobe, HiArrowRight } from "react-icons/hi"
import { FaDiscord, FaRocket } from "react-icons/fa"
import { getAllCommunities } from "@/lib/utils/communities"

const getStatusDisplay = (status: string | undefined) => {
    switch (status) {
        case "in-progress":
            return {
                text: "In Progress",
                classes:
                    "bg-green-500/20 text-green-400 border border-green-500/20 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/20"
            }
        case "starting-soon":
            return {
                text: "Starting Soon",
                classes:
                    "bg-orange-500/20 text-orange-600 border border-orange-500/20 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/20"
            }
        case "completed":
            return {
                text: "Completed",
                classes:
                    "bg-blue-500/20 text-blue-600 border border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/20"
            }
        default:
            return {
                text: "Unknown",
                classes:
                    "bg-gray-500/20 text-gray-600 border border-gray-500/20 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/20"
            }
    }
}

type DateInput = string | number | Date

const formatDate = (date: DateInput) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })
}

export default function CommunitiesPage() {
    const [filter, setFilter] = useState("all")
    const [selectedLanguage, setSelectedLanguage] = useState("all")
    const communities = getAllCommunities()
    const languages = [
        "all",
        ...Array.from(new Set(communities.map((c) => c.language)))
    ]

    const filteredCommunities = communities.filter((community) => {
        const matchesFilter =
            filter === "all" ||
            (filter === "active" &&
                community.currentCohort.status === "in-progress") ||
            (filter === "upcoming" &&
                community.currentCohort.status === "starting-soon")

        const matchesLanguage =
            selectedLanguage === "all" ||
            community.language === selectedLanguage

        return matchesFilter && matchesLanguage
    })

    return (
        <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950">
            <div className="relative border-b border-gray-200 dark:border-gray-800">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100/50 via-white to-transparent dark:from-orange-500/20 dark:via-black dark:to-transparent opacity-70" />
                <div className="relative max-w-7xl mx-auto px-4 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-6"
                    >
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
                            bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-500/10 dark:to-orange-500/5 
                            border border-orange-200 dark:border-orange-500/20"
                        >
                            <FaRocket className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                                Community-Led Bitcoin Education
                            </span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
                                Bitcoin Communities
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 leading-[1.2] pb-1 md:pb-2 pt-1 md:pt-2">
                                    Running Study Cohorts
                                </span>
                            </h1>

                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
                                Join these Bitcoin communities as they guide
                                their members through structured learning
                                programs with weekly discussions and hands-on
                                development.
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-6 px-6 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/50">
                            <div className="text-left">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Want to use Decoding Bitcoin for your next
                                    cohort?
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Let us know and we'll create a custom
                                    dashboard for your community.
                                </p>
                            </div>
                            <Link
                                href="mailto:info@bitcoindevs.xyz"
                                className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 
                                    text-white rounded-lg transition-all duration-200 whitespace-nowrap
                                    hover:translate-y-[-1px]"
                            >
                                Contact Us
                                <HiArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/decoding"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 
                                hover:bg-gray-200 dark:hover:bg-gray-800/80 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                            >
                                <HiArrowRight className="w-4 h-4 rotate-180" />
                                <span>Back</span>
                            </Link>

                            <div className="flex gap-2">
                                {["all", "active", "upcoming"].map(
                                    (filterOption) => (
                                        <button
                                            key={filterOption}
                                            onClick={() =>
                                                setFilter(filterOption)
                                            }
                                            className={`
                                            px-3 py-1.5 rounded-lg text-sm font-medium
                                            transition-all duration-200
                                            ${
                                                filter === filterOption
                                                    ? "bg-orange-500 text-white"
                                                    : "bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800/80 hover:text-gray-900 dark:hover:text-white"
                                            }
                                        `}
                                        >
                                            {filterOption
                                                .charAt(0)
                                                .toUpperCase() +
                                                filterOption.slice(1)}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        <select
                            value={selectedLanguage}
                            onChange={(e) =>
                                setSelectedLanguage(e.target.value)
                            }
                            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg
                                text-gray-900 dark:text-gray-300 focus:outline-none focus:border-orange-500/50"
                        >
                            {languages.map((lang) => (
                                <option key={lang} value={lang}>
                                    {lang.charAt(0).toUpperCase() +
                                        lang.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCommunities.map((community) => (
                        <motion.div
                            key={community.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link
                                href={`/decoding/communities/${community.id}`}
                                className="group block bg-white dark:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-800/50 
                                    rounded-xl border border-gray-200 dark:border-gray-700/50 overflow-hidden
                                    transition-all duration-300 hover:border-orange-500/20
                                    hover:shadow-lg hover:shadow-orange-500/5"
                            >
                                <div className="relative p-6">
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-100/50 dark:from-gray-700/5 to-transparent" />
                                    <div className="relative">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex gap-4">
                                                <div className="w-16 h-16 relative rounded-xl overflow-hidden">
                                                    <Image
                                                        src={community.logo}
                                                        alt={community.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                        {community.name}
                                                    </h2>
                                                    <div className="flex items-center gap-3 text-sm">
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusDisplay(community.currentCohort.status).classes}`}
                                                        >
                                                            {
                                                                getStatusDisplay(
                                                                    community
                                                                        .currentCohort
                                                                        .status
                                                                ).text
                                                            }
                                                        </span>
                                                        <span className="text-gray-600 dark:text-gray-400">
                                                            Cohort #
                                                            {
                                                                community
                                                                    .currentCohort
                                                                    .number
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <HiArrowRight
                                                className="w-5 h-5 text-orange-500 opacity-0 group-hover:opacity-100 
                                                transition-all duration-300 transform group-hover:translate-x-1"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="space-y-1">
                                                <div className="text-xs text-gray-500">
                                                    Language
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                    <HiGlobe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                                    {community.language}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-xs text-gray-500">
                                                    Timezone
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                    <HiClock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                                    {community.timezone}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                                            {community.description}
                                        </p>

                                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800/50">
                                                        <HiUsers className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {
                                                                community
                                                                    .currentCohort
                                                                    .students
                                                            }
                                                        </div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                                            Students
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800/50">
                                                        <FaDiscord className="w-4 h-4 text-[#5865F2]" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {
                                                                community.totalAlumni
                                                            }
                                                        </div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                                            Alumni
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {community.currentCohort.status ===
                                                "in-progress" && (
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600 dark:text-gray-400">
                                                            Progress
                                                        </span>
                                                        <span className="text-orange-600 dark:text-orange-400 font-medium">
                                                            {
                                                                community
                                                                    .currentCohort
                                                                    .progress
                                                            }
                                                            %
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                                                        <motion.div
                                                            initial={{
                                                                width: 0
                                                            }}
                                                            animate={{
                                                                width: `${community.currentCohort.progress}%`
                                                            }}
                                                            transition={{
                                                                duration: 1,
                                                                ease: "easeOut"
                                                            }}
                                                            className="bg-orange-500 h-full rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700/50 p-4 bg-gray-50 dark:bg-gray-900/30">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                                <HiClock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                            </div>
                                            <div className="text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    {new Date(
                                                        community.currentCohort.startDate
                                                    ) <= new Date()
                                                        ? "Started"
                                                        : "Starts"}
                                                </span>
                                                <div className="text-gray-900 dark:text-white font-medium">
                                                    {formatDate(
                                                        community.currentCohort
                                                            .startDate
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-orange-600 dark:text-orange-400 font-medium group-hover:translate-x-1 transition-transform duration-300">
                                            View Details →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {filteredCommunities.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center">
                            <FaRocket className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                            No communities found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Try adjusting your filters to find more communities
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
