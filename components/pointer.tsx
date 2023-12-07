import React from "react";
import Button from "./button";

type Props = {
  btnText: string;
  description: string;
  jumpTo: string;
};

export default function Pointer({ btnText, description, jumpTo }: Props) {
  return (
    <div className="flex flex-col min-w-[186px] gap-y-2 text-center md:flex-col-reverse">
      <Button href={`${jumpTo}`} className="w-full px-4">
        {btnText}
      </Button>
      {!!description && <p className="text-sm font-medium">{description}</p>}
    </div>
  );
}
