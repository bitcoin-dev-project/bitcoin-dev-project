export default function Footer() {
    const navigation = {
        solutions: [
            { name: "Marketing", href: "#" },
            { name: "Analytics", href: "#" },
            { name: "Commerce", href: "#" },
            { name: "Insights", href: "#" }
        ],
        support: [
            { name: "Pricing", href: "#" },
            { name: "Documentation", href: "#" },
            { name: "Guides", href: "#" },
            { name: "API Status", href: "#" }
        ],
        company: [
            { name: "About", href: "#" },
            { name: "Blog", href: "#" },
            { name: "Jobs", href: "#" },
            { name: "Press", href: "#" },
            { name: "Partners", href: "#" }
        ],
        legal: [
            { name: "Claim", href: "#" },
            { name: "Privacy", href: "#" },
            { name: "Terms", href: "#" }
        ],
        social: [
            {
                name: "X",
                href: "https://x.com/Bitcoin_Devs",
                icon: (props: any) => (
                    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                        <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                    </svg>
                )
            },
            {
                name: "GitHub",
                href: "https://github.com/bitcoin-dev-project/",
                icon: (props: any) => (
                    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                        <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                        />
                    </svg>
                )
            },
            {
                name: "Discord",
                href: "https://discord.gg/EAy9XMufbY",
                icon: (props: any) => (
                    <svg width="25px" height="25px" viewBox="0 -28.5 256 256">
                        <g>
                            <path
                                d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                                fill="#a1a1aa"
                                fillRule="nonzero"
                            ></path>
                        </g>
                    </svg>
                )
            }
        ]
    }
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
                            className="w-full min-w-0 appearance-none rounded-md border-0 bg-white dark:bg-black px-3 py-1.5 text-base text-black-800 dark:text-black-100 shadow-sm ring-1 ring-inset ring-black-300 placeholder:text-black-400 dark:text-black-600 dark:text-black-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:w-56 sm:text-sm sm:leading-6"
                            placeholder="Enter your email"
                        />
                        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                            <button
                                type="submit"
                                className="flex w-full items-center justify-center rounded-md bg-orange-500 dark:bg-orange-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-50 dark:bg-orange-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
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
