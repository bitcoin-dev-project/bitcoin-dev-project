import dynamic from "next/dynamic"
import * as m from "framer-motion/m"
import { LazyMotion, domAnimation } from "framer-motion"
import {
    collectQuestions,
    Community,
    WeeklyData
} from "@/lib/utils/communities"
import { FaBook } from "react-icons/fa"
import { HiDocument, HiUserCircle, HiDownload } from "react-icons/hi"

// lazy load components
const QuestionsSection = dynamic(() =>
    import("./QuestionsSection").then((m) => ({ default: m.QuestionsSection }))
)
const GroupsSection = dynamic(() =>
    import("./GroupsSection").then((m) => ({ default: m.GroupsSection }))
)
const AdditionalResources = dynamic(() =>
    import("./AdditionalResources").then((m) => ({
        default: m.AdditionalResources
    }))
)
const LearningResourcesSection = dynamic(() =>
    import("./LearningResourcesSection").then((m) => ({
        default: m.LearningResourcesSection
    }))
)

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
        <LazyMotion features={domAnimation}>
            <div className="space-y-8">
                {/* Enhanced Tab Navigation */}
                <div className="border-b-2 border-brand-gray-100 dark:border-gray-800">
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
                                    <m.div
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
                <m.div
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
                        <div className="bg-brand-card dark:bg-gray-800/40 rounded-2xl p-6 border border-brand-gray-100 dark:border-gray-800">
                            <QuestionsSection
                                questions={collectQuestions(currentWeekData)}
                                weekNumber={weekNumber}
                            />
                        </div>
                    )}

                    {activeTab === "Groups" && (
                        <div className="bg-brand-card dark:bg-gray-800/40 rounded-2xl p-6 border border-brand-gray-100 dark:border-gray-800">
                            <GroupsSection
                                weekData={currentWeekData}
                                weekNumber={weekNumber}
                                currentWeek={currentWeek}
                                communityData={communityData}
                            />
                        </div>
                    )}

                    {activeTab === "Resources" && (
                        <div className="bg-brand-card dark:bg-gray-800/40 rounded-2xl p-6 border border-brand-gray-100 dark:border-gray-800">
                            <AdditionalResources weekData={currentWeekData} />
                        </div>
                    )}
                </m.div>
            </div>
        </LazyMotion>
    )
}
