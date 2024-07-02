import { ClockIcon, XIcon } from "lucide-react"

interface TopicMetadataProps {
  badges: string[]
}

export default function TopicMetadata({ badges }: TopicMetadataProps) {
  return (
    <article className="prose prose-gray max-w-6xl mx-auto">
      <div className="flex items-center space-x-4 bg-white p-4 bg-white shadow rounded-lg p-4 rounded-md dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <ClockIcon className="text-gray-500" />
          <span className="text-sm font-medium">3 min read</span>
        </div>
        <div className="flex items-center space-x-2">
          {badges.map((badge, index) => (
            // <button key={index}><Badge variant="secondary">{badge}</Badge></button>
            <button key={index}><a>{badge}</a></button>
          ))}
        </div>
        <div className="flex items-center space-x-2 ml-auto">
          <button><XIcon className="text-orange-500" /></button>
        </div>
      </div>
    </article>
  )
}

