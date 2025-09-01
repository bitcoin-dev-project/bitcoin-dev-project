import { BitcoinIcon } from "lucide-react"

import screenshotTopics from "@/public/images/hero/screenshots/topics.webp"
import screenshotGoodFirstIssues from "@/public/images/hero/screenshots/good-first-issues.webp"
import screenshotBitcoinSearch from "@/public/images/hero/screenshots/bitcoin_search.webp"
import screenshotBitcoinTLDR from "@/public/images/hero/screenshots/bitcoin_tldr.webp"
import screenshotBitcoinTranscript from "@/public/images/hero/screenshots/bitcoin-transacripts.webp"
import screenshotBitcoinTranscriptReview from "@/public/images/hero/screenshots/bitcoin-transcript-review.webp"
import screenshotChatBTC from "@/public/images/hero/screenshots/chatBTC.webp"
import screenshotSavingSatoshi from "@/public/images/hero/screenshots/saving_satoshi.webp"
import screenshotDecodingBitcoin from "@/public/images/hero/screenshots/decoding-bitcoin.webp"
import screenshotBTCdemy from "@/public/images/hero/screenshots/btc-demy.webp"
import screenshotWarnet from "@/public/images/hero/screenshots/warnet.webp"
import screenshotSimLN from "@/public/images/hero/screenshots/simln.webp"
import logoBitcoinSearch from "@/public/images/tools/bitcoin-search.webp"
import logoBitcoinTLDR from "@/public/images/tools/bitcoin-tldr.webp"
import logoBitcoinTranscript from "@/public/images/tools/bitcoin-transcripts.webp"
import logoTrRev from "@/public/images/tools/bitcoin-transcripts-review.webp"
import logoChatBTC from "@/public/images/tools/chat-btc.webp"
import logoSavingSatoshi from "@/public/images/tools/saving-satoshi.webp"
import logoBTCdemy from "@/public/images/tools/btc-demy.webp"
import discordIcon from "@/public/images/hero/socials/discord.svg"
import githubIcon from "@/public/images/hero/socials/github.svg"
import xIcon from "@/public/images/hero/socials/x.svg"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Bitcoin } from "lucide-react"
import {
    BoltIcon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    ListBulletIcon
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
        cta: "Learn Bitcoin Tech",
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
            "Explore a suite of tools crafted to support you in learning, building, and contributing to the bitcoin ecosystem.",
        href: "/tools",
        cta: "See Our Tools",
        icon: BitcoinIcon
    }
]

export const primaryFeatures = [
    {
        title: "Decoding Bitcoin",
        description:
            "Breaking complex Decoding Bitcoin in a simple way. A resource rich with Visuals and animations to simplify complex technical Bitcoin concepts",
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
            "Explore curated bitcoin open source software (₿OSS) projects to get off of ₿OSS 0.",
        image: screenshotGoodFirstIssues,
        released: true,
        checks: [
            "Explore curated ₿OSS projects",
            "Find your way in bitcoin open source"
        ]
    }
]

