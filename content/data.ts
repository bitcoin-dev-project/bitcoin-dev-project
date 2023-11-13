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
  slug: string;
  data: {
    description: string;
    btnText: string;
    src: string;
    title: string;
    shortTitle?: string;
    slug: string;
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
  title: "Learn",
  slug: "learn",
  data: [
    {
      description:
        "Learning resources for your journey to become a Bitcoin Core developer.",
      btnText: "Learn",
      src: "/bitcoin-infra-development.jpg",
      title: "Bitcoin Infrastructure Development",
      shortTitle: "Bitcoin Dev",
      slug: "",
    },
    {
      description:
        "Learning resources for your journey to becoming a Infrastructure developer.",
      btnText: "Learn",
      src: "/lighting-infra-development.jpg",
      title: "Lightning Infrastructure Development",
      shortTitle: "Lightning Dev",
      slug: "",
    },
    {
      description:
        "Discover the wide range of applications you can build with lightning.",
      btnText: "Learn",
      src: "/lighting-app-development.jpg",
      title: "Lightning Application Development",
      shortTitle: "Lightning App",
      slug: "",
    },
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
    },
  ],
});

export const contributeSection = createSection({
  title: "Contribute",
  slug: "contribute",
  data: [
    {
      description: "Add content here.",
      btnText: "Learn",
      src: "/contribute.jpg",
      title: "Contribute by reviewing PR's",
      slug: "",
    },
  ],
});

export const pointers = [
  {
    btnText: "Learn",
    description: "Guided journey for development on bitcoin and lightning",
    jumpTo: `#${learnSection.slug}`,
  },
  {
    btnText: "Contribute",
    description: "Resources to teach you to contribute to bitcoin & lightning",
    jumpTo: `#${contributeSection.slug}`,
  },
  {
    btnText: "Build",
    description: "Hands-on and theoretical supports to build applications",
    jumpTo: `#${buildSection.slug}`,
  },
];
