import { Resource } from "@/lib/utils/communities"
import { HiDocument, HiPlay, HiClock, HiArrowUpRight } from "react-icons/hi2"
import { FaPuzzlePiece, FaTools, FaGithub } from "react-icons/fa"

export const ResourceCard = ({ resource }: { resource: Resource }) => {
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
