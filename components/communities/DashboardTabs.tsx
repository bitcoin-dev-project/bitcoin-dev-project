import { motion } from "framer-motion"
import {
    collectQuestions,
    Community,
    WeeklyData
} from "@/lib/utils/communities"
import { QuestionsSection } from "./QuestionsSection"
import { GroupsSection } from "./GroupsSection"
import { AdditionalResources } from "./AdditionalResources"
import { FaBook } from "react-icons/fa"
import { HiDocument, HiUserCircle, HiDownload } from "react-icons/hi"
import { LearningResourcesSection } from "./LearningResourcesSection"

export const DashboardTabs = ({
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
        <div className="space-y-8">
            {/* Enhanced Tab Navigation */}
            <div className="border-b-2 border-gray-200 dark:border-gray-800">
                <div className="flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                flex items-center gap-2.5 px-6 py-4
                                text-sm font-semibold relative
                                ${
                                    activeTab === tab.id
                                        ? "text-orange-500 dark:text-orange-400"
                                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                                }
                                transition-colors duration-150
                            `}
                        >
                            {tab.icon}
                            <span className="tracking-wide">{tab.id}</span>
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 dark:bg-orange-400"
                                    style={{ height: "2px" }}
                                    initial={false}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
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
