"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
    FaDiscord,
    FaCheckCircle,
    FaBook,
    FaPuzzlePiece,
    FaTools,
    FaGithub
} from "react-icons/fa"
import {
    HiDocument,
    HiArrowRight,
    HiClock,
    HiUserCircle,
    HiLockClosed,
    HiPlay,
    HiArrowUpRight,
    HiCalendar
} from "react-icons/hi2"
import { motion } from "framer-motion"
import React from "react"
import {
    Community,
    getCommunity,
    getCurrentWeek,
    getWeeklyData,
    WeeklyData,
    isCohortCompleted,
    calculateCohortProgress,
    Resource,
    ResourceType
} from "@/lib/utils/communities"
import { allTopics } from "contentlayer/generated"
import { HiDownload } from "react-icons/hi"

interface CircularProgressProps {
    progress: number
    size?: number
    strokeWidth?: number
    primaryColor?: string
    secondaryColor?: string
}

const CircularProgress = ({
    progress,
    size = 120,
    strokeWidth = 8,
    primaryColor = "rgb(249, 115, 22)",
    secondaryColor = "rgba(249, 115, 22, 0.1)"
}: CircularProgressProps) => {
    const center = size / 2
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius

    return (
        <div className="absolute inset-0">
            <svg
                width={size}
                height={size}
                style={{ transform: "rotate(-90deg)" }}
                className="absolute inset-0"
            >
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={secondaryColor}
                    strokeWidth={strokeWidth}
                />
                <motion.circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={primaryColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{
                        strokeDashoffset:
                            circumference - (progress / 100) * circumference
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
            </svg>
        </div>
    )
}

const getTopicContent = (slug: string) => {
    return allTopics.find((topic) => topic.slug === slug)
}

const getNextCallDate = (weeklyCall: WeeklyData["weeklyCall"]) => {
    const callDay = new Date(weeklyCall.date)
    callDay.setHours(weeklyCall.time.hour, weeklyCall.time.minute, 0, 0)
    return callDay
}

const isCallActive = (weeklyCall: WeeklyData["weeklyCall"]) => {
    const now = new Date()
    const nextCall = getNextCallDate(weeklyCall)
    const timeDiff = nextCall.getTime() - now.getTime()
    const minutesUntilCall = timeDiff / (1000 * 60)
    return minutesUntilCall <= 10 && minutesUntilCall >= -60
}

const createCalendarEvent = (weeklyCall: WeeklyData["weeklyCall"]) => {
    const timeZone = weeklyCall.time.timeZone
    const nextCall = new Date(weeklyCall.date)
    debugger
    // Create a date in the specified timezone
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    })

    // Set the time in the original timezone
    const originalDate = new Date(weeklyCall.date)
    originalDate.setHours(weeklyCall.time.hour, weeklyCall.time.minute, 0, 0)

    // Format the date in the original timezone
    const formattedDate = formatter.format(originalDate)
    const [datePart, timePart] = formattedDate.split(", ")
    const [month, day, year] = datePart.split("/")
    const [hour, minute] = timePart.split(":")

    // Create the start date in the correct timezone
    nextCall.setFullYear(parseInt(year), parseInt(month) - 1, parseInt(day))
    nextCall.setHours(parseInt(hour), parseInt(minute), 0, 0)

    // Create end time (1 hour later)
    const endCall = new Date(nextCall)
    endCall.setHours(endCall.getHours() + 1)

    const event = {
        title: "Bitcoin Development Weekly Call",
        description: weeklyCall.description,
        startTime: nextCall
            .toISOString()
            .replace(/[-:]/g, "")
            .replace(/\.\d{3}/, ""),
        endTime: endCall
            .toISOString()
            .replace(/[-:]/g, "")
            .replace(/\.\d{3}/, ""),
        location: `Discord - ${weeklyCall.discordLink}`,
        timezone: timeZone
    }

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Decoding Bitcoin//Calendar//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, "\\n")}
DTSTART;TZID=${event.timezone}:${event.startTime}
DTEND;TZID=${event.timezone}:${event.endTime}
LOCATION:${event.location}
RRULE:FREQ=WEEKLY
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
    const link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.download = "bitcoin-development-call.ics"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const getTimeUntilCall = (weeklyCall: WeeklyData["weeklyCall"]) => {
    const nextCall = getNextCallDate(weeklyCall)
    const now = new Date()
    const diff = nextCall.getTime() - now.getTime()

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    const pad = (n: number) => Math.abs(n).toString().padStart(2, "0")

    return (
        <span className="font-mono text-xs">
            {days > 0 && <span className="text-orange-400">{pad(days)}d </span>}
            <span className="text-gray-300">{pad(hours)}</span>
            <span className="text-gray-500">:</span>
            <span className="text-gray-300">{pad(minutes)}</span>
            <span className="text-gray-500">:</span>
            <span className="text-gray-300">{pad(seconds)}</span>
        </span>
    )
}

const WeeklyCallSection = ({ weekData }: { weekData: WeeklyData }) => {
    const { weeklyCall } = weekData
    const callActive = isCallActive(weeklyCall)
    const [timeUntil, setTimeUntil] = useState(getTimeUntilCall(weeklyCall))

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeUntil(getTimeUntilCall(weeklyCall))
        }, 1000)
        return () => clearInterval(timer)
    }, [weeklyCall])

    return (
        <div className="flex flex-col gap-3 bg-white/80 dark:bg-gray-800/40 rounded-xl p-4 border border-gray-200 dark:border-gray-700/50">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#5865F2]/10 flex items-center justify-center">
                    <FaDiscord className="w-4 h-4 text-[#5865F2]" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Weekly Call
                        </p>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 hidden md:block">
                        Every Friday • 8:00 AM (Bali)
                    </p>
                </div>
            </div>

            <div className="md:hidden text-xs text-gray-600 dark:text-gray-400">
                {timeUntil}
            </div>

            <span className="hidden md:inline-flex items-center px-2.5 py-1 text-xs w-fit">
                {callActive ? (
                    <span className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                        Live Now
                    </span>
                ) : (
                    <span className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        Next call in {timeUntil}
                    </span>
                )}
            </span>

            <div className="flex flex-col gap-2">
                <button
                    onClick={() =>
                        window.open(weeklyCall.discordLink, "_blank")
                    }
                    disabled={!callActive}
                    className={`
                        w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm
                        ${
                            callActive
                                ? "bg-[#5865F2] hover:bg-[#4752C4] text-white"
                                : "bg-[#5865F2]/10 text-[#5865F2] cursor-not-allowed opacity-75"
                        }
                        transition-colors duration-200
                    `}
                >
                    Join Call
                </button>
                <button
                    onClick={() => createCalendarEvent(weeklyCall)}
                    className="hidden md:flex w-full items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm
                        bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 
                        text-gray-900 dark:text-white transition-colors duration-200"
                >
                    <HiCalendar className="w-4 h-4" />
                    Add to Calendar
                </button>
            </div>
        </div>
    )
}

