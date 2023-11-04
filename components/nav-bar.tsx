import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <nav className="flex w-[100vw]">
      <div className="w-full border-b-2 border-b-orange flex flex-col">
        <div className="flex items-center justify-between p-6">
          <Link href="/">
            <h1 className="text-xl font-bold sm:text-3xl">
              The&nbsp;<span className="text-orange">Bitcoin</span>&nbsp;Dev
              Project
            </h1>
          </Link>
          <div className="sm:hidden flex items-center gap-x-[24px]">
            <Link href={"#"}>Bitcoin Dev</Link>
            <Link href={"#"}>Lightning Dev</Link>
            <Link href={"#"}>Lightning App</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
