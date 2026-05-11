import { genPageMetadata } from "@/app/seo"

export const metadata = genPageMetadata({
    title: "Bitcoin Open Source Projects",
    description:
        "Discover vetted Bitcoin open source projects and find your first contribution — from Bitcoin Core and Lightning to BDK, LDK, and more.",
    keywords:
        "bitcoin open source, bitcoin projects, bitcoin core, lightning network, bitcoin contribution, bitcoin development, LDK, LND, BDK",
    image: "https://bitcoindevs.xyz/images/pages-thumbnails/projects.png",
    alt: "Bitcoin projects"
})

export default function ProjectsLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
