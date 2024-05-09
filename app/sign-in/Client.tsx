"use client"

import { signIn } from "next-auth/react"
import React from "react"

export default function Client() {
    const [loading, setLoading] = React.useState(false)

    const handleClick = async () => {
        try {
            setLoading(true)
            const res = await signIn("github", { callbackUrl: "/contribute" })
            console.log(res)
            if (res && !res.error) {
                setLoading(false)
            }
            console.log("signed in", { loading, res })
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className="p-12 md:p-7 sm:p-5 sm:px-2 mx-auto my-0 flex flex-col items-center justify-center gap-6 border-2 rounded-md">
            <h1 className="text-[58px] lg:text-[26px] md:text-center font-bold md:font-semibold leading-tight text-center">
                Contribute to{" "}
                <span className="underline text-orange">Open Source</span>{" "}
                bitcoin projects by working on issues from 50+ repositories.
            </h1>
            <p className="text-2xl md:text-xl text-center">
                Take ownership, refine your expertise...{" "}
                <span className=" italic underline text-nowrap">
                    start with a good first issue
                </span>
            </p>
            <section>
                <button
                    className="border-2 px-5 py-2 rounded-md font-bold h-[48px]"
                    onClick={handleClick}
                >
                    {loading ? <LoadingEllipsis /> : "Start Now"}
                </button>
            </section>
        </div>
    )
}

const LoadingEllipsis = () => {
    return (
        <div className="flex space-x-2 animate-bounce">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <div className="w-2 h-2 bg-black rounded-full"></div>
        </div>
    )
}
