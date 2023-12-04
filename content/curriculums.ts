import { Page } from "./types";

export type Curriculums = Record<string, Page>;

export const curriculums = {
  "bitcoin-foss": {
    title: "Bitcoin FOSS Development",
    description:
      "Originally written by Satoshi Nakamoto, bitcoin proved that purely peer-to-peer electronic cash, one of the hardest computing problems, was possible. Becoming a Bitcoin Core developer is not for everyone but those that do the work to summit the mountain contribute to a legendary codebase designed to span generations.",
    levels: [
      {
        title: "Explorer",
        description:
          "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
        items: [
          {
            image:
              "/curriculums/bitcoin-infra-development/mastering-bitcoin.jpg",
            title: "Programming the Open Blockchain",
            subTitle: "The de-facto book on Bitcoin development",
            description:
              "The canonical primer on understanding the technical side of bitcoin. The 3rd edition promises to be the best release yet.",
            link: "https://github.com/bitcoinbook/bitcoinbook",
          },
          {
            image:
              "/curriculums/bitcoin-infra-development/bitcoin-development-philosophy.jpg",
            title: "Bitcoin Development Philosophy",
            subTitle:
              "A Study of the Philosophy of Bitcoin Development",
            description:
              "Gain a deeper understanding of Bitcoin's design trade-offs and philosophy, offering insights into over a decade of Bitcoin development and public debate. This resource provides a critical framework for evaluating and innovating within the Bitcoin ecosystem.",
            link: "https://bitcoindevphilosophy.com/",
          },
        ],
      },
      {
        title: "Voyager",
        description:
          "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
        items: [
          {
            image:
              "/curriculums/bitcoin-infra-development/chaincode-bitcoin-seminar.jpg",
            title: "Chaincode Bitcoin Seminar",
            subTitle: "A Curated Dive into Bitcoin Protocol Development",
            description:
              "Take the program at your own pace or through a cohort of other keen explorers. By the end, you'll have a stronger grasp of the decisions that went into bitcoin and what that means for development moving forward.",
            link: "https://learning.chaincode.com/#seminars",
          },
          {
            image:
              "/curriculums/bitcoin-infra-development/learn-bitcoin-from-command-line.jpg",
            title: "Learn Bitcoin from the command line",
            subTitle:
              "Hands-on Tutorial That Teaches Direct Interaction with Your Bitcoin Node",
            description:
              "Use your own Bitcoin node to execute transactions, script Bitcoin operations, integrate with hardware wallets and hidden services with this step by step guide.",
            link: "https://github.com/BlockchainCommons/Learning-Bitcoin-from-the-Command-Line"
          },
          {
            image:
              "/curriculums/bitcoin-infra-development/transaction-tutorial.jpg",
            title: "Transaction Tutorial",
            subTitle:
              "Bitcoin Transactions from the Inside Out",
            description:
              "Get on a first name basis with SegWit and Taproot transactions. Add sighashes and timelocks to your list of friends by creating and signing Bitcoin transactions using a local bitcoind instance via Jupyter notebooks.",
            link: "https://github.com/chaincodelabs/bitcoin-tx-tutorial",
          },
          {
            image: "/curriculums/bitcoin-infra-development/minesim.jpg",
            title: "Minesim",
            subTitle:
              "Master Bitcoin Mining with Minesim Simulator",
            description:
              "Dive into the intricate world of Bitcoin mining with Minesim, a comprehensive POW mining simulator. This tool offers a hands-on experience in simulating various aspects of mining networks, including block discovery, peer node configuration, and chain splits, using realistic Poisson distribution models.",
            link: "https://github.com/LarryRuane/minesim"
          },
          {
            image:
              "/curriculums/bitcoin-infra-development/tiny-bitcoin-peer.jpg",
            title: "Tinybitcoinpeer",
            subTitle:
              "Explore the Permissionless Bitcoin Networking",
            description:
              "TinyBitcoinPeer offers a unique and playful way to understand Bitcoin's network dynamics. Connect to live nodes on the network, engage in basic network interactions like handshakes, and respond to pings with 150 lines of Python.",
            link: "https://github.com/willcl-ark/tinybitcoinpeer"
          },
          {
            image:
              "/curriculums/bitcoin-infra-development/schnorr-taproot-workshop.jpg",
            title: "Schnorr Taproot Workshop",
            subTitle:
              "Unlock Bitcoin's Future with Schnorr/Taproot Workshop",
            description:
              "The Schnorr/Taproot Workshop by Bitcoin Optech is an invaluable resource for delving into Bitcoin's latest softfork. Featuring interactive Jupyter notebooks, the workshop covers Schnorr signatures, MuSig aggregation, and Taproot applications.",
            link: "https://bitcoinops.org/en/schorr-taproot-workshop/"
          },
        ],
      },
      {
        title: "Conqueror",
        description:
          "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
        items: [
          {
            image:
              "/curriculums/bitcoin-infra-development/onboarding-to-bitcoin-core.jpg",
            title: "Onboarding to Bitcoin Core",
            subTitle: "Discover Bitcoin Core's Missing Onboarding Guide",
            description:
              "This guide covers both the technical components such as, architecture, consensus, validation, the wallet, P2P, and script, but also introduces the under-documented social aspects like PR etiquette and understanding the decentralized development process.",
            link: "https://bitcoincore.academy"
          },
          {
            image: "/curriculums/bitcoin-infra-development/pr-review-club.jpg",
            title: "Bitcoin Core PR Review Club",
            subTitle: "Review real Bitcoin Core PRs with the Crew",
            description:
              "The Bitcoin Core PR Review Club is a monthly meetup for discussing Bitcoin Core PRs and boosting your understanding of the codebase. It's an open invitation for anyone eager to learn and contribute, with hands-on guidance through the PR review process.",
            link: "https://bitcoincore.reviews"
          },
        ],
      },
      {
        title: "What's Next",
        description:
          "Contributing to Bitcoin Core requires a stoic patience to onboard to a C++ codebase now in its teenage years. But since 99% of the nodes on the network run Bitcoin Core, it is the backbone of the ecosystem and if you've read Bitcoin Development Philosophy, then it is obvious that it is a philosophically driven project.",
        items: [],
      },
    ],
  },
  "lightning-foss": {
    title: "Lightning FOSS Development",
    description:
      "Bitcoin ipsum dolor sit amet. Private key key pair outputs soft fork, stacking sats halvening mempool halvening! Whitepaper, block height, blockchain mining, hash private key, UTXO sats. Mempool difficulty transaction consensus double-spend problem whitepaper hash mining! Sats UTXO timestamp server stacking sats.",
    levels: [
      {
        title: "Pioneer",
        description:
          "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
        items: [
          {
            image:
              "/curriculums/lighting-infra-development/chaincode-ln-seminar.jpg",
            title: "Chaincode LN Seminar",
            subTitle: "The de-facto book on Bitcoin development",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
            link: "https://learning.chaincode.com/#seminars",
          },
          {
            image:
              "/curriculums/lighting-infra-development/bitcoin-development-philosophy.jpg",
            title: "Bitcoin Development Philosophy",
            subTitle:
              "Gain a deeper understanding of bitcoin's development philosophy",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
            link: "https://bitcoindevphilosophy.com/",
          },
        ],
      },
      {
        title: "Navigator",
        description:
          "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
        items: [
          {
            image:
              "/curriculums/lighting-infra-development/ldk-pr-review-club.jpg",
            title: "LDK PR Review Club",
            subTitle: "The de-facto book on Bitcoin development",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
            link: "https://ldk.reviews"
          },
          {
            image: "/curriculums/lighting-app-development/building-on-ln.jpg",
            title: "Building on LN",
            subTitle: "The de-facto book on Bitcoin development",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
            link: "https://buildonln.com"
          },
          {
            image:
              "/curriculums/lighting-infra-development/mastering-lightning.jpg",
            title: "Mastering Lightning",
            subTitle: "The de-facto book on Bitcoin development",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
            link: "https://github.com/lnbook/lnbook"
          },
        ],
      },
      {
        title: "What's Next",
        description:
          "The four major Lightning implementations - LDK, LND, Core Lightning and Eclair are backed by core teams. Lightning protocol development moves faster than the bitcoin protocol. Given that Lightning is still young, there are more rough edges to smooth and problems to sort. The best way to get involved is to jump on their slack or discord and start picking up issues. Join in - it's a striking opportunity!",
        items: [],
      },
    ],
  },
} as const satisfies Curriculums;

export type KnownCurriculums = keyof typeof curriculums;
