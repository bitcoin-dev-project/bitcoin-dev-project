import Link from "next/link"
import Image from "next/image"
import { ArrowRightIcon } from "lucide-react"
import { CoreContent } from "pliny/utils/contentlayer"
import { Blog, allBlogs } from "@/.contentlayer/generated"
import { Card } from "../ui/card"

interface RelatedTopicsProps {
  post: CoreContent<Blog>
}

export default function RelatedTopics({ post }: RelatedTopicsProps) {
  const relatedTopicsList = post?.relatedtopics
  const relatedTopics = relatedTopicsList?.map((topic) => {
    const topicResults = allBlogs.find(top => top.slug === topic)
    return topicResults
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Related topics</h2>
      <div className="grid grid-cols-4 gap-4">
        {relatedTopics?.map((topic) => {
          return (
            <>
              <Card className="border p-4 grid grid-rows-[auto,1fr,auto]" key={topic?.slug}>
                <div className="flex justify-center items-center mb-4">
                  {topic?.thumbnail && <Image
                    src={topic?.thumbnail}
                    alt="Thumbnail 1"
                    layout="responsive"
                    width={200}
                    height={150}
                    className="object-cover w-full"
                  />}

                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">{topic?.title} </h3>
                </div>
                <Link className="text-indigo-600 hover:text-indigo-700 inline-flex items-center" href={topic?.slug || ""}>
                  Learn More
                  <ArrowRightIcon className="ml-1 w-4 h-4" />
                </Link>
              </Card>
            </>
          )
        })}


      </div>
      <div className="flex justify-between items-center mt-8">

      </div>
    </div>
  )
}