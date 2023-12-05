import Accordion from "@/components/accordion";
import Button from "@/components/button";
import Pointer from "@/components/pointer";
import SectionCard from "@/components/section-card";
import ToolsCard from "@/components/tools-card";
import {
  faqs,
  learnSection,
  pointers,
  toolsData,
} from "@/content/data";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex justify-between md:flex-col gap-4 md:gap-y-10">
        <div className="flex basis-1/2 flex-grow flex-col justify-end px-14 md:px-7">
          <div className="flex flex-col gap-y-[56px] pl-14 md:pl-0">
            <h1 className="mt-10 md:mt-6 text-[62px] lg:text-[36px] md:text-[30px] font-bold leading-normal">
              Learn, contribute <br className="md:hidden"></br> and build on{" "}
              <span className="text-orange">bitcoin</span>{" "}
              <br className="md:hidden"></br>
              and <span className="text-green">lightning</span>
            </h1>
            <div className="md:flex md:flex-col md:items-center">
              <h2 className="mt-10 md:mt-6 text-[32px] lg:text-[26px] md:text-[20px] font-bold leading-normal">Build the future of money</h2>
            </div>
            <div className="flex justify-between gap-x-3 lg:flex-col lg:gap-y-4 md:items-center">
              {pointers.map((pointer) => (
                <Pointer key={pointer.btnText} {...pointer} />
              ))}
            </div>
          </div>
        </div>
        <div className="relative flex-grow basis-1/2 object-cover pb-[50%] md:mx-14 sm:mx-7">
          <Image
            className="object-cover"
            src="/hero.jpg"
            alt="Hero"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="flex flex-col px-14 sm:px-7">
        <h2
          id={learnSection.slug}
          className="mt-32 md:mt-10 text-5xl md:text-3xl font-semibold text-center self-center mb-6"
        >
          {learnSection.title}
        </h2>
        <div className="flex justify-between gap-y-7 flex-wrap md:flex-col md:gap-y-4">
          {learnSection.data.map(({ shortTitle: _, ...section }) => (
            <SectionCard
              key={section.title}
              alt={section.title}
              className="lg:w-[48%]"
              {...section}
              href={`/${section.slug}/curriculum`}
            />
          ))}
        </div>

        <div className="mt-32 md:mt-10 flex flex-col self-center text-center gap-y-2">
          <h2 className="text-5xl md:text-3xl font-semibold">
            Tools to Explore
          </h2>
          <p className="text-xl md:text-base leading-[140%] mx-20 my-6">
            Bitcoin and Lightning aim to solve some of the world&apos;s most difficult problems.
            While we recognize the enormity of the task, the Bitcoin Dev Project also aims
            to make Bitcoin and Lightning development enjoyable and approachable. Check out
            some of the tools and educational content made by us and our friends.
          </p>
          <div className="relative flex flex-col w-full min-h-[420px] xl:h-[600px] md:h-[1000px]">
            <Image
              className="block md:hidden"
              alt="Explore Map"
              src="/explore-map.jpg"
              fill
            />
            <Image
              className="hidden md:block"
              alt="Explore Map"
              src="/explore-map-mobile.jpg"
              fill
            />
            <div className="px-[80px] pb-10 absolute bottom-0 left-0 right-0 flex flex-col">
              <div className="flex justify-between xl:flex-col xl:items-center xl:gap-y-6">
                <div className="flex gap-x-10 md:flex-col md:gap-y-4">
                  {toolsData.slice(0, 2).map((data) => (
                    <ToolsCard
                      target="_blank"
                      rel="noopener"
                      key={data.name}
                      alt={data.name}
                      {...data}
                    />
                  ))}
                </div>
                <div className="flex gap-x-10 md:flex-col md:gap-y-4">
                  {toolsData.slice(2).map((data) => (
                    <ToolsCard
                      target="_blank"
                      rel="noopener"
                      key={data.name}
                      alt={data.name}
                      {...data}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-[12px] w-[212px] md:w-[50vw] self-center it">
                <Button href="/explore" className="w-full">
                  Explore
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="my-32 flex flex-col self-center text-center mb-8 gap-y-5">
          <h2 className="text-5xl font-semibold md:text-3xl">FAQs</h2>
          <div className="flex flex-col gap-y-8">
            {faqs.map((faq) => (
              <Accordion key={faq.title} {...faq} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
