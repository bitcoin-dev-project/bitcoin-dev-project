import { Metadata } from "next"
import siteMetadata from "@/data/siteMetadata"

interface PageSEOProps {
    title: string
    description?: string
    image?: string
    openGraph?: Metadata["openGraph"]
    twitter?: Metadata["twitter"]
    [key: string]: unknown
}

export function genPageMetadata({
    title,
    description,
    image,
    openGraph: ogOverride,
    twitter: twitterOverride,
    ...rest
}: PageSEOProps): Metadata {
    return {
        title,
        description: description || siteMetadata.description,
        openGraph: {
            title: `${title} | ${siteMetadata.title}`,
            description: description || siteMetadata.description,
            url: "./",
            siteName: siteMetadata.title,
            images: image ? [image] : [siteMetadata.socialBanner],
            locale: "en_US",
            type: "website",
            ...ogOverride
        },
        twitter: {
            title: `${title} | ${siteMetadata.title}`,
            description: description || siteMetadata.description,
            card: "summary_large_image",
            images: image ? [image] : [siteMetadata.socialBanner],
            site: siteMetadata.twitterHandle,
            creator: siteMetadata.twitterHandle,
            ...twitterOverride
        },
        ...rest
    }
}
