import { learnSection } from "@/content/data";
import Link from "next/link";
import Drawer from "./drawer";

export default function NavBar() {
  return (
    <nav className="justify-center border-b-2 border-b-orange flex w-full m-auto">
      <div className="w-full flex flex-col max-w-7xl">
        <div className="flex items-center justify-between p-6">
          <Link href="/">
            <h1 className="text-xl font-bold sm:text-base">
              The&nbsp;<span className="text-orange">Bitcoin</span>&nbsp;Dev
              Project
            </h1>
          </Link>
          <Drawer />
          <div className="sm:hidden flex items-center gap-x-[24px]">
            <div className="dropdown">
              <div className="dropdown-content">
                <Link href="/bitcoin-core">Bitcoin Core</Link>
                <Link href="/lightning-foss">Lightning FOSS</Link>
              </div>
            </div>
            {learnSection.data.map((item) => (
              <Link key={item.slug} href={`/${item.slug}`}>
                {item.shortTitle}
              </Link>
            ))}
            <Link href="/tools">
              Tools
            </Link>
            <Link href="/about">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
