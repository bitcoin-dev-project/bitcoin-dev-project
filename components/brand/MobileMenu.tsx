import React, { Dispatch, SetStateAction, useState } from "react"
import BDPLogoRed from "../assets/BDPLogoRed"
import MobileClose from "../assets/MobileClose"
import { FOOTERLINKS, NAVLINKS } from "@/utils"
import Image from "next/image"
import Link from "next/link"
import ArrowIcon from "../assets/ArrowIcon"
import clsx from "clsx"

const MobileMenu = ({ isOpen, setIsOpen }: { isOpen?: boolean; setIsOpen:Dispatch<SetStateAction<boolean>> }) => {
    const [socialLinks] = useState(
        FOOTERLINKS.filter((link) => link.name === "contact")
    )
    const onClose = ()=>{
        setIsOpen(!isOpen)
    }
    return (
        <div
            className={clsx(
                `flex flex-col gap-12 z-50 top-0 bg-brand px-5 py-3 justify-start transition-all duration-100 ease-in-out`,
                {
                    "fixed h-screen w-screen overflow-hidden opacity-100": isOpen,
                    "z-[-10] absolute opacity-0": !isOpen
                }
            )}
        >
            <div className="flex flex-row items-center justify-between h-20">
                <BDPLogoRed />
                <MobileClose onClick={onClose} role="button" className="w-8 h-8" />
            </div>

            <div className="flex flex-col pt-4">
                {NAVLINKS.map((nav) => (
                    <Link
                        key={nav.name}
                        href={nav.link}
                        onClick={onClose}
                        className="text-brand-orange-100 flex items-center justify-between"
                    >
                        <span className="font-montserrat text-[2.5rem] font-bold">
                            {nav.name}
                        </span>
                        <ArrowIcon />
                    </Link>
                ))}
            </div>

            <div className="flex flex-col items-center gap-10">
                <div>
                    <Image
                        src={"/images/pangolin-mobile-menu.webp"}
                        alt="A Pangolin with Construction helmet"
                        width={377}
                        height={251}
                    />
                </div>
                <div>
                    {socialLinks.map((link) => (
                        <div
                            key={link.name}
                            className="flex flex-row gap-2 mt-2.5"
                        >
                            {link.links.map((subLink) => (
                                <a
                                    key={subLink.name}
                                    href={subLink.link}
                                    target={subLink.target}
                                    className="bg-brand-orange-100 text-brand-orange text-2xl p-1  border rounded-[4px] w-[40px] h-[40px] flex items-center justify-center  border-brand-gray-100"
                                >
                                    {subLink?.component && (
                                        <subLink.component className="w-5" />
                                    )}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MobileMenu
