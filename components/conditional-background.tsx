"use client"

export function ConditionalBackground({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <div className="bg-[#F6F0E6] min-h-screen">
            {children}
        </div>
    )
}
