export default function CTA() {
    return (
        <div className="bg-white dark:bg-black">
            <div className="mx-auto max-w-7xl pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-16 lg:px-8">
                <div className="relative isolate overflow-hidden bg-gray-800 px-6 py-20 text-center shadow-2xl sm:rounded-3xl sm:px-16">
                    <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-4xl">
                        Learn, Explore, Contribute{" "}
                        <span className="font-light">today.</span>
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-400">
                        While bitcoin is designed to be resilient, we do need
                        you. Bitcoin needs all the talent and energy it can
                        gather to solve some of the most difficult problems of
                        our time. Bitcoin in your hands changes everything. Join
                        us.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6 ">
                        <a
                            href="https://discord.com/invite/EAy9XMufbY"
                            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Get Started
                        </a>
                        <a
                            href="/about"
                            className="text-sm font-semibold leading-6 text-white"
                        >
                            Learn More <span aria-hidden="true">→</span>
                        </a>
                    </div>
                    <svg
                        viewBox="0 0 1024 1024"
                        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                        aria-hidden="true"
                    >
                        <circle
                            cx={512}
                            cy={512}
                            r={512}
                            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                            fillOpacity="0.7"
                        />
                        <defs>
                            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                                <stop stopColor="#762311" />
                                <stop offset={1} stopColor="#f1760f" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
    )
}
