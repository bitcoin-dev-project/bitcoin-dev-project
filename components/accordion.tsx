"use client";

import React, { useState } from "react";

type Props = {
  content: string;
  title: string;
};

export default function Accordion({ content, title }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const visibilityStyle = isOpen ? "h-auto opacity-100 mb-4" : "h-0 opacity-0";
  const iconStyle = isOpen ? "rotate-180" : "";

  return (
    <div className="flex transition-all flex-col border rounded-lg border-[#D3D3D3] self-center w-[50%] lg:w-full">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex justify-between items-center p-7 md:p-4"
      >
        <h3 className="text-2xl md:text-base leading-normal font-inter font-bold text-left">
          {title}
        </h3>
        <svg
          className={`${iconStyle} transition-all ease-linear  md:w-[16px] md:h-[16px]`}
          width="24"
          height="14"
          viewBox="0 0 24 14"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.7189 3.12534L12.7555 13.0888C12.1441 13.7002 11.1528 13.7002 10.5414 13.0888L0.578025 3.12534C-0.0333801 2.51394 -0.0333801 1.52266 0.578025 0.91125C1.18943 0.299846 2.18071 0.299846 2.79212 0.91125L11.6485 9.76762L20.5048 0.911251C21.1162 0.299846 22.1075 0.299846 22.7189 0.911251C23.3303 1.52266 23.3303 2.51394 22.7189 3.12534Z"
            fill="black"
          />
        </svg>
      </button>
      <p
        className={`${visibilityStyle} text-left mx-7 md:mx-4 md:text-sm font-medium inline-block transition-[height,opacity] ease-linear`}
      >
        {content}
      </p>
    </div>
  );
}
