import { useState } from "react"
import { WeeklyData, ResourceType } from "@/lib/utils/communities"
import { ResourceCard } from "./ResourceCard"

export const AdditionalResources = ({ weekData }: { weekData: WeeklyData }) => {
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
