import Fonts, { barlow } from "@/components/font";
import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";
import type { Metadata } from "next";
import "./globals.css";
import { Banner } from "@/components/banner";

export const metadata: Metadata = {
  title: "The Bitcoin Dev Project",
  description: "Find your way in bitcoin FOSS",
  openGraph: {
    images: ["https://bitcoindevs.xyz/landscape.jpg"],
    title: "The Bitcoin Dev Project",
    url: "https://bitcoindevs.xyz",
    description: "Find your way in bitcoin FOSS",
  },
  twitter: {
    images: ["https://bitcoindevs.xyz/landscape.jpg"],
    card: "summary_large_image",
  },
  keywords:
    "bitcoin, lightning, bitcoin development, bitcoin FOSS, bitcoin career, free open source software, open source, bitcoin development, bitcoin development community, bitcoin development resources, bitcoin development tools, bitcoin development guides, bitcoin development courses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={barlow.className}>
        <Fonts />
        <NavBar />
        <Banner
          headingText="Start your career in bitcoin foss with Chaincode Labs"
          linkText="APPLY TODAY!"
          linkTo="https://learning.chaincode.com/#FOSS"
        />
        <div className="flex flex-grow flex-col min-h-screen max-w-7xl m-auto">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