const Progress = ({ community }: { community: Community }) => {
    const progress = calculateCohortProgress(community)
    const currentWeek = getCurrentWeek(community)
    const totalWeeks = community.weeklyData.length

    return (
        <div className="flex flex-col gap-4 bg-white/80 dark:bg-gray-800/40 rounded-xl p-4 border border-gray-200 dark:border-gray-700/50">
            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Cohort Timeline
                    </span>
                    <span className="text-sm font-medium text-orange-500 dark:text-orange-400">
                        {progress}%
                    </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                    Week {currentWeek} of {totalWeeks}
                </span>
                <span className="px-2 py-1 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400">
                    {totalWeeks - currentWeek + 1} weeks remaining
                </span>
            </div>
        </div>
    )
}

type Question = {
    id: string
    text: string
    relatedMaterial?: string
    assignments: Array<{
        studentName: string
        groupId: number
    }>
}

const collectQuestions = (weekData: WeeklyData): Question[] => {
    if (!weekData || !weekData.questions) return []

    const questionMap = new Map<string, Question>()

    weekData.questions.forEach((question) => {
        const key = question.text
        if (!questionMap.has(key)) {
            questionMap.set(key, {
                id: question.id,
                text: question.text,
                relatedMaterial: question.relatedMaterial,
                assignments: []
            })
        }
        questionMap.get(key)?.assignments.push(question.assignedTo)
    })

    return Array.from(questionMap.values())
}

