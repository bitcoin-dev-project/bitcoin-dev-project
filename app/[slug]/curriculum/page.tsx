import Button from "@/components/button";
import Image from "next/image";

const levels = [
  {
    color: "text-orange",
    image: "/hero.jpg",
    title: "Novice",
    gradient: "from-orange to-yellow",
    description:
      "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
    items: [
      {
        title: "Mastering Bitcoin",
        subTitle: "The de-facto book on Bitcoin development",
        description:
          "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
      },
      {
        title: "Bitcoin Development Philosophy",
        subTitle:
          "Gain a deeper understanding of bitcoin’s development philosophy",
        description:
          "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
      },
    ],
  },
  {
    color: "text-yellow",
    image: "/hero.jpg",
    title: "Intermediate",
    gradient: "from-yellow to-light-orange",
    description:
      "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
    items: [
      {
        title: "Learn Bitcoin From the Command Line",
        subTitle: "Describe the value this gives me",
        description:
          "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
      },
      {
        title: "Core Lightning by Blockstream on GitHub With Flowers and Roses",
        subTitle: "Describe the value this gives me",
        description:
          "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
      },
    ],
  },
  {
    color: "text-green",
    image: "/hero.jpg",
    title: "Wizard",
    gradient: "from-green to-bright-cyan",
    description:
      "Proof-of-work mempool cryptocurrency block height genesis block decentralized whitepaper difficulty blocksize. Segwit sats, wallet peer-to-peer, stacking sats electronic cash UTXO public key.",
    items: [
      {
        title: "Learn Bitcoin From the Command Line",
        subTitle: "Describe the value this gives me",
        description:
          "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
      },
      {
        title: "Core Lightning by Blockstream on GitHub With Flowers and Roses",
        subTitle: "Describe the value this gives me",
        description:
          "Sats hard fork mining stacking sats block height sats blockchain satoshis! Segwit genesis block private key miner sats consensus soft fork transaction. Full node double-spend.",
      },
    ],
  },
];

export default function Curriculum() {
  return (
    <main className="p-[48px] mx-auto my-0">
      <div className="flex flex-col md:items-center mb-24 gap-y-10">
        <h1 className="text-[62px] lg:text-[36px] font-bold leading-normal">
          Title of Curriculum
        </h1>
        <p className="text-2xl md:text-center gradi">
          Bitcoin ipsum dolor sit amet. Private key key pair outputs soft fork,
          stacking sats halvening mempool halvening! Whitepaper, block height,
          blockchain mining, hash private key, UTXO sats. Mempool difficulty
          transaction consensus double-spend problem whitepaper hash mining!
          Sats UTXO timestamp server stacking sats.
        </p>
        <div className="flex gap-x-6 md:flex-col md:gap-y-6 md:py-8">
          {levels.map((item) => (
            <Button
              href={`#${item.title}`}
              key={item.title}
              className={`w-[165px] bg-gradient-130 from-[0%] to-[104%] rounded-[10px] ${item.gradient}`}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-y-24">
        {levels.map((level, index) => (
          <div
            id={level.title}
            key={level.title}
            className="flex flex-col gap-y-16"
          >
            <div className="flex flex-col gap-y-6 w-[50%] pb-4 border-b-8 border-b-orange md:border-b-4 md:w-full">
              <div className="flex items-center gap-x-6">
                <div className="relative min-w-[80px] h-[80px] border-[#D9D9D9] border rounded-2xl overflow-hidden">
                  {/* TODO: Placeholder, note to optimize images by updating sizes props when implementing */}
                  <Image
                    alt=""
                    src="/hero.jpg"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h2 className="text-5xl font-semibold">
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
                  <div className="relative min-w-[160px] h-[160px] md:w-full md:h-[200px] border-[#D9D9D9] border rounded-2xl overflow-hidden">
                    {/* TODO: Placeholder, note to optimize images by updating sizes props when implementing */}
                    <Image
                      alt=""
                      src={level.image}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-col gap-y-[6px] flex-shrink">
                    <h3 className="text-4xl font-semibold">{item.title}</h3>
                    <p className={`${level.color} text-2xl font-semibold`}>
                      {item.subTitle}
                    </p>
                    <p className="flex flex-shrink-1 text-[14px] leading-[140%]">
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
