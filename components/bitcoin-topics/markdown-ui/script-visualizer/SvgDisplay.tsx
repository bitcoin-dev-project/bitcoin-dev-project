import React from "react"
import Image from "next/image"

interface SvgDisplayProps {
    src: string
    alt?: string
    width?: number
    height?: number
    className?: string
}

const SvgDisplay: React.FC<SvgDisplayProps> = ({
    src,
    alt = "SVG Image",
    width = 100,
    height = 100,
    className = "",
    ...props
}) => {
    debugger
    return (
        <div
            className={`flex items-center justify-center ${className}`}
            {...props}
        >
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                layout="responsive"
            />
        </div>
    )
}

export default SvgDisplay
