"use client"

import Link from "next/link"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"

import React from "react"
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    PopoverGroup
} from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { ThemeToggle } from "./dark-mode-toggle"
import { callsToAction, contributions, products } from "@/content/landing"
import useOnclickOut from "@/hooks/useOnclickOut"
import { classNames } from "@/utils/content-utils"

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

    const closeMobileMenu = () => {
        setMobileMenuOpen(false)
    }

    return (
        <header className="isolate sticky top-0 bg-vscode-background-light dark:bg-vscode-background-dark z-50">
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
                        <PopoverNavigation
                            navItem="Learn"
                            navItemList={products}
                            navType="LEARN"
                        />
                        <PopoverNavigation
                            navItem="Contribute"
                            navItemList={contributions}
                            navType="CONTRIBUTE"
                        />
                        <Link
                            href="/career"
                            className="text-sm font-semibold leading-6 text-gray-800 dark:text-gray-100"
                        >
                            Career
                        </Link>

                        <Link
                            href="/tools"
                            className="text-sm font-semibold leading-6 text-gray-800 dark:text-gray-100"
                        >
                            Tools
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-semibold leading-6 text-gray-800 dark:text-gray-100"
                        >
                            About
                        </Link>
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
                <DialogPanel className="fixed inset-y-0 right-0 z-40 w-full overflow-y-auto bg-white dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-800/10">
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
                                                        onClick={
                                                            closeMobileMenu
                                                        }
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
                                                        onClick={
                                                            closeMobileMenu
                                                        }
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-950 "
                                                    >
                                                        {item.name}
                                                    </DisclosureButton>
                                                ))}
                                            </DisclosurePanel>
                                        </>
                                    )}
                                </Disclosure>
                                <Link
                                    href="/career"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-950 "
                                >
                                    Career
                                </Link>
                                <Link
                                    href="/tools"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-950 "
                                >
                                    Tools
                                </Link>
                                <Link
                                    href="/about"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-950 "
                                >
                                    About
                                </Link>
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

function PopoverNavigation({
    navItem,
    navItemList,
    navType
}: {
    navItem: string
    navItemList: Array<{
        name: string
        description: string
        href: string
        icon: React.ForwardRefExoticComponent<
            Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
                title?: string | undefined
                titleId?: string | undefined
            } & React.RefAttributes<SVGSVGElement>
        >
        released: boolean
    }>
    navType: "LEARN" | "CONTRIBUTE"
}) {
    const { isOpen, setOpen, wrapperRef, contentRef } = useOnclickOut()

    const handleLinkClick = () => {
        setOpen(false)
    }

    return (
        <Popover>
            <PopoverButton
                as="button"
                onClick={() => setOpen(!isOpen)}
                className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-800 dark:text-gray-100 focus:outline-none"
                ref={contentRef}
            >
                {navItem}
                <ChevronDownIcon
                    className="h-5 w-5 flex-none text-gray-400 dark:text-gray-600"
                    aria-hidden="true"
                />
            </PopoverButton>
            {isOpen && (
                <PopoverPanel
                    className="absolute inset-x-0 top-0 -z-10 bg-gray-50 dark:bg-black-800 pt-14 shadow-lg ring-1 ring-gray-800/5"
                    ref={wrapperRef}
                    static
                >
                    <div
                        className={`mx-auto grid max-w-7xl ${navType === "CONTRIBUTE" ? "grid-cols-2" : "grid-cols-3"} gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8`}
                    >
                        {navItemList.map((item) => (
                            <div
                                key={item.name}
                                className={`group relative rounded-lg p-6 text-sm leading-6 hover:bg-gray-100 dark:hover:bg-black-900 ${
                                    item.released
                                        ? "cursor-pointer"
                                        : "pointer-events-none opacity-50"
                                }`}
                            >
                                {item.released ? (
                                    <Link
                                        href={item.href}
                                        onClick={handleLinkClick}
                                        className="flex gap-4"
                                    >
                                        <div className="flex h-11 w-11 min-h-11 min-w-11 items-center justify-center rounded-lg bg-gray-100 dark:bg-orange group-hover:bg-white dark:group-hover:bg-black-900">
                                            <item.icon
                                                className="h-6 w-6 text-gray-600 dark:text-black-800 group-hover:text-orange-500"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div>
                                            <div className="block font-semibold text-gray-800 dark:text-gray-100">
                                                {item.name}
                                            </div>
                                            <p className="mt-1 text-gray-600 dark:text-gray-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="flex gap-4">
                                        <div className="flex h-11 w-11 min-h-11 min-w-11 items-center justify-center rounded-lg bg-gray-100 dark:bg-orange">
                                            <item.icon
                                                className="h-6 w-6 text-gray-600 dark:text-black-800"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div>
                                            <div className="block font-semibold text-gray-800 dark:text-gray-100">
                                                {item.name}
                                                {navType === "LEARN" && (
                                                    <span className="ml-2 inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-normal text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                                        Coming Soon
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-1 text-gray-600 dark:text-gray-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="grid grid-cols-1 divide-x divide-gray-800/5 border-x border-gray-800/5">
                                {callsToAction.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={handleLinkClick}
                                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 "
                                    >
                                        <item.icon
                                            className="h-5 w-5 flex-none text-gray-400 dark:text-gray-600"
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </PopoverPanel>
            )}
        </Popover>
    )
}
