// Types
export type WeeklyData = {
    weekNumber: number
    topic: string
    topicSlug: string
    objectives: string[]
    resources: Array<{
        id: number
        title: string
        type: string
        link: string
        completed: boolean
        parentTopic?: string
    }>
    questions: Array<{
        id: string
        text: string
        relatedMaterial: string
        assignedTo: {
            studentName: string
            groupId: number
        }
    }>
    weeklyCall: {
        date: string
        discordLink: string
    }
    groupAssignments: Array<{
        groupId: number
        deputyName: string // Randomly assigned each week
    }>
    completed?: boolean
}

export type Community = {
    id: string
    name: string
    logo: string
    description: string
    language: string
    timezone: string
    currentCohort: {
        number: number
        students: number
        startDate: string
        endDate: string
        status?: CohortStatus // Made optional since it's calculated dynamically
        groups: Array<{
            id: number
            name: string
            chaperon: {
                name: string
                expertise: string
            }
            students: Array<{
                name: string
            }>
        }>
    }
    weeklyData: WeeklyData[]
    totalAlumni: number
    nextCohortDate: string
}

// Helper function to distribute questions among students
const distributeQuestionsToGroups = (
    baseQuestions: Array<{ text: string; relatedMaterial: string }>
) => {
    const allQuestions: Array<{
        id: string
        text: string
        relatedMaterial: string
        assignedTo: {
            studentName: string
            groupId: number
        }
    }> = []

    // For each group (1 and 2)
    for (let groupId = 1; groupId <= 2; groupId++) {
        // Get students for this group
        const students =
            groupId === 1
                ? ["Andi", "Budi", "Citra"]
                : ["Dewi", "Erik", "Farah"]

        // Distribute questions among students
        students.forEach((studentName, studentIndex) => {
            // Assign questions round-robin style
            baseQuestions.forEach((q, qIndex) => {
                if (qIndex % students.length === studentIndex) {
                    allQuestions.push({
                        id: `w${groupId}q${qIndex + 1}-${studentName}`,
                        text: q.text,
                        relatedMaterial: q.relatedMaterial,
                        assignedTo: {
                            studentName,
                            groupId
                        }
                    })
                }
            })
        })
    }

    return allQuestions
}

// First, let's import our content layer topics
import { allTopics } from "contentlayer/generated"

// Helper function to validate topic slugs
const validateTopicSlug = (slug: string) => {
    const topic = allTopics.find((t) => t.slug === slug)
    if (!topic) {
        console.warn(
            `Warning: Topic with slug "${slug}" not found in content layer`
        )
        return false
    }
    return true
}

// Define weekly topics structure that maps to our markdown content
const weeklyTopics = {
    week1: {
        mainTopic: "bitcoin-history",
        resources: ["bitcoin-history"]
    },
    week2: {
        mainTopic: "3-overview",
        resources: [
            "3-1-overview-stack",
            "3-2-overview-opcodes",
            "3-3-overview-locking-unlocking"
        ]
    },
    week3: {
        mainTopic: "4-p2pk",
        resources: ["4-0-p2pk-problems", "4-1-p2pk-exercise1"]
    }
} as const

