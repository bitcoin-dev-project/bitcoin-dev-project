import communitiesData from "../data/communities.json"

// Types
export type WeeklyData = {
    weekNumber: number
    topic: string
    topicSlug: string
    description?: string
    resources: Array<{
        id: number
        title: string
        link: string
        parentTopic?: string
    }>
    baseQuestions: BaseQuestion[]
    questions?: Array<{
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
        time: {
            hour: number
            minute: number
            timeZone: string
        }
        description: string
    }
    groupAssignments: Array<{
        groupId: number
        deputyName: string // Randomly assigned each week
    }>
    completed?: boolean
    additionalResources: Resource[]
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
        status?: CohortStatus
        progress?: number
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

export type ResourceType =
    | "documentation"
    | "video"
    | "github"
    | "exercise"
    | "article"
    | "tool"

export type Resource = {
    id: string
    title: string
    description: string
    type: ResourceType
    url: string
    duration?: number // in minutes
    difficulty?: "beginner" | "intermediate" | "advanced"
    author?: string
    tags?: string[]
    lastUpdated?: string
}
export type CohortStatus = "in-progress" | "starting-soon" | "completed"

// Add new type for base questions
type BaseQuestion = {
    text: string
    relatedMaterial: string
}

// distribute questions among students
const distributeQuestionsToGroups = (
    baseQuestions: BaseQuestion[],
    groups: Community["currentCohort"]["groups"]
) => {
    const allQuestions: WeeklyData["questions"] = []

    groups.forEach((group) => {
        const students = group.students.map((s) => s.name)

        // Distribute questions among students
        students.forEach((studentName, studentIndex) => {
            // Assign questions round-robin style
            baseQuestions.forEach((q, qIndex) => {
                if (qIndex % students.length === studentIndex) {
                    allQuestions.push({
                        id: `w${group.id}q${qIndex + 1}-${studentName}`,
                        text: q.text,
                        relatedMaterial: q.relatedMaterial,
                        assignedTo: {
                            studentName,
                            groupId: group.id
                        }
                    })
                }
            })
        })
    })

    return allQuestions
}

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

export const getCommunity = (id: string): Community | undefined => {
    const community = communitiesData.communities.find((c) => c.id === id)
    if (!community) return undefined

    // Validate and cast the data
    const validatedCommunity = {
        ...community,
        weeklyData: community.weeklyData.map((week) => ({
            ...week,
            additionalResources: week.additionalResources.map((resource) => ({
                ...resource,
                type: resource.type as ResourceType,
                difficulty: resource.difficulty as Resource["difficulty"]
            }))
        }))
    }

    const status = getCohortStatus(
        validatedCommunity.currentCohort.startDate,
        validatedCommunity.currentCohort.endDate
    )

    // Process weekly data to distribute questions
    const processedWeeklyData = validatedCommunity.weeklyData.map((week) => ({
        ...week,
        questions: distributeQuestionsToGroups(
            week.baseQuestions,
            validatedCommunity.currentCohort.groups
        )
    }))

    return {
        ...community,
        weeklyData: processedWeeklyData as WeeklyData[],
        currentCohort: {
            ...community.currentCohort,
            status,
            progress: calculateCohortProgress(validatedCommunity)
        }
    }
}

export const getAllCommunities = () => {
    return communitiesData.communities.map((community) => {
        const status = getCohortStatus(
            community.currentCohort.startDate,
            community.currentCohort.endDate
        )
        const processedWeeklyData = community.weeklyData.map((week) => ({
            ...week,
            questions: distributeQuestionsToGroups(
                week.baseQuestions,
                community.currentCohort.groups
            )
        }))
        const processedCommunity: Community = {
            ...community,
            weeklyData: processedWeeklyData as WeeklyData[],
            currentCohort: {
                ...community.currentCohort,
                status
            }
        }
        return {
            ...processedCommunity,
            currentCohort: {
                ...processedCommunity.currentCohort,
                progress: calculateCohortProgress(processedCommunity)
            }
        }
    })
}

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

    const weekEndDate = new Date(startDate)
    weekEndDate.setDate(startDate.getDate() + weekNumber * 7)

    const isCompleted = now > cohortEndDate || now > weekEndDate

    return {
        ...weekData,
        completed: isCompleted
    }
}

export const getCurrentWeek = (community: Community): number => {
    const now = new Date()
    const start = new Date(community.currentCohort.startDate)
    const currentWeekData = community.weeklyData.find((week) => {
        const callEnd = new Date(week.weeklyCall.date)
        callEnd.setHours(
            week.weeklyCall.time.hour + 1,
            week.weeklyCall.time.minute,
            0,
            0
        ) // Assuming 1-hour call
        return now < callEnd
    })

    if (!currentWeekData) return community.weeklyData.length // If no current week found, return the last week
    return currentWeekData.weekNumber
}

export const isCohortCompleted = (community: Community): boolean => {
    const now = new Date()
    const endDate = new Date(community.currentCohort.endDate)
    return now > endDate
}

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

    return Math.min(Math.max(progress, 0), 100)
}
