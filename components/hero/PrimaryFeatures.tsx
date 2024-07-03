"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import clsx from "clsx"

import { Container } from "./Container"

import screenshotTopics from "@/public/images/hero/screenshots/topics.png"
import screenshotGoodFirstIssues from "@/public/images/hero/screenshots/good-first-issues.png"

const features = [
    {
        title: "Bitcoin Topics",
        description:
            "Breaking complex Bitcoin topics in a simple way. A resource rich with Visuals and animations to simplify complex technical Bitcoin concepts",
        image: screenshotTopics,
        released: false,
        checks: [
            "Collection of visuals and animations to help you",
            "From the basics to advanced concepts"
        ]
    },
    {
        title: "Good First Issues",
        description:
            "Explore vetted Free Open Source Software (FOSS) projects and find your way in bitcoin open source.",
        image: screenshotGoodFirstIssues,
        released: true,
        checks: [
            "Explore vetted FOSS projects",
            "Find your way in bitcoin open source"
        ]
    }
]

export function PrimaryFeatures() {
    let [tabOrientation, setTabOrientation] = useState<
        "horizontal" | "vertical"
    >("horizontal")

    useEffect(() => {
        let lgMediaQuery = window.matchMedia("(min-width: 1024px)")

        function onMediaQueryChange({ matches }: { matches: boolean }) {
            setTabOrientation(matches ? "vertical" : "horizontal")
        }

        onMediaQueryChange(lgMediaQuery)
        lgMediaQuery.addEventListener("change", onMediaQueryChange)

        return () => {
            lgMediaQuery.removeEventListener("change", onMediaQueryChange)
        }
    }, [])

    return (
        <section
            id="features"
            aria-label="Features for running your books"
            className="relative overflow-hidden bg-gray-200 dark:bg-gray-800 pb-20 pt-20 sm:py-26"
        >
            <Container className="relative">
                <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
                    <h2 className="font-display text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl">
                        Feeling <span className="text-orange">Lost</span> about
                        where to start ?
                    </h2>
                    <p className="mt-6 text-lg tracking-tight text-gray-800 dark:text-gray-200">
                        Well, we have everything you need to get started on your
                        Bitcoin journey
                    </p>
                </div>
                <TabGroup
                    className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
                    vertical={tabOrientation === "vertical"}
                >
                    {({ selectedIndex }) => (
                        <>
                            <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                                <TabList className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                                    {features.map((feature, featureIndex) => (
                                        <div
                                            key={feature.title}
                                            className={clsx(
                                                "group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6",
                                                selectedIndex === featureIndex
                                                    ? "bg-white dark:bg-black lg:dark:bg-black/10 lg:ring-1 lg:ring-inset lg:ring-white/10"
                                                    : "hover:dark:bg-black/10 lg:hover:dark:bg-black/5"
                                            )}
                                        >
                                            <h3 className="flex items-center">
                                                <Tab
                                                    className={clsx(
                                                        "font-display text-xl font-medium ui-not-focus-visible:outline-none",
                                                        selectedIndex ===
                                                            featureIndex
                                                            ? "text-gray-400 dark:text-gray-600 lg:text-black dark:lg:text-white"
                                                            : "text-gray-800 dark:text-gray-100 hover:text-black dark:hover:text-white lg:text-black dark:lg:text-white"
                                                    )}
                                                >
                                                    <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                                                    {feature.title}
                                                </Tab>
                                                {feature.released ? null : (
                                                    <span className="ml-3 inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-1 text-xs font-normal text-yellow-500 ring-1 ring-inset ring-yellow-600">
                                                        <svg
                                                            className="h-1 w-1 fill-yellow-500"
                                                            viewBox="0 0 6 6"
                                                            aria-hidden="true"
                                                        >
                                                            <circle
                                                                cx={3}
                                                                cy={3}
                                                                r={3}
                                                            />
                                                        </svg>
                                                        (Coming Soon)
                                                    </span>
                                                )}
                                            </h3>
                                            <p
                                                className={clsx(
                                                    "mt-2 hidden text-sm font-light lg:block",
                                                    selectedIndex ===
                                                        featureIndex
                                                        ? "text-black dark:text-white lg-text-black dark:lg-text-white"
                                                        : "text-gray-800 dark:text-gray-100  group-hover:text-black  dark:group-hover:text-white"
                                                )}
                                            >
                                                {feature.description}
                                            </p>

                                            {selectedIndex === featureIndex && (
                                                <div className="order-last mt-6">
                                                    <ul
                                                        role="list"
                                                        className={clsx(
                                                            "-my-2 divide-y text-sm",
                                                            false
                                                                ? "divide-gray-800 text-gray-300"
                                                                : "divide-gray-600 text-gray-500 dark:text-gray-400"
                                                        )}
                                                    >
                                                        {feature.checks.map(
                                                            (check) => (
                                                                <li
                                                                    key={check}
                                                                    className="flex py-2"
                                                                >
                                                                    <CheckIcon
                                                                        className={clsx(
                                                                            "h-6 w-6 flex-none",
                                                                            false
                                                                                ? "text-white"
                                                                                : "text-cyan-500"
                                                                        )}
                                                                    />
                                                                    <span className="ml-4">
                                                                        {check}
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </TabList>
                            </div>
                            <TabPanels className="lg:col-span-7">
                                {features.map((feature) => (
                                    <TabPanel
                                        key={feature.title}
                                        unmount={false}
                                    >
                                        <div className="relative sm:px-6 lg:hidden">
                                            <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] dark:bg-black/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                                            <p className="relative mx-auto max-w-2xl text-base text-black dark:text-white sm:text-center">
                                                {feature.description}
                                            </p>
                                        </div>

                                        <div className="mt-10 w-[30rem] overflow-hidden rounded-xl bg-black-50 shadow-xl shadow-gray-100/20 sm:w-auto lg:mt-0 lg:w-[50rem]">
                                            <Image
                                                className="w-full"
                                                src={feature.image}
                                                alt=""
                                                priority
                                                sizes="(min-width: 1024px) 50rem, (min-width: 640px) 100vw, 30rem"
                                            />
                                        </div>
                                    </TabPanel>
                                ))}
                            </TabPanels>
                        </>
                    )}
                </TabGroup>
            </Container>
        </section>
    )
}

function CheckIcon(props: React.ComponentPropsWithoutRef<"svg">) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path
                d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
                fill="currentColor"
            />
            <circle
                cx="12"
                cy="12"
                r="8.25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
