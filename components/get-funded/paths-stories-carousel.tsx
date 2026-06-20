"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import Quotes from "@/components/assets/Quotes"
import CornerDots from "@/components/assets/CornerDots"
import {
    PATH_STORIES,
    PATH_STORIES_BASE,
    type PathStory
} from "@/data/path-and-stories"

const Avatar = ({ person }: { person: PathStory }) => {
    if (person.avatar) {
        return (
            <Image
                src={person.avatar}
                alt={person.name}
                width={80}
                height={80}
                className="h-16 w-16 shrink-0 rounded-full object-cover lg:h-20 lg:w-20"
            />
        )
    }
    const initials = person.name
        .replace(/[^a-zA-Z]/g, "")
        .slice(0, 2)
        .toUpperCase()
    return (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-brand-stroke-on-base bg-brand-gray-100 font-montserrat text-xl font-bold text-brand-dark/70 lg:h-20 lg:w-20">
            {initials}
        </div>
    )
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <p className="flex gap-2 font-quicksand text-base leading-snug lg:text-lg">
        <span className="w-52 shrink-0 font-bold uppercase text-brand-dark/70">
            {label}
        </span>{" "}
        <span className="text-brand-dark/70">{value}</span>
    </p>
)

const StoryCard = ({ person }: { person: PathStory }) => {
    const { card } = person
    const role = card.role ?? person.role

    return (
        <div className="h-full rounded-2xl border border-brand-gray-100 bg-brand-card p-2.5">
            <div className="relative flex h-full flex-col gap-6 rounded-xl p-5 lg:p-7">
                <CornerDots />
                <div className="flex items-center gap-4">
                    <Avatar person={person} />
                    <div className="flex flex-col gap-1">
                        <span className="font-montserrat text-xl font-bold uppercase text-brand-orange-100 lg:text-2xl">
                            {person.name}
                        </span>
                        <span className="font-quicksand text-sm uppercase tracking-wide text-brand-dark/60 lg:text-base">
                            {role}
                        </span>
                    </div>
                </div>

                <div className="flex items-start gap-2 font-quicksand text-lg italic text-brand-dark/60 lg:text-xl">
                    <Quotes className="mt-1.5 shrink-0" width={18} />
                    <p>{card.quote}</p>
                </div>

                <hr className="border-grand-gray-100" />

                <div className="flex flex-col gap-3">
                    <InfoRow label="Focus" value={card.focus} />
                    <InfoRow label="Funding Org" value={card.fundingOrg} />
                    <InfoRow label="Funding Story" value={card.fundingStory} />
                </div>

                <Link
                    href={`${PATH_STORIES_BASE}/${person.slug}`}
                    className="mt-auto inline-flex w-max items-center gap-2 self-end rounded-full border border-brand-gray-200 bg-brand px-4 py-2 font-quicksand text-sm font-medium text-brand-dark transition-colors hover:border-brand-orange-100 hover:text-brand-orange-100"
                >
                    <Maximize2 className="h-4 w-4" />
                    Read Full Interview
                </Link>
            </div>
        </div>
    )
}

const PathsStoriesCarousel = () => {
    const trackRef = useRef<HTMLDivElement>(null)

    const scrollByCard = (direction: 1 | -1) => {
        const track = trackRef.current
        if (!track) return
        const card = track.querySelector<HTMLElement>("[data-story-card]")
        const amount = card ? card.offsetWidth + 24 : track.clientWidth
        track.scrollBy({ left: amount * direction, behavior: "smooth" })
    }

    return (
        <div className="flex flex-col gap-4">
            {/* One card shown at a time; the next peeks to signal more. */}
            <div className="relative">
                <div
                    ref={trackRef}
                    className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {PATH_STORIES.map((person) => (
                        <div
                            key={person.slug}
                            data-story-card
                            className="w-[88%] shrink-0 snap-start sm:w-[90%]"
                        >
                            <StoryCard person={person} />
                        </div>
                    ))}
                <div className="w-12 shrink-0" />
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#f7f0e6]" />
            </div>

            <div className="flex items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={() => scrollByCard(-1)}
                    aria-label="Previous story"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gray-200 bg-brand text-brand-dark transition-colors hover:border-brand-orange-100 hover:text-brand-orange-100"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                    type="button"
                    onClick={() => scrollByCard(1)}
                    aria-label="Next story"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gray-200 bg-brand text-brand-dark transition-colors hover:border-brand-orange-100 hover:text-brand-orange-100"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}

export default PathsStoriesCarousel
