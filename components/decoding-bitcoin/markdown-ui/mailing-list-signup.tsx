"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaEnvelope, FaCheckCircle } from "react-icons/fa"

const MailingListSignup: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false)
    const [email, setEmail] = useState("")
    const [mailchimpResponse, setMailchimpResponse] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

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

    const benefits = [
        "Weekly bitcoin updates",
        "No spam, bitcoin only",
        "New illustrations every Saturday (coming soon)"
    ]

    return (
        <div
            className="not-prose group bg-white dark:bg-vscode-navigation-dark text-gray-800 dark:text-white rounded-xl p-6 sm:p-8 max-w-md hover:shadow-lg transition-all duration-300 overflow-hidden relative border border-gray-200 dark:border-gray-700"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center space-x-4 z-10 mb-5">
                <motion.div
                    animate={{
                        y: isHovered ? -5 : 0,
                        rotate: isHovered ? -10 : 0
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <FaEnvelope
                        size={32}
                        className="text-orange-500 dark:text-orange-400"
                    />
                </motion.div>
                <div>
                    <h3 className="text-lg font-bold">TLDR Newsletter</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Your weekly dose of Bitcoin knowledge
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap items-center mb-5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center mr-4 mb-1">
                        <FaCheckCircle
                            className="text-orange-500 dark:text-orange-400 mr-1"
                            size={12}
                        />
                        <span>{benefit}</span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 mb-5">
                <div className="flex flex-col sm:flex-row">
                    <input
                        type="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Enter your email"
                        className="flex-grow px-3 py-2 text-sm rounded-md sm:rounded-r-none mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-vscode-navigation-dark text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
                        required
                    />
                    <motion.button
                        type="submit"
                        className="px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-md sm:rounded-l-none focus:outline-none focus:ring-2 focus:ring-orange-500 hover:bg-orange-600 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={loading}
                    >
                        {loading ? "Subscribing..." : "Subscribe"}
                    </motion.button>
                </div>
            </form>

            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Join our growing community of Bitcoin learners. Unsubscribe
                anytime.
            </p>

            <AnimatePresence>
                {(mailchimpResponse || error) && (
                    <motion.div
                        className="mt-4 text-xs sm:text-sm font-medium"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {mailchimpResponse && (
                            <p className="text-green-500">
                                {mailchimpResponse}
                            </p>
                        )}
                        {error && <p className="text-red-500">{error}</p>}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="absolute inset-0 bg-orange-100 dark:bg-orange-900 opacity-0"
                initial={{ scale: 0, x: "100%", y: "-100%" }}
                animate={{
                    scale: isHovered ? 2.5 : 0,
                    x: isHovered ? "0%" : "100%",
                    y: isHovered ? "0%" : "-100%",
                    opacity: isHovered ? 0.1 : 0
                }}
                transition={{ duration: 0.5 }}
            />
        </div>
    )
}

export default MailingListSignup
