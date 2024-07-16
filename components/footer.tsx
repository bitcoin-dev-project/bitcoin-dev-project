import { FaDiscord, FaGithub } from "react-icons/fa"

const Separator = () => (
    <div className="h-[2px] w-full md:w-auto md:mx-8 bg-custom-stroke" />
)

const GithubLink = () => (
    <a
        href="https://github.com/bitcoin-dev-project/bitcoin-dev-project"
        target="_blank"
        rel="noreferrer"
        className="focus:outline-none"
    >
        <FaGithub className="text-[24px] md:text-[40px]" />
    </a>
)

const DiscordLink = () => (
    <a
        href="https://discord.gg/EAy9XMufbY"
        target="_blank"
        rel="noreferrer"
        className="focus:outline-none"
    >
        <FaDiscord className="text-[28px] md:text-[48px]" />
    </a>
)

const ContactSocials = () => (
    <div className="flex items-center gap-2 md:gap-4 lg:gap-4">
        <GithubLink />
        <DiscordLink />
    </div>
)

const Footer = () => {
    return (
        <footer className="text-custom-primary-text mt-20 bg-custom-background bottom-0 text-center w-full border-t border-custom-stroke text-xs md:text-sm 2xl:text-lg leading-relaxed dark:text-custom-primary-text">
            <div className="flex flex-col md:flex-row justify-center items-center px-8 md:px-40 lg:px-64 p-4 md:p-6 2xl:p-8 w-full max-w-[1920px] mx-auto">
                <div className="md:flex md:items-center md:justify-start">
                    <ContactSocials />
                </div>
                <Separator />
                <p className="flex-1 text-center">
                    Built with <span>🧡</span> by the{" "}
                    <a
                        href="https://bitcoindevs.xyz/"
                        target="_blank"
                        rel="noreferrer"
                        className="underline font-medium text-custom-brightOrange-100"
                    >
                        Bitcoin Dev Project
                    </a>
                </p>
                <Separator />
                <a
                    href="https://cryptpad.fr/form/#/2/form/view/3P2CsohsHOkcH7C+WdtX0-tvqjBHqXnAmz5D9yx0e04/"
                    target="_blank"
                    className="font-semibold text-white focus:outline-none bg-gray-700 dark:bg-gray-300 px-3 py-2 md:py-3 md:px-5 bg-custom-primary-text rounded-xl dark:text-black"
                >
                    Give feedback
                </a>
            </div>
        </footer>
    )
}

export default Footer
