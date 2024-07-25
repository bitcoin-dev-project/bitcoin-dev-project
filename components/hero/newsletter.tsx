import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline"
import MailchimpSubscribeForm from "../subscribe-to-newsletter"

export default function Newsletter() {
    return (
        <div className="relative isolate overflow-hidden py-8 sm:py-12 lg:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight dark:text-white text-black sm:text-4xl">
                            Subscribe to the TLDR newsletter.
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-black-500 dark:text-black-500">
                            We deliver a summary of every post on bitcoin-dev,
                            lightning-dev and delving bitcoin mailing lists to
                            your inbox every Monday.
                        </p>
                        <MailchimpSubscribeForm />
                    </div>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                        <div className="flex flex-col items-start">
                            <div className="rounded-md dark:bg-black/5 p-2 ring-1 ring-white/10">
                                <CalendarDaysIcon
                                    className="h-6 w-6 text-black dark:text-white"
                                    aria-hidden="true"
                                />
                            </div>
                            <dt className="mt-4 font-semibold text-black dark:text-white">
                                Weekly Posts
                            </dt>
                            <dd className="mt-2 leading-7 text-black-500 dark:text-black-500">
                                Receive curated weekly updates on the most
                                important Bitcoin and Lightning Network
                                developments.
                            </dd>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="rounded-md dark:bg-black/5 p-2 ring-1 ring-white/10">
                                <HandRaisedIcon
                                    className="h-6 w-6 text-black dark:text-white"
                                    aria-hidden="true"
                                />
                            </div>
                            <dt className="mt-4 font-semibold text-black dark:text-white">
                                No spam
                            </dt>
                            <dd className="mt-2 leading-7 text-black-500  dark:text-black-500">
                                We respect your privacy. You'll only receive
                                high-quality content relevant to Bitcoin
                                development.
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div
                className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
                aria-hidden="true"
            >
                <div
                    className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#fbd28c] to-[#f1760f] opacity-30"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                    }}
                />
            </div>
        </div>
    )
}
