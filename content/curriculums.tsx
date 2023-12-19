import Link from "next/link";
import { Page } from "./types";

export type Curriculums = Record<string, Page>;

export const curriculums = {
  "bitcoin-core": {
    title: "Bitcoin Open Source Development",
    description:
      "Originally written by Satoshi Nakamoto, bitcoin proved that purely peer-to-peer electronic cash, one of the hardest computing problems, was possible. Becoming a Bitcoin Core developer is not for everyone but those that do the work to summit the mountain contribute to a legendary codebase designed to span generations.",
    levels: [
      {
        title: "Level 1",
        description:
          "",
        items: [
          {
            image:
              "/curriculums/bitcoin-infra-development/mastering-bitcoin.jpg",
            title: "Programming the Open Blockchain",
            subTitle: "",
            description:
              "The canonical primer on understanding the technical side of bitcoin. The 3rd edition promises to be the best release yet.",
            link: "https://github.com/bitcoinbook/bitcoinbook",
          },
          {
            image:
              "/curriculums/bitcoin-infra-development/bitcoin-development-philosophy.jpg",
            title: "Bitcoin Development Philosophy",
            subTitle: "",
            description:
              "Gain a deeper understanding of Bitcoin's design trade-offs and philosophy, offering insights into over a decade of Bitcoin development and public debate.",
            link: "https://bitcoindevphilosophy.com/",
          },
        ],
      },
      {
        title: "Level 2",
        description:
          "",
        items: [
          {
            image:
              "/curriculums/bitcoin-infra-development/chaincode-bitcoin-seminar.jpg",
            title: "Chaincode Bitcoin Seminar",
            subTitle: "",
            description:
              "This program offers a curated curriculum and hands-on sessions to complete at your own pace or with a cohort of other keen explorers.",
            link: "https://learning.chaincode.com/#seminars",
          },
          {
            image:
              "/curriculums/bitcoin-infra-development/learn-bitcoin-from-command-line.jpg",
            title: "Learn Bitcoin from the command line",
            subTitle: "",
            description:
              "Use your own Bitcoin node to execute transactions, script Bitcoin operations, integrate with hardware wallets and hidden services with this step by step guide.",
            link: "https://github.com/BlockchainCommons/Learning-Bitcoin-from-the-Command-Line",
          },
          {
            image:
              "/curriculums/bitcoin-infra-development/transaction-tutorial.jpg",
            title: "Transaction Tutorial",
            subTitle: "",
            description:
              "Get on a first name basis with SegWit and Taproot transactions. Add sighashes and timelocks to your list of friends by creating and signing Bitcoin transactions using a local bitcoind instance via Jupyter notebooks.",
            link: "https://github.com/chaincodelabs/bitcoin-tx-tutorial",
          },
          {
            image: "/curriculums/bitcoin-infra-development/minesim.jpg",
            title: "Minesim",
            subTitle: "",
            description:
              "A comprehensive POW mining simulator offering a hands-on experience to explore block discovery, peer node configuration, and chain splits using realistic Poisson distribution models.",
            link: "https://github.com/LarryRuane/minesim",
          },
          {
            image:
              "/curriculums/bitcoin-infra-development/tiny-bitcoin-peer.jpg",
            title: "Tinybitcoinpeer",
            subTitle: "",
            description:
              "TinyBitcoinPeer offers a unique and playful way to understand Bitcoin's network dynamics by connecting to live nodes on the network with 150 lines of Python.",
            link: "https://github.com/willcl-ark/tinybitcoinpeer",
          },
          {
            image:
              "/curriculums/bitcoin-infra-development/schnorr-taproot-workshop.jpg",
            title: "Schnorr Taproot Workshop",
            subTitle: "",
            description:
              "The Schnorr/Taproot Workshop by Bitcoin Optech is an interactive walk through to learn about Schnorr signatures, MuSig aggregation, and Taproot applications via Jupyter notebooks.",
            link: "https://bitcoinops.org/en/schorr-taproot-workshop/",
          },
        ],
      },
      {
        title: "Level 3",
        description:
          "",
        items: [
          {
            image:
              "/curriculums/bitcoin-infra-development/onboarding-to-bitcoin-core.jpg",
            title: "Onboarding to Bitcoin Core",
            subTitle: "",
            description:
              "This guide covers both the technical components such as, architecture, consensus, validation, the wallet, P2P, and script, but also introduces the under-documented social aspects like PR etiquette and the decentralized development process.",
            link: "https://bitcoincore.academy",
          },
          {
            image: "/curriculums/bitcoin-infra-development/pr-review-club.jpg",
            title: "Bitcoin Core PR Review Club",
            subTitle: "",
            description:
              "The Bitcoin Core PR Review Club is a monthly online meetup for discussing PRs and boosting your understanding of the codebase.",
            link: "https://bitcoincore.reviews",
          },
        ],
      },
      {
        title: "What's Next",
        description:
          "Contributing to Bitcoin Core requires a stoic patience to onboard to a C++ codebase now in its teenage years. 99% of the nodes on the network run Bitcoin Core making it the bedrock of the ecosystem. If you are looking for a project that moves fast and breaks things, this is NOT the right fit for you. There are ~30 full-time contributors to Bitcoin Core and only a few newcomers join their ranks each year. Are you up for the challenge?",
        items: [],
      },
    ],
  },
  "lightning-open-source": {
    title: "Lightning Open Source Development",
    description:
      "Lightning Network provides fast and inexpensive payments, addressing some of the scalability issues that bitcoin faces at the base layer. Lightning much younger than bitcoin and technical challenges remain. But for those that are ready to jump into the fast-paced development of the protocol, Lightning presents a unique learning opportunity to contribute to a maturing protocol.",
    levels: [
      {
        title: "Level 1",
        description:
          "",
        items: [
          {
            image:
              "/curriculums/lighting-infra-development/chaincode-ln-seminar.jpg",
            title: "Chaincode LN Seminar",
            subTitle: "",
            description:
              "This program is curated to cover key aspects of Lightning Network protocol development, offering discussion questions and hands-on sessions to be completed solo or with a cohort of fellow learners.",
            link: "https://learning.chaincode.com/#seminars",
          },
          {
            image:
              "/curriculums/lighting-infra-development/bitcoin-development-philosophy.jpg",
            title: "Bitcoin Development Philosophy",
            subTitle: "",
            description:
              "Gain a deeper understanding of Lightning's design trade-offs and philosophy, offering insights into over a decade of Bitcoin development and public debate.",
            link: "https://bitcoindevphilosophy.com/",
          },
          {
            image: "/curriculums/lighting-app-development/building-on-ln.jpg",
            title: "Building on LN",
            subTitle: "",
            description:
              "Build a Lightning graph visualizer, construct a simple game of ownership using paid invoices and dip your toes into advanced Lightning Network topics all using Typescript.",
            link: "https://buildonln.com",
          },
        ],
      },
      {
        title: "Level 2",
        description:
          "",
        items: [
          {
            image:
              "/curriculums/lighting-infra-development/ldk-pr-review-club.jpg",
            title: "LDK PR Review Club",
            subTitle: "",
            description:
              "Navigate the world of LDK with an every-other-Friday session aimed at mentoring newcomers to become full fledged contributors.",
            link: "https://ldk.reviews",
          },
          {
            image:
              "/curriculums/lighting-infra-development/mastering-lightning.jpg",
            title: "Mastering Lightning",
            subTitle: "",
            description:
              "The most comprehensive book on the technical side of the Lightning Network. Lightning is not simple so prepare to dive into some complexity.",
            link: "https://github.com/lnbook/lnbook",
          },
        ],
      },
      {
        title: "What's Next",
        description: (
          <>
            The four major Lightning implementations -{" "}
            <Link
              target="_blank"
              rel="noopener"
              className="text-green underline"
              href="https://github.com/lightningdevkit"
            >
              LDK
            </Link>
            ,{" "}
            <Link
              target="_blank"
              rel="noopener"
              className="text-green underline"
              href="https://github.com/lightningnetwork/lnd"
            >
              LND
            </Link>
            ,{" "}
            <Link
              target="_blank"
              rel="noopener"
              className="text-green underline"
              href="https://github.com/ElementsProject/lightning"
            >
              Core Lightning
            </Link>{" "}
            and{" "}
            <Link
              target="_blank"
              rel="noopener"
              className="text-green underline"
              href="https://github.com/ACINQ/eclair"
            >
              Eclair
            </Link>{" "}
            are backed by core teams. Lightning protocol development moves
            faster than the bitcoin protocol. Given that Lightning is still
            young, there are more rough edges to smooth and problems to sort.
            The best way to get involved is to jump on their slack or discord
            and start picking up issues.
          </>
        ),
        items: [],
      },
    ],
  },
} as const satisfies Curriculums;

export type KnownCurriculums = keyof typeof curriculums;
