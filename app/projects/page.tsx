import PageLevel from "@/components/page-level";
import { projects } from "@/content/projects";
import clsx from "clsx";

export default function Projects() {
  return (
    <main className="p-14 sm:p-7 mx-auto my-0">
      <div className="flex flex-col md:items-center mb-24 md:mb-12 gap-y-10">
        <h1 className="text-[62px] lg:text-[36px] md:text-center font-bold leading-normal">
          {projects.title}
        </h1>
        <p className="text-2xl md:text-xl md:text-center max-w-[60vw] md:max-w-full">
          {projects.description}
        </p>
      </div>
      <div className="flex flex-col gap-y-24">
        {projects.levels.map((level, index) => (
          <PageLevel
            key={level.title}
            pageTitle={`${index + 1}. ${level.title}`}
            showHeader={false}
            {...level}
          />
        ))}
      </div>
    </main>
  );
}
