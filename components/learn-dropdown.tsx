"use client"

import { navPointers } from "@/content/data"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function Desktop() {
    const dropDownRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [showDropDown, setShowDropDown] = useState(false)
    const iconStyle = showDropDown ? "rotate-180" : ""

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setShowDropDown(false)
            }
        })
        return () => {
            document.removeEventListener("mousedown", () => {
                setShowDropDown(false)
            })
        }
    }, [])

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    ref={buttonRef}
                    onClick={() => setShowDropDown((value) => !value)}
                    type="button"
                    className="flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-gray-900"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    Learn
                    <Image
                        className={`${iconStyle} transition-transform ease-linear `}
                        src={"/images/arrow-down.svg"}
                        alt="arrow down"
                        width={12}
                        height={12}
                    />
                </button>
            </div>

            {showDropDown && (
                <div
                    className="absolute right-0 z-10 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-opacity duration-200"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                >
                    <div ref={dropDownRef} className="py-1" role="none">
                        {navPointers.map((link) => (
                            <Link
                                onClick={() => setShowDropDown(false)}
                                key={link.btnText}
                                href={link.jumpTo}
                                className="text-gray-700 block px-4 py-2 text-sm"
                                role="menuitem"
                                id="menu-item-0"
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

export function Mobile({ hideDrawer }: { hideDrawer: () => void }) {
    const [showDropDown, setShowDropDown] = useState(false)
    const iconStyle = showDropDown ? "rotate-180" : ""

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    onClick={() => setShowDropDown((value) => !value)}
                    type="button"
                    className="flex items-center justify-center gap-x-3 rounded-md bg-white font-semibold text-lg"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    Learn
                    <Image
                        className={`${iconStyle} transition-transform ease-linear `}
                        src={"/images/arrow-down.svg"}
                        alt="arrow down"
                        width={12}
                        height={12}
                    />
                </button>
            </div>

            {showDropDown && (
                <div
                    className={clsx("transition-[height] duration-1000", {
                        "h-0": !showDropDown
                    })}
                    role="menu"
                >
                    <div className="py-1" role="none">
                        {navPointers.map((link) => (
                            <Link
                                onClick={hideDrawer}
                                key={link.btnText}
                                href={link.jumpTo}
                                className="text-gray-700 block px-4 py-2 text-md"
                                role="menuitem"
                                id="menu-item-0"
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

export const LearnDropDown = Object.assign(Desktop, { Mobile })
