import { BitcoinIcon, EyeOffIcon } from "lucide-react"

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

import { ImageProps } from "next/image"
import Image from "next/image"

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
export interface IFeature {
    name: React.ReactNode
    summary: string
    description: string
    image: ImageProps["src"]
    icon: ImageProps["src"]
}
