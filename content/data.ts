import { slugify } from "@/utils/slugify";

export const toolsData = [
  {
    name: "Transcript Review",
    href: "https://review.btctranscripts.com/",
    src: "/tools/bitcoin-transcripts-review.jpg",
  },
  {
    name: "Chat BTC",
    href: "https://chat.bitcoinsearch.xyz",
    src: "/tools/chat-btc.jpg",
  },
  {
    name: "Saving Satoshi",
    href: "https://savingsatoshi.com",
    src: "/tools/saving-satoshi.jpg",
  },
  {
    name: "Bitcoin Transcripts",
    href: "https://btctranscripts.com/",
    src: "/tools/bitcoin-transcripts.jpg",
  },
  {
    name: "Bitcoin TLDR",
    href: "https://tldr.bitcoinsearch.xyz/",
    src: "/tools/bitcoin-tldr.jpg",
  },
  {
    name: "Bitcoin Search",
    href: "https://bitcoinsearch.xyz",
    src: "/tools/bitcoin-search.jpg",
  },
];

export const faqs = [
  {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptatum nemo necessitatibus quaerat rerum officiis nesciunt praesentium, id, itaque voluptatibus a tempora fuga laboriosam modi blanditiis incidunt earum. Tempore, deserunt?",
    title: "I'm not a dev but I want to learn more about bitcoin",
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
  title: "Start Your Open Source Journey",
  slug: "explore",
  data: [
    {
      description: "Discover bitcoin and lightning open source projects",
      btnText: "Dive In",
      src: "/bitcoin-infra-development.jpg",
      title: "Projects",
      shortTitle: "Projects",
      slug: "/projects",
    },
    {
      description: "Begin your career in bitcoin open source development",
      btnText: "Start",
      src: "/lightning-infra-development.jpg",
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
      description: "Discover Bitcoin Open Source Projects",
      btnText: "Discover",
      src: "/contribute.jpg",
      title: "Contribute by reviewing PR's",
      slug: "",
      href: "/projects",
    },
  ],
});

export const pointers = [
  {
    btnText: "Explore Bitcoin Core",
    description: "",
    jumpTo: `/bitcoin-core`,
  },
  {
    btnText: "Explore Lightning",
    description: "",
    jumpTo: `/lightning-open-source`,
  },
];

export const navPointers = [
  {
    btnText: "Bitcoin Core",
    description: "",
    jumpTo: `/bitcoin-core`,
  },
  {
    btnText: "Lightning Open Source",
    description: "",
    jumpTo: `/lightning-open-source`,
  },
];
