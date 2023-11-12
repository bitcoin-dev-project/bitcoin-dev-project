"use client";

import { learnSection } from "@/content/data";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hidden sm:flex">
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => setIsOpen((VALUE) => !VALUE)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-grey bg-opacity-75 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={clsx(
          `flex flex-col fixed inset-y-0 right-0 w-2/3 bg-white z-50 transform p-6 gap-4  transition-transform`,
          {
            "translate-x-0": isOpen,
            "translate-x-full": !isOpen,
          }
        )}
      >
        <button type="button" onClick={() => setIsOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="24"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <div className="flex flex-col flex-1 gap-6 bg-white h-full">
          {learnSection.data.map((item) => (
            <Link
              onClick={() => setIsOpen(false)}
              className="font-semibold text-lg"
              key={item.slug}
              href={`/${item.slug}/curriculum`}
            >
              {item.shortTitle}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
