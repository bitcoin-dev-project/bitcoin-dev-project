import { Wrapper } from "@/components/Wrapper"
import PageLevel from "@/components/page-level"
import { curriculums, type KnownCurriculums } from "@/content/curriculums"
import { slugify } from "@/utils/slugify"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function Curriculum({
    params
}: {
    params: { slug: KnownCurriculums }
}) {
    const curriculum = curriculums[params.slug]
    if (!curriculum) {
        notFound()
    }

    return (
        <Wrapper>
            <div className="p-14 max-sm:p-7 mx-auto my-0">
                <div className="flex flex-col max-md:items-center mb-24 max-md:mb-12 gap-y-10">
                    <h1 className="text-[58px] max-lg:text-[32px] max-md:text-center font-bold leading-normal">
                        {curriculum.title}
                    </h1>
                    <p className="text-2xl max-md:text-xl max-md:text-justify w-4/5 max-md:w-full">
                        {curriculum.description}
                    </p>
                    <div className="flex flex-col max-md:text-center">
                        <div className="flex gap-x-8 max-md:flex-wrap max-md:gap-y-3 max-md:items-center max-md:justify-center">
                            {curriculum.levels.map((item) => (
                                <Link
                                    className="font-semibold text-2xl max-md:text-base underline"
                                    href={`#${slugify(item.title)}`}
                                    key={item.title}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-16 max-md:gap-y-10">
                    {curriculum.levels.map((level) => (
                        <PageLevel
                            key={level.title}
                            pageTitle={level.title}
                            {...level}
                        />
                    ))}
                </div>
            </div>
        </Wrapper>
    )
}
