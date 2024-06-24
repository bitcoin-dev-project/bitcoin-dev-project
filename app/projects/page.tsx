import { Wrapper } from "@/components/Wrapper"
import Button from "@/components/button"
import PageLevel from "@/components/page-level"
import { projects } from "@/content/projects"

export default function Projects() {
    return (
        <Wrapper>
            <div className="p-10 sm:p-7 mx-auto my-0">
                <div className="flex flex-col md:items-center mb-24 md:mb-12 gap-y-10">
                    <h1 className="text-[58px] lg:text-[30px] md:text-center font-bold leading-tight">
                        {projects.title}
                    </h1>
                    <p className="text-2xl md:text-xl md:text-justify max-w-[60vw] md:max-w-full">
                        {projects.description}
                    </p>
                </div>
                <div className="flex flex-col gap-y-24 mb-12">
                    {projects.levels.map((level, index) => (
                        <PageLevel
                            key={level.title}
                            pageTitle={`${index + 1}. ${level.title}`}
                            showHeader={false}
                            {...level}
                        />
                    ))}
                </div>
                <div className="flex flex-col gap-y-24 pt-6">
                    <Button
                        href="/good-first-issues"
                        className="w-fit mx-auto text-center py-4 px-8"
                    >
                        Start contributing
                    </Button>
                </div>
            </div>
        </Wrapper>
    )
}
