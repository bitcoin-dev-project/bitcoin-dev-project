"use client"

import { usePathname } from "next/navigation"
import { FOOTERLINKS } from "@/utils"
import clsx from "clsx"

const FooterComponent = () => {
    const pathname = usePathname()
    const isDecoding = pathname?.startsWith("/decoding")

    return (
        <footer
            className={clsx(
                "relative min-h-[944px] md:min-h-[1000px] lg:min-h-[766px] pt-12 lg:pt-16 bg-cover bg-bottom bg-no-repeat lg:bg-cover",
                isDecoding
                    ? "bg-vscode-background-dark bg-dark-footer-mobile md:bg-dark-footer"
                    : "bg-brand bg-footer-mobile md:bg-footer"
            )}
        >
            <div className="flex flex-col p-5 lg:flex-row w-full gap-10 max-w-[583px] lg:mx-auto justify-between font-quicksand font-bold">
                {FOOTERLINKS.map((link) => (
                    <div key={link.name}>
                        <h6 className="text-sm text-brand-orange-100 uppercase">
                            {link.name}
                        </h6>
                        {link.name !== "contact" && (
                            <div
                                className={clsx(
                                    "flex flex-col font-quicksand font-normal mt-2.5 gap-2.5 capitalize",
                                    isDecoding
                                        ? "text-gray-300"
                                        : "text-brand-dark"
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
                            <div className="flex flex-row gap-3 mt-2.5">
                                {link.links.map((subLink) => (
                                    <a
                                        key={subLink.name}
                                        href={subLink.link}
                                        target={subLink.target}
                                        className={clsx(
                                            "border rounded-[6px] w-[52px] h-[52px] flex items-center justify-center transition-all duration-200 hover:scale-110",
                                            isDecoding
                                                ? "bg-transparent text-gray-400 border-gray-600 hover:text-brand-orange-100 hover:border-brand-orange-100 hover:bg-brand-orange-100/10"
                                                : "bg-brand-gray text-brand-gray-200/75 border-brand-gray-100 hover:text-brand-orange-100 hover:bg-brand-orange-100/10 hover:border-brand-orange-100"
                                        )}
                                    >
                                        {subLink?.component && (
                                            <subLink.component className="w-6 h-6" />
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
