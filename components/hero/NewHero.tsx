"use client"

import Image from "next/image"
import { useState } from "react"
import HeroPage from "../landing-page/hero-page"
import { FAQS } from "@/utils"
import OurMission from "../landing-page/our-mission"
import FeaturedProduct from "../landing-page/feature-products"
import StackedWins from "../landing-page/stacked-wins"
import ImpactStories from "../landing-page/impact-stories"
import Newsletter from "../landing-page/newsletter"
import FaqSection from "../landing-page/faq-section"
import MobileMenu from "../brand/MobileMenu"

export function NewHero() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

    return (
        <>
            <MobileMenu
                isOpen={isMobileNavOpen}
                setIsOpen={setIsMobileNavOpen}
            />
            <HeroPage setIsOpen={setIsMobileNavOpen} />
            <OurMission />
            <FeaturedProduct />
            <StackedWins />
            <ImpactStories />
            <Newsletter />
            <FaqSection />
        </>
    )
}
