import { Page } from "./types";

export const tools = {
  title: "Explore tools and resources",
  description:
    "Explore tools built by the Bitcoin Dev Project in addition to some others we cannot live without.",
  levels: [
    {
      title: "",
      description: "",
      items: [
        {
          description: "Bitcoin Optech is the best source to stay up to date with technical developments.",
          image: "/tools/optech.jpg",
          title: "Bitcoin Optech",
          subTitle: "",
          link: "https://bitcoinops.org",
        },
        {
          description: "Chat with your favorite bitcoin sources and authors.",
          image: "/tools/chat-btc.jpg",
          title: "Chat BTC",
          subTitle: "",
          link: "https://chat.bitcoinsearch.xyz",
        },
        {
          image: "/tools/bitcoin-search.jpg",
          description: "The technical bitcoin search engine we deserve.",
          title: "Bitcoin Search",
          subTitle: "",
          link: "https://bitcoinsearch.xyz",
        },
        {
          description: "Bitcoin-dev and Lightning-dev mailing list summaries and discovery.",
          image: "/tools/bitcoin-tldr.jpg",
          title: "Bitcoin TLDR",
          subTitle: "",
          link: "https://tldr.bitcoinsearch.xyz/",
        },
        {
          
          description: "Peruse archives of transcribed talks, podcasts and lectures.",
          image: "/tools/bitcoin-transcripts.jpg",
          title: "Bitcoin Transcripts",
          subTitle: "",
          link: "https://btctranscripts.com/",
        },
        {
          description: "Earn sats and contribute to BTC transcripts by reviewing AI-generated copy.",
          image: "/tools/bitcoin-transcripts-review.jpg",
          title: "Transcript Review",
          subTitle: "",
          link: "https://review.btctranscripts.com/",
        },
        {
          description: "An interactive science fiction game designed to inspire a generation to fall in love with bitcoin.",
          image: "/tools/saving-satoshi.jpg",
          title: "Saving Satoshi",
          subTitle: "",
          link: "https://savingsatoshi.com",
        },
        {
          title: "Polar",
          subTitle: "",
          description:
            "One-click lightning networks for local app development and testing",
          image: "/projects/polar.jpg",
          link: "https://lightningpolar.com",
        },
      ],
    },
  ],
} satisfies Page;