export const tools: Array<IFeature> = [
    {
        name: "Decoding Bitcoin",
        description:
            "The interactive learning experience to help you become confident in Bitcoin development.",
        summary: "",
        image: screenshotDecodingBitcoin,
        link: "https://bitcoindevs.xyz/decoding"
    },
    {
        name: "BTCdemy",
        description: "The Bitcoiner's Intro to Rust",
        summary: "",
        image: screenshotBTCdemy,
        icon: logoBTCdemy,
        link: "https://btcdemy.thinkific.com/"
    },
    {
        name: "Saving Satoshi",
        description: "Save bitcoin by coding through a sci-fi epic",
        summary: "",
        image: screenshotSavingSatoshi,
        icon: logoSavingSatoshi,
        link: "https://savingsatoshi.com"
    },
    {
        name: "Good First Issues",
        description: "Explore vetted Free Open Source Software (FOSS) projects",
        summary: "",
        image: screenshotGoodFirstIssues,
        icon: logoBitcoinTranscript,
        link: "https://bitcoindevs.xyz/good-first-issues"
    },
    {
        name: "Bitcoin Transcripts Review",
        description:
            "Earn sats by reviewing and editing AI-generated transcripts",
        summary: "",
        image: screenshotBitcoinTranscriptReview,
        icon: logoBitcoinTranscript,
        link: "https://review.btctranscripts.com"
    },

    {
        name: "Bitcoin Search",
        description: "The technical bitcoin search engine we deserve.",
        summary: "",
        image: screenshotBitcoinSearch,
        icon: logoBitcoinSearch,
        link: "https://bitcoinsearch.xyz"
    },
    {
        name: "Bitcoin TLDR",
        description:
            "Making it easier to engage with Delving Bitcoin, and Bitcoin and Lightning-dev mailing lists",
        summary: "",
        image: screenshotBitcoinTLDR,
        icon: logoBitcoinTLDR,
        link: "https://tldr.bitcoinsearch.xyz"
    },
    {
        name: "Bitcoin Transcripts",
        description:
            "Historical archives of transcribed talks, podcasts and lectures",
        summary: "",
        image: screenshotBitcoinTranscript,
        icon: logoBitcoinTranscript,
        link: "https://btctranscripts.com"
    },
    {
        name: "ChatBTC",
        description: "Chat with your favorite bitcoin sources and authors.",
        summary: "",
        image: screenshotChatBTC,
        icon: logoChatBTC,
        link: "https://chat.bitcoinsearch.xyz"
    },
    {
        name: "Warnet",
        description:
            "Monitor and analyze the emergent behaviors of P2P networks",
        summary: "",
        image: screenshotWarnet,
        link: "https://warnet.dev"
    },
    {
        name: "SimLN",
        description: "Instantly simulate real-world Lightning network activity",
        summary: "",
        image: screenshotSimLN,
        link: "https://simln.dev"
    }
]

export const values = [
    {
        name: "FOCUSED ON BITCOIN",
        description: "100% concentrated on bitcoin and related technologies",
        icon: BitcoinIcon
    },
    {
        name: "OPEN SOURCE",
        description:
            "Everything we do is open source. We want your reviews and contributions",
        href: "https://github.com/bitcoin-dev-project/bitcoin-dev-project",
        icon: GitHubLogoIcon
    },
    {
        name: "BITCOIN TECH",
        description:
            "We focus on enabling devs to learn, practice, and build with bitcoin.",
        icon: CodeBracketIcon
    }
]

export const hero = [
    [
        {
            name: "ChatBTC",
            logo: logoChatBTC,
            url: "https://chat.bitcoinsearch.xyz"
        },
        {
            name: "Bitcoin Search",
            logo: logoBitcoinSearch,
            url: "https://bitcoinsearch.xyz"
        },
        {
            name: "Transcript Review",
            logo: logoTrRev,
            className: "hidden xl:block",
            url: "https://review.btctranscripts.com"
        },

        {
            name: "Transcript",
            logo: logoBitcoinTranscript,
            url: "https://btctranscripts.com"
        },
        {
            name: "Bitcoin TLDR",
            logo: logoBitcoinTLDR,
            url: "https://tldr.bitcoinsearch.xyz"
        }
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
        name: "Bitcoin Core Development",
        description: "Learn how to contribute to the bitcoin core software.",
        href: "/bitcoin-core",
        icon: Bitcoin,
        released: true
    },
    {
        name: "Lightning Development",
        description: "Learn how to contribute to the lightning network.",
        href: "/lightning-open-source",
        icon: BoltIcon,
        released: true
    },
    {
        name: "Decoding Bitcoin",
        description:
            "Learning bitcoin is hard, but we make it easy for you to get started.",
        href: "/decoding",
        icon: ListBulletIcon,
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
        name: "₿OSS Projects",
        description:
            "Explore curated bitcoin open source software (₿OSS) projects.",
        href: "/projects",
        icon: ChartPieIcon,
        released: true
    }
]
export const callsToAction = [
    { name: "View all products", href: "/tools", icon: RectangleGroupIcon }
]
