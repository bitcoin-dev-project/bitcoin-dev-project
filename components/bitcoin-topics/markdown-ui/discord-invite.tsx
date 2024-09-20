"use client"

import React, { useState } from "react"
import { FaDiscord } from "react-icons/fa"
import { motion } from "framer-motion"

const DiscordInvite: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.a
            href="https://discord.com/invite/EAy9XMufbY"
            target="_blank"
            rel="noopener noreferrer"
            className="not-prose group flex items-center justify-between bg-white dark:bg-vscode-navigation-dark text-gray-800 dark:text-white rounded-xl p-6 max-w-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden relative border border-gray-200 dark:border-gray-700"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div className="flex items-center space-x-4 z-10">
                <motion.div
                    animate={{
                        y: isHovered ? -5 : 0,
                        rotate: isHovered ? -10 : 0
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <FaDiscord
                        size={40}
                        className="text-orange-500 dark:text-orange-400"
                    />
                </motion.div>
                <div>
                    <h3 className="text-xl font-bold mb-1">Join Our Discord</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Learn, collaborate, or contribute, you're part of
                        community passionate about Bitcoin!
                    </p>
                </div>
            </div>
            <motion.div
                className="absolute right-8 top-1/2 transform -translate-y-1/2"
                animate={{
                    x: [0, 10, 0],
                    opacity: 1
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut"
                    }
                }}
            >
                <span className="text-orange-500 dark:text-orange-400 text-2xl">
                    &rarr;
                </span>
            </motion.div>
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
        </motion.a>
    )
}

export default DiscordInvite
