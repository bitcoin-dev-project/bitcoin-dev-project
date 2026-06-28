import { TESTIMONIALS } from "@/utils"
import Image from "next/image"
import React from "react"
import Testimonial from "../brand/Testimonial"

const ImpactStories = () => {
    return (
        <section className="relative py-10 h-full w-full ">
            <div className="relative w-full mx-auto">
                <div className="relative w-full h-full aspect-[390/2075] md:aspect-[768/1062]">
                    <Image
                        src="/images/testimonials-background.svg"
                        alt="Stories of Impact background"
                        fill
                        className="object-contain hidden md:block"
                    />
                    <Image
                        src="/images/testimonial-background.webp"
                        alt="Stories of Impact background"
                        fill
                        className="object-contain md:hidden"
                    />

                    <div className="absolute left-1/2 -translate-x-1/2 md:top-[8.5%] top-[2.5%] text-center z-40">
                        <h2 className="font-montserrat text-brand text-4xl font-bold px-4">
                            What the Developer Community is Saying
                        </h2>
                    </div>
                </div>

                <div className="relative -mt-[430%]  md:-mt-[100%]  px-4 lg:px-12">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <Testimonial
                            key={testimonial.title}
                            index={index}
                            {...testimonial}
                        />
                    ))}
                    <div className="h-[100px]"></div>
                </div>
            </div>
        </section>
    )
}

export default ImpactStories
