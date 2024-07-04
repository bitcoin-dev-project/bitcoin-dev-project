import TOCInline from "pliny/ui/TOCInline"
import BlogNewsletterForm from "pliny/ui/BlogNewsletterForm"
import type { MDXComponents } from "mdx/types"
import CustomLink from "../markdown-ui/Link"
import ExpandableSection from "../markdown-ui/expandable-section"
import Image from "../markdown-ui/Image"

export const components: MDXComponents = {
    Image,
    CustomLink,
    TOCInline,
    BlogNewsletterForm,
    ExpandableSection
}
