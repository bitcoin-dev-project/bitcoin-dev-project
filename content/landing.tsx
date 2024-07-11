import { BitcoinIcon, EyeOffIcon } from "lucide-react"

import screenshotBitcoinCore from "@/public/images/hero/screenshots/bitcoin-core.png"
import screenshotLightning from "@/public/images/hero/screenshots/lightning.png"

import screenshotTopics from "@/public/images/hero/screenshots/topics.png"
import screenshotGoodFirstIssues from "@/public/images/hero/screenshots/good-first-issues.png"
import screenshotBitcoinSearch from "@/public/images/hero/screenshots/bitcoin_search.png"
import screenshotBitcoinTLDR from "@/public/images/hero/screenshots/bitcoin_tldr.png"
import screenshotBitcoinTranscript from "@/public/images/hero/screenshots/bitcoin_transcript.png"
import screenshotChatBTC from "@/public/images/hero/screenshots/chatBTC.png"
import screenshotSavingSatoshi from "@/public/images/hero/screenshots/saving_satoshi.png"

import logoBitcoinSearch from "@/public/images/tools/bitcoin-search.jpg"
import logoBitcoinTLDR from "@/public/images/tools/bitcoin-tldr.jpg"
import logoBitcoinTranscript from "@/public/images/tools/bitcoin-transcripts.jpg"
import logoTrRev from "@/public/images/tools/bitcoin-transcripts-review.jpg"
import logoChatBTC from "@/public/images/tools/chat-btc.jpg"
import logoSavingSatoshi from "@/public/images/tools/saving-satoshi.jpg"
import { UsersIcon } from "@heroicons/react/24/outline"
import discordIcon from "@/public/images/hero/socials/discord.svg"
import githubIcon from "@/public/images/hero/socials/github.svg"
import xIcon from "@/public/images/hero/socials/x.svg"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

import {
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon
} from "@heroicons/react/24/outline"
import { RectangleGroupIcon } from "@heroicons/react/20/solid"

import Image from "next/image"
import { IFeature } from "@/types"
import { CodeBracketIcon } from "@heroicons/react/20/solid"

export const learningPath = [
    {
        badge: "EDUCATION",
        name: "STUDY",
        description:
            "Simplifying bitcoin tech to help you learn as efficiently as possible",
        href: "/bitcoin-core",
        cta: "Check Out",
        icon: BitcoinIcon
    },
    {
        badge: "CONTRIBUTION",
        name: "CONTRIBUTE",
        description:
            "Get to work on open issues. Put your knowledge to the test. Explore vetted Free Open Source Software (FOSS) projects. And find your way in bitcoin open source.",
        href: "/good-first-issues",
        cta: "Start Contributing",
        icon: BitcoinIcon
    },

    {
        badge: "EXPLORE",
        name: "EXPLORE",
        description:
            "Explore a suite of tools crafted to support your learning, building, and contributions in the bitcoin ecosystem.",
        href: "/tools",
        cta: "See Our Tools",
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
        name: "FOCUSED ON BITCOIN",
        description: "100% concentrated on bitcoin and related technologies",
        href: "#",
        icon: BitcoinIcon
    },
    {
        name: "OPEN SOURCE",
        description:
            "Everything we do is open source. We want your reviews and contributions",
        href: "#",
        icon: GitHubLogoIcon
    },
    {
        name: "BITCOIN TECH",
        description:
            "We focus on enabling devs to learn, practice, and build with bitcoin.",
        href: "#",
        icon: CodeBracketIcon
    }
]

export const hero = [
    [
        { name: "ChatBTC", logo: logoChatBTC },
        { name: "Bitcoin Search", logo: logoBitcoinSearch },
        {
            name: "Transcript Review",
            logo: logoTrRev,
            className: "hidden xl:block"
        },

        { name: "Trsanscript", logo: logoBitcoinTranscript },
        { name: "Bitcoin TLDR", logo: logoBitcoinTLDR }
    ]
]

export const navigation = {
    social: [
        {
            name: "X",
            href: "https://x.com/Bitcoin_Devs",
            icon: (props: any) => (
                <Image
                    src={xIcon}
                    alt="Discord"
                    width={20}
                    height={20}
                    {...props}
                />
            )
        },
        {
            name: "GitHub",
            href: "https://github.com/bitcoin-dev-project/",
            icon: (props: any) => (
                <Image
                    src={githubIcon}
                    alt="Discord"
                    width={20}
                    height={20}
                    {...props}
                />
            )
        },
        {
            name: "Discord",
            href: "https://discord.gg/EAy9XMufbY",
            icon: (props: any) => (
                <Image
                    src={discordIcon}
                    alt="Discord"
                    width={20}
                    height={20}
                    {...props}
                />
            )
        }
    ]
}

export const products = [
    {
        name: "Bitcoin Topics",
        description:
            "Learning bitcoin is hard, but we make it easy for you to get started.",
        href: "/topics",
        icon: CursorArrowRaysIcon,
        released: false
    },
    {
        name: "Bitcoin Core Development",
        description: "Learn how to contribute to the bitcoin core software.",
        href: "/bitcoin-core",
        icon: ChartPieIcon,
        released: true
    },
    {
        name: "Lightning Development",
        description: "Learn how to contribute to the lightning network.",
        href: "/lightning-open-source",
        icon: FingerPrintIcon,
        released: true
    }
]

export const contributions = [
    {
        name: "Good First Issue",
        description: "Find your way in bitcoin open source.",
        href: "/good-first-issues",
        icon: CursorArrowRaysIcon,
        released: true
    },
    {
        name: "FOSS Projects",
        description: "Learn how to contribute to the bitcoin core software.",
        href: "/projects",
        icon: ChartPieIcon,
        released: true
    }
]
export const callsToAction = [
    { name: "View all products", href: "/tools", icon: RectangleGroupIcon }
]
