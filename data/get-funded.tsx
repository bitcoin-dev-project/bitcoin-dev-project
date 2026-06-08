/**
 * Content for the redesigned get-funded page.
 *
 * NOTE: The funding-organization FOCUS / SCOPE / bullet copy below is
 * best-effort, written from publicly-known facts about each organization,
 * and should be verified against the Figma before shipping. Logos for
 * Maelstrom and Vinteum are not yet in the repo, so those cards fall back to
 * a text label.
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
        logoWidth: 96,
        logoHeight: 36,
        focus: "Bitcoin Core & protocol development",
        scope: "Global",
        bullets: [
            "501(c)(3) nonprofit funding Bitcoin development since 2020",
            "Primarily supports work on Bitcoin Core and the protocol",
            "Also funds research on scalability, usability, and Layer 2",
            "Offers 1-year grants and a fellowship for newer contributors"
        ],
        url: "https://brink.dev/"
    },
    {
        name: "Spiral",
        logo: "/images/get-funded/spiral.webp",
        logoWidth: 36,
        logoHeight: 36,
        focus: "Bitcoin R&D and open-source development",
        scope: "Global",
        bullets: [
            "Bitcoin R&D arm of Block, distributing grants since 2019",
            "Open to individuals and teams",
            "Projects must be free and open source",
            "Projects cannot have a business or profit motive"
        ],
        url: "https://spiral.xyz/"
    },
    {
        name: "OpenSats",
        logo: "/images/get-funded/open-sats.webp",
        logoWidth: 39,
        logoHeight: 25,
        focus: "FOSS development and infrastructure",
        scope: "Global",
        bullets: [
            "501(c)(3) nonprofit funding open-source work since 2021",
            "Supports projects improving Bitcoin's security, accessibility, and decentralization",
            "Offers both small grants and long-term support (LTS)",
            "Transparent grant decision process"
        ],
        url: "https://opensats.org/"
    },
    {
        name: "Btrust",
        logo: "/images/get-funded/btrust.webp",
        logoWidth: 91,
        logoHeight: 39,
        focus: "Builders in the Global South",
        scope: "Africa, India, LATAM, Southeast Asia",
        bullets: [
            "Founded with support from Jack Dorsey and Jay-Z",
            "Focuses on underrepresented regions",
            "Starter Grants & monthly funding for new contributors",
            "Includes training, standups, and community support"
        ],
        url: "https://www.btrust.tech/"
    },
    {
        name: "Human Rights Foundation",
        logo: "/images/get-funded/hrf.webp",
        logoWidth: 36,
        logoHeight: 27,
        focus: "Freedom tech & censorship-resistance",
        scope: "Global",
        bullets: [
            "501(c)(3) nonprofit distributing grants since 2020",
            "Supports work empowering people in authoritarian environments",
            "Funds developers, writers, translators, and community builders",
            "Strong mission alignment required"
        ],
        url: "https://hrf.org/devfund/"
    },
    {
        name: "Maelstrom",
        logo: "/images/get-funded/maelstrom.webp",
        logoWidth: 140,
        logoHeight: 24,
        focus: "Bitcoin Core & infrastructure",
        scope: "Global",
        bullets: [
            "Family office founded by Arthur Hayes",
            "Awards a limited number of grants each year",
            "Bitcoin Core grants with monthly payments",
            "Grant stacking allowed up to a yearly cap"
        ],
        url: "https://maelstrom.fund/"
    },
    {
        name: "Vinteum",
        logo: "/images/get-funded/vinteum.webp",
        logoWidth: 130,
        logoHeight: 23,
        focus: "Brazilian Bitcoin developers",
        scope: "Brazil / LATAM",
        bullets: [
            "Nonprofit focused on growing Bitcoin dev talent in Brazil",
            "Supports open-source contributions",
            "Provides training and funding",
            "1-year grants for established developers"
        ],
        url: "https://vinteum.org/"
    },
    {
        name: "Bitcoin Dev Kit (BDK)",
        logo: "/images/get-funded/bdk.webp",
        logoWidth: 40,
        logoHeight: 40,
        focus: "Bitcoin developer infrastructure",
        scope: "Global",
        bullets: [
            "Funds contributors to the Bitcoin Dev Kit libraries",
            "Long-term focus with part-time and full-time grants",
            "Improves wallet and developer infrastructure",
            "Open-source under the BDK Foundation"
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
        label: "Explore projects in the BOSS ecosystem.",
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
        name: "Localhost",
        detail: "San Francisco Bay Area",
        url: "https://lclhost.org/"
    }
]

export const CROWDFUNDING: ResourceLink[] = [
    { name: "Geyser", url: "https://geyser.fund/" },
    {
        name: "Payjoin Dev Kit",
        url: "https://payjoindevkit.org/"
    }
]
