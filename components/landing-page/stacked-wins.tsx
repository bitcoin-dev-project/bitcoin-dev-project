import Image from "next/image"
import React from "react"

const StackedWins = () => {
    return (
        <div className="pt-12 lg:pt-24">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="text-center lg:text-left space-y-3">
                        <h2 className="text-2xl uppercase font-bold text-brand-dark leading-tight font-montserrat">
                            STACKED WINS
                        </h2>
                        <p className="text-xl text-brand-dark leading-[1.75rem] font-quicksand">
                            What started with a few open-source tools is now a
                            growing movement. With every contributor, every
                            event, and every resource shared, we're building
                            real momentum.
                        </p>
                    </div>

                    <div className="relative flex items-center justify-center">
                     
                        <div className="relative w-full max-w-2xl aspect-[768/881] z-20">
                            <Image
                                src="/images/stacked-wins.webp"
                                alt="Stacked Wins - Growing Bitcoin Community"
                                fill
                                className="object-contain"
                                priority={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StackedWins
