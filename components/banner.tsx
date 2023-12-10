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
        "flex items-center justify-between w-full bg-bg-color px-8 shadow-md transition-all duration-200 ease-in-out",
        {
          "h-16 sm:h-12": showBanner && !!headingText,
          "h-12 sm:h-8": showBanner && !headingText,
          "h-0 overflow-hidden": !showBanner,
        }
      )}
    >
      <div className="flex flex-col">
        {!!headingText && (
          <h3 className="font-semibold text-lg sm:text-sm">{headingText}</h3>
        )}
        <p className="sm:text-xs">{bodyText}</p>
      </div>
      <button
        onClick={() => setShowBanner(false)}
        className="text-orange hover:text-bright-orange"
      >
        <svg
          className="h-6 w-6 sm:h-4 sm:w-4"
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
