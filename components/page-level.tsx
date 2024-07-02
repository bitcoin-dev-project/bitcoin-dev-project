import { Page } from "@/content/types"
import { slugify } from "@/utils/slugify"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

type PageLevelProps = Page["levels"][number] & {
    pageTitle: string
    showHeader?: boolean
}

export default function PageLevel({
    description,
    pageTitle,
    showHeader = true,
    ...level
}: PageLevelProps) {
    return (
        <div
            id={slugify(level.title)}
            key={level.title}
            className="flex flex-col gap-y-16 max-md:gap-y-6"
        >
            {showHeader && (
                <div
                    className={clsx(
                        "flex flex-col gap-y-6 w-[50%] pb-4 max-md:w-full",
                        {
                            "border-b-8 border-b-orange max-md:border-b-4":
                                level.items.length > 0,
                            "w-full": level.items.length === 0
                        }
                    )}
                >
                    <div className="flex items-center gap-x-6 max-md:gap-x-2">
                        <h2 className="text-5xl max-md:text-2xl font-semibold">
                            {pageTitle}
                        </h2>
                    </div>
                    {!!description && (
                        <p
                            className={clsx({
                                "text-xl max-md:text-max-lg max-md:text-justify":
                                    level.items.length > 0,
                                "text-xl max-md:text-max-lg max-md:text-justify w-4/5 max-md:w-full":
                                    level.items.length === 0
                            })}
                        >
                            {description}
                        </p>
                    )}
                </div>
            )}
            <div className="flex w-full justify-between gap-y-5 max-md:gap-y-12 flex-wrap max-lg:flex-col">
                {level.items.map((item) => (
                    <div
                        key={item.title}
                        className="flex p-6 max-md:p-0 gap-x-6 w-[48%] max-lg:w-full rounded-2xl outline-[#D9D9D9] hover:outline-1 hover:outline max-md:hover:outline-none hover:bg-[#FCFCFC] dark:hover:bg-gray-950 max-md:hover:bg-none max-md:flex-col"
                    >
                        <Link
                            href={item.link}
                            rel="noopener"
                            target="_blank"
                            data-umami-event={`${slugify(item.title)}-card-clicked`}
                        >
                            <div className="relative min-w-[160px] h-[160px] max-md:w-full max-md:min-w-min max-md:h-[270px] border-[#D9D9D9] border rounded-2xl overflow-hidden">
                                <Image
                                    alt={item.title}
                                    className="object-fill max-md:object-cover w-full"
                                    src={item.image}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (min-width: 769px) 20vw"
                                />
                            </div>
                        </Link>
                        <div>
                            <div className="flex flex-col gap-y-[6px] my-4 flex-shrink">
                                <Link
                                    href={item.link}
                                    rel="noopener"
                                    target="_blank"
                                    className="text-4xl max-md:text-2xl font-semibold"
                                    data-umami-event={`${slugify(item.title)}-card-clicked`}
                                >
                                    {item.title}
                                </Link>
                                <p className="text-3xl max-md:text-xl font-semibold text-green">
                                    {item.subTitle}
                                </p>
                                <p className="flex flex-shrink-1 text-max-lg leading-[140%] max-md:text-justify">
                                    {item.description}
                                </p>
                            </div>
                            {item.github ? (
                                <div className="flex gap-3">
                                    <Link
                                        href={item.github}
                                        rel="noopener"
                                        target="_blank"
                                        className="w-fit flex gap-2 text-nowrap whitespace-nowrap hover:underline"
                                    >
                                        <Image
                                            alt={"github icon"}
                                            src={"./github-icon.svg"}
                                            width={24}
                                            height={24}
                                        />
                                    </Link>
                                    <Link
                                        href={`good-first-issues/?repo=${item.repo ?? ""}`}
                                        className={`w-fit gap-1.5 text-nowrap whitespace-nowrap capitalize underline ${item.repo ? "flex" : "hidden"}`}
                                    >
                                        Good First Issues
                                    </Link>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
