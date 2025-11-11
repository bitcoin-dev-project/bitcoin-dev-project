import { Wrapper } from "@/components/Wrapper"
import { genPageMetadata } from "../seo"
import { PhotoSlider } from "@/components/about/PhotoSlider"

export const metadata = genPageMetadata({
    title: "About | Bitcoin Dev Project",
    keywords: "bitcoin, open source, good first issues, bitcoin development",
    description:
        "Our goal is to provide newcomers with resources and support for your bitcoin open source development journey.",
    openGraph: {
        images: [
            {
                url: "https://bitcoindevs.xyz/images/pages-thumbnails/about.png",
                alt: "About BDP"
            }
        ],
        title: "About | Bitcoin Dev Project Mission",
        url: "https://bitcoindevs.xyz/about",
        type: "website",
        description:
            "Our goal is to provide newcomers with resources and support for your bitcoin open source development journey."
    },
    twitter: {
        images: ["https://bitcoindevs.xyz/images/pages-thumbnails/about.png"],
        card: "summary_large_image",
        title: "About | Bitcoin Dev Project",
        creator: "@Bitcoin_Devs",
        description:
            "Our goal is to provide newcomers with resources and support for your bitcoin open source development journey."
    }
})

export default function About() {
    return (
        <>
            <Wrapper>
                <div className="flex flex-col mx-auto my-0 text-brand-dark">
                    {/* Hero Section with Content */}
                    <div className="py-16 px-8 max-sm:px-4">
                        {/* Hero Title */}
                        <h1 className="font-montserrat text-[2rem] md:text-[2.5rem] lg:text-[3.5rem] text-center font-bold flex  mb-[92px] lg:mb-[116px] flex-col gap-0">
                           <span className="leading-none">About The Bitcoin</span> <span>Dev Project</span>
                        </h1>

                        {/* Content Sections */}
                        <div className="max-w-4xl mx-auto space-y-16 max-md:space-y-12">
                            {/* WHY Section */}
                            <section className="space-y-6 text-brand-dark">
                                <h2 className="text-3xl max-md:text-2xl font-bold  uppercase tracking-wider font-montserrat">
                                    WHY
                                </h2>
                                <div className="text-lg max-md:text-base leading-relaxed space-y-4 font-quicksand">
                                    <p>
                                        Our goal is to provide newcomers with resources and support for your
                                        bitcoin open source development journey. We are here to convince you to
                                        contribute to{" "}
                                        <a 
                                            className="text-orange hover:underline underline" 
                                            href="/projects"
                                        >
                                            bitcoin open source projects
                                        </a>
                                        . We measure our success by action, not passive consumption of educational
                                        materials.
                                    </p>
                                    <p>
                                        There is an oft-repeated sentiment in the community that bitcoin does not
                                        need you. While bitcoin is designed to be resilient, we{" "}
                                        do need you. Bitcoin needs all the talent and
                                        energy it can gather to solve some of the most difficult technical problems
                                        of our time. Bitcoin in your hands changes everything.
                                    </p>
                                </div>
                            </section>

                            {/* WHO Section */}
                            <section className="space-y-6 text-brand-dark">
                                <h2 className="text-3xl max-md:text-2xl font-bold uppercase tracking-wider font-montserrat">
                                    WHO
                                </h2>
                                <div className="text-lg max-md:text-base leading-relaxed font-quicksand">
                                    <p>
                                        The Bitcoin Dev Project is a{" "}
                                        <a
                                            className="text-orange hover:underline underline"
                                            href="https://chaincode.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Chaincode Labs
                                        </a>{" "}
                                        sponsored initiative geared towards developers at the beginning of their bitcoin
                                        journey. Chaincode has a{" "}
                                        <a
                                            className="text-orange hover:underline underline"
                                            href="https://bluematt.bitcoin.ninja/2016/08/08/chaincode/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            long history
                                        </a>{" "}
                                        of providing technical education through its in-person residencies and{" "}
                                        <a
                                            className="text-orange hover:underline underline"
                                            href="https://learning.chaincode.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            online programs
                                        </a>
                                        .
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>

                    <PhotoSlider />
                </div>
            </Wrapper>
        </>
    )
}
