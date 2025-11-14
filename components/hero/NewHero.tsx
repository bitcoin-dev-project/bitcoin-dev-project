"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import BDPLogoWhite from "../assets/BDPLogoWhite"

export function NewHero() {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

    const toggleFaq = (index: number) => {
        setExpandedFaq(expandedFaq === index ? null : index)
    }
    const featuredLogos = [
        {
            name: "Summer of Bitcoin",
            logo: "/images/hero/summer-of-bitcoin.svg",
        },
        {
            name: "Coindesk",
            logo: "/images/hero/coindesk.svg",
        },
        {
            name: "Btrust",
            logo: "/images/hero/btrust.svg",
        },
        {
            name: "Stacker News",
            logo: "/images/hero/stacker-news.svg",
        },
        {
            name: "Stephan Livera Podcast",
            logo: "/images/hero/stephan-livera.svg",
        },
    ]

    const featuredProducts = [
        {
            name: "Decoding Bitcoin",
            image: "/images/products/decoding-bitcoin.png",
            users: "1k+",
            action: "Studied by",
            description: "A self-paced educational platform that introduces key Bitcoin concepts through visual explanations and exercises.",
        },
        {
            name: "Saving Satoshi",
            image: "/images/products/saving-satoshi.png",
            users: "1.5k+",
            action: "Played by",
            description: "An interactive science fiction game designed to inspire a generation to fall in love with bitcoin.",
        },
        {
            name: "ChatBTC",
            image: "/images/products/chatbtc.png",
            users: "1.5k+",
            action: "Used by",
            description: "An interactive science fiction game designed to inspire a generation to fall in love with bitcoin.",
        },
    ]

    const testimonials = [
        {
            quote: "The variety of free, open-source material that BDP provides is nothing short of impressive. They make exactly the kinds of tools & education that developers need.",
            author: "Steve Lee",
            role: "Lead, Spiral",
            color: "pink",
        },
        {
            quote: "I'd highly recommend people interested in contributing to Bitcoin start their journey at BDP.",
            author: "Anthony Milton",
            role: "Independent Bitcoin Researcher",
            color: "beige",
        },
        {
            quote: "The BDP is a welcoming community. It guided me to the right learning modules and tools, which helped me land a full-time job in bitcoin development!",
            author: "Matthew Vuk",
            role: "Researcher, Second",
            color: "blue",
        },
    ]

    const faqs = [
        {
            question: "Do you offer funding for contributors?",
            answer: "Not directly, but we help you find it. Read about how to get funded or directly use our common application resource to reach multiple bitcoin funding organizations with one form.",
        },
        {
            question: "How can I get started with Bitcoin development?",
            answer: "Start by exploring our Decoding Bitcoin curriculum, which provides structured learning paths for developers at all levels.",
        },
        {
            question: "What resources do you provide for learning?",
            answer: "We offer free educational content, interactive tools like Saving Satoshi, and comprehensive documentation to help you learn Bitcoin development.",
        },
        {
            question: "How can I contribute to open-source Bitcoin projects?",
            answer: "Check out our good first issues section and join our community events to connect with other contributors and find projects that match your skills.",
        },
    ]

    return (
        <>
        <div className="relative min-h-screen overflow-visible pb-32">
            {/* Background Image with rounded bottom corners */}
            <div className="absolute inset-0 z-0 rounded-b-[80px] overflow-hidden" style={{ height: 'calc(100% + 80px)' }}>
                <Image
                    src="/images/hero/rebranded/sky-background.png"
                    alt="Sky background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Navigation */}
            <nav className="relative z-10 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-20">
                <Link href="/" className="flex items-center flex-shrink-0">
                  <BDPLogoWhite />
                </Link>
                <div className="flex items-center gap-6">
                    <Link
                        href="/about"
                        className="text-white font-medium hover:opacity-80 transition-opacity text-base"
                    >
                        About
                    </Link>
                    <Link
                        href="/explore"
                        className="px-6 py-3 bg-white text-[#EB5234] font-medium rounded-[10px] hover:opacity-90 transition-all duration-200 text-base"
                    >
                        Start exploring
                    </Link>
                </div>
            </nav>

            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-8 pt-12 pb-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <div className="space-y-6">
                        {/* Badge */}
                        <div className="inline-block">
                            <div className="px-4 py-1 bg-[#6CB3DD]/44 backdrop-blur-sm rounded-full border border-white border-opacity-40">
                                <p className="text-white text-sm font-medium tracking-wide font-quicksand">
                                    ● OPEN-SOURCE LEARNING, STREAMLINED
                                </p>
                            </div>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-7xl lg:text-8xl font-bold text-white leading-tight font-montserrat">
                            BUILD THE
                            <br />
                            FUTURE OF
                            <br />
                            MONEY
                        </h1>

                        {/* Description */}
                        <p className="text-xl text-white opacity-90 max-w-xl font-quicksand">
                            Free and open-source tools for you to learn and contribute
                            to bitcoin development and products
                        </p>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <Link href="/explore">
                                <button className="bg-white text-[#E55B3B] font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity font-quicksand text-lg">
                                    Start Exploring Bitcoin Tech
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Side - Floating Island Image */}
                    <div className="relative flex items-center justify-center">
                        <div className="relative w-full max-w-2xl aspect-square animate-float">
                            <Image
                                src="/images/hero/rebranded/portal-island.png"
                                alt="Open Source, Open Doors - Floating Island Portal"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured In Section */}
            <div className="relative z-10 pb-16">
                <div className="max-w-7xl mx-auto px-8">
                    <p className="text-center text-white text-sm font-semibold tracking-wider mb-8 font-montserrat">
                        FEATURED IN
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        {featuredLogos.map((item) => (
                            <div
                                key={item.name}
                                className="relative rounded-xl p-6 w-48 h-32 flex flex-col items-center justify-center transition-all"
                                style={{ backgroundColor: 'rgba(116, 170, 199, 0.59)' }}
                            >
                                {/* Corner circles */}
                                <div className="absolute top-3 left-3 w-3 h-3 rounded-full" style={{ backgroundColor: '#A5D9F6' }}></div>
                                <div className="absolute top-3 right-3 w-3 h-3 rounded-full" style={{ backgroundColor: '#A5D9F6' }}></div>
                                <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full" style={{ backgroundColor: '#A5D9F6' }}></div>
                                <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full" style={{ backgroundColor: '#A5D9F6' }}></div>
                                
                                <div className="text-center flex flex-col items-center justify-center gap-3">
                                    <Image
                                        src={item.logo}
                                        alt={item.name}
                                        width={60}
                                        height={45}
                                        className="object-contain h-12 w-auto"
                                    />
                                    <p className="text-white text-xs font-medium font-montserrat leading-tight">
                                        {item.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Our Mission Section */}
        <div className="bg-[#F5EFE7] py-24">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side - Text Content */}
                    <div className="space-y-6">
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#2C2C2C] leading-tight font-montserrat">
                            OUR MISSION
                        </h2>
                        <p className="text-lg text-[#2C2C2C] leading-relaxed font-quicksand">
                            We make tools and resources so that anyone, anywhere has the opportunity to learn and contribute to Bitcoin tech.
                        </p>
                    </div>

                    {/* Right Side - Mission Cart Image */}
                    <div className="relative flex items-center justify-center">
                        <div className="relative w-full max-w-lg aspect-square">
                            <Image
                                src="/images/hero/mission-cart.png"
                                alt="Mission - Bitcoin Learning Resources"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Featured Products Section */}
        <div className="bg-[#F5EFE7] py-24">
            <div className="max-w-7xl mx-auto px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#2C2C2C] mb-6 font-montserrat">
                        FEATURED PRODUCTS
                    </h2>
                    <p className="text-lg text-[#2C2C2C] max-w-3xl mx-auto font-quicksand">
                        Explore tools crafted to support you in learning, building, and contributing to the bitcoin ecosystem.
                    </p>
                </div>

                {/* Product Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProducts.map((product, index) => (
                        <div
                            key={product.name}
                            className="relative cursor-pointer rounded-3xl overflow-hidden aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#EFE9DE] flex flex-col"
                            onMouseEnter={() => setHoveredProduct(index)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            {/* Inner Image Container - shrinks on hover */}
                            <div className={`relative rounded-3xl overflow-hidden transition-all duration-500 ease-in-out ${
                                hoveredProduct === index 
                                    ? 'h-[75%] w-[calc(100%-1.5rem)] mt-3 mx-3 mb-2' 
                                    : 'h-full w-full mt-0 mx-0 mb-0'
                            }`}>
                                {/* Background Image */}
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                {/* Content on Image */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                                    {/* User Badge */}
                                    <div className="inline-flex items-center gap-2 bg-[#EFE9DE] border border-[#A9A49B]/75 rounded-full px-3 py-1.5">
                                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                                        <span className="text-xs font-normal text-[#2C2C2C] font-quicksand">
                                            {product.action} {product.users} users
                                        </span>
                                    </div>

                                    {/* Product Name */}
                                    <h3 className="text-3xl font-bold text-[#F6F0E6] font-montserrat">
                                        {product.name}
                                    </h3>
                                </div>
                            </div>

                            {/* Description - fixed at bottom, appears when image shrinks */}
                            <div className={`absolute bottom-6 left-3 right-3 px-4 transition-opacity duration-500 ${
                                hoveredProduct === index 
                                    ? 'opacity-100' 
                                    : 'opacity-0'
                            }`}>
                                <p className="text-[#2C2C2C] text-base font-quicksand leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Stacked Wins Section */}
        <div className="bg-[#F5EFE7] py-24">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side - Text Content */}
                    <div className="space-y-6">
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#2C2C2C] leading-tight font-montserrat">
                            STACKED WINS
                        </h2>
                        <p className="text-lg text-[#2C2C2C] leading-relaxed font-quicksand">
                            What started with a few open-source tools is now a growing movement. With every contributor, every event, and every resource shared, we're building real momentum.
                        </p>
                    </div>

                    {/* Right Side - Stacked Rocks Image */}
 {/* Right Side - Stacked Rocks Image + overlayed stats */}
 <div className="relative flex items-center justify-center">
   {/* Native image ratio (your file is 768×881) */}
   <div className="relative w-full max-w-2xl aspect-[768/881]">
     <Image
       src="/images/stacked-wins.svg"
       alt="Stacked Wins - Growing Bitcoin Community"
       fill
       className="object-contain"
       priority={false}
     />
   </div>
 </div>
 
                </div>
            </div>
        </div>

                    

        {/* Stories of Impact Section - Stacked Cards */}
<section className="relative bg-[#F5EFE7] py-10">
  <div className="relative w-full mx-auto">
    {/* Background image container */}
    <div className="relative w-full aspect-[768/1062]">
      <Image
        src="/images/testimonials-background.svg"
        alt="Stories of Impact background"
        fill
        className="object-contain"
      />
      
      {/* Title */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[8.5%] text-center z-40">
        <h2 className="font-montserrat text-white text-[32px] md:text-[44px] font-extrabold tracking-tight">
          Stories of Impact
        </h2>
        <p className="font-quicksand text-white/90 text-sm md:text-base mt-2">
          Stories of impact from our community.
        </p>
      </div>
    </div>

    {/* Stacked Cards Container - positioned after the background */}
    <div className="relative -mt-[88%] min-h-[1200px] max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Card 1 — Pink */}
      <div
        className="sticky top-[80px] z-30 mb-[250px] w-full"
        style={{ transform: 'translateY(0)' }}
      >
        {/* Outer frame */}
        <div className="relative border-2 border-[#FF5CA8] bg-[#FBD7E5] rounded-none shadow-[0_18px_40px_rgba(0,0,0,0.18)] p-[20px] pt-[36px]">
          {/* Header dots — one on left, one on right */}
          <span className="absolute top-[10px] left-[16px] h-3 w-3 rounded-full bg-[#FF5CA8]" />
          <span className="absolute top-[10px] right-[16px] h-3 w-3 rounded-full bg-[#FF5CA8]" />

          {/* Inner rounded card */}
          <div className="rounded-[22px] bg-[#FFE7F0] px-8 py-8">
            <div className="flex items-start gap-4">
              <span className="text-[#FF2F92] text-3xl leading-none select-none">❝</span>
              <p className="font-quicksand text-[#7D2C52] text-[20px] md:text-[21px] leading-[1.85] tracking-[0.005em]">
                The variety of free, open-source material that BDP provides is nothing short of impressive.
                They make exactly the kinds of tools &amp; education that developers need.
              </p>
            </div>

            <div className="flex items-center justify-between mt-5">
              {/* Logo on the left */}
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src="/images/testimonials/spiral-logo.svg"
                  alt="Spiral"
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Name and role on the right */}
              <div className="text-right">
                <p className="font-montserrat font-semibold text-[#FF2F92] text-[16px]">
                  Steve Lee
                </p>
                <p className="font-quicksand text-[#7D2C52] text-[14px]">
                  Lead, Spiral
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2 — Beige */}
      <div
        className="sticky top-[100px] z-20 mb-[250px] w-full"
        style={{ transform: 'translateY(0)' }}
      >
        {/* Outer frame */}
        <div className="relative border-2 border-[#D3B178] bg-[#EDD4A0] rounded-none shadow-[0_18px_40px_rgba(0,0,0,0.18)] p-[20px] pt-[36px]">
          {/* Header dots — one on left, one on right */}
          <span className="absolute top-[10px] left-[16px] h-3 w-3 rounded-full bg-[#D3B178]" />
          <span className="absolute top-[10px] right-[16px] h-3 w-3 rounded-full bg-[#D3B178]" />

          {/* Inner rounded card */}
          <div className="rounded-[22px] bg-[#F7E2B8] px-8 py-8">
            <div className="flex items-start gap-4">
              <span className="text-[#B07A12] text-3xl leading-none select-none">❝</span>
              <p className="font-quicksand text-[#7A5A1A] text-[20px] md:text-[21px] leading-[1.85] tracking-[0.005em]">
                I'd highly recommend people interested in contributing to Bitcoin start their journey at BDP.
              </p>
            </div>

            <div className="text-right mt-5">
              <p className="font-montserrat font-semibold text-[#B07A12] text-[16px]">
                Anthony Milton
              </p>
              <p className="font-quicksand text-[#7A5A1A] text-[14px]">
                Independent Bitcoin Researcher
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3 — Blue */}
      <div
        className="sticky top-[120px] z-10 mb-[250px] w-full"
        style={{ transform: 'translateY(0)' }}
      >
        {/* Outer frame */}
        <div className="relative border-2 border-[#6BA3D8] bg-[#C5D8EF] rounded-none shadow-[0_18px_40px_rgba(0,0,0,0.18)] p-[20px] pt-[36px]">
          {/* Header dots — one on left, one on right */}
          <span className="absolute top-[10px] left-[16px] h-3 w-3 rounded-full bg-[#6BA3D8]" />
          <span className="absolute top-[10px] right-[16px] h-3 w-3 rounded-full bg-[#6BA3D8]" />

          {/* Inner rounded card */}
          <div className="rounded-[22px] bg-[#D8E6FA] px-8 py-8">
            <div className="flex items-start gap-4">
              <span className="text-[#3D6FA6] text-3xl leading-none select-none">❝</span>
              <p className="font-quicksand text-[#214167] text-[20px] md:text-[21px] leading-[1.85] tracking-[0.005em]">
                The BDP is a welcoming community. It guided me to the right learning modules and tools,
                which helped me land a full-time job in bitcoin development!
              </p>
            </div>

            <div className="flex items-center justify-between mt-5">
              {/* Logo on the left */}
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src="/images/testimonials/second-logo.svg"
                  alt="Second"
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Name and role on the right */}
              <div className="text-right">
                <p className="font-montserrat font-semibold text-[#3D6FA6] text-[16px]">
                  Matthew Vuk
                </p>
                <p className="font-quicksand text-[#214167] text-[14px]">
                  Researcher, Second
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extra space at bottom to allow scrolling */}
      <div className="h-[600px]"></div>
    </div>
  </div>
