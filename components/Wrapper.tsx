import React from "react"

export function Wrapper({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex flex-grow flex-col min-h-screen max-w-7xl m-auto">
            {children}
        </main>
    )
}
