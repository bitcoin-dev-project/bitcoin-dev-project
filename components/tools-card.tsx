import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = React.ComponentProps<typeof Link> & {
  alt: string;
  name: string;
  src: string;
};

export default function ToolsCard({ alt, name, src, ...rest }: Props) {
  return (
    <Link {...rest}>
      <div className="relative h-[184px] overflow-hidden w-[184px] rounded-[18px] xl:w-[25vw] md:w-[50vw] md:h-[200px] hover:scale-105 transition-all duration-500 ease-in-out">
        <Image
          fill
          src={src}
          alt={alt}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute flex justify-center bottom-0 right-0 left-0">
          <p className="mb-3 rounded-[12px] bg-[#FDF8F0] w-[155px] py-1 self-center text-[15px] font-semibold">
            {name}
          </p>
        </div>
      </div>
    </Link>
  );
}
