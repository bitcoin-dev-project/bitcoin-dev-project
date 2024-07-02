"use client"

import Link from "next/link"
import Image from "next/image"
import { ContributeNavPointers, navPointers } from "@/content/data"
import useOnclickOut from "@/hooks/useOnclickOut"
import { slugify } from "@/utils/slugify"
import ArrowDownIcon from "../public/images/arrow-down.svg"

export function NavbarDropDown({
    menuItem,
    isMobile,
    hideDrawer
}: {
    menuItem: string

    isMobile: boolean
    hideDrawer?: () => void
}) {
    const subMenus = menuItem === "Learn" ? navPointers : ContributeNavPointers
    const { isOpen, setOpen, contentRef, wrapperRef, toggle } = useOnclickOut()
    const iconStyle = isOpen ? "rotate-180" : ""

    return (
        <div className="relative inline-block text-left">
            <div className="w-fit" ref={contentRef} onClick={toggle}>
                <button
                    type="button"
                    className={`flex items-center justify-center rounded-md ${isMobile ? `gap-x-3 font-semibold text-lg w-fit` : `w-full gap-x-1.5 px-3 py-2 text-gray-800 dark:text-gray-100 dark:text-gray-100`}`}
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    {menuItem}
                    <Image
                        className={`${iconStyle} transition-transform ease-linear w-3 h-3`}
                        src={ArrowDownIcon}
                        alt="arrow down"
                    />
                </button>
            </div>

            {isOpen && (
                <div
                    className={
                        isMobile
                            ? ""
                            : "absolute right-0 z-10 w-48 origin-top-right rounded-md bg-white dark:bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-opacity duration-200"
                    }
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    ref={isMobile ? null : wrapperRef}
                >
                    <div className="py-1" role="none">
                        {subMenus.map((link) => (
                            <Link
                                onClick={
                                    isMobile ? hideDrawer : () => setOpen(false)
                                }
                                key={link.btnText}
                                href={link.jumpTo}
                                className="text-gray-700 dark:text-gray-300 block px-4 py-2 text-sm"
                                role="menuitem"
                                id="menu-item-0"
                                data-umami-event={`nav-${slugify(link.btnText)}-clicked`}
                            >
                                {link.btnText}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavbarDropDown
