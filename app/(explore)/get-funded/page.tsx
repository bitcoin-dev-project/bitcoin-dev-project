"use client"

import {
    BdpTag,
    BookIcon,
    RightArrowIcon
} from "@bitcoin-dev-project/bdp-ui/icons"
import Image from "next/image"
import AsideGoTO from "@/components/aside-go-to"
import BDPStars from "@/components/assets/BDPStarts"
import Quotes from "@/components/assets/Quotes"
import { FUNDINGORGANISATION } from "@/utils"
import FundingOrg from "@/components/brand/FundingOrg"

type Props = {
    content: string | React.ReactNode
    title?: string
}

const Item = ({ content, title }: Props) => (
    <div className="flex flex-col gap-3">
        {title && (
            <h2 className="text-xl lg:text-2xl font-semibold text-brand-dark/85 leading-normal font-montserrat">
                {title}
            </h2>
        )}
        <section className="text-lg lg:text-xl font-quicksand leading-[1.4]">
            {content}
        </section>
    </div>
)

export default function Career() {
    return (
        <div className="min-h-screen bg-[#F6F0E6] font-quicksand text-brand-dark">
            <div className="flex flex-col my-0 max-w-7xl mx-auto">
                <div className="flex gap-12 flex-col lg:flex-row">
                    <div className="w-full lg:w-[300px] flex order-2 lg:order-1 flex-col gap-6">
                        <AsideGoTO selected="get-funded" />
                    </div>
                    <div className="flex flex-col flex-1 gap-y-10 order-1 lg:order-2">
                        <div className="flex flex-col gap-5">
                            <h1 className="text-[2rem] leading-none lg:text-[3.5rem] font-bold text-black font-montserrat">
                                GET FUNDED
                            </h1>
                            <p className="text-lg  lg:text-xl text-brand-dark max-w-4xl font-quicksand">
                                Learn how grants support full-time bitcoin
                                development.
                            </p>
                        </div>
                        <div className="flex flex-col gap-10">
                            <Item
                                title="One form, multiple opportunities"
                                content={
                                    <>
                                        <p>
                                            Get your work in front of multiple
                                            bitcoin grant organizations with a
                                            single application. Fill out the
                                            form once, select which funding
                                            providers to send it to, and submit.
                                            Each organization receives a copy of
                                            your application and will reach out
                                            if interested. Apply today to
                                            fast-track your funding.
                                        </p>
                                    </>
                                }
                            />

                            <div className="rounded-2xl max-w-lg mx-auto border border-brand-gray-100">
                                <div className="rounded-2xl p-2 flex flex-col gap-3">
                                    <div className="relative rounded-2xl overflow-hidden">
                                        <Image
                                            src="/images/get-funded/common-app-hero.webp"
                                            alt="Funding Process"
                                            width={800}
                                            height={400}
                                            className="w-full object-cover min-h-[126px] lg:min-h-[277px] h-auto"
                                        />

                                        <div
                                            className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-[12px] border bg-[#F6F0E6]"
                                            style={{ borderColor: "#A9A49B" }}
                                        >
                                            <BdpTag
                                                width={16}
                                                className="text-black w-6 lg:w-4"
                                            />
                                            <span className="text-[11px] md:text-sm font-medium text-black">
                                                By BDP
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 lg:flex-row justify-between lg:items-center">
                                        <h2 className="text-base lg:text-xl font-semibold font-montserrat">
                                            Common Application
                                        </h2>
                                        <a
                                            href="https://grants.bitcoindevs.xyz/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full justify-center gap-2.5 lg:w-auto flex flex-row p-2.5 rounded-[10px] bg-brand-dark"
                                        >
                                            <BDPStars />
                                            <p className="text-sm font-bold lg:text-left text-brand">
                                                Submit Application
                                            </p>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <Item
                                content={
                                    <>
                                        <p>
                                            If you aspire to have professional
                                            freedom, work on something that will
                                            impact the lives of countless people
                                            across the world, write code that
                                            will span generations, and
                                            collaborate with some of the most
                                            gifted developers on the planet to
                                            solve some of the hardest technical
                                            problems of our age, then you are in
                                            the right place.
                                        </p>
                                    </>
                                }
                                title="Why consider a career in bitcoin open source development?"
                            />

                            <div className="rounded-xl border bg-brand-gray border-brand-gray-100 p-2.5">
                                <div className="border border-dashed border-gray-300 rounded-lg p-2.5">
                                    <div className="flex items-start gap-1 mb-4">
                                        <Quotes className="min-w-4" />
                                        <p className="text-2xl italic font-quicksand">
                                            While grant programs often have open
                                            applications, the secret to getting
                                            funding isn't much of a secret.
                                            Start doing the job for free. It
                                            establishes you as a contributor and
                                            proves your motivation to do the
                                            work. It shows that you are a good
                                            investment.
                                        </p>
                                    </div>

                                    <div className="flex items-end justify-between mt-4">
                                        <div className="flex flex-col gap-2">
                                            <Image
                                                src="/images/get-funded/signature.webp"
                                                alt="Adam Jonas signature"
                                                width={145}
                                                height={95}
                                                className="h-auto w-[145px]"
                                            />
                                            <div className="font-quicksand">
                                                <p className="text-sm font-normal">
                                                    By Adam Jonas
                                                </p>
                                                <p className="text-sm text-[#494744] opacity-75">
                                                    Founder
                                                </p>
                                            </div>
                                        </div>

                                        <a
                                            href="https://adamjonas.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="relative inline-flex items-center h-8 rounded-[20px] font-semibold text-xs transition-all hover:scale-105 bg-[#E1DBD0] border-2 border-[#C7C1B6] text-black overflow-hidden"
                                        >
                                            <span className="absolute -left-[2px] -top-[2px] h-8 w-8 rounded-full border-2 border-[#C7C1B6] flex items-center justify-center flex-shrink-0">
                                                <BookIcon
                                                    width={14}
                                                    className="text-black"
                                                />
                                            </span>

                                            <span className="ml-9 font-bold lg:ml-10 text-sm lg:text-base text-nowrap lg:mr-2.5">
                                                View Full Article
                                            </span>

                                            {/* Arrow */}
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

                            <Item
                                content={
                                    <>
                                        <p>
                                            Financial support for bitcoin open
                                            source work typically comes in the
                                            form of a grant. Grants usually last
                                            for one year and many are renewed.
                                        </p>
                                        <p className="my-4">
                                            Bitcoin funding is different from
                                            other open source and other
                                            cryptocurrency projects. Getting a
                                            grant in bitcoin is pretty
                                            straightforward. You either need
                                            someone to vouch for you or you need
                                            to do work - ideally both. While
                                            grant programs often have open
                                            applications, the secret to getting
                                            funding is not much of a secret.
                                            Start doing the job for free. It
                                            establishes you as a contributor and
                                            proves your motivation. It shows
                                            that you are a good investment.
                                            Applicants will have much more
                                            success if they do the work and then
                                            apply. For most jobs, the applicant
                                            is trying to convince the employer
                                            that they are capable of doing the
                                            job. But the job-seeker has no idea
                                            what the work or environment is
                                            actually like. In open source, one
                                            does not have to guess. Do the work.
                                            Demonstrate capability. Then ask for
                                            support.
                                        </p>
                                        <p className="my-4">
                                            Doing the work also means
                                            demonstrating your work. Not all
                                            work in open source work is as
                                            visible as writing code. The less
                                            visible work is no less valuable,
                                            but it is in your best interest to
                                            create artifacts of your effort.
                                            Transparency is your friend. If you
                                            learn something, it is helpful to
                                            codify it by writing a blog post or
                                            keeping a running log. I have seen
                                            some write a bi-weekly summary email
                                            tracking their progress. Code
                                            reviews used to be hard to track,
                                            but now GitHub does a better job
                                            crediting a green square. Taking
                                            long walks to reflect on how to
                                            approach a problem is necessary, but
                                            writing up your conclusions in a
                                            public place is valuable collateral
                                            that can forever serve as evidence
                                            of your progress.
                                        </p>
                                    </>
                                }
                                title="Earning a grant for full-time bitcoin open source work"
                            />

                            <Item
                                content={
                                    <>
                                        <p>
                                            Various exchanges and individuals
                                            have sponsored devs in the past, but
                                            the below orgs have become the main
                                            distributors of grants over the last
                                            couple of years.
                                        </p>
                                    </>
                                }
                                title="Funding Organizations"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {FUNDINGORGANISATION.map((org) => (
                                    <FundingOrg key={org.name} {...org} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
