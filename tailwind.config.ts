import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "bg-color": "#f8f5ee",
      orange: "#e77429",
      green: "#24b292",
      "bright-cyan": "#30f6ca",
      "dark-orange": "#e77429",
      brown: "#b47235",
      yellow: "#fab544",
      "light-orange": "#ffd796",
      "pale-orange": "#fff2e4",
      "bright-orange": "#f7a940",
      grey: "dimgrey",
      dark: "#333",
      black: "#212529",
      white: "#FFFFFF",
      "light-grey": "#898989",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-94": "linear-gradient(94deg, var(--tw-gradient-stops))",
        "gradient-130": "linear-gradient(130deg, var(--tw-gradient-stops))",
      },
      boxShadow: {
        normal: "0px 4px 8px 0px rgba(0, 0, 0, 0.08)",
        raised: "0px 4px 16px 4px rgba(	249, 206, 159, 0.8)",
      },
      fontFamily: {
        brawler: ["var(--brawler-font)"],
        inter: ["var(--inter-font)"],
      },
    },
    screens: {
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
export default config;
