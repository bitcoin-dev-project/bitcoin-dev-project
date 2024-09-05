import React from "react"
import Image, { ImageProps } from "next/image"

interface SvgDisplayProps
    extends Omit<React.ComponentProps<"div">, "width" | "height"> {
    src: string
    alt?: string
    width?: string | number
    height?: string | number
}

const SvgDisplay: React.FC<SvgDisplayProps> = ({
    src,
    alt = "SVG Image",
    width = "100%",
    height = "auto",
    ...props
}) => {
    return (
        <div
            {...props}
            className={`flex items-center justify-center ${props.className || ""}`}
        >
            <Image
                src={src}
                alt={alt}
                width={500}
                height={500}
                style={{ width, height }}
            />
        </div>
    )
}

export default SvgDisplay