</section>

        {/* Newsletter Section - TLDR */}
        <div className="bg-[#F5EFE7] py-24 relative z-50">
            <div className="max-w-7xl mx-auto px-8">
                {/* Card Container */}
                <div className="bg-[#EFE9DE] border-2 border-[#E1DBD0] rounded-[40px] overflow-visible relative">
                    {/* Pinned Message Icon */}
                    <div className="absolute -top-8 -right-8 lg:-top-12 lg:-right-12 z-10">
                        <Image
                            src="/images/mail-icon.svg"
                            alt="Newsletter"
                            width={120}
                            height={120}
                            className="w-24 h-24 lg:w-32 lg:h-32 drop-shadow-lg"
                        />
                    </div>
                    <div className="grid lg:grid-cols-2 items-stretch overflow-hidden rounded-[40px]">
                        {/* Left Side - Text Content & Form */}
                        <div className="space-y-8 p-12 lg:p-16">
                            {/* TLDR Badge */}
                            <div className="flex items-center">
                                <Image
                                    src="/images/tldr-logo.svg"
                                    alt="TLDR"
                                    width={80}
                                    height={28}
                                    className="h-7 w-auto"
                                />
                            </div>

                            {/* Heading */}
                            <h2 className="text-4xl lg:text-5xl font-bold text-[#2C2C2C] leading-tight font-montserrat">
                                THE INBOX MVP FOR BITCOIN DEVS
                            </h2>

                            {/* Description */}
                            <p className="text-base text-[#2C2C2C] leading-relaxed font-quicksand">
                                Get weekly summaries of every post and thread on bitcoin-dev and Delving Bitcoin mailing lists to your inbox every Monday.
                            </p>

                            {/* Email Form */}
                            <div className="flex gap-3 max-w-xl">
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    className="flex-1 px-6 py-4 rounded-xl bg-[#F5EFE7] border-2 border-[#F5EFE7] focus:border-[#E55B3B] focus:outline-none font-quicksand text-[#2C2C2C] placeholder:text-gray-400"
                                />
                                <button className="bg-[#E55B3B] text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity font-quicksand whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Newsletter Preview Image */}
                        <div className="relative h-full min-h-[400px] pr-8 lg:pr-12">
                            <Image
                                src="/images/newsletter-preview.png"
                                alt="Bitcoin TLDR Newsletter Preview"
                                fill
                                className="object-cover object-left"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-[#F5EFE7] py-24">
            <div className="max-w-4xl mx-auto px-8">
                {/* Section Header */}
                <h2 className="text-4xl lg:text-5xl font-bold text-[#2C2C2C] text-center mb-12 font-montserrat">
                    FREQUENTLY ASKED QUESTIONS
                </h2>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-[#EFE9DE] border-2 border-[#E1DBD0] rounded-2xl overflow-hidden"
                        >
                            {/* Question Header */}
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#E8E2D6] transition-colors"
                            >
                                <span className="text-lg font-semibold text-[#2C2C2C] font-quicksand pr-4">
                                    {faq.question}
                                </span>
                                <span className="text-2xl text-[#2C2C2C] flex-shrink-0">
                                    {expandedFaq === index ? "−" : "+"}
                                </span>
                            </button>

                            {/* Answer Content */}
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

        </>
    )
}

