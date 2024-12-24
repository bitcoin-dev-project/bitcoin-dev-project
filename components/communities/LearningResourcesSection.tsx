import { WeeklyData } from "@/lib/utils/communities"
import { FaBook, FaPuzzlePiece, FaTools, FaCheckCircle } from "react-icons/fa"
import { HiPlay, HiArrowRight } from "react-icons/hi2"
import Link from "next/link"
import { allTopics } from "contentlayer/generated"
import { CircularProgress } from "./CircularProgress"
import { useCompletedTopics } from "@/lib/hooks/useCompletedTopics"

const getTopicContent = (slug: string) => {
    return allTopics.find((topic) => topic.slug === slug)
}

export const LearningResourcesSection = ({
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
            acc: { lessons: any[]; exercises: any[]; projects: any[] },
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
                            <span className="text-sm text-orange-500 font-medium">
                                Week {weekNumber} of {totalWeeks}
                            </span>
                            {weekNumber === currentWeek && (
                                <span className="px-2 py-0.5 text-xs rounded-full bg-orange-500/10 text-orange-500">
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
                    {[
                        {
                            type: "Lessons",
                            icon: FaBook,
                            color: "orange",
                            items: lessons
                        },
                        {
                            type: "Exercises",
                            icon: FaPuzzlePiece,
                            color: "purple",
                            items: exercises
                        },
                        {
                            type: "Projects",
                            icon: FaTools,
                            color: "blue",
                            items: projects
                        }
                    ].map((section) => (
                        <div
                            key={section.type}
                            className="bg-white dark:bg-gray-800/40 rounded-xl p-4 border border-gray-200 dark:border-gray-800"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className={`p-2 rounded-lg bg-${section.color}-500/10`}
                                >
                                    <section.icon
                                        className={`w-4 h-4 text-${section.color}-500`}
                                    />
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {section.type}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span
                                    className={`text-2xl font-bold text-${section.color}-500`}
                                >
                                    {
                                        section.items.filter(
                                            (i) => i.isCompleted
                                        ).length
                                    }
                                    /{section.items.length}
                                </span>
                                <div className="flex items-center gap-2">
                                    <div className="h-1.5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-${section.color}-500 rounded-full transition-all duration-300`}
                                            style={{
                                                width: `${
                                                    Math.round(
                                                        (section.items.filter(
                                                            (i) => i.isCompleted
                                                        ).length /
                                                            section.items
                                                                .length) *
                                                            100
                                                    ) || 0
                                                }%`
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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
                                <ResourceSection
                                    key={section.label}
                                    section={section}
                                    completedTopics={completedTopics}
                                />
                            )
                    )}
                </div>
            </div>
        </div>
    )
}

const ResourceSection = ({ section, completedTopics }: any) => (
    <div className="bg-white dark:bg-gray-800/40 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <section.icon className="text-orange-500" />
                    <h3 className="font-medium text-gray-900 dark:text-white">
                        {section.label}
                    </h3>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {section.items.filter((r: any) => r.isCompleted).length} of{" "}
                    {section.items.length} completed
                </span>
            </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {section.items.map((resource: any, index: number) => (
                <ResourceItem
                    key={resource.id}
                    resource={resource}
                    index={index}
                    buttonText={section.buttonText}
                />
            ))}
        </div>
    </div>
)

const ResourceItem = ({ resource, index, buttonText }: any) => (
    <Link
        href={`/decoding/${resource.link}`}
        className={`
            block p-4 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors duration-200
            ${!resource.isCompleted && index === 0 ? "bg-gray-50 dark:bg-gray-800/20" : ""}
        `}
    >
        <div className="flex items-center gap-4">
            <div className="shrink-0">
                {resource.isCompleted ? (
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <FaCheckCircle className="text-orange-500" />
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

            {buttonText && !resource.isCompleted && (
                <span
                    className="flex items-center gap-1.5 px-3 py-1.5 
                    border border-orange-500/50 hover:border-orange-500
                    text-orange-500 hover:text-orange-400
                    text-sm rounded-md bg-transparent
                    transition-all duration-200"
                >
                    Solve Challenge
                </span>
            )}

            <HiArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        </div>
    </Link>
)

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
