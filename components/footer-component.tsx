"use client"

import { FOOTERLINKS } from "@/utils"
import clsx from "clsx"

const FooterComponent = () => {
    return (
        <footer className="relative min-h-[944px] md:min-h-[1000px] lg:min-h-[766px] pt-20 lg:pt-[129px]  bg-brand bg-footer-mobile md:bg-footer bg-cover bg-bottom bg-no-repeat  lg:bg-cover">
            <div className="flex flex-col p-5 lg:flex-row w-full gap-10 max-w-[583px] lg:mx-auto justify-between font-quicksand font-bold">
                {FOOTERLINKS.map((link) => (
                    <div key={link.name}>
                        <h6 className="text-sm text-brand-orange-100 uppercase">
                            {link.name}
                        </h6>
                        {link.name !== "contact" && (
                            <div
                                className={clsx(
                                    "flex flex-col font-quicksand font-normal mt-2.5 gap-2.5 text-brand-dark capitalize"
                                )}
                            >
                                {link.links.map((sublink) => (
                                    <a
                                    key={sublink.name}
                                        className="cursor-pointer text-nowrap hover:text-brand-orange-100"
                                        href={sublink.link}
                                    >
                                        {sublink.name}
                                    </a>
                                ))}
                            </div>
                        )}
                        {link.name === "contact" && (
                            <div className="flex flex-row gap-2 mt-2.5">
                                {link.links.map((subLink) => (
                                    <a
                                    key={subLink.name}
                                        href={subLink.link}
                                        target={subLink.target}
                                        className="bg-brand-gray text-brand-gray-200/75  border rounded-[4px] w-[44px] h-[44px] flex items-center justify-center  border-brand-gray-100"
                                    >
                                        {subLink?.component && (
                                            <subLink.component/>
                                        )}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </footer>
    )
}

export default FooterComponent
