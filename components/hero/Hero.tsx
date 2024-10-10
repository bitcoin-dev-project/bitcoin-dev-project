import Image from "next/image"
import Link from "next/link"
import { hero } from "@/content/landing"
import { Container } from "./Container"

export function Hero() {
    return (
        <Container className="pb-16 pt-20 max-sm:pb-0 text-center lg:pt-32 bg-white dark:bg-black">
            <h1 className="mx-auto max-w-4xl font-display text-6xl font-semibold tracking-tight text-black-800 dark:text-black-100 sm:text-7xl lg:text-8xl">
                <span className="relative text-orange-500">
                    <span className="relative"> Build </span>
                </span>
                the future
                <span className="block whitespace-nowrap">of money</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-2xl max-sm:text-base tracking-tight text-black-700 dark:text-black-300">
                Study and contribute to bitcoin open-source development
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-y-4 sm:gap-x-6">
                <Link href="/decoding" className="w-full sm:w-auto">
                    <button
                        type="button"
                        className="w-full sm:w-auto md:pl-7 py-1 px-4 sm:pl-4 sm:pr-2 duration-200 border-orange-500 bg-orange-500 hover:text-black h-12 hover:bg-white text-white border-[1.5px] hover:border-orange-500 dark:hover:border-white rounded-full flex items-center justify-between sm:justify-start sm:gap-4 md:gap-16"
                    >
                        <p className="flex-grow text-center sm:text-left sm:flex-grow-0">
                            Learn Bitcoin
                        </p>
                        <div className="bg-black h-8 w-8 sm:w-12 md:w-8 text-white flex items-center justify-center rounded-full flex-shrink-0">
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    viewBox="0 0 32 32"
                                >
                                    <path
                                        fill="currentColor"
                                        d="m18 6l-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z"
                                    ></path>
                                </svg>
                            </span>
                        </div>
                    </button>
                </Link>
            </div>
            <div className="max-sm:mt-4 mt-36 lg:mt-44">
                <p className="font-display text-base text-black-800 dark:text-black-100">
                    Explore products we’ve built to make bitcoin tech more
                    accessible
                </p>
                {hero.map((group, groupIndex) => (
                    <section key={groupIndex}>
                        <ul
                            role="list"
                            className="flex items-center justify-center gap-10 max-sm:gap-4 mt-8"
                        >
                            {group.map((company) => (
                                <li key={company.name} className="flex">
                                    <Image
                                        src={company.logo}
                                        alt={company.name}
                                        unoptimized
                                        className="rounded-lg h-16 w-16 max-md:w-12 max-md:h-12 filter grayscale"
                                    />
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </Container>
    )
}
