"use client"

import { useState, useMemo } from "react"
import { Metadata } from "next"
import { Search, Filter, Eye, ChevronRight, Play } from "lucide-react"
import Image from "next/image"
import SlideViewer from "@/components/explainers/SlideViewer"
import {
    explainerTopics,
    getAllCategories,
    getAllDifficulties
} from "@/content/explainers"

const categories = getAllCategories()
const difficulties = getAllDifficulties()

export default function ExplainersPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedDifficulty, setSelectedDifficulty] = useState("All")
    const [showFilters, setShowFilters] = useState(false)
    const [selectedTopic, setSelectedTopic] = useState<any>(null)
    const [isSlideViewerOpen, setIsSlideViewerOpen] = useState(false)
    const [expandedTags, setExpandedTags] = useState<Set<string>>(new Set())

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
            const matchesDifficulty =
                selectedDifficulty === "All" ||
                topic.difficulty === selectedDifficulty

            return matchesSearch && matchesCategory && matchesDifficulty
        })
    }, [searchTerm, selectedCategory, selectedDifficulty])

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner":
                return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
            case "Intermediate":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
            case "Advanced":
                return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
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

    const toggleTagExpansion = (topicId: string, event: React.MouseEvent) => {
        event.stopPropagation() // Prevent card click
        setExpandedTags((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(topicId)) {
                newSet.delete(topicId)
            } else {
                newSet.add(topicId)
            }
            return newSet
        })
    }

    return (
        <div className="min-h-screen bg-vscode-background-light dark:bg-vscode-background-dark">
            {/* Header */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Bitcoin Explainers
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Visual guides and interactive explanations to help
                            you understand Bitcoin concepts through carefully
                            crafted slides and diagrams.
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search topics, concepts, or tags..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#f1760d] focus:border-transparent transition-all"
                            />
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Filter Bar */}
                        {showFilters && (
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Category
                                        </label>
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) =>
                                                setSelectedCategory(
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#f1760d] focus:border-transparent"
                                        >
                                            <option value="All">
                                                All Categories
                                            </option>
                                            {categories.map((category) => (
                                                <option
                                                    key={category}
                                                    value={category}
                                                >
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Difficulty
                                        </label>
                                        <select
                                            value={selectedDifficulty}
                                            onChange={(e) =>
                                                setSelectedDifficulty(
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#f1760d] focus:border-transparent"
                                        >
                                            {difficulties.map((difficulty) => (
                                                <option
                                                    key={difficulty}
                                                    value={difficulty}
                                                >
                                                    {difficulty}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Topics Grid */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Explore Topics ({filteredTopics.length})
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTopics.map((topic) => (
                        <div
                            key={topic.id}
                            onClick={() => openSlideViewer(topic)}
                            className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:shadow-[#f1760d]/10 transition-all duration-300 cursor-pointer"
                        >
                            {/* Thumbnail */}
                            <div className="relative h-48 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 overflow-hidden">
                                {topic.slides && topic.slides.length > 0 ? (
                                    <>
                                        <Image
                                            src={topic.slides[0].imageUrl}
                                            alt={topic.slides[0].altText}
                                            fill
                                            className="object-cover"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                                            <div className="w-16 h-16 bg-[#f1760d]/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                <Play className="w-8 h-8 text-white ml-1" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-[#f1760d]/20 rounded-full flex items-center justify-center">
                                            <Play className="w-8 h-8 text-[#f1760d] dark:text-[#f1760d]" />
                                        </div>
                                    </div>
                                )}
                                <div className="absolute top-4 right-4">
                                    <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300">
                                        {topic.slideCount} slides
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-[#f1760d] dark:group-hover:text-[#f1760d] transition-colors">
                                            {topic.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                            {topic.description}
                                        </p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#f1760d] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-2" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                            {topic.category}
                                        </span>
                                        <span
                                            className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(topic.difficulty)}`}
                                        >
                                            {topic.difficulty}
                                        </span>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1 mt-3">
                                    {(() => {
                                        const isExpanded = expandedTags.has(
                                            topic.id
                                        )
                                        const visibleTags = isExpanded
                                            ? topic.tags
                                            : topic.tags.slice(0, 3)

                                        return (
                                            <>
                                                {visibleTags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs text-[#f1760d] dark:text-[#f1760d] bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-md"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                                {topic.tags.length > 3 && (
                                                    <button
                                                        onClick={(e) =>
                                                            toggleTagExpansion(
                                                                topic.id,
                                                                e
                                                            )
                                                        }
                                                        className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#f1760d] dark:hover:text-[#f1760d] transition-colors cursor-pointer"
                                                    >
                                                        {isExpanded
                                                            ? "show less"
                                                            : `+${topic.tags.length - 3} more`}
                                                    </button>
                                                )}
                                            </>
                                        )
                                    })()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredTopics.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No topics found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Try adjusting your search terms or filters to find
                            what you're looking for.
                        </p>
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
