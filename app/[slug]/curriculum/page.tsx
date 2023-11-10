import Button from "@/components/button";
import { curriculums, type KnownCurriculums } from "@/content/curriculums";
import { slugify } from "@/utils/slugify";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function Curriculum({
  params,
}: {
  params: { slug: KnownCurriculums };
}) {
  const curriculum = curriculums[params.slug];

  return (
    <main className="p-14 sm:p-7 mx-auto my-0">
      <div className="flex flex-col md:items-center mb-24 gap-y-10">
        <h1 className="text-[62px] lg:text-[36px] md:text-center font-bold leading-normal">
          {curriculum.title}
        </h1>
        <p className="text-2xl md:text-base md:text-center max-w-[60vw]">
          {curriculum.description}
        </p>
        <div className="flex gap-x-6 md:flex-col md:gap-y-6 md:py-8">
          {curriculum.levels.map((item, index) => (
            <Button
              href={`#${slugify(item.title)}`}
              key={item.title}
              className={clsx(
                `w-[165px] bg-gradient-130 from-[0%] to-[104%] rounded-[10px]`,
                {
                  "from-orange to-yellow": index === 0,
                  "from-yellow to-light-orange": index === 1,
                  "from-green to-bright-cyan": index === 2,
                }
              )}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-y-24">
        {curriculum.levels.map((level, index) => (
          <div
            id={slugify(level.title)}
            key={level.title}
            className="flex flex-col gap-y-16"
          >
            <div className="flex flex-col gap-y-6 w-[50%] pb-4 border-b-8 border-b-orange md:border-b-4 md:w-full">
              <div className="flex items-center gap-x-6 md:gap-x-2">
                <div
                  className={clsx(
                    `min-w-[80px] h-[80px] border-[#D9D9D9] border md:border-0 rounded-2xl overflow-hidden bg-gradient-130 from-[0%] to-[104%]`,
                    {
                      "from-orange to-yellow": index === 0,
                      "from-yellow to-light-orange": index === 1,
                      "from-green to-bright-cyan": index === 2,
                    }
                  )}
                />
                <h2 className="text-5xl md:text-2xl font-semibold">
                  {index + 1}. {level.title}
                </h2>
              </div>
              <p>
                Proof-of-work mempool cryptocurrency block height genesis block
                decentralized whitepaper difficulty blocksize. Segwit sats,
                wallet peer-to-peer, stacking sats electronic cash UTXO public
                key.
              </p>
            </div>

            <div className="flex w-full justify-between gap-y-5 flex-wrap lg:flex-col">
              {level.items.map((item) => (
                <Link
                  href={"#"}
                  key={item.title}
                  className="flex p-6 gap-x-6 w-[48%] lg:w-full rounded-2xl outline-[#D9D9D9] hover:outline-1 hover:outline hover:bg-[#FCFCFC] md:flex-col"
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
                  <div className="flex flex-col gap-y-[6px] flex-shrink">
                    <h3 className="text-4xl md:text-2xl font-semibold">
                      {item.title}
                    </h3>
                    <p
                      className={clsx(`text-2xl md:text-lg font-semibold`, {
                        "text-orange": index === 0,
                        "text-yellow": index === 1,
                        "text-green": index === 2,
                      })}
                    >
                      {item.subTitle}
                    </p>
                    <p className="flex flex-shrink-1 text-sm md:text-xs leading-[140%]">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
