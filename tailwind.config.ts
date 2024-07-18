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
                    "600": "#d65309",
                    "700": "#b1360c",
                    "800": "#902b10",
                    "900": "#762311",
                    "950": "#440f04"
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
                }
            },
            fontFamily: {
                brawler: ["var(--brawler-font)"],
                inter: ["var(--inter-font)"]
            },
            maxWidth: {
                "8xl": "88rem"
            }
        }
    },
    plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
}
export default config
