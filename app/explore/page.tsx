import SectionCard from "@/components/section-card";
import { exploreSection } from "@/content/data";

export default function Explore() {
  return (
    <main className="p-14 sm:p-7 mx-auto my-0">
      <div className="flex flex-col md:items-center mb-24 gap-y-10">
        <h1 className="text-[62px] lg:text-[36px] md:text-center font-bold leading-normal">
          {exploreSection.title}
        </h1>
        <p className="text-2xl md:text-base md:text-center">
          {exploreSection.description}
        </p>
      </div>

      <div className="flex justify-between gap-y-7 flex-wrap md:flex-col md:gap-y-4">
        {exploreSection.data.map((section) => (
          <SectionCard
            key={section.title}
            alt={section.title}
            className="lg:w-[48%]"
            {...section}
            target="_blank"
            rel="noopener"
            href={section.href as string}
          />
        ))}
      </div>
    </main>
  );
}
