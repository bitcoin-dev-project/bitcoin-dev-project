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
        focus: "Protocol development",
        scope: "Global",
        bullets: [
            "501(c)(3) nonprofit funding Bitcoin development since 2020",
            "Primarily supports work on the base protocol",
            "Also funds research on scalability, usability, and Layer 2 (e.g. Lightning)",
            "Offers 1-year grants",
            "Has a physical office"
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
            "Grants paid in BTC",
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
            "Supports projects improving Bitcoin's security, accessibility, and decentralization",
            "Offers both small grants and long-term support (LTS)",
            "Transparent grant decision process",
            "$32.8M+ awarded across 380+ grants (as of 2026)"
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
            "501(c)(3) nonprofit funding since 2020",
            "Supports work empowering people in restrictive environments",
            "Funds developers, activists, translators, and community builders",
            "Strong mission alignment required",
            "$8.5M+ awarded across 280+ grants"
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
            "Awards a limited number of grants each year",
            "12-month grants with monthly payments",
            "$50K–$150K per developer",
            "Grant stacking allowed (up to $250K/year cap)",
            "Includes interview process before approval"
        ],
        url: "https://maelstrom.fund/"
    },
    {
        name: "Vinteum",
        logo: "/images/get-funded/vinteum.webp",
        logoWidth: 676,
        logoHeight: 120,
        focus: "Brazilian bitcoin developers",
        scope: "Brazil / LATAM",
        bullets: [
            "Nonprofit focused on growing Bitcoin dev talent in Brazil",
            "Supports open-source contributors",
            "Provides training + funding",
            "1-year grants for established developers"
        ],
        url: "https://vinteum.org/"
    },
    {
        name: "BDK (Bitcoin Dev Kit)",
        logo: "/images/get-funded/bdk.webp",
        logoWidth: 117,
        logoHeight: 120,
        focus: "Contributors to Bitcoin Dev Kit",
        scope: "Global",
        bullets: [
            "Supports contributors working on BDK",
            "Offers both part-time and full-time grants",
            "Focused on improving Bitcoin developer infrastructure"
        ],
        url: "https://bitcoindevkit.org/"
    }
]

export type ChecklistLink = {
    text: string
    url: string
}

export type ChecklistItem = {
    label: string
    links?: ChecklistLink[]
    children?: string[]
}

export const FUNDING_CHECKLIST: ChecklistItem[] = [
    {
        label: "Join a study group to solidify your knowledge (Bitshala, Code Orange, Btrust, and B4OS are all great)",
        links: [
            { text: "Bitshala", url: "https://bitshala.org/" },
            { text: "Code Orange", url: "https://codeorange.dev/" },
            { text: "Btrust", url: "https://www.btrust.tech/" },
            { text: "B4OS", url: "https://b4os.dev/" }
        ]
    },
    {
        label: "Explore projects in the BOSS ecosystem. Read the documentation, run them locally, review some PRs.",
    },
    {
        label: "Build your network",
        children: [
            "Attend a local BitDevs meetup. Don't have one in your city? Start one!",
            "Attend conferences and events",
            "Find some local bitcoiners or devs and start your own meetup",
            "Follow projects and people you're interested in on GitHub and social media"
        ]
    },
    {
        label: "Decide what you want to work on. Here are things to consider:",
        children: [
            "What areas of bitcoin excite you most?",
            "Are there any projects you find particularly interesting?",
            "What can you offer with the skills you already have?",
            "What knowledge gaps do you need to fill?",
        ]
    },
    {
        label: "Learn about funding organizations and what you want in a grant"
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
        name: "Localhost",
        detail: "San Francisco Bay Area",
        url: "https://lclhost.org/"
    }
]

export const CROWDFUNDING: ResourceLink[] = [
    { name: "Geyser", url: "https://geyser.fund/" },
    { name: "Bitcoin Development Portal", url: "https://bitcoindevlist.com/" }
]
