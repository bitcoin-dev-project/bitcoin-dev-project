// components/SvgDisplay.js

import React from "react"

const SvgDisplay = ({
    src,
    alt = "SVG Image",
    width = "100%",
    height = "auto",
    ...props
}: any) => {
    return (
        <div {...props} className="flex items-center justify-center">
            <img src={src} alt={alt} style={{ width, height }} />
        </div>
    )
}

export default SvgDisplay
