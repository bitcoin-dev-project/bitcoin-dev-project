import { genPageMetadata } from "@/app/seo"

export const metadata = genPageMetadata({
    title: "Bitcoin Communities",
    description:
        "Join structured Bitcoin development communities and cohorts. Learn alongside peers, get mentorship, and deepen your understanding of the Bitcoin protocol.",
    keywords:
        "bitcoin community, bitcoin cohort, bitcoin study group, bitcoin developers, bitcoin learning community, bitcoin open source",
    image: "https://bitcoindevs.xyz/images/pages-thumbnails/decoding-communities.webp",
    alt: "Bitcoin Communities"
})

export default function CommunitiesLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
