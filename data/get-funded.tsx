/**
 * Content for the get-funded page, transcribed from the "funding - 8" Figma PDF.
 * The PDF spells Maelstrom "Maelstorm"; kept correct here.
 */

export type FundingOrgDetail = {
    name: string
    /** path under /public, or undefined to show a text fallback */
    logo?: string
    logoHover?: string
    logoWidth?: number
    logoHeight?: number
    focus: string
    scope: string
    bullets: string[]
    url: string
}

export const FUNDING_ORGS: FundingOrgDetail[] = [
    {
        name: "Brink",
        logo: "/images/get-funded/brink.webp",
        logoHover: "/images/get-funded/brink-hover.webp",
        logoWidth: 319,
        logoHeight: 120,
        focus: "Securing, testing, reviewing, & maintaining node software",
        scope: "Global",
        bullets: [
            "501(c)(3) nonprofit funding bitcoin development since 2020",
            "Primarily supports work on the base protocol",
            "Also funds research on scalability, usability, and Layer 2 (i.e. Lightning)",
            "Physical office in London",
            "Grants available for either remote or onsite work"
        ],
        url: "https://brink.dev/programs"
    },
    {
        name: "Spiral",
        logo: "/images/get-funded/spiral.webp",
        logoHover: "/images/get-funded/spiral-hover.webp",
        logoWidth: 106,
        logoHeight: 120,
        focus: "Bitcoin & open-source innovation",
        scope: "Global",
        bullets: [
            "Bitcoin R&D initiative by Block",
            "Full time grants paid in BTC",
            "Open to individuals and teams",
            "Projects must be free and open source",
            "Projects cannot have a business or profit motive"
        ],
        url: "https://spiral.xyz/#grants"
    },
    {
        name: "OpenSats",
        logo: "/images/get-funded/open-sats.webp",
        logoHover: "/images/get-funded/open-sats-hover.webp",
        logoWidth: 185,
        logoHeight: 120,
        focus: "FOSS, decentralization",
        scope: "Global",
        bullets: [
            "501(c)(3) nonprofit funding since 2021",
            "Strong emphasis on free and open-source software (FOSS)",
            "Supports projects that improve bitcoin's security, accessibility, and decentralization",
            "Grants have flexible funding amounts and duration",
            "Transparent, multi-step grant selection process",
            "$34.9M+ awarded across 401+ grants in 40+ countries (as of 6/2026)"
        ],
        url: "https://opensats.org/apply"
    },
    {
        name: "Btrust",
        logo: "/images/get-funded/btrust.webp",
        logoHover: "/images/get-funded/btrust-hover.webp",
        logoWidth: 280,
        logoHeight: 120,
        focus: "Builders in the Global South",
        scope: "Africa, India, LATAM, MENA, Southeast Asia",
        bullets: [
            "Established in 2021 with a generous founding donation from Jack Dorsey and Jay-Z",
            "Focused on Africa and regions of the global south where bitcoin development is less common",
            "Starter Grants: 6-months of funding for new contributors",
            "Btrust Open-Source Cohort: Long-term grants with mentorship & peer support",
            "Long term grants have a team like structure that includes training, management, and project relations"
        ],
        url: "https://www.btrust.tech/grants"
    },
    {
        name: "HRF (Human Rights Foundation)",
        logo: "/images/get-funded/hrf.webp",
        logoHover: "/images/get-funded/hrf-hover.webp",
        logoWidth: 162,
        logoHeight: 120,
        focus: "Freedom tech, censorship resistance",
        scope: "Global",
        bullets: [
            "Nonpartisan, nonprofit promoting and protecting human rights globally",
            "Mission driven. Focused on making bitcoin a powerful tool for human rights defenders operating in challenging political environments",
            "Funds developers, activists, educators, UI/UX designers, and community builders",
            "Looking for projects with real world impact that empower everyday citizens to use uncensorable money in their struggle for democracy",
            "Funding bitcoin projects since 2020. $8.5M+ awarded across 280+ grants (as of 6/2026)"
        ],
        url: "https://hrf.org/devfund/"
    },
    {
        name: "Maelstrom",
        logo: "/images/get-funded/maelstrom.webp",
        logoHover: "/images/get-funded/maelstrom-hover.webp",
        logoWidth: 695,
        logoHeight: 120,
        focus: "Bitcoin development",
        scope: "Global",
        bullets: [
            "12-month grants with monthly payments in bitcoin",
            "$50K–$150K per developer",
            "Grant stacking permitted (up to $400K/year cap)",
            "Includes interview process before approval",
            "Wholly funded by Maelstrom, the family office of Arthur Hayes"
        ],
        url: "https://maelstrom.fund/bitcoin-grant-program/"
    },
    {
        name: "Vinteum",
        logo: "/images/get-funded/vinteum.webp",
        logoHover: "/images/get-funded/vinteum-hover.webp",
        logoWidth: 676,
        logoHeight: 120,
        focus: "Brazilian bitcoin developers",
        scope: "Brazil & the wider Latin American region",
        bullets: [
            "Nonprofit research and development center focused on growing bitcoin dev talent in Brazil",
            "Invests in people at all stages, not just those already proven",
            "In-person workshops, meetups, and retreats",
            "1-year grants for established Brazilian developers"
        ],
        url: "https://vinteum.org/"
    },
    {
        name: "Bitcoin Dev Kit Foundation",
        logo: "/images/get-funded/bdk.webp",
        logoHover: "/images/get-funded/bdk-hover.webp",
        logoWidth: 117,
        logoHeight: 120,
        focus: "Contributors to Bitcoin Dev Kit",
        scope: "Global",
        bullets: [
            "Supports contributors working on the BDK suite of libraries and supporting projects",
            "Offers both part-time and full-time grants",
            "Project based grants that do not necessarily need to be coding. They could be research, testing, docs, etc."
        ],
        url: "https://bitcoindevkit.org/foundation/grants"
    }
]

