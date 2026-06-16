/**
 * Content for the get-funded page, transcribed from the "funding - 8" Figma PDF.
 * The PDF spells Maelstrom "Maelstorm"; kept correct here.
 */

export type FundingOrgDetail = {
    name: string
    /** path under /public, or undefined to show a text fallback */
    logo?: string
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
        logoWidth: 319,
        logoHeight: 120,
        focus: "Securing, testing, reviewing, and maintaining node software",
        scope: "Global",
        bullets: [
            "501(c)(3) nonprofit funding bitcoin development since 2020",
            "Primarily supports work on the base protocol",
            "Also funds research on scalability, usability, and Layer 2 (i.e. Lightning)",
            "Physical office in London",
            "Grants available for either remote or onsite work"
        ],
        url: "https://brink.dev/"
    },
    {
        name: "Spiral",
        logo: "/images/get-funded/spiral.webp",
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
        url: "https://spiral.xyz/"
    },
    {
        name: "OpenSats",
        logo: "/images/get-funded/open-sats.webp",
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
        url: "https://opensats.org/"
    },
    {
        name: "Btrust",
        logo: "/images/get-funded/btrust.webp",
        logoWidth: 280,
        logoHeight: 120,
        focus: "Builders in the Global South",
        scope: "Africa, India, LATAM, MENA, Southeast Asia",
        bullets: [
            "Founded with support from Jack Dorsey and Jay-Z",
            "Focuses on underrepresented regions",
            "Starter Grants: 6-month funding for new contributors",
            "BOSC: Long-term grants with mentorship + peer support",
            "Includes training, standups, and community support"
        ],
        url: "https://www.btrust.tech/"
    },
    {
        name: "HRF (Human Rights Foundation)",
        logo: "/images/get-funded/hrf.webp",
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
        url: "https://maelstrom.fund/"
    },
    {
        name: "Vinteum",
        logo: "/images/get-funded/vinteum.webp",
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
        logoWidth: 117,
        logoHeight: 120,
        focus: "Contributors to Bitcoin Dev Kit",
        scope: "Global",
        bullets: [
            "Supports contributors working on the BDK suite of libraries and supporting projects",
            "Offers both part-time and full-time grants",
            "Project based grants that do not necessarily need to be coding. They could be research, testing, docs, etc."
        ],
        url: "https://bitcoindevkit.org/"
    }
]

export type ChecklistItem = {
    label: string
    children?: string[]
}

export const FUNDING_CHECKLIST: ChecklistItem[] = [
    {
        label: "Explore projects in the BOSS ecosystem",
        children: ["Run them locally, read the documentation, review some PRs"]
    },
    {
        label: "Brainstorm what you can offer the BOSS space",
        children: ["Take stock of the skills you have and the skills you need"]
    },
    {
        label: "Build your network",
        children: [
            "Attend a local Bitdev meetup",
            "Join a study group",
            "Attend conferences and events",
            "Start your own meetup or group",
            "Follow projects and people you're interested in"
        ]
    },
    {
        label: "Learn about funding organizations and what you want in a grant"
    },
    {
        label: "Decide what you want to work on. Things to consider:",
        children: [
            "What you want your project to be",
            "What you're most passionate about",
            "What you find most interesting",
            "Where you can add value"
        ]
    },
    {
        label: "Find other people to ask if you're heading in the right direction"
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
