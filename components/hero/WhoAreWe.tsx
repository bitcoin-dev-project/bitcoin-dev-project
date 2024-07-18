import { values } from "@/content/landing"
import Link from "next/link"

export default function WhoAreWe() {
    return (
        <div className="bg-white dark:bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-orange-500">
                        What Is the Bitcoin Dev Project?
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-black-800 dark:text-black-100 sm:text-5xl">
                        About The Bitcoin Dev Project
                    </p>
                    <p className="mt-6 text-lg leading-8 text-black-600 dark:text-black-400">
                        We provide devs with resources and support for their
                        bitcoin open source development journey. From just
                        becoming aware of bitcoin tech to scaling the mountain
                        of reviews, commits, and product building in the
                        ecosystem.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-x-16 lg:gap-y-20">
                        {values.map((feature) => (
                            <div
                                key={feature.name}
                                className="flex flex-col items-center justify-center text-center"
                            >
                                <a
                                    href={feature.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contents"
                                >
                                    <dt className="mb-6">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                                            <feature.icon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </dt>
                                    <dd className="text-base font-semibold leading-7 text-black-800 dark:text-black-100">
                                        {feature.name}
                                    </dd>
                                    <p className="mt-1 text-base leading-7 text-black-600 dark:text-black-400">
                                        {feature.description}
                                    </p>
                                </a>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
