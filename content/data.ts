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
  slug: "learn",
  data: [
    {
      description:
        "Become a Bitcoin Core Contributor",
      btnText: "Learn",
      src: "/bitcoin-infra-development.jpg",
      title: "Bitcoin FOSS",
      shortTitle: "Bitcoin Dev",
      slug: "/bitcoin-foss/curriculum",
    },
    {
      description:
        "Become a Lightning FOSS Developer",
      btnText: "Learn",
      src: "/lighting-infra-development.jpg",
      title: "Lightning FOSS",
      shortTitle: "Lightning Dev",
      slug: "/lightning-foss/curriculum",
    }
  ],
});

export const buildSection = createSection({
  title: "Build",
  slug: "build",
  data: [
    {
      description: "Add content here.",
      btnText: "Learn",
      src: "/build.jpg",
      title: "Build on bitcoin and lightning",
      slug: "",
      href: "/",
    },
  ],
});

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
    "Some  text here Some  text hereSome  text hereSome  text hereSome  text hereSome  text hereSome  text hereSome  text hereSome  text hereSome  text hereSome  text hereSome  text hereSome  text hereSome  text hereSome  text hereSome  text hereSome  text",
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
    btnText: "Learn",
    description: "Start your journey on bitcoin and lightning FOSS",
    jumpTo: `#${learnSection.slug}`,
  },
  {
    btnText: "Build",
    description: "Hands-on tutorials to get your hands dirty",
    jumpTo: `#${buildSection.slug}`,
  },
];