// Mock data
export const communitiesData: Community[] = [
    {
        id: "bitcoin-indonesia",
        name: "Bitcoin Indonesia",
        logo: "/communities/images/bitcoin-indonesia.png",
        description:
            "Bitcoin Indonesia is a non-profit organization dedicated to promoting Bitcoin adoption through education and community building across Indonesia.",
        language: "Indonesian",
        timezone: "GMT+8",
        currentCohort: {
            number: 1,
            students: 50,
            startDate: "2024-10-24",
            endDate: "2024-11-12",
            groups: [
                {
                    id: 1,
                    name: "Group A",
                    chaperon: {
                        name: "Marius",
                        expertise: "Bitcoin Educator"
                    },
                    students: [
                        { name: "Andi" },
                        { name: "Budi" },
                        { name: "Citra" }
                    ]
                },
                {
                    id: 2,
                    name: "Group B",
                    chaperon: {
                        name: "Keypleb",
                        expertise: "Bitcoin Developer"
                    },
                    students: [
                        { name: "Dewi" },
                        { name: "Erik" },
                        { name: "Farah" }
                    ]
                }
            ]
        },
        weeklyData: [
            {
                weekNumber: 1,
                topic: "Introduction to Bitcoin Script",
                topicSlug: weeklyTopics.week1.mainTopic,
                objectives: [
                    "Understand basic Script operations",
                    "Write simple locking scripts",
                    "Debug Script execution"
                ],
                resources: weeklyTopics.week1.resources
                    .map((slug, index) => {
                        const topic = allTopics.find((t) => t.slug === slug)
                        if (!topic) {
                            console.warn(`Topic ${slug} not found`)
                            return null
                        }
                        return {
                            id: index + 1,
                            title: topic.title,
                            type: topic.category || "Course",
                            link: topic.slug,
                            completed: false,
                            parentTopic: topic.parent
                        }
                    })
                    .filter(Boolean),
                questions: distributeQuestionsToGroups([
                    {
                        text: "How does OP_CHECKSIG verify signatures?",
                        relatedMaterial: "/week1/script-basics"
                    },
                    {
                        text: "Explain the stack-based execution model",
                        relatedMaterial: "/week1/workshop"
                    },
                    {
                        text: "What is the difference between P2PKH and P2PK?",
                        relatedMaterial: "/week1/script-basics"
                    },
                    {
                        text: "How does Script handle conditional execution?",
                        relatedMaterial: "/week1/workshop"
                    },
                    {
                        text: "Explain the purpose of OP_VERIFY",
                        relatedMaterial: "/week1/script-basics"
                    },
                    {
                        text: "How do you debug a Script execution?",
                        relatedMaterial: "/week1/workshop"
                    }
                ]),
                weeklyCall: {
                    date: "2024-01-07T15:00:00Z",
                    discordLink: "https://discord.gg/week1"
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "Budi" },
                    { groupId: 2, deputyName: "Erik" }
                ]
            },
            {
                weekNumber: 2,
                topic: "Multisignature Scripts",
                topicSlug: weeklyTopics.week2.mainTopic,
                objectives: [
                    "Implement multi-signature scripts",
                    "Use timelock operations",
                    "Create hash-locked contracts"
                ],
                resources: weeklyTopics.week2.resources
                    .map((slug, index) => {
                        const topic = allTopics.find((t) => t.slug === slug)
                        if (!topic) {
                            console.warn(`Topic ${slug} not found`)
                            return null
                        }
                        return {
                            id: index + 1,
                            title: topic.title,
                            type: topic.category || "Course",
                            link: topic.slug,
                            completed: false,
                            parentTopic: topic.parent
                        }
                    })
                    .filter(Boolean),
                questions: distributeQuestionsToGroups([
                    {
                        text: "What are the benefits of P2SH?",
                        relatedMaterial: "/decoding/4-p2pk"
                    },
                    {
                        text: "Compare CLTV and CSV",
                        relatedMaterial: "/decoding/4-p2pk"
                    },
                    {
                        text: "How does a 2-of-3 multisig work?",
                        relatedMaterial: "/decoding/4-p2pk"
                    },
                    {
                        text: "Explain relative timelock advantages",
                        relatedMaterial: "/decoding/4-p2pk"
                    },
                    {
                        text: "What are the use cases for hash locks?",
                        relatedMaterial: "/decoding/4-p2pk"
                    },
                    {
                        text: "How do you implement atomic swaps?",
                        relatedMaterial: "/decoding/4-p2pk"
                    }
                ]),
                weeklyCall: {
                    date: "2024-01-14T15:00:00Z",
                    discordLink: "https://discord.gg/week2"
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "Citra" },
                    { groupId: 2, deputyName: "Farah" }
                ]
            },
            {
                weekNumber: 3,
                topic: "Script Security",
                objectives: [
                    "Identify common vulnerabilities",
                    "Implement secure validation",
                    "Test edge cases"
                ],
                resources: [
                    {
                        id: 1,
                        title: "Security Best Practices",
                        type: "Course",
                        link: "/week3/security",
                        completed: false
                    },
                    {
                        id: 2,
                        title: "Vulnerability Testing",
                        type: "Exercise",
                        link: "/week3/testing",
                        completed: false
                    }
                ],
                questions: distributeQuestionsToGroups([
                    {
                        text: "How to prevent script malleability?",
                        relatedMaterial: "/week3/security"
                    },
                    {
                        text: "Best practices for handling edge cases",
                        relatedMaterial: "/week3/testing"
                    },
                    {
                        text: "What are common Script vulnerabilities?",
                        relatedMaterial: "/week3/security"
                    },
                    {
                        text: "How to implement secure validation?",
                        relatedMaterial: "/week3/testing"
                    },
                    {
                        text: "Explain transaction malleability",
                        relatedMaterial: "/week3/security"
                    },
                    {
                        text: "How to test Script edge cases?",
                        relatedMaterial: "/week3/testing"
                    }
                ]),
                weeklyCall: {
                    date: "2024-01-21T15:00:00Z",
                    discordLink: "https://discord.gg/week3"
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "Andi" },
                    { groupId: 2, deputyName: "Dewi" }
                ]
            }
        ],
        totalAlumni: 0,
        nextCohortDate: "2025-01-15"
    }
]

