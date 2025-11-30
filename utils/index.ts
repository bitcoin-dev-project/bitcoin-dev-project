import { FilterDifficulty } from "@/types/curriculum"
import type {
    FilterResourceType,
    FooterSection,
    IssueCardElement,
    MottosNav
} from "../types"
import { IFundingOrg } from "@/components/brand/FundingOrg"
import {
    DiscordIcon,
    GithubNewIcon,
    LinkedinNewIcon,
    NostrIcon,
    XIcon
} from "@bitcoin-dev-project/bdp-ui/icons"

export const SORTOPTIONS = ["sort", "random", "newest first", "oldest first"]

export const ISSUEOPTIONS = ["labels", "good first issue", "bug", "help wanted"]

export const FILTERTAGS = [
    "search",
    "sort",
    "labels",
    "languages",
    "tags",
    "repo",
    "owner"
]

export const REBRANDMOTTOS: MottosNav[] = [
    {
        name: "Learn",
        slug: "learn"
    },
    {
        name: "Contribute",
        slug: "contribute"
    },
    {
        name: "Get Funded",
        slug: "get-funded"
    }
]
export const FILTERSGUIDE: FilterResourceType[] = [
    {
        tag: "guide",
        description: "Instructional, step-by-step"
    },
    {
        tag: "tool",
        description: "Lecture, talks"
    },
    {
        tag: "interactive",
        description: "Interactive, hands-on"
    },
    {
        tag: "seminar",
        description: "Utility or reference to explore"
    }
]

export const FILTERDIFFICULTY: FilterDifficulty[] = [
    { count: 1, level: "easy" },
    { count: 2, level: "medium" },
    { count: 3, level: "hard" }
]

export const FUNDINGORGANISATION: IFundingOrg[] = [
    {
        logo: "/images/get-funded/spiral.webp",
        name: "Spiral",
        description:
            "Bitcoin R&D arm of Block, distributing grants since 2019.",
        width: 36,
        height: 36
    },
    {
        logo: "/images/get-funded/brink.webp",
        name: "Brink",
        description:
            "A 501c3, focused on funding Bitcoin Core devs, since 2020.",
        size: "min-w-[85px] min-h-[32px]",
        width: 85,
        height: 32
    },
    {
        logo: "/images/get-funded/hrf.webp",
        name: "Human Rights Foundation",
        description: " A 501c3 that has been distributing grants since 2020.",
        size: "min-w-[85px] min-h-[32px]",
        width: 36,
        height: 27
    },
    {
        logo: "/images/get-funded/open-sats.webp",
        name: "OpenSats",
        description: "A 501c3, established in 2021.",
        size: "min-w-[85px] min-h-[32px]",
        width: 39,
        height: 25
    }
]

export const FOOTERLINKS: FooterSection[] = [
    {
        name: "discover",
        links: [
            {
                name: "About",
                link: "/about"
            },
            {
                name: "Learn",
                link: "/learn"
            },
            {
                name: "Contribute",
                link: "/contribute"
            },
            {
                name: "Get Funded",
                link: "/get-funded"
            },
            {
                name: "BOSS Projects",
                link: "/projects"
            }
        ]
    },
    {
        name: "engage",
        links: [
            {
                name: "Public Visitor Count",
                link: "https://visits.bitcoindevs.xyz/share/El4tCqIKLIhJIq9y/bitcoin-dev-projectt",
                target: "_blank"
            },
            {
                name: "Give us Feedback",
                link: "https://forms.gle/aLtBMjAeLZiKCFxn8",
                target: "_blank"
            }
        ]
    },
    {
        name: "contact",
        links: [
            {
                name: "Linkedin",
                link: "https://www.linkedin.com/company/bitcoin-dev-project/",
                target: "_blank",
                component: LinkedinNewIcon
            },
            {
                name: "GithubIcon",
                link: "https://github.com/bitcoin-dev-project/bitcoin-dev-project",
                target: "_blank",
                component: GithubNewIcon
            },
            {
                name: "Discord",
                link: "https://x.com/Bitcoin_Devs",
                component: XIcon
            },
            {
                name: "NostrIcon",
                link: "https://njump.me/npub10p33xu03t8q7d9nxtks63dq4gmt4v4d3ppd5lcdp4rg9hxsd0f8q7mn2l2",
                target: "_blank",
                component: NostrIcon
            },
            {
                name: "Discord",
                link: "https://discord.com/invite/EAy9XMufbY",
                target: "_blank",
                component: DiscordIcon
            }
        ]
    }
]
export const NAVLINKS = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "About",
        link: "/about"
    },
    {
        name: "Explore",
        link: "/explore"
    }
]

