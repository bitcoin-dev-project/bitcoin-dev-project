export interface ExplainerSlide {
    id: string
    title: string
    description?: string
    imageUrl: string
    altText: string
}

export interface ExplainerTopic {
    id: string
    title: string
    description: string
    category: string
    difficulty: "Beginner" | "Intermediate" | "Advanced"
    slideCount: number
    thumbnail?: string // Optional: if different from first slide
    tags: string[]
    slides: ExplainerSlide[]
    lastUpdated: string
    author?: string
}

// Import explainer topics data from JSON file in decoding-bitcoin submodule
import explainersDataJson from "../public/decoding-bitcoin/static/explainers/explainers-data.json"

// Cast the imported JSON to the proper TypeScript type
export const explainerTopics: ExplainerTopic[] =
    explainersDataJson as ExplainerTopic[]

// Lightweight shape used by the grid/cards — excludes the heavy `slides`
// arrays so the listing page doesn't ship every slide to the client.
export interface ExplainerCard {
    id: string
    title: string
    description: string
    category: string
    difficulty: "Beginner" | "Intermediate" | "Advanced"
    slideCount: number
    tags: string[]
    thumbnailUrl: string | null
}

export const getExplainerCards = (): ExplainerCard[] => {
    return explainerTopics.map((topic) => ({
        id: topic.id,
        title: topic.title,
        description: topic.description,
        category: topic.category,
        difficulty: topic.difficulty,
        slideCount: topic.slideCount,
        tags: topic.tags,
        thumbnailUrl: topic.thumbnail ?? topic.slides?.[0]?.imageUrl ?? null
    }))
}

// Utility functions
export const getExplainerById = (id: string): ExplainerTopic | undefined => {
    return explainerTopics.find((topic) => topic.id === id)
}

export const getExplainersByCategory = (category: string): ExplainerTopic[] => {
    return explainerTopics.filter((topic) => topic.category === category)
}

export const getExplainersByDifficulty = (
    difficulty: string
): ExplainerTopic[] => {
    return explainerTopics.filter((topic) => topic.difficulty === difficulty)
}

export const searchExplainers = (searchTerm: string): ExplainerTopic[] => {
    const term = searchTerm.toLowerCase()
    return explainerTopics.filter(
        (topic) =>
            topic.title.toLowerCase().includes(term) ||
            topic.description.toLowerCase().includes(term) ||
            topic.tags.some((tag) => tag.toLowerCase().includes(term))
    )
}

export const getAllCategories = (): string[] => {
    return Array.from(new Set(explainerTopics.map((topic) => topic.category)))
}

export const getAllDifficulties = (): string[] => {
    return ["All", "Beginner", "Intermediate", "Advanced"]
}
