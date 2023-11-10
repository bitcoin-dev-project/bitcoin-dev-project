export type Curriculum = {
  title: string;
  description: string;
  levels: {
    color: string;
    title: string;
    description: string;
    items: {
      image: string;
      title: string;
      subTitle: string;
      description: string;
    }[];
  }[];
};
export type KnownCurriculums =
  | "bitcoin-infrastructure-development"
  | "lightning-infrastructure-development"
  | "lightning-application-development";
export type Curriculums = Record<KnownCurriculums, Curriculum>;

export const curriculums: Curriculums = {
  "bitcoin-infrastructure-development": {
    title: "Bitcoin Infrastructure Developement",
    description:
      "Bitcoin ipsum dolor sit amet. Private key key pair outputs soft fork, stacking sats halvening mempool halvening! Whitepaper, block height, blockchain mining, hash private key, UTXO sats. Mempool difficulty transaction consensus double-spend problem whitepaper hash mining! Sats UTXO timestamp server stacking sats.",
    levels: [
      {
        color: "text-orange",
        title: "Explorer",
        description:
          "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
        items: [
          {
            image:
              "/curriculums/bitcoin-infra-development/mastering-bitcoin.jpg",
            title: "Mastering Bitcoin",
            subTitle: "The de-facto book on Bitcoin development",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
          },
          {
            image:
              "/curriculums/bitcoin-infra-development/bitcoin-development-philosophy.jpg",
            title: "Bitcoin Development Philosophy",
            subTitle:
              "Gain a deeper understanding of bitcoin's development philosophy",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
          },
        ],
      },
      {
        color: "text-yellow",
        title: "Voyager",
        description:
          "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
        items: [
          {
            image:
              "/curriculums/bitcoin-infra-development/chaincode-bitcoin-seminar.jpg",
            title: "Chaincode Bitcoin Seminar",
            subTitle: "The de-facto book on Bitcoin development",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
          },
          {
            image:
              "/curriculums/bitcoin-infra-development/learn-bitcoin-from-command-line.jpg",
            title: "Learn Bitcoin from the command line",
            subTitle:
              "Gain a deeper understanding of bitcoin's development philosophy",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
          },
          {
            image:
              "/curriculums/bitcoin-infra-development/transaction-tutorial.jpg",
            title: "Transaction Tutorial",
            subTitle:
              "Gain a deeper understanding of bitcoin's development philosophy",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
          },
          {
            image: "/curriculums/bitcoin-infra-development/minesim.jpg",
            title: "Minesim",
            subTitle:
              "Gain a deeper understanding of bitcoin's development philosophy",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
          },
          {
            image:
              "/curriculums/bitcoin-infra-development/tiny-bitcoin-peer.jpg",
            title: "Tinybitcoinpeer",
            subTitle:
              "Gain a deeper understanding of bitcoin's development philosophy",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
          },
          {
            image:
              "/curriculums/bitcoin-infra-development/schnorr-taproot-workshop.jpg",
            title: "Schnorr Taproot Workshop",
            subTitle:
              "Gain a deeper understanding of bitcoin's development philosophy",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
          },
        ],
      },
      {
        color: "text-green",
        title: "Conqueror",
        description:
          "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
        items: [
          {
            image:
              "/curriculums/bitcoin-infra-development/onboarding-to-bitcoin-core.jpg",
            title: "Onboarding to Bitcoin Core",
            subTitle: "The de-facto book on Bitcoin development",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
          },
          {
            image: "/curriculums/bitcoin-infra-development/pr-review-club.jpg",
            title: "PR Review Club",
            subTitle: "The de-facto book on Bitcoin development",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
          },
        ],
      },
    ],
  },
  "lightning-infrastructure-development": {
    title: "Lightning Infrastructure Development",
    description:
      "Bitcoin ipsum dolor sit amet. Private key key pair outputs soft fork, stacking sats halvening mempool halvening! Whitepaper, block height, blockchain mining, hash private key, UTXO sats. Mempool difficulty transaction consensus double-spend problem whitepaper hash mining! Sats UTXO timestamp server stacking sats.",
    levels: [
      {
        color: "text-orange",
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
          },
          {
            image:
              "/curriculums/lighting-infra-development/bitcoin-development-philosophy.jpg",
            title: "Bitcoin Development Philosophy",
            subTitle:
              "Gain a deeper understanding of bitcoin's development philosophy",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
          },
        ],
      },
      {
        color: "text-yellow",
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
          },
          {
            image:
              "/curriculums/lighting-infra-development/lnd-pr-review-club.jpg",
            title: "LND PR Review Club",
            subTitle: "The de-facto book on Bitcoin development",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
          },
          {
            image:
              "/curriculums/lighting-infra-development/mastering-lightning.jpg",
            title: "Mastering Lightning",
            subTitle: "The de-facto book on Bitcoin development",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
          },
        ],
      },
    ],
  },
  "lightning-application-development": {
    title: "Lightning App Development",
    description:
      "Bitcoin ipsum dolor sit amet. Private key key pair outputs soft fork, stacking sats halvening mempool halvening! Whitepaper, block height, blockchain mining, hash private key, UTXO sats. Mempool difficulty transaction consensus double-spend problem whitepaper hash mining! Sats UTXO timestamp server stacking sats.",
    levels: [
      {
        color: "text-orange",
        title: "Pioneer",
        description:
          "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
        items: [
          {
            image: "/curriculums/lighting-app-development/building-on-ln.jpg",
            title: "Building on LN",
            subTitle: "The de-facto book on Bitcoin development",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
          },
        ],
      },
      {
        color: "text-yellow",
        title: "Navigator",
        description:
          "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
        items: [
          {
            image:
              "/curriculums/lighting-app-development/chaincode-ln-seminar.jpg",
            title: "Chaincode LN Seminar",
            subTitle: "The de-facto book on Bitcoin development",
            description:
              "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
          },
        ],
      },
    ],
  },
};
