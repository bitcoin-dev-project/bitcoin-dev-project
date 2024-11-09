import {
    communities,
    cohorts,
    groups,
    chaperons,
    students,
    weeklyData,
    resources,
    questions,
    questionAssignments,
    weeklyCalls,
    groupAssignments
} from "@/db/schema"
import { db } from "./drizzle"

async function clearDatabase() {
    console.log("🧹 Clearing existing data...")

    try {
        // Delete in reverse order of dependencies
        await db.delete(questionAssignments)
        await db.delete(groupAssignments)
        await db.delete(questions)
        await db.delete(resources)
        await db.delete(weeklyCalls)
        await db.delete(weeklyData)
        await db.delete(students)
        await db.delete(chaperons)
        await db.delete(groups)
        await db.delete(cohorts)
        await db.delete(communities)

        console.log("✅ Database cleared")
    } catch (error) {
        console.error("❌ Error clearing database:", error)
        throw error
    }
}

async function main() {
    try {
        // First clear all existing data
        await clearDatabase()

        console.log("🌱 Starting seeding...")

        // Create community
        const [community] = await db
            .insert(communities)
            .values({
                name: "Bitcoin Indonesia",
                logo: "/communities/images/bitcoin-indonesia.png",
                description:
                    "Bitcoin Indonesia is a non-profit organization dedicated to promoting Bitcoin adoption through education and community building across Indonesia.",
                language: "Indonesian",
                timezone: "GMT+8",
                totalAlumni: 50,
                nextCohortDate: new Date("2024-11-22")
            })
            .returning()

        // Create cohort
        const [cohort] = await db
            .insert(cohorts)
            .values({
                communityId: community.id,
                number: 1,
                students: 50,
                startDate: new Date("2024-11-22"),
                endDate: new Date("2025-01-17"),
                status: "starting-soon",
                progress: 0
            })
            .returning()

        // Create groups
        const [groupA, groupB] = await db
            .insert(groups)
            .values([
                {
                    cohortId: cohort.id,
                    name: "Group A"
                },
                {
                    cohortId: cohort.id,
                    name: "Group B"
                }
            ])
            .returning()

        // Create chaperons
        await db.insert(chaperons).values([
            {
                groupId: groupA.id,
                name: "Marius",
                expertise: "Bitcoin Educator"
            },
            {
                groupId: groupB.id,
                name: "Keypleb",
                expertise: "Bitcoin Developer"
            }
        ])

        // Create students
        const [andi, budi, citra, dewi, erik, farah] = await db
            .insert(students)
            .values([
                { groupId: groupA.id, name: "Andi" },
                { groupId: groupA.id, name: "Budi" },
                { groupId: groupA.id, name: "Citra" },
                { groupId: groupB.id, name: "Dewi" },
                { groupId: groupB.id, name: "Erik" },
                { groupId: groupB.id, name: "Farah" }
            ])
            .returning()

        // Define all weeks data
        const weeks = [
            {
                weekNumber: 1,
                topic: "Introduction to Bitcoin Script",
                topicSlug: "introduction",
                objectives: [
                    "Understand Bitcoin's scripting language purpose",
                    "Learn basic stack operations and script execution",
                    "Explore transaction validation process",
                    "Practice simple script debugging"
                ],
                date: new Date("2024-11-22T12:00:00Z"),
                resources: [
                    {
                        title: "Introduction to Bitcoin Script",
                        type: "Course",
                        link: "1-introduction",
                        parentTopic: "1-introduction"
                    },
                    {
                        title: "Script Execution Model",
                        type: "Course",
                        link: "1-1-script-execution",
                        parentTopic: "1-introduction"
                    },
                    {
                        title: "Basic Script Operations",
                        type: "Exercise",
                        link: "1-2-basic-operations",
                        parentTopic: "1-introduction"
                    }
                ],
                questions: [
                    {
                        text: "What is the purpose of Bitcoin Script and why was it designed to be stack-based?",
                        relatedMaterial: "1-introduction"
                    },
                    {
                        text: "Explain how the stack works in Bitcoin Script using a simple arithmetic operation example",
                        relatedMaterial: "1-1-script-execution"
                    },
                    {
                        text: "What are the main categories of Script operations available in Bitcoin?",
                        relatedMaterial: "1-2-basic-operations"
                    }
                ],
                deputies: [
                    { groupId: groupA.id, deputyId: andi.id },
                    { groupId: groupB.id, deputyId: dewi.id }
                ]
            },
            {
                weekNumber: 2,
                topic: "Bitcoin History",
                topicSlug: "bitcoin-history",
                objectives: [
                    "Understand Bitcoin's early development (2007-2010)",
                    "Learn about key protocol upgrades and releases",
                    "Study important transitions in Bitcoin's governance",
                    "Explore significant technical milestones"
                ],
                date: new Date("2024-11-29T12:00:00Z"),
                resources: [
                    {
                        title: "Bitcoin History",
                        type: "Course",
                        link: "bitcoin-history",
                        parentTopic: "bitcoin-history"
                    }
                ],
                questions: [
                    {
                        text: "Describe Bitcoin's development timeline from Satoshi's first work in 2007 to the release of v0.1 in 2009",
                        relatedMaterial: "bitcoin-history"
                    },
                    {
                        text: "What was the significance of the first consensus change in Bitcoin v0.3.3?",
                        relatedMaterial: "bitcoin-history"
                    },
                    {
                        text: "Explain the transition of leadership from Satoshi to Gavin",
                        relatedMaterial: "bitcoin-history"
                    }
                ],
                deputies: [
                    { groupId: groupA.id, deputyId: budi.id },
                    { groupId: groupB.id, deputyId: erik.id }
                ]
            },
            // Weeks 3-8 follow the same pattern...
            {
                weekNumber: 8,
                topic: "Taproot",
                topicSlug: "taproot",
                objectives: [
                    "Understand Taproot's core components",
                    "Learn about Tagged Hashes and their importance",
                    "Master Schnorr signatures and their benefits",
                    "Explore MAST, MuSig, and TapTweak concepts"
                ],
                date: new Date("2025-01-10T12:00:00Z"),
                resources: [
                    {
                        title: "Taproot Introduction",
                        type: "Course",
                        link: "taproot",
                        parentTopic: "taproot"
                    },
                    {
                        title: "Tagged Hashes",
                        type: "Course",
                        link: "tagged-hashes",
                        parentTopic: "taproot"
                    },
                    {
                        title: "Schnorr Signatures",
                        type: "Course",
                        link: "schnorr-signature",
                        parentTopic: "taproot"
                    }
                ],
                questions: [
                    {
                        text: "Explain the purpose of Tagged Hashes in Taproot",
                        relatedMaterial: "tagged-hashes"
                    },
                    {
                        text: "How do Schnorr signatures improve upon ECDSA signatures?",
                        relatedMaterial: "schnorr-signature"
                    },
                    {
                        text: "Describe the process of generating and verifying a Schnorr signature",
                        relatedMaterial: "schnorr-signature"
                    }
                ],
                deputies: [
                    { groupId: groupA.id, deputyId: citra.id },
                    { groupId: groupB.id, deputyId: farah.id }
                ]
            }
        ]

        // Create weekly data and associated records
        for (const week of weeks) {
            const [weeklyDataEntry] = await db
                .insert(weeklyData)
                .values({
                    cohortId: cohort.id,
                    weekNumber: week.weekNumber,
                    topic: week.topic,
                    topicSlug: week.topicSlug,
                    objectives: week.objectives,
                    completed: false
                })
                .returning()

            // Create weekly call
            await db.insert(weeklyCalls).values({
                weeklyDataId: weeklyDataEntry.id,
                date: week.date,
                discordLink: `https://discord.gg/week${week.weekNumber}`
            })

            // Create resources
            const weekResources = await db
                .insert(resources)
                .values(
                    week.resources.map((resource) => ({
                        weeklyDataId: weeklyDataEntry.id,
                        ...resource,
                        completed: false
                    }))
                )
                .returning()

            // Create questions
            const weekQuestions = await db
                .insert(questions)
                .values(
                    week.questions.map((question) => ({
                        weeklyDataId: weeklyDataEntry.id,
                        ...question
                    }))
                )
                .returning()

            // Create question assignments
            await db.insert(questionAssignments).values(
                weekQuestions.flatMap((question) => [
                    {
                        questionId: question.id,
                        studentId: andi.id,
                        groupId: groupA.id,
                        completed: false
                    },
                    {
                        questionId: question.id,
                        studentId: dewi.id,
                        groupId: groupB.id,
                        completed: false
                    }
                ])
            )

            // Create group assignments (deputies)
            await db.insert(groupAssignments).values(
                week.deputies.map((deputy) => ({
                    weeklyDataId: weeklyDataEntry.id,
                    ...deputy
                }))
            )
        }

        console.log("✅ Seeding completed")
    } catch (error) {
        console.error("❌ Error seeding:", error)
        throw error
    }
}

main()
    .catch((err) => {
        console.error("❌ Error in main process:", err)
        process.exit(1)
    })
    .finally(async () => {})
