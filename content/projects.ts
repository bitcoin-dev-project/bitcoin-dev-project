import { Page } from "./types";

export const projects = {
  title: "Discover Open Source Projects",
  description:
    "It takes some work to go from curiosity to contribution. But that path is not often laid out clearly. Below are some stepping stones that will help you make your first open source contribution - whether in the form of comments, reviews, or writing your own PRs.",
  levels: [
    {
      title: "",
      description: "",
      items: [
        {
          title: "Bitcoin Core",
          subTitle: "",
          description: "The reference implementation of the bitcoin protocol",
          image: "/projects/bitcoin-core-logo.png",
          link: "https://github.com/bitcoin/bitcoin",
        },
        {
          title: "Lightning Development Kit",
          subTitle: "",
          description:
            "A complete lightning implementation packaged as an SDK",
          image: "/projects/ldk.png",
          link: "https://github.com/lightningdevkit",
        },
        {
          title: "Lightning Network Daemon",
          subTitle: "",
          description:
            "A Golang implementation and the most widely run full node on the lightning network",
          image: "/projects/lnd.png",
          link: "https://github.com/lightningnetwork/lnd",
        },
        {
          title: "Core Lightning",
          subTitle: "",
          description:
            "A lightweight, highly customizable and standard compliant implementation of the lightning protocol implementation written in C",
          image: "/projects/core-lightning.png",
          link: "https://github.com/ElementsProject/lightning",
        },
        {
          title: "Eclair",
          subTitle: "",
          description:
            "A scala implementation of the lightning network, focusing on the mobile use case",
          image: "/projects/eclair-logo.png",
          link: "https://github.com/ACINQ/eclair",
        },
        {
          title: "Bitcoin Development Kit",
          subTitle: "",
          description: "Seamlessly build cross platform wallets",
          image: "/projects/bdk.png",
          link: "https://bitcoindevkit.org",
        },
        {
          title: "Libsecp256k1",
          subTitle: "",
          description:
            "Optimized C library for elliptic curve operations on secp256k1",
          image: "/projects/secp256k1.png",
          link: "https://github.com/bitcoin-core/secp256k1",
        },
        {
          title: "Validating Lightning Signer",
          subTitle: "",
          description:
            "Improve your lightning node security by protecting your keys separately",
          image: "/projects/vls.png",
          link: "https://vls.tech",
        },
        {
          title: "Polar",
          subTitle: "",
          description:
            "One-click lightning networks for local app development and testing",
          image: "/projects/polar.jpg",
          link: "https://lightningpolar.com",
        },
        {
          title: "BTCPayserver",
          subTitle: "",
          description:
            "Free, open-source and self-hosted, bitcoin payment processor",
          image: "/projects/btc-pay.png",
          link: "https://github.com/btcpayserver",
        },
        {
          title: "Fedimint",
          subTitle: "",
          description:
            "A modular protocol to custody and transact bitcoin in a community context",
          image: "/projects/fedimint.png",
          link: "https://fedimint.org",
        },
        {
          title: "Stratum V2",
          subTitle: "",
          description: "The next generation protocol for pooled mining",
          image: "/projects/stratum-v2.png",
          link: "https://github.com/stratum-mining",
        },
        {
          title: "Rust Bitcoin Library",
          subTitle: "",
          description:
            "A series of projects to implement various bitcoin protocols in Rust",
          image: "/projects/rust-btc-logo.png",
          link: "https://github.com/rust-bitcoin",
        },
        {
          title: "Warnet",
          subTitle: "",
          description:
            "Monitor and analyze emergent behaviors of P2P networks",
          image: "/projects/warnet.jpg",
          link: "https://github.com/rust-bitcoin",
        },
        {
          title: "SimLN",
          subTitle: "",
          description:
            "Instantly simulate real-world lightning network activity",
          image: "/projects/simln.jpg",
          link: "https://github.com/rust-bitcoin",
        },
      ],
    },
  ],
} satisfies Page;
