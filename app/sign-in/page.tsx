import React from "react"
import Client from "./Client"
import { Wrapper } from "@/components/Wrapper"

const page = () => {
    return (
        <Wrapper>
            <div className="flex flex-col mt-32 items-center justify-center p-7 sm:p-2">
                <Client />
            </div>
        </Wrapper>
    )
}

export default page
