import { WeeklyData, Community } from "@/lib/utils/communities"
import { HiUserCircle } from "react-icons/hi2"
import { FaDiscord } from "react-icons/fa"

export const GroupsSection = ({
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
