import { Barlow, Bricolage_Grotesque, Inter } from "next/font/google"

export const barlow = Barlow({
    weight: ["100", "300", "400", "500", "600", "700"],
    variable: "--barlow-font",
    preload: true,
    display: "swap",
    subsets: ["latin"]
})

export const bricolage = Bricolage_Grotesque({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    variable: "--bricolage-font",
    preload: true,
    display: "swap",
    subsets: ["latin"]
})

const inter = Inter({ subsets: ["latin"] })

export default function Fonts() {
    return (
        <style
            dangerouslySetInnerHTML={{
                __html: `
          :root {
            --barlow-font: ${bricolage.style.fontFamily};
          }`
            }}
        ></style>
    )
}
