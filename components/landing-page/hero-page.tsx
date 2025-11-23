import { FEATUREDLOGOS } from "@/utils"
import Image from "next/image"
import Link from "next/link"
import React, { Dispatch, SetStateAction } from "react"
import BDPMenu from "../assets/BDPMenu"
import BDPLogoWhite from "../assets/BDPLogoWhite"

const HeroPage = ({setIsOpen}:{setIsOpen:Dispatch<SetStateAction<boolean>>}) => {
    const onOpen = ()=>{
        setIsOpen(prev=>!prev)
    }
    return (
        <div className="relative min-h-screen overflow-visible">
            <div
                className="absolute inset-0 z-0 rounded-b-[80px] overflow-hidden"
                style={{ height: "calc(100% + 80px)" }}
            >
                <Image
                    src="/images/hero/rebranded/sky-background.png"
                    alt="Sky background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <nav className="relative z-10 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-20">
                <Link href="/" className="flex items-center flex-shrink-0">
                    <BDPLogoWhite className="lg:w-[119px]" />
                </Link>
                <div className="hidden items-center gap-6 lg:flex lg:flex-row font-quicksand">
                    <Link
                        href="/about"
                        className="text-white font-medium hover:opacity-80 transition-opacity text-base"
                    >
                        About
                    </Link>
                    <Link
                        href="/explore"
                        className="px-3 capitalize py-3 bg-white text-brand-orange-100 font-bold rounded-[10px] hover:opacity-90 transition-all duration-200 text-base leading-none"
                    >
                        Start exploring
                    </Link>
                </div>
                <BDPMenu onClick={onOpen} className="text-white lg:hidden" />
            </nav>

            <div className="relative pt-8 lg:pt-0 z-10 w-full px-4 lg:pl-16 max-w-7xl lg:mx-auto lg:px-8  pb-20">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between items-center">
                    <div className="flex flex-col gap-2 lg:max-w-[568px] w-full items-center lg:items-start">
                        <div className="inline-block">
                            <div className="px-2.5 py-1 bg-[#6CB3DD]/44 backdrop-blur-[8px] max-w-[max-content] rounded-full border border-white border-opacity-70">
                                <p className="text-white text-xs lg:text-sm font-medium tracking-wide font-quicksand uppercase">
                                    ● OPEN-SOURCE LEARNING, STREAMLINED
                                </p>
                            </div>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-[3.5rem] lg:text-[5.25rem] text-center lg:text-left font-bold text-white leading-none font-montserrat uppercase max-w-[568px]">
                            BUILD THE FUTURE OF MONEY
                        </h1>

                        <p className="text-base text-white font-semibold text-center lg:text-left max-w-xl font-quicksand">
                            The{" "}
                            <span className="font-bold">
                                {" "}
                                Bitcoin Dev Project{" "}
                            </span>{" "}
                            provides free and open-source tools for you to learn
                            and contribute to bitcoin development and products
                        </p>

                        <div className="pt-2">
                            <Link href="/explore">
                                <button className="bg-white text-brand-orange-100 font-bold px-2.5 py-2.5 rounded-[10px] leading-none hover:opacity-90 transition-opacity font-quicksand text-base">
                                    Start Exploring Bitcoin Tech
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="relative flex items-center w-full justify-center">
                        <div className="relative w-full max-w-[651px] aspect-square animate-float">
                            <Image
                                src="/images/hero/rebranded/portal-island.webp"
                                alt="Open Source, Open Doors - Floating Island Portal"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured In Section */}
            <div className="relative z-10 pb-16">
                <div className="max-w-7xl mx-auto px-8">
                    <p className="text-center text-brand-blue-200 text-base font-bold tracking-wider mb-8 font-quicksand">
                        FEATURED IN
                    </p>
                    <div className="flex flex-wrap justify-center gap-y-10 md:gap-6">
                        {FEATUREDLOGOS.map((item) => (
                            <a
                                key={item.name}
                                className="relative rounded-xl p-6 w-[153px] h-[109px] md:w-48 md:h-32 flex flex-col items-center justify-center transition-all"
                            >
                                <div className="text-center flex flex-col items-center justify-center gap-3">
                                    <Image
                                        src={item.logo}
                                        alt={item.name}
                                        width={60}
                                        height={45}
                                        className="object-contain h-12 w-auto"
                                    />
                                    <p className="text-brand-blue-200 text-nowrap text-base font-normal font-montserrat leading-[1.2]">
                                        {item.name}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroPage
