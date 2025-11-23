import { TESTIMONIALS } from "@/utils"
import Image from "next/image"
import React from "react"
import Testimonial from "../brand/Testimonial"

const ImpactStories = () => {
    return (
        <section className="relative py-10 h-full w-full ">
            <div className="relative w-full mx-auto">
                <div className="relative w-full h-full aspect-[768/1062]">
                    <Image
                        src="/images/testimonials-background.svg"
                        alt="Stories of Impact background"
                        fill
                        className="object-contain"
                    />

                    <div className="absolute left-1/2 -translate-x-1/2 top-[8.5%] text-center z-40">
                        <h2 className="font-montserrat text-brand text-2xl font-extrabold leading-[1.2]">
                            WORD ON THE STREET
                        </h2>
                    </div>
                </div>

                <div className="relative -mt-[100%] lg:max-w-[1500px] mx-auto px-4 lg:px-12">
                    {TESTIMONIALS.map((testimonial) => (
                        <Testimonial key={testimonial.title} {...testimonial} />
                    ))}
                    <div className="h-[100px]"></div>
                </div>
            </div>
        </section>
    )
}

export default ImpactStories
