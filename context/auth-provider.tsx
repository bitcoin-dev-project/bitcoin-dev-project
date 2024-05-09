"use client"

import { ApolloWrapper } from "@/lib/apollo-wrapper"
import { SessionProvider } from "next-auth/react"

export default function AuthProvider({
    children,
    token
}: {
    children: React.ReactNode
    token: string
}) {
    return (
        <SessionProvider>
            <ApolloWrapper token={token}>{children}</ApolloWrapper>
        </SessionProvider>
    )
}
