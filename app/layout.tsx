import Fonts, { barlow } from "@/components/font";
import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";
import type { Metadata } from "next";
import "./globals.css";
import { Banner } from "@/components/banner";

export const metadata: Metadata = {
  title: "The Bitcoin Dev Project",
  description: "Find your way in bitcoin open source development",
  openGraph: {
    images: ["https://bitcoindevs.xyz/hero.jpg"],
    title: "The Bitcoin Dev Project",
    url: "https://bitcoindevs.xyz",
    description: "Find your way in bitcoin open source development",
  },
  twitter: {
    images: ["https://bitcoindevs.xyz/square-hero.jpg"],
    card: "summary",
  },
  keywords:
    "bitcoin, lightning, bitcoin development, bitcoin open source, bitcoin FOSS, bitcoin career, free open source software, open source, bitcoin development, bitcoin development community, bitcoin development resources, bitcoin development tools, bitcoin development guides, bitcoin development courses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <script async src="https://visits.bitcoindevs.xyz/script.js" data-website-id="4ee856e4-582c-4a9c-a1c5-10757123803e"></script>
      <body className={barlow.className}>
        <Fonts />
        <NavBar />
        <Banner
          headingText="Start your career in bitcoin open source in 2024"
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
