import { navigation } from "@/content/landing"

export default function Footer() {
    return (
        <footer
            className="bg-white dark:bg-black"
            aria-labelledby="footer-heading"
        >
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="mt-16 border-t border-black-800/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-black-800 dark:text-black-100">
                            Subscribe to our TLDR newsletter
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-black-600 dark:text-black-400">
                            Keep up to date with the latest developments in the
                            Bitcoin space
                        </p>
                    </div>
                    <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            required
                            className="w-full min-w-0 appearance-none rounded-md border-0 bg-white dark:bg-black px-3 py-1.5 text-base text-black-800 dark:text-black-100 shadow-sm ring-1 ring-inset ring-black-300 placeholder:text-black-400 dark:text-black-600 dark:text-black-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:w-56 sm:text-sm sm:leading-6"
                            placeholder="Enter your email"
                        />
                        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                            <button
                                type="submit"
                                className="flex w-full items-center justify-center rounded-md bg-orange-500 dark:bg-orange-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-50 dark:bg-orange-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                            >
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-8 border-t border-black-800/10 pt-8 md:flex md:items-center md:justify-between">
                    <div className="flex space-x-6 md:order-2">
                        {navigation.social.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-black-400 dark:text-black-600 dark:text-black-400 hover:text-black-500"
                            >
                                <span className="sr-only">{item.name}</span>
                                <item.icon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </a>
                        ))}
                    </div>
                    <p className="mt-8 text-sm leading-5 text-black-500 md:order-1 md:mt-0">
                        &copy; 2024 Built with 🧡 by Chaincode Labs x Bitcoin
                        Dev Project
                    </p>
                </div>
            </div>
        </footer>
    )
}
