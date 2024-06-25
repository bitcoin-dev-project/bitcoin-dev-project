import { Wrapper } from "@/components/Wrapper"
import Button from "@/components/button"
import PageLevel from "@/components/page-level"
import { curriculums, type KnownCurriculums } from "@/content/curriculums"
import { slugify } from "@/utils/slugify"
import Link from "next/link"

export default function Curriculum({
    params
}: {
    params: { slug: KnownCurriculums }
}) {
    const curriculum = curriculums[params.slug]
    if (!curriculum) {
        return (
            <section className="flex h-[calc(100vh-250px)] flex-col items-center justify-center">
                <div className="container mx-auto max-w-md space-y-6 text-center">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                            Oops, looks like you&apos;ve taken a wrong turn!
                        </h1>
                        <p className="text-gray-900">
                            The page you&apos;re looking for doesn&apos;t exist
                            or has been moved.
                        </p>
                    </div>
                    <Button
                        href="/"
                        className="w-fit mx-auto text-center py-4 px-8"
                    >
                        Go back home
                    </Button>
                </div>
            </section>
        )
    }

    return (
        <Wrapper>
            <div className="p-14 sm:p-7 mx-auto my-0">
                <div className="flex flex-col md:items-center mb-24 md:mb-12 gap-y-10">
                    <h1 className="text-[58px] lg:text-[32px] md:text-center font-bold leading-normal">
                        {curriculum.title}
                    </h1>
                    <p className="text-2xl md:text-xl md:text-justify w-4/5 md:w-full">
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
                <div className="flex flex-col gap-y-16 md:gap-y-10">
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
