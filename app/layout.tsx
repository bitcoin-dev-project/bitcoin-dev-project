import Fonts, { barlow } from "@/components/font";
import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Bitcoin Dev Project",
  description: "A place to learn about bitcoin development",
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
        <div className="flex flex-grow flex-col min-h-screen w-[100%]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
