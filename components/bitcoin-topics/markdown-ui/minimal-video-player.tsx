"use client"

import React, { useState, useRef, useCallback, useEffect } from "react"
import { Play, Pause } from "lucide-react"

interface MinimalVideoPlayerProps {
    src: string
    autoPlay?: boolean
}

const MinimalVideoPlayer = ({
    src,
    autoPlay = true
}: MinimalVideoPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(autoPlay)
    const [isHovering, setIsHovering] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const togglePlay = useCallback(() => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                void videoRef.current.play()
            } else {
                videoRef.current.pause()
            }
            setIsPlaying(!videoRef.current.paused)
        }
    }, [])

    useEffect(() => {
        setIsPlaying(autoPlay)
    }, [autoPlay])

    return (
        <div
            className="relative cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={togglePlay}
        >
            <video
                ref={videoRef}
                src={src}
                autoPlay={autoPlay}
                loop
                muted
                className={`w-full h-auto transition-opacity duration-300 rounded-md ${isPlaying ? "opacity-100" : "opacity-70"}`}
            />
            {(!isPlaying || isHovering) && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3">
                    {isPlaying ? (
                        <Pause className="w-8 h-8" />
                    ) : (
                        <Play className="w-8 h-8" />
                    )}
                </div>
            )}
        </div>
    )
}

export default MinimalVideoPlayer
