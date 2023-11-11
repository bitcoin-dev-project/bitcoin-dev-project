import { learnSection } from "@/content/data";
import Link from "next/link";
import React from "react";
import Drawer from "./dawer";

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
            {learnSection.data.map((item) => (
              <Link key={item.slug} href={`/${item.slug}/curriculum`}>
                {item.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