const QuestionsSection = ({
    questions,
    weekNumber
}: {
    questions: Question[]
    weekNumber: number
}) => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Week {weekNumber} Discussion Topics
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Topics we'll cover in our weekly call
                </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg">
                <HiDocument className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {questions.length} topics
                </span>
            </div>
        </div>
        <div className="space-y-4">
            {questions.map((question, index) => (
                <div
                    key={question.id}
                    className="group relative p-4 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 dark:bg-gray-800/20 dark:hover:bg-gray-800/30 transition-all duration-200"
                >
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {(index + 1).toString().padStart(2, "0")}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-gray-900 dark:text-gray-200 leading-relaxed">
                                {question.text}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        {questions.length === 0 && (
            <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100/50 dark:bg-gray-800/50 flex items-center justify-center">
                    <HiDocument className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                </div>
                <h3 className="text-gray-700 dark:text-gray-400 font-medium">
                    No discussion topics yet
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-500 mt-1">
                    Topics for this week will be added soon
                </p>
            </div>
        )}
    </div>
)

const useCompletedTopics = () => {
    const [completedTopics, setCompletedTopics] = useState<
        Record<string, boolean>
    >({})

    useEffect(() => {
        const loadCompletedTopics = () => {
            const saved = localStorage.getItem("completedTopics")
            if (saved) {
                setCompletedTopics(JSON.parse(saved))
            }
        }

        loadCompletedTopics()

        window.addEventListener("topicCompletionChanged", loadCompletedTopics)

        return () => {
            window.removeEventListener(
                "topicCompletionChanged",
                loadCompletedTopics
            )
        }
    }, [])

    return completedTopics
}

const calculateResourceProgress = (
    resources: WeeklyData["resources"],
    completedTopics: Record<string, boolean>
) => {
    if (!resources.length) return 0
    const completed = resources.filter(
        (resource) => completedTopics[resource.link]
    ).length
    return Math.round((completed / resources.length) * 100)
}

const COLORS = {
    primary: {
        bg: "bg-orange-500",
        text: "text-orange-500",
        hover: "hover:bg-orange-600",
        bgLight: "bg-orange-500/10"
    },
    secondary: {
        bg: "bg-gray-700",
        text: "text-gray-300",
        hover: "hover:bg-gray-600"
    },
    muted: {
        bg: "bg-gray-800/40",
        text: "text-gray-400"
    }
}

const LearningResourcesSection = ({
    resources,
    weekNumber,
    totalWeeks,
    currentWeekData,
    currentWeek
}: {
    resources: WeeklyData["resources"]
    weekNumber: number
    totalWeeks: number
    currentWeekData: WeeklyData
    currentWeek: number
}) => {
    const completedTopics = useCompletedTopics()
    const progress = calculateResourceProgress(resources, completedTopics)

    const totalStats = resources.reduce(
        (acc, resource) => {
            const topicContent = getTopicContent(resource.link)
            if (!topicContent) return acc

            acc.total++
            if (completedTopics[resource.link]) {
                acc.completed++
            }
            return acc
        },
        { total: 0, completed: 0 }
    )

    const { lessons, exercises, projects } = resources.reduce(
        (
            acc: {
                lessons: any[]
                exercises: any[]
                projects: any[]
            },
            resource
        ) => {
            const topicContent = getTopicContent(resource.link)
            if (!topicContent) return acc

            const type = topicContent.topicType
            const isCompleted = completedTopics[resource.link] || false

            acc[`${type}s` as "lessons" | "exercises" | "projects"].push({
                ...resource,
                isCompleted,
                content: topicContent
            })
            return acc
        },
        { lessons: [], exercises: [], projects: [] }
    )

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-orange-500/20 to-transparent p-8 rounded-2xl border border-orange-500/20">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span
                                className={`text-sm ${COLORS.primary.text} font-medium`}
                            >
                                Week {weekNumber} of {totalWeeks}
                            </span>
                            {weekNumber === currentWeek && (
                                <span
                                    className={`px-2 py-0.5 text-xs rounded-full ${COLORS.primary.bgLight} ${COLORS.primary.text}`}
                                >
                                    Current Week
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {currentWeekData.topic}
                        </h1>
                    </div>

                    {/* Progress Circle */}
                    <div className="text-center">
                        <div className="relative w-[120px] h-[120px] flex items-center justify-center">
                            <CircularProgress
                                progress={
                                    Math.round(
                                        (totalStats.completed /
                                            totalStats.total) *
                                            100
                                    ) || 0
                                }
                                primaryColor="rgb(249, 115, 22)"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex flex-col items-center">
                                    <span className="text-3xl font-bold text-orange-400">
                                        {progress}%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <span className="block mt-2 text-sm text-gray-400">
                            Week Progress
                        </span>
                    </div>
                </div>

                {/* Progress Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800/40 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-orange-500/10">
                                <FaBook className="w-4 h-4 text-orange-500" />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                Lessons
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-orange-500">
                                {lessons.filter((l) => l.isCompleted).length}/
                                {lessons.length}
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-orange-500 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${Math.round((lessons.filter((l) => l.isCompleted).length / lessons.length) * 100) || 0}%`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800/40 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-purple-500/10">
                                <FaPuzzlePiece className="w-4 h-4 text-purple-500" />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                Exercises
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-purple-500">
                                {exercises.filter((e) => e.isCompleted).length}/
                                {exercises.length}
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-purple-500 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${Math.round((exercises.filter((e) => e.isCompleted).length / exercises.length) * 100) || 0}%`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800/40 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                                <FaTools className="w-4 h-4 text-blue-500" />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                Projects
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-blue-500">
                                {projects.filter((p) => p.isCompleted).length}/
                                {projects.length}
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${Math.round((projects.filter((p) => p.isCompleted).length / projects.length) * 100) || 0}%`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Learning Content */}
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 space-y-6">
                    {[
                        { items: lessons, label: "Core Lessons", icon: FaBook },
                        {
                            items: exercises,
                            label: "Practical Exercises",
                            icon: FaPuzzlePiece,
                            buttonText: "Start Exercise",
                            buttonIcon: HiPlay
                        },
                        { items: projects, label: "Projects", icon: FaTools }
                    ].map(
                        (section) =>
                            section.items.length > 0 && (
                                <div
                                    key={section.label}
                                    className="bg-white dark:bg-gray-800/40 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800"
                                >
                                    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <section.icon
                                                    className={
                                                        COLORS.primary.text
                                                    }
                                                />
                                                <h3 className="font-medium text-gray-900 dark:text-white">
                                                    {section.label}
                                                </h3>
                                            </div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {
                                                    section.items.filter(
                                                        (r) => r.isCompleted
                                                    ).length
                                                }{" "}
                                                of {section.items.length}{" "}
                                                completed
                                            </span>
                                        </div>
                                    </div>

                                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {section.items.map(
                                            (resource, index) => (
                                                <Link
                                                    key={resource.id}
                                                    href={`/decoding/${resource.link}`}
                                                    className={`
                                                    block p-4 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors duration-200
                                                    ${!resource.isCompleted && index === 0 ? "bg-gray-50 dark:bg-gray-800/20" : ""}
                                                `}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="shrink-0">
                                                            {resource.isCompleted ? (
                                                                <div
                                                                    className={`w-8 h-8 rounded-lg ${COLORS.primary.bgLight} flex items-center justify-center`}
                                                                >
                                                                    <FaCheckCircle
                                                                        className={
                                                                            COLORS
                                                                                .primary
                                                                                .text
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                                                {resource.title}
                                                            </h4>
                                                        </div>

                                                        {/* Exercise button with orange color scheme */}
                                                        {section.buttonText &&
                                                            !resource.isCompleted && (
                                                                <span
                                                                    className="flex items-center gap-1.5 px-3 py-1.5 
                                                                border border-orange-500/50 hover:border-orange-500
                                                                text-orange-500 hover:text-orange-400
                                                                text-sm rounded-md bg-transparent
                                                                transition-all duration-200"
                                                                >
                                                                    Solve
                                                                    Challenge
                                                                </span>
                                                            )}

                                                        <HiArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                    </div>
                                                </Link>
                                            )
                                        )}
                                    </div>
                                </div>
                            )
                    )}
                </div>
            </div>
        </div>
    )
}

const DashboardTabs = ({
    activeTab,
    setActiveTab,
    currentWeekData,
    resources,
    weekNumber,
    totalWeeks,
    currentWeek,
    communityData
}: {
    activeTab: string
    setActiveTab: (tab: string) => void
    currentWeekData: WeeklyData
    resources: WeeklyData["resources"]
    weekNumber: number
    totalWeeks: number
    currentWeek: number
    communityData: Community
}) => {
    const totalMinutes = resources.reduce((acc, resource) => {
        const content = getTopicContent(resource.link)
        return acc + (content?.readingTime || 0)
    }, 0)

    const tabs = [
        {
            id: "Learning Path",
            icon: <FaBook className="w-4 h-4" />
        },
        {
            id: "Discussions",
            icon: <HiDocument className="w-4 h-4" />
        },
        {
            id: "Groups",
            icon: <HiUserCircle className="w-4 h-4" />
        },
        {
            id: "Resources",
            icon: <HiDownload className="w-4 h-4" />
        }
    ]

    return (
        <div className="space-y-6">
            {/* Enhanced Tab Navigation with Stats */}
            <div className="bg-white dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <HiClock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Est. Time: {Math.ceil(totalMinutes / 60)}h{" "}
                                    {totalMinutes % 60}m
                                </span>
                            </div>
                            <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
                            <div className="flex items-center gap-2">
                                <FaCheckCircle className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                {/* Additional stats can be added here */}
                            </div>
                        </div>
                        {weekNumber === currentWeek && (
                            <span className="px-2 py-1 text-xs rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400">
                                Current Week
                            </span>
                        )}
                    </div>
                </div>

                {/* Make tabs scrollable on mobile */}
                <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex min-w-full">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex-1 flex items-center justify-center gap-2 
                                    px-4 py-3 whitespace-nowrap
                                    text-sm font-medium transition-all duration-200 relative
                                    ${
                                        activeTab === tab.id
                                            ? "text-orange-500 dark:text-orange-400"
                                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                                    }
                                `}
                            >
                                {tab.icon}
                                <span>{tab.id}</span>
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 dark:bg-orange-400"
                                        initial={false}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab Content with Animations */}
            <motion.div
                className="min-h-[600px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {activeTab === "Learning Path" && (
                    <LearningResourcesSection
                        resources={resources}
                        weekNumber={weekNumber}
                        totalWeeks={totalWeeks}
                        currentWeekData={currentWeekData}
                        currentWeek={currentWeek}
                    />
                )}

                {activeTab === "Discussions" && (
                    <div className="bg-white dark:bg-gray-800/40 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                        <QuestionsSection
                            questions={collectQuestions(currentWeekData)}
                            weekNumber={weekNumber}
                        />
                    </div>
                )}

                {activeTab === "Groups" && (
                    <div className="bg-white dark:bg-gray-800/40 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                        <GroupsSection
                            weekData={currentWeekData}
                            weekNumber={weekNumber}
                            currentWeek={currentWeek}
                            communityData={communityData}
                        />
                    </div>
                )}

                {activeTab === "Resources" && (
                    <div className="bg-white dark:bg-gray-800/40 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                        <AdditionalResources weekData={currentWeekData} />
                    </div>
                )}
            </motion.div>
        </div>
    )
}

const GroupsSection = ({
    weekData,
    weekNumber,
    currentWeek,
    communityData
}: {
    weekData: WeeklyData
    weekNumber: number
    currentWeek: number
    communityData: Community
}) => {
    const { questions } = weekData

    return (
        <div className="space-y-8">
            {/* Groups Overview */}
            {weekData.groupAssignments.map((group) => {
                const groupQuestions = questions?.filter(
                    (q) => q.assignedTo.groupId === group.groupId
                )
                const groupData = communityData.currentCohort.groups.find(
                    (g) => g.id === group.groupId
                )

                return (
                    <div
                        key={group.groupId}
                        className="bg-white dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                    >
                        {/* Group Header */}
                        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Group {group.groupId}
                                </h3>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                    <HiUserCircle className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {groupData?.students.length} members
                                    </span>
                                </div>
                            </div>

                            {/* Group Leaders */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Chaperon */}
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                                    <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                        <HiUserCircle className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">
                                            Chaperon
                                        </div>
                                        <div className="text-sm text-gray-900 dark:text-white">
                                            {groupData?.chaperon.name}
                                        </div>
                                    </div>
                                </div>

                                {/* Weekly Deputy */}
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                                    <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                                        <FaDiscord className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">
                                            Week {weekNumber} Deputy
                                        </div>
                                        <div className="text-sm text-gray-900 dark:text-white">
                                            {group.deputyName}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Assigned Questions */}
                        <div className="p-4">
                            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                                Discussion Topics
                            </h4>
                            <div className="space-y-4">
                                {groupQuestions?.map((question, index) => (
                                    <div
                                        key={question.id}
                                        className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/20"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
                                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-gray-900 dark:text-white text-sm leading-relaxed mb-2">
                                                {question.text}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <HiUserCircle className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    Assigned to:{" "}
                                                    {
                                                        question.assignedTo
                                                            .studentName
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            })}

            {/* Empty State */}
            {weekData.groupAssignments.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <HiUserCircle className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-gray-600 dark:text-gray-400 font-medium">
                        No groups assigned yet
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Group assignments for this week will be added soon
                    </p>
                </div>
            )}
        </div>
    )
}

const ResourceCard = ({ resource }: { resource: Resource }) => {
    const typeConfig = {
        documentation: {
            icon: HiDocument,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10"
        },
        video: {
            icon: HiPlay,
            color: "text-red-500",
            bgColor: "bg-red-500/10"
        },
        exercise: {
            icon: FaPuzzlePiece,
            color: "text-purple-500",
            bgColor: "bg-purple-500/10"
        },
        article: {
            icon: HiDocument,
            color: "text-green-500",
            bgColor: "bg-green-500/10"
        },
        tool: {
            icon: FaTools,
            color: "text-orange-500",
            bgColor: "bg-orange-500/10"
        },
        github: {
            icon: FaGithub,
            color: "text-gray-500",
            bgColor: "bg-gray-500/10"
        }
    }

    const config = typeConfig[resource.type]
    const Icon = config.icon

    return (
        <div className="group bg-white dark:bg-gray-800/40 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-all duration-200">
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${config.bgColor}`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        {resource.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {resource.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        {resource.duration && (
                            <span className="flex items-center gap-1">
                                <HiClock className="w-4 h-4" />
                                {resource.duration} min read
                            </span>
                        )}
                        <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-orange-500 hover:text-orange-400"
                        >
                            View Resource
                            <HiArrowUpRight className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AdditionalResources = ({ weekData }: { weekData: WeeklyData }) => {
    const [selectedType, setSelectedType] = useState<ResourceType | "all">(
        "all"
    )

    const resourceTypes = [
        { value: "all", label: "All" },
        { value: "documentation", label: "Docs" },
        { value: "video", label: "Videos" },
        { value: "exercise", label: "Exercises" },
        { value: "article", label: "Articles" },
        { value: "tool", label: "Tools" }
    ]

    const filteredResources = weekData.additionalResources.filter(
        (resource) => selectedType === "all" || resource.type === selectedType
    )

    return (
        <div className="space-y-6">
            {/* Simple Filter Tabs */}
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800">
                {resourceTypes.map((type) => (
                    <button
                        key={type.value}
                        onClick={() =>
                            setSelectedType(type.value as ResourceType | "all")
                        }
                        className={`
                            px-4 py-2 text-sm font-medium relative
                            ${
                                selectedType === type.value
                                    ? "text-orange-500 dark:text-orange-400"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                            }
                        `}
                    >
                        {type.label}
                        {selectedType === type.value && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 dark:bg-orange-400" />
                        )}
                    </button>
                ))}
            </div>

            {/* Resources Grid */}
            <div className="grid gap-4">
                {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>

            {/* Simple Empty State */}
            {filteredResources.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">
                        No {selectedType === "all" ? "resources" : selectedType}{" "}
                        available for this week.
                    </p>
                </div>
            )}
        </div>
    )
}

export default function CommunityDashboard({
    params
}: {
    params: { communityId: string }
}) {
    const [communityData, setCommunityData] = useState<Community | null>(null)
    const [selectedWeek, setSelectedWeek] = useState(1)
    const [currentWeekData, setCurrentWeekData] = useState<WeeklyData | null>(
        null
    )
    const [activeTab, setActiveTab] = useState("Learning Path")

    const isCompleted = communityData ? isCohortCompleted(communityData) : false

    useEffect(() => {
        const community = getCommunity(params.communityId)
        if (community) {
            setCommunityData(community)
            setSelectedWeek(getCurrentWeek(community))
        }
    }, [params.communityId])

    useEffect(() => {
        if (communityData) {
            const weekData = getWeeklyData(communityData, selectedWeek)
            setCurrentWeekData(weekData || null)
        }
    }, [selectedWeek, communityData])

    if (!communityData || !currentWeekData) {
        return <div>Loading...</div>
    }

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
                            href="/decoding"
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                            <HiArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500 rotate-180" />
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
                                            ${week > getCurrentWeek(communityData) ? "opacity-50 cursor-not-allowed" : ""}
                                        `}
                                        disabled={
                                            week > getCurrentWeek(communityData)
                                        }
                                    >
                                        {week}
                                    </button>
                                ))}
                            </div>
                            {selectedWeek === getCurrentWeek(communityData) && (
                                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 whitespace-nowrap">
                                    Current
                                </span>
                            )}
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
                                            const isLocked =
                                                week >
                                                getCurrentWeek(communityData)
                                            const isPast =
                                                week <
                                                getCurrentWeek(communityData)
                                            const isCurrent =
                                                week ===
                                                getCurrentWeek(communityData)
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
                            currentWeek={getCurrentWeek(communityData)}
                            communityData={communityData}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
