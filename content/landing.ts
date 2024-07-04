import { BitcoinIcon, EyeOffIcon } from "lucide-react"

import screenshotTopics from "@/public/images/hero/screenshots/topics.png"
import screenshotGoodFirstIssues from "@/public/images/hero/screenshots/good-first-issues.png"
import screenshotBitcoinSearch from "@/public/images/hero/screenshots/bitcoin_search.png"
import screenshotBitcoinTLDR from "@/public/images/hero/screenshots/bitcoin_tldr.png"
import screenshotBitcoinTranscript from "@/public/images/hero/screenshots/bitcoin_transcript.png"
import screenshotChatBTC from "@/public/images/hero/screenshots/chatBTC.png"
import screenshotSavingSatoshi from "@/public/images/hero/screenshots/saving_satoshi.png"

import logoBitcoinSearch from "@/public/images/hero/logos/bitcoin-search.png"
import logoBitcoinTLDR from "@/public/images/hero/logos/bitcoin-tldr.png"
import logoBitcoinTranscript from "@/public/images/hero/logos/bitcoin-transcripts.png"
import logoChatBTC from "@/public/images/hero/logos/chat-btc.png"
import logoSavingSatoshi from "@/public/images/hero/logos/bitcoin-transcripts-review.png"
import { UsersIcon } from "@heroicons/react/24/outline"
import logoBS from "@/public/images/hero/logos/bitcoin-search.png"
import logoTLDR from "@/public/images/hero/logos/bitcoin-tldr.png"
import logoTrRev from "@/public/images/hero/logos/bitcoin-transcripts-review.png"
import logoBitcTran from "@/public/images/hero/logos/bitcoin-transcripts.png"

import { GitHubLogoIcon } from "@radix-ui/react-icons"

import { ImageProps } from "next/image"

export const learningPath = [
    {
        badge: "EDUCATION",
        name: "01 - Study",
        description: "Learning bitcoin is Hard we make it easy for you.",
        href: "/bitcoin-core",
        cta: "Check out topics",
        icon: BitcoinIcon
    },
    {
        badge: "CONTRIBUTION",
        name: "02 - Contribute",
        description:
            "Put your knowledge to test. Explore vetted Free Open Source Software (FOSS) projects and find your way in bitcoin open source.",
        href: "/good-first-issues",
        cta: "Start Contribute",
        icon: BitcoinIcon
    },

    {
        badge: "TOOLS",
        name: "03 - Build",
        description:
            "Explore a suite of tools crafted to support your learning, building, and contributions in the bitcoin ecosystem.",
        href: "/tools",
        cta: "Check Tools",
        icon: BitcoinIcon
    },
    {
        badge: "FUNDING",
        name: "04 - Get Funded",
        description:
            "Do the work. Demonstrate capability and earn a grant for full-time bitcoin open source work",
        href: "/career",
        cta: "Learn More",
        icon: BitcoinIcon
    }
]

export const primaryFeatures = [
    {
        title: "Bitcoin Topics",
        description:
            "Breaking complex Bitcoin topics in a simple way. A resource rich with Visuals and animations to simplify complex technical Bitcoin concepts",
        image: screenshotTopics,
        released: false,
        checks: [
            "Collection of visuals and animations to help you",
            "From the basics to advanced concepts"
        ]
    },
    {
        title: "Good First Issues",
        description:
            "Explore vetted Free Open Source Software (FOSS) projects and find your way in bitcoin open source.",
        image: screenshotGoodFirstIssues,
        released: true,
        checks: [
            "Explore vetted FOSS projects",
            "Find your way in bitcoin open source"
        ]
    }
]

export const tools: Array<IFeature> = [
    {
        name: "Bitcoin Transcript",
        description:
            "Peruse archives of transcribed talks, podcasts and lectures.",
        summary: "",
        image: screenshotBitcoinTranscript,
        icon: logoBitcoinTranscript
    },

    {
        name: "Bitcoin TLDR",
        description: "Bitcoin-dev and Lightning-dev mailing list summaries",
        summary: "",
        image: screenshotBitcoinTLDR,
        icon: logoBitcoinTLDR
    },
    {
        name: "Bitcoin Search",
        description: "The technical bitcoin search engine we deserve.",
        summary: "",
        image: screenshotBitcoinSearch,
        icon: logoBitcoinSearch
    },
    {
        name: "ChatBTC",
        description: "Chat with your favorite bitcoin sources and authors.",
        summary: "",
        image: screenshotChatBTC,
        icon: logoChatBTC
    },
    {
        name: "Saving Satoshi",
        description: "Game designed to inspire you fall in love with bitcoin",
        summary: "",
        image: screenshotSavingSatoshi,
        icon: logoSavingSatoshi
    }
]

export const values = [
    {
        name: "BITCOIN ONLY",
        description: "We are 100% focused on Bitcoin and its ecosystem.",
        href: "#",
        icon: BitcoinIcon
    },
    {
        name: "ONBOARD",
        description:
            "Encourage more developers to be part of creating a new financial order",
        href: "#",
        icon: GitHubLogoIcon
    },
    {
        name: "COMMUNITY",
        description:
            "Bridge the gap between experienced developers and newcomers.",
        href: "#",
        icon: UsersIcon
    },
    {
        name: "INNOVATION",
        description: "Make it easy for anyone with a Bitcoin idea to build it",
        href: "#",
        icon: EyeOffIcon
    }
]

export const hero = [
    [
        { name: "ChatBTC", logo: logoChatBTC },
        { name: "Bitcoin Search", logo: logoBS },
        {
            name: "Transcript Review",
            logo: logoTrRev,
            className: "hidden xl:block"
        },

        { name: "Trsanscript", logo: logoBitcTran },
        { name: "Bitcoin TLDR", logo: logoTLDR }
    ]
]

export interface IFeature {
    name: React.ReactNode
    summary: string
    description: string
    image: ImageProps["src"]
    icon: ImageProps["src"]
}
