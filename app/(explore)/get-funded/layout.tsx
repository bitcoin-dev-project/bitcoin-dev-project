import { genPageMetadata } from "@/app/seo"

export const metadata = genPageMetadata({
    title: "Get Funded for Bitcoin Development",
    description:
        "Learn how grants support full-time bitcoin development. Find support to work on Bitcoin full-time.",
    keywords:
        "bitcoin grants, bitcoin funding, bitcoin developer funding, bitcoin open source funding",
    image: "https://bitcoindevs.xyz/images/pages-thumbnails/get-funded.webp",
    alt: "Get Funded"
})

export default function GetFundedLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
