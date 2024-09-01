"use client"

import dynamic from "next/dynamic"
import {
    amethyst,
    aquaBlue,
    atomDark,
    cobalt2,
    cyberpunk,
    dracula,
    ecoLight,
    freeCodeCampDark,
    githubLight,
    gruvboxDark,
    gruvboxLight,
    levelUp,
    monokaiPro,
    neoCyan,
    nightOwl,
    sandpackDark
} from "@codesandbox/sandpack-themes"

const DynamicSandpack = dynamic(
    () => import("@codesandbox/sandpack-react").then((mod) => mod.Sandpack),
    { ssr: false }
)

interface SandpackFiles {
    [key: string]: {
        code: string
        hidden?: boolean
    }
}

interface SandpackComponentProps {
    files: SandpackFiles
    options?: {
        showLineNumbers?: boolean
        showInlineErrors?: boolean
        editorHeight?: number
        [key: string]: any
    }
    template?: string
    customSetup?: {
        dependencies?: {
            [key: string]: string
        }
        [key: string]: any
    }
    theme?: any
}

const SandpackComponent = ({
    files,
    options = {
        showLineNumbers: true,
        showInlineErrors: true,
        editorHeight: 900
    },
    customSetup = {
        dependencies: {
            react: "^18.0.0",
            "react-dom": "^18.0.0"
        }
    },
    theme = gruvboxDark
}: SandpackComponentProps) => {
    return (
        <div className="mx-auto py-1 full-width">
            <DynamicSandpack
                files={files}
                template={"react"}
                theme={theme}
                options={{
                    ...options,
                    externalResources: ["https://cdn.tailwindcss.com"]
                }}
                customSetup={customSetup}
            />
        </div>
    )
}

export default SandpackComponent
