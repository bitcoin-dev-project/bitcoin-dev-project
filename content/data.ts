import { slugify } from "@/utils/slugify";

export const toolsData = [
  {
    name: "Chat BTC",
    href: "https://chat.bitcoinsearch.xyz",
    src: "/chat-btc.jpg",
  },
  {
    name: "Saving Satoshi",
    href: "https://savingsatoshi.com",
    src: "/saving-satoshi.jpg",
  },
  {
    name: "Bitcoin Transcripts",
    href: "https://review.btctranscripts.com/",
    src: "/bitcoin-transcript.jpg",
  },
  {
    name: "Bitcoin Search",
    href: "https://bitcoinsearch.xyz",
    src: "/bitcoin-search.jpg",
  },
];

export const faqs = [
  {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptatum nemo necessitatibus quaerat rerum officiis nesciunt praesentium, id, itaque voluptatibus a tempora fuga laboriosam modi blanditiis incidunt earum. Tempore, deserunt?",
    title: "I'm not a dev but I want to learn more about bitcoin",
  },
  {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptatum nemo necessitatibus quaerat rerum officiis nesciunt praesentium, id, itaque voluptatibus a tempora fuga laboriosam modi blanditiis incidunt earum. Tempore, deserunt?",
    title: "I'd like to learn how to become a dev",
  },
  {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptatum nemo necessitatibus quaerat rerum officiis nesciunt praesentium, id, itaque voluptatibus a tempora fuga laboriosam modi blanditiis incidunt earum. Tempore, deserunt?",
    title: "Where do I learn about funding in bitcoin and FOSS?",
  },
  {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptatum nemo necessitatibus quaerat rerum officiis nesciunt praesentium, id, itaque voluptatibus a tempora fuga laboriosam modi blanditiis incidunt earum. Tempore, deserunt?",
    title: "What is the meaning of life?",
  },
];

export const learnSection = {
  title: "Learn",
  data: [
    {
      description:
        "Learning resources for your journey to become a Bitcoin Core developer.",
      btnText: "Learn",
      src: "/bitcoin-infra-development.jpg",
      title: "Bitcoin Infrastructure Development",
    },
    {
      description:
        "Learning resources for your journey to becoming a Infrastructure developer.",
      btnText: "Learn",
      src: "/lighting-infra-development.jpg",
      title: "Lightning Infrastructure Development",
    },
    {
      description:
        "Discover the wide range of applications you can build with lightning.",
      btnText: "Learn",
      src: "/lighting-app-development.jpg",
      title: "Lightning Infrastructure Development",
    },
  ],
};

export const buildSection = {
  title: "Build",
  data: [
    {
      description:
        "Discover the wide range of applications you can build with lightning.",
      btnText: "Learn",
      src: "/build.jpg",
      title: "Lightning Infrastructure Development",
    },
  ],
};

export const contributeSection = {
  title: "Contribute",
  data: [
    {
      description:
        "Discover the wide range of applications you can build with lightning.",
      btnText: "Learn",
      src: "/contribute.jpg",
      title: "Lightning Infrastructure Development",
    },
  ],
};

export const pointers = [
  {
    btnText: "Learn",
    description: "Guided journey for development on bitcoin and lightning",
    jumpTo: `#${slugify(learnSection.title)}`,
  },
  {
    btnText: "Contribute",
    description: "Resources to teach you to contribute to bitcoin & lightning",
    jumpTo: `#${slugify(contributeSection.title)}`,
  },
  {
    btnText: "Build",
    description: "Hands-on and theoretical supports to build applications",
    jumpTo: `#${slugify(buildSection.title)}`,
  },
];

// Mock of curriculum levels, this is just to display data in the curriculum template page
export const curriculumLevels = [
  {
    color: "text-orange",
    image: "/hero.jpg",
    title: "Novice",
    gradient: "from-orange to-yellow",
    description:
      "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
    items: [
      {
        title: "Mastering Bitcoin",
        subTitle: "The de-facto book on Bitcoin development",
        description:
          "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
      },
      {
        title: "Bitcoin Development Philosophy",
        subTitle:
          "Gain a deeper understanding of bitcoin’s development philosophy",
        description:
          "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
      },
    ],
  },
  {
    color: "text-yellow",
    image: "/hero.jpg",
    title: "Intermediate",
    gradient: "from-yellow to-light-orange",
    description:
      "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
    items: [
      {
        title: "Learn Bitcoin From the Command Line",
        subTitle: "Describe the value this gives me",
        description:
          "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
      },
      {
        title: "Core Lightning by Blockstream on GitHub With Flowers and Roses",
        subTitle: "Describe the value this gives me",
        description:
          "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
      },
    ],
  },
  {
    color: "text-green",
    image: "/hero.jpg",
    title: "Wizard",
    gradient: "from-green to-bright-cyan",
    description:
      "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
    items: [
      {
        title: "Learn Bitcoin From the Command Line",
        subTitle: "Describe the value this gives me",
        description:
          "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
      },
      {
        title: "Core Lightning by Blockstream on GitHub With Flowers and Roses",
        subTitle: "Describe the value this gives me",
        description:
          "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
      },
    ],
  },
];
