"use client"

import {
    BdpTag,
    BookIcon,
    RightArrowIcon
} from "@bitcoin-dev-project/bdp-ui/icons"
import Image from "next/image"
import AsideGoTO from "@/components/aside-go-to"

type Props = {
    content: string | React.ReactNode
    title?: string
}

const Item = ({ content, title }: Props) => (
    <div className="gap-2">
        {title && (
            <h2 className="text-2xl max-md:text-xl font-medium leading-normal font-montserrat">
                {title}
            </h2>
        )}
        <section className="text-lg max-md:text-md font-quicksand">
            {content}
        </section>
    </div>
)

// Metadata cannot be exported from client components

export default function Career() {
    return (
        <div className="min-h-screen bg-[#F6F0E6] font-quicksand">
            <div className="flex flex-col p-14 max-sm:p-7 my-0 max-w-7xl mx-auto">
                <div className="flex gap-12 max-lg:flex-col">
                        <AsideGoTO selected="career" />
                    {/* Main Content Area */}
                    <div className="flex flex-col flex-1 gap-y-10">
                        <div className="flex flex-col gap-6">
                            <h1 className="text-[58px] max-lg:text-[42px] font-bold leading-tight text-black font-montserrat">
                                GET FUNDED
                            </h1>
                            <p className="text-xl text-black max-w-4xl font-quicksand">
                                Learn how grants support full-time bitcoin
                                development.
                            </p>

                            {/* get-funded-hero.png Image with BDP Tag - Card Container */}
                            <div
                                className="my-6 rounded-lg border-2"
                                style={{
                                    backgroundColor: "#efe9de",
                                    borderColor: "#E1DBD0"
                                }}
                            >
                                {/* Top section with image - transparent background */}
                                <div className="rounded-t-lg p-4">
                                    {/* Inner container for the image */}
                                    <div className="relative rounded-lg overflow-hidden">
                                        <Image
                                            src="/images/get-funded/get-funded-hero.png"
                                            alt="Funding Process"
                                            width={800}
                                            height={400}
                                            className="w-full h-auto"
                                        />

                                        {/* By BDP Tag - Positioned in bottom-left of image */}
                                        <div
                                            className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-[12px] border bg-[#F6F0E6]"
                                            style={{ borderColor: "#A9A49B" }}
                                        >
                                            <BdpTag
                                                width={16}
                                                className="text-black"
                                            />
                                            <span className="text-sm font-medium text-black">
                                                By BDP
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Light bottom section with content */}
                                <div className="px-6 py-3 rounded-b-lg">
                                    <h2 className="text-2xl max-md:text-xl font-medium leading-normal mb-2 font-montserrat">
                                        Common Application
                                    </h2>
                                    <section className="text-lg max-md:text-md font-quicksand">
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
                                    </section>
                                </div>
                            </div>
                        </div>

                        <Item
                            content={
                                <>
                                    <p className="my-4">
                                        If you aspire to have professional
                                        freedom, work on something that will
                                        impact the lives of countless people
                                        across the world, write code that will
                                        span generations, and collaborate with
                                        some of the most gifted developers on
                                        the planet to solve some of the hardest
                                        technical problems of our age, then you
                                        are in the right place.
                                    </p>
                                </>
                            }
                            title="Why consider a career in bitcoin open source development?"
                        />

                        {/* Quote Block */}
                        <div
                            className="my-6 rounded-lg border-2 border-[#E1DBD0] p-3"
                            style={{ backgroundColor: "#F6F0E6" }}
                        >
                            {/* Inner container with dashed border */}
                            <div className="border border-dashed border-gray-300 rounded-lg p-6">
                                <div className="flex items-start gap-3 mb-4">
                                    <span className="text-orange text-3xl">
                                        "
                                    </span>
                                    <p className="text-lg italic font-quicksand">
                                        While grant programs often have open
                                        applications, the secret to getting
                                        funding isn't much of a secret. Start
                                        doing the job for free. It establishes
                                        you as a contributor and proves your
                                        motivation to do the work. It shows that
                                        you are a good investment.
                                    </p>
                                </div>

                                {/* Bottom section with signature and button */}
                                <div className="flex items-end justify-between mt-4">
                                    {/* Left side - Signature */}
                                    <div className="flex flex-col gap-2">
                                        <Image
                                            src="/images/signature.png"
                                            alt="Adam Jonas signature"
                                            width={200}
                                            height={60}
                                            className="h-auto w-auto"
                                        />
                                        <div className="font-quicksand">
                                            <p className="text-sm font-medium">
                                                By Adam Jonas
                                            </p>
                                            <p className="text-sm opacity-70">
                                                Founder
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right side - Button */}
                                    <a
                                        href="/articles/adam-jonas-quote"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative inline-flex items-center h-8 rounded-[20px] font-semibold text-xs transition-all hover:scale-105 bg-[#E1DBD0] border-2 border-[#C7C1B6] text-black overflow-hidden  overflow-hidden"
                                    >
                                        {/* Inner circle on left */}
                                        <span className="absolute -left-[2px] -top-[2px] h-8 w-8 rounded-full border-2 border-[#C7C1B6] flex items-center justify-center flex-shrink-0">
                                            <BookIcon
                                                width={14}
                                                className="text-black"
                                            />
                                        </span>

                                        {/* Text content */}
                                        <span className="ml-10 mr-2.5">
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
                                    <p className="my-4">
                                        Bitcoin funding is different from other
                                        open source and other cryptocurrency
                                        projects. Getting a grant in bitcoin is
                                        pretty straightforward. You either need
                                        someone to vouch for you or you need to
                                        do work - ideally both. While grant
                                        programs often have open applications,
                                        the secret to getting funding is not
                                        much of a secret. Start doing the job
                                        for free. It establishes you as a
                                        contributor and proves your motivation.
                                        It shows that you are a good investment.
                                        Applicants will have much more success
                                        if they do the work and then apply. For
                                        most jobs, the applicant is trying to
                                        convince the employer that they are
                                        capable of doing the job. But the
                                        job-seeker has no idea what the work or
                                        environment is actually like. In open
                                        source, one does not have to guess. Do
                                        the work. Demonstrate capability. Then
                                        ask for support.
                                    </p>
                                    <p className="my-4">
                                        Doing the work also means demonstrating
                                        your work. Not all work in open source
                                        work is as visible as writing code. The
                                        less visible work is no less valuable,
                                        but it is in your best interest to
                                        create artifacts of your effort.
                                        Transparency is your friend. If you
                                        learn something, it is helpful to codify
                                        it by writing a blog post or keeping a
                                        running log. I have seen some write a
                                        bi-weekly summary email tracking their
                                        progress. Code reviews used to be hard
                                        to track, but now GitHub does a better
                                        job crediting a green square. Taking
                                        long walks to reflect on how to approach
                                        a problem is necessary, but writing up
                                        your conclusions in a public place is
                                        valuable collateral that can forever
                                        serve as evidence of your progress.
                                    </p>
                                </>
                            }
                            title="Earning a grant for full-time bitcoin open source work"
                        />

                        {/* Funding Organizations */}
                        <div className="flex flex-col gap-6">
                            <div>
                                <h2 className="text-2xl max-md:text-xl font-medium leading-normal font-montserrat">
                                    Funding Organizations
                                </h2>
                                <p className="text-lg max-md:text-md font-quicksand mt-2">
                                    Various exchanges and individuals have
                                    sponsored devs in the past, but the below
                                    orgs have become the main distributors of
                                    grants over the last couple of years.
                                </p>
                            </div>

                            {/* Organization Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Spiral */}
                                <div
                                    className="relative rounded-lg"
                                    style={{ backgroundColor: "#EFE9DE" }}
                                >
                                    {/* Corner circles */}
                                    <div
                                        className="absolute top-2 left-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: "#E1DBD0" }}
                                    ></div>
                                    <div
                                        className="absolute top-2 right-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: "#E1DBD0" }}
                                    ></div>
                                    <div
                                        className="absolute bottom-2 left-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: "#E1DBD0" }}
                                    ></div>
                                    <div
                                        className="absolute bottom-2 right-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: "#E1DBD0" }}
                                    ></div>

                                    <div className="rounded-lg text-center m-2">
                                        <div className="mb-4 flex justify-center h-16 items-center">
                                            <div className="text-gray-300 text-3xl font-bold">
                                                S
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-500 font-montserrat mb-2">
                                            Spiral
                                        </h3>
                                        <p className="text-sm text-gray-400 font-quicksand">
                                            Bitcoin R&D arm of Block,
                                            distributing grants since 2019.
                                        </p>
                                    </div>
                                </div>

                                {/* Brink */}
                                <div
                                    className="relative rounded-lg"
                                    style={{ backgroundColor: "#EFE9DE" }}
                                >
                                    {/* Corner circles */}
                                    <div
                                        className="absolute top-2 left-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: "#E1DBD0" }}
                                    ></div>
                                    <div
                                        className="absolute top-2 right-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: "#E1DBD0" }}
                                    ></div>
                                    <div
                                        className="absolute bottom-2 left-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: "#E1DBD0" }}
                                    ></div>
                                    <div
                                        className="absolute bottom-2 right-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: "#E1DBD0" }}
                                    ></div>

                                    <div className="rounded-lg text-center m-2">
                                        <div className="mb-4 flex justify-center h-16 items-center">
                                            <div className="text-gray-300 text-3xl font-bold">
                                                brink
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-500 font-montserrat mb-2">
                                            Brink
                                        </h3>
                                        <p className="text-sm text-gray-400 font-quicksand">
                                            A 501c3, focused on funding Bitcoin
                                            Core devs, since 2020.
                                        </p>
                                    </div>
                                </div>

                                {/* Human Rights Foundation */}
                                <div
                                    className="relative rounded-lg"
                                    style={{ backgroundColor: "#EFE9DE" }}
                                >
                                    {/* Corner circles */}
                                    <div
                                        className="absolute top-2 left-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: "#E1DBD0" }}
                                    ></div>
                                    <div
                                        className="absolute top-2 right-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: "#E1DBD0" }}
                                    ></div>
                                    <div
                                        className="absolute bottom-2 left-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: "#E1DBD0" }}
                                    ></div>
                                    <div
                                        className="absolute bottom-2 right-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: "#E1DBD0" }}
                                    ></div>

                                    <div className="rounded-lg text-center m-2">
                                        <div className="mb-4 flex justify-center h-16 items-center">
                                            <div className="text-gray-300 text-3xl font-bold">
                                                H
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-500 font-montserrat mb-2">
                                            Human Rights Foundation
                                        </h3>
                                        <p className="text-sm text-gray-400 font-quicksand">
                                            A 501c3 that has been distributing
                                            grants since 2020.
                                        </p>
                                    </div>
                                </div>

                                {/* OpenSats */}
                                <div
                                    className="relative rounded-lg"
                                    style={{ backgroundColor: "#EFE9DE" }}
                                >
                                    {/* Corner circles */}
                                    <div
                                        className="absolute top-2 left-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: "#E1DBD0" }}
                                    ></div>
                                    <div
                                        className="absolute top-2 right-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: "#E1DBD0" }}
                                    ></div>
                                    <div
                                        className="absolute bottom-2 left-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: "#E1DBD0" }}
                                    ></div>
                                    <div
                                        className="absolute bottom-2 right-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: "#E1DBD0" }}
                                    ></div>

                                    <div className="rounded-lg text-center m-2">
                                        <div className="mb-4 flex justify-center h-16 items-center">
                                            <div className="text-gray-300 text-3xl font-bold">
                                                &gt;
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-500 font-montserrat mb-2">
                                            OpenSats
                                        </h3>
                                        <p className="text-sm text-gray-400 font-quicksand">
                                            A 501c3, established in 2021.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
