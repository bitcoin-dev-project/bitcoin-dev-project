import React from "react"

interface CodeEditorProps {
    src: string
    title?: string
}

const CodeEditor: React.FC<CodeEditorProps> = ({
    src,
    title = "Code Editor"
}) => {
    return (
        <iframe
            src={src}
            title={title}
            style={{
                width: "100%",
                height: "500px",
                border: "0",
                borderRadius: "4px",
                overflow: "hidden"
            }}
            allow="accelerometer; ambient-light-sensor; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        ></iframe>
    )
}

export default CodeEditor
