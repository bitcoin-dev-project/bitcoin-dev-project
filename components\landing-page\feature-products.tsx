import { FEATUREDPRODUCTS } from "@/utils"
import Image from "next/image"
import React, { useState } from "react"

const FeaturedProduct = () => {
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
    return (
        <div className=" py-24">
            <div className="max-w-7xl mx-auto px-8 flex flex-col gap-20">
                <div className="text-center max-w-[631px] mx-auto flex flex-col w-full gap-2">
                    <h2 className="text-2xl font-bold text-brand-dark  uppercase font-montserrat">
                        FEATURED PRODUCTS
                    </h2>
                    <p className="text-xl text-brand-dark max-w-3xl mx-auto font-quicksand">
                        Explore tools crafted to support you in learning,
                        building, and contributing to the bitcoin ecosystem.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATUREDPRODUCTS.map((product, index) => (
                        <a
                            key={product.name}
                            href={product.link}
                            target={product?.target}
                            className="relative cursor-pointer rounded-[20px] overflow-hidden aspect-[3/4] transition-all duration-500 bg-brand-gray border border-brand-stroke-on-base flex flex-col"
                            onMouseEnter={() => setHoveredProduct(index)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            <div
                                className={`relative h-[70%] w-[calc(100%-1.5rem)] mb-2 mt-3 mx-auto  rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
                                    hoveredProduct === index
                                        ? "md:h-[60%] lg:h-[75%] md:w-[calc(100%-1.5rem)] md:mt-3 md:mx-3 md:mb-2"
                                        : "md:h-full md:w-full md:mt-0 md:mx-0 md:mb-0"
                                }`}
                            >
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                                    <div className="inline-flex items-center gap-2 bg-brand-gray border border-[#A9A49B]/75 rounded-full px-2 py-1">
                                        <div className="w-2 h-2 bg-black rounded-full"></div>
                                        <span className="text-xs lg:text-sm font-normal text-brand-dark font-quicksand">
                                            {product.action} {product.users}{" "}
                                            users
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-[#F6F0E6] font-montserrat">
                                        {product.name}
                                    </h3>
                                </div>
                            </div>

                            <div
                                className={`absolute bottom-6 left-3 right-3 px-4 transition-opacity duration-500 ${
                                    hoveredProduct === index
                                        ? " md:opacity-100"
                                        : "md:opacity-0"
                                }`}
                            >
                                <p className="text-brand-dark text-[1.125rem] font-quicksand leading-none lg:leading-[1.2]">
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

