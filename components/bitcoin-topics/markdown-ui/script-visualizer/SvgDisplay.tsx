// components/SvgDisplay.js

import Image from "next/image"
import React from "react"

const SvgDisplay = ({
    src,
    alt = "SVG Image",
    width = "600",
    height = "600",
    ...props
}: any) => {
    return (
        <div {...props} className="flex items-center justify-center">
            <Image src={src} alt={alt} width={width} height={height} />
        </div>
    )
}

export default SvgDisplay
