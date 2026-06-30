"use server"

import { getExplainerById } from "@/content/explainers"

export interface LoadedTopic {
    id: string
    title: string
    description: string
    slides: {
        id: string
        title: string
        description?: string
        imageUrl: string
        altText: string
    }[]
}

// Loads the full slide payload for a single topic on demand, so the listing
// page never ships every deck's slides to the client. Invoked from the client
// as a Server Action (not an /api route, which is proxied externally).
export async function fetchSlides(id: string): Promise<LoadedTopic | null> {
    const topic = getExplainerById(id)
    if (!topic) return null
    return {
        id: topic.id,
        title: topic.title,
        description: topic.description,
        slides: topic.slides
    }
}
