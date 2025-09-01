"use client"

import { useState, useEffect } from "react"
import {
    ChevronLeft,
    ChevronRight,
    X,
    Download,
    Share,
    ZoomIn,
    ZoomOut
} from "lucide-react"
import Image from "next/image"

interface Slide {
    id: string
    title: string
    description?: string
    imageUrl: string
    altText: string
}

interface SlideViewerProps {
    topic: {
        id: string
        title: string
        description: string
        slides: Slide[]
    }
    isOpen: boolean
    onClose: () => void
    initialSlideIndex?: number
}

export default function SlideViewer({
    topic,
    isOpen,
    onClose,
    initialSlideIndex = 0
}: SlideViewerProps) {
    const [currentSlideIndex, setCurrentSlideIndex] =
        useState(initialSlideIndex)
    const [isZoomed, setIsZoomed] = useState(false)

    useEffect(() => {
        setCurrentSlideIndex(initialSlideIndex)
    }, [initialSlideIndex])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return

            switch (e.key) {
                case "ArrowLeft":
                    goToPrevSlide()
                    break
                case "ArrowRight":
                    goToNextSlide()
                    break
                case "Escape":
                    onClose()
                    break
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, currentSlideIndex])

    const goToNextSlide = () => {
        if (currentSlideIndex < topic.slides.length - 1) {
            setCurrentSlideIndex(currentSlideIndex + 1)
        }
    }

    const goToPrevSlide = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(currentSlideIndex - 1)
        }
    }

    const goToSlide = (index: number) => {
        setCurrentSlideIndex(index)
    }

    const handleDownload = () => {
        const currentSlide = topic.slides[currentSlideIndex]
        const link = document.createElement("a")
        link.href = currentSlide.imageUrl
        link.download = `${topic.title}-slide-${currentSlideIndex + 1}.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${topic.title} - Slide ${currentSlideIndex + 1}`,
                    text: topic.description,
                    url: window.location.href
                })
            } catch (err) {
                console.log("Error sharing:", err)
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href)
        }
    }

    if (!isOpen) return null

    const currentSlide = topic.slides[currentSlideIndex]
    const progress = ((currentSlideIndex + 1) / topic.slides.length) * 100

    return (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6 z-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-white text-xl font-semibold mb-1">
                            {topic.title}
                        </h2>
                        <p className="text-gray-300 text-sm">
                            Slide {currentSlideIndex + 1} of{" "}
                            {topic.slides.length}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsZoomed(!isZoomed)}
                            className="p-2 text-white hover:text-gray-300 transition-colors"
                            title={isZoomed ? "Zoom out" : "Zoom in"}
                        >
                            {isZoomed ? (
                                <ZoomOut className="w-5 h-5" />
                            ) : (
                                <ZoomIn className="w-5 h-5" />
                            )}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="p-2 text-white hover:text-gray-300 transition-colors"
                            title="Download slide"
                        >
                            <Download className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleShare}
                            className="p-2 text-white hover:text-gray-300 transition-colors"
                            title="Share"
                        >
                            <Share className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 text-white hover:text-gray-300 transition-colors"
                            title="Close (Esc)"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                    <div className="w-full bg-white/20 rounded-full h-1">
                        <div
                            className="bg-[#f1760d] h-1 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center h-full pt-20 pb-24 px-6">
                {/* Previous Button */}
                <button
                    onClick={goToPrevSlide}
                    disabled={currentSlideIndex === 0}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 p-3 text-white bg-black/50 rounded-full hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all z-10"
                    title="Previous slide (←)"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Slide Image */}
                <div
                    className={`relative max-w-full max-h-full transition-transform duration-300 ${isZoomed ? "scale-150 cursor-move" : "cursor-default"}`}
                >
                    <Image
                        src={currentSlide.imageUrl}
                        alt={currentSlide.altText}
                        width={800}
                        height={600}
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        priority
                    />
                </div>

                {/* Next Button */}
                <button
                    onClick={goToNextSlide}
                    disabled={currentSlideIndex === topic.slides.length - 1}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 p-3 text-white bg-black/50 rounded-full hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all z-10"
                    title="Next slide (→)"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Footer with Slide Navigation */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                {/* Slide Thumbnails */}
                <div className="flex justify-center space-x-2 mb-4 overflow-x-auto max-w-full">
                    {topic.slides.map((slide, index) => (
                        <button
                            key={slide.id}
                            onClick={() => goToSlide(index)}
                            className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                                index === currentSlideIndex
                                    ? "border-[#f1760d] scale-110"
                                    : "border-white/30 hover:border-white/60"
                            }`}
                        >
                            <Image
                                src={slide.imageUrl}
                                alt={`Slide ${index + 1}`}
                                width={64}
                                height={48}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>

                {/* Slide Info */}
                {currentSlide.description && (
                    <div className="text-center">
                        <p className="text-white text-sm max-w-2xl mx-auto">
                            {currentSlide.description}
                        </p>
                    </div>
                )}

                {/* Touch Instructions */}
                <div className="text-center mt-4">
                    <p className="text-gray-400 text-xs">
                        Use arrow keys or click the navigation buttons to browse
                        slides
                    </p>
                </div>
            </div>

            {/* Touch/Swipe Overlay for Mobile */}
            <div
                className="absolute inset-0 md:hidden"
                onTouchStart={(e) => {
                    const touch = e.touches[0]
                    const startX = touch.clientX

                    const handleTouchEnd = (endEvent: TouchEvent) => {
                        const endTouch = endEvent.changedTouches[0]
                        const endX = endTouch.clientX
                        const diffX = startX - endX

                        if (Math.abs(diffX) > 50) {
                            // Minimum swipe distance
                            if (diffX > 0) {
                                goToNextSlide()
                            } else {
                                goToPrevSlide()
                            }
                        }

                        document.removeEventListener("touchend", handleTouchEnd)
                    }

                    document.addEventListener("touchend", handleTouchEnd)
                }}
            />
        </div>
    )
}
