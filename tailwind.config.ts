import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/pliny/**/*.js",
        "./layouts/**/*.{js,ts,tsx}",
        "./public/glossary/**/*.mdx"
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                orange: {
                    DEFAULT: "#ff440b",
                    "50": "#fff3ea",
                    "100": "#ffe4d1",
                    "200": "#ffc5a3",
                    "300": "#ff9c6b",
                    "400": "#ff6a33",
                    "500": "#ff440b",
                    "600": "#ff2700",
                    "700": "#ca1601",
                    "800": "#a3150b",
                    "900": "#83140b",
                    "950": "#490504"
                },
                white: {
                    DEFAULT: "#f4f4f5",
                    "50": "#f4f4f5",
                    "100": "#f4f4f5",
                    "200": "#f4f4f5",
                    "300": "#f4f4f5",
                    "400": "#f4f4f5",
                    "500": "#f4f4f5",
                    "600": "#f4f4f5",
                    "700": "#f4f4f5",
                    "800": "#f4f4f5",
                    "900": "#f4f4f5",
                    "950": "#f4f4f5"
                },

                gray: {
                    DEFAULT: "#71717a",
                    "50": "#fafafa",
                    "100": "#f4f4f5",
                    "200": "#e4e4e7",
                    "300": "#d4d4d8",
                    "400": "#a1a1aa",
                    "500": "#71717a",
                    "600": "#52525b",
                    "700": "#3f3f46",
                    "800": "#27272a",
                    "900": "#18181b",
                    "950": "#09090b"
                },
                black: {
                    DEFAULT: "#18181b",
                    "50": "#fafafa",
                    "100": "#f4f4f5",
                    "200": "#e4e4e7",
                    "300": "#d4d4d8",
                    "400": "#a1a1aa",
                    "500": "#71717a",
                    "600": "#52525b",
                    "700": "#3f3f46",
                    "800": "#27272a",
                    "900": "#18181b",
                    "950": "#09090b"
                }
            },
            fontFamily: {
                brawler: ["var(--brawler-font)"],
                inter: ["var(--inter-font)"]
            }
        }
    },
    plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
}
export default config
