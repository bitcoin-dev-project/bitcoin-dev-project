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

// Define weekly topics structure without relying on contentlayer
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
    },
    week4: {
        mainTopic: "pay-to-public-key-p2pk",
        resources: [
            "p2pk-introduction",
            "problems-with-p2pk",
            "p2pk-exercise1",
            "p2pk-exercise2"
        ]
    },
    week5: {
        mainTopic: "pay-to-public-key-p2pkh",
        resources: [
            "5-p2pkh-introduction",
            "5-1-p2pkh-exercise1",
            "5-2-p2pkh-exercise2"
        ]
    },
    week6: {
        mainTopic: "pay-to-script-hash-p2sh",
        resources: [
            "6-p2sh-introduction",
            "6-1-p2sh-exercise",
            "6-2-p2sh-exercise"
        ]
    },
    week7: {
        mainTopic: "pay-to-multisig-p2ms",
        resources: [
            "7-p2ms-introduction",
            "7-1-p2ms-exercise",
            "7-2-p2ms-exercise"
        ]
    },
    week8: {
        mainTopic: "taproot",
        resources: [
            "taproot",
            "tagged-hashes",
            "schnorr-signature",
            "nonce-reuse-attack"
        ]
    }
} as const

// Mock topics data to replace contentlayer dependency
const mockTopics = {
    "bitcoin-history": {
        slug: "bitcoin-history",
        title: "History of Bitcoin",
        category: "Course",
        parent: null
    },
    "3-1-overview-stack": {
        slug: "3-1-overview-stack",
        title: "Stack Overview",
        category: "Course",
        parent: "3-overview"
    },
    "3-2-overview-opcodes": {
        slug: "3-2-overview-opcodes",
        title: "Bitcoin Opcodes",
        category: "Course",
        parent: "3-overview"
    },
    "3-3-overview-locking-unlocking": {
        slug: "3-3-overview-locking-unlocking",
        title: "Locking and Unlocking Scripts",
        category: "Course",
        parent: "3-overview"
    },
    "4-0-p2pk-problems": {
        slug: "4-0-p2pk-problems",
        title: "P2PK Problems",
        category: "Course",
        parent: "4-p2pk"
    },
    "4-1-p2pk-exercise1": {
        slug: "4-1-p2pk-exercise1",
        title: "P2PK Exercise 1",
        category: "Exercise",
        parent: "4-p2pk"
    }
}

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
            startDate: "2024-11-22",
            endDate: "2025-01-17",
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
                    "Understand Bitcoin's scripting language purpose",
                    "Learn basic stack operations and script execution",
                    "Explore transaction validation process",
                    "Practice simple script debugging"
                ],
                resources: [
                    {
                        id: 1,
                        title: "Introduction to Bitcoin Script",
                        type: "Course",
                        link: "1-introduction",
                        completed: false,
                        parentTopic: "1-introduction"
                    },
                    {
                        id: 2,
                        title: "Script Execution Model",
                        type: "Course",
                        link: "1-1-script-execution",
                        completed: false,
                        parentTopic: "1-introduction"
                    },
                    {
                        id: 3,
                        title: "Basic Script Operations",
                        type: "Exercise",
                        link: "1-2-basic-operations",
                        completed: false,
                        parentTopic: "1-introduction"
                    }
                ],
                questions: distributeQuestionsToGroups([
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
                    },
                    {
                        text: "How does Bitcoin validate transactions using Script?",
                        relatedMaterial: "1-introduction"
                    },
                    {
                        text: "What are the limitations of Bitcoin Script and why do they exist?",
                        relatedMaterial: "1-introduction"
                    },
                    {
                        text: "Demonstrate how to debug a simple Bitcoin Script execution",
                        relatedMaterial: "1-2-basic-operations"
                    }
                ]),
                weeklyCall: {
                    date: "2024-11-22T12:00:00Z", // 7PM WIB
                    discordLink: "https://discord.gg/week1"
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "Alice" },
                    { groupId: 2, deputyName: "Bob" }
                ]
            },
            {
                weekNumber: 2,
                topic: "Bitcoin History",
                topicSlug: weeklyTopics.week2.mainTopic,
                objectives: [
                    "Understand Bitcoin's early development (2007-2010)",
                    "Learn about key protocol upgrades and releases",
                    "Study important transitions in Bitcoin's governance",
                    "Explore significant technical milestones"
                ],
                resources: [
                    {
                        id: 1,
                        title: "Bitcoin History",
                        type: "Course",
                        link: "bitcoin-history",
                        completed: false,
                        parentTopic: "bitcoin-history"
                    }
                ],
                questions: distributeQuestionsToGroups([
                    {
                        text: "Describe Bitcoin's development timeline from Satoshi's first work in 2007 to the release of v0.1 in 2009",
                        relatedMaterial: "bitcoin-history"
                    },
                    {
                        text: "What was the significance of the first consensus change in Bitcoin v0.3.3? How did it affect chain selection?",
                        relatedMaterial: "bitcoin-history"
                    },
                    {
                        text: "Explain the transition of leadership from Satoshi to Gavin and the impact of new contributors in 2011",
                        relatedMaterial: "bitcoin-history"
                    },
                    {
                        text: "Compare the different proposals for P2SH (OP_EVAL, P2SH, OP_CHV). Why was P2SH chosen?",
                        relatedMaterial: "bitcoin-history"
                    },
                    {
                        text: "What were the major technical improvements between Bitcoin-Qt v0.5 and Bitcoin Core v0.8?",
                        relatedMaterial: "bitcoin-history"
                    },
                    {
                        text: "Discuss the evolution of Bitcoin's development funding, from the Bitcoin Foundation to modern grant programs",
                        relatedMaterial: "bitcoin-history"
                    }
                ]),
                weeklyCall: {
                    date: "2024-11-29T12:00:00Z", // 7PM WIB
                    discordLink: "https://discord.gg/week2"
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "Citra" },
                    { groupId: 2, deputyName: "Farah" }
                ]
            },
            {
                weekNumber: 3,
                topic: "Script Overview",
                topicSlug: weeklyTopics.week3.mainTopic,
                objectives: [
                    "Understand Bitcoin's stack-based execution model",
                    "Learn common Bitcoin Script opcodes",
                    "Master locking and unlocking scripts",
                    "Differentiate between standard and non-standard scripts"
                ],
                resources: [
                    {
                        id: 1,
                        title: "Stack Operations",
                        type: "Course",
                        link: "3-1-overview-stack",
                        completed: false,
                        parentTopic: "3-overview"
                    },
                    {
                        id: 2,
                        title: "Bitcoin Opcodes",
                        type: "Course",
                        link: "3-2-overview-opcodes",
                        completed: false,
                        parentTopic: "3-overview"
                    },
                    {
                        id: 3,
                        title: "Locking & Unlocking Scripts",
                        type: "Course",
                        link: "3-3-overview-locking-unlocking",
                        completed: false,
                        parentTopic: "3-overview"
                    },
                    {
                        id: 4,
                        title: "Script Success and Failure",
                        type: "Course",
                        link: "3-4-overview-script-success-failure",
                        completed: false,
                        parentTopic: "3-overview"
                    },
                    {
                        id: 5,
                        title: "Standard & Non-Standard Scripts",
                        type: "Course",
                        link: "3-5-overview-standard-nonstandard",
                        completed: false,
                        parentTopic: "3-overview"
                    }
                ],
                questions: distributeQuestionsToGroups([
                    {
                        text: "Explain how stack operations work in Bitcoin Script and provide an example of OP_ADD execution",
                        relatedMaterial: "/decoding/3-1-overview-stack"
                    },
                    {
                        text: "What are the main categories of Bitcoin opcodes and their purposes?",
                        relatedMaterial: "/decoding/3-2-overview-opcodes"
                    },
                    {
                        text: "Describe the relationship between locking and unlocking scripts in Bitcoin transactions",
                        relatedMaterial:
                            "/decoding/3-3-overview-locking-unlocking"
                    },
                    {
                        text: "What determines script success or failure in Bitcoin? Explain the validation rules",
                        relatedMaterial:
                            "/decoding/3-4-overview-script-success-failure"
                    },
                    {
                        text: "Compare standard and non-standard scripts in Bitcoin. How are they handled by the network?",
                        relatedMaterial:
                            "/decoding/3-5-overview-standard-nonstandard"
                    },
                    {
                        text: "What is the IsStandard() function and how does it affect transaction relay policies?",
                        relatedMaterial:
                            "/decoding/3-5-overview-standard-nonstandard"
                    }
                ]),
                weeklyCall: {
                    date: "2024-12-06T12:00:00Z", // 7PM WIB
                    discordLink: "https://discord.gg/week3"
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "Andi" },
                    { groupId: 2, deputyName: "Dewi" }
                ]
            },
            {
                weekNumber: 4,
                topic: "Pay to Public Key (P2PK)",
                topicSlug: weeklyTopics.week4.mainTopic,
                objectives: [
                    "Understand P2PK transaction structure",
                    "Learn about locking and unlocking scripts in P2PK",
                    "Identify problems with P2PK",
                    "Practice constructing P2PK ScriptPubKey"
                ],
                resources: [
                    {
                        id: 1,
                        title: "P2PK Introduction",
                        type: "Course",
                        link: "4-p2pk",
                        completed: false,
                        parentTopic: "4-p2pk"
                    },
                    {
                        id: 2,
                        title: "Problems with P2PK",
                        type: "Course",
                        link: "4-0-p2pk-problems",
                        completed: false,
                        parentTopic: "4-p2pk"
                    },
                    {
                        id: 3,
                        title: "P2PK Exercise 1",
                        type: "Exercise",
                        link: "4-1-p2pk-exercise1",
                        completed: false,
                        parentTopic: "4-p2pk"
                    },
                    {
                        id: 4,
                        title: "P2PK Exercise 2",
                        type: "Exercise",
                        link: "4-2-p2pk-exercise2",
                        completed: false,
                        parentTopic: "4-p2pk"
                    }
                ],
                questions: distributeQuestionsToGroups([
                    {
                        text: "Explain how P2PK works in Bitcoin and analyze the first P2PK transaction in block 170",
                        relatedMaterial: "/decoding/4-p2pk"
                    },
                    {
                        text: "What are the main problems with P2PK and why was it eventually replaced?",
                        relatedMaterial: "/decoding/4-0-p2pk-problems"
                    },
                    {
                        text: "Compare compressed and uncompressed public keys in P2PK transactions. Why did Satoshi use uncompressed keys?",
                        relatedMaterial: "/decoding/4-p2pk"
                    },
                    {
                        text: "Describe the process of validating a P2PK transaction using Bitcoin's Script language",
                        relatedMaterial: "/decoding/4-p2pk"
                    },
                    {
                        text: "How does the stack-based execution model work in P2PK script validation?",
                        relatedMaterial: "/decoding/4-p2pk"
                    },
                    {
                        text: "What security considerations should be taken into account when using P2PK scripts?",
                        relatedMaterial: "/decoding/4-0-p2pk-problems"
                    }
                ]),
                weeklyCall: {
                    date: "2024-12-13T12:00:00Z", // 7PM WIB
                    discordLink: "https://discord.gg/week4"
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "Budi" },
                    { groupId: 2, deputyName: "Erik" }
                ]
            },
            {
                weekNumber: 5,
                topic: "Pay to Public Key Hash (P2PKH)",
                topicSlug: weeklyTopics.week5.mainTopic,
                objectives: [
                    "Understand P2PKH transaction structure",
                    "Compare P2PKH advantages over P2PK",
                    "Learn about Bitcoin addresses and public key hashing",
                    "Practice constructing and analyzing P2PKH scripts"
                ],
                resources: [
                    {
                        id: 1,
                        title: "P2PKH Introduction",
                        type: "Course",
                        link: "5-p2pkh",
                        completed: false,
                        parentTopic: "5-p2pkh"
                    },
                    {
                        id: 2,
                        title: "P2PKH Exercise 1",
                        type: "Exercise",
                        link: "5-1-p2pkh-exercise1",
                        completed: false,
                        parentTopic: "5-p2pkh"
                    },
                    {
                        id: 3,
                        title: "P2PKH Exercise 2",
                        type: "Exercise",
                        link: "5-2-p2pkh-exercise2",
                        completed: false,
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
                    date: "2024-12-27T12:00:00Z", // 7PM WIB
                    discordLink: "https://discord.gg/week5"
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "Charlie" },
                    { groupId: 2, deputyName: "Diana" }
                ]
            },
            {
                weekNumber: 6,
                topic: "Pay to Script Hash (P2SH)",
                topicSlug: weeklyTopics.week6.mainTopic,
                objectives: [
                    "Understand P2SH transaction structure",
                    "Learn about redeem scripts and script hashing",
                    "Master P2SH address generation",
                    "Practice constructing P2SH transactions"
                ],
                resources: [
                    {
                        id: 1,
                        title: "P2SH Introduction",
                        type: "Course",
                        link: "6-p2sh",
                        completed: false,
                        parentTopic: "6-p2sh"
                    },
                    {
                        id: 2,
                        title: "P2SH Exercise 1",
                        type: "Exercise",
                        link: "6-1-p2sh-exercise",
                        completed: false,
                        parentTopic: "6-p2sh"
                    },
                    {
                        id: 3,
                        title: "P2SH Exercise 2",
                        type: "Exercise",
                        link: "6-2-p2sh-exercise",
                        completed: false,
                        parentTopic: "6-p2sh"
                    }
                ],
                questions: distributeQuestionsToGroups([
                    {
                        text: "Analyze the first P2SH transaction in Bitcoin's history. What makes it significant?",
                        relatedMaterial: "6-p2sh"
                    },
                    {
                        text: "How does P2SH improve upon earlier Bitcoin script types? Discuss its advantages",
                        relatedMaterial: "6-p2sh"
                    },
                    {
                        text: "Explain the process of creating and validating a P2SH transaction",
                        relatedMaterial: "6-p2sh"
                    },
                    {
                        text: "How are P2SH addresses generated? Describe the step-by-step process",
                        relatedMaterial: "6-p2sh"
                    },
                    {
                        text: "Compare the script execution process between P2SH and P2PKH transactions",
                        relatedMaterial: "6-p2sh"
                    },
                    {
                        text: "What role does the redeem script play in P2SH, and how is it validated?",
                        relatedMaterial: "6-p2sh"
                    }
                ]),
                weeklyCall: {
                    date: "2024-12-27T12:00:00Z", // 7PM WIB
                    discordLink: "https://discord.gg/week6"
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "Frank" },
                    { groupId: 2, deputyName: "Grace" }
                ]
            },
            {
                weekNumber: 7,
                topic: "Pay to MultiSig (P2MS)",
                topicSlug: weeklyTopics.week7.mainTopic,
                objectives: [
                    "Understand P2MS transaction structure",
                    "Learn about bare multisig vs P2SH wrapped multisig",
                    "Master multisig script construction",
                    "Practice signature order optimization"
                ],
                resources: [
                    {
                        id: 1,
                        title: "P2MS Introduction",
                        type: "Course",
                        link: "7-p2ms",
                        completed: false,
                        parentTopic: "7-p2ms"
                    },
                    {
                        id: 2,
                        title: "P2MS Exercise 1",
                        type: "Exercise",
                        link: "7-1-p2ms-exercise",
                        completed: false,
                        parentTopic: "7-p2ms"
                    },
                    {
                        id: 3,
                        title: "P2MS Exercise 2",
                        type: "Exercise",
                        link: "7-2-p2ms-exercise",
                        completed: false,
                        parentTopic: "7-p2ms"
                    }
                ],
                questions: distributeQuestionsToGroups([
                    {
                        text: "Explain the difference between bare P2MS and P2SH-wrapped multisig. What are the advantages of each?",
                        relatedMaterial: "7-p2ms"
                    },
                    {
                        text: "What are the standardness rules for P2MS transactions and how do they differ from validity rules?",
                        relatedMaterial: "7-p2ms"
                    },
                    {
                        text: "Why is OP_0 used in P2MS ScriptSig and what is the 'off-by-one' bug?",
                        relatedMaterial: "7-p2ms"
                    },
                    {
                        text: "How does signature order affect P2MS script execution efficiency?",
                        relatedMaterial: "7-p2ms"
                    },
                    {
                        text: "Compare the structure of P2MS locking and unlocking scripts. How do they work together?",
                        relatedMaterial: "7-p2ms"
                    },
                    {
                        text: "What are the practical limitations of P2MS and how can they be overcome?",
                        relatedMaterial: "7-p2ms"
                    }
                ]),
                weeklyCall: {
                    date: "2025-01-03T12:00:00Z", // 7PM WIB
                    discordLink: "https://discord.gg/week7"
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "Henry" },
                    { groupId: 2, deputyName: "Isabel" }
                ]
            },
            {
                weekNumber: 8,
                topic: "Taproot",
                topicSlug: weeklyTopics.week8.mainTopic,
                objectives: [
                    "Understand Taproot's core components",
                    "Learn about Tagged Hashes and their importance",
                    "Master Schnorr signatures and their benefits",
                    "Explore MAST, MuSig, and TapTweak concepts"
                ],
                resources: [
                    {
                        id: 1,
                        title: "Taproot Introduction",
                        type: "Course",
                        link: "taproot",
                        completed: false,
                        parentTopic: "taproot"
                    },
                    {
                        id: 2,
                        title: "Tagged Hashes",
                        type: "Course",
                        link: "tagged-hashes",
                        completed: false,
                        parentTopic: "taproot"
                    },
                    {
                        id: 3,
                        title: "Schnorr Signatures",
                        type: "Course",
                        link: "schnorr-signature",
                        completed: false,
                        parentTopic: "taproot"
                    },
                    {
                        id: 4,
                        title: "Nonce Reuse Attack",
                        type: "Course",
                        link: "nonce-reuse-attack",
                        completed: false,
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
                    discordLink: "https://discord.gg/week8"
                },
                groupAssignments: [
                    { groupId: 1, deputyName: "Jack" },
                    { groupId: 2, deputyName: "Kelly" }
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
