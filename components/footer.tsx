import { navigation } from "@/content/landing"
import MailchimpSubscribeForm from "./subscribe-to-newsletter"

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
                    <MailchimpSubscribeForm />
                </div>
                <div className="mt-8 border-t border-black-800/10 pt-8 md:flex md:items-center md:justify-between">
                    <div className="flex space-x-6 md:order-2">
                        {navigation.social.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-black-400 dark:text-black-400 hover:text-black-500"
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
