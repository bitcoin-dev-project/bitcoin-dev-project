"use client"

import {
    BdpTag,
    BookIcon,
    RightArrowIcon
} from "@bitcoin-dev-project/bdp-ui/icons"
import Image from "next/image"
import BDPStars from "@/components/assets/BDPStarts"
import Quotes from "@/components/assets/Quotes"
import GetFundedSidebar from "@/components/get-funded/get-funded-sidebar"
import FundingOrgCard from "@/components/get-funded/funding-org-card"
import FundingChecklist from "@/components/get-funded/funding-checklist"
import PathsStoriesCarousel from "@/components/get-funded/paths-stories-carousel"
import ReadMore from "@/components/get-funded/read-more"
import { ExtLink } from "@/components/get-funded/get-funded-ui"
import { CROWDFUNDING, FUNDING_ORGS, WORKSPACES } from "@/data/get-funded"
import type { ResourceLink } from "@/data/get-funded"

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-montserrat text-xl font-semibold leading-normal text-brand-dark/85 lg:text-2xl">
        {children}
    </h2>
)

const Tip = ({ children }: { children: React.ReactNode }) => (
    <div className="border-l-[3px] border-brand-orange-100 pl-5">
        <h3 className="mb-1 font-montserrat text-lg font-bold uppercase text-brand-dark lg:text-xl">
            Tip
        </h3>
        <p className="font-quicksand text-base leading-[1.5] text-brand-dark/70 lg:text-lg italic">
            {children}
        </p>
    </div>
)

const ResourceLinks = ({ links }: { links: ResourceLink[] }) => (
    <ul className="flex flex-col gap-2 font-quicksand text-lg lg:text-xl">
        {links.map((link) => (
            <li key={link.name} className="flex flex-wrap items-center gap-2">
                <ExtLink href={link.url}>{link.name}</ExtLink>
                {link.detail && (
                    <span className="text-brand-dark/70">| {link.detail}</span>
                )}
            </li>
        ))}
    </ul>
)

