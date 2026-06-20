import React from "react"
import { Callout, ExtLink } from "@/components/get-funded/get-funded-ui"

/**
 * Navigation index for the get-funded page and its sub-pages. Items with a
 * hash (#) target a section on the main page; items with a slug are sub-pages.
 */
export type NavItem = { label: string; href: string; slug?: string }
export type NavSection = { title: string; href?: string; items: NavItem[]; columnIndex?: number}

export const PATH_STORIES_BASE = "/get-funded/path-and-stories"

export const NAV_SECTIONS: NavSection[] = [
    {
        title: "GET FUNDED",
        href: "/get-funded",
        items: [
            {
                label: "Why consider a career in bitcoin?",
                href: "/get-funded#why-consider"
            },
            {
                label: "How grants work",
                href: "/get-funded#earning-a-grant"
            },
            {
                label: "Guide for grant seekers",
                href: "/get-funded#adam-article"
            }
        ],
        columnIndex: 1
    },
    {
        title: "PATHS AND STORIES",
        href: "/get-funded#paths-and-stories",
        items: [],
        columnIndex: 1
    },
    {
        title: "CHECKLIST",
        href: "/get-funded#checklist",
        items: [],
        columnIndex: 2
    },
    {
        title: "FUNDING ORGANIZATIONS",
        href: "/get-funded#organizations",
        items: [],
        columnIndex: 2
    },
    {
        title: "APPLY",
        href: "/get-funded#apply",
        items: [],
        columnIndex: 2
    }
]

export type QA = {
    question: string
    answer: React.ReactNode
}

/** Summary shown on the "Paths and Stories" carousel card. */
export type PathStoryCard = {
    /** Card-only role override; falls back to person.role. */
    role?: string
    quote: string
    focus: string
    fundingOrg: string
    fundingStory: string
}

export type PathStory = {
    slug: string
    name: string
    role: string
    avatar?: string
    /** false => page exists but the interview content is still pending */
    available: boolean
    card: PathStoryCard
    qa: QA[]
}

