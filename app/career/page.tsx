import { Wrapper } from "@/components/Wrapper"
import { genPageMetadata } from "../seo"

type Props = {
    content: string | React.ReactNode
    title: string
}

const Item = ({ content, title }: Props) => (
    <div className="gap-2">
        <h2 className="text-2xl max-md:text-xl font-medium leading-normal">
            {title}
        </h2>
        <section className="text-lg max-md:text-md">{content}</section>
    </div>
)

export const metadata = genPageMetadata({
    title: "Start Your Career in Bitcoin Open Source Development - Grants",
    keywords:
        "bitcoin, bitcoin grant, open source, career, good first issues, bitcoin development, bitcoin topics",
    description:
        "Start Your Career in Bitcoin Open Source Development and apply to earn a grant for full-time bitcoin open source work",
    openGraph: {
        images: [
            {
                url: "https://bitcoindevs.xyz/images/pages-thumbnails/career.png",
                alt: "Bitcoin career"
            }
        ],
        title: "Start Your Career in Bitcoin Open Source Development - Grants",
        url: "https://bitcoindevs.xyz/career",
        type: "website",
        description:
            "Start Your Career in Bitcoin Open Source Development and apply to earn a grant for full-time bitcoin open source work"
    },
    twitter: {
        images: ["https://bitcoindevs.xyz/images/pages-thumbnails/career.png"],
        card: "summary_large_image",
        title: "Start Your Career in Bitcoin Open Source Development",
        creator: "@Bitcoin_Devs",
        description:
            "Start Your Career in Bitcoin Open Source Development and apply to earn a grant for full-time bitcoin open source work"
    }
})

export default function Career() {
    return (
        <Wrapper>
            <div className="flex flex-col p-14 max-sm:p-7 mx-auto my-0">
                <div className="flex flex-col mb-24 gap-y-10 w-2/3 max-md:w-full self-center">
                    <h1 className="text-[58px] max-lg:text-[32px] max-md:text-center font-bold leading-tight">
                        Start Your Career in Bitcoin Open Source Development
                    </h1>
                    <Item
                        content={
                            <>
                                <p className="my-4">
                                    If you aspire to have professional freedom,
                                    work on something that will impact the lives
                                    of countless people across the world, write
                                    code that will span generations, and
                                    collaborate with some of the most gifted
                                    developers on the planet to solve some of
                                    the hardest technical problems of our age,
                                    then you are in the right place.
                                </p>
                            </>
                        }
                        title="Why consider a career in bitcoin open source development?"
                    />
                    <Item
                        content={
                            <>
                                <p className="my-4">
                                    Financial support for bitcoin open source
                                    work typically comes in the form of a grant.
                                    Grants usually last for one year and many
                                    are renewed.
                                </p>
                                <p className="my-4">
                                    Bitcoin funding is different from other open
                                    source and other cryptocurrency projects.
                                    Getting a grant in bitcoin is pretty
                                    straightforward. You either need someone to
                                    vouch for you or you need to do work -
                                    ideally both. While grant programs often
                                    have open applications, the secret to
                                    getting funding is not much of a secret.
                                    Start doing the job for free. It establishes
                                    you as a contributor and proves your
                                    motivation. It shows that you are a good
                                    investment. Applicants will have much more
                                    success if they do the work and then apply.
                                    For most jobs, the applicant is trying to
                                    convince the employer that they are capable
                                    of doing the job. But the job-seeker has no
                                    idea what the work or environment is
                                    actually like. In open source, one does not
                                    have to guess. Do the work. Demonstrate
                                    capability. Then ask for support.
                                </p>
                                <p className="my-4">
                                    Doing the work also means demonstrating your
                                    work. Not all work in open source work is as
                                    visible as writing code. The less visible
                                    work is no less valuable, but it is in your
                                    best interest to create artifacts of your
                                    effort. Transparency is your friend. If you
                                    learn something, it is helpful to codify it
                                    by writing a blog post or keeping a running
                                    log. I have seen some write a bi-weekly
                                    summary email tracking their progress. Code
                                    reviews used to be hard to track, but now
                                    GitHub does a better job crediting a green
                                    square. Taking long walks to reflect on how
                                    to approach a problem is necessary, but
                                    writing up your conclusions in a public
                                    place is valuable collateral that can
                                    forever serve as evidence of your progress.
                                </p>
                                <p>
                                    (Excerpt from{" "}
                                    <a
                                        className="text-orange"
                                        href="https://adamjonas.com/bitcoin/funding/grants/grants-bitcoin-open-source/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        A guide for bitcoin open-source grant
                                        seekers
                                    </a>
                                    )
                                </p>
                            </>
                        }
                        title="Earning a grant for full-time bitcoin open source work"
                    />
                    <Item
                        content={
                            <>
                                <></>
                                <ul className="my-4">
                                    <li>
                                        <a
                                            className="text-orange"
                                            href="https://spiral.xyz/#grants"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-umami-event={`funding-org-spiral-clicked`}
                                        >
                                            Spiral
                                        </a>{" "}
                                        is the bitcoin R&D arm of Block who have
                                        been distributing grants since 2019.
                                    </li>
                                    <li>
                                        <a
                                            className="text-orange"
                                            href="https://brink.dev/programs#grants"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-umami-event={`funding-org-brink-clicked`}
                                        >
                                            Brink
                                        </a>{" "}
                                        is a 501c3, mostly focused on funding
                                        Bitcoin Core developers, established in
                                        2020.
                                    </li>
                                    <li>
                                        <a
                                            className="text-orange"
                                            href="https://opensats.org/apply"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-umami-event={`funding-org-opensats-clicked`}
                                        >
                                            OpenSats
                                        </a>{" "}
                                        is a 501c3, established in 2021.
                                    </li>
                                    <li>
                                        <a
                                            className="text-orange"
                                            href="https://forms.monday.com/forms/57019f8829449d9e729d9e3545a237ea"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-umami-event={`funding-org-human-rights-foundation-clicked`}
                                        >
                                            Human Rights Foundation
                                        </a>{" "}
                                        is a 501c3 that has been distributing
                                        grants since 2020.
                                    </li>
                                </ul>
                                <p className="my-4">
                                    Various exchanges and individuals have
                                    sponsored devs in the past, but the above
                                    orgs have become the main distributors of
                                    grants over the last couple of years.
                                </p>
                            </>
                        }
                        title="Funding Organizations"
                    />
                </div>
            </div>
        </Wrapper>
    )
}
