"use client"

import React from "react"

import useGetUserLanguages from "@/hooks/useGetUserLanguages"

const ShowLang = () => {
    const { languages, loading, error } = useGetUserLanguages()
    console.log({ languages, loading, error })
    return (
        <div className="flex max-w-5xl xl:w-3/4 w-full items-center justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200 py-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static rounded-xl lg:border lg:bg-gray-200 p-4 lg:dark:bg-zinc-800/30">
            <div>
                <h3>Programming Languages</h3>
                <ul>
                    {Object.entries(languages).map(([name, size]) => (
                        <li key={name}>
                            {name}: {size}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ShowLang
