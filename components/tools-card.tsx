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
      <div className="relative h-[240px] w-[240px] md:h-[280px] md:w-[280px] xs:w-[180px] xs:h-[180px] flex-shrink overflow-hidden rounded-[18px] hover:scale-105 transition-transform duration-500 ease-in-out">
        <Image
          fill
          src={src}
          alt={alt}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </Link>
  );
}
