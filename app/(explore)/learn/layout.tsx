import { genPageMetadata } from "@/app/seo"

export const metadata = genPageMetadata({
    title: "Learn Bitcoin Development",
    description:
        "A curated library of guides, tools, and workshops for every skill level.",
    keywords:
        "bitcoin learning, bitcoin guides, bitcoin workshops, bitcoin development, bitcoin tutorials, learn bitcoin",
    image: "https://bitcoindevs.xyz/images/pages-thumbnails/learn.png",
    alt: "Bitcoin learning"
})

export default function LearnLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
