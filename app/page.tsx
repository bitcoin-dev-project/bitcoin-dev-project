import Accordion from "@/components/accordion";
import Button from "@/components/button";
import Pointer from "@/components/pointer";
import SectionCard from "@/components/section-card";
import ToolsCard from "@/components/tools-card";
import {
  buildSection,
  contributeSection,
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
        <div className="flex basis-1/2 flex-grow flex-col justify-end md:px-14">
          <div className="flex flex-col gap-y-[56px] pl-14 md:pl-0">
            <h1 className="mt-10 md:mt-6 text-[62px] lg:text-[36px] font-bold leading-normal md:text-center">
              Learn, contribute <br></br> and build on{" "}
              <span className="text-orange">bitcoin</span> <br></br>
              and <span className="text-green">lightning</span>
            </h1>
            <div className="md:flex md:flex-col md:items-center">
              <ul className="list-disc text-2xl lg:text-lg leading-[150%]">
                <li>Help build the future of money </li>
                <li>Challenge yourself & go down various rabbit holes</li>
                <li>
                  Build applications and infrastructure that have meaning and
                  impact
                </li>
              </ul>
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
          {learnSection.data.map((section) => (
            <SectionCard
              key={section.title}
              alt={section.title}
              className="lg:w-[48%]"
              {...section}
              href={`/${section.slug}/curriculum`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-32 md:mt-10  md:flex-col md:gap-y-4">
          <div className="flex flex-col gap-y-6">
            <h2
              id={buildSection.slug}
              className="text-5xl md:text-3xl font-semibold text-center"
            >
              {buildSection.title}
            </h2>
            {buildSection.data.map((section) => (
              <SectionCard
                key={section.title}
                alt={section.title}
                className="w-[95%]"
                {...section}
                href="#"
              />
            ))}
          </div>
          <div className="flex flex-col gap-y-6">
            <h2
              id={contributeSection.slug}
              className="text-5xl md:text-3xl font-semibold text-center"
            >
              {contributeSection.title}
            </h2>
            {contributeSection.data.map((section) => (
              <SectionCard
                key={section.title}
                alt={section.title}
                className="w-[95%]"
                {...section}
                href="/contribute"
              />
            ))}
          </div>
        </div>

        <div className="mt-32 md:mt-10  flex flex-col self-center text-center gap-y-2">
          <h2 className="text-5xl md:text-3xl font-semibold">
            Tools to Explore
          </h2>
          <p className="text-xl md:text-base  leading-[140%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            accumsan tempus nunc, nec posuere magna sagittis euismod. Vestibulum
            sed justo ullamcorper, pharetra leo eget, accumsan quam. Fusce
            efficitur leo nisi, sed elementum arcu molestie
          </p>
          <div className="relative flex flex-col w-full min-h-[420px] xl:h-[600px] md:h-[1000px]">
            <Image alt="Explore Map" src="/explore-map.jpg" fill />
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
              <div className="mt-[12px] md:w-[100px] w-[212px] self-center it">
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
