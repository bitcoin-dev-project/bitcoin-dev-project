"use client"

import Link from "next/link"
import Image from "next/image"
import {
    BdpTag,
    GithubNewIcon,
    RightArrowIcon
} from "@bitcoin-dev-project/bdp-ui/icons"
import { RebrandedHeader } from "@/components/rebranded-header"

interface ProjectCard {
    title: string
    description: string
    logo: string
    bgColor: string
    textColor?: string
    link: string
    buttonText?: string
    showBdpTag?: boolean
    github?: string
}

const projects: ProjectCard[] = [
    {
        title: "Bitcoin Core",
        description: "The reference implementation of the bitcoin protocol",
        logo: "/images/projects/bitcoin-core-logo.svg",
        bgColor: "bg-[#1c1c1e]",
        textColor: "text-white",
        link: "/good-first-issues?page=1&repo=bitcoin",
        github: "bitcoin/bitcoin"
    },
    {
        title: "Lightning Dev Kit",
        description: "A complete lightning implementation packaged as an SDK",
        logo: "/images/projects/ldk.svg",
        bgColor: "bg-[#2952e3]",
        textColor: "text-white",
        link: "/good-first-issues?page=1&repo=rust-lightning",
        github: "lightningdevkit/rust-lightning"
    },
    {
        title: "Lightning Network Daemon",
        description:
            "A Golang implementation and the most widely run full node on the lightning network",
        logo: "/images/projects/lnd.svg",
        bgColor: "bg-white",
        link: "/good-first-issues?page=1&repo=lnd",
        github: "lightningnetwork/lnd"
    },
    {
        title: "Core Lightning",
        description:
            "Highly flexible C implementation of the lightning protocol, fully standards-compliant",
        logo: "/images/projects/core-lightning.svg",
        bgColor: "bg-[#1c1c1e]",
        textColor: "text-white",
        link: "https://github.com/ElementsProject/lightning",
        github: "ElementsProject/lightning"
    },
    {
        title: "Eclair",
        description:
            "A Scala implementation of the lightning network, focusing on the mobile use case",
        logo: "/images/projects/eclair-logo.svg",
        bgColor: "bg-white",
        link: "https://github.com/ACINQ/eclair",
        github: "ACINQ/eclair"
    },
    {
        title: "Bitcoin Development Kit",
        description: "Seamlessly build cross platform wallets",
        logo: "/images/projects/bdk.svg",
        bgColor: "bg-[#f7931a]",
        textColor: "text-white",
        link: "https://github.com/bitcoindevkit/bdk",
        github: "bitcoindevkit/bdk"
    },
    {
        title: "Libsecp 256k1",
        description:
            "Optimized C library for elliptic curve operations on secp256k1",
        logo: "/images/projects/secp256k1.svg",
        bgColor: "bg-[#ede8e2]",
        buttonText: "View Repository",
        link: "https://github.com/bitcoin-core/secp256k1",
        github: "bitcoin-core/secp256k1"
    },
    {
        title: "Payjoin",
        description:
            "Scale Bitcoin, save fees, and preserve privacy all at once.",
        logo: "/images/projects/payjoin.svg",
        bgColor: "bg-[#c7397c]",
        textColor: "text-white",
        link: "https://github.com/payjoin/rust-payjoin",
        github: "payjoin/rust-payjoin"
    },
    {
        title: "BTCPay Server",
        description:
            "Free, open-source and self-hosted, bitcoin payment processor",
        logo: "/images/projects/btc-pay.svg",
        bgColor: "bg-white",
        link: "https://github.com/btcpayserver/btcpayserver",
        github: "btcpayserver/btcpayserver"
    },
    {
        title: "Fedimint",
        description:
            "A modular protocol to custody and transact bitcoin in a community context",
        logo: "/images/projects/fedimint.svg",
        bgColor: "bg-white",
        link: "https://github.com/fedimint/fedimint",
        github: "fedimint/fedimint"
    },
    {
        title: "Stratum V2",
        description: "The next generation protocol for pooled mining",
        logo: "/images/projects/stratum-v2.svg",
        bgColor: "bg-[#0f212e]",
        textColor: "text-white",
        link: "https://github.com/stratum-mining/stratum",
        github: "stratum-mining/stratum"
    },
    {
        title: "Rust Bitcoin Library",
        description:
            "A series of projects to implement various bitcoin protocols in Rust",
        logo: "/images/projects/rust-btc-logo.svg",
        bgColor: "bg-white",
        link: "https://github.com/rust-bitcoin/rust-bitcoin",
        github: "rust-bitcoin/rust-bitcoin"
    },
    {
        title: "Polar",
        description:
            "One-click lightning networks for local app development and testing",
        logo: "/images/projects/polar.svg",
        bgColor: "bg-white",
        link: "https://github.com/jamaljsr/polar",
        github: "jamaljsr/polar"
    },
    {
        title: "Warnet",
        description: "Monitor and analyze emergent behaviors of P2P networks",
        logo: "/images/projects/warnet.svg",
        bgColor: "bg-[#1c1c1e]",
        textColor: "text-white",
        showBdpTag: true,
        link: "https://github.com/bitcoin-dev-project/warnet",
        github: "bitcoin-dev-project/warnet"
    },
    {
        title: "SimLN",
        description: "Instantly simulate real-world lightning network activity",
        logo: "/images/projects/simln.svg",
        bgColor: "bg-white",
        showBdpTag: true,
        link: "https://github.com/bitcoin-dev-project/sim-ln",
        github: "bitcoin-dev-project/sim-ln"
    }
]

