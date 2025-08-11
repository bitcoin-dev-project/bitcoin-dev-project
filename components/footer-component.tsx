"use client"

import React from "react"
import { Footer } from "@bitcoin-dev-project/bdp-ui"
import { LinkedinIcon } from "lucide-react"

function Wrapper({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div
            className={`w-full max-w-[1920px] px-4 lg:px-10 2xl:px-[60px] mx-auto ${className}`}
            {...props}
        />
    )
}

const FooterComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="border-b-[0.5px] border-b-gray-custom-400 w-full"></div>
            <Wrapper className="py-10 w-full">
                <Footer>
                    <Footer.Socials
                        platforms={[
                            {
                                entity: "github",
                                entityLink:
                                    "https://github.com/bitcoin-dev-project/bitcoin-dev-project",
                                iconProps: {
                                    className: "hover:text-orange-400"
                                }
                            },
                            {
                                entity: "discord",
                                entityLink: "https://discord.gg/EAy9XMufbY",
                                iconProps: {
                                    className: "hover:text-orange-400"
                                }
                            },
                            {
                                entity: "twitter",
                                entityLink: "https://twitter.com/Bitcoin_Devs",
                                iconProps: {
                                    className: "hover:text-orange-400"
                                }
                            },
                            {
                                entity: "nostr",
                                entityLink:
                                    "https://njump.me/npub10p33xu03t8q7d9nxtks63dq4gmt4v4d3ppd5lcdp4rg9hxsd0f8q7mn2l2",
                                iconProps: {
                                    className: "hover:text-orange-400"
                                }
                            },
                            {
                                entity: "linkedin",
                                entityLink:
                                    "https://www.linkedin.com/company/bitcoin-dev-project/",
                                iconProps: {
                                    className: "hover:text-orange-400"
                                },
                            }
                        ]}
                    />
                    <Footer.Public dashboardLink="https://visits.bitcoindevs.xyz/share/El4tCqIKLIhJIq9y/bitcoin-dev-project" />
                    <Footer.About
                        entityLink="https://bitcoindevs.xyz"
                        entityName="Bitcoin Dev Project"
                    />
                    <Footer.Feedback feedbackLink="https://forms.gle/aLtBMjAeLZiKCFxn8" />
                </Footer>
            </Wrapper>
        </div>
    )
}

export default FooterComponent
