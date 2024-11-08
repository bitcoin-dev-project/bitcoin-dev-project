"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
    FaDiscord,
    FaCheckCircle,
    FaCircle,
    FaCalendar,
    FaGithub,
    FaSlack
} from "react-icons/fa"
import {
    HiDocument,
    HiArrowRight,
    HiDownload,
    HiClock,
    HiChevronLeft,
    HiChevronRight,
    HiUserCircle
} from "react-icons/hi"
import TopicBanner from "@/components/bitcoin-topics/layouts/TopicBanner"
import {
    Community,
    getCommunity,
    getCurrentWeek,
    getWeeklyData,
    WeeklyData,
    isCohortCompleted,
    calculateCohortProgress
} from "@/lib/data/communities"
import { formatDate } from "@/lib/utils/dates"
import { useRouter } from "next/navigation"
import { allTopics } from "contentlayer/generated"
import { HiCalendar } from "react-icons/hi2"

// Add a helper to get topic content
const getTopicContent = (slug: string) => {
    return allTopics.find((topic) => topic.slug === slug)
}

// Progress Component
const Progress = ({ community }: { community: Community }) => {
    const progress = calculateCohortProgress(community)

    return (
        <div className="w-48">
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-300">
                    Overall Progress
                </span>
                <span className="text-sm font-medium text-orange-500">
                    {progress}%
                </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                    className="bg-orange-500 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}

// Update the type for questions to include assignments
type Question = {
    id: string
    text: string
    relatedMaterial?: string
    assignments: Array<{
        studentName: string
        groupId: number
    }>
}

// Modify how we collect questions to handle weekly data and group by unique questions
const collectQuestions = (weekData: WeeklyData): Question[] => {
    if (!weekData || !weekData.questions) return []

    // Create a map to group assignments by question text
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

// Update the questions rendering section
const QuestionsSection = ({ questions }: { questions: Question[] }) => (
    <div className="space-y-3">
        {questions.map((question) => (
            <div
                key={question.id}
                className="group flex items-start gap-4 p-4 rounded-xl bg-gray-800/20 hover:bg-gray-800/30 transition-all duration-200"
            >
                {/* Question indicator dot */}
                <div className="mt-1.5 w-2 h-2 rounded-full bg-orange-500/50 ring-4 ring-orange-500/10" />

                <div className="flex-1 min-w-0">
                    <p className="text-gray-200 leading-relaxed">
                        {question.text}
                    </p>

                    {question.relatedMaterial && (
                        <Link
                            href={question.relatedMaterial}
                            className="inline-flex items-center mt-3 text-sm text-orange-400 hover:text-orange-300 group-hover:translate-x-0.5 transition-all duration-200"
                        >
                            <HiDocument className="w-4 h-4 mr-1.5" />
                            View Reference Material
                            <HiArrowRight className="w-4 h-4 ml-1.5 opacity-0 group-hover:opacity-100 transition-all" />
                        </Link>
                    )}
                </div>
            </div>
        ))}
    </div>
)

// Add a helper function to check completion status
const useCompletedTopics = () => {
    const [completedTopics, setCompletedTopics] = useState<
        Record<string, boolean>
    >({})

    useEffect(() => {
        // Load completed topics from localStorage
        const loadCompletedTopics = () => {
            const saved = localStorage.getItem("completedTopics")
            if (saved) {
                setCompletedTopics(JSON.parse(saved))
            }
        }

        loadCompletedTopics()

        // Listen for changes in completed topics
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

// Update the Resources section
const ResourcesList = ({
    resources
}: {
    resources: WeeklyData["resources"]
}) => {
    const completedTopics = useCompletedTopics()

    return (
        <div className="space-y-3">
            {resources.map((resource) => {
                const topicContent = getTopicContent(resource.link)
                if (!topicContent) return null

                // Check if this topic is completed
                const isCompleted = completedTopics[resource.link] || false

                return (
                    <Link
                        key={resource.id}
                        href={`/decoding/${resource.link}`}
                        className="block p-3 bg-gray-800/50 rounded-lg text-gray-300 hover:text-orange-400 hover:bg-gray-700/50"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                {isCompleted ? (
                                    <FaCheckCircle className="w-4 h-4 text-orange-400" />
                                ) : (
                                    <FaCircle className="w-4 h-4 text-gray-500" />
                                )}
                                <div>
                                    <span>{topicContent.title}</span>
                                    {resource.parentTopic && (
                                        <span className="text-sm text-gray-500 ml-2">
                                            (Exercise)
                                        </span>
                                    )}
                                </div>
                            </div>
                            <span className="text-sm text-gray-500">
                                {topicContent.category || "Course"}
                            </span>
                        </div>
                        {topicContent.summary && (
                            <p className="text-sm text-gray-400 mt-1 ml-7">
                                {topicContent.summary}
                            </p>
                        )}
                    </Link>
                )
            })}
        </div>
    )
}

// Update the Learning Resources section
const LearningResourcesSection = ({
    resources
}: {
    resources: WeeklyData["resources"]
}) => {
    const completedTopics = useCompletedTopics()

    if (!resources || resources.length === 0) return null

    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-white">
                        Learning Resources
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                        Complete these materials to progress in your learning
                        journey
                    </p>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-800/60 rounded-lg">
                    <HiDocument className="w-4 h-4 text-orange-400" />
                    <span className="text-sm text-gray-300">
                        {resources.length}{" "}
                        {resources.length === 1 ? "Resource" : "Resources"}
                    </span>
                </div>
            </div>

            {/* Resources Grid */}
            <div className="grid gap-5 sm:grid-cols-2">
                {resources.map((resource) => {
                    const topicContent = getTopicContent(resource.link)
                    if (!topicContent) return null

                    const isCompleted = completedTopics[resource.link] || false

                    return (
                        <Link
                            key={resource.id}
                            href={`/decoding/${resource.link}`}
                            className="group relative flex flex-col h-full"
                        >
                            <div
                                className={`
                                relative overflow-hidden rounded-xl border 
                                ${
                                    isCompleted
                                        ? "border-orange-500/20 bg-orange-500/5"
                                        : "border-gray-800 bg-gray-800/50"
                                } 
                                p-4 transition-all duration-200
                                hover:border-orange-500/30 hover:bg-gray-800/80
                            `}
                            >
                                {/* Content */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`
                                            flex-shrink-0 w-8 h-8 rounded-lg 
                                            ${isCompleted ? "bg-orange-500/20" : "bg-gray-700"} 
                                            flex items-center justify-center
                                        `}
                                        >
                                            {isCompleted ? (
                                                <FaCheckCircle className="w-4 h-4 text-orange-400" />
                                            ) : (
                                                <FaCircle className="w-4 h-4 text-gray-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-base text-white">
                                                {topicContent.title ||
                                                    resource.title}
                                            </h4>
                                        </div>
                                    </div>
                                    <div
                                        className={`
                                        px-2.5 py-1 rounded-full text-sm
                                        ${
                                            isCompleted
                                                ? "bg-orange-500/20 text-orange-400"
                                                : "bg-gray-700/50 text-gray-400"
                                        }
                                    `}
                                    >
                                        {isCompleted
                                            ? "Completed"
                                            : "In Progress"}
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-orange-400 group-hover:text-orange-300">
                                        Review Material
                                    </span>
                                    <HiArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
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
    const [showAllQuestions, setShowAllQuestions] = useState(false)

    // Add this line to calculate completion status
    const isCompleted = communityData ? isCohortCompleted(communityData) : false

    useEffect(() => {
        const community = getCommunity(params.communityId)
        if (community) {
            setCommunityData(community)
            // Set initial week to current week
            setSelectedWeek(getCurrentWeek(community))
        }
    }, [params.communityId])

    // Update week data when selected week changes
    useEffect(() => {
        if (communityData) {
            const weekData = getWeeklyData(communityData, selectedWeek)
            setCurrentWeekData(weekData || null)
        }
    }, [selectedWeek, communityData])

    if (!communityData || !currentWeekData) {
        return <div>Loading...</div>
    }

    const mockContent = {
        title: `${communityData.name} Dashboard`,
        slug: communityData.id,
        tags: [communityData.language, communityData.timezone],
        category: "Community"
    }

    // Mock event data for calendar
    const event = {
        text: "Weekly Bitcoin Development Call",
        dates: "20240120T150000Z/20240120T170000Z",
        details: "Join us for our weekly development discussion and Q&A session"
    }

    // Replace the previous questions collection with:
    const allQuestions = currentWeekData
        ? collectQuestions(currentWeekData)
        : []

    // Update week navigation
    const totalWeeks = communityData.weeklyData.length

    return (
        <TopicBanner content={mockContent}>
            <div className="max-w-7xl mx-auto py-8">
                {/* Completion Banner */}
                {isCompleted && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-8">
                        <div className="flex items-center space-x-3">
                            <FaCheckCircle className="w-6 h-6 text-green-500" />
                            <div>
                                <h3 className="text-lg font-medium text-green-500">
                                    Cohort Completed
                                </h3>
                                <p className="text-green-400/80">
                                    This cohort ended on{" "}
                                    {new Date(
                                        communityData?.currentCohort.endDate
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header Section */}
                <div className="bg-gray-900/40 dark:bg-gray-800/40 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 relative">
                                <Image
                                    src={communityData.logo}
                                    alt={communityData.name}
                                    fill
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">
                                    {communityData.name}
                                </h1>
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <span>{communityData.language}</span>
                                    <span>•</span>
                                    <span>{communityData.timezone}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Progress community={communityData} />
                            {isCompleted && (
                                <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">
                                    Completed
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Week Navigation */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() =>
                                setSelectedWeek((prev) => Math.max(1, prev - 1))
                            }
                            className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white disabled:opacity-50"
                            disabled={selectedWeek === 1}
                        >
                            <HiChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex-1 overflow-x-auto">
                            <div className="flex space-x-2">
                                {Array.from({ length: totalWeeks }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setSelectedWeek(i + 1)}
                                        className={`flex-shrink-0 px-4 py-2 rounded-lg ${
                                            selectedWeek === i + 1
                                                ? "bg-orange-500 text-white"
                                                : "bg-gray-800/50 text-gray-400"
                                        }`}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <span>Week {i + 1}</span>
                                            {getWeeklyData(communityData, i + 1)
                                                ?.completed && (
                                                <FaCheckCircle
                                                    className={`w-4 h-4 ${
                                                        selectedWeek === i + 1
                                                            ? "text-white"
                                                            : "text-orange-400"
                                                    }`}
                                                />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                setSelectedWeek((prev) =>
                                    Math.min(totalWeeks, prev + 1)
                                )
                            }
                            className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white disabled:opacity-50"
                            disabled={selectedWeek === totalWeeks}
                        >
                            <HiChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Current Module Info */}
                        <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50">
                            {/* Module Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl text-white">
                                        {currentWeekData.topic}
                                    </h2>
                                    <p className="text-gray-400 mt-1">
                                        Current Module
                                    </p>
                                </div>
                            </div>

                            {/* Learning Objectives */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-1 h-6 bg-orange-500 rounded-full" />
                                    <h3 className="text-lg text-white">
                                        Learning Objectives
                                    </h3>
                                </div>
                                <ul className="space-y-3 ml-4">
                                    {currentWeekData.objectives.map(
                                        (objective, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-3 text-gray-300"
                                            >
                                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-sm">
                                                    {index + 1}
                                                </span>
                                                {objective}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>

                            {/* Learning Resources Section */}
                            <LearningResourcesSection
                                resources={currentWeekData.resources}
                            />

                            {/* Questions Overview */}
                            <div className="mt-8 space-y-6">
                                {/* Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                            <HiDocument className="w-5 h-5 text-orange-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-white">
                                                Discussion Questions
                                            </h3>
                                            <p className="text-sm text-gray-400">
                                                Key topics to explore this week
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setShowAllQuestions(
                                                !showAllQuestions
                                            )
                                        }
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-200"
                                    >
                                        <span className="text-sm text-gray-300">
                                            {showAllQuestions ? "Hide" : "Show"}{" "}
                                            {allQuestions.length} Questions
                                        </span>
                                        <HiChevronRight
                                            className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${
                                                showAllQuestions
                                                    ? "rotate-90"
                                                    : ""
                                            }`}
                                        />
                                    </button>
                                </div>

                                {/* Questions List */}
                                {showAllQuestions && (
                                    <div className="animate-fadeIn">
                                        <QuestionsSection
                                            questions={allQuestions}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Groups Section */}
                        <div className="space-y-6">
                            {communityData.currentCohort.groups.map((group) => {
                                const weeklyAssignment =
                                    currentWeekData.groupAssignments.find(
                                        (assignment) =>
                                            assignment.groupId === group.id
                                    )
                                return (
                                    <div
                                        key={group.id}
                                        className="border border-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-gray-700/50 transition-colors"
                                    >
                                        {/* Group Header - Redesigned */}
                                        <div className="bg-gradient-to-r from-gray-800/50 via-gray-800/30 to-transparent p-6">
                                            <div className="flex items-center justify-between">
                                                {/* Deputy - Left Side */}
                                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/5 border border-orange-500/10">
                                                    <span className="text-orange-400 text-sm">
                                                        Deputy
                                                    </span>
                                                    <span className="text-white text-sm">
                                                        @
                                                        {
                                                            weeklyAssignment?.deputyName
                                                        }
                                                    </span>
                                                </div>

                                                {/* Group Info - Center */}
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-gray-800/60 flex items-center justify-center text-gray-300 text-xl font-medium">
                                                        {
                                                            group.name.split(
                                                                " "
                                                            )[1]
                                                        }
                                                    </div>
                                                    <div className="text-center">
                                                        <h3 className="text-xl text-white">
                                                            {group.name}
                                                        </h3>
                                                        <div className="text-sm text-gray-400 mt-1">
                                                            {
                                                                group.students
                                                                    .length
                                                            }{" "}
                                                            members
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Chaperon - Right Side */}
                                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/5 border border-purple-500/10">
                                                    <span className="text-purple-400 text-sm">
                                                        Chaperon
                                                    </span>
                                                    <span className="text-white text-sm">
                                                        @{group.chaperon.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Students and Questions */}
                                        <div className="divide-y divide-gray-800">
                                            {group.students.map((student) => {
                                                const studentQuestions =
                                                    currentWeekData.questions.filter(
                                                        (q) =>
                                                            q.assignedTo
                                                                .studentName ===
                                                            student.name
                                                    )
                                                return (
                                                    <div
                                                        key={student.name}
                                                        className="group py-6 px-8 hover:bg-gray-800/20 transition-all duration-200"
                                                    >
                                                        {/* Student Header - Simplified */}
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-4">
                                                                {/* Student Icon */}
                                                                <div className="w-9 h-9 rounded-lg border border-gray-700/50 bg-gray-800/30 flex items-center justify-center">
                                                                    <HiUserCircle className="w-5 h-5 text-gray-400" />
                                                                </div>

                                                                {/* Student Info */}
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-white font-medium">
                                                                        @
                                                                        {
                                                                            student.name
                                                                        }
                                                                    </span>
                                                                    <div className="h-4 w-[1px] bg-gray-700/50" />{" "}
                                                                    {/* Subtle divider */}
                                                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                                                        <HiDocument className="w-4 h-4" />
                                                                        <span>
                                                                            {
                                                                                studentQuestions.length
                                                                            }{" "}
                                                                            questions
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Questions Section - If student has questions */}
                                                        {studentQuestions.length >
                                                            0 && (
                                                            <div className="mt-6 pl-[52px]">
                                                                {" "}
                                                                {/* Aligned with student name */}
                                                                <div className="space-y-3">
                                                                    {studentQuestions.map(
                                                                        (
                                                                            question,
                                                                            index
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    question.id
                                                                                }
                                                                                className="group relative flex items-start gap-4 p-4 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all"
                                                                            >
                                                                                {/* Question Number */}
                                                                                <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-orange-500/10 text-orange-400 text-sm flex items-center justify-center">
                                                                                    {index +
                                                                                        1}
                                                                                </div>

                                                                                {/* Question Content */}
                                                                                <div className="flex-1 min-w-0">
                                                                                    <p className="text-gray-300">
                                                                                        {
                                                                                            question.text
                                                                                        }
                                                                                    </p>

                                                                                    {question.relatedMaterial && (
                                                                                        <Link
                                                                                            href={
                                                                                                question.relatedMaterial
                                                                                            }
                                                                                            className="inline-flex items-center mt-3 text-sm text-orange-400 hover:text-orange-300 group-hover:translate-x-0.5 transition-all"
                                                                                        >
                                                                                            <HiDocument className="w-4 h-4 mr-1.5" />
                                                                                            View
                                                                                            Related
                                                                                            Material
                                                                                            <HiArrowRight className="w-4 h-4 ml-1.5 opacity-0 group-hover:opacity-100 transition-all" />
                                                                                        </Link>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Sidebar - Enhanced version */}
                    <div className="space-y-6">
                        {/* Weekly Call Card - Refined */}
                        <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50">
                            <div className="relative">
                                {/* Discord Branding Accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#5865F2]/5 rounded-full blur-3xl -z-10" />

                                <div className="space-y-6">
                                    {/* Header */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#5865F2]/10 flex items-center justify-center">
                                            <FaDiscord className="w-5 h-5 text-[#5865F2]" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-medium text-white">
                                                Weekly Development Call
                                            </h2>
                                            <p className="text-sm text-gray-400">
                                                Join the discussion and Q&A
                                                session
                                            </p>
                                        </div>
                                    </div>

                                    {/* Call Details */}
                                    <div className="flex items-center gap-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <HiClock className="w-5 h-5 text-gray-400" />
                                            <span className="text-gray-300">
                                                {formatDate(
                                                    currentWeekData.weeklyCall
                                                        .date
                                                )}
                                            </span>
                                        </div>
                                        <div className="h-4 w-[1px] bg-gray-700" />
                                        <div className="text-gray-400">
                                            1 hour
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3">
                                        {/* Join Call Button */}
                                        <a
                                            href={
                                                currentWeekData.weeklyCall
                                                    .discordLink
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 bg-[#5865F2] text-white px-4 py-2.5 rounded-lg hover:bg-[#4752C4] transition-colors"
                                        >
                                            <FaDiscord className="w-5 h-5" />
                                            <span className="font-medium">
                                                Join Call
                                            </span>
                                        </a>

                                        {/* Add to Calendar Button */}
                                        <button
                                            onClick={() => {
                                                // Calendar implementation here
                                            }}
                                            className="group flex items-center justify-center p-2.5 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
                                            title="Add to Calendar"
                                        >
                                            <HiCalendar className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                        </button>
                                    </div>

                                    {/* Next Call Preview */}
                                    <div className="pt-4 border-t border-gray-800/50">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">
                                                Next call
                                            </span>
                                            <span className="text-gray-300">
                                                Jan 27, 2024 - 15:00 UTC
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TopicBanner>
    )
}
