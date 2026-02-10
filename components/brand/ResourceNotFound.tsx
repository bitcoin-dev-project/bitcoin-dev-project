import React from "react"
import Image from "next/image"

const ResourceNotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full py-10">
            <div className="flex flex-col items-center">
                <div className="w-[28rem] h-[28rem] relative">
                    <Image
                        src="/images/hedgehog-not-found.png"
                        alt="Hedgehog mascot - no resources found"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    )
}

export default ResourceNotFound
