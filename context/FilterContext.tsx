"use client"
import { Curriculum, TagType, Difficulty } from "@/types/curriculum"
import { fetchJsonData } from "@/utils/fetchJson"
import {
    createContext,
    useState,
    useMemo,
    useEffect,
    useCallback,
    useContext,
    ChangeEvent,
    ReactNode,
    Dispatch,
    SetStateAction
} from "react"

interface CurriculumContextProps {
    curriculum: Curriculum[]
    filteredCurriculum: Curriculum[]
    search: string
    setSearch: Dispatch<SetStateAction<string>>
    difficulty: Difficulty | ""
    setDifficulty: (value: Difficulty | "") => void
    selectedTags: TagType[]
    setSelectedTags: Dispatch<SetStateAction<TagType[]>>
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    clearFilters: () => void
}

const CurriculumContext = createContext<CurriculumContextProps | undefined>(
    undefined
)

interface CurriculumProviderProps {
    children: ReactNode
    path?: string
}

export const CurriculumProvider = ({
    children,
    path
}: CurriculumProviderProps) => {
    const [search, setSearch] = useState("")
    const [difficulty, setDifficulty] = useState<Difficulty | "">("")
    const [selectedTags, setSelectedTags] = useState<TagType[]>([])
    const [curriculum, setCurriculum] = useState<Curriculum[]>([])

    const filteredCurriculum = useMemo(() => {
        const lowerSearch = search.toLowerCase()
        return curriculum.filter((item) => {
            const matchesSearch =
                item.title.toLowerCase().includes(lowerSearch) ||
                item.description.toLowerCase().includes(lowerSearch)

            const matchesDifficulty = difficulty
                ? item.difficulty === difficulty
                : true

            const matchesTags =
                selectedTags.length === 0
                    ? true
                    : item.tagList.some((tag) => selectedTags.includes(tag))

            return matchesSearch && matchesDifficulty && matchesTags
        })
    }, [search, difficulty, selectedTags, curriculum])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const clearFilters = useCallback(() => {
        setSearch("")
        setDifficulty("")
        setSelectedTags([])
    }, [])

    useEffect(() => {
        fetchJsonData<{ items: Curriculum[] }>(path || "/learn/index.json")
            .then((data) => setCurriculum(data.items))
            .catch(console.error)
    }, [path])

    const value: CurriculumContextProps = {
        curriculum,
        filteredCurriculum,
        search,
        difficulty,
        setSearch,
        setDifficulty,
        selectedTags,
        setSelectedTags,
        handleInputChange,
        clearFilters
    }

    return (
        <CurriculumContext.Provider value={value}>
            {children}
        </CurriculumContext.Provider>
    )
}

export const useCurriculum = () => {
    const context = useContext(CurriculumContext)
    if (!context) {
        throw new Error(
            "useCurriculum must be used within a CurriculumProvider"
        )
    }
    return context
}
