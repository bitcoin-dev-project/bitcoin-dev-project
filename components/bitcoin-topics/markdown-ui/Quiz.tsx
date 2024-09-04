"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    ArrowRight,
    CheckCircle,
    RotateCcw,
    Send,
    ThumbsUp,
    XCircle,
    Flag
} from "lucide-react"

interface ButtonProps {
    children: React.ReactNode
    onClick: () => void
    disabled?: boolean
    icon: React.ReactNode
}

const Button = ({ children, onClick, disabled = false, icon }: ButtonProps) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-5 py-2 rounded-lg flex items-center justify-between 
                ${
                    disabled
                        ? "bg-vscode-navigation-light dark:bg-vscode-navigation-dark text-vscode-lineNumber-light dark:text-vscode-lineNumber-dark cursor-not-allowed"
                        : "bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-500 dark:text-white dark:hover:bg-orange-600"
                }
                transition-colors duration-200 text-sm`}
    >
        <span className="font-semibold">{children}</span>
        <div className="flex items-center">
            <div className="w-px h-4 bg-vscode-lineNumber-light dark:bg-vscode-lineNumber-dark mx-2"></div>
            {icon}
        </div>
    </button>
)

interface Question {
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
}

interface QuizProps {
    questions: Question[]
    questionText?: string
    showResult?: boolean
}

const Quiz = ({
    questions,
    questionText = "",
    showResult = true
}: QuizProps) => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string>("")
    const [showExplanation, setShowExplanation] = useState<boolean>(false)
    const [isCorrect, setIsCorrect] = useState<boolean>(false)
    const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0)
    const [quizCompleted, setQuizCompleted] = useState<boolean>(false)

    const handleAnswerClick = (answer: string): void => {
        setSelectedAnswer(answer)
    }

    const handleSubmit = (): void => {
        const correct =
            selectedAnswer === questions[currentQuestion].correctAnswer
        setIsCorrect(correct)
        setShowExplanation(true)
        if (correct) {
            setCorrectAnswersCount((prevCount) => prevCount + 1)
        }
    }

    const handleNextQuestion = (): void => {
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion)
            setSelectedAnswer("")
            setShowExplanation(false)
            setIsCorrect(false)
        }
    }

    const handleFinish = (): void => {
        setQuizCompleted(true)
    }

    const handleReset = (): void => {
        setCurrentQuestion(0)
        setSelectedAnswer("")
        setShowExplanation(false)
        setIsCorrect(false)
        setCorrectAnswersCount(0)
        setQuizCompleted(false)
    }

    const totalQuestions = questions.length

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            {questionText && (
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-vscode-text-light dark:text-vscode-text-dark">
                    {questionText}
                </h2>
            )}
            {!quizCompleted ? (
                <>
                    <div className="mb-4">
                        <h3 className="text-md font-medium mb-2 text-vscode-text-light dark:text-vscode-text-dark">
                            {questions[currentQuestion].question}
                        </h3>
                    </div>
                    <div className="space-y-2 mb-4">
                        {questions[currentQuestion].options.map(
                            (option, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => handleAnswerClick(option)}
                                    disabled={showExplanation}
                                    className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 
                                        ${
                                            showExplanation
                                                ? option ===
                                                  questions[currentQuestion]
                                                      .correctAnswer
                                                    ? "bg-vscode-success-light dark:bg-vscode-success-dark"
                                                    : option === selectedAnswer
                                                      ? "bg-vscode-error-light dark:bg-vscode-error-dark"
                                                      : "bg-vscode-navigation-light dark:bg-vscode-navigation-dark"
                                                : "bg-vscode-navigation-light dark:bg-vscode-navigation-dark hover:bg-vscode-hover-light dark:hover:bg-vscode-hover-dark"
                                        }
                                        text-sm text-vscode-text-light dark:text-vscode-text-dark`}
                                    animate={
                                        selectedAnswer === option
                                            ? { scale: 1.05 }
                                            : { scale: 1 }
                                    }
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 17
                                    }}
                                >
                                    <motion.span
                                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs
                              border-2 ${
                                  selectedAnswer === option && !showExplanation
                                      ? "bg-orange-500 text-white border-orange-500"
                                      : "border-vscode-lineNumber-light dark:border-vscode-lineNumber-dark text-vscode-text-light dark:text-vscode-text-dark"
                              }
                              ${
                                  showExplanation &&
                                  option ===
                                      questions[currentQuestion].correctAnswer
                                      ? "bg-vscode-success-light dark:bg-vscode-success-dark border-vscode-success-light dark:border-vscode-success-dark text-white"
                                      : ""
                              }
                              ${
                                  showExplanation &&
                                  option === selectedAnswer &&
                                  option !==
                                      questions[currentQuestion].correctAnswer
                                      ? "bg-vscode-error-light dark:bg-vscode-error-dark text-white border-vscode-error-light dark:border-vscode-error-dark"
                                      : ""
                              }`}
                                    >
                                        {index + 1}
                                    </motion.span>
                                    <span className="flex-grow">{option}</span>
                                    <AnimatePresence>
                                        {showExplanation &&
                                            option ===
                                                questions[currentQuestion]
                                                    .correctAnswer && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        scale: 0
                                                    }}
                                                >
                                                    <CheckCircle
                                                        className="text-vscode-success-light dark:text-vscode-success-dark"
                                                        size={20}
                                                    />
                                                </motion.div>
                                            )}
                                    </AnimatePresence>
                                </motion.button>
                            )
                        )}
                    </div>
                    <div className="flex justify-end space-x-2">
                        {!showExplanation ? (
                            <Button
                                onClick={handleSubmit}
                                disabled={!selectedAnswer}
                                icon={<Send size={16} />}
                            >
                                SUBMIT
                            </Button>
                        ) : currentQuestion < totalQuestions - 1 ? (
                            <Button
                                onClick={handleNextQuestion}
                                icon={<ArrowRight size={16} />}
                            >
                                NEXT
                            </Button>
                        ) : (
                            <Button
                                onClick={handleFinish}
                                icon={<Flag size={16} />}
                            >
                                FINISH
                            </Button>
                        )}
                    </div>

                    <AnimatePresence>
                        {showExplanation && (
                            <motion.div
                                className={`mt-4 p-3 rounded-lg text-sm ${
                                    isCorrect
                                        ? "bg-vscode-success-light dark:bg-vscode-success-dark text-vscode-text-light dark:text-vscode-text-dark"
                                        : "bg-vscode-error-light dark:bg-vscode-error-dark text-vscode-text-light dark:text-vscode-text-dark"
                                }`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-center space-x-2 mb-2">
                                    {isCorrect ? (
                                        <CheckCircle
                                            className="text-vscode-text-light dark:text-vscode-text-dark"
                                            size={20}
                                        />
                                    ) : (
                                        <XCircle
                                            className="text-vscode-text-light dark:text-vscode-text-dark"
                                            size={20}
                                        />
                                    )}
                                    <span className="font-semibold">
                                        {isCorrect ? "Correct!" : "Incorrect"}
                                    </span>
                                </div>
                                <p>{questions[currentQuestion].explanation}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                <motion.div
                    className="mt-4 p-5 rounded-lg bg-vscode-background-light dark:bg-vscode-background-dark text-vscode-text-light dark:text-vscode-text-dark"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex flex-col items-center space-y-4">
                        {correctAnswersCount === totalQuestions ? (
                            <ThumbsUp
                                className="text-vscode-success-light dark:text-vscode-success-dark"
                                size={50}
                            />
                        ) : (
                            <XCircle
                                className="text-vscode-error-light dark:text-vscode-error-dark"
                                size={50}
                            />
                        )}
                        <h4 className="font-semibold text-lg">
                            Quiz Completed!
                        </h4>
                        {showResult && (
                            <p className="text-md">
                                You got {correctAnswersCount} out of{" "}
                                {totalQuestions} questions correct.
                            </p>
                        )}
                        <Button
                            onClick={handleReset}
                            icon={<RotateCcw size={20} />}
                        >
                            RESET QUIZ
                        </Button>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default Quiz
