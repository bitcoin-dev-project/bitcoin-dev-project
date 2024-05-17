import React from "react"

import { auth } from "@/auth"
import RepositoryIssues from "@/components/repository-issues"
import AuthProvider from "@/context/auth-provider"

const Contribute = async () => {
    const session = await auth()
    const token = session?.accessToken || ""

    return (
        <AuthProvider token={token}>
            <main className="container mx-auto">
                <RepositoryIssues />
            </main>
        </AuthProvider>
    )
}

export default Contribute
