import { BitcoinIcon, EyeOffIcon } from "lucide-react"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import {
    CalendarDaysIcon,
    HandRaisedIcon,
    InboxIcon,
    TrashIcon,
    UsersIcon
} from "@heroicons/react/24/outline"

export default function WhoAreWe() {
    const features = [
        {
            name: "BITCOIN ONLY",
            description: "We are 100% focused on Bitcoin and its ecosystem.",
            href: "#",
            icon: BitcoinIcon
        },
        {
            name: "ONBOARD",
            description:
                "Encourage more developers to be part of creating a new financial order",
            href: "#",
            icon: GitHubLogoIcon
        },
        {
            name: "COMMUNITY",
            description:
                "Bridge the gap between experienced developers and newcomers.",
            href: "#",
            icon: UsersIcon
        },
        {
            name: "INNOVATION",
            description:
                "Make it easy for anyone with a Bitcoin idea to build it",
            href: "#",
            icon: EyeOffIcon
        }
    ]
    return (
        <div className="bg-white dark:bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-orange-600">
                        Who are we ?
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-black-800 dark:text-black-100 sm:text-5xl">
                        About The Bitcoin Dev Project
                    </p>
                    <p className="mt-6 text-lg leading-8 text-black-600 dark:text-black-400">
                        Our goal is to provide newcomers with resources and
                        support for your bitcoin open source development
                        journey. We are here to convince you to contribute to
                        bitcoin open source projects.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="text-base font-semibold leading-7 text-black-800 dark:text-black-100">
                                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 dark:bg-orange-800">
                                        <feature.icon
                                            className="h-6 w-6 text-white"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-black-600 dark:text-black-400">
                                    <p className="flex-auto">
                                        {feature.description}
                                    </p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
