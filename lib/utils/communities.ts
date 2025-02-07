import communitiesData from "../../public/decoding-bitcoin/communities/communities.json"

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

export type Question = {
    id: string
    text: string
    relatedMaterial?: string
    assignments: Array<{
        studentName: string
        groupId: number
    }>
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

export const getNextCallDate = (weeklyCall: WeeklyData["weeklyCall"]) => {
    const callDay = new Date(weeklyCall.date)
    callDay.setHours(weeklyCall.time.hour, weeklyCall.time.minute, 0, 0)
    return callDay
}

export const isCallActive = (weeklyCall: WeeklyData["weeklyCall"]) => {
    const now = new Date()
    const nextCall = getNextCallDate(weeklyCall)
    const timeDiff = nextCall.getTime() - now.getTime()
    const minutesUntilCall = timeDiff / (1000 * 60)
    return minutesUntilCall <= 10 && minutesUntilCall >= -60
}

export const createCalendarEvent = (weeklyCall: WeeklyData["weeklyCall"]) => {
    const timeZone = weeklyCall.time.timeZone
    const nextCall = new Date(weeklyCall.date)
    debugger
    // Create a date in the specified timezone
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    })

    // Set the time in the original timezone
    const originalDate = new Date(weeklyCall.date)
    originalDate.setHours(weeklyCall.time.hour, weeklyCall.time.minute, 0, 0)

    // Format the date in the original timezone
    const formattedDate = formatter.format(originalDate)
    const [datePart, timePart] = formattedDate.split(", ")
    const [month, day, year] = datePart.split("/")
    const [hour, minute] = timePart.split(":")

    // Create the start date in the correct timezone
    nextCall.setFullYear(parseInt(year), parseInt(month) - 1, parseInt(day))
    nextCall.setHours(parseInt(hour), parseInt(minute), 0, 0)

    // Create end time (1 hour later)
    const endCall = new Date(nextCall)
    endCall.setHours(endCall.getHours() + 1)

    const event = {
        title: "Bitcoin Development Weekly Call",
        description: weeklyCall.description,
        startTime: nextCall
            .toISOString()
            .replace(/[-:]/g, "")
            .replace(/\.\d{3}/, ""),
        endTime: endCall
            .toISOString()
            .replace(/[-:]/g, "")
            .replace(/\.\d{3}/, ""),
        location: `Discord - ${weeklyCall.discordLink}`,
        timezone: timeZone
    }

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Decoding Bitcoin//Calendar//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, "\\n")}
DTSTART;TZID=${event.timezone}:${event.startTime}
DTEND;TZID=${event.timezone}:${event.endTime}
LOCATION:${event.location}
RRULE:FREQ=WEEKLY
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
    const link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.download = "bitcoin-development-call.ics"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

export const getTimeUntilCall = (weeklyCall: WeeklyData["weeklyCall"]) => {
    const nextCall = getNextCallDate(weeklyCall)
    const now = new Date()
    const diff = nextCall.getTime() - now.getTime()

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    const pad = (n: number) => Math.abs(n).toString().padStart(2, "0")

    return { days, hours, minutes, seconds, pad }
}

export const collectQuestions = (weekData: WeeklyData): Question[] => {
    if (!weekData || !weekData.questions) return []

    const questionMap = new Map<string, Question>()

    weekData.questions.forEach((question) => {
        const key = question.text
        if (!questionMap.has(key)) {
            questionMap.set(key, {
                id: question.id,
                text: question.text,
                relatedMaterial: question.relatedMaterial,
                assignments: []
            })
        }
        questionMap.get(key)?.assignments.push(question.assignedTo)
    })

    return Array.from(questionMap.values())
}
