import clsx from "clsx"
import Image from "next/image"
import React from "react"

export interface IFundingOrg {
    logo: string
    name: string
    description: string
    size?: string
    width?: number
    height?: number
    url?: string
}
const FundingOrg: React.FC<IFundingOrg> = ({
    logo,
    name,
    description,
    size,
    width,
    height,
    url
}) => {
    const imgSize = size
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-lg bg-brand-gray px-2 py-7 min-h-[195px] flex flex-col  items-center hover:scale-[1.02] transition-transform"
        >
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-brand-gray-100" />
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full  bg-brand-gray-100" />
            <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-brand-gray-100" />
            <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-brand-gray-100" />

            <div className="rounded-lg text-center p-2">
                <div
                    className={clsx(
                        "mb-3 flex justify-center items-center relative overflow-hidden",
                        imgSize
                    )}
                >
                    <Image
                        src={logo}
                        alt={`${name} logo`}
                        objectFit="contain"
                        width={width || 100}
                        height={height || 100}
                        objectPosition="center"
                    />
                </div>
                <h3 className="font-bold text-lg text-gray-500 font-montserrat mb-2">
                    {name}
                </h3>
                <p className="text-sm text-gray-400 font-quicksand">
                    {description}
                </p>
            </div>
        </a>
    )
}

export default FundingOrg
