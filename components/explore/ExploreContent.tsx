"use client"

import Link from "next/link"
import { useState } from "react"
import { RightArrowIcon, BookIcon, MicIcon, ToolIcon, TapCursorIcon } from "@bitcoin-dev-project/bdp-ui/icons"

type Section = 'learn' | 'contribute' | 'funded'

interface ExploreContentProps {
    onSectionChange: (section: Section) => void
}

export function ExploreContent({ onSectionChange }: ExploreContentProps) {
    const [activeSection, setActiveSection] = useState<Section>('learn')

    const handleSectionClick = (section: Section) => {
        setActiveSection(section)
        onSectionChange(section)
    }

    return (
        <div className="flex-1 max-w-2xl">
            {/* Title with Icons */}
            <h1 className="text-6xl max-lg:text-5xl max-md:text-4xl font-bold mb-16 leading-tight font-montserrat">
                Explore your path<br />to bitcoin{" "}
                <span className="inline-flex items-center">
                    {/* Book Icon - Pink */}
                    <span 
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full relative z-40 border-2"
                        style={{ backgroundColor: '#EC4182', borderColor: '#F5D7E2' }}
                    >
                        <BookIcon className="w-6 h-6 text-white" />
                    </span>
                    {/* Mic Icon - Purple */}
                    <span 
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full relative z-30 -ml-3 border-2"
                        style={{ backgroundColor: '#7762B9', borderColor: '#CABFEF' }}
                    >
                        <MicIcon className="w-6 h-6 text-white" />
                    </span>
                    {/* Tool Icon - Blue */}
                    <span 
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full relative z-20 -ml-3 border-2"
                        style={{ backgroundColor: '#396BEB', borderColor: '#D1E2F3' }}
                    >
                        <ToolIcon className="w-6 h-6 text-white" />
                    </span>
                    {/* Tap Cursor Icon - Orange */}
                    <span 
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full relative z-10 -ml-3 border-2"
                        style={{ backgroundColor: '#D18616', borderColor: '#ECD4B5' }}
                    >
                        <TapCursorIcon className="w-6 h-6 text-white" />
                    </span>
                </span>
            </h1>

            {/* LEARN Section */}
            <section 
                className="mb-8 pb-8 border-b border-gray-300"
                onMouseEnter={() => handleSectionClick('learn')}
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-4xl max-md:text-3xl font-bold text-gray-900 font-montserrat">
                            LEARN
                        </h2>
                    </div>
                    
                    {activeSection === 'learn' ? (
                        <Link 
                            href="/decoding"
                            className="px-6 py-2 border-2 rounded-full text-gray-700 hover:opacity-90 transition-all font-medium font-quicksand"
                            style={{ backgroundColor: '#EFE9DE', borderColor: 'rgba(169, 164, 155, 0.75)' }}
                        >
                            View Resources
                        </Link>
                    ) : (
                        <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all" style={{ backgroundColor: '#EFE9DE' }}>
                            <RightArrowIcon className="w-6 h-6 text-gray-900" />
                        </div>
                    )}
                </div>
                
                {activeSection === 'learn' && (
                    <div className="animate-fadeIn">
                        <p className="text-lg text-gray-700 leading-relaxed font-quicksand">
                            Discover how bitcoin really works, from first steps to deep dives. The Bitcoin Dev Project helps you grow, explore, and learn at your own pace.
                        </p>
                    </div>
                )}
            </section>

            {/* CONTRIBUTE Section */}
            <section 
                className="mb-8 pb-8 border-b border-gray-300"
                onMouseEnter={() => handleSectionClick('contribute')}
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-4xl max-md:text-3xl font-bold text-gray-900 font-montserrat">
                            CONTRIBUTE
                        </h2>
                    </div>
                    
                    {activeSection === 'contribute' ? (
                        <Link 
                            href="/good-first-issues"
                            className="px-6 py-2 border-2 rounded-full text-gray-700 hover:opacity-90 transition-all font-medium font-quicksand"
                            style={{ backgroundColor: '#EFE9DE', borderColor: 'rgba(169, 164, 155, 0.75)' }}
                        >
                            View Resources
                        </Link>
                    ) : (
                        <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all" style={{ backgroundColor: '#EFE9DE' }}>
                            <RightArrowIcon className="w-6 h-6 text-gray-900" />
                        </div>
                    )}
                </div>
                
                {activeSection === 'contribute' && (
                    <div className="animate-fadeIn">
                        <p className="text-lg text-gray-700 leading-relaxed font-quicksand">
                            Join the bitcoin open-source movement. These resources help you go from curious observer to confident contributor. Guiding your first steps to building, collaborating, and giving back.
                        </p>
                    </div>
                )}
            </section>

            {/* GET FUNDED Section */}
            <section
                onMouseEnter={() => handleSectionClick('funded')}
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-4xl max-md:text-3xl font-bold text-gray-900 font-montserrat">
                            GET FUNDED
                        </h2>
                    </div>
                    
                    {activeSection === 'funded' ? (
                        <Link 
                            href="/career"
                            className="px-6 py-2 border-2 rounded-full text-gray-700 hover:opacity-90 transition-all font-medium font-quicksand"
                            style={{ backgroundColor: '#EFE9DE', borderColor: 'rgba(169, 164, 155, 0.75)' }}
                        >
                            View Resources
                        </Link>
                    ) : (
                        <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all" style={{ backgroundColor: '#EFE9DE' }}>
                            <RightArrowIcon className="w-6 h-6 text-gray-900" />
                        </div>
                    )}
                </div>
                
                {activeSection === 'funded' && (
                    <div className="animate-fadeIn">
                        <p className="text-lg text-gray-700 leading-relaxed font-quicksand">
                            Ready to make an impact? Secure a grant to launch your full-time career in bitcoin open-source development by working on the hardest and most interesting problems.
                        </p>
                    </div>
                )}
            </section>
        </div>
    )
}
