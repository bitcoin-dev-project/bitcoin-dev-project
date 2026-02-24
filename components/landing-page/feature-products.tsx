import { FEATUREDPRODUCTS } from "@/utils"
import Image from "next/image"
import React, { useState } from "react"

const FeaturedProduct = () => {
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
    return (
        <div className="py-12 sm:py-16 md:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-12 sm:gap-16 lg:gap-20">
                <div className="text-center max-w-[631px] mx-auto flex flex-col w-full gap-2 sm:gap-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-brand-dark uppercase font-montserrat">
                        FEATURED PRODUCTS
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-brand-dark max-w-3xl mx-auto font-quicksand px-4 sm:px-0">
                        Explore tools crafted to support you in learning,
                        building, and contributing to the bitcoin ecosystem.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {FEATUREDPRODUCTS.map((product, index) => (
                        <a
                            key={product.name}
                            href={product.link}
                            target={product?.target}
                            className="relative cursor-pointer rounded-[20px] overflow-hidden aspect-[3/4] transition-all duration-500 bg-brand-gray border border-brand-stroke-on-base flex flex-col justify-between"
                            onMouseEnter={() => setHoveredProduct(index)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            <div
                                className={`relative flex-1 w-[calc(100%-1rem)] sm:w-[calc(100%-1.5rem)] mb-2 mt-2 sm:mt-3 mx-auto rounded-2xl overflow-hidden xl:transition-all xl:duration-500 xl:ease-in-out ${
                                    hoveredProduct === index
                                        ? "xl:flex-[0.75] xl:w-[calc(100%-1.5rem)] xl:mt-3 xl:mx-3 xl:mb-2"
                                        : "xl:flex-1 xl:w-full xl:mt-0 xl:mx-0 xl:mb-0"
                                }`}
                            >
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 space-y-2 sm:space-y-3">
                                    <div className="inline-flex items-center gap-2 bg-brand-gray border border-[#A9A49B]/75 rounded-full px-2 py-1">
                                        <div className="w-2 h-2 bg-black rounded-full"></div>
                                        <span className="text-xs sm:text-sm font-normal text-brand-dark font-quicksand">
                                            {product.action} {product.users}{" "}
                                            users
                                        </span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold text-[#F6F0E6] font-montserrat">
                                        {product.name}
                                    </h3>
                                </div>
                            </div>

                            <div
                                className={`px-3 sm:px-4 pb-2 sm:pb-3 xl:absolute xl:bottom-6 xl:left-3 xl:right-3 xl:pb-0 xl:transition-opacity xl:duration-500 ${
                                    hoveredProduct === index
                                        ? "xl:opacity-100"
                                        : "xl:opacity-0"
                                }`}
                            >
                                <p className="text-brand-dark text-sm sm:text-base md:text-lg lg:text-[1.125rem] font-quicksand leading-relaxed md:leading-normal lg:leading-[1.2]">
                                    {product.description}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FeaturedProduct
