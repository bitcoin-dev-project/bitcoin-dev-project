"use client";

import { toolsData } from "@/content/data";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import ToolsCard from "./tools-card";

export default function HomeCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = 120;
    }
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const offset = (ref?.current?.offsetWidth ?? 0) / toolsData.length + 80;
    if (ref?.current?.scrollLeft !== undefined) {
      if (direction === "left") {
        ref.current.scrollLeft -= offset;
      } else {
        ref.current.scrollLeft += offset;
      }
    }
  };

  return (
    <div className="flex md:flex-col overflow-y-scroll">
      <button
        onClick={() => handleScroll("left")}
        className="h-10 w-10 rounded-[20px] bg-bright-orange absolute self-center flex items-center justify-center z-10 ml-4 md:hidden"
      >
        <svg
          className="w-4 h-4"
          width="14"
          height="24"
          viewBox="0 0 14 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8747 22.7189L0.911199 12.7555C0.2998 12.1441 0.2998 11.1528 0.9112 10.5414L10.8747 0.578025C11.4861 -0.0333798 12.4773 -0.0333798 13.0888 0.578025C13.7002 1.18943 13.7002 2.18071 13.0888 2.79212L4.23238 11.6485L13.0887 20.5048C13.7002 21.1162 13.7002 22.1075 13.0887 22.7189C12.4773 23.3303 11.4861 23.3303 10.8747 22.7189Z"
            fill="black"
          />
        </svg>
      </button>
      <div
        ref={ref}
        className="flex md:flex-col md:items-center gap-10 py-20 md:py-6 overflow-x-auto scroll-smooth md:overflow-y-auto whitespace-nowrap no-scrollbar"
      >
        {toolsData.map((data, index) => (
          <ToolsCard
            className={clsx({
              "ml-10 md:ml-0": index === 0,
              "mr-10 md:mr-0": index === toolsData.length - 1,
            })}
            target="_blank"
            rel="noopener"
            key={data.name}
            alt={data.name}
            {...data}
          />
        ))}
      </div>
      <button
        onClick={() => handleScroll("right")}
        className="h-10 w-10 rounded-[20px] bg-bright-orange absolute self-center flex items-center justify-center z-10 right-0 mr-4 md:hidden"
      >
        <svg
          className="w-4 h-4"
          width="14"
          height="24"
          viewBox="0 0 14 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.12534 1.2811L13.0888 11.2445C13.7002 11.8559 13.7002 12.8472 13.0888 13.4586L3.12534 23.422C2.51394 24.0334 1.52266 24.0334 0.911251 23.422C0.299847 22.8106 0.299847 21.8193 0.911251 21.2079L9.76762 12.3515L0.911252 3.4952C0.299847 2.8838 0.299847 1.8925 0.911252 1.2811C1.52266 0.669699 2.51394 0.669699 3.12534 1.2811Z"
            fill="black"
          />
        </svg>
      </button>
    </div>
  );
}
