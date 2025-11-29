import { number } from "bitcoinjs-lib/src/script"
import clsx from "clsx"
import Image from "next/image"
import React, { use } from "react"

interface ITestimonial {
    color: string
    bgColor: string
    author: string
    title: string
    logo?: string
    quote: string
    index:number
}
const Testimonial: React.FC<ITestimonial> = ({
    color,
    bgColor,
    author,
    title,
    logo,
    quote,
    index,
}) => {
    return (
        <div
            className={clsx("sticky z-20 border mb-20 w-full flex flex-col md:min-h-[218px] max-md:!max-w-[85%] !md:max-w-[unset] 2xl:max-w-full mx-auto")}
            style={{
                transform: "translateY(0)",
                color,
                top: `${100 + index * 40}px`,
                backgroundColor: bgColor,
                borderColor: color,
                maxWidth:`${65 + (index * 5)}%`,
                minHeight: `${218 + (index * 2)}px`
            }}
        >
            <div className="relative rounded-none h-full px-2.5 pt-[30px] pb-2.5 ">
                <span
                    className="absolute top-[10px] left-[10px] h-3 w-3 rounded-full"
                    style={{ backgroundColor: color,  borderColor: color }}
                />
                <span
                    className="absolute top-[10px] right-[10px] h-3 w-3 rounded-full"
                    style={{ backgroundColor: color }}
                />

                <div className="rounded-xl  px-5 py-5 bg-brand-orange h-full">
                    <div className="flex items-start gap-4">
                        <span className="text-3xl leading-none select-none" style={{color}}>
                            ❝
                        </span>
                        <p className="font-quicksand text-xl md:text-2xl leading-[1] tracking-[0%]" style={{color}}>
                            {quote}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-5">
                       
                            <div className="w-8 h-8 relative flex-shrink-0">
                              {logo && (   <Image
                                    src={logo}
                                    alt="Spiral"
                                    fill
                                    className="object-contain"
                                />     )}
                            </div>
                    

                        <div className="text-right font-quicksand" style={{color}}>
                            <p className=" font-bold text-base" >
                                {author}
                            </p>
                            <p className="font-quicksand  text-base">
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
