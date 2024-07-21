"use client"

import Image from "next/image"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import clsx from "clsx"
import { tools } from "@/content/landing"

import { Container } from "./Container"
import { IFeature } from "@/types"

function Feature({
    feature,
    isActive,
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div"> & {
    feature: IFeature
    isActive: boolean
}) {
    return (
        <div
            className={clsx(
                className,
                "flex flex-col items-center",
                !isActive && "opacity-75 hover:opacity-100"
            )}
            {...props}
        >
            <h3
                className={clsx(
                    "mt-6 text-xl font-bold text-center",
                    isActive
                        ? "text-orange-500"
                        : "text-black-950 dark:text-black-50"
                )}
            >
                {feature.name}
            </h3>
            <p className="mt-2 font-display text-xl text-black-800 dark:text-black-100 text-center">
                {feature.summary}
            </p>
            <p className="mt-4 text-sm text-black-600 dark:text-black-400 text-center">
                {feature.description}
            </p>
        </div>
    )
}

function FeaturesMobile() {
    return (
        <div className="-mx-4 mt-20 max-sm:mt-8 flex flex-col gap-y-5 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
            {tools.map((feature) => (
                <div key={feature.description}>
                    <Feature
                        feature={feature}
                        className="mx-auto max-w-2xl"
                        isActive
                    />
                    <div className="relative mt-10 pb-10">
                        <div className="absolute -inset-x-4 bottom-0 top-8 bg-gray-200 dark:bg-gray-900 sm:-inset-x-6" />
                        <div className="relative mx-auto overflow-hidden rounded-xl bg-white dark:bg-black shadow-lg shadow-black-800/5 ring-1 ring-black-500/10">
                            <Image
                                className="object-center w-full h-full"
                                src={feature.image}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function FeaturesDesktop() {
    return (
        <TabGroup className="hidden lg:mt-20 lg:block">
            {({ selectedIndex }) => (
                <>
                    <div className="overflow-x-auto">
                        <TabList className="flex divide-x divide-gray-300">
                            {tools.map((feature, featureIndex) => (
                                <section
                                    key={feature.description}
                                    className={`min-w-[260px] relative p-4 ${
                                        featureIndex === selectedIndex
                                            ? "bg-[#f7f7f7] dark:bg-gray-900"
                                            : "hover:bg-[#f7f7f7] dark:hover:bg-gray-900"
                                    }`}
                                >
                                    <Feature
                                        feature={{
                                            ...feature,
                                            name: (
                                                <Tab className="ui-not-focus-visible:outline-none">
                                                    <span className="absolute inset-0" />
                                                    {feature.name}
                                                </Tab>
                                            )
                                        }}
                                        isActive={
                                            featureIndex === selectedIndex
                                        }
                                    />
                                </section>
                            ))}
                        </TabList>
                    </div>
                    <TabPanels className="relative mt-20 overflow-hidden rounded-4xl bg-[#f7f7f7] dark:bg-gray-900 px-14 py-16 xl:px-16">
                        <div className="-mx-5 flex">
                            {tools.map((feature, featureIndex) => (
                                <section key={feature.description}>
                                    <TabPanel
                                        static
                                        className={clsx(
                                            "px-5 transition duration-500 ease-in-out ui-not-focus-visible:outline-none",
                                            featureIndex !== selectedIndex &&
                                                "opacity-60"
                                        )}
                                        style={{
                                            transform: `translateX(-${selectedIndex * 100}%)`
                                        }}
                                        aria-hidden={
                                            featureIndex !== selectedIndex
                                        }
                                    >
                                        <div className="w-[52.75rem] overflow-hidden rounded-xl bg-white dark:bg-black shadow-lg shadow-black-800/5 ring-1 ring-black-500/10">
                                            <Image
                                                className="w-full"
                                                src={feature.image}
                                                alt=""
                                                sizes="52.75rem"
                                            />
                                        </div>
                                    </TabPanel>
                                </section>
                            ))}
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-black-800/10" />
                    </TabPanels>
                </>
            )}
        </TabGroup>
    )
}

export function SecondaryFeatures() {
    return (
        <section
            id="secondary-features"
            aria-label="Features for simplifying everyday business tasks"
            className="pb-8 pt-10 sm:pb-16 sm:pt-20 lg:pb-24"
        >
            <Container>
                <div className="mx-auto max-w-2xl md:text-center">
                    <h2 className="text-base font-semibold leading-7 text-orange-500">
                        Tools and Resources
                    </h2>
                    <h2 className="font-display font-bold text-3xl tracking-tight text-black-800 dark:text-black-100 sm:text-5xl">
                        <div className="text-orange">
                            From Learning to Action
                        </div>
                        Dive Into Bitcoin Development
                    </h2>
                    <p className="mt-4 text-lg tracking-tight text-black-700 dark:text-black-300">
                        Explore tools crafted to support you in learning,
                        building, and contributing to the Bitcoin ecosystem.
                    </p>
                </div>
                <FeaturesMobile />
                <FeaturesDesktop />
            </Container>
        </section>
    )
}
