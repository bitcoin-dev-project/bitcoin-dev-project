import { Wrapper } from "@/components/Wrapper"
import Button from "@/components/button"
import PageLevel from "@/components/page-level"
import { projects } from "@/content/projects"

export default function Projects() {
    return (
        <Wrapper>
            <div className="p-10 max-max-sm:p-7 mx-auto my-0 dark:bg-black">
                <div className="flex flex-col max-md:items-center mb-24 max-md:mb-12 gap-y-10">
                    <h1 className="text-[58px] max-max-lg:text-[30px] max-md:text-center font-bold leading-tight text-gray-800 dark:text-gray-100">
                        {projects.title}
                    </h1>
                    <p className="text-2xl max-md:text-xl max-md:text-justify max-w-[60vw] max-md:max-w-full text-gray-800 dark:text-gray-200">
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
                        className="w-fit mx-auto text-center py-4 px-8 bg-orange-800 hover:bg-orange-900 dark:bg-orange-900 dark:hover:bg-orange-700 dark:text-white"
                    >
                        Start contributing
                    </Button>
                </div>
            </div>
        </Wrapper>
    )
}
