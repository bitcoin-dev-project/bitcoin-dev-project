"use client"
import React, { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Field {
    name: string
    start: number
    end: number
}

interface HexHighlighterProps {
    hexString: string
    fields: Field[]
    title: string
}

const GameState = {
    Explanation: "explanation",
    Playing: "playing",
    ShowingResult: "showingResult"
} as const

type GameStateType = (typeof GameState)[keyof typeof GameState]

const HexTransactionHighlighter: React.FC<HexHighlighterProps> = ({
    hexString,
    fields,
    title
}) => {
    const [gameState, setGameState] = useState<GameStateType>(
        GameState.Explanation
    )
    const [currentStep, setCurrentStep] = useState(-1)
    const [score, setScore] = useState(0)
    const [isIncorrect, setIsIncorrect] = useState(false)
    const [highlightedField, setHighlightedField] = useState<string | null>(
        null
    )
    const [isAnswered, setIsAnswered] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        audioRef.current = new Audio("/images/wrong.mp3")
        if (audioRef.current) {
            audioRef.current.volume = 0.5 // Reduce volume to 50%
        }
    }, [])

    const playErrorSound = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0 // Reset audio to start
            audioRef.current
                .play()
                .catch((e) => console.error("Error playing sound:", e))
        }
    }, [])

    const handleClick = (index: number) => {
        if (isAnswered) return
        const clickedField = fields[currentStep]
        if (index >= clickedField.start && index < clickedField.end) {
            setScore(score + 1)
            setHighlightedField(clickedField.name)
            setIsAnswered(true)
        } else {
            setIsIncorrect(true)
            playErrorSound()
            setTimeout(() => setIsIncorrect(false), 150)
        }
    }

    const showAnswer = () => {
        if (!isAnswered) {
            setHighlightedField(fields[currentStep].name)
            setIsAnswered(true)
        }
    }

    const nextQuestion = () => {
        if (currentStep < fields.length - 1) {
            setCurrentStep(currentStep + 1)
            setHighlightedField(null)
            setIsAnswered(false)
        } else {
            setGameState(GameState.ShowingResult)
        }
    }

    const startGame = () => {
        setGameState(GameState.Playing)
        setCurrentStep(0)
    }

    const resetGame = () => {
        setGameState(GameState.Explanation)
        setCurrentStep(-1)
        setScore(0)
        setHighlightedField(null)
        setIsAnswered(false)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-vscode-container-light dark:bg-vscode-container-dark rounded-lg text-vscode-text-light dark:text-vscode-text-dark font-normal shadow-md overflow-hidden"
        >
            {/* Header */}
            <div className="bg-vscode-titleBar-light dark:bg-vscode-titleBar-dark text-vscode-sidebarForeground-light dark:text-vscode-sidebarForeground-dark p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="text-lg font-medium">{title}</div>
                    <div className="text-lg font-medium">Score: {score}</div>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <div className="text-base">
                        {gameState === GameState.Playing
                            ? `Round ${currentStep + 1} of ${fields.length}`
                            : "Get ready!"}
                    </div>
                </div>
                <div className="w-full bg-vscode-lineNumber-light dark:bg-vscode-lineNumber-dark h-2 rounded-full">
                    <motion.div
                        className="bg-orange-500 h-2 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{
                            width: `${((currentStep + 1) / fields.length) * 100}%`
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 60,
                            damping: 12
                        }}
                    />
                </div>
            </div>

            {/* Body */}
            <div className="p-6 bg-vscode-background-light dark:bg-vscode-background-dark">
                <AnimatePresence mode="wait">
                    {gameState === GameState.Playing && (
                        <motion.div
                            key="explanation"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <p className="mb-4 text-lg">
                                Welcome to the {title}! Your task is to identify
                                different parts of the hex string.
                            </p>
                            <motion.button
                                onClick={startGame}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600"
                            >
                                Start Challenge
                            </motion.button>
                        </motion.div>
                    )}
                    {gameState === GameState.Playing && (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <p className="mb-4 text-lg">
                                Click on the{" "}
                                <span className="font-bold text-orange-500">
                                    {fields[currentStep].name}
                                </span>{" "}
                                in the hex string.
                            </p>
                            <motion.div
                                className="bg-vscode-input-light dark:bg-vscode-input-dark p-4 rounded-md overflow-x-auto mb-4"
                                animate={{
                                    backgroundColor: isIncorrect
                                        ? "rgb(248, 113, 113)"
                                        : undefined
                                }}
                                transition={{ duration: 0.1 }}
                            >
                                <div className="hex-container font-mono text-sm">
                                    {hexString.split("").map((char, index) => (
                                        <motion.span
                                            key={index}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{
                                                delay: index * 0.001
                                            }}
                                            className={`cursor-pointer ${
                                                highlightedField ===
                                                    fields[currentStep].name &&
                                                index >=
                                                    fields[currentStep].start &&
                                                index < fields[currentStep].end
                                                    ? "bg-green-500 text-white"
                                                    : "text-vscode-text-light dark:text-vscode-text-dark"
                                            }`}
                                            onClick={() => handleClick(index)}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                    {gameState === GameState.ShowingResult && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <h3 className="text-2xl font-bold mb-4">
                                Congratulations!
                            </h3>
                            <p className="text-lg mb-4">
                                You've completed all rounds.
                            </p>
                            <p className="text-xl font-semibold text-orange-500 mb-6">
                                Final Score: {score}/{fields.length}
                            </p>
                            <motion.button
                                onClick={resetGame}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600"
                            >
                                Play Again
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="bg-vscode-input-light dark:bg-vscode-input-dark p-4 flex justify-end">
                {gameState === GameState.Playing && (
                    <>
                        <button
                            onClick={showAnswer}
                            disabled={isAnswered}
                            className={`bg-vscode-navButton-light dark:bg-vscode-navButton-dark text-vscode-text-light dark:text-vscode-text-dark font-bold py-2 px-4 rounded mr-2 ${
                                isAnswered
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-vscode-hover-light dark:hover:bg-vscode-hover-dark"
                            }`}
                        >
                            Hint
                        </button>
                        <motion.button
                            onClick={nextQuestion}
                            disabled={!isAnswered}
                            whileHover={{ scale: isAnswered ? 1.05 : 1 }}
                            whileTap={{ scale: isAnswered ? 0.95 : 1 }}
                            className={`bg-orange-500 text-white font-bold py-2 px-4 rounded ${
                                isAnswered
                                    ? "hover:bg-orange-600"
                                    : "opacity-50 cursor-not-allowed"
                            }`}
                        >
                            {currentStep < fields.length - 1
                                ? "Next"
                                : "Show Result"}
                        </motion.button>
                    </>
                )}
            </div>
            <style jsx>{`
                .hex-container {
                    word-break: break-all;
                    white-space: pre-wrap;
                }
            `}</style>
        </motion.div>
    )
}

export default HexTransactionHighlighter
