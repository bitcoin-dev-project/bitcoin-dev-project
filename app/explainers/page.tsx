"use client"

import { useState, useMemo } from "react"
import { Search, ArrowRight, Layers } from "lucide-react"
import Image from "next/image"
import SlideViewer from "@/components/explainers/SlideViewer"
import { explainerTopics, getAllCategories } from "@/content/explainers"

const categories = ["All", ...getAllCategories()]

export default function ExplainersPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedTopic, setSelectedTopic] = useState<any>(null)
    const [isSlideViewerOpen, setIsSlideViewerOpen] = useState(false)

    const filteredTopics = useMemo(() => {
        return explainerTopics.filter((topic) => {
            const matchesSearch =
                topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                topic.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                topic.tags.some((tag) =>
                    tag.toLowerCase().includes(searchTerm.toLowerCase())
                )

            const matchesCategory =
                selectedCategory === "All" ||
                topic.category === selectedCategory

            return matchesSearch && matchesCategory
        })
    }, [searchTerm, selectedCategory])

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner":
                return "bg-amber-100 text-amber-800 dark:bg-amber-400/10 dark:text-amber-300"
            case "Intermediate":
                return "bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300"
            case "Advanced":
                return "bg-orange-200 text-orange-900 dark:bg-orange-700/25 dark:text-orange-400"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
        }
    }

    const openSlideViewer = (topic: any) => {
        setSelectedTopic(topic)
        setIsSlideViewerOpen(true)
    }

    const closeSlideViewer = () => {
        setIsSlideViewerOpen(false)
        setSelectedTopic(null)
    }

    return (
        <div className="min-h-screen bg-vscode-background-light dark:bg-vscode-background-dark">
            {/* Hero */}
            <div className="bg-white dark:bg-gradient-to-b dark:from-black dark:to-vscode-background-dark">
                <div className="max-w-3xl mx-auto px-6 pt-12 pb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        Bitcoin Explainers
                    </h1>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                        Visual guides and interactive explanations to help you
                        understand Bitcoin concepts.
                    </p>

                    {/* Search */}
                    <div className="relative mt-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search explainers..."
                            aria-label="Search explainers"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-[#f1760d] focus:border-transparent transition-all"
                        />
                    </div>
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
                    {filteredTopics.map((topic) => (
                        <button
                            key={topic.id}
                            type="button"
                            onClick={() => openSlideViewer(topic)}
                            aria-label={`View ${topic.title} — ${topic.slideCount} slides`}
                            className="group text-left w-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-[#f1760d]/40 hover:shadow-lg hover:shadow-[#f1760d]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f1760d] focus-visible:ring-offset-2 focus-visible:ring-offset-vscode-background-dark transition-all duration-300 cursor-pointer"
                        >
                            {/* Thumbnail */}
                            <div className="relative h-48 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 overflow-hidden">
                                {topic.slides && topic.slides.length > 0 ? (
                                    <>
                                        <Image
                                            src={topic.slides[0].imageUrl}
                                            alt={topic.slides[0].altText}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                                <div className="absolute top-4 right-4">
                                    <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300">
                                        {topic.slideCount} slides
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1.5 group-hover:text-[#f1760d] dark:group-hover:text-[#f1760d] transition-colors">
                                    {topic.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                                    {topic.description}
                                </p>

                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                        {topic.category}
                                    </span>
                                    <span className="text-gray-300 dark:text-gray-600">
                                        ·
                                    </span>
                                    <span
                                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${getDifficultyColor(topic.difficulty)}`}
                                    >
                                        {topic.difficulty}
                                    </span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {filteredTopics.length === 0 && (
                    <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                        No explainers match your search.
                    </div>
                )}
            </div>

            {/* Slide Viewer */}
            {selectedTopic && selectedTopic.slides && (
                <SlideViewer
                    topic={selectedTopic}
                    isOpen={isSlideViewerOpen}
                    onClose={closeSlideViewer}
                />
            )}
        </div>
    )
}
