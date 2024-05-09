import React from "react"
import AuthProvider from "@/context/auth-provider"
import { auth } from "@/auth"
import Image from "next/image"
import ShowLang from "./client"

const Contribute = async () => {
    const session = await auth()
    const token = session?.accessToken || ""

    return (
        <AuthProvider token={token}>
            <main className="p-14 sm:p-7 mx-auto my-0">
                logged in user: {session?.user.login}
            </main>
            <div className="w-full">
                <div className="flex max-w-5xl xl:w-3/4 w-full items-center justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200 py-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static rounded-xl lg:border lg:bg-gray-200 p-4 lg:dark:bg-zinc-800/30">
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
                <ShowLang />
            </div>
        </AuthProvider>
    )
}

export default Contribute
