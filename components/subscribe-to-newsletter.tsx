"use client"

import React from "react"

const MailchimpSubscribeForm = () => {
    const [email, setEmail] = React.useState("")
    const [mailchimpResponse, setMailchimpResponse] = React.useState("")
    const [error, setError] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        <div className="">
            <div id="mc_embed_shell">
                <div id="mc_embed_signup">
                    <form
                        onSubmit={handleSubmit}
                        method="post"
                        id="mc-embedded-subscribe-form"
                        name="mc-embedded-subscribe-form"
                        className="validate"
                    >
                        <div
                            id="mc_embed_signup_scroll"
                            className="mt-6 flex max-w-md gap-x-4"
                        >
                            <div className="mc-field-group w-full">
                                <input
                                    type="email"
                                    name="EMAIL"
                                    className="required email w-full flex-auto rounded-md border-0 dark:bg-black/5 px-3.5 py-2 text-black dark:text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                    id="mce-EMAIL"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                                <span
                                    id="mce-EMAIL-HELPERTEXT"
                                    className="helper_text"
                                ></span>
                            </div>
                            <div hidden>
                                <input
                                    type="hidden"
                                    name="tags"
                                    value="6514641"
                                />
                            </div>
                            <div
                                aria-hidden="true"
                                className="absolute left-[-5000px]"
                            >
                                <input
                                    type="text"
                                    name="b_718f9c0ab4af9b4acf93a8e6f_6d27e4b5b0"
                                    tabIndex={-1}
                                    readOnly
                                />
                            </div>
                            <div className="clear">
                                <input
                                    type="submit"
                                    name="subscribe"
                                    id="mc-embedded-subscribe"
                                    className={`button flex-none rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white dark:text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
                                        loading
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    }`}
                                    value="Subscribe"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {mailchimpResponse ||
                            (error && (
                                <div id="mce-responses" className="clear mt-2">
                                    <div className="px-2 pb-4">
                                        {mailchimpResponse && (
                                            <p className="text-green-500">
                                                {mailchimpResponse}
                                            </p>
                                        )}
                                        {error && (
                                            <p className="text-red-500">
                                                {error}
                                            </p>
                                        )}{" "}
                                    </div>
                                </div>
                            ))}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MailchimpSubscribeForm
