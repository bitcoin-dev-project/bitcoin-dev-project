import { genPageMetadata } from "@/app/seo"

export const metadata = genPageMetadata({
    title: "Contribute to Bitcoin Open Source",
    description:
        "Find ways to make your first contributions to Bitcoin open source software. Discover issues, projects, and guides to get started.",
    keywords:
        "bitcoin contribution, bitcoin open source, contribute to bitcoin, ₿OSS, FOSS",
    image: "https://bitcoindevs.xyz/images/pages-thumbnails/contribute.webp",
    alt: "Contribute to ₿OSS"
})

export default function ContributeLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
