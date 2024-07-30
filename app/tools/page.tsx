import { Wrapper } from "@/components/Wrapper"
import PageLevel from "@/components/page-level"
import { tools } from "@/content/tools"

export default function Explore() {
    return (
        <Wrapper>
            <div className="p-14 max-sm:p-7 mx-auto my-0">
                <div className="flex flex-col max-md:items-center mb-24 max-md:mb-12 gap-y-10">
                    <h1 className="text-[58px] max-lg:text-[36px] max-md:text-center font-bold leading-tight">
                        {tools.title}
                    </h1>
                    <p className="text-2xl max-md:text-xl max-md:text-center max-w-[60vw] max-md:max-w-full">
                        {tools.description}
                    </p>
                </div>
                <div className="flex flex-col gap-y-24">
                    {tools.levels.map((level, index) => (
                        <PageLevel
                            key={level.title}
                            pageTitle={`${index + 1}. ${level.title}`}
                            showHeader={false}
                            {...level}
                        />
                    ))}
                </div>
            </div>
        </Wrapper>
    )
}
