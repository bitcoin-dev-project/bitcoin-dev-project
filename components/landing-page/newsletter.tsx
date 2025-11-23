import Image from "next/image"
import React from "react"

const Newsletter = () => {
    return (
        <div className="py-24 relative z-50">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="bg-[#EFE9DE] border-2 border-[#E1DBD0] rounded-[40px] overflow-visible relative">
                    <div className="absolute -top-8 -right-8 lg:-top-12 lg:-right-12 z-10">
                        <Image
                            src="/images/mail-icon.svg"
                            alt="Newsletter"
                            width={120}
                            height={120}
                            className="w-24 h-24 lg:w-32 lg:h-32 drop-shadow-lg"
                        />
                    </div>
                    <div className="grid lg:grid-cols-2 items-stretch max-w-full overflow-hidden rounded-[40px]">
                      
                        <div className="space-y-8 p-5 md:p-12 lg:p-16">
           
                            <div className="flex items-center">
                                <Image
                                    src="/images/tldr-logo.svg"
                                    alt="TLDR"
                                    width={80}
                                    height={28}
                                    className="h-7 w-auto"
                                />
                            </div>

                     
                            <h2 className="text-[2rem] lg:text-5xl font-bold text-brand-dark leading-tight font-montserrat">
                                THE INBOX MVP FOR BITCOIN DEVS
                            </h2>

              
                            <p className="text-xl text-brand-dark font-quicksand leading-[1.2]">
                                Get weekly summaries of every post and thread on
                                bitcoin-dev and Delving Bitcoin mailing lists to
                                your inbox every Monday.
                            </p>

                            {/* Email Form */}
                            <div className="flex gap-3 max-w-xl">
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    className="flex-1 px-2.5 py-4 rounded-[10px] bg-brand-gray border-2 border-brand-gray-100 focus:border-brand-orange-100 focus:outline-none font-quicksand text-brand-dark placeholder:text-brand-gray-300"
                                />
                                <button className="bg-brand-orange-100 text-white font-bold px-2.5 py-2.5 rounded-xl hover:opacity-90 transition-opacity font-quicksand whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        <div className="relative flex lg:items-end min-h-[384px] h-full lg:pr-12">
                            <div className="absolute left-0 sm:left-[25%] lg:left-0 h-[384px] w-full bottom-[-30px] sm:bottom-0 ">
                                <div className="relative h-[384px]">
                                    <Image
                                        src="/images/newsletter-preview.webp"
                                        alt="Bitcoin TLDR Newsletter Preview"
                                        fill
                                        className="object-contain absolute object-left w-[475px] h-[384px] bottom-0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newsletter