export const FEATUREDLOGOS = [
    {
        name: "Summer of Bitcoin",
        logo: "/images/hero/summer-of-bitcoin.webp"
    },
    {
        name: "Coindesk",
        logo: "/images/hero/coin-desk.webp"
    },
    {
        name: "Btrust",
        logo: "/images/hero/btrust.webp"
    },
    {
        name: "Stacker News",
        logo: "/images/hero/stacker-news.webp"
    },
    {
        name: "Stephan Livera",
        logo: "/images/hero/stephan-livera.webp"
    }
]

export const FEATUREDPRODUCTS = [
    {
        name: "Decoding Bitcoin",
        image: "/images/products/decoding-bitcoin.webp",
        users: "50+",
        action: "Studied by",
        link:"/decoding",
        target:"_blank"
        description:
            "A self-paced educational platform that introduces key Bitcoin concepts through visual explanations and exercises."
    },
    {
        name: "Saving Satoshi",
        image: "/images/products/saving-satoshi.webp",
        users: "1.5k+",
        action: "Played by",
        link:"https://savingsatoshi.com/",
        target:"_blank",
        description:
            "An interactive science fiction game designed to inspire a generation to fall in love with bitcoin."
    },
    {
        name: "ChatBTC",
        image: "/images/products/chat-btc.webp",
        users: "1.5k+",
        action: "Used by",
        link:"https://chat.bitcoinsearch.xyz/",
         target:"_blank",
        description:
            "An interactive science fiction game designed to inspire a generation to fall in love with bitcoin."
    }
]

export const TESTIMONIALS = [
    {
        quote: "The variety of free, open-source material that the Bitcoin Dev Project provides is nothing short of impressive. They make exactly the kinds of tools & education that developers need.",
        author: "Steve Lee",
        title: "Lead, Spiral",
        logo: "/images/testimonials/spiral-orange.webp",
        color: "#CC7400",
        bgColor: "#ECD4B5"
    },
    {
        quote: "I'd highly recommend people interested in contributing to Bitcoin start their journey at BDP.",
        author: "Anthony Milton",
        title: "Independent Bitcoin Researcher",
        color: "#CC7400",
        bgColor: "#ECD4B5",
        logo: "/images/testimonials/bitcoin-orange.webp"
    },
    {
        quote: "The BDP is a welcoming community. It guided me to the right learning modules and tools, which helped me land a full-time job in bitcoin development!",
        author: "Matthew Vuk",
        title: "Researcher, Second",
        color: "#CC7400",
        bgColor: "#ECD4B5",

        logo: "/images/testimonials/second.webp"
    },
    {
        quote: "You’ve got the Bitcoin Dev Project’s tools, guides, and me. Honestly, that’s an unfair advantage. Build something great… or at least something that compiles. I’ll be napping on a warm node.",
        author: "Holocat",
        title: "Surprisingly helpful holographic cat",
        color: "#CC7400",
        bgColor: "#ECD4B5",
        logo: "/images/testimonials/holocat.webp"
    }
]

