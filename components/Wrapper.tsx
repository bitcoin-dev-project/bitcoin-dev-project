import React from "react"

export const Wrapper = React.memo(function Wrapper({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-grow flex-col min-h-screen max-w-7xl m-auto">
            {children}
        </div>
    )
})
