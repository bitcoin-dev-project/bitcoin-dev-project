import { GET_USER_REPOS } from "@/graphql/queries/get-user-repos"
import { useQuery } from "@apollo/client"
import { useSession } from "next-auth/react"

type Languages = {
    [key: string]: number
}

type Lang = {
    node: {
        name: string
        __typename: string
    }
    size: number
}

const excludedLanguages = [
    "html",
    "css",
    "dockerfile",
    "wikitext",
    "scss",
    "less",
    "makefile",
    "just"
]

export default function useGetUserLanguages() {
    const { data: session } = useSession()
    const languages: Languages = {}

    const login = session?.user?.login!

    const { data, loading, error } = useQuery(GET_USER_REPOS, {
        variables: { login },
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    })

    if (!loading && data?.user?.repositories?.edges) {
        data.user.repositories.edges.forEach(
            (repo: { node: { languages: { edges: any[] } } }) => {
                repo.node.languages.edges.forEach((lang: Lang) => {
                    if (
                        excludedLanguages.includes(lang.node.name.toLowerCase())
                    ) {
                        return
                    } else {
                        languages[lang.node.name] =
                            (languages[lang.node.name] || 0) + 1
                    }
                })
            }
        )
    }

    const sortedLanguages = Object.fromEntries(
        Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
    )

    return {
        languages: sortedLanguages,
        loading,
        error
    }
}
