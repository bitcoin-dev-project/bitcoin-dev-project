"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import clsx from "clsx"
import { ChevronLeft, ChevronRight, Maximize2, Quote } from "lucide-react"
import {
    PATH_STORIES,
    PATH_STORIES_BASE,
    type PathStory
} from "@/data/path-and-stories"

/**
 * Per-person accent themes. Class strings are written out in full so Tailwind's
 * JIT scanner picks up the arbitrary colour values.
 */
const ACCENT = {
    blue: {
        name: "text-[#4F6AD8]",
        chip: "bg-[#4F6AD8]/15",
        icon: "text-[#4F6AD8]"
    },
    orange: {
        name: "text-[#EB5234]",
        chip: "bg-[#EB5234]/15",
        icon: "text-[#EB5234]"
    },
    pink: {
        name: "text-[#D6409F]",
        chip: "bg-[#D6409F]/15",
        icon: "text-[#D6409F]"
    }
} as const

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

const Chip = ({
    children,
    className
}: {
    children: React.ReactNode
    className: string
}) => (
    <span
        className={clsx(
            "rounded-md px-1.5 py-0.5 font-semibold text-brand-dark",
            className
        )}
    >
        {children}
    </span>
)

const StoryCard = ({ person }: { person: PathStory }) => {
    const { card } = person
    const accent = ACCENT[card.accent]
    const role = card.role ?? person.role

    return (
        <div className="h-full rounded-2xl border border-brand-gray-100 bg-brand-gray p-2.5">
            <div className="flex h-full flex-col gap-5 rounded-xl border border-dashed border-brand-gray-200 p-5 lg:p-7">
                <div className="flex items-center gap-4">
                    <Avatar person={person} />
                    <div className="flex flex-col gap-1">
                        <span
                            className={clsx(
                                "font-montserrat text-xl font-bold uppercase lg:text-2xl",
                                accent.name
                            )}
                        >
                            {person.name}
                        </span>
                        <span className="font-quicksand text-sm uppercase tracking-wide text-brand-dark/60 lg:text-base">
                            {role}
                        </span>
                    </div>
                </div>

                <div className="flex items-start gap-2 font-quicksand text-lg italic text-brand-dark/60 lg:text-xl">
                    <Quote
                        className={clsx(
                            "mt-1.5 h-4 w-4 shrink-0 fill-current",
                            accent.icon
                        )}
                    />
                    <p>{card.quote}</p>
                </div>

                <div className="flex flex-col gap-2.5 font-quicksand text-base lg:text-lg">
                    <p>
                        <Chip className={accent.chip}>FOCUS:</Chip>{" "}
                        <span className="text-brand-dark/80">{card.focus}</span>
                    </p>
                    {card.fundingOrg && (
                        <p>
                            <Chip className={accent.chip}>FUNDING ORG:</Chip>{" "}
                            <span className="text-brand-dark/80">
                                {card.fundingOrg}
                            </span>
                        </p>
                    )}
                    <p className="text-brand-dark/80">
                        {card.summary.highlight && (
                            <>
                                <Chip className={accent.chip}>
                                    {card.summary.highlight}
                                </Chip>{" "}
                            </>
                        )}
                        {card.summary.text}
                    </p>
                </div>

                {card.atAGlance && (
                    <div className="flex flex-col gap-2">
                        <h4 className="font-montserrat text-sm font-bold uppercase tracking-wide text-brand-dark/70">
                            At a glance
                        </h4>
                        <ul className="flex flex-col gap-1.5 font-quicksand text-base lg:text-lg">
                            {card.atAGlance.map((item) => (
                                <li key={item} className="flex gap-2">
                                    <span
                                        className={clsx(
                                            "shrink-0",
                                            accent.icon
                                        )}
                                    >
                                        →
                                    </span>
                                    <span className="text-brand-dark/80">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <Link
                    href={`${PATH_STORIES_BASE}/${person.slug}`}
                    className="mt-auto inline-flex w-max items-center gap-2 self-end rounded-full border border-brand-gray-200 bg-brand px-4 py-2 font-quicksand text-sm font-medium text-brand-dark transition-colors hover:border-brand-orange-100 hover:text-brand-orange-100"
                >
                    <Maximize2 className="h-4 w-4" />
                    View Full Interview
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
            {/* One card is shown at a time; the next card peeks on the right so
                the reader knows the list is scrollable. */}
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
