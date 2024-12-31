import { FaDiscord } from "react-icons/fa"
import { HiCalendar } from "react-icons/hi2"
import {
    createCalendarEvent,
    getTimeUntilCall,
    isCallActive,
    WeeklyData
} from "@/lib/utils/communities"
import { useState, useEffect } from "react"

export const WeeklyCallSection = ({ weekData }: { weekData: WeeklyData }) => {
    const { weeklyCall } = weekData
    const callActive = isCallActive(weeklyCall)
    const [timeUntil, setTimeUntil] = useState<ReturnType<
        typeof getTimeUntilCall
    > | null>(null)

    useEffect(() => {
        setTimeUntil(getTimeUntilCall(weeklyCall))

        const timer = setInterval(() => {
            setTimeUntil(getTimeUntilCall(weeklyCall))
        }, 1000)

        return () => clearInterval(timer)
    }, [weeklyCall])

    return (
        <div className="flex flex-col gap-3 bg-white/80 dark:bg-gray-800/40 rounded-xl p-4 border border-gray-200 dark:border-gray-700/50">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#5865F2]/10 flex items-center justify-center">
                    <FaDiscord className="w-4 h-4 text-[#5865F2]" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Weekly Call
                        </p>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 hidden md:block">
                        Every Friday • 8:00 AM (Bali)
                    </p>
                </div>
            </div>

            <div className="md:hidden text-xs text-gray-600 dark:text-gray-400">
                {timeUntil && (
                    <span className="font-mono text-xs">
                        {timeUntil.days > 0 && (
                            <span className="text-orange-400">
                                {timeUntil.pad(timeUntil.days)}d{" "}
                            </span>
                        )}
                        <span className="text-gray-300">
                            {timeUntil.pad(timeUntil.hours)}
                        </span>
                        <span className="text-gray-500">:</span>
                        <span className="text-gray-300">
                            {timeUntil.pad(timeUntil.minutes)}
                        </span>
                        <span className="text-gray-500">:</span>
                        <span className="text-gray-300">
                            {timeUntil.pad(timeUntil.seconds)}
                        </span>
                    </span>
                )}
            </div>

            <span className="hidden md:inline-flex items-center px-2.5 py-1 text-xs w-fit">
                {callActive ? (
                    <span className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                        Live Now
                    </span>
                ) : (
                    <span className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        Next call in{" "}
                        {timeUntil && (
                            <span className="font-mono text-xs">
                                {timeUntil.days > 0 && (
                                    <span className="text-orange-400">
                                        {timeUntil.pad(timeUntil.days)}d{" "}
                                    </span>
                                )}
                                <span className="text-gray-300">
                                    {timeUntil.pad(timeUntil.hours)}
                                </span>
                                <span className="text-gray-500">:</span>
                                <span className="text-gray-300">
                                    {timeUntil.pad(timeUntil.minutes)}
                                </span>
                                <span className="text-gray-500">:</span>
                                <span className="text-gray-300">
                                    {timeUntil.pad(timeUntil.seconds)}
                                </span>
                            </span>
                        )}
                    </span>
                )}
            </span>

            <div className="flex flex-col gap-2">
                <button
                    onClick={() =>
                        window.open(weeklyCall.discordLink, "_blank")
                    }
                    disabled={!callActive}
                    className={`
                        w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm
                        ${
                            callActive
                                ? "bg-[#5865F2] hover:bg-[#4752C4] text-white"
                                : "bg-[#5865F2]/10 text-[#5865F2] cursor-not-allowed opacity-75"
                        }
                        transition-colors duration-200
                    `}
                >
                    Join Call
                </button>
                <button
                    onClick={() => createCalendarEvent(weeklyCall)}
                    className="hidden md:flex w-full items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm
                        bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 
                        text-gray-900 dark:text-white transition-colors duration-200"
                >
                    <HiCalendar className="w-4 h-4" />
                    Add to Calendar
                </button>
            </div>
        </div>
    )
}
