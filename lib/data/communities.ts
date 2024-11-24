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

// distribute questions among students
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
                ? [
                      "Olanma",
                      "Rads0909",
                      "tenzoin",
                      "fernandobernardz",
                      "hapdul_",
                      "sernyi",
                      "fighterleslie"
                  ]
                : [
                      "future5962",
                      "stackeduary",
                      "toxinityy",
                      "sayf_001",
                      "sunnygoh",
                      "BangZet",
                      "basnugroho"
                  ]

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

const weeklyTopics = {
    week1: {
        mainTopic: "bitcoin-history",
        resources: ["bitcoin-history"]
    },
    week2: {
        mainTopic: "overview",
        resources: ["stack", "opcodes", "locking-unlocking"]
    },
    week3: {
        mainTopic: "p2pk",
        resources: ["p2pk-introduction", "problems-with-p2pk", "p2pk-exercise1"]
    },
    week4: {
        mainTopic: "pay-to-public-key-hash-p2pkh",
        resources: [
            "5-p2pkh-introduction",
            "p2pkh-exercise1",
            "p2pkh-exercise2"
        ]
    },
    week5: {
        mainTopic: "pay-to-script-hash-p2sh",
        resources: ["p2sh-introduction", "p2sh-exercise", "p2sh-exercise"]
    },
    week6: {
        mainTopic: "pay-to-multisig-p2ms",
        resources: ["p2ms-introduction", "p2ms-exercise", "p2ms-exercise"]
    },
    week7: {
        mainTopic: "taproot-basics",
        resources: ["taproot-intro", "tagged-hashes", "schnorr-basics"]
    },
    week8: {
        mainTopic: "taproot-advanced",
        resources: [
            "schnorr-advanced",
            "musig",
            "taptweak",
            "nonce-reuse-attack"
        ]
    }
} as const

