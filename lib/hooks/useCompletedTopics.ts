import { useState, useEffect } from "react"

export const useCompletedTopics = () => {
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