// Add this type definition
export type CohortStatus = "in-progress" | "starting-soon" | "completed"

// Add a function to determine cohort status
export const getCohortStatus = (
    startDate: string,
    endDate: string
): CohortStatus => {
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (now > end) return "completed"
    if (now < start) return "starting-soon"
    return "in-progress"
}

// Modify the getCommunity function to calculate status dynamically
export const getCommunity = (id: string): Community | undefined => {
    const community = communitiesData.find((c) => c.id === id)
    if (!community) return undefined

    // Calculate status based on dates
    const status = getCohortStatus(
        community.currentCohort.startDate,
        community.currentCohort.endDate
    )

    return {
        ...community,
        currentCohort: {
            ...community.currentCohort,
            status, // Dynamically set status
            progress: calculateCohortProgress(community)
        }
    }
}

// Update getAllCommunities to include dynamic status
export const getAllCommunities = () => {
    return communitiesData.map((community) => ({
        ...community,
        currentCohort: {
            ...community.currentCohort,
            status: getCohortStatus(
                community.currentCohort.startDate,
                community.currentCohort.endDate
            ),
            progress: calculateCohortProgress(community)
        }
    }))
}

// Get weekly data with current date
export const getWeeklyData = (
    community: Community,
    weekNumber: number
): WeeklyData | undefined => {
    const now = new Date()
    const startDate = new Date(community.currentCohort.startDate)
    const cohortEndDate = new Date(community.currentCohort.endDate)

    const weekData = community.weeklyData.find(
        (week) => week.weekNumber === weekNumber
    )
    if (!weekData) return undefined

    // Calculate completion status based ONLY on dates:
    // 1. If cohort has ended, week is completed
    // 2. If week's end date has passed, week is completed
    const weekEndDate = new Date(startDate)
    weekEndDate.setDate(startDate.getDate() + weekNumber * 7)

    const isCompleted = now > cohortEndDate || now > weekEndDate

    return {
        ...weekData,
        completed: isCompleted
    }
}

// Get current week number
export const getCurrentWeek = (community: Community): number => {
    const now = new Date()
    const start = new Date(community.currentCohort.startDate)
    const diffTime = now.getTime() - start.getTime()
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7)) + 1

    if (diffWeeks < 1) return 1
    if (diffWeeks > community.weeklyData.length)
        return community.weeklyData.length
    return diffWeeks
}

// Add function to check if cohort is completed
export const isCohortCompleted = (community: Community): boolean => {
    const now = new Date()
    const endDate = new Date(community.currentCohort.endDate)
    return now > endDate
}

// Add this function to calculate progress
export const calculateCohortProgress = (community: Community): number => {
    const now = new Date()
    const startDate = new Date(community.currentCohort.startDate)
    const endDate = new Date(community.currentCohort.endDate)
    const totalWeeks = community.weeklyData.length

    // If cohort hasn't started yet
    if (now < startDate) return 0

    // If cohort is completed
    if (now > endDate) return 100

    // Calculate progress based on time elapsed
    const totalDuration = endDate.getTime() - startDate.getTime()
    const elapsed = now.getTime() - startDate.getTime()
    const progress = Math.round((elapsed / totalDuration) * 100)

    // Ensure progress stays between 0 and 100
    return Math.min(Math.max(progress, 0), 100)
}