const weeklyCallDescription = `Dear Bitcoiners!

Welcome to Decoding Bitcoin study cohort launch session where we will have a quick presentation from Jamal, creator of Decoding Bitcoin platform. We will set a few expectations, answer any questions, and get to know each other. No preparation needed 😇

Location - Lounge channel on Discord:
https://discord.gg/6XPJ96sCY4`

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
            students: 14,
            startDate: "2024-11-22",
            endDate: "2025-01-17",
            groups: [
                {
                    id: 1,
                    name: "Group A",
                    chaperon: {
                        name: "KeyPleb",
                        expertise: "Bitcoin Educator"
                    },
                    students: [
                        { name: "Olanma" },
                        { name: "Rads0909" },
                        { name: "tenzoin" },
                        { name: "fernandobernardz" },
                        { name: "hapdul_" },
                        { name: "sernyi" },
                        { name: "fighterleslie" }
                    ]
                },
                {
                    id: 2,
                    name: "Group B",
                    chaperon: {
                        name: "jamal",
                        expertise: "Bitcoin Open Source Developer"
                    },
                    students: [
                        { name: "future5962" },
                        { name: "stackeduary" },
                        { name: "toxinityy" },
                        { name: "sayf_001" },
                        { name: "sunnygoh" },
                        { name: "BangZet" },
                        { name: "basnugroho" }
                    ]
                }
            ]
        },
        weeklyData: [
            {
                weekNumber: 1,
                topic: "Introduction",
                topicSlug: weeklyTopics.week1.mainTopic,
                description:
                    "Explore the fascinating history of Bitcoin, from its mysterious origins with Satoshi Nakamoto to its evolution into a global phenomenon. Learn about key historical events, early development, and the fundamental principles that make Bitcoin revolutionary.",
                resources: [],
                questions: [],
                weeklyCall: {
                    date: "2024-11-22T12:00:00Z",
                    discordLink: "https://discord.gg/6XPJ96sCY4",
                    time: {
                        hour: 20, // 8 PM
                        minute: 0,
                        timeZone: "Asia/Makassar" // Bali timezone
                    },
                    description: weeklyCallDescription
                },
                groupAssignments: [],
                additionalResources: []
            },
            {
                weekNumber: 2,
                topic: "Script Overview",
                topicSlug: weeklyTopics.week2.mainTopic,
                description:
                    "Dive into Bitcoin's scripting language, understanding how the stack-based execution model works, different types of opcodes, and the relationship between locking and unlocking scripts. Learn about script validation rules and standardness policies.",
                resources: [
                    {
                        id: 1,
                        title: "Stack Operations",
                        link: "stack",
                        parentTopic: "overview"
                    },
                    {
                        id: 2,
                        title: "Bitcoin Opcodes",
                        link: "opcodes",
                        parentTopic: "overview"
                    },
                    {
                        id: 3,
                        title: "Locking & Unlocking Scripts",
                        link: "locking-unlocking",
                        parentTopic: "overview"
                    },
                    {
                        id: 4,
                        title: "Script Success and Failure",
                        link: "script-success-failure",
                        parentTopic: "overview"
                    },
                    {
                        id: 5,
                        title: "Standard & Non-Standard Scripts",
                        link: "standard-nonstandard",
                        parentTopic: "overview"
                    },
                    {
                        id: 6,
                        title: "PushData Opcodes",
                        link: "pushdata-opcodes",
                        parentTopic: "overview"
                    },
                    {
                        id: 7,
                        title: "Test your knowledge",
                        link: "quiz",
                        parentTopic: "overview"
                    }
                ],
                questions: distributeQuestionsToGroups([
                    {
                        text: "Explain how stack operations work in Bitcoin Script and provide an example of OP_ADD execution",
                        relatedMaterial: "/decoding/stack"
                    },
                    {
                        text: "What are the main categories of Bitcoin opcodes and their purposes?",
                        relatedMaterial: "/decoding/opcodes"
                    },
                    {
                        text: "Describe the relationship between locking and unlocking scripts in Bitcoin transactions",
                        relatedMaterial: "/decoding/locking-unlocking"
                    },
                    {
                        text: "What determines script success or failure in Bitcoin? Explain the validation rules",
                        relatedMaterial: "/decoding/script-success-failure"
                    },
                    {
                        text: "Compare standard and non-standard scripts in Bitcoin. How are they handled by the network?",
                        relatedMaterial: "/decoding/standard-nonstandard"
                    },
                    {
                        text: "What is the IsStandard() function and how does it affect transaction relay policies?",
                        relatedMaterial: "/decoding/standard-nonstandard"
                    }
                ]),
                weeklyCall: {
                    date: "2024-11-29T12:00:00Z", // 7PM WIB
                    discordLink: "https://discord.gg/6XPJ96sCY4",
                    time: {
                        hour: 20, // 8 PM
                        minute: 0,
                        timeZone: "Asia/Makassar" // Bali timezone
                    },
                    description: weeklyCallDescription
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "Rads0909" },
                    { groupId: 2, deputyName: "stackeduary" }
                ],
                additionalResources: [
                    {
                        id: "doc-2",
                        title: "Bitcoin Script Reference Guide",
                        description:
                            "Complete documentation of Bitcoin Script operations and examples",
                        type: "documentation",
                        url: "#",
                        difficulty: "intermediate",
                        author: "Bitcoin Core",
                        duration: 45,
                        tags: ["documentation", "script", "reference"]
                    },
                    {
                        id: "video-2",
                        title: "Understanding Bitcoin Script Execution",
                        description:
                            "Step-by-step video guide to Bitcoin Script execution and stack operations",
                        type: "video",
                        url: "#",
                        duration: 20,
                        difficulty: "beginner",
                        author: "Bitcoin Academy"
                    },
                    {
                        id: "tool-2",
                        title: "Bitcoin Script Debugger",
                        description:
                            "Interactive tool for testing and debugging Bitcoin Scripts",
                        type: "tool",
                        url: "#",
                        difficulty: "advanced",
                        author: "Bitcoin Tools"
                    }
                ]
            },
            {
                weekNumber: 3,
                topic: "Pay to Public Key (P2PK)",
                topicSlug: weeklyTopics.week3.mainTopic,
                description:
                    "Study the earliest and simplest form of Bitcoin transactions - Pay to Public Key (P2PK). Analyze historical transactions, understand the role of public key cryptography, and learn why this script type was eventually superseded.",
                resources: [
                    {
                        id: 1,
                        title: "P2PK Introduction",
                        link: "p2pk",
                        parentTopic: "p2pk"
                    },
                    {
                        id: 2,
                        title: "Problems with P2PK",
                        link: "p2pk-problems",
                        parentTopic: "p2pk"
                    },
                    {
                        id: 3,
                        title: "P2PK Exercise 1",
                        link: "p2pk-exercise1",
                        parentTopic: "p2pk"
                    },
                    {
                        id: 4,
                        title: "P2PK Exercise 2",
                        link: "p2pk-exercise2",
                        parentTopic: "p2pk"
                    },
                    {
                        id: 4,
                        title: "P2PK Exercise 3",
                        link: "p2pk-exercise3",
                        parentTopic: "p2pk"
                    }
                ],
                questions: distributeQuestionsToGroups([
                    {
                        text: "Explain how P2PK works in Bitcoin and analyze the first P2PK transaction in block 170",
                        relatedMaterial: "/decoding/p2pk"
                    },
                    {
                        text: "What are the main problems with P2PK and why was it eventually replaced?",
                        relatedMaterial: "/decoding/p2pk-problems"
                    },
                    {
                        text: "Compare compressed and uncompressed public keys in P2PK transactions. Why did Satoshi use uncompressed keys?",
                        relatedMaterial: "/decoding/p2pk"
                    },
                    {
                        text: "Describe the process of validating a P2PK transaction using Bitcoin's Script language",
                        relatedMaterial: "/decoding/p2pk"
                    },
                    {
                        text: "How does the stack-based execution model work in P2PK script validation?",
                        relatedMaterial: "/decoding/p2pk"
                    },
                    {
                        text: "What security considerations should be taken into account when using P2PK scripts?",
                        relatedMaterial: "/decoding/p2pk-problems"
                    }
                ]),
                weeklyCall: {
                    date: "2024-12-06T12:00:00Z", // 7PM WIB
                    discordLink: "https://discord.gg/6XPJ96sCY4",
                    time: {
                        hour: 20, // 8 PM
                        minute: 0,
                        timeZone: "Asia/Makassar" // Bali timezone
                    },
                    description: weeklyCallDescription
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "fernandobernardz" },
                    { groupId: 2, deputyName: "sayf_001" }
                ],
                additionalResources: [
                    {
                        id: "doc-3",
                        title: "Bitcoin Script Reference Guide",
                        description:
                            "Complete documentation of Bitcoin Script operations and examples",
                        type: "documentation",
                        url: "#",
                        difficulty: "intermediate",
                        author: "Bitcoin Core",
                        duration: 45,
                        tags: ["documentation", "script", "reference"]
                    },
                    {
                        id: "video-3",
                        title: "Understanding Bitcoin Script Execution",
                        description:
                            "Step-by-step video guide to Bitcoin Script execution and stack operations",
                        type: "video",
                        url: "#",
                        duration: 20,
                        difficulty: "beginner",
                        author: "Bitcoin Academy"
                    },
                    {
                        id: "tool-3",
                        title: "Bitcoin Script Debugger",
                        description:
                            "Interactive tool for testing and debugging Bitcoin Scripts",
                        type: "tool",
                        url: "#",
                        difficulty: "advanced",
                        author: "Bitcoin Tools"
                    }
                ]
            },
            {
                weekNumber: 4,
                topic: "Pay to Public Key Hash (P2PKH)",
                topicSlug: weeklyTopics.week4.mainTopic,
                description:
                    "Examine the most common historical Bitcoin script type - P2PKH. Learn about the benefits of hashing public keys, improved privacy features, and analyze real-world transactions including the famous Bitcoin pizza transaction.",
                resources: [
                    {
                        id: 1,
                        title: "P2PKH Introduction",
                        link: "5-p2pkh",
                        parentTopic: "5-p2pkh"
                    },
                    {
                        id: 2,
                        title: "P2PKH Exercise 1",
                        link: "p2pkh-exercise1",
                        parentTopic: "5-p2pkh"
                    },
                    {
                        id: 3,
                        title: "P2PKH Exercise 2",
                        link: "p2pkh-exercise2",
                        parentTopic: "5-p2pkh"
                    }
                ],
                questions: distributeQuestionsToGroups([
                    {
                        text: "Explain how P2PKH works and analyze the famous 10,000 BTC pizza transaction",
                        relatedMaterial: "5-p2pkh"
                    },
                    {
                        text: "What are the key benefits of P2PKH over P2PK? Discuss privacy and security advantages",
                        relatedMaterial: "5-p2pkh"
                    },
                    {
                        text: "How does the public key hashing process work in P2PKH, and why is it important?",
                        relatedMaterial: "5-p2pkh"
                    },
                    {
                        text: "Describe the structure of a P2PKH script and explain how it's validated",
                        relatedMaterial: "5-p2pkh"
                    },
                    {
                        text: "How does quantum resistance factor into P2PKH's security model?",
                        relatedMaterial: "5-p2pkh"
                    },
                    {
                        text: "Compare the script execution process between P2PKH and P2PK transactions",
                        relatedMaterial: "5-p2pkh"
                    }
                ]),
                weeklyCall: {
                    date: "2024-12-13T12:00:00Z", // 7PM WIB
                    discordLink: "https://discord.gg/6XPJ96sCY4",
                    time: {
                        hour: 20, // 8 PM
                        minute: 0,
                        timeZone: "Asia/Makassar" // Bali timezone
                    },
                    description: weeklyCallDescription
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "hapdul_" },
                    { groupId: 2, deputyName: "sunnygoh" }
                ],
                additionalResources: [
                    {
                        id: "doc-4",
                        title: "Bitcoin Script Reference Guide",
                        description:
                            "Complete documentation of Bitcoin Script operations and examples",
                        type: "documentation",
                        url: "#",
                        difficulty: "intermediate",
                        author: "Bitcoin Core",
                        duration: 45,
                        tags: ["documentation", "script", "reference"]
                    },
                    {
                        id: "video-4",
                        title: "Understanding Bitcoin Script Execution",
                        description:
                            "Step-by-step video guide to Bitcoin Script execution and stack operations",
                        type: "video",
                        url: "#",
                        duration: 20,
                        difficulty: "beginner",
                        author: "Bitcoin Academy"
                    },
                    {
                        id: "tool-4",
                        title: "Bitcoin Script Debugger",
                        description:
                            "Interactive tool for testing and debugging Bitcoin Scripts",
                        type: "tool",
                        url: "#",
                        difficulty: "advanced",
                        author: "Bitcoin Tools"
                    }
                ]
            },
            {
                weekNumber: 5,
                topic: "Pay to Script Hash (P2SH)",
                topicSlug: weeklyTopics.week5.mainTopic,
                description:
                    "Understand how P2SH revolutionized Bitcoin's scripting capabilities by allowing complex redemption conditions to be hidden in a hash. Learn about script composition, validation rules, and the flexibility P2SH brought to Bitcoin.",
                resources: [
                    {
                        id: 1,
                        title: "P2SH Introduction",
                        link: "p2sh",
                        parentTopic: "p2sh"
                    },
                    {
                        id: 2,
                        title: "P2SH Exercise 1",
                        link: "p2sh-exercise",
                        parentTopic: "p2sh"
                    },
                    {
                        id: 3,
                        title: "P2SH Exercise 2",
                        link: "p2sh-exercise",
                        parentTopic: "p2sh"
                    }
                ],
                questions: distributeQuestionsToGroups([
                    {
                        text: "Analyze the first P2SH transaction in Bitcoin's history. What makes it significant?",
                        relatedMaterial: "p2sh"
                    },
                    {
                        text: "How does P2SH improve upon earlier Bitcoin script types? Discuss its advantages",
                        relatedMaterial: "p2sh"
                    },
                    {
                        text: "Explain the process of creating and validating a P2SH transaction",
                        relatedMaterial: "p2sh"
                    },
                    {
                        text: "How are P2SH addresses generated? Describe the step-by-step process",
                        relatedMaterial: "p2sh"
                    },
                    {
                        text: "Compare the script execution process between P2SH and P2PKH transactions",
                        relatedMaterial: "p2sh"
                    },
                    {
                        text: "What role does the redeem script play in P2SH, and how is it validated?",
                        relatedMaterial: "p2sh"
                    }
                ]),
                weeklyCall: {
                    date: "2024-12-27T12:00:00Z", // 7PM WIB
                    discordLink: "https://discord.gg/6XPJ96sCY4",
                    time: {
                        hour: 20, // 8 PM
                        minute: 0,
                        timeZone: "Asia/Makassar" // Bali timezone
                    },
                    description: weeklyCallDescription
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "sernyi" },
                    { groupId: 2, deputyName: "BangZet" }
                ],
                additionalResources: [
                    {
                        id: "doc-5",
                        title: "Bitcoin Script Reference Guide",
                        description:
                            "Complete documentation of Bitcoin Script operations and examples",
                        type: "documentation",
                        url: "#",
                        difficulty: "intermediate",
                        author: "Bitcoin Core",
                        duration: 45,
                        tags: ["documentation", "script", "reference"]
                    },
                    {
                        id: "video-5",
                        title: "Understanding Bitcoin Script Execution",
                        description:
                            "Step-by-step video guide to Bitcoin Script execution and stack operations",
                        type: "video",
                        url: "#",
                        duration: 20,
                        difficulty: "beginner",
                        author: "Bitcoin Academy"
                    },
                    {
                        id: "tool-5",
                        title: "Bitcoin Script Debugger",
                        description:
                            "Interactive tool for testing and debugging Bitcoin Scripts",
                        type: "tool",
                        url: "#",
                        difficulty: "advanced",
                        author: "Bitcoin Tools"
                    }
                ]
            },
            {
                weekNumber: 6,
                topic: "Pay to MultiSig (P2MS)",
                topicSlug: weeklyTopics.week6.mainTopic,
                description:
                    "Explore multi-signature scripts in Bitcoin, both in their bare form and wrapped in P2SH. Learn about threshold signatures, key management considerations, and how multisig enhances Bitcoin's security model.",
                resources: [
                    {
                        id: 1,
                        title: "P2MS Introduction",
                        link: "p2ms",
                        parentTopic: "p2ms"
                    },
                    {
                        id: 2,
                        title: "P2MS Exercise 1",
                        link: "p2ms-exercise",
                        parentTopic: "p2ms"
                    },
                    {
                        id: 3,
                        title: "P2MS Exercise 2",
                        link: "p2ms-exercise",
                        parentTopic: "p2ms"
                    }
                ],
                questions: distributeQuestionsToGroups([
                    {
                        text: "Explain the difference between bare P2MS and P2SH-wrapped multisig. What are the advantages of each?",
                        relatedMaterial: "p2ms"
                    },
                    {
                        text: "What are the standardness rules for P2MS transactions and how do they differ from validity rules?",
                        relatedMaterial: "p2ms"
                    },
                    {
                        text: "Why is OP_0 used in P2MS ScriptSig and what is the 'off-by-one' bug?",
                        relatedMaterial: "p2ms"
                    },
                    {
                        text: "How does signature order affect P2MS script execution efficiency?",
                        relatedMaterial: "p2ms"
                    },
                    {
                        text: "Compare the structure of P2MS locking and unlocking scripts. How do they work together?",
                        relatedMaterial: "p2ms"
                    },
                    {
                        text: "What are the practical limitations of P2MS and how can they be overcome?",
                        relatedMaterial: "p2ms"
                    }
                ]),
                weeklyCall: {
                    date: "2025-01-03T12:00:00Z", // 7PM WIB
                    discordLink: "https://discord.gg/6XPJ96sCY4",
                    time: {
                        hour: 20, // 8 PM
                        minute: 0,
                        timeZone: "Asia/Makassar" // Bali timezone
                    },
                    description: weeklyCallDescription
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "fighterleslie" },
                    { groupId: 2, deputyName: "basnugroho" }
                ],
                additionalResources: [
                    {
                        id: "doc-6",
                        title: "Bitcoin Script Reference Guide",
                        description:
                            "Complete documentation of Bitcoin Script operations and examples",
                        type: "documentation",
                        url: "#",
                        difficulty: "intermediate",
                        author: "Bitcoin Core",
                        duration: 45,
                        tags: ["documentation", "script", "reference"]
                    },
                    {
                        id: "video-6",
                        title: "Understanding Bitcoin Script Execution",
                        description:
                            "Step-by-step video guide to Bitcoin Script execution and stack operations",
                        type: "video",
                        url: "#",
                        duration: 20,
                        difficulty: "beginner",
                        author: "Bitcoin Academy"
                    },
                    {
                        id: "tool-6",
                        title: "Bitcoin Script Debugger",
                        description:
                            "Interactive tool for testing and debugging Bitcoin Scripts",
                        type: "tool",
                        url: "#",
                        difficulty: "advanced",
                        author: "Bitcoin Tools"
                    }
                ]
            },
            {
                weekNumber: 7,
                topic: "Taproot Basics",
                topicSlug: weeklyTopics.week7.mainTopic,
                description:
                    "Begin your journey into Bitcoin's latest script upgrade - Taproot. Learn about Schnorr signatures, tagged hashes, and the fundamental building blocks that enable improved privacy and scalability in Bitcoin.",
                resources: [
                    {
                        id: 1,
                        title: "Taproot Introduction",
                        link: "taproot",
                        parentTopic: "taproot"
                    },
                    {
                        id: 2,
                        title: "Tagged Hashes",
                        link: "tagged-hashes",
                        parentTopic: "taproot"
                    },
                    {
                        id: 3,
                        title: "Schnorr Signatures",
                        link: "schnorr-signature",
                        parentTopic: "taproot"
                    },
                    {
                        id: 4,
                        title: "Nonce Reuse Attack",
                        link: "nonce-reuse-attack",
                        parentTopic: "taproot"
                    }
                ],
                questions: distributeQuestionsToGroups([
                    {
                        text: "Explain the purpose of Tagged Hashes in Taproot and how they prevent cross-protocol attacks",
                        relatedMaterial: "tagged-hashes"
                    },
                    {
                        text: "How do Schnorr signatures improve upon ECDSA signatures? Discuss their advantages",
                        relatedMaterial: "schnorr-signature"
                    },
                    {
                        text: "What is the significance of the 'even Y-coordinate' requirement in BIP340?",
                        relatedMaterial: "schnorr-signature"
                    },
                    {
                        text: "Describe the process of generating and verifying a Schnorr signature",
                        relatedMaterial: "schnorr-signature"
                    },
                    {
                        text: "Why is nonce reuse dangerous in Schnorr signatures? Explain the potential attacks",
                        relatedMaterial: "nonce-reuse-attack"
                    },
                    {
                        text: "How does Taproot improve Bitcoin's privacy and scalability?",
                        relatedMaterial: "taproot"
                    }
                ]),
                weeklyCall: {
                    date: "2025-01-10T12:00:00Z", // 7PM WIB
                    discordLink: "https://discord.gg/6XPJ96sCY4",
                    time: {
                        hour: 20, // 8 PM
                        minute: 0,
                        timeZone: "Asia/Makassar" // Bali timezone
                    },
                    description: weeklyCallDescription
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "Olanma" },
                    { groupId: 2, deputyName: "future5962" }
                ],
                additionalResources: [
                    {
                        id: "doc-7",
                        title: "Bitcoin Script Reference Guide",
                        description:
                            "Complete documentation of Bitcoin Script operations and examples",
                        type: "documentation",
                        url: "#",
                        difficulty: "intermediate",
                        author: "Bitcoin Core",
                        duration: 45,
                        tags: ["documentation", "script", "reference"]
                    },
                    {
                        id: "video-7",
                        title: "Understanding Bitcoin Script Execution",
                        description:
                            "Step-by-step video guide to Bitcoin Script execution and stack operations",
                        type: "video",
                        url: "#",
                        duration: 20,
                        difficulty: "beginner",
                        author: "Bitcoin Academy"
                    },
                    {
                        id: "tool-7",
                        title: "Bitcoin Script Debugger",
                        description:
                            "Interactive tool for testing and debugging Bitcoin Scripts",
                        type: "tool",
                        url: "#",
                        difficulty: "advanced",
                        author: "Bitcoin Tools"
                    }
                ]
            },
            {
                weekNumber: 8,
                topic: "Taproot Advanced",
                topicSlug: weeklyTopics.week8.mainTopic,
                description:
                    "Deep dive into advanced Taproot concepts including MuSig, key aggregation, and taptweak operations. Understand how these components work together to create more efficient and private Bitcoin transactions.",
                resources: [
                    {
                        id: 1,
                        title: "Taproot Introduction",
                        link: "taproot",
                        parentTopic: "taproot"
                    },
                    {
                        id: 2,
                        title: "Tagged Hashes",
                        link: "tagged-hashes",
                        parentTopic: "taproot"
                    },
                    {
                        id: 3,
                        title: "Schnorr Signatures",
                        link: "schnorr-signature",
                        parentTopic: "taproot"
                    },
                    {
                        id: 4,
                        title: "Nonce Reuse Attack",
                        link: "nonce-reuse-attack",
                        parentTopic: "taproot"
                    }
                ],
                questions: distributeQuestionsToGroups([
                    {
                        text: "Explain the purpose of Tagged Hashes in Taproot and how they prevent cross-protocol attacks",
                        relatedMaterial: "tagged-hashes"
                    },
                    {
                        text: "How do Schnorr signatures improve upon ECDSA signatures? Discuss their advantages",
                        relatedMaterial: "schnorr-signature"
                    },
                    {
                        text: "What is the significance of the 'even Y-coordinate' requirement in BIP340?",
                        relatedMaterial: "schnorr-signature"
                    },
                    {
                        text: "Describe the process of generating and verifying a Schnorr signature",
                        relatedMaterial: "schnorr-signature"
                    },
                    {
                        text: "Why is nonce reuse dangerous in Schnorr signatures? Explain the potential attacks",
                        relatedMaterial: "nonce-reuse-attack"
                    },
                    {
                        text: "How does Taproot improve Bitcoin's privacy and scalability?",
                        relatedMaterial: "taproot"
                    }
                ]),
                weeklyCall: {
                    date: "2025-01-17T12:00:00Z", // 7PM WIB
                    discordLink: "https://discord.gg/6XPJ96sCY4",
                    time: {
                        hour: 20, // 8 PM
                        minute: 0,
                        timeZone: "Asia/Makassar" // Bali timezone
                    },
                    description: weeklyCallDescription
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "Olanma" },
                    { groupId: 2, deputyName: "future5962" }
                ],
                additionalResources: [
                    {
                        id: "doc-8",
                        title: "Bitcoin Script Reference Guide",
                        description:
                            "Complete documentation of Bitcoin Script operations and examples",
                        type: "documentation",
                        url: "#",
                        difficulty: "intermediate",
                        author: "Bitcoin Core",
                        duration: 45,
                        tags: ["documentation", "script", "reference"]
                    },
                    {
                        id: "video-8",
                        title: "Understanding Bitcoin Script Execution",
                        description:
                            "Step-by-step video guide to Bitcoin Script execution and stack operations",
                        type: "video",
                        url: "#",
                        duration: 20,
                        difficulty: "beginner",
                        author: "Bitcoin Academy"
                    },
                    {
                        id: "tool-8",
                        title: "Bitcoin Script Debugger",
                        description:
                            "Interactive tool for testing and debugging Bitcoin Scripts",
                        type: "tool",
                        url: "#",
                        difficulty: "advanced",
                        author: "Bitcoin Tools"
                    }
                ]
            }
        ],
        totalAlumni: 0,
        nextCohortDate: "2025-01-15"
    }
]

export type CohortStatus = "in-progress" | "starting-soon" | "completed"

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
    const community = communitiesData.find((c) => c.id === id)
    if (!community) return undefined

    const status = getCohortStatus(
        community.currentCohort.startDate,
        community.currentCohort.endDate
    )

    return {
        ...community,
        currentCohort: {
            ...community.currentCohort,
            status,
            progress: calculateCohortProgress(community)
        }
    }
}

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
    const diffTime = now.getTime() - start.getTime()
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7)) + 1

    if (diffWeeks < 1) return 1
    if (diffWeeks > community.weeklyData.length)
        return community.weeklyData.length
    return diffWeeks
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
