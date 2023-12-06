import PageLevel from "@/components/page-level";
import { projects } from "@/content/projects";
import clsx from "clsx";

export default function Projects() {
  return (
    <main className="p-14 sm:p-7 mx-auto my-0">
      <div className="flex flex-col md:items-center mb-24 gap-y-10">
        <h1 className="text-[62px] lg:text-[36px] md:text-center font-bold leading-normal">
          {projects.title}
        </h1>
        <p className="text-2xl md:text-base md:text-center max-w-[60vw]">
          {projects.description}
        </p>
      </div>
      <div className="flex flex-col gap-y-24">
        {projects.levels.map((level, index) => (
          <PageLevel
            key={level.title}
            colorClass={clsx({
              "text-orange": index === 0,
              "text-green": index === 1,
            })}
            gradientClass={clsx({
              "from-orange to-yellow": index === 0,
              "from-green to-bright-cyan": index === 1,
            })}
            pageTitle={`${index + 1}. ${level.title}`}
            showHeader={false}
            {...level}
          />
        ))}
      </div>
    </main>
  );
}
