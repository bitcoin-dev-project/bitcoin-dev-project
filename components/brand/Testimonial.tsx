import Image from "next/image"
import React from "react"

interface ITestimonial {
    color: string
    bgColor: string
    author: string
    title: string
    logo?: string
    quote: string
}
const Testimonial: React.FC<ITestimonial> = ({
    color,
    bgColor,
    author,
    title,
    logo,
    quote
}) => {
    return (
        <div
            className="sticky top-[100px] z-20 mb-44 w-full flex flex-col justify-center md:min-h-[330px] md:max-w-[65%] 2xl:max-w-full mx-auto" 
            style={{
                transform: "translateY(0)",
                color,
                backgroundColor: bgColor,
                borderColor: color
            }}
        >
            <div className="relative rounded-none h-full md:p-[20px] md:pt-[36px]">
                <span
                    className="absolute top-[10px] left-[16px] h-3 w-3 rounded-full"
                    style={{ backgroundColor: color,  borderColor: color }}
                />
                <span
                    className="absolute top-[10px] right-[16px] h-3 w-3 rounded-full"
                    style={{ backgroundColor: color }}
                />

                <div className="rounded-[22px]  px-8 py-8 bg-brand-orange">
                    <div className="flex items-start gap-4">
                        <span className="text-3xl leading-none select-none" style={{color}}>
                            ❝
                        </span>
                        <p className="font-quicksand  text-[20px] md:text-[21px] leading-[1.85] tracking-[0.005em]" style={{color}}>
                            {quote}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-5">
                        {/* Logo on the left */}
                       
                            <div className="w-12 h-12 relative flex-shrink-0">
                              {logo && (   <Image
                                    src={logo}
                                    alt="Spiral"
                                    fill
                                    className="object-contain"
                                />     )}
                            </div>
                    

                        <div className="text-right" style={{color}}>
                            <p className="font-montserrat font-semibold text-[16px]" >
                                {author}
                            </p>
                            <p className="font-quicksand  text-[14px]">
                                {title}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonial
