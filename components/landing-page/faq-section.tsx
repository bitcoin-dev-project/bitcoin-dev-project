import { FAQS } from "@/utils"
import React, { useState } from "react"

const FaqSection = () => {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
    const toggleFaq = (index: number) => {
        setExpandedFaq(expandedFaq === index ? null : index)
    }
    return (
        <div className="bg-[#F5EFE7] py-24">
            <div className="max-w-4xl mx-auto px-5 lg:px-8">
                <h2 className="text-2xl font-bold text-brand-dark text-center mb-12 font-montserrat">
                    FREQUENTLY ASKED QUESTIONS
                </h2>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {FAQS.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-[#EFE9DE] border-2 border-[#E1DBD0] rounded-2xl overflow-hidden"
                        >
                            {/* Question Header */}
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-brand transition-colors"
                            >
                                <span className="text-xl  text-brand-dark font-quicksand pr-4">
                                    {faq.question}
                                </span>
                                <span className="text-xl text-brand-dark flex-shrink-0">
                                    {expandedFaq === index ? "−" : "+"}
                                </span>
                            </button>

                            {expandedFaq === index && (
                                <div className="px-6 pb-6">
                                    <p className="text-base text-[#2C2C2C] leading-relaxed font-quicksand">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FaqSection
