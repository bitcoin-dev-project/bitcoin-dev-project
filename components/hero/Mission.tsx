import { BitcoinIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"

export default function Mission() {
    const features = [
        {
            badge: "EDUCATION",
            name: "01 - Study",
            description: "Learning bitcoin is Hard we make it easy for you.",
            href: "/bitcoin-core",
            cta: "Check out topics",
            icon: BitcoinIcon
        },
        {
            badge: "CONTRIBUTION",
            name: "02 - Contribute",
            description:
                "Put your knowledge to test. Explore vetted Free Open Source Software (FOSS) projects and find your way in bitcoin open source.",
            href: "/good-first-issues",
            cta: "Start Contribute",
            icon: BitcoinIcon
        },

        {
            badge: "TOOLS",
            name: "03 - Build",
            description:
                "Explore a suite of tools crafted to support your learning, building, and contributions in the bitcoin ecosystem.",
            href: "/tools",
            cta: "Check Tools",
            icon: BitcoinIcon
        },
        {
            badge: "FUNDING",
            name: "04 - Get Funded",
            description:
                "Do the work. Demonstrate capability and earn a grant for full-time bitcoin open source work",
            href: "/career",
            cta: "Learn More",
            icon: BitcoinIcon
        }
    ]
    return (
        <div className="bg-white dark:bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl mb-20 lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-orange-600">
                        Why you need this ?
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-black-800 dark:text-black-100 sm:text-5xl">
                        Becoming a Bitcoin developer is
                    </p>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-orange sm:text-5xl">
                        <span className="line-through">NOT</span> FOR EVERYONE !
                    </p>
                    <p className="mt-6 text-lg leading-8 text-black-600 dark:text-black-400">
                        Our goal is to provide you with resources and support
                        for your bitcoin open source development journey. We are
                        here to convince you to contribute to bitcoin open
                        source projects.
                    </p>
                </div>

                <div className="mx-auto max-w-2xl  lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                        {features.map((feature) => (
                            <div
                                key={feature.name}
                                className="flex flex-col items-center p-6 bg-white dark:bg-black rounded-lg border border-black-300 dark:border-black-800"
                            >
                                <span className="inline-flex items-center gap-x-1.5 rounded-md bg-black-100 dark:bg-black px-2 py-1 text-xs font-light text-black-600 dark:text-black-400 mb-4  border border-black-300 dark:border-black-800">
                                    <svg
                                        className="h-2 w-2 fill-orange-400 "
                                        viewBox="0 0 6 6"
                                        aria-hidden="true"
                                    >
                                        <circle cx={3} cy={3} r={3} />
                                    </svg>
                                    {feature.badge}
                                </span>
                                <dt className="mt-5 text-2xl uppercase font-medium leading-7 text-orange-500 flex flex-col items-center text-center">
                                    {feature.name}
                                </dt>
                                <dt className="mb-5 text-3xl font-bold leading-7 text-black dark:text-white flex flex-col items-center text-center"></dt>
                                <dd className="mt-1 flex flex-auto flex-col items-center text-base leading-7 text-black-600 dark:text-black-400">
                                    <p className="flex-auto text-center mb-6">
                                        {feature.description}
                                    </p>
                                    <Link href={feature.href}>
                                        <button
                                            type="button"
                                            className="pl-4 pr-2 gap-6  duration-200 hover:border-orange-500 border-zinc-800 h-12 text-white justify-between  border-2 rounded-full inline-flex items-center bg-zinc-800"
                                        >
                                            {feature.cta}
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
