import clsx from "clsx"
import Image from "next/image"
import React from "react"

const Newsletter = () => {
    const [email, setEmail] = React.useState("")
    const [mailchimpResponse, setMailchimpResponse] = React.useState("")
    const [error, setError] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log(email, "vic")
        e.preventDefault()
        setMailchimpResponse("")
        setError("")
        setLoading(true)

        try {
            const response = await fetch("/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })

            setLoading(false)
            if (response.ok) {
                const data = await response.json()
                setMailchimpResponse(data.message)
                setEmail("")
                return
            }

            if (response.status === 400) {
                const data = await response.json()
                if (data?.title?.toLowerCase().includes("member exists")) {
                    setError("You are already subscribed to our newsletter")
                    return
                }
            }
            throw new Error("Something went wrong. Please try again later.")
        } catch (error: any) {
            setLoading(false)
            console.error(error)
            if (error instanceof Error) {
                setError(error.message)
            }
        }
    }
    return (
        <div className="py-24 relative z-50">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="bg-[#EFE9DE] border-2 border-[#E1DBD0] rounded-[20px] lg:rounded-[40px] overflow-visible relative">
                    <div className="absolute -top-8 -right-3 lg:-top-12 lg:-right-12 z-10">
                        <Image
                            src="/images/mail-icon.svg"
                            alt="Newsletter"
                            width={167}
                            height={120}
                            className="w-20 h-20 lg:w-[167px] lg:h-32 drop-shadow-lg"
                        />
                    </div>
                    <div className="grid lg:grid-cols-2 items-stretch max-w-full lg:gap-x-20 overflow-hidden rounded-[40px]">
                        <div className="space-y-8 p-5 md:p-12 lg:p-16">
                            <div className="flex items-center">
                                <Image
                                    src="/images/tldr-logo.svg"
                                    alt="TLDR"
                                    width={80}
                                    height={28}
                                    className="h-7 w-auto"
                                />
                            </div>

                            <h2 className="text-[2rem] lg:text-5xl font-bold text-brand-dark leading-tight font-montserrat">
                                THE INBOX MVP FOR BITCOIN DEVS
                            </h2>

                            <p className="text-xl text-brand-dark font-quicksand leading-[1.2]">
                                Get weekly summaries of every post and thread on
                                bitcoin-dev and Delving Bitcoin mailing lists to
                                your inbox every Monday.
                            </p>

                            <div>
                                <form
                                    className="flex gap-3 max-w-xl"
                                    method="post"
                                    id="mc-embedded-subscribe-form"
                                    name="mc-embedded-subscribe-form"
                                    onSubmit={handleSubmit}
                                >
                                    <input
                                        type="email"
                                        placeholder="Enter email"
                                        id="mce-EMAIL"
                                         disabled={loading}
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="flex-1 px-2.5 py-4 rounded-[10px] bg-brand-gray border-2 border-brand-gray-100 focus:border-brand-orange-100 focus:outline-none font-quicksand text-brand-dark placeholder:text-brand-gray-300"
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={clsx(
                                            "bg-brand-orange-100 text-white font-bold px-2.5 py-2.5 rounded-xl hover:opacity-90 transition-opacity font-quicksand whitespace-nowrap",
                                            {
                                                "cursor-not-allowed": loading
                                            }
                                        )}
                                    >
                                        Subscribe
                                    </button>
                                </form>
                                {error && (
                                    <p className="text-red-500">{error}</p>
                                )}
                                {mailchimpResponse && (
                                    <p className="text-green-500">
                                        {mailchimpResponse}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="relative flex lg:items-end min-h-[384px] h-full lg:pr-12">
                            <div className="absolute left-0 sm:left-[25%] lg:left-0 h-[384px] w-full bottom-[-30px] sm:bottom-0 ">
                                <div className="relative h-[450px]  md:h-[384px]">
                                    <Image
                                        src="/images/newsletter-preview.webp"
                                        alt="Bitcoin TLDR Newsletter Preview"
                                        fill
                                        className="object-contain absolute object-left w-full px-7 h-[349px] md:w-[475px] md:h-[384px] -bottom- md:bottom-0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newsletter
