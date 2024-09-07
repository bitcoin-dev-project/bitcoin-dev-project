"use client"
import React, { useState } from "react"
import { motion, Variants } from "framer-motion"

const MailingListSignup = () => {
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [effectType, setEffectType] = useState<"shimmer" | "colorChange">(
        "shimmer"
    )
    const [mailchimpResponse, setMailchimpResponse] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
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
                body: JSON.stringify({ email, firstName })
            })

            setLoading(false)
            if (response.ok) {
                const data = await response.json()
                setMailchimpResponse(data.message)
                setFirstName("")
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

    const shimmerVariants: Variants = {
        animate: {
            backgroundPosition: ["0 0", "100% 0"],
            transition: {
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
                ease: "linear"
            }
        }
    }

    const colorChangeVariants: Variants = {
        animate: {
            backgroundColor: [
                "#f1760f",
                "#f7931a",
                "#fbd28c",
                "#fde9c8",
                "#f1760f"
            ],
            transition: {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
            }
        }
    }

    return (
        <div className="my-6 p-4 bg-vscode-background-light dark:bg-vscode-background-dark rounded-lg shadow-md border border-vscode-border-light dark:border-vscode-border-dark">
            <div className="text-lg font-semibold text-vscode-text-light dark:text-vscode-text-dark mb-2">
                Get Smarter About Bitcoin
            </div>
            <p className="text-sm text-vscode-text-light dark:text-vscode-text-dark mb-3">
                Learn one focused Bitcoin concept each week, explained with
                engaging visuals.
                <span className="italic font-medium">
                    <br /> No information overload, No spam, unsubscribe
                    anytime.
                </span>
            </p>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2"
            >
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name (optional)"
                    className="flex-grow px-3 py-2 text-sm border border-vscode-border-light dark:border-vscode-border-dark rounded-md sm:rounded-r-none focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-vscode-input-light dark:bg-vscode-input-dark text-vscode-text-light dark:text-vscode-text-dark"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-grow px-3 py-2 text-sm border border-vscode-border-light dark:border-vscode-border-dark rounded-md sm:rounded-none focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-vscode-input-light dark:bg-vscode-input-dark text-vscode-text-light dark:text-vscode-text-dark"
                    required
                />
                <motion.button
                    type="submit"
                    className={`px-4 py-2 text-white text-sm font-medium rounded-md sm:rounded-l-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-vscode-background-dark ${
                        effectType === "shimmer"
                            ? "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-[length:200%_100%]"
                            : ""
                    } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                    variants={
                        effectType === "shimmer"
                            ? shimmerVariants
                            : colorChangeVariants
                    }
                    animate="animate"
                    disabled={loading}
                >
                    Subscribe
                </motion.button>
            </form>

            {(mailchimpResponse || error) && (
                <div className="mt-2">
                    {mailchimpResponse && (
                        <p className="text-green-500 text-sm">
                            {mailchimpResponse}
                        </p>
                    )}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
            )}
        </div>
    )
}

export default MailingListSignup
