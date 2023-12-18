import React from "react";
import Button from "./button";
import clsx from "clsx";

type Props = {
  btnText: string;
  className?: string;
  description: string;
  jumpTo: string;
};

export default function Pointer({
  btnText,
  className,
  description,
  jumpTo,
}: Props) {
  return (
    <div className="flex flex-col min-w-[186px] gap-y-2 text-center md:flex-col-reverse">
      <Button href={`${jumpTo}`} className={clsx("w-full px-3", className)}>
        {btnText}
      </Button>
      {!!description && <p className="text-sm font-medium">{description}</p>}
    </div>
  );
}
