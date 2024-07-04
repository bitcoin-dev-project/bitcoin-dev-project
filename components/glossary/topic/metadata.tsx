import Link from "next/link"
import { Badge } from "../ui/badge"
import { ClockIcon, TwitterIcon } from "lucide-react"

export default function Metadata({ badges }: { badges: string[] }) {
    return (
        <article className="prose prose-gray max-w-6xl mx-auto">
            <div className="flex items-center space-x-4 p-4 shadow rounded-lg p-4 rounded-md dark:border-gray-800">
                <div className="flex items-center space-x-2">
                    <ClockIcon className="text-gray-500" />
                    <span className="text-sm font-medium">3 min read</span>
                </div>
                <div className="flex items-center space-x-2">
                    {badges.map((badge, index) => (
                        <Link href={`/tags/${badge}`} key={index} passHref>
                            <button>
                                <Badge variant="secondary">{badge}</Badge>
                            </button>
                        </Link>
                        // <button key={index}><Badge variant="secondary">{badge}</Badge></button>
                    ))}
                </div>

                <div className="flex items-center space-x-2 ml-auto">
                    <button>
                        <TwitterIcon className="text-orange-500" />
                    </button>
                </div>
            </div>
        </article>
    )
}
