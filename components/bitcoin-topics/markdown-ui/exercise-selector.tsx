"use client"
import React, { useState } from "react"
import { Sandpack } from "@codesandbox/sandpack-react"
import { motion, AnimatePresence } from "framer-motion"
import { CodeIcon, PencilIcon, ArrowLeftIcon } from "lucide-react"

type Language = "javascript" | "python"

interface SandpackConfig {
    options?: {
        showLineNumbers?: boolean
        showInlineErrors?: boolean
        editorHeight?: string | number
        [key: string]: any
    }
    customSetup?: {
        dependencies?: {
            [key: string]: string
        }
        [key: string]: any
    }
    files: {
        [key: string]: {
            code: string
            hidden?: boolean
        }
    }
}

interface ExerciseSelectorProps {
    sandpackConfig: SandpackConfig
    trinketUrl: string
}

const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({
    sandpackConfig,
    trinketUrl
}) => {
    const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
        null
    )

    const handleLanguageSelect = (language: Language) => {
        setSelectedLanguage(language)
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    const buttonVariants = {
        hover: { scale: 1.05, backgroundColor: "#f97316" },
        tap: { scale: 0.95 }
    }

    return (
        <motion.div
            className="max-w-5xl mx-auto py-4 full-width"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="bg-vscode-container-light dark:bg-vscode-container-dark rounded-lg text-vscode-text-light dark:text-vscode-text-dark font-normal shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-vscode-titleBar-light dark:bg-vscode-titleBar-dark text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark p-3 flex items-center justify-between">
                    <div className="text-sm font-medium">
                        P2PK ScriptPubKey Decoder Exercise
                    </div>
                    {selectedLanguage && (
                        <motion.button
                            onClick={() => setSelectedLanguage(null)}
                            className="text-sm bg-vscode-button-light dark:bg-vscode-button-dark px-3 py-1 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-200 flex items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowLeftIcon className="w-4 h-4 mr-1" />
                            Change Language
                        </motion.button>
                    )}
                </div>

                {/* Main content */}
                <div className="p-4">
                    <AnimatePresence mode="wait">
                        {!selectedLanguage ? (
                            <motion.div
                                key="language-selection"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative rounded-lg overflow-hidden shadow-lg"
                                style={{
                                    height: "min(calc(100vh - 200px), 500px)"
                                }}
                            >
                                <div className="absolute inset-0 filter blur-[6px]">
                                    <iframe
                                        src={trinketUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: "none", margin: 0 }}
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div className="absolute inset-0 z-10 flex flex-col justify-center items-center bg-[#FFFFFF66] dark:bg-[#1E1E1E66] text-black dark:text-white backdrop-blur-[1px]">
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 0.2,
                                            duration: 0.5
                                        }}
                                        className="text-center"
                                    >
                                        <h2 className="text-4xl font-bold mb-2">
                                            Ready to Code?
                                        </h2>
                                        <p className="text-xl opacity-80 mb-8">
                                            Choose your preferred language to
                                            begin
                                        </p>
                                    </motion.div>
                                    <div className="flex justify-center space-x-4">
                                        {["javascript", "python"].map(
                                            (lang) => (
                                                <motion.button
                                                    key={lang}
                                                    onClick={() =>
                                                        handleLanguageSelect(
                                                            lang as Language
                                                        )
                                                    }
                                                    variants={buttonVariants}
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                    className="px-6 py-3 rounded-lg text-base font-medium transition duration-300 flex items-center bg-orange-500 text-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50 shadow-lg"
                                                >
                                                    {lang === "javascript" ? (
                                                        <CodeIcon className="mr-2 h-5 w-5" />
                                                    ) : (
                                                        <PencilIcon className="mr-2 h-5 w-5" />
                                                    )}
                                                    {lang
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        lang.slice(1)}
                                                </motion.button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="editor"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-vscode-background-light dark:bg-vscode-background-dark rounded-lg"
                                style={{
                                    height: "calc(100vh - 120px)",
                                    minHeight: "400px",
                                    maxHeight: "600px"
                                }}
                            >
                                <div className="h-full bg-vscode-editorBackground-light dark:bg-vscode-editorBackground-dark rounded-lg shadow-inner overflow-hidden">
                                    {selectedLanguage === "javascript" ? (
                                        <Sandpack
                                            template="react"
                                            options={{
                                                externalResources: [
                                                    "https://cdn.tailwindcss.com"
                                                ],
                                                showLineNumbers: true,
                                                showInlineErrors: true,
                                                editorHeight: "100%",
                                                ...sandpackConfig.options
                                            }}
                                            customSetup={
                                                sandpackConfig.customSetup || {}
                                            }
                                            files={sandpackConfig.files}
                                        />
                                    ) : (
                                        <div className="h-full">
                                            <iframe
                                                src={trinketUrl}
                                                width="100%"
                                                height="100%"
                                                style={{
                                                    border: "none",
                                                    margin: 0
                                                }}
                                                allowFullScreen
                                                className="rounded-md shadow-sm"
                                            ></iframe>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )
}

export default ExerciseSelector
