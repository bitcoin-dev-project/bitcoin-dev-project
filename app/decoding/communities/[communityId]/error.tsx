"use client"

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="max-w-7xl mx-auto py-8">
            <div className="bg-gray-900/40 dark:bg-gray-800/40 rounded-xl p-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Something went wrong!
                </h2>
                <p className="text-gray-400 mb-6">{error.message}</p>
                <button
                    onClick={reset}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                    Try again
                </button>
            </div>
        </div>
    )
}
