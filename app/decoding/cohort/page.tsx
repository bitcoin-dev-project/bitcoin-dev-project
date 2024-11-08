"use client"

import { useState } from "react"
import Link from "next/link"
import {
    FaDiscord,
    FaCheckCircle,
    FaCircle,
    FaCalendar,
    FaGithub,
    FaSlack
} from "react-icons/fa"
import {
    HiDocument,
    HiArrowRight,
    HiDownload,
    HiClock,
    HiChevronLeft,
    HiChevronRight
} from "react-icons/hi"
import TopicBanner from "@/components/bitcoin-topics/layouts/TopicBanner"

// Simple Progress Component
const Progress = ({ value }: { value: number }) => (
    <div className="w-48">
        <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-300">
                Overall Progress
            </span>
            <span className="text-sm font-medium text-orange-500">
                {value}%
            </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
                className="bg-orange-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${value}%` }}
            />
        </div>
    </div>
)

const cohortData = {
    weekNumber: 7,
    topic: "Security & Second Layer",
    progress: 65,
    currentModule: {
        name: "Bitcoin Script Security",
        objectives: [
            "Understand common Script vulnerabilities",
            "Implement secure transaction validation",
            "Analysis of attack vectors"
        ],
        exercises: [
            {
                id: 1,
                title: "P2PKH Transaction Analysis",
                difficulty: "Medium",
                completed: true,
                link: "/decoding/script/p2pkh",
                exerciseLink: "/decoding/script/p2pkh#exercises"
            },
            {
                id: 2,
                title: "Script Vulnerability Detection",
                difficulty: "Hard",
                completed: false,
                link: "/decoding/script/security",
                exerciseLink: "/decoding/script/security#exercises"
            },
            {
                id: 3,
                title: "Security Best Practices",
                difficulty: "Medium",
                completed: false,
                link: "/decoding/script/best-practices",
                exerciseLink: "/decoding/script/best-practices#exercises"
            }
        ]
    },
    groups: [
        {
            id: 1,
            name: "Alpha",
            deputy: {
                name: "alice",
                tasks: ["Lead discussion", "Share meeting notes"]
            },
            chaperon: {
                name: "adam",
                expertise: "Bitcoin Core Developer"
            },
            students: [
                {
                    name: "satoshi",
                    questions: [
                        {
                            text: "Explain Script malleability and its implications",
                            relatedMaterial: "/decoding/script/malleability"
                        },
                        {
                            text: "How does SegWit address malleability?",
                            relatedMaterial: "/decoding/script/segwit"
                        }
                    ]
                },
                {
                    name: "hal",
                    questions: [
                        {
                            text: "What are the common pitfalls in Script validation?",
                            relatedMaterial: "/decoding/script/validation"
                        },
                        {
                            text: "How can we prevent transaction replay attacks?",
                            relatedMaterial: "/decoding/security/replay-attacks"
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: "Beta",
            deputy: {
                name: "bob",
                tasks: ["Lead discussion", "Share meeting notes"]
            },
            chaperon: {
                name: "greg",
                expertise: "Lightning Developer"
            },
            students: [
                {
                    name: "nick",
                    questions: [
                        {
                            text: "Demonstrate a practical example of Script vulnerability",
                            relatedMaterial: "/decoding/script/vulnerabilities"
                        },
                        {
                            text: "How would you implement secure multi-signature schemes?",
                            relatedMaterial: "/decoding/script/multisig"
                        }
                    ]
                }
            ]
        }
    ],
    weeklyCall: {
        date: "2024-03-20T15:00:00Z",
        discordLink: "https://discord.gg/bitcoindev"
    }
}

export default function CohortPage() {
    const [selectedWeek, setSelectedWeek] = useState(cohortData.weekNumber)

    // Create a minimal content object that TopicBanner expects
    const mockContent = {
        title: "Cohort Dashboard",
        slug: "cohort",
        tags: [],
        category: "Dashboard"
    }

    return (
        <TopicBanner content={mockContent}>
            <div className="max-w-7xl mx-auto py-8">
                {/* Week Selection Header */}
                <div className="bg-gray-900/40 dark:bg-gray-800/40 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Bitcoin Dev Program
                            </h1>
                            <p className="text-gray-400">
                                Week {selectedWeek}: {cohortData.topic}
                            </p>
                        </div>
                        <Progress value={cohortData.progress} />
                    </div>

                    {/* Week Navigation */}
                    <div className="flex items-center space-x-4 mt-6">
                        <button
                            onClick={() =>
                                setSelectedWeek((prev) => Math.max(1, prev - 1))
                            }
                            className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white disabled:opacity-50"
                            disabled={selectedWeek === 1}
                        >
                            <HiChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex-1 overflow-x-auto">
                            <div className="flex space-x-2">
                                {Array.from(
                                    { length: cohortData.weekNumber },
                                    (_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() =>
                                                setSelectedWeek(i + 1)
                                            }
                                            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                                                selectedWeek === i + 1
                                                    ? "bg-orange-500 text-white"
                                                    : "bg-gray-800/50 text-gray-400 hover:text-white"
                                            }`}
                                        >
                                            Week {i + 1}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                setSelectedWeek((prev) =>
                                    Math.min(cohortData.weekNumber, prev + 1)
                                )
                            }
                            className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white disabled:opacity-50"
                            disabled={selectedWeek === cohortData.weekNumber}
                        >
                            <HiChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Current Module Info */}
                        <div className="bg-gray-900/40 dark:bg-gray-800/40 rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-6">
                                Current Module: {cohortData.currentModule.name}
                            </h2>

                            {/* Learning Objectives */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-white mb-3">
                                    Learning Objectives
                                </h3>
                                <ul className="space-y-2">
                                    {cohortData.currentModule.objectives.map(
                                        (objective, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center text-gray-300"
                                            >
                                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                                                {objective}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>

                            {/* Weekly Exercises */}
                            <div>
                                <h3 className="text-lg font-medium text-white mb-3">
                                    Weekly Exercises
                                </h3>
                                <div className="space-y-3">
                                    {cohortData.currentModule.exercises.map(
                                        (exercise) => (
                                            <div
                                                key={exercise.id}
                                                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    {exercise.completed ? (
                                                        <FaCheckCircle className="text-green-500 w-5 h-5" />
                                                    ) : (
                                                        <FaCircle className="text-gray-600 w-5 h-5" />
                                                    )}
                                                    <div className="flex flex-col">
                                                        <Link
                                                            href={exercise.link}
                                                            className="text-gray-200 hover:text-orange-400"
                                                        >
                                                            {exercise.title}
                                                        </Link>
                                                        <Link
                                                            href={
                                                                exercise.exerciseLink
                                                            }
                                                            className="text-sm text-gray-400 hover:text-orange-400"
                                                        >
                                                            View Exercises →
                                                        </Link>
                                                    </div>
                                                </div>
                                                <span className="text-sm px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full">
                                                    {exercise.difficulty}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Groups Section */}
                        <div className="space-y-8">
                            {cohortData.groups.map((group) => (
                                <div
                                    key={group.id}
                                    className="bg-gray-900/40 dark:bg-gray-800/40 rounded-xl p-6"
                                >
                                    {/* Group Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-semibold text-white">
                                            Group {group.name}
                                        </h2>
                                        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                                            {group.students.length} members
                                        </span>
                                    </div>

                                    {/* Group Leadership */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        {/* Deputy Card */}
                                        <div className="bg-gray-800/50 rounded-lg p-4">
                                            <div className="flex items-center mb-2">
                                                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center mr-3">
                                                    <span className="text-sm font-medium text-orange-400">
                                                        D
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-medium">
                                                        @{group.deputy.name}
                                                    </h3>
                                                    <span className="text-sm text-orange-400">
                                                        Deputy
                                                    </span>
                                                </div>
                                            </div>
                                            <ul className="ml-11 text-sm text-gray-400">
                                                {group.deputy.tasks.map(
                                                    (task, idx) => (
                                                        <li key={idx}>
                                                            • {task}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>

                                        {/* Chaperon Card */}
                                        <div className="bg-gray-800/50 rounded-lg p-4">
                                            <div className="flex items-center mb-2">
                                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                                                    <span className="text-sm font-medium text-purple-400">
                                                        C
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-medium">
                                                        @{group.chaperon.name}
                                                    </h3>
                                                    <span className="text-sm text-purple-400">
                                                        Chaperon
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="ml-11 text-sm text-gray-400">
                                                {group.chaperon.expertise}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Students and Questions */}
                                    <div className="space-y-4">
                                        {group.students.map((student) => (
                                            <div
                                                key={student.name}
                                                className="bg-gray-800/50 rounded-lg p-4"
                                            >
                                                <div className="flex items-center mb-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center mr-3">
                                                        <span className="text-sm font-medium text-gray-300">
                                                            {student.name[0].toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-white font-medium">
                                                        @{student.name}
                                                    </h3>
                                                </div>

                                                <div className="ml-11 space-y-3">
                                                    {student.questions.map(
                                                        (question, qIdx) => (
                                                            <div
                                                                key={qIdx}
                                                                className="bg-gray-900/60 rounded-lg p-4"
                                                            >
                                                                <p className="text-gray-200 mb-2">
                                                                    {
                                                                        question.text
                                                                    }
                                                                </p>
                                                                {question.relatedMaterial && (
                                                                    <Link
                                                                        href={
                                                                            question.relatedMaterial
                                                                        }
                                                                        className="inline-flex items-center text-sm text-orange-400 hover:text-orange-300"
                                                                    >
                                                                        <HiDocument className="w-4 h-4 mr-1" />
                                                                        Related
                                                                        material
                                                                        <HiArrowRight className="w-4 h-4 ml-1" />
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Updated Sidebar */}
                    <div className="space-y-6">
                        {/* Weekly Call Card */}
                        <div className="bg-gray-900/40 dark:bg-gray-800/40 rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-4">
                                Weekly Call
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center text-gray-300">
                                    <HiClock className="w-5 h-5 mr-2" />
                                    {new Date(
                                        cohortData.weeklyCall.date
                                    ).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        timeZoneName: "short"
                                    })}
                                </div>

                                {/* Call Actions */}
                                <div className="space-y-3">
                                    <a
                                        href={cohortData.weeklyCall.discordLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg px-4 py-3 flex items-center justify-center"
                                    >
                                        <FaDiscord className="w-5 h-5 mr-2" />
                                        Join Discord Call
                                    </a>

                                    <button
                                        onClick={() => {
                                            // Generate calendar file (example using Google Calendar link)
                                            const event = {
                                                text: "Bitcoin Dev Program - Weekly Call",
                                                dates: cohortData.weeklyCall
                                                    .date,
                                                details: `Week ${cohortData.weekNumber}: ${cohortData.topic}\n\nDiscord: ${cohortData.weeklyCall.discordLink}`
                                            }
                                            const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${encodeURIComponent(event.dates)}&details=${encodeURIComponent(event.details)}`
                                            window.open(
                                                googleCalendarUrl,
                                                "_blank"
                                            )
                                        }}
                                        className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded-lg px-4 py-3 flex items-center justify-center"
                                    >
                                        <FaCalendar className="w-5 h-5 mr-2" />
                                        Add to Calendar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-gray-900/40 dark:bg-gray-800/40 rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-4">
                                Quick Links
                            </h2>
                            <div className="space-y-3">
                                <a
                                    href="#"
                                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50"
                                >
                                    <span className="flex items-center">
                                        <HiDocument className="w-5 h-5 mr-2" />
                                        Week's Summary
                                    </span>
                                    <HiDownload className="w-5 h-5" />
                                </a>

                                <a
                                    href="#"
                                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50"
                                >
                                    <span className="flex items-center">
                                        <FaGithub className="w-5 h-5 mr-2" />
                                        Exercise Repository
                                    </span>
                                    <HiArrowRight className="w-5 h-5" />
                                </a>

                                <a
                                    href="#"
                                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50"
                                >
                                    <span className="flex items-center">
                                        <FaSlack className="w-5 h-5 mr-2" />
                                        Discussion Channel
                                    </span>
                                    <HiArrowRight className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Resources for This Week */}
                        <div className="bg-gray-900/40 dark:bg-gray-800/40 rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-4">
                                This Week's Resources
                            </h2>
                            <div className="space-y-3">
                                {[
                                    {
                                        title: "Script Security Best Practices",
                                        link: "#"
                                    },
                                    {
                                        title: "Transaction Malleability Deep Dive",
                                        link: "#"
                                    },
                                    {
                                        title: "SegWit Implementation Guide",
                                        link: "#"
                                    }
                                ].map((resource, idx) => (
                                    <Link
                                        key={idx}
                                        href={resource.link}
                                        className="block p-3 bg-gray-800/50 rounded-lg text-gray-300 hover:text-orange-400 hover:bg-gray-700/50"
                                    >
                                        {resource.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TopicBanner>
    )
}
