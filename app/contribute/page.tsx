import Button from "@/components/button";
import PageLevel from "@/components/page-level";
import { contribute } from "@/content/contribute";
import { slugify } from "@/utils/slugify";
import clsx from "clsx";

export default function Curriculum() {
  return (
    <main className="p-14 sm:p-7 mx-auto my-0">
      <div className="flex flex-col md:items-center mb-24 gap-y-10">
        <h1 className="text-[62px] lg:text-[36px] md:text-center font-bold leading-normal">
          {contribute.title}
        </h1>
        <p className="text-2xl md:text-base md:text-center max-w-[60vw]">
          {contribute.description}
        </p>
        <div className="flex gap-x-6 md:flex-col md:gap-y-6 md:py-8">
          {contribute.levels.map((item, index) => (
            <Button
              href={`#${slugify(item.title)}`}
              key={item.title}
              className={clsx(
                `w-[165px] bg-gradient-130 from-[0%] to-[104%] rounded-[10px]`,
                {
                  "from-orange to-yellow": index === 0,
                  "from-green !to-bright-cyan": index === 1,
                }
              )}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-y-24">
        {contribute.levels.map((level, index) => (
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
            {...level}
          />
        ))}
      </div>
    </main>
  );
}
