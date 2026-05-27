import { genPageMetadata } from "@/app/seo"

export const metadata = genPageMetadata({
    title: "Bitcoin Explainers",
    description:
        "Visual guides and interactive explanations to help you understand Bitcoin concepts through carefully crafted slides and diagrams.",
    keywords:
        "bitcoin explainers, bitcoin concepts, bitcoin diagrams, bitcoin guides, bitcoin learning, bitcoin technology, bitcoin development",
    image: "https://bitcoindevs.xyz/images/pages-thumbnails/explainers.webp",
    alt: "Bitcoin Explainers"
})

export default function ExplainersLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
