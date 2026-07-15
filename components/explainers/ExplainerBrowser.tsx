"use client"

import { useState, useMemo } from "react"
import { Search, ArrowRight, Layers, Loader2 } from "lucide-react"
import Image from "next/image"
import SlideViewer from "@/components/explainers/SlideViewer"
import type { ExplainerCard } from "@/content/explainers"
import { fetchSlides, type LoadedTopic } from "@/app/explainers/actions"

export default function ExplainerBrowser({
    cards
}: {
    cards: ExplainerCard[]
}) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [viewerTopic, setViewerTopic] = useState<LoadedTopic | null>(null)
    const [isViewerOpen, setIsViewerOpen] = useState(false)
    const [loadingId, setLoadingId] = useState<string | null>(null)

    const categories = useMemo(
        () => ["All", ...Array.from(new Set(cards.map((c) => c.category)))],
        [cards]
    )

    const filteredCards = useMemo(() => {
        const term = searchTerm.toLowerCase()
        return cards.filter((card) => {
            const matchesSearch =
                card.title.toLowerCase().includes(term) ||
                card.description.toLowerCase().includes(term) ||
                card.tags.some((tag) => tag.toLowerCase().includes(term))
            const matchesCategory =
                selectedCategory === "All" || card.category === selectedCategory
            return matchesSearch && matchesCategory
        })
    }, [cards, searchTerm, selectedCategory])

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner":
                return "bg-amber-100 text-amber-800 dark:bg-amber-400/10 dark:text-amber-300"
            case "Intermediate":
                return "bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300"
            case "Advanced":
                return "bg-orange-200 text-orange-900 dark:bg-orange-700/25 dark:text-orange-400"
            default:
                return "bg-brand-gray text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
        }
    }

    const openTopic = async (card: ExplainerCard) => {
        if (loadingId) return
        setLoadingId(card.id)
        try {
            const data = await fetchSlides(card.id)
            if (!data) throw new Error("Failed to load slides")
            setViewerTopic(data)
            setIsViewerOpen(true)
        } catch (err) {
            console.error(err)
        } finally {
            setLoadingId(null)
        }
    }

    const closeViewer = () => {
        setIsViewerOpen(false)
        setViewerTopic(null)
    }

    return (
        <>
            {/* Search */}
            <div className="max-w-3xl mx-auto px-6 -mt-2">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search explainers..."
                        aria-label="Search explainers"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-brand-gray-100 dark:border-white/10 bg-brand-card dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-[#f1760d] focus:border-transparent transition-all"
                    />
                </div>
            </div>

            {/* Category filter — plain text, no chrome */}
            <div className="max-w-7xl mx-auto px-6 pt-8">
                <div className="flex gap-x-6 overflow-x-auto whitespace-nowrap pb-1 sm:flex-wrap sm:justify-center text-sm [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`shrink-0 transition-colors ${
                                selectedCategory === category
                                    ? "text-[#f1760d] font-semibold"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Topics Grid */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCards.map((card, index) => (
                        <button
                            key={card.id}
                            type="button"
                            onClick={() => openTopic(card)}
                            aria-label={`View ${card.title} — ${card.slideCount} slides`}
                            className="group text-left w-full bg-brand-card dark:bg-gray-800 rounded-xl border border-brand-gray-100 dark:border-gray-700 overflow-hidden hover:border-[#f1760d]/40 hover:shadow-lg hover:shadow-[#f1760d]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f1760d] focus-visible:ring-offset-2 focus-visible:ring-offset-vscode-background-dark transition-all duration-300 cursor-pointer"
                        >
                            {/* Thumbnail */}
                            <div className="relative h-48 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 overflow-hidden">
                                {card.thumbnailUrl ? (
                                    <>
                                        <Image
                                            src={card.thumbnailUrl}
                                            alt={card.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            priority={index < 3}
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        {/* Hover affordance — signals "open the deck", not a video */}
                                        <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white">
                                                View slides
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-[#f1760d]">
                                        <Layers className="w-8 h-8" />
                                    </div>
                                )}

                                {/* Loading overlay while slides are fetched */}
                                {loadingId === card.id && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                        <Loader2 className="w-7 h-7 text-white animate-spin" />
                                    </div>
                                )}

                                <div className="absolute top-4 right-4">
                                    <span className="bg-brand-card/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300">
                                        {card.slideCount} slides
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-[#f1760d] dark:group-hover:text-[#f1760d] transition-colors">
                                    {card.title}
                                </h3>

                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                        {card.category}
                                    </span>
                                    <span className="text-gray-300 dark:text-gray-600">
                                        ·
                                    </span>
                                    <span
                                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${getDifficultyColor(card.difficulty)}`}
                                    >
                                        {card.difficulty}
                                    </span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {filteredCards.length === 0 && (
                    <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                        No explainers match your search.
                    </div>
                )}
            </div>

            {/* Slide Viewer */}
            {viewerTopic && (
                <SlideViewer
                    topic={viewerTopic}
                    isOpen={isViewerOpen}
                    onClose={closeViewer}
                />
            )}
        </>
    )
}