export const FAQS = [
    {
        question: "What is the Bitcoin Dev Project ?",
        answer: "The Bitcoin Dev Project is an initiative to support developers who are trying to get more involved with bitcoin open-source software (BOSS). It’s designed to help curious coders become more confident and successful in bitcoin tech."
    },
    {
        question: "What is BOSS ?",
        answer: "Bitcoin Open-Source Software. If you’re familiar with the FOSS acronym (free and open-source software), you can think of bitcoin + FOSS = BOSS. Find examples of BOSS projects here."
    },
    {
        question: "Why would I consider a career in BOSS ?",
        answer: "Working in BOSS means tackling interesting, challenging engineering problems alongside some of the brightest minds in the world. It means writing code that has real, global impact, and experiencing a level of professional freedom rare in traditional careers. In this permissionless, merit-based ecosystem, great work speaks for itself, and contributions from everyday BOSS developers shape the future of bitcoin."
    },
    {
        question: "Who is this for ?",
        answer: `The Bitcoin Dev Project is made for both existing and aspiring BOSS developers. It doesn’t matter if you know your way around a bitcoin code base or two, or are entirely new to the protocol. Here you’ll find tools and resources to help you learn about the tech, make your first contributions, and stay up-to-date with the larger bitcoin developer community.
Much of the material that BDP provides requires some level of coding ability. At the very least, a curiosity about the technical aspects of bitcoin is a must. If you aren’t confident in your programming skills, we recommend attending a coding bootcamp or doing a self paced course. Python is an excellent language to start with, as it opens the door to the many bitcoin books and courses that use Python for code exercises. Other popular languages in the BOSS ecosystem include Rust, C++, and JavaScript. `
    },
    {
        question: "How much does it cost?",
        answer: "Nothing! The Bitcoin Dev Project is 100% free and open-source."
    },
    {
        question: "Do you have content on other cryptos or projects?",
        answer: "No. The Bitcoin Dev Project is exclusively focused on bitcoin."
    },
    {
        question: "Do you offer funding or grants ?",
        answer: "Not directly, but we help you find it. Read about how to get funded or directly use our common application resource to reach multiple bitcoin funding organizations with one form."
    },
    {
        question: "How can I contribute to open-source Bitcoin projects?",
        answer: "Check out our good first issues section and join our community events to connect with other contributors and find projects that match your skills."
    }
]

export const MISSIONS = [
    {
        title: "FOCUSED ON BITCOIN",
        description: "100% concentrated on bitcoin and related technologies"
    },
    {
        title: "OPEN SOURCE",
        description: "Built in the open with your contributions."
    },
    {
        title: "BITCOIN TECH",
        description:
            "We help developers learn, practice, and build with bitcoin."
    }
]

export const ABOUTPHOTOS = [
    {
        src: "/images/about/bitcoinrodeo-2024.png",
        alt: "Bitcoinrodeo 24 Conference",
        badge: "@Bitcoinrodeo 24'",
        badgeColor: "bg-orange-500",
        rotation: "-rotate-2"
    },
    {
        src: "/images/about/african-bitcoin-conference-2024.png",
        alt: "African Bitcoin Conference 2024",
        badge: "@African Bitcoin Conference '24",
        badgeColor: "bg-pink-500",
        rotation: "rotate-1"
    },
    {
        src: "/images/about/saving-satoshi-team-tabconf-2024.png",
        alt: "Saving Satoshi Team at TABConf 2024",
        badge: "Saving Satoshi @ TABConf '24",
        badgeColor: "bg-purple-500",
        rotation: "-rotate-1"
    },
    {
        src: "/images/about/warnet-tabconf-2025.png",
        alt: "Warnet at TABCONF 2025",
        badge: "Warnet @TABCONF '25",
        badgeColor: "bg-orange-600",
        rotation: "rotate-2"
    },
    {
        src: "/images/about/bdp-contributor.png",
        alt: "BDP Contributor",
        badge: "Become World's Best Contributor with BDP",
        badgeColor: "bg-green-600",
        rotation: "-rotate-1"
    },
    {
        src: "/images/about/bitcoin-presentation.png",
        alt: "Bitcoin Presentation",
        badge: "",
        badgeColor: "",
        rotation: "rotate-1"
    }
]
export function getValues({
    key,
    issues
}: {
    key: keyof IssueCardElement
    issues: IssueCardElement[]
}) {
    const properties = issues.reduce(
        (acc, issue) => {
            const project = issue[key]
            if (Array.isArray(project)) {
                return acc.concat(project)
            }
            acc.push(project as string)
            return acc
        },
        [key] as string[]
    )
    const uniqueProperties = Array.from(new Set(properties).values())

    return { properties: uniqueProperties }
}

