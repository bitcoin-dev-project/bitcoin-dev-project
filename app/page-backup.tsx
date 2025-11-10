import { Hero } from "@/components/hero/Hero"
import { SecondaryFeatures } from "@/components/hero/SecondaryFeatures"

import CTA from "@/components/hero/CTA"
import Mission from "@/components/hero/Mission"
import WhoAreWe from "@/components/hero/WhoAreWe"
import Newsletter from "@/components/hero/newsletter"

export default function Home() {
    return (
        <div>
            <Hero />
            <hr className="my-12 max-sm:my-7 mx-auto max-w-7xl h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
            <Mission />
            {/* <PrimaryFeatures /> */}{" "}
            {/* Temporarily commented out; will reintroduce once 'Bitcoin Topics' is released */}
            <SecondaryFeatures />
            <WhoAreWe />
            <Newsletter />
            <CTA />
        </div>
    )
}
