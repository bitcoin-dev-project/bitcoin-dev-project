import { Metadata } from "next"
import siteMetadata from "@/data/siteMetadata"

interface PageSEOProps {
    title: string
    description?: string
    image?: string
    alt?: string
    openGraph?: Metadata["openGraph"]
    twitter?: Metadata["twitter"]
    [key: string]: unknown
}

const SOCIAL_IMAGE_WIDTH = 1200
const SOCIAL_IMAGE_HEIGHT = 630

function getSocialImage(image: string, alt?: string) {
    return {
        url: image,
        width: SOCIAL_IMAGE_WIDTH,
        height: SOCIAL_IMAGE_HEIGHT,
        alt
    }
}

export function genPageMetadata({
    title,
    description,
    image,
    alt,
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
            images: [
                getSocialImage(
                    image || siteMetadata.socialBanner,
                    alt || siteMetadata.title
                )
            ],
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
