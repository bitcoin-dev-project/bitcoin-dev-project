"use client"

import React, { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { ExternalLinkIcon } from "lucide-react"

interface HistoryEvent {
    id: string
    type: string
    date: string
    title: string
    paragraphs: string[]
    links: { label: string; link: string }[]
    media?: {
        type: "image" | "video" | "svg" | "gif"
        src: string
        alt: string
    }
}

interface EventTypeBadgeProps {
    type: string
}

const EventTypeBadge: React.FC<EventTypeBadgeProps> = ({ type }) => {
    const getBadgeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case "post":
                return "bg-orange-400 dark:bg-orange-600"
            case "release":
                return "bg-vscode-success-light dark:bg-vscode-success-dark"
            case "bug":
                return "bg-vscode-error-light dark:bg-vscode-error-dark"
            case "other":
                return "bg-gray-400 dark:bg-gray-600"
            default:
                return "bg-vscode-text-light dark:bg-vscode-text-dark"
        }
    }

    return (
        <span
            className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded-full ${getBadgeColor(type)}`}
        >
            {type.toUpperCase()}
        </span>
    )
}

const bitcoinHistory: HistoryEvent[] = [
    {
        id: "2007-post-satoshi-starts",
        type: "post",
        date: "Early 2007",
        title: "Satoshi starts working on Bitcoin",
        paragraphs: [
            "Satoshi Nakamoto starts writing code for Bitcoin. This is based on a post to the Cryptography mailing list where Satoshi wrote on Nov 17th, 2008:",
            "»I believe I've worked through all those little details over the last year and a half while coding it.«"
        ],
        links: [
            {
                label: "e-mail (metzdowd.com)",
                link: "https://www.metzdowd.com/pipermail/cryptography/2008-November/014863.html"
            },
            {
                label: "e-mail (nakamotoinstitute.org)",
                link: "http://satoshi.nakamotoinstitute.org/emails/cryptography/15/#selection-101.55-103.36"
            }
        ],
        media: {
            type: "image",
            src: "/bitcoin-topics/static/images/topics/bitcoin-history/step1-dark.png",
            alt: "Satoshi starts working on Bitcoin"
        }
    },
    {
        id: "2008-post-bitcoin-paper",
        type: "post",
        date: "1st November 2008",
        title: "Bitcoin paper published",
        paragraphs: [
            "Satoshi Nakamoto announces Bitcoin on the Cryptography mailing list:",
            "«I've been working on a new electronic cash system that's fully peer-to-peer, with no trusted third party.»"
        ],
        links: [
            {
                label: "e-mail (metzdowd.com)",
                link: "https://www.metzdowd.com/pipermail/cryptography/2008-October/014810.html"
            },
            {
                label: "e-mail (nakamotoinstitute.org)",
                link: "https://satoshi.nakamotoinstitute.org/emails/cryptography/1/"
            },
            {
                label: "whitepaper",
                link: "https://www.bitcoin.org/bitcoin.pdf"
            }
        ],
        media: {
            type: "image",
            src: "/bitcoin-topics/static/images/topics/bitcoin-history/whitepaper.png",
            alt: "Satoshi starts working on Bitcoin"
        }
    },
    {
        id: "2009-other-genesis-block",
        type: "other",
        date: "Between 3rd and 9th January 2009",
        title: "Genesis Block mined",
        paragraphs: [
            "The Genesis block is mined with a timestamp of Jan 9th.",
            "The coinbase contains the famous words: »The Times 03/Jan/2009 Chancellor on brink of second bailout for banks«."
        ],
        links: [
            {
                label: "block explorer",
                link: "https://blockstream.info/block/000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f"
            },
            {
                label: "wiki entry",
                link: "https://en.bitcoin.it/wiki/Genesis_block"
            }
        ],
        media: {
            type: "image",
            src: "/bitcoin-topics/static/images/topics/bitcoin-history/step8.png",
            alt: "Genesis block"
        }
    },
    {
        id: "2010-release-multiple-0-3-xx",
        type: "release",
        date: "Throughout the summer of 2010",
        title: "Various Bitcoin v0.3.xx versions are released",
        paragraphs: [],
        links: [],
        media: {
            type: "image",
            src: "/bitcoin-topics/static/images/topics/bitcoin-history/step5.png",
            alt: "Genesis block"
        }
    },
    {
        id: "2010-bug-overflow-bug",
        type: "bug",
        date: "15th August 2010",
        title: "Critical overflow bug fixed",
        paragraphs: [
            "Satoshi pushes out a fix in v0.3.9(ish) and tells users and miners to re-org the block with the overflowed transaction out of history."
        ],
        links: [
            {
                label: "bitcointalk.org",
                link: "https://bitcointalk.org/index.php?topic=823.msg9531#msg9531"
            }
        ],
        media: {
            type: "image",
            src: "/bitcoin-topics/static/images/topics/bitcoin-history/step7.png",
            alt: "Genesis block"
        }
    },
    {
        id: "2011-other-new-contributors",
        type: "other",
        date: "March-June 2011",
        title: "New contributors join",
        paragraphs: [
            "Several new contributors start working on the project: TheBlueMatt (March 3), sipa (March 12), laanwj (May 15) and gmaxwell (June 18). Their first pull requests are listed below."
        ],
        links: [
            {
                label: "TheBlueMatt",
                link: "https://github.com/bitcoin/bitcoin/pull/92"
            },
            {
                label: "sipa",
                link: "https://github.com/bitcoin/bitcoin/pull/116"
            },
            {
                label: "laanwj",
                link: "https://github.com/bitcoin/bitcoin/pull/225"
            },
            {
                label: "gmaxwell",
                link: "https://github.com/bitcoin/bitcoin/pull/326"
            }
        ],
        media: {
            type: "image",
            src: "/bitcoin-topics/static/images/topics/bitcoin-history/step6.png",
            alt: "Genesis block"
        }
    },
    {
        id: "2010-post-alert-system",
        type: "post",
        title: "Alert system introduced",
        date: "22nd August 2010",
        paragraphs: [
            "Satoshi starts working on an alert system which is added in v0.3.11. He writes:",
            "»I've been working on writing the alert system.  Alerts are broadcast through the network and apply to a range of version numbers.  Alert messages are signed with a private key that only I have.«",
            "»Getting surprised by some temporary down time when your node would otherwise be at risk is better than getting surprised by a thief draining all your inventory.«",
            "»Someday when we haven't found any new bugs for a long time and it has been thoroughly security reviewed without finding anything, this can be scaled back.  I'm not arguing that this is the permanent way of things forever.  It's still beta software.«"
        ],
        links: [
            {
                label: "bitcointalk.org",
                link: "https://bitcointalk.org/index.php?topic=898.msg10722#msg10722"
            }
        ]
    }
]

export const BitcoinHistory: React.FC = () => {
    const [visibleEvents, setVisibleEvents] = useState(6)

    const loadMore = () => {
        setVisibleEvents((prevVisible) => prevVisible + 5)
    }

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                loadMore()
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="container mx-auto px-4 py-8 bg-vscode-background-light dark:bg-vscode-background-dark text-vscode-text-light dark:text-vscode-text-dark">
            <motion.div
                className="relative mb-24 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p
                    className="text-lg mb-2 text-center"
                    style={{ fontFamily: "Caveat, cursive" }}
                >
                    From idea to revolution
                </p>

                <h1 className="text-4xl md:text-5xl font-bold mb-2 relative inline-block z-10">
                    Bitcoin Development History
                </h1>
                <div
                    className="relative flex justify-center"
                    style={{ marginTop: "-10px" }}
                >
                    <Image
                        src="/bitcoin-topics/static/images/topics/bitcoin-history/underline.svg"
                        alt="Underline"
                        className="absolute not-prose"
                        style={{
                            width: "80%",
                            height: "auto",
                            top: "-5px",
                            marginTop: "0",
                            marginBottom: "0"
                        }}
                        width={100}
                        height={100}
                    />
                </div>
            </motion.div>
            <div className="relative space-y-12 md:space-y-16">
                {bitcoinHistory.slice(0, visibleEvents).map((event, index) => (
                    <React.Fragment key={event.id}>
                        <EventItem event={event} index={index} />
                        {index < visibleEvents - 1 && (
                            <ConnectingLine index={index} />
                        )}
                    </React.Fragment>
                ))}
            </div>
            {visibleEvents < bitcoinHistory.length && (
                <motion.button
                    className="mt-32 px-4 py-2 bg-orange-500 text-white rounded-md mx-auto block"
                    onClick={loadMore}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Load More
                </motion.button>
            )}

            <motion.div
                className="mt-32 text-center opacity-70 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <p className="mb-2">Inspired by the beautiful work of</p>
                <a
                    href="https://0xb10c.github.io/bitcoin-development-history/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors"
                >
                    0xb10c
                    <ExternalLinkIcon size={14} className="ml-1" />
                </a>
            </motion.div>
        </div>
    )
}

const EventItem: React.FC<{ event: HistoryEvent; index: number }> = ({
    event,
    index
}) => {
    const controls = useAnimation()
    const imageControls = useAnimation()
    const [ref, inView] = useInView({
        triggerOnce: false,
        threshold: 0.3, // Increased threshold
        rootMargin: "-100px 0px" // Added rootMargin
    })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
            imageControls.start("visible")
        } else {
            controls.start("hidden")
            imageControls.start("hidden")
        }
    }, [controls, imageControls, inView])

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3, // Increased duration
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.3 // Increased stagger
            }
        }
    }

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    }

    const getImageVariants = (index: number) => {
        const animations = [
            {
                hidden: { opacity: 0, scale: 0.8, rotate: -10 },
                visible: {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    transition: { duration: 0.5, ease: "easeOut" }
                }
            },
            {
                hidden: { opacity: 0, x: -50 },
                visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, ease: "easeOut" }
                }
            },
            {
                hidden: { opacity: 0, y: 50 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" }
                }
            },
            {
                hidden: { opacity: 0, scale: 1.2 },
                visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5, ease: "easeOut" }
                }
            }
        ]

        return animations[index % animations.length]
    }

    const renderMedia = () => {
        if (!event.media) return null

        const imageVariants = getImageVariants(index)

        switch (event.media.type) {
            case "image":
            case "gif":
                return (
                    <motion.div
                        initial="hidden"
                        animate={imageControls}
                        variants={imageVariants}
                    >
                        <Image
                            src={event.media.src}
                            alt={event.media.alt}
                            width={300}
                            height={200}
                            className="rounded-lg mx-auto md:mx-0"
                        />
                    </motion.div>
                )
            case "video":
                return (
                    <motion.div
                        initial="hidden"
                        animate={imageControls}
                        variants={imageVariants}
                    >
                        <video
                            src={event.media.src}
                            controls
                            className="rounded-lg shadow-md mx-auto md:mx-0"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </motion.div>
                )
            case "svg":
                return (
                    <motion.div
                        initial="hidden"
                        animate={imageControls}
                        variants={imageVariants}
                    >
                        <Image
                            src={event.media.src}
                            alt={event.media.alt}
                            className="rounded-lg shadow-md mx-auto md:mx-0"
                            style={{ maxWidth: "100%", height: "auto" }}
                            width={300}
                            height={200}
                        />
                    </motion.div>
                )
            default:
                return null
        }
    }

    return (
        <motion.div
            ref={ref}
            className={`flex flex-col md:flex-row items-start mb-8 md:mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
        >
            <motion.div
                className={`w-full md:w-7/12 ${index % 2 === 0 ? "md:text-left md:pr-8" : "md:text-right md:pl-8"} mb-6 md:mb-0`}
                variants={childVariants}
            >
                <motion.div
                    className={`flex flex-col ${index % 2 === 0 ? "items-start" : "items-end"} mb-2`}
                    variants={childVariants}
                >
                    <div
                        className={`flex items-center ${index % 2 === 0 ? "space-x-2" : "space-x-reverse space-x-2 flex-row-reverse"} mb-1`}
                    >
                        <EventTypeBadge type={event.type} />
                        <span className="text-sm font-medium text-orange-500">
                            {event.date}
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                </motion.div>
                {event.paragraphs.map((paragraph, pIndex) => (
                    <motion.p
                        key={pIndex}
                        className={`mt-3 font-extralight ${index % 2 === 0 ? "text-left" : "text-right"}`}
                        variants={childVariants}
                    >
                        {paragraph}
                    </motion.p>
                ))}
                {event.links.length > 0 && (
                    <motion.div
                        className={`mt-4 flex flex-wrap ${index % 2 === 0 ? "justify-start" : "justify-end"} gap-2`}
                        variants={childVariants}
                    >
                        {event.links.map((link, lIndex) => (
                            <motion.button
                                key={lIndex}
                                onClick={() =>
                                    window.open(
                                        link.link,
                                        "_blank",
                                        "noopener,noreferrer"
                                    )
                                }
                                className="inline-flex items-center px-2 py-1 text-xs text-vscode-text-light dark:text-vscode-text-dark hover:text-orange-500 rounded-full border border-orange-300 dark:border-orange-700 hover:border-orange-500 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: lIndex * 0.1
                                }}
                            >
                                {link.label}
                                <ExternalLinkIcon size={12} className="ml-1" />
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </motion.div>
            {event.media && (
                <motion.div
                    className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pl-8" : "md:pr-8"}`}
                    variants={childVariants}
                >
                    {renderMedia()}
                </motion.div>
            )}
        </motion.div>
    )
}

const ConnectingLine: React.FC<{ index: number }> = ({ index }) => {
    const lineIndex = (index % 4) + 1
    const controls = useAnimation()
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    return (
        <motion.div
            className="w-full my-8 md:my-12 hidden md:block"
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, scaleX: 0 },
                visible: {
                    opacity: 1,
                    scaleX: 1,
                    transition: { duration: 0.5, ease: "easeInOut" }
                }
            }}
        >
            <div className="relative w-full flex justify-center">
                <Image
                    src={`/bitcoin-topics/static/images/topics/bitcoin-history/line${lineIndex}.svg`}
                    alt={`Connecting line ${lineIndex}`}
                    width={768}
                    height={263}
                    className="w-full h-auto m-0"
                    style={{
                        maxWidth: "70%",
                        objectFit: "contain"
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
        </motion.div>
    )
}
