import { Barlow, Inter } from "next/font/google";

export const barlow = Barlow({
  weight: ["100", "300", "400", "500", "600", "700"],
  variable: "--barlow-font",
  preload: true,
  display: "swap",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export default function Fonts() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          :root {
            --barlow-font: ${barlow.style.fontFamily};
            --inter-font: ${inter.style.fontFamily};
          }`,
      }}
    ></style>
  );
}
