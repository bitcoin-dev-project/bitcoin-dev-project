import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/pliny/**/*.js",
        "./layouts/**/*.{js,ts,tsx}",
        "./public/bitcoin-topics/**/*.mdx"
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                orange: {
                    DEFAULT: "#f1760f",
                    "50": "#fff8eb",
                    "100": "#fde9c8",
                    "200": "#fbd28c",
                    "300": "#f9b450",
                    "400": "#f7931a",
                    "500": "#f1760f",
                    "600": "#e56c0d",
                    "700": "#d9630b",
                    "800": "#cc5a0a",
                    "900": "#bf5109",
                    "950": "#b24808"
                },
                white: {
                    DEFAULT: "#FFF",
                    "50": "#FAFAFA",
                    "100": "#FAFAFA",
                    "200": "#FAFAFA",
                    "300": "#FAFAFA",
                    "400": "#FAFAFA",
                    "500": "#FAFAFA",
                    "600": "#FAFAFA",
                    "700": "#FAFAFA",
                    "800": "#FAFAFA",
                    "900": "#FAFAFA",
                    "950": "#FAFAFA"
                },

                gray: {
                    DEFAULT: "#696a71",
                    "50": "#f5f5f6",
                    "100": "#e5e5e8",
                    "200": "#cfd0d2",
                    "300": "#adaeb3",
                    "400": "#84858c",
                    "500": "#696a71",
                    "600": "#595961",
                    "700": "#4c4d52",
                    "800": "#434347",
                    "900": "#3b3b3e",
                    "950": "#1c1c1e"
                },
                black: {
                    DEFAULT: "#1c1c1e",
                    "50": "#f5f5f6",
                    "100": "#e5e5e8",
                    "200": "#cfd0d2",
                    "300": "#adaeb3",
                    "400": "#84858c",
                    "500": "#696a71",
                    "600": "#595961",
                    "700": "#4c4d52",
                    "800": "#434347",
                    "900": "#3b3b3e",
                    "950": "#1c1c1e"
                },
                darkgray: {
                    DEFAULT: "#1a1a1c",
                    "50": "#2a2a2c",
                    "100": "#242426",
                    "200": "#1e1e20",
                    "300": "#18181a",
                    "400": "#141416",
                    "500": "#101012",
                    "600": "#0c0c0e",
                    "700": "#08080a",
                    "800": "#040406",
                    "900": "#000002",
                    "950": "#000000"
                }
            },
            keyframes: {
                updown: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" }
                },
                leftright: {
                    "0%, 100%": { transform: "translateX(0)" },
                    "50%": { transform: "translateX(-10px)" }
                }
            },
            animation: {
                updown: "updown 2s infinite",
                leftright: "leftright 1.5s infinite"
            },
            fontFamily: {
                brawler: ["var(--brawler-font)"],
                inter: ["var(--inter-font)"]
            },
            fontSize: {
                lg: ["17px", "28px"]
            }
        }
    },
    plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
}
export default config