export const PATH_STORIES: PathStory[] = [
    {
        slug: "stickies-v",
        name: "stickies - v",
        role: "Bitcoin Core Contributor, Host Of London BitDevs",
        avatar: "/images/get-funded/people/stickies-v.webp",
        available: true,
        card: {
            role: "Bitcoin Core Contributor | Brink",
            quote: "I kept showing up consistently for multiple months..., I tried focusing on being helpful rather than on being visible.",
            focus: "bitcoinkernel, code review, core infrastructure",
            fundingOrg: "Brink",
            fundingStory: "Self-taught Python programmer that used books, seminars, and code review sessions to learn C++ and Bitcoin Core"
        },
        qa: [
            {
                question:
                    "Who are you, what do you work on, and how are you funded?",
                answer: (
                    <p>
                        I&apos;m{" "}
                        <ExtLink href="https://github.com/stickies-v">
                            stickies-v
                        </ExtLink>
                        , funded by{" "}
                        <ExtLink href="https://brink.dev">Brink</ExtLink> to
                        work on Bitcoin Core and related projects. My main focus
                        is the bitcoinkernel project as well as general code
                        review, and besides that I also try to help out with
                        education and awareness, which currently mostly
                        manifests by hosting the{" "}
                        <ExtLink href="https://londonbitcoindevs.org/">
                            London BitDevs
                        </ExtLink>{" "}
                        Socratic meetups.
                    </p>
                )
            },
            {
                question:
                    "What areas do you specialize in and what is your day-to-day like?",
                answer: (
                    <>
                        <p>
                            Most of my work revolves around contributing to
                            Bitcoin Core and related projects. The bitcoinkernel
                            project is currently my main focus, but I also
                            contribute more generally to Bitcoin Core, mostly
                            through PR review. I try to focus on projects that
                            make Bitcoin Core more robust, safe, modular, and
                            easy to maintain, but there is a continuous stream
                            of interesting stuff that comes up and takes my
                            interest too.
                        </p>
                        <p>
                            <ExtLink href="https://github.com/bitcoin/bitcoin/tree/master/src/kernel">
                                bitcoinkernel
                            </ExtLink>{" "}
                            is a project in Bitcoin Core that extracts the
                            consensus engine into a library so that it can be
                            used outside of Bitcoin Core. The current work
                            focuses on improving the interface so it is safe,
                            ergonomic, and maximally exposes functionality that
                            users would need. I&apos;m involved with both
                            authoring and reviewing relevant PRs, and I also
                            maintain{" "}
                            <ExtLink href="https://github.com/stickies-v/py-bitcoinkernel">
                                Python language bindings
                            </ExtLink>{" "}
                            for bitcoinkernel.
                        </p>
                        <p>
                            My day generally starts by looking at my GitHub
                            inbox, to quickly address comments received since
                            the previous day, re-review updated PRs, and make
                            sure momentum is kept on actively developed
                            projects. Once the quick action items are out of the
                            way, I&apos;ll have time to focus on more complex
                            work. I often take a longer chunk of time (usually
                            hours, sometimes days) to just dive deeper into
                            understanding all the relevant/changed code or to
                            study yet another C++ std-lib feature I&apos;m not
                            familiar with. With AI tooling being in the highly
                            usable state it&apos;s in, it&apos;s also become
                            really interesting and useful to quickly prototype
                            multiple (sometimes radically different) approaches
                            to solving a problem.
                        </p>
                        <p>
                            On some days (e.g. before a BitDevs socratic), I put
                            the code review on hold and instead browse the
                            internet (with usual suspects{" "}
                            <ExtLink href="https://delvingbitcoin.org/">
                                Delving Bitcoin
                            </ExtLink>
                            ,{" "}
                            <ExtLink href="https://groups.google.com/g/bitcoindev">
                                Bitcoin Development Mailing List
                            </ExtLink>
                            ,{" "}
                            <ExtLink href="https://bitcoinops.org/">
                                Bitcoin Optech
                            </ExtLink>
                            ) for interesting new developments, research, and
                            releases to try and keep up with everything
                            that&apos;s happening.
                        </p>
                    </>
                )
            },
            {
                question:
                    "What was your entrypoint into bitcoin open-source software (BOSS)? What is your background and how did you get started?",
                answer: (
                    <>
                        <p>
                            Reading &quot;Mastering Bitcoin&quot; while on a
                            long-haul flight really got me hooked on
                            understanding the protocol better, and made me want
                            to start contributing to Bitcoin Core. As a
                            self-taught Python programmer, I had quite some
                            upskilling to do.
                        </p>
                        <p>
                            I took a month to familiarize myself with the
                            essentials of modern C++ and related concepts (like
                            pointers) that still held a lot of mysteries for me.
                            Once I had those basic comprehension skills down, I
                            started attending the (then weekly){" "}
                            <ExtLink href="https://bitcoincore.reviews/">
                                Bitcoin Core Review Club
                            </ExtLink>{" "}
                            to slowly build my understanding of the codebase,
                            and how the development process works. I also signed
                            up for a couple of online Chaincode Seminars, with
                            weekly discussion groups to cover protocol and
                            philosophy. Besides a helpful place to learn, having
                            this social component to it was a big push in
                            keeping things exciting and fun, and to start
                            building a bit of a network.
                        </p>
                    </>
                )
            },
            {
                question:
                    "What has the journey been like to get to where you are now? How did you get funded for the first time?",
                answer: (
                    <>
                        <p>
                            About 9 months after I started (gently) contributing
                            to Bitcoin Core, my BOSS &quot;career&quot; started
                            when I was offered the chance to help with teaching
                            and mentoring the first Qala{" "}
                            <span className="italic">
                                (now BTrust Builders)
                            </span>{" "}
                            cohorts, and then shortly there-after was offered a
                            full-time grant by{" "}
                            <ExtLink href="https://brink.dev">Brink</ExtLink> to
                            start contributing to Bitcoin Core, which I&apos;ve
                            been doing since mid-2022.
                        </p>
                        <Callout>
                            Each funding organization has different criteria and
                            priorities. In my case, I think the most important
                            drivers behind getting a grant despite not yet
                            having a meaningful OSS track record were that I
                            kept showing up consistently for multiple months,
                            and that I tried focusing on being helpful rather
                            than on being visible.
                        </Callout>
                        <p>
                            In my first months, I attended a lot of review
                            clubs, and usually showed up with a decent amount of
                            preparatory work so that I could meaningfully
                            contribute to the conversation. My contributions
                            weren&apos;t always correct, but it was clear that I
                            did my best. Similarly, I made it a point to be
                            reactive on GitHub: quickly responding to/
                            addressing comments, and following-up on and/or
                            incorporating changes when suggested.
                        </p>
                    </>
                )
            },
            {
                question:
                    "What is your favorite thing about working in BOSS (bitcoin open-source software)?",
                answer: (
                    <>
                        <p>
                            The freedom to work on whatever I think is important
                            and interesting. While I generally try to help out
                            with less fun work that just needs to be done, there
                            is never a moment where I have to work on something
                            that I believe should not be done in the first
                            place.
                        </p>
                        <Callout>
                            I think it&apos;s quite unique to be able to
                            contribute to a project that is serving such an
                            important role, and still getting ample opportunity
                            to learn along the way. Bitcoin Core&apos;s
                            long-term focus and priority for correctness can
                            sometimes make progress slower than what developers
                            are used to, but I find it incredibly interesting to
                            feel encouraged to understand changes in extreme
                            detail, and to investigate alternative approaches -
                            rather than just getting things done quickly and
                            maybe fixing them later.
                        </Callout>
                        <p>
                            In my first months, I attended a lot of review
                            clubs, and usually showed up with a decent amount of
                            preparatory work so that I could meaningfully
                            contribute to the conversation. My contributions
                            weren&apos;t always correct, but it was clear that I
                            did my best. Similarly, I made it a point to be
                            reactive on GitHub: quickly responding to/
                            addressing comments, and following-up on and/or
                            incorporating changes when suggested.
                        </p>
                    </>
                )
            },
            {
                question:
                    "What are some of the unique challenges of working in BOSS? What are things that may sound unexpected to people outside of the ecosystem?",
                answer: (
                    <>
                        <p>
                            Always being responsible for setting your own
                            priorities, goals, deadlines can be mentally
                            exhausting, and overwhelming in the beginning.
                            You&apos;re also largely responsible to be your own
                            cheerleader. You might get a rocket emoji or a
                            &quot;nice work!&quot; here and there, but generally
                            speaking you&apos;re in charge of celebrating your
                            wins (and learning from your losses). More autonomy
                            has lots of upsides, but comes with its own set of
                            challenges.
                        </p>
                        <p>
                            Because there is no roadmap or central planning,
                            contributors cannot just be code-producing machines.
                            Code gets merged when it is sufficiently reviewed,
                            but because there is no one telling people what to
                            review, it is your responsibility to facilitate and
                            socialize the changes you&apos;re proposing. This
                            generally comes down to 1) making review as easy as
                            possible (e.g. adding helpful documentation, tests,
                            good commit and PR hygiene, ...) and 2) helping
                            people understand why your change is worth the
                            effort, when they might not yet have all the context
                            that you have.
                        </p>
                        <Callout>
                            The Bitcoin Core development process is slower than
                            most other projects. It&apos;s crucial to not couple
                            your own self worth to the progress of your
                            project(s) too much. It&apos;s possible to do
                            everything right, and still get stuck. When things
                            don&apos;t progress as expected, analyze if
                            there&apos;s anything you can do better, and if not
                            - just shift your efforts to another important
                            project that has more momentum.
                        </Callout>
                    </>
                )
            },
            {
                question: "How is this different from other jobs you have had?",
                answer: (
                    <>
                        <p>
                            I already had a high degree of autonomy in my
                            previous job, but being a Bitcoin Core contributor
                            at Brink has really taken that to a new level. It
                            comes with many advantages, but also some inherent
                            difficulties, as discussed in earlier questions.
                        </p>
                        <p>
                            The way I think about and look at code is radically
                            different, too.{" "}
                            <strong className="font-semibold">
                                The risk appetite in Bitcoin Core is very low.
                                Every line of code (and its interactions) needs
                                to be inspected in detail and fully understood.
                                &quot;Looks good&quot; is not acceptable.
                            </strong>{" "}
                            In practice, this means I now spend an order of
                            magnitude more time on building context, and a lot
                            less on writing or looking at code changes. When I
                            feel unsure, I&apos;ll let things sit to revisit
                            them later with a fresh perspective.
                        </p>
                    </>
                )
            }
        ]
    },
    {
        slug: "beulah",
        name: "Beulah",
        role: "Cryptography Researcher",
        avatar: "/images/get-funded/people/beulah.webp",
        available: true,
        card: {
            quote: "You have to develop your own judgment about what's technically sound, what's worth pursuing, and what's ready to share.",
            focus: "Nested MuSig2 in the secp256k1-zkp library",
            fundingOrg: "Second, Vora",
            fundingStory:
                "Transitioned from backend dev to funded cryptography researcher"
        },
        qa: [
            {
                question:
                    "Who are you, what do you work on, and how are you funded?",
                answer: (
                    <p>
                        I&apos;m Beulah Evanjalin, a math and cryptography
                        enthusiast working on{" "}
                        <ExtLink href="https://bitcoinops.org/en/topics/musig/">
                            Nested MuSig2
                        </ExtLink>
                        , which is an advanced multi-signature scheme for
                        Bitcoin. I&apos;m funded by a one-year grant from both{" "}
                        <ExtLink href="https://second.tech/">Second</ExtLink>{" "}
                        and <ExtLink href="https://vora.io/">Vora</ExtLink>,
                        with mentorship from Jesse Posner at Vora.
                    </p>
                )
            },
            {
                question:
                    "What areas do you specialize in and what is your day-to-day like?",
                answer: (
                    <>
                        <p>
                            My work sits at the intersection of cryptography and
                            Bitcoin infrastructure. I&apos;m implementing Nested
                            MuSig2 in the{" "}
                            <ExtLink href="https://github.com/BlockstreamResearch/secp256k1-zkp">
                                secp256k1-zkp
                            </ExtLink>{" "}
                            library and drafting a{" "}
                            <ExtLink href="https://github.com/bitcoin/bips">
                                BIP
                            </ExtLink>{" "}
                            for it. The core idea is that MuSig2 lets you
                            combine multiple public keys into a single
                            aggregated key. The nested version takes that
                            further; you can aggregate keys, then aggregate
                            those aggregated keys again, and keep going. What
                            you end up with on-chain is a single Taproot key
                            that looks completely ordinary. Nobody can tell
                            whether it&apos;s one person, a 3-of-5 setup, or a
                            multi-device configuration. All that internal
                            structure is completely private.
                        </p>
                        <p>
                            Why does this matter? Think about something like{" "}
                            <ExtLink href="https://bitcoinops.org/en/topics/ark/">
                                Ark
                            </ExtLink>
                            , where an operator server needs to sign
                            collaboratively across multiple machines in
                            different locations. Today, that server holds one
                            master key, which is a single point of failure.
                            Nested MuSig lets you split that key across machines
                            securely, and the user on the other side experiences
                            none of that complexity. That&apos;s the kind of
                            improvement I find genuinely exciting. Serious
                            security gains with zero added friction for users.
                        </p>
                        <p>
                            Day-to-day, I&apos;m reading through research
                            papers, digging into the algorithm and workings,
                            writing and testing code, and meeting weekly with
                            Jesse to go over the hard parts. Implementing the
                            nested case is non-trivial, so{" "}
                            <strong className="font-semibold">
                                a lot of my time goes into really understanding
                                why things work, not just making them work.
                            </strong>
                        </p>
                    </>
                )
            },
            {
                question:
                    "What was your entrypoint into bitcoin open-source software (BOSS)? What is your background and how did you get started?",
                answer: (
                    <p>
                        My background is in mathematics. I did my undergrad in
                        math and my master&apos;s in computer science. So when I
                        first encountered Bitcoin, what grabbed me wasn&apos;t
                        the price or the narrative. It was the construction.
                        Elliptic curve cryptography, hash functions, Schnorr
                        signatures, and many. I wanted to understand all of it
                        from first principles. I was working as a backend
                        developer at the time, typical API work, fixing
                        production issues, keeping things running. It paid the
                        bills but wasn&apos;t where my heart was. So I started
                        spending evenings and weekends going deeper into
                        cryptography. Eventually, I found{" "}
                        <ExtLink href="https://learning.chaincode.com/">
                            Chaincode Labs&apos; Bitcoin open-source program
                        </ExtLink>
                        , which was the real turning point. I got to contribute
                        to the secp256k1 library and work on FROST, and that
                        experience made it clear this was the direction I wanted
                        to go.
                    </p>
                )
            },
            {
                question:
                    "What has the journey been like to get to where you are now? How did you get funded for the first time?",
                answer: (
                    <>
                        <p>
                            For a long time, I was learning mostly through
                            self-study, figuring things out as I went, but
                            without much structure or feedback. I didn&apos;t
                            know how to measure whether I was on the right track
                            or what to focus on next. The BOSS Challenge changed
                            that. It was intense and demanding in a way that was
                            genuinely useful, because it forced me to produce
                            real work and get real feedback, not just accumulate
                            knowledge privately.
                        </p>
                        <p>
                            The funding came out of that momentum. I had been
                            contributing to secp256k1-zkp and building a
                            relationship with Jesse through the mentorship. When
                            Second and Vora saw the work and recognized that
                            nested MuSig was something both Bark and Vora&apos;s
                            Lightning implementation needed, everything fell
                            into place.
                        </p>
                    </>
                )
            },
            {
                question:
                    "What is your favorite thing about working in BOSS (bitcoin open-source software)?",
                answer: (
                    <>
                        <p>
                            The fact that{" "}
                            <strong className="font-semibold">
                                what I build belongs to everyone
                            </strong>
                            . When this implementation lands in secp256k1-zkp,
                            any Bitcoin project can use it, not just the ones
                            funding me. That feels meaningfully different from
                            building a feature for one company&apos;s product.
                            Also, it&apos;s the community. I&apos;m not someone
                            who naturally dominates discussions; I&apos;m more
                            of a listener. But in this space, that actually
                            works in your favour. The conversations happening on{" "}
                            <ExtLink href="https://delvingbitcoin.org/">
                                Delving Bitcoin
                            </ExtLink>
                            , in pull request reviews, in mailing groups, in
                            mentorship sessions... they&apos;re dense,
                            technical, and genuinely worth paying attention to.
                        </p>
                        <Callout>
                            I learn something new almost every day just by being
                            around people who think deeply about these problems.
                        </Callout>
                    </>
                )
            },
            {
                question:
                    "What are some of the unique challenges of working in BOSS? What are things that may sound unexpected to people outside of the ecosystem?",
                answer: (
                    <>
                        <p>
                            Autonomy is both the best and the hardest part.
                            Nobody is handing you a ticket and saying,
                            &quot;build this by Friday.&quot;{" "}
                            <strong className="font-semibold">
                                You have to develop your own judgment about
                                what&apos;s technically sound, what&apos;s worth
                                pursuing, and what&apos;s ready to share.
                            </strong>{" "}
                            That&apos;s a skill in itself, and it takes time to
                            build.
                        </p>
                        <p>
                            Something that genuinely surprised me is how much of
                            the work is communication. You&apos;re writing BIPs,
                            posting on Bitcoin groups, explaining your reasoning
                            in pull request reviews, and writing documentation.
                            The implementation is only part of it.{" "}
                            <strong className="font-semibold">
                                If you can&apos;t articulate why your approach
                                is correct and why it matters, the work
                                doesn&apos;t land the way it should.
                            </strong>
                        </p>
                    </>
                )
            },
            {
                question: "How is this different from other jobs you have had?",
                answer: (
                    <p>
                        In my previous roles, the feedback loops and the goals
                        were fast: ship the feature, fix the bug, keep the
                        system running. But here, I might spend weeks deep in a
                        research paper before writing a single line of code, and
                        that&apos;s not only acceptable; it&apos;s necessary.
                        It&apos;s also the first time I feel like my
                        mathematical background is genuinely being used.
                    </p>
                )
            }
        ]
    },
    {
        slug: "chuks",
        name: "Chuks",
        role: "Lightning Developer",
        avatar: "/images/get-funded/people/chuks.webp",
        available: true,
        card: {
            quote: "Three months after I graduated from the Chaincode BOSS 2025 program, I was able to show enough proof-of-work to get a Btrust Starter grant.",
            focus: "LDK, Human Readable Addresses, Splice Batching",
            fundingOrg: "Btrust",
            fundingStory: "Funded within ~3 months after entering BOSS"
        },
        qa: [
            {
                question:
                    "Who are you, what do you work on, and how are you funded?",
                answer: (
                    <p>
                        My name is Chuks and I am a software developer with 9+
                        years professional experience. I currently contribute to{" "}
                        <ExtLink href="https://lightningdevkit.org/">
                            LDK/LDK-Node
                        </ExtLink>{" "}
                        with support from{" "}
                        <ExtLink href="https://www.btrust.tech/">
                            Btrust
                        </ExtLink>
                        .
                    </p>
                )
            },
            {
                question:
                    "What areas do you specialize in and what is your day-to-day like?",
                answer: (
                    <p>
                        I recently{" "}
                        <ExtLink href="https://github.com/bitcoin/bips/blob/master/bip-0353.mediawiki">
                            integrated{" "}
                            <strong className="font-semibold">BIP-353</strong>{" "}
                            into LDK-Node
                        </ExtLink>
                        , which uses DNSSEC infrastructure to allow users to
                        send payments to Human-Readable Names—a huge win for
                        privacy and usability. Currently, I&apos;m researching
                        and implementing{" "}
                        <ExtLink href="https://bitcoinops.org/en/topics/splicing/">
                            Splice
                        </ExtLink>{" "}
                        Batching to significantly reduce on-chain fees by
                        consolidating multiple transactions into a single
                        splice. My day-to-day is a mix of proactive rebasing,
                        deep-diving into PRs in the LDK repos to stay
                        synchronized with the ecosystem, and engaging with peer
                        reviews.
                    </p>
                )
            },
            {
                question:
                    "What was your entrypoint into bitcoin open-source software (BOSS)? What is your background and how did you get started?",
                answer: (
                    <>
                        <p>
                            The first time I encountered BOSS was in September
                            2024 when I integrated LNBITS into a web-app I was
                            working on. The first time I got in-depth knowledge
                            of BOSS was in December 2024 when I signed-up for
                            the{" "}
                            <ExtLink href="https://learning.chaincode.com/">
                                Chaincode BOSS
                            </ExtLink>{" "}
                            2025 program. We were given a challenge that
                            required us exploring the{" "}
                            <ExtLink href="https://github.com/bitcoin/bitcoin">
                                Bitcoin Core codebase
                            </ExtLink>
                            .
                        </p>
                        <Callout>
                            The Chaincode BOSS 2025 program was my official
                            entry point as it provided the clarity I needed to
                            start making meaningful contributions.
                        </Callout>
                        <p>
                            Before BOSS 2025, I was a freelance Software dev
                            building &amp; maintaining web &amp; mobile apps for
                            clients in Nigeria. I was also working on my own
                            start-up projects (which I still do).
                        </p>
                    </>
                )
            },
            {
                question:
                    "What has the journey been like to get to where you are now? How did you get funded for the first time?",
                answer: (
                    <p>
                        <strong className="font-semibold">
                            The journey has been rewarding! All the time spent
                            getting familiar with the ecosystem eventually paid
                            off.
                        </strong>{" "}
                        Three months after I graduated from the Chaincode BOSS
                        2025 program, I was able to show enough proof-of-work to
                        get a Btrust Starter grant.
                    </p>
                )
            },
            {
                question:
                    "What is your favorite thing about working in BOSS (bitcoin open-source software)?",
                answer: (
                    <>
                        <p>
                            Working in BOSS is the perfect hack for my career as
                            it aligns perfectly with my need for freedom to
                            choose the work I do and determine the impact I am
                            able to make. I quit my 9 - 5 Software Dev job
                            during COVID to focus on freelancing and building a
                            start-up.
                        </p>
                        <Callout>
                            Working in BOSS has given me great stability
                            that&apos;s even better than what I had when I was
                            doing 9 - 5, but with the added benefit of not
                            taking away my freedom to choose what to work on and
                            how much impact I can make.
                        </Callout>
                    </>
                )
            },
            {
                question:
                    "What are some of the unique challenges of working in BOSS? What are things that may sound unexpected to people outside of the ecosystem?",
                answer: (
                    <p>
                        Working in BOSS is almost like being an entrepreneur, it
                        gets lonely at times and a whole lot of times you need
                        to rely on your decision-making skills in order to
                        navigate the ecosystem effectively. You need to be
                        willing to admit what you do not know and be open to
                        learning. It also requires self-motivation and focus.
                    </p>
                )
            },
            {
                question: "How is this different from other jobs you have had?",
                answer: (
                    <p>
                        The freedom is unmatched. It&apos;s like a hybrid of 9 -
                        5 work and entrepreneurship.
                    </p>
                )
            }
        ]
    }
]

export const getPathStory = (slug: string) =>
    PATH_STORIES.find((person) => person.slug === slug)
