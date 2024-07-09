import { Hero } from "@/components/hero/Hero"
import { PrimaryFeatures } from "@/components/hero/PrimaryFeatures"
import { SecondaryFeatures } from "@/components/hero/SecondaryFeatures"
import {
    CalendarDaysIcon,
    HandRaisedIcon,
    InboxIcon,
    TrashIcon,
    UsersIcon
} from "@heroicons/react/24/outline"

import CTA from "@/components/hero/CTA"
import Mission from "@/components/hero/Mission"
import WhoAreWe from "@/components/hero/WhoAreWe"
import Newsletter from "@/components/hero/newsletter"

export default function Home() {
    return (
        <div>
            <Hero />
            <hr className="my-12 mx-auto max-w-7xl  h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />

            <Mission />
            {/* <PrimaryFeatures /> */}
            <WhoAreWe />
            <SecondaryFeatures />
            <Newsletter />
            <CTA />
        </div>
    )
}
