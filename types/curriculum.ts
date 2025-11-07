export interface Curriculum {
    difficulty: Difficulty
    title: string
    description: string
    bannerColor: string
    logo: string
    link: string
    tag: string
    tagList: TagType[]
    byBDP?: boolean
}

export type TagType = "guide" | "seminar" | "tool" | "interactive"

export type Difficulty = "easy" | "medium" | "hard"

export interface ICurriculum {
    allCurriculum: Curriculum[]
}
