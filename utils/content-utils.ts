// utils/authorUtils.ts or lib/contentUtils.ts

import { allAuthors } from "contentlayer/generated"
import { Authors } from "contentlayer/generated"
import { coreContent } from "pliny/utils/contentlayer"

export function getAuthorDetails(authorList: string[]) {
    return authorList.map((author) => {
        const authorResults = allAuthors.find((p) => p.slug === author)
        return coreContent(authorResults as Authors)
    })
}

export function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ")
}
