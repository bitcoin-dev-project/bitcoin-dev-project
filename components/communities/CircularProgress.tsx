import { motion } from "framer-motion"

interface CircularProgressProps {
    progress: number
    size?: number
    strokeWidth?: number
    primaryColor?: string
    secondaryColor?: string
}

export const CircularProgress = ({
    progress,
    size = 120,
    strokeWidth = 8,
    primaryColor = "rgb(249, 115, 22)",
    secondaryColor = "rgba(249, 115, 22, 0.1)"
}: CircularProgressProps) => {
    const center = size / 2
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius

    return (
        <div className="absolute inset-0">
            <svg
                width={size}
                height={size}
                style={{ transform: "rotate(-90deg)" }}
                className="absolute inset-0"
            >
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={secondaryColor}
                    strokeWidth={strokeWidth}
                />
                <motion.circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={primaryColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{
                        strokeDashoffset:
                            circumference - (progress / 100) * circumference
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
            </svg>
        </div>
    )
}