export default function Projects() {
    return (
        <div className="min-h-screen bg-[#F6F0E6] font-quicksand">
            <div className="max-w-7xl mx-auto">
                <section className="px-4 sm:px-6 lg:px-8 xl:px-12 pt-5 pb-12 flex flex-col gap-5 lg:text-center">
                    <h1 className="text-[2rem]  lg:text-6xl font-extrabold text-black font-montserrat">
                        Discover Open Source Projects
                    </h1>
                    <p className="text-lg sm:text-xl text-black max-w-4xl font-light leading-relaxed  mx-auto">
                        It takes some work to go from curiosity to contribution.
                        But that path is not often laid out clearly. Below are
                        some stepping stones that will help you make your first
                        open source contribution—whether in the form of
                        comments, reviews, or writing your own PRs.
                    </p>
                </section>

                <section className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project, i) => (
                            <ProjectCardComponent key={i} project={project} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

function ProjectCardComponent({ project }: { project: ProjectCard }) {
    return (
        <div className="relative flex h-full flex-col rounded-[16px] border-2 border-[#e1dbd0] bg-[#efe9de] overflow-hidden p-2">
            {/* INNER BORDER - Card Content Area */}
            <div className="flex flex-col h-full border-2 border-[#e1dbd0] rounded-[14px] overflow-hidden">
                {/* IMAGE SECTION - Full width, no padding */}
                <div className="relative w-full">
                    {/* BDP tag positioned on top of image */}
                    {project.showBdpTag && (
                        <div className="absolute z-10 top-3 left-3 bg-[#F6F0E6] border border-[#A9A49B] rounded-[12px] px-2 py-1 flex items-center gap-1">
                            <BdpTag width={16} className="text-black" />
                            <span className="text-sm font-medium text-black">
                                By BDP
                            </span>
                        </div>
                    )}

                    {/* Image container - full width, fills space */}
                    <div className="relative w-full">
                        <Image
                            src={project.logo}
                            alt={`${project.title} logo`}
                            width={1000}
                            height={1000}
                            className="w-full h-auto object-contain"
                            priority={false}
                        />
                    </div>
                </div>

                {/* BOTTOM / CONTENT SECTION */}
                <div className="bg-[#efe9de] text-black p-4 flex flex-1 flex-col">
                    <h3 className="text-2xl font-bold mb-2 font-montserrat">
                        {project.title}
                    </h3>
                    <p className="text-base mb-4 flex-1 opacity-70">
                        {project.description}
                    </p>

                    {/* CTA: Good First Issues */}
                    <Link
                        href={project.link}
                        rel="noopener noreferrer"
                        className="relative inline-flex items-center h-8 rounded-[20px] font-semibold text-xs transition-all hover:scale-105
                bg-[#E1DBD0] border-2 border-[#C7C1B6] text-black overflow-hidden self-start"
                    >
                        {/* Inner circle on left - full height, matches button height */}
                        <span className="absolute -left-[2px] -top-[2px] h-8 w-8 rounded-full border-2 border-[#C7C1B6] flex items-center justify-center flex-shrink-0">
                            <GithubNewIcon width={14} className="text-black" />
                        </span>

                        {/* Text content */}
                        <span className="ml-10 mr-2.5">
                            {project.buttonText || "Good First Issues"}
                        </span>

                        {/* Arrow */}
                        <span className="mr-2.5">
                            <RightArrowIcon width={12} className="text-black" />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
