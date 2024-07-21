import { Sandpack } from "@codesandbox/sandpack-react"
import { nightOwl, sandpackDark } from "@codesandbox/sandpack-themes"

interface SandpackFiles {
    [key: string]: {
        code: string
        hidden?: boolean
    }
}

interface SandpackComponentProps {
    files: SandpackFiles
}

const SandpackComponent: React.FC<SandpackComponentProps> = ({ files }) => {
    return (
        <div>
            <br />
            <br />
            <br />
            {/* <Sandpack theme={nightOwl} template="nextjs" /> */}
            <br />
            <br />
            <br />
            <Sandpack
                template="nextjs"
                theme={nightOwl}
                files={files}
                options={{
                    showLineNumbers: true,
                    showInlineErrors: true,
                    editorHeight: 900
                }}
            />
        </div>
    )
}

export default SandpackComponent
