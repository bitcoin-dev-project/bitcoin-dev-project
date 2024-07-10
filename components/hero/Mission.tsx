import { BitcoinIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"
import { learningPath } from "@/content/landing"

export default function Mission() {
    return (
        <div className="bg-white dark:bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl mb-20 lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-orange-500">
                        Why Bitcoin Dev Project?
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-black-800 dark:text-black-100 sm:text-5xl">
                        Bitcoin is better
                    </p>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-orange sm:text-5xl">
                        WHEN YOU CONTRIBUTE
                    </p>
                    <p className="mt-6 text-lg leading-8 text-black-600 dark:text-black-400">
                        The Bitcoin Dev Project exists to inspire the next
                        generation of bitcoin open source contributors. We
                        provide you with resources and support for your journey
                    </p>
                </div>
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-16 gap-y-24 lg:max-w-none lg:grid-cols-3">
                        {learningPath.map((step) => (
                            <div
                                key={step.name}
                                className="flex flex-col items-center p-6 bg-white dark:bg-black rounded-lg border border-black-300 dark:border-black-800"
                            >
                                <dt className="mt-5 text-2xl uppercase font-medium leading-7 text-orange-500 flex flex-col items-center text-center">
                                    {step.name}
                                </dt>
                                <dt className="mb-5 text-3xl font-bold leading-7 text-black dark:text-white flex flex-col items-center text-center"></dt>
                                <dd className="mt-1 flex flex-auto flex-col items-center text-base leading-7 text-black-600 dark:text-black-400">
                                    <p className="flex-auto text-center mb-6">
                                        {step.description}
                                    </p>
                                    <Link href={step.href}>
                                        <button
                                            type="button"
                                            className="pl-4 pr-2 gap-6  duration-200 hover:border-orange-500 border-zinc-800 h-12 text-white justify-between  border-2 rounded-full inline-flex items-center bg-zinc-800"
                                        >
                                            {step.cta}
                                            <div className="bg-white h-8 w-8 text-black inline-flex items-center justify-center rounded-full">
                                                {" "}
                                                <span>
                                                    {" "}
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
                                                </span>{" "}
                                            </div>
                                        </button>
                                    </Link>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
