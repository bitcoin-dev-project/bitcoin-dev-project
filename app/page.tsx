import { NewHero } from "@/components/hero/NewHero"
import { genPageMetadata } from "@/app/seo"

// SEO metadata
export const metadata = genPageMetadata({
    title: "The Bitcoin Dev Project",
    description:
        "Find your way in Bitcoin open source. Explore learning paths, good first issues, tools, and communities to start contributing to Bitcoin development.",
    keywords:
        "bitcoin development, bitcoin open source, bitcoin career, bitcoin contributor, learn bitcoin, bitcoin developer"
})

export default function Home() {
    return (
        <div>
            <NewHero />
        </div>
    )
}
