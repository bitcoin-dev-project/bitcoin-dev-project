import Button from "@/components/button";
import { curriculumLevels } from "@/content/data";
import { slugify } from "@/utils/slugify";
import Image from "next/image";

export default function Curriculum() {
  return (
    <main className="p-14 sm:p-7 mx-auto my-0">
      <div className="flex flex-col md:items-center mb-24 gap-y-10">
        <h1 className="text-[62px] lg:text-[36px] md:text-center font-bold leading-normal">
          Bitcoin Infrastructure Development
        </h1>
        <p className="text-2xl md:text-base md:text-center max-w-[60vw]">
          Bitcoin ipsum dolor sit amet. Private key key pair outputs soft fork,
          stacking sats halvening mempool halvening! Whitepaper, block height,
          blockchain mining, hash private key, UTXO sats. Mempool difficulty
          transaction consensus double-spend problem whitepaper hash mining!
          Sats UTXO timestamp server stacking sats.
        </p>
        <div className="flex gap-x-6 md:flex-col md:gap-y-6 md:py-8">
          {curriculumLevels.map((item) => (
            <Button
              href={`#${slugify(item.title)}`}
              key={item.title}
              className={`w-[165px] bg-gradient-130 from-[0%] to-[104%] rounded-[10px] ${item.gradient}`}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-y-24">
        {curriculumLevels.map((level, index) => (
          <div
            id={slugify(level.title)}
            key={level.title}
            className="flex flex-col gap-y-16"
          >
            <div className="flex flex-col gap-y-6 w-[50%] pb-4 border-b-8 border-b-orange md:border-b-4 md:w-full">
              <div className="flex items-center gap-x-6 md:gap-x-2">
                <div className="relative min-w-[80px] h-[80px] border-[#D9D9D9] border md:border-0 rounded-2xl overflow-hidden">
                  {/* TODO: Placeholder, note to optimize images by updating sizes props when implementing */}
                  <Image
                    className="md:object-contain"
                    alt=""
                    src="/hero.jpg"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
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

            <div className="flex w-full justify-between lg:flex-col">
              {level.items.map((item) => (
                <div
                  key={item.title}
                  className="flex p-6 gap-x-6 max-w-[45%] lg:max-w-full rounded-2xl outline-[#D9D9D9] hover:outline-1 hover:outline hover:bg-[#FCFCFC] md:flex-col"
                >
                  <div className="relative min-w-[160px] h-[160px] md:w-full md:min-w-min md:h-[200px] border-[#D9D9D9] border rounded-2xl overflow-hidden">
                    {/* TODO: Placeholder, note to optimize images by updating sizes props when implementing */}
                    <Image
                      alt=""
                      className="md:object-cover w-full"
                      src={level.image}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-col gap-y-[6px] flex-shrink">
                    <h3 className="text-4xl md:text-2xl font-semibold">
                      {item.title}
                    </h3>
                    <p
                      className={`${level.color} text-2xl md:text-lg font-semibold`}
                    >
                      {item.subTitle}
                    </p>
                    <p className="flex flex-shrink-1 text-sm md:text-xs leading-[140%]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
