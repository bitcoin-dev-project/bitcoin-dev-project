import Image from "next/image"

export function NewMission() {
    return (
        <section className="bg-[#F5E6D3] py-24">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side - Mission Text */}
                    <div className="space-y-6">
                        <h2 className="text-5xl font-bold text-gray-900 leading-tight font-montserrat">
                            OUR MISSION
                        </h2>
                        <p className="text-2xl text-gray-800 leading-relaxed font-quicksand">
                            We make tools and resources so that anyone, anywhere
                            has the opportunity to learn and contribute to
                            Bitcoin tech.
                        </p>
                    </div>

                    {/* Right Side - Cart Illustration */}
                    <div className="relative flex items-center justify-center">
                        <div className="relative w-full max-w-lg aspect-square">
                            {/* Placeholder for the cart/wagon image */}
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-64 h-64 mx-auto bg-gradient-to-br from-amber-600 to-yellow-700 rounded-lg opacity-20"></div>
                                    <p className="absolute inset-0 flex items-center justify-center text-gray-600 text-xl font-semibold">
                                        [Cart/Wagon Image]
                                        <br />
                                        <span className="text-sm block mt-2">
                                            Placeholder - provide actual image
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
