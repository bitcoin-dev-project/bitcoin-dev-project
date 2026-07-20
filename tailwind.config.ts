import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/pliny/**/*.js",
        "./layouts/**/*.{js,ts,tsx}",
        "./public/decoding-bitcoin/**/*.mdx",
        "node_modules/@bitcoin-dev-project/bdp-ui/dist/**/*.{js,mjs,jsx,ts,tsx}"
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Temporary
                "brand-card-bg": "var(--brand-card-bg)",
                "brand-green": "var(--brand-green)",
                "brand-light-100": "var(--brand-light-100)",
                "brand-dark-100": "var(--brand-dark-100)",
                "brand-orange-100": "var(--brand-orange-100)",
                brand: {
                    DEFAULT: "#F6F0E6",
                    stroke: {
                        "on-base": "#E1DBD0"
                    },
                    orange: {
                        DEFAULT: "#F6F0E6",
                        100: "#EB5234"
                    },
                    dark: {
                        DEFAULT: "#201E1E",
                        100: "#201E1E"
                    },

                    gray: {
                        DEFAULT: "#EFE9DE",
                        100: "#E1DBD0",
                        200: "#A9A49B",
                        300: "#6C6C6C"
                    },
                    // get-funded card fill (lighter than brand-gray); from Figma
                    card: "#FFFDF5",
                    blue: {
                        200: "#4B7389"
                    }
                },
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

                // VS Code Theme Colors
                vscode: {
                    background: {
                        light: "#F6F0E6", // brand cream — matches main site background
                        dark: "#1e1e1e"
                    },
                    navigation: {
                        light: "#EFE9DE", // brand gray — one step darker than background
                        dark: "#252526"
                    },
                    input: {
                        light: "#FFFDF5", // brand-card — warm near-white input
                        dark: "#3c3c3c"
                    },
                    text: {
                        light: "#333333",
                        dark: "#d4d4d4"
                    },
                    hover: {
                        light: "#E1DBD0", // brand-gray-100 — warm hover
                        dark: "#3c3c3c"
                    },
                    highlight: {
                        light: "#EFE9DE", // brand-gray — warm highlight
                        dark: "#2d2d2d"
                    },
                    selection: {
                        light: "#add6ff",
                        dark: "#264f78"
                    },
                    lineNumber: {
                        light: "#858585",
                        dark: "#858585"
                    },
                    lineNumberActive: {
                        light: "#333333",
                        dark: "#c6c6c6"
                    },
                    statusBar: {
                        background: {
                            light: "#007acc",
                            dark: "#007acc"
                        },
                        foreground: {
                            light: "#ffffff",
                            dark: "#ffffff"
                        }
                    },
                    header: {
                        background: {
                            light: "#EFE9DE", // brand-gray — warm toolbar
                            dark: "#252526"
                        },
                        foreground: {
                            light: "#333333",
                            dark: "#d4d4d4"
                        }
                    },
                    searchBar: {
                        background: {
                            light: "#FFFDF5", // brand-card — warm near-white
                            dark: "#1e1e1e"
                        },
                        foreground: {
                            light: "#333333",
                            dark: "#d4d4d4"
                        }
                    },
                    navButton: {
                        background: {
                            light: "#E1DBD0", // brand-gray-100 — warm button
                            dark: "#3c3c3c"
                        },
                        foreground: {
                            light: "#333333",
                            dark: "#d4d4d4"
                        }
                    },
                    container: {
                        light: "#EFE9DE", // brand-gray — warm panel
                        dark: "#252526"
                    },
                    success: {
                        light: "#8bc34a", // Lighter green
                        dark: "#689f38" // Darker but not too intense green
                    },
                    error: {
                        light: "#e57373", // Lighter red
                        dark: "#d32f2f" // Darker but not too intense red
                    },
                    file: {
                        light: "#E1DBD0", // brand-gray-100 — warm
                        dark: "#3c3c3c"
                    },
                    selectedFile: {
                        light: "#f1760f", // brand orange — matches dark, active file
                        dark: "#f1760f"
                    },
                    sidebarBackground: {
                        light: "#EFE9DE", // brand-gray — warm sidebar
                        dark: "#252526"
                    },
                    sidebarForeground: {
                        light: "#616161",
                        dark: "#cccccc"
                    },
                    editorBackground: {
                        light: "#FFFDF5", // brand-card — warm near-white editor
                        dark: "#1e1e1e"
                    },
                    editorForeground: {
                        light: "#333333",
                        dark: "#d4d4d4"
                    },
                    titleBar: {
                        light: "#E1DBD0", // brand-gray-100 — warm title bar
                        dark: "#3c3c3c"
                    },
                    activityBar: {
                        light: "#2c2c2c",
                        dark: "#333333"
                    },
                    activityBarInactive: {
                        light: "#8f8f8f",
                        dark: "#6b6b6b"
                    },
                    codeSnippetBackground: {
                        light: "#EFE9DE", // brand-gray — warm code panel
                        dark: "#141414" // The color you specified for dark mode
                    }
                },
                warning: {
                    light: "#f1760f", // A light orange color
                    dark: "#d18616" // A darker orange for dark mode
                }
            },
            backgroundImage: {
                footer: "url('/images/footer.webp')",
                "footer-mobile": "url('/images/footer-mobile.webp')",
                "dark-footer": "url('/images/bgdarkfooter.webp')",
                "dark-footer-mobile": "url('/images/mobilebgdarkfooter.webp')"
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
                inter: ["var(--inter-font)"],
                quicksand: ["var(--quicksand-font)"],
                montserrat: ["var(--montserrat-font)"]
            },
            fontSize: {
                lg: ["17px", "28px"]
            },
            maxWidth: {
                "desktop-max": "1440px"
            }
        }
    },
    plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
}
export default config
