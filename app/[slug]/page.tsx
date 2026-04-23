import { Wrapper } from "@/components/Wrapper"
import PageLevel from "@/components/page-level"
import { curriculums, type KnownCurriculums } from "@/content/curriculums"
import { slugify } from "@/utils/slugify"
import Link from "next/link"
import Image from "next/image"

export default function Curriculum({
    params
}: {
    params: { slug: KnownCurriculums }
}) {
    const curriculum = curriculums[params.slug]
    if (!curriculum) {
        return(
          <div className="min-h-screen w-full bg-[#F4EFEA] flex flex-col">
      
        {/* Header */}
        <header className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-20">
                    <Link href="/">
                    <Image
                        src="/images/bdp-logo.png"
                        alt="bdp logo"
                        width={110}
                        height={28}
                        priority
                    />
                    </Link>

                    <div className="flex items-center gap-4 md:gap-6">
                    <Link href="/about" className="text-gray-700 text-sm md:text-base font-quicksand hover:text-gray-700 transition-colors">
                        About
                    </Link>

                    <Link
                        href="/explore"
                        className="bg-[#EB5234] text-white px-3 py-2.5 rounded-[10px] text-sm md:text-base font-bold font-quicksand capitalize hover:opacity-90 transition-all duration-200"
                    >
                        <span>Start exploring</span>
                    </Link>
                    </div>
                </div>
            </div>
        </header>

        {/* Main */}
        <main className="flex flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-10 md:gap-0 py-10 lg:py-16">
            
            {/* LEFT TEXT */}
            <div className="max-w-xl text-center md:text-left">
            
            <p className="text-[22px] md:text-[36px] lg:text-[40px] text-gray-700 leading-snug mb-4">
                Overalls on, but nowhere to go.
            </p>

            <p className="text-[24px] md:text-[36px] font-semibold text-black leading-tight">
                Go back to{" "}
                <Link href="/">
                <span className="underline">homepage</span>
                </Link>
            </p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-[220px] md:w-[360px] lg:w-[420px] flex justify-center">
            <Image
                src="/images/404.png"
                alt="404 illustration"
                width={420}
                height={420}
                sizes="(max-width: 768px) 220px, (max-width: 1024px) 360px, 420px"
                className="w-full h-auto"
                priority
            />
            </div>

        </main>
        </div>
    )
    
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