export default function Career() {
    return (
        <div className="min-h-screen bg-[#F6F0E6] font-quicksand text-brand-dark">
            <div className="mx-auto flex w-full max-w-4xl flex-col">
                <GetFundedSidebar />
                <div className="flex min-w-0 flex-col gap-y-12">
                    <div className="flex flex-col gap-5">
                        <h1 className="font-montserrat text-[2rem] font-bold leading-none text-black lg:text-[3.5rem]">
                            GET FUNDED
                        </h1>
                        <p className="max-w-4xl font-quicksand text-lg text-brand-dark lg:text-xl italic">
                            Learn how grants support full-time bitcoin
                            development
                        </p>
                    </div>

                    <section
                        id="why-consider"
                        className="flex scroll-mt-24 flex-col gap-3"
                    >
                        <SectionHeading>
                            Why consider a career in bitcoin open source
                            software (BOSS)?
                        </SectionHeading>
                        <p className="font-quicksand text-lg leading-[1.4] lg:text-xl">
                            If you aspire to have professional freedom, work on
                            something that will impact the lives of countless
                            people across the world, write code that will span
                            generations, and collaborate with some of the most
                            gifted developers on the planet to solve some of the
                            hardest technical problems of our age, then you are
                            in the right place.
                        </p>
                    </section>

                    <section
                        id="earning-a-grant"
                        className="flex scroll-mt-24 flex-col gap-3"
                    >
                        <SectionHeading>
                            Earning a grant for full-time bitcoin open source
                            work
                        </SectionHeading>
                        <div className="flex flex-col gap-4 font-quicksand text-lg leading-[1.4] lg:text-xl">
                            <p>
                                Financial support for bitcoin open source work
                                typically comes in the form of a grant. Grants
                                usually last for one year and many are renewed.
                            </p>
                            <p>
                                Bitcoin funding is different from other open
                                source and other cryptocurrency projects.
                                Getting a grant in bitcoin is pretty
                                straightforward. You either need someone to
                                vouch for you or you need to do work - ideally
                                both.
                            </p>
                            <ReadMore>
                                <p>
                                    While grant programs often have open
                                    applications, the secret to getting funding
                                    is not much of a secret. Start doing the job
                                    for free. It establishes you as a
                                    contributor and proves your motivation. It
                                    shows that you are a good investment.
                                    Applicants will have much more success if
                                    they do the work and then apply. For most
                                    jobs, the applicant is trying to convince
                                    the employer that they are capable of doing
                                    the job. But the job-seeker has no idea what
                                    the work or environment is actually like. In
                                    open source, one does not have to guess. Do
                                    the work. Demonstrate capability. Then ask
                                    for support.
                                </p>
                                <p>
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
                            </ReadMore>
                        </div>
                    </section>

                    <div
                        id="adam-article"
                        className="scroll-mt-24 rounded-xl border border-brand-gray-100 bg-brand-card p-2.5"
                    >
                        <div className="rounded-lg p-2.5">
                            <div className="mb-4 flex items-start gap-1">
                                <Quotes className="min-w-4" />
                                <p className="font-quicksand text-2xl italic">
                                    While grant programs often have open
                                    applications, the secret to getting funding
                                    isn&apos;t much of a secret. Start doing the
                                    job for free. It establishes you as a
                                    contributor and proves your motivation to do
                                    the work. It shows that you are a good
                                    investment.
                                </p>
                            </div>

                            <div className="mt-4 flex items-end justify-between">
                                <div className="flex flex-col gap-2">
                                    <Image
                                        src="/images/get-funded/signature.webp"
                                        alt="Adam Jonas signature"
                                        width={145}
                                        height={95}
                                        className="h-auto w-[145px]"
                                    />
                                    <div className="font-quicksand">
                                        <p className="text-sm italic text-[#494744] opacity-75">
                                            Adam Jonas, Bitcoin Dev Project Founder
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href="https://adamjonas.com/bitcoin/funding/grants/grants-bitcoin-open-source/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative inline-flex h-8 items-center overflow-hidden rounded-[20px] border-2 border-[#C7C1B6] bg-[#E1DBD0] text-xs font-semibold text-black transition-all hover:scale-105"
                                >
                                    <span className="absolute -left-[2px] -top-[2px] flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#C7C1B6]">
                                        <BookIcon
                                            width={14}
                                            className="text-black"
                                        />
                                    </span>
                                    <span className="ml-9 text-nowrap text-sm font-bold lg:ml-10 lg:mr-2.5 lg:text-base">
                                        View Full Article
                                    </span>
                                    <span className="mr-2.5">
                                        <RightArrowIcon
                                            width={12}
                                            className="text-black"
                                        />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <section
                        id="paths-and-stories"
                        className="flex scroll-mt-24 flex-col gap-5 pt-16"
                    >
                        <div className="flex flex-col gap-2">
                            <SectionHeading>Paths and stories</SectionHeading>
                            <p className="font-quicksand text-lg lg:text-xl pb-4">
                                Meet contributors who turned their BOSS contributions into full-time work
                            </p>
                        </div>
                        <PathsStoriesCarousel />
                    </section>

                    <section
                        id="checklist"
                        className="flex scroll-mt-24 flex-col gap-5 pt-16"
                    >
                        <SectionHeading>
                            Checklist
                        </SectionHeading>
                        <p className="font-quicksand text-lg lg:text-xl pb-4">
                            A strong funding application starts well before you apply. Before submitting anything, 
                            take the time to get these pieces in place. These items will help you build a strong 
                            foundation and make the entire process smoother.
                        </p>
                        <FundingChecklist />
                    </section>

                    <section
                        id="organizations"
                        className="flex scroll-mt-24 flex-col gap-5 pt-16"
                    >
                        <div className="flex flex-col gap-2">
                            <SectionHeading>
                                Grant organizations
                            </SectionHeading>
                            <p className="font-quicksand text-lg leading-[1.4] lg:text-xl pb-4">
                                Various exchanges and individuals have sponsored
                                devs in the past, but the organizations below have become
                                the main distributors of grants over the last
                                couple of years.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {FUNDING_ORGS.map((org) => (
                                <FundingOrgCard key={org.name} org={org} />
                            ))}
                        </div>
                    </section>

                    <Tip>
                        All grant orgs require you to do some kind of reporting.
                        They are usually monthly or quarterly. Get into the
                        habit of keeping a journal of what you work on so it is
                        easier when it comes time to put together the report.
                        That way you won&apos;t forget anything that you did,
                        and you won&apos;t be scrambling to find links to your
                        code contributions.
                    </Tip>

                    <section className="flex flex-col gap-3 pt-16">
                        <SectionHeading>Employment</SectionHeading>
                        <p className="font-quicksand text-lg leading-[1.4] lg:text-xl">
                            A growing number of organizations employ developers
                            to work full-time on bitcoin open-source software.
                            Beyond salary and employment benefits, these places
                            provide office space and unique opportunities for
                            in-person engagement.
                        </p>
                        <p className="font-quicksand text-lg leading-[1.4] lg:text-xl pb-4">
                            These roles offer something that is difficult to
                            replicate remotely. Working right next to other
                            bitcoin devs can open the door to all kinds of
                            collaboration like impromptu brainstorming and
                            whiteboarding sessions and conversations that
                            facilitate quick feedback loops.
                        </p>
                        <ResourceLinks links={WORKSPACES} />
                    </section>

                    <section className="flex flex-col gap-3 pt-16">
                        <SectionHeading>
                            Crowdfunding your project
                        </SectionHeading>
                        <p className="font-quicksand text-lg leading-[1.4] lg:text-xl">
                            If you do not yet have funding or want
                            community-backed support, you can launch your own
                            project through Bitcoin-focused crowdfunding
                            platforms.
                        </p>
                        <ResourceLinks links={CROWDFUNDING} />
                    </section>

                    <section
                        id="apply"
                        className="flex scroll-mt-24 flex-col gap-3 pt-16"
                    >
                        <SectionHeading>
                            One form, multiple opportunities
                        </SectionHeading>
                        <p className="font-quicksand text-lg leading-[1.4] lg:text-xl">
                            Ready to apply? Get your work in front of multiple
                            bitcoin grant organizations with a single
                            application. Fill out the form once, select which
                            funding providers to send it to, and submit. Each
                            organization receives a copy of your application and
                            will reach out if interested. Apply today and get one
                            step closer towards becoming a funded bitcoin
                            contributor.
                        </p>
                    </section>

                    <div
                        id="common-application"
                        className="mx-auto w-full max-w-lg scroll-mt-24 rounded-2xl border border-brand-gray-100"
                    >
                        <div className="flex flex-col gap-3 rounded-2xl p-2">
                            <div className="relative overflow-hidden rounded-2xl">
                                <Image
                                    src="/images/get-funded/common-app-hero.webp"
                                    alt="Funding Process"
                                    width={800}
                                    height={400}
                                    className="h-auto min-h-[126px] w-full object-cover lg:min-h-[277px]"
                                />
                                <div
                                    className="absolute bottom-3 left-3 flex items-center gap-1 rounded-[12px] border bg-[#F6F0E6] px-2 py-1"
                                    style={{ borderColor: "#A9A49B" }}
                                >
                                    <BdpTag
                                        width={16}
                                        className="w-6 text-black lg:w-4"
                                    />
                                    <span className="text-[11px] font-medium text-black md:text-sm">
                                        By BDP
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                                <h2 className="font-montserrat text-base font-semibold lg:text-xl">
                                    Common Application
                                </h2>
                                <a
                                    href="https://grants.bitcoindevs.xyz/"
                                    target="_blank"
                                    rel="noopener strict-origin"
                                    className="flex w-full flex-row justify-center gap-2.5 rounded-[10px] bg-brand-dark p-2.5 lg:w-auto"
                                >
                                    <BDPStars />
                                    <p className="text-sm font-bold text-brand lg:text-left">
                                        Submit Application
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
