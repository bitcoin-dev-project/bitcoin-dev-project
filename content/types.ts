export type Page = {
    title: string
    description: string
    levels: ReadonlyArray<{
        title: string
        description: string | JSX.Element
        items: ReadonlyArray<{
            image: string
            imageFit?: "contain" | "cover" | "fill"
            title: string
            subTitle: string
            description: string
            link: string
            repo?: string
            github?: string
        }>
    }>
}
