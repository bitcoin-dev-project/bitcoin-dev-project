import Link from "next/link"
import { HiArrowRight } from "react-icons/hi"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Community Not Found
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    The community you're looking for doesn't exist or has been
                    removed.
                </p>
                <Link
                    href="/decoding/communities"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-200"
                >
                    <HiArrowRight className="w-5 h-5 rotate-180" />
                    Back to Communities
                </Link>
            </div>
        </div>
    )
}
