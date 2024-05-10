import Image from "next/image"
import React from "react"

import { auth } from "@/auth"
import RepositoryIssues from "@/components/repository-issues"
import AuthProvider from "@/context/auth-provider"
import { Project } from "@/types"

import Projects from "../../public/opensource-projects/index.json"
import ShowLang from "./client"

const Contribute = async () => {
    const session = await auth()
    const token = session?.accessToken || ""

    return (
        <AuthProvider token={token}>
            <main className="p-7">
                <div className="w-full">
                    <div className="flex max-w-5xl w-full items-center justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200 py-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static rounded-xl lg:border lg:bg-gray-200 p-4 lg:dark:bg-zinc-800/30">
                        <p className="w-full text-base">
                            Welcome {session?.user.name}!
                        </p>
                        <picture className="flex  h-full items-end justify-end">
                            <Image
                                src={session?.user.image ?? ""}
                                alt="Profile Picture"
                                className="rounded-full border-[1.5px]"
                                width={48}
                                height={48}
                                priority
                            />
                        </picture>
                    </div>
                    {/* <ShowLang /> */}

                    <div className="container mx-auto py-8">
                        <div className="grid gap-4 sm:grid-cols-1 grid-cols-3">
                            {Object.entries(Projects as Project).map(
                                ([key, project]) => (
                                    <RepositoryIssues
                                        key={key}
                                        owner={project.org}
                                        name={project.name}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </AuthProvider>
    )
}

export default Contribute
