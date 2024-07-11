"use client"

import Link from "next/link"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"

import { useState } from "react"
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    PopoverGroup,
    Transition
} from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { ThemeToggle } from "./dark-mode-toggle"
import { callsToAction, contributions, products } from "@/content/landing"

export function Header() {
    function classNames(...classes: any) {
        return classes.filter(Boolean).join(" ")
    }
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="isolate sticky top-0 dark:bg-black bg-white z-50">
            <div className="border-b-2 border-orange-500">
                <nav
                    className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
                    aria-label="Global"
                >
                    <div className="flex lg:flex-1">
                        <Link href="/">
                            <h1 className="text-xl md:text-xl font-bold">
                                The&nbsp;
                                <span className="text-orange-500">Bitcoin</span>
                                &nbsp;Dev Project
                            </h1>
                        </Link>
                    </div>

                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <PopoverGroup className="hidden lg:flex lg:gap-x-12 items-center">
                        <Popover>
                            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-800 dark:text-gray-100">
                                Learn
                                <ChevronDownIcon
                                    className="h-5 w-5 flex-none text-gray-400 dark:text-gray-600"
                                    aria-hidden="true"
                                />
                            </PopoverButton>

                            <Transition
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 -translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 -translate-y-1"
                            >
                                <PopoverPanel className="absolute inset-x-0 top-0 -z-10 bg-gray-50 dark:bg-black-800 pt-14 shadow-lg ring-1 ring-gray-800/5">
                                    <div className="mx-auto grid max-w-7xl grid-cols-3 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8">
                                        {products.map((item) => (
                                            <div
                                                key={item.name}
                                                className="group relative rounded-lg p-6 text-sm leading-6 hover:bg-gray-100 dark:hover:bg-black-900 "
                                            >
                                                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 dark:bg-orange group-hover:bg-white dark:group-hover:bg-black-900">
                                                    <item.icon
                                                        className="h-6 w-6 text-gray-600 dark:text-black-800 group-hover:text-orange-500"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <a href={item.href}>
                                                    <div className="mt-6 block font-semibold text-gray-800 dark:text-gray-100 relative">
                                                        {item.name}
                                                        {!item.released && (
                                                            <span className="ml-2 inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-normal text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                                                Coming Soon
                                                            </span>
                                                        )}
                                                        <span className="absolute inset-0" />
                                                    </div>
                                                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                                                        {item.description}
                                                    </p>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-700">
                                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                            <div className="grid grid-cols-1 divide-x divide-gray-800/5 border-x border-gray-800/5">
                                                {callsToAction.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 "
                                                    >
                                                        <item.icon
                                                            className="h-5 w-5 flex-none text-gray-400 dark:text-gray-600"
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </PopoverPanel>
                            </Transition>
                        </Popover>

                        <Popover>
                            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-800 dark:text-gray-100">
                                Contribute
                                <ChevronDownIcon
                                    className="h-5 w-5 flex-none text-gray-400 dark:text-gray-600"
                                    aria-hidden="true"
                                />
                            </PopoverButton>

                            <Transition
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 -translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 -translate-y-1"
                            >
                                <PopoverPanel className="absolute inset-x-0 top-0 -z-10 bg-gray-50 dark:bg-black-800 pt-14 shadow-lg ring-1 ring-gray-800/5">
                                    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8">
                                        {contributions.map((item) => (
                                            <div
                                                key={item.name}
                                                className="group relative rounded-lg p-6 text-sm leading-6 hover:bg-gray-100 dark:hover:bg-black-900 "
                                            >
                                                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 dark:bg-orange group-hover:bg-white dark:group-hover:bg-black-900">
                                                    <item.icon
                                                        className="h-6 w-6 text-gray-600 dark:text-black-800 group-hover:text-orange-500"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <a href={item.href}>
                                                    <div className="mt-6 block font-semibold text-gray-800 dark:text-gray-100">
                                                        {item.name}
                                                        <span className="absolute inset-0" />
                                                    </div>
                                                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                                                        {item.description}
                                                    </p>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-700">
                                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                            <div className="grid grid-cols-1 divide-x divide-gray-800/5 border-x border-gray-800/5">
                                                {callsToAction.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 "
                                                    >
                                                        <item.icon
                                                            className="h-5 w-5 flex-none text-gray-400 dark:text-gray-600"
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </PopoverPanel>
                            </Transition>
                        </Popover>
                        <a
                            href="/career"
                            className="text-sm font-semibold leading-6 text-gray-800 dark:text-gray-100"
                        >
                            Career
                        </a>

                        <a
                            href="/tools"
                            className="text-sm font-semibold leading-6 text-gray-800 dark:text-gray-100"
                        >
                            Tools
                        </a>
                        <a
                            href="/about"
                            className="text-sm font-semibold leading-6 text-gray-800 dark:text-gray-100"
                        >
                            About
                        </a>
                        <ThemeToggle />
                    </PopoverGroup>
                </nav>
            </div>
            <Dialog
                className="lg:hidden z-50"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-800/10">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <h1 className="text-2xl md:text-xl font-bold">
                                The&nbsp;
                                <span className="text-orange-500">Bitcoin</span>
                                &nbsp;Dev Project
                            </h1>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-950 ">
                                                Learn
                                                <ChevronDownIcon
                                                    className={classNames(
                                                        open
                                                            ? "rotate-180"
                                                            : "",
                                                        "h-5 w-5 flex-none"
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </DisclosureButton>
                                            <DisclosurePanel className="mt-2 space-y-2">
                                                {[
                                                    ...products,
                                                    ...callsToAction
                                                ].map((item) => (
                                                    <DisclosureButton
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-950 "
                                                    >
                                                        {item.name}
                                                    </DisclosureButton>
                                                ))}
                                            </DisclosurePanel>
                                        </>
                                    )}
                                </Disclosure>
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-950 ">
                                                Contribute
                                                <ChevronDownIcon
                                                    className={classNames(
                                                        open
                                                            ? "rotate-180"
                                                            : "",
                                                        "h-5 w-5 flex-none"
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </DisclosureButton>
                                            <DisclosurePanel className="mt-2 space-y-2">
                                                {[
                                                    ...contributions,
                                                    ...callsToAction
                                                ].map((item) => (
                                                    <DisclosureButton
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-950 "
                                                    >
                                                        {item.name}
                                                    </DisclosureButton>
                                                ))}
                                            </DisclosurePanel>
                                        </>
                                    )}
                                </Disclosure>
                                <a
                                    href="/career"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-950 "
                                >
                                    Career
                                </a>
                                <a
                                    href="/tools"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-950 "
                                >
                                    Tools
                                </a>
                                <a
                                    href="/about"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-950 "
                                >
                                    About
                                </a>
                            </div>
                            <div className="py-6">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
