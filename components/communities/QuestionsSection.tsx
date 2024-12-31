import { Question } from "@/lib/utils/communities"
import { HiDocument } from "react-icons/hi2"

export const QuestionsSection = ({
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