export type ChecklistLink = {
    text: string
    url: string
}

export type ChecklistItem = {
    label: string
    links?: ChecklistLink[]
    children?: { label: string; links?: ChecklistLink[] }[]
}

export const FUNDING_CHECKLIST: ChecklistItem[] = [
    {
        label: "Join a study group to solidify your knowledge (Bitshala, Code Orange, Btrust, and B4OS are all great)",
        links: [
            { text: "Bitshala", url: "https://bitshala.org/cohorts/" },
            { text: "Code Orange", url: "https://codeorange.dev/" },
            { text: "Btrust", url: "https://pathways.btrust.tech/" },
            { text: "B4OS", url: "https://b4os.dev/" }
        ]
    },
    {
        label: "Explore projects in the BOSS ecosystem. Read the documentation, run them locally, review some PRs.",
        links: [
            { text: "BOSS ecosystem", url: "https://bitcoindevs.xyz/projects" }
        ]
    },
    {
        label: "Build your network",
        children: [
            {
                label: "Attend a local BitDevs meetup. Don't have one in your city? Start one!",
                links: [{ text: "BitDevs", url: "https://bitdevs.org/cities" }]
            },
            { label: "Attend conferences and events" },
            {
                label: "Find some local bitcoiners or devs and start your own meetup"
            },
            {
                label: "Follow projects and people you're interested in on GitHub and social media"
            }
        ]
    },
    {
        label: "Decide what you want to work on. Here are things to consider:",
        children: [
            { label: "What areas of bitcoin excite you most?" },
            {
                label: "Are there any projects you find particularly interesting?"
            },
            { label: "What can you offer with the skills you already have?" },
            { label: "What knowledge gaps do you need to fill?" }
        ]
    },
    {
        label: "By this point you will have met some people along your journey. Share your goals and ask them if you’re heading in the right direction."
    },
    {
        label: "Learn about funding organizations and what you want in a grant"
    }
]

export type ResourceLink = {
    name: string
    detail?: string
    url: string
}

export const WORKSPACES: ResourceLink[] = [
    {
        name: "Chaincode Labs",
        detail: "New York City",
        url: "https://chaincode.com/"
    },
    { name: "Brink", detail: "London", url: "https://brink.dev/" },
    { name: "2140", detail: "Amsterdam", url: "https://2140.dev/" },
    {
        name: "Localhost Research",
        detail: "San Francisco Bay Area",
        url: "https://lclhost.org/"
    }
]

export const CROWDFUNDING: ResourceLink[] = [
    { name: "Geyser", url: "https://geyser.fund/" },
    { name: "Bitcoin Development Portal", url: "https://bitcoindevlist.com/" }
]
