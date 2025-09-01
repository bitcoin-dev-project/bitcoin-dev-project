import { slugify } from "@/utils/slugify"

export const toolsData = [
    {
        name: "Transcript Review",
        href: "https://review.btctranscripts.com/",
        src: "/images/tools/bitcoin-transcripts-review.webp"
    },
    {
        name: "Chat BTC",
        href: "https://chat.bitcoinsearch.xyz",
        src: "/images/tools/chat-btc.webp"
    },
    {
        name: "Saving Satoshi",
        href: "https://savingsatoshi.com",
        src: "/images/tools/saving-satoshi.webp"
    },
    {
        name: "Bitcoin Transcripts",
        href: "https://btctranscripts.com/",
        src: "/images/tools/bitcoin-transcripts.webp"
    },
    {
        name: "Bitcoin TLDR",
        href: "https://tldr.bitcoinsearch.xyz/",
        src: "/images/tools/bitcoin-tldr.webp"
    },
    {
        name: "Bitcoin Search",
        href: "https://bitcoinsearch.xyz",
        src: "/images/tools/bitcoin-search.webp"
    }
]

type Section = {
    title: string
    description?: string
    slug: string
    data: {
        description: string
        btnText: string
        src: string
        title: string
        shortTitle?: string
        slug: string
        href?: string
    }[]
}

const createSection = (section: Section) => ({
    ...section,
    data: section.data.map((node) => ({
        ...node,
        slug: slugify(node.title)
    }))
})

export const learnSection = createSection({
    title: "Start Your Open Source Journey",
    slug: "explore",
    data: [
        {
            description: "Discover bitcoin and lightning open source projects",
            btnText: "Dive In",
            src: "/images/projects.jpg",
            title: "Projects",
            shortTitle: "Projects",
            slug: "/projects"
        },
        {
            description: " Begin a career in bitcoin open source development ",
            btnText: "Start",
            src: "/images/lightning-infra-development.jpg",
            title: "Career",
            shortTitle: "Career",
            slug: "/career"
        }
    ]
})

export const links = [
    {
        text: "Topics",
        linkTo: "/decoding"
    },
    {
        text: "Career",
        linkTo: "/career"
    },
    {
        text: "Tools",
        linkTo: "/tools"
    },
    {
        text: "About",
        linkTo: "/about"
    }
]

export const contributeSection = createSection({
    title: "Projects",
    slug: "projects",
    data: [
        {
            description: "Discover Bitcoin Open Source Projects",
            btnText: "Discover",
            src: "/contribute.jpg",
            title: "Contribute by reviewing PR's",
            slug: "",
            href: "/projects"
        }
    ]
})

export const pointers = [
    {
        btnText: "Learn Bitcoin Core",
        description: "",
        jumpTo: `/bitcoin-core`
    },
    {
        btnText: "Learn Lightning",
        description: "",
        jumpTo: `/lightning-open-source`
    }
]

export const navPointers = [
    {
        btnText: "Bitcoin Core",
        description: "",
        jumpTo: `/bitcoin-core`
    },
    {
        btnText: "Lightning Open Source",
        description: "",
        jumpTo: `/lightning-open-source`
    }
]

export const ContributeNavPointers = [
    {
        btnText: "₿OSS Projects",
        description: "",
        jumpTo: `/projects`
    },
    {
        btnText: "Good First Issues",
        description: "",
        jumpTo: `/good-first-issues`
    }
]
