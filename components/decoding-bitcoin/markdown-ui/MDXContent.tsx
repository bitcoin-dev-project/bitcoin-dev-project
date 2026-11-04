"use client"

import { MDXLayoutRenderer } from "pliny/mdx-components"
import { components } from "./MDXComponents"

interface MDXContentProps {
    code: string
    usedComponents: string[]
    toc: string
}

export default function MDXContent({
    code,
    usedComponents,
    toc
}: MDXContentProps) {
    const pageComponents = Object.fromEntries(
        Object.entries(components).filter(([key]) =>
            usedComponents.includes(key)
        )
    )

    return (
        <MDXLayoutRenderer code={code} components={pageComponents} toc={toc} />
    )
}
