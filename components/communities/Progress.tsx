import { Community } from "@/lib/utils/communities"
import {
    getCurrentWeek,
    calculateCohortProgress
} from "@/lib/utils/communities"

export const Progress = ({ community }: { community: Community }) => {
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
