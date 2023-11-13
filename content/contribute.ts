import { Page } from "./types";

export const contribute = {
  title: "Contribute to PR's",
  description:
    "Bitcoin ipsum dolor sit amet. Private key key pair outputs soft fork, stacking sats halvening mempool halvening! Whitepaper, block height, blockchain mining, hash private key, UTXO sats. Mempool difficulty transaction consensus double-spend problem whitepaper hash mining! Sats UTXO timestamp server stacking sats.",
  levels: [
    {
      title: "Bitcoin",
      description:
        "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
      items: [
        {
          image: "/contribute/onboarding-to-bitcoin-core.jpg",
          title: "Onboarding to bitcoin core",
          subTitle: "Dive into Bitcoin Core Development",
          description:
            "Navigate the intricate pathways of contributing to Bitcoin Core at bitcoincore.wtf. It's a treasure map for developers, charting courses from initial involvement to in-depth workflow comprehension",
        },
        {
          image: "/contribute/bitcoin-pr-review-club.jpg",
          title: "Bitcoin PR Review Club",
          subTitle: "Join the Bitcoin Core PR Club!",
          description:
            "Get involved with the Bitcoin Core PR Review Club, a monthly meetup for discussing Bitcoin Core PRs and boosting your understanding of the codebase. It's an open invitation for anyone eager to learn and contribute, with hands-on guidance through the PR review process",
        },
      ],
    },
    {
      title: "Lightning",
      description:
        "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
      items: [
        {
          image: "/contribute/lnd-lightning-labs.jpg",
          title: "LND Lightning Labs",
          subTitle: "Power-Up with Lightning Network's LND!",
          description:
            "The GitHub repository for Lightning Network Daemon (LND) serves as a hub for developers looking to build and refine applications on Bitcoin's Lightning Network. It's a collaborative platform where one can contribute to the evolution of fast and scalable Bitcoin transactions.",
        },
        {
          image: "/contribute/core-lightning-by-blockstream.jpg",
          title: "Core Lightning by Blockstream",
          subTitle: "Electrify Bitcoin with c-lightning!",
          description:
            "The Elements Project's c-lightning GitHub repository is a resource for developers diving into the Bitcoin Lightning Network. It's a focus for innovation and development on the Lightning specification, providing a solid foundation for building lightning-fast Bitcoin applications.",
        },
        {
          image: "/contribute/eclair.jpg",
          title: "Eclair",
          subTitle: "Spark Bitcoin Payments with Eclair!",
          description:
            "ACINQ's Eclair GitHub repository invites developers to contribute to a Scala implementation of the Lightning Network. It's a vibrant playground for crafting and enhancing Bitcoin payment channels.",
        },
        {
          image: "/contribute/ldk.jpg",
          title: "LDK",
          subTitle: "Supercharge Wallet Integration with LDK",
          description:
            "The Lightning Development Kit (LDK) GitHub repository is a toolkit fostering easy integration of Lightning Network capabilities into Bitcoin wallets",
        },
        {
          image: "/contribute/ldk-pr-review-club.jpg",
          title: "LDK PR Review Club",
          subTitle: "Sharpen Your Lightning Skills",
          description:
            "Navigate the collaborative world of LDK PR Review Club, designed to sharpen your development skills on the Lightning Dev Kit. It's an every-other-Friday session aimed at mentoring new contributors through the intricacies of the LDK review process",
        },
        {
          image: "/contribute/lnd-pr-review-club.jpg",
          title: "LND PR Review Club",
          subTitle: "Boost Your Contribution Expertise",
          description:
            "Step into the bi-weekly LND PR Review Club, a practical arena for honing your skills in reviewing Pull Requests for the Lightning Network Daemon. It's the perfect opportunity for both new and seasoned contributors to learn, question, and engage with the LND community on Slack",
        },
      ],
    },
  ],
} satisfies Page;
