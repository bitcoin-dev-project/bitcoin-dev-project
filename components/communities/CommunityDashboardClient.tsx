"use client"

import { DashboardTabs } from "@/components/communities/DashboardTabs"
import { Progress } from "@/components/communities/Progress"
import { WeeklyCallSection } from "@/components/communities/WeeklyCallSection"
import {
    Community,
    getCurrentWeek,
    getWeeklyData,
    isCohortCompleted
} from "@/lib/utils/communities"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { FaCheckCircle } from "react-icons/fa"
import { HiArrowLeft, HiArrowRight, HiLockClosed } from "react-icons/hi"

export default function CommunityDashboardClient({
    communityData
}: {
    communityData: Community
}) {
    const currentWeek = getCurrentWeek(communityData) // Calculate once here
    const [selectedWeek, setSelectedWeek] = useState(currentWeek)
    const [activeTab, setActiveTab] = useState("Learning Path")

    const currentWeekData = getWeeklyData(communityData, selectedWeek)
    if (!currentWeekData) {
        setSelectedWeek(1)
        return null
    }

    const isCompleted = isCohortCompleted(communityData)
    const totalWeeks = communityData.weeklyData.length

    return (
        <div className="min-h-screen bg-white dark:bg-vscode-background-dark">
            {isCompleted && (
                <div className="border-b border-green-500/20 bg-green-500/5">
                    <div className="max-w-7xl mx-auto px-4 py-3">
                        <div className="flex items-center space-x-3">
                            <FaCheckCircle className="w-5 h-5 text-green-500" />
                            <p className="text-green-600 dark:text-green-400">
                                Cohort completed on{" "}
                                {new Date(
                                    communityData.currentCohort.endDate
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Simplified Header */}
            <div className="border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/decoding/communities"
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                            <HiArrowLeft className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        </Link>
                        <div className="w-12 h-12 relative">
                            <Image
                                src={communityData.logo}
                                alt={communityData.name}
                                fill
                                className="rounded-lg object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                {communityData.name}
                            </h1>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <span>{communityData.language}</span>
                                <span>•</span>
                                <span>{communityData.timezone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Week Navigation */}
            <div className="md:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/40">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-gray-900 dark:text-white font-medium">
                            {currentWeekData.topic}
                        </h2>
                    </div>
                    <div className="overflow-x-auto scrollbar-hide">
                        <div className="flex items-center min-w-max gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400 mr-1">
                                Week
                            </span>
                            <div className="flex gap-1.5">
                                {Array.from(
                                    { length: totalWeeks },
                                    (_, i) => i + 1
                                ).map((week) => (
                                    <button
                                        key={week}
                                        onClick={() => setSelectedWeek(week)}
                                        className={`
                                            min-w-[32px] h-8 rounded-full flex items-center justify-center text-sm
                                            transition-colors duration-200
                                            ${
                                                selectedWeek === week
                                                    ? "bg-orange-500 text-white"
                                                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                                            }
                                            ${week > currentWeek ? "opacity-50 cursor-not-allowed" : ""}
                                        `}
                                        disabled={week > currentWeek}
                                    >
                                        {week}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Sidebar with Desktop Week Navigation */}
                    <div className="md:col-span-3">
                        <div className="space-y-4">
                            <Progress community={communityData} />
                            <WeeklyCallSection weekData={currentWeekData} />
                            {/* Desktop Week Navigation */}
                            <div className="hidden md:block">
                                <div className="bg-white dark:bg-gray-800/40 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                                    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                            Course Timeline
                                        </h3>
                                    </div>
                                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {Array.from(
                                            { length: totalWeeks },
                                            (_, i) => i + 1
                                        ).map((week) => {
                                            const isLocked = week > currentWeek
                                            const isPast = week < currentWeek
                                            const isCurrent =
                                                week === currentWeek
                                            const isSelected =
                                                week === selectedWeek
                                            const weekData = getWeeklyData(
                                                communityData,
                                                week
                                            )

                                            return (
                                                <button
                                                    key={week}
                                                    onClick={() =>
                                                        setSelectedWeek(week)
                                                    }
                                                    disabled={isLocked}
                                                    className={`
                                                        w-full flex items-center gap-3 p-4
                                                        transition-colors duration-200
                                                        hover:bg-gray-50 dark:hover:bg-gray-700/40
                                                        ${isSelected ? "bg-orange-50 dark:bg-orange-900/20 border-l-2 border-orange-500" : ""}
                                                        ${isLocked ? "opacity-50 cursor-not-allowed" : ""}
                                                    `}
                                                >
                                                    <div
                                                        className={`
                                                        w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                                                        ${isLocked ? "bg-gray-100 dark:bg-gray-700" : isSelected ? "bg-orange-50 dark:bg-orange-900/20" : "bg-gray-50 dark:bg-gray-800/20"}
                                                    `}
                                                    >
                                                        {isLocked ? (
                                                            <HiLockClosed className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                        ) : isPast ? (
                                                            <FaCheckCircle className="w-4 h-4 text-green-500" />
                                                        ) : (
                                                            <span
                                                                className={`text-sm font-medium ${isSelected ? "text-orange-500" : "text-gray-600 dark:text-gray-400"}`}
                                                            >
                                                                {week}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <div className="flex items-center gap-2">
                                                            <span
                                                                className={`text-sm font-medium ${isSelected ? "text-orange-500" : "text-gray-900 dark:text-white"}`}
                                                            >
                                                                Week {week}
                                                            </span>
                                                            {isCurrent && (
                                                                <span className="text-xs px-1.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400">
                                                                    Current
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                                            {weekData?.topic ||
                                                                `Module ${week}`}
                                                        </p>
                                                    </div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-9">
                        <DashboardTabs
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            currentWeekData={currentWeekData}
                            resources={currentWeekData.resources}
                            weekNumber={selectedWeek}
                            totalWeeks={totalWeeks}
                            currentWeek={currentWeek}
                            communityData={communityData}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
