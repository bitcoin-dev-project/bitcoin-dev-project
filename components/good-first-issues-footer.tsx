import Image from "next/image"
import { FOOTERLINKS } from "@/utils"

const GoodFirstIssuesFooter = () => {
    return (
        <footer
            className="relative overflow-hidden 
               min-h-[944px] md:min-h-[1000px] lg:min-h-[766px] 
               pt-20 lg:pt-[129px] 
               bg-black bg-cover bg-bottom bg-no-repeat
               bg-[url('/images/mobiledarkfooter.png')] md:bg-[url('/images/darkfooter.png')]"
        >
            <div
                className="pointer-events-none absolute inset-x-0
             bottom-0 md:top-0 md:bottom-auto
             md:-translate-y-24 lg:-translate-y-40
             z-0 flex justify-center"
            >
                <Image
                    src="/images/mobiledarkpango.png"
                    alt=""
                    width={1440}
                    height={900}
                    sizes="100vw"
                    className="w-full h-full object-contain lg:hidden"
                />
                <Image
                    src="/images/darkpango.png"
                    alt=""
                    width={1440}
                    height={900}
                    sizes="100vw"
                    className="hidden w-full h-full object-contain md:block"
                />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col p-5 lg:flex-row w-full gap-10 max-w-[583px] lg:mx-auto justify-between font-quicksand font-bold text-white">
                {FOOTERLINKS.map((link) => (
                    <div key={link.name}>
                        <h6 className="text-sm text-brand-orange-100 uppercase">
                            {link.name}
                        </h6>

                        {link.name !== "contact" && (
                            <div className="flex flex-col font-quicksand font-normal mt-2.5 gap-2.5 text-white/80 capitalize">
                                {link.links.map((sublink) => (
                                    <a
                                        key={sublink.name}
                                        className="cursor-pointer text-nowrap hover:text-brand-orange-100"
                                        href={sublink.link}
                                        target={sublink.target}
                                        rel={
                                            sublink.target
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
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
                                        rel={
                                            subLink.target
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className="bg-white/5 text-white/80 hover:text-brand-orange-100 border rounded-[4px] w-[44px] h-[44px] flex items-center justify-center border-white/20"
                                    >
                                        {subLink?.component && (
                                            <subLink.component />
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

export default GoodFirstIssuesFooter
