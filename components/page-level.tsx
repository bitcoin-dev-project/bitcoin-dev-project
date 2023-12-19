import { Page } from "@/content/types";
import { slugify } from "@/utils/slugify";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type PageLevelProps = Page["levels"][number] & {
  pageTitle: string;
  showHeader?: boolean;
};

export default function PageLevel({
  description,
  pageTitle,
  showHeader = true,
  ...level
}: PageLevelProps) {
  return (
    <div
      id={slugify(level.title)}
      key={level.title}
      className="flex flex-col gap-y-16 md:gap-y-6"
    >
      {showHeader && (
        <div
          className={clsx("flex flex-col gap-y-6 w-[50%] pb-4 md:w-full", {
            "border-b-8 border-b-orange md:border-b-4": level.items.length > 0,
          })}
        >
          <div className="flex items-center gap-x-6 md:gap-x-2">
            <h2 className="text-5xl md:text-2xl font-semibold">{pageTitle}</h2>
          </div>
          {!!description && <p className="text-xl md:text-lg">{description}</p>}
        </div>
      )}
      <div className="flex w-full justify-between gap-y-5 md:gap-y-12 flex-wrap lg:flex-col">
        {level.items.map((item) => (
          <Link
            target="_blank"
            rel="noopener"
            href={item.link}
            key={item.title}
            className="flex p-6 md:p-0 gap-x-6 w-[48%] lg:w-full rounded-2xl outline-[#D9D9D9] hover:outline-1 hover:outline md:hover:outline-none hover:bg-[#FCFCFC] md:hover:bg-none md:flex-col"
          >
            <div className="relative min-w-[160px] h-[160px] md:w-full md:min-w-min md:h-[200px] border-[#D9D9D9] border rounded-2xl overflow-hidden">
              <Image
                alt={item.title}
                className="object-fill md:object-cover w-full"
                src={item.image}
                fill
                sizes="(max-width: 768px) 100vw, (min-width: 769px) 20vw"
              />
            </div>
            <div className="flex flex-col gap-y-[6px] my-4 flex-shrink">
              <h3 className="text-4xl md:text-2xl font-semibold">
                {item.title}
              </h3>
              <p className="text-3xl md:text-xl font-semibold text-green">
                {item.subTitle}
              </p>
              <p className="flex flex-shrink-1 text-lg leading-[140%]">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
