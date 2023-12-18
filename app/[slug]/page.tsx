import PageLevel from "@/components/page-level";
import { curriculums, type KnownCurriculums } from "@/content/curriculums";
import { slugify } from "@/utils/slugify";
import Link from "next/link";

export default function Curriculum({
  params,
}: {
  params: { slug: KnownCurriculums };
}) {
  const curriculum = curriculums[params.slug];

  return (
    <main className="p-14 sm:p-7 mx-auto my-0">
      <div className="flex flex-col md:items-center mb-24 md:mb-12 gap-y-10">
        <h1 className="text-[62px] lg:text-[36px] md:text-center font-bold leading-normal">
          {curriculum.title}
        </h1>
        <p className="text-2xl md:text-base md:text-center max-w-[60vw] md:max-w-full">
          {curriculum.description}
        </p>
        <div className="flex flex-col md:text-center">
          <div className="flex gap-x-8 md:flex-wrap md:gap-y-3 md:items-center md:justify-center">
            {curriculum.levels.map((item) => (
              <Link
                className="font-semibold text-2xl md:text-base underline"
                href={`#${slugify(item.title)}`}
                key={item.title}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-24 md:gap-y-10">
        {curriculum.levels.map((level) => (
          <PageLevel key={level.title} pageTitle={level.title} {...level} />
        ))}
      </div>
    </main>
  );
}
