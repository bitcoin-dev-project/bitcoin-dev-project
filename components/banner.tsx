"use client";

import clsx from "clsx";
import { useState } from "react";

type Links =
  | {
      linkText?: undefined;
    }
  | {
      linkText: string;
      linkTo: string;
    };
type Props = Links & {
  bodyText?: string;
  headingText?: string;
};

export function Banner({ bodyText, headingText, ...rest }: Props) {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div
      className={clsx(
        "flex items-center justify-between w-full bg-bg-color px-8 sm:px-2 shadow-md transition-all duration-200 ease-in-out text-center",
        {
          "h-16": showBanner && !!headingText,
          "h-12": showBanner && !headingText,
          "h-0 overflow-hidden": !showBanner,
        }
      )}
    >
      <div className="flex flex-col flex-1 px-8 sm:px-2">
        {!!headingText && (
          <h3 className="font-semibold text-lg sm:text-sm">{headingText}</h3>
        )}
        {!!bodyText && <p className="sm:text-xs">{bodyText}</p>}
        {!!rest.linkText && (
          <a
            className="text-orange underline font-semibold md:text-sm sm:text-xs"
            href={rest.linkTo}
          >
            {rest.linkText}
          </a>
        )}
      </div>
      <button
        onClick={() => setShowBanner(false)}
        className={clsx(
          "text-orange hover:text-bright-orange absolute right-0 mx-8 sm:mx-2 transition-all duration-200 ease-in-out",
          {
            "opacity-1": showBanner,
            "opacity-0": !showBanner,
          }
        )}
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
