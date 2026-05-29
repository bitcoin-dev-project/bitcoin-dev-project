import NextImage, { ImageProps } from "next/image"

const Image = ({ alt, ...rest }: ImageProps) => (
    <NextImage alt={alt} {...rest} />
)

export default Image
