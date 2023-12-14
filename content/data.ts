import { slugify } from "@/utils/slugify";

export const toolsData = [
  {
    name: "Transcript Review",
    href: "https://review.btctranscripts.com/",
    src: "/btc-transcript-editor.jpg",
  },
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
    href: "https://btctranscripts.com/",
    src: "/bitcoin-transcript.jpg",
  },
  {
    name: "Bitcoin TLDR",
    href: "https://tldr.bitcoinsearch.xyz/",
    src: "/tldr.jpg",
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

type Section = {
  title: string;
  description?: string;
  slug: string;
  data: {
    description: string;
    btnText: string;
    src: string;
    title: string;
    shortTitle?: string;
    slug: string;
    href?: string;
  }[];
};

const createSection = (section: Section) => ({
  ...section,
  data: section.data.map((node) => ({
    ...node,
    slug: slugify(node.title),
  })),
});

export const learnSection = createSection({
  title: "Start Your FOSS Journey",
  slug: "explore",
  data: [
    {
      description: "Discover bitcoin and lightning FOSS Projects",
      btnText: "Explore",
      src: "/bitcoin-infra-development.jpg",
      title: "Projects",
      shortTitle: "Projects",
      slug: "/projects",
    },
    {
      description: "Start your career in FOSS",
      btnText: "Career",
      src: "/lighting-infra-development.jpg",
      title: "Career",
      shortTitle: "Career",
      slug: "/career",
    },
  ],
});

export const links = [
  {
    text: "Projects",
    linkTo: "/projects",
  },
  {
    text: "Career",
    linkTo: "/career",
  },
  {
    text: "Tools",
    linkTo: "/tools",
  },
  {
    text: "About",
    linkTo: "/about",
  },
];

export const contributeSection = createSection({
  title: "Projects",
  slug: "projects",
  data: [
    {
      description: "Discover Bitcoin FOSS projects",
      btnText: "Discover",
      src: "/contribute.jpg",
      title: "Contribute by reviewing PR's",
      slug: "",
      href: "/projects",
    },
  ],
});

export const exploreSection = createSection({
  title: "Explore tools and resources",
  description:
    "Explore tools built by the Bitcoin Dev Project in addition to some others we cannot live without.",
  slug: "learn",
  data: [
    {
      description: "Chat with your favorite bitcoin sources and authors",
      btnText: "Chat",
      src: "/chat-btc.jpg",
      title: "Chat BTC",
      slug: "",
      href: "https://chat.bitcoinsearch.xyz",
    },
    {
      description: "The technical bitcoin search engine we deserve",
      btnText: "Search",
      src: "/bitcoin-search.jpg",
      title: "Bitcoin Search",
      slug: "",
      href: "https://bitcoinsearch.xyz",
    },
    {
      description:
        "Bitcoin-dev and Lightning-dev mailing list, summaries and discovery",
      btnText: "Read",
      src: "/tldr.jpg",
      title: "Bitcoin TLDR",
      slug: "",
      href: "https://tldr.bitcoinsearch.xyz/",
    },
    {
      description:
        "Peruse archives of transcribed talks, podcasts and lectures",
      btnText: "Read",
      src: "/bitcoin-transcript.jpg",
      title: "Bitcoin Transcripts",
      slug: "",
      href: "https://btctranscripts.com/",
    },
    {
      description:
        "Contribute to BTC transcripts by reviewing AI-generated copy",
      btnText: "Contribute",
      src: "/btc-transcript-editor.jpg",
      title: "Transcript Review",
      slug: "",
      href: "https://review.btctranscripts.com/",
    },
    {
      description:
        "An interactive science fiction story designed to inspire a generation to fall in love with bitcoin",
      btnText: "Play",
      src: "/saving-satoshi.jpg",
      title: "Saving Satoshi",
      slug: "",
      href: "https://savingsatoshi.com",
    },
  ],
});

export const pointers = [
  {
    btnText: "Explore Bitcoin Core",
    description: "",
    jumpTo: `/bitcoin-foss`,
  },
  {
    btnText: "Explore Lightning FOSS",
    description: "",
    jumpTo: `/lightning-foss`,
  },
];
