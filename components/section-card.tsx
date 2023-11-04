import Image from "next/image";
import React from "react";
import Button from "./button";

type Props = {
  alt: string;
  body: string;
  btnText: string;
  className?: string;
  src: string;
  title: string;
};

export default function SectionCard({
  alt,
  body,
  btnText,
  className,
  src,
  title,
}: Props) {
  return (
    <div
      className={`flex flex-col bg-pale-orange rounded-xl shadow-normal hover:shadow-raised transition-[box-shadow] duration-500 ease-in-out overflow-hidden w-[32%] md:w-full ${className}`}
    >
      <div className={`relative h-[200px] w-full`}>
        <Image src={src} alt={alt} fill priority />
      </div>
      <div className="p-[24px] flex flex-col items-center gap-y-[24px] text-center">
        <h2 className="text-[38px] font-semibold leading-[100%]">{title}</h2>
        <p className="text-xl">{body}</p>
        <Button href="/random/curriculum">{btnText}</Button>
      </div>
    </div>
  );
}
