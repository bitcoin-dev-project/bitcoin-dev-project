"use client";

import clsx from "clsx";
import { useState } from "react";

type Props = {
  bodyText: string;
  headingText?: string;
};

export function Banner({ bodyText, headingText }: Props) {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div
      className={clsx(
        "flex items-center justify-between fixed top-28 left-1/2 transform -translate-x-1/2 w-4/5 bg-bg-color p-2 px-8 rounded-md shadow-md transition-transform duration-200 ease-in-out",
        {
          "translate-y-0": showBanner,
          "translate-y-[-200px]": !showBanner,
        }
      )}
    >
      <div className="flex flex-col">
        {!!headingText && (
          <h3 className="font-semibold text-lg">{headingText}</h3>
        )}
        <p>{bodyText}</p>
      </div>
      <button
        onClick={() => setShowBanner(false)}
        className="text-orange hover:text-bright-orange"
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
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
}