export const createSortKeys = () => {
    const sortKeys = SORTOPTIONS.slice(1).map((key) => {
        const dashed_key = key.split(" ").join("-")
        return { key: dashed_key, label: key }
    })

    return { sortKeys }
}

export function filterIssues(
    filterArgNkey: { key: string; filter: string }[],
    dataSet: IssueCardElement[],
    sortKey: string | null,
    searchQuery: string | null
) {
    let result: IssueCardElement[] = []

    if (!filterArgNkey.length || filterArgNkey.length === 0) {
        return dataSet
    }

    if (filterArgNkey.length) {
        applyFilter(dataSet, filterArgNkey, result)
    }

    if (sortKey) {
        result = result.length === 0 ? dataSet : result
        applySort(sortKey, result)
    }

    if (searchQuery) {
        result = result.length === 0 ? dataSet : result
        return applySearch(searchQuery, result)
    }

    return result
}

// applies sort to the dataset or result
// Sorts according to newest-issues, oldest-issues and relevance which is the default state
export const applySort = (
    sortKey: string | null,
    result: IssueCardElement[]
) => {
    switch (sortKey) {
        case "random":
            return result
        case "newest-first":
            return result.sort(
                (a, b) =>
                    new Date(b.publishedAt as string).getTime() -
                    new Date(a.publishedAt as string).getTime()
            )
        case "oldest-first":
            return result.sort(
                (a, b) =>
                    new Date(a.publishedAt as string).getTime() -
                    new Date(b.publishedAt as string).getTime()
            )
        default:
            break
    }
}

// applies filter to the dataset or result
// filter searhes each item in the dataset based on filter key selected and returns results as expected
export const applyFilter = (
    dataSet: IssueCardElement[],
    filterArgNkey: { key: string; filter: string }[],
    result: IssueCardElement[]
) => {
    const rename_keys = filterArgNkey.map(({ key, filter }) => {
        switch (key) {
            case "name":
                return { key: "repo", filter }
            case "lang":
                return { key: "languages", filter }
            case "org":
                return { key: "owner", filter }
            default:
                return { key, filter }
        }
    })

    dataSet.filter((resultValue) => {
        rename_keys.map(({ key, filter }) => {
            filter = filter.toLowerCase()
            const isPresent = result.some(
                (val) => val.number === resultValue.number
            )
            let valueInCheck = resultValue?.[key as keyof IssueCardElement]

            if (Array.isArray(valueInCheck)) {
                valueInCheck = valueInCheck.map((val) => val.toLowerCase())
                if (valueInCheck.includes(filter)) {
                    if (isPresent) return
                    return result.push(resultValue)
                }
            } else if (
                typeof valueInCheck === "string" &&
                valueInCheck.toLowerCase() === filter.toLowerCase()
            ) {
                if (isPresent) return
                return result.push(resultValue)
            }
        })
    })
}

// applies search to the dataset or result
// Search is based on title, repository and language
export const applySearch = (
    searchQuery: string | null,
    result: IssueCardElement[]
) => {
    const nullableSearchTerm = searchQuery?.toLocaleLowerCase() ?? ""

    return result.filter((item) => {
        return (
            (item?.title as string)
                .toLowerCase()
                .includes(nullableSearchTerm) ||
            (item?.owner as string)
                .toLowerCase()
                .includes(nullableSearchTerm) ||
            (item?.repo as string).toLowerCase().includes(nullableSearchTerm) ||
            (item?.languages as string[]).some((val) =>
                val.toLowerCase().includes(nullableSearchTerm)
            )
        )
    })
}

export function shuffle(data: IssueCardElement[]) {
    let currIndex = data.length

    while (currIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currIndex)
        currIndex--
        ;[data[currIndex], data[randomIndex]] = [
            data[randomIndex],
            data[currIndex]
        ]
    }

    return data
}

export const swapImageUrl = (name: string, imageUrl: string) => {
    switch (name) {
        case "polar":
            return "/images/projects/polar.jpg"
        case "lnd":
            return "/images/projects/lnd.png"
        case "eclair":
            return "/images/projects/eclair-logo.png"
        case "warnet":
            return "/images/projects/warnet.jpg"
        case "sim-ln":
            return "/images/projects/simln.jpg"
        default:
            return imageUrl
    }
}
