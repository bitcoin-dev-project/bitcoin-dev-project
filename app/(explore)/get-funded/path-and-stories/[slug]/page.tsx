import Image from "next/image"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { genPageMetadata } from "@/app/seo"
import GetFundedSidebar from "@/components/get-funded/get-funded-sidebar"
import ScrollToTop from "@/components/get-funded/scroll-to-top"
import {
    PATH_STORIES,
    getPathStory,
    type PathStory
} from "@/data/path-and-stories"

export const dynamicParams = false

export function generateStaticParams() {
    return PATH_STORIES.map((person) => ({ slug: person.slug }))
}

export function generateMetadata({
    params
}: {
    params: { slug: string }
}): Metadata {
    const person = getPathStory(params.slug)
    if (!person) return {}

    return genPageMetadata({
        title: `${person.name} — Paths and Stories`,
        description: `${person.name}, ${person.role}. How they got into and funded for bitcoin open-source development.`
    })
}

const Avatar = ({ person }: { person: PathStory }) => {
    if (person.avatar) {
        return (
            <Image
                src={person.avatar}
                alt={person.name}
                width={96}
                height={96}
                className="h-20 w-20 shrink-0 rounded-full object-cover lg:h-24 lg:w-24"
            />
        )
    }

    const initials = person.name
        .replace(/[^a-zA-Z]/g, "")
        .slice(0, 2)
        .toUpperCase()

    return (
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-brand-stroke-on-base bg-brand-gray-100 font-montserrat text-2xl font-bold text-brand-dark/70 lg:h-24 lg:w-24">
            {initials}
        </div>
    )
}

export default function PathStoryPage({
    params
}: {
    params: { slug: string }
}) {
    const person = getPathStory(params.slug)
    if (!person) notFound()

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col text-brand-dark">
            <ScrollToTop />
            <GetFundedSidebar />

            <article className="flex flex-col gap-y-10">
                <header className="flex items-center gap-5">
                    <Avatar person={person} />
                    <div className="flex flex-col gap-2">
                        <h1 className="font-montserrat text-[2rem] font-bold leading-none lg:text-[3rem]">
                            {person.name}
                        </h1>
                        <p className="font-quicksand text-lg text-brand-dark/80 lg:text-xl">
                            {person.role}
                        </p>
                    </div>
                </header>

                {!person.available ? (
                    <div className="rounded-xl border border-dashed border-brand-gray-200 bg-brand-gray/40 p-6 font-quicksand text-lg text-brand-dark/70">
                        This story is coming soon.
                    </div>
                ) : (
                    person.qa.map((qa, index) => (
                        <section key={index} className="flex flex-col gap-3">
                            <h2 className="font-montserrat text-xl font-semibold leading-normal text-brand-dark/85 lg:text-2xl">
                                {qa.question}
                            </h2>
                            <div className="flex flex-col gap-4 font-quicksand text-lg leading-[1.5] lg:text-xl">
                                {qa.answer}
                            </div>
                        </section>
                    ))
                )}
            </article>
        </div>
    )
}
