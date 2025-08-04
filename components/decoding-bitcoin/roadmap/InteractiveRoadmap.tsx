'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import TransactionCreation from '../../../src/components/TransactionCreation'
import OpCodeExplorer from '../markdown-ui/opcode-explorer'

export default function InteractiveRoadmap() {
  const [isInputCountVisible, setIsInputCountVisible] = useState(true)

  const handleTransactionStructureClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsInputCountVisible(!isInputCountVisible)
    
    // Find and toggle the SVG elements with class "Input count"
    const inputCountElements = document.querySelectorAll('[class="Input count"]') as NodeListOf<SVGElement>
    inputCountElements.forEach(element => {
      element.style.display = isInputCountVisible ? 'none' : 'block'
    })
  }

  return (
    <div 
      className="w-full"
      style={{
        backgroundColor: '#1e1e1e',
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '22px 22px'
      }}
    >


      {/* Roadmap Content */}
      <div className="w-full px-0 py-8">
        {/* Roadmap graphic with clickable Module 1 overlay */}
        <div className="w-full flex relative">
          {/* The roadmap SVG */}
          <img
            src="/images/roadmap1.svg"
            alt="Bitcoin Development Roadmap"
            className="w-full h-auto select-none"
            draggable={false}
          />

          {/* Floating Bitcoin image at position 129, 442 */}
          <motion.img
            src="/images/decoding-bitcoin-img.png"
            alt="Floating Bitcoin"
            className="absolute pointer-events-none"
            style={{
              left: '7.33%',    // 129 / 1759
              top: '6.75%',     // 442 / 6548
              width: '21.15%',  // 372 / 1759 (width to match original size)
              height: 'auto',
              maxWidth: '300px',
              filter: 'drop-shadow(0 0 20px rgba(255, 165, 0, 0.4))'
            }}
            animate={{
              y: [0, -12, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Transaction roadmap image at position 1105.8, 1920.31 */}
          <motion.img
            src="/images/tx-roadmap.png"
            alt="Transaction Roadmap"
            className="absolute pointer-events-none"
            style={{
              left: '60.87%',   // 1105.8 / 1759
              top: '28.33%',    // 1920.31 / 6548
              width: '80%',     // Reasonable size
              height: 'auto',
              maxWidth: '300px',
              filter: 'drop-shadow(0 0 15px rgba(0, 150, 255, 0.3))'
            }}
            animate={{
              rotate: [-8, 8, -8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Clickable rectangle at position 942, 535 */}
          <a
            href="/decoding/transaction-lifecycle"
            className="absolute block transition-colors duration-300 hover:bg-orange-500/30"
            style={{
              left: '53.55%',   // 942 / 1759
              top: '8.17%',     // 535 / 6548
              width: '25%',     // Adjust width as needed
              height: '1.28%',  // 84 / 6548
              borderRadius: '8px',
            }}
            aria-label="Go to Transaction Lifecycle"
          />

          {/* Curve Taproot image at position 500.87, 4891.53 */}
          <motion.img
            src="/images/curve-taproot.png"
            alt="Curve Taproot"
            className="absolute pointer-events-none"
            style={{
              left: '24.47%',   // 500.87 / 1759
              top: '75%',    // 4891.53 / 6548
              width: '25%',
              height: 'auto',
              maxWidth: '300px',
              filter: 'drop-shadow(0 0 15px rgba(0, 150, 255, 0.3))'
            }}
                          animate={{
                rotate: [-8, 8, -8],
                scale: [1, 1.28, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1]  // Makes the animation more synchronized
              }}
          />

          {/* Transaction Creation Component at position 979, 2297 */}
          <div
            className="absolute pointer-events-auto z-10"
            style={{
              left: '55.66%',   // 979 / 1759
              top: '35.0%',    // 2297 / 6548
              width: '100%',
              maxWidth: '600px',
              minWidth: '400px',
              opacity: '0.65',  // Added opacity
            }}
          >
            <TransactionCreation />
          </div>

          {/* Bitcoin OpCode Explorer at position 15, 3406 */}
          <div
            className="absolute pointer-events-auto z-10"
            style={{
              left: '0%',    // 15 / 1759
              top: '52.04%',    // 3406 / 6548
              width: '45%',
              maxWidth: '700px',
              minWidth: '500px',
              opacity: '0.65',  // Added opacity
            }}
          >
            <OpCodeExplorer initialView="compact" />
          </div>

          {/* Second video overlay at position 878, 780 */}
          <div
            className="absolute pointer-events-auto"
            style={{
              left: '49.91%', // 878 / 1759
              top: '11.91%', // 780 / 6548
              width: '40%',
              minWidth: '300px'
            }}
          >
            <video
              src="/decoding-bitcoin/static/images/topics/decoding-bitcoin.mp4"
              poster="/decoding-bitcoin/static/images/topics/decoding-bitcoin-poster.png"
              controls
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Link overlay to Inputs - Input Count route */}
          <a
            href="/decoding/inputs-inputcount"
            className="absolute block bg-transparent hover:bg-orange-500/30 transition-colors"
            style={{
              left: '27.22%',   // 391.916 / 1440
              top: '46.09%',    // 1841.35 / 3995
              width: '12.8%',   // 184.638 / 1440
              height: '1.07%'   // 42.713 / 3995
            }}
            aria-label="Go to Inputs - Input Count"
          />

          {/* Link overlay to Transaction Structure route (Rect 22) */}
          <a
            href="#"
            onClick={handleTransactionStructureClick}
            className="absolute block bg-transparent hover:bg-orange-500/30 transition-colors cursor-pointer"
            style={{
              left: '44%',      // 633.25 / 1440
              top: '42.3%',     // 1689.25 / 3995
              width: '25.6%',   // 368.461 / 1440
              height: '1.38%'   // 55.325 / 3995
            }}
            aria-label={`${isInputCountVisible ? 'Hide' : 'Show'} Input Count Details`}
          />

          {/* Additional clickable rectangle at position 345, 1893 */}
          <a
            href="/decoding/transaction-lifecycle"
            className="absolute block transition-colors duration-300 hover:bg-orange-500/30"
            style={{
              left: '19.61%',   // 345 / 1759
              top: '28.91%',    // 1893 / 6548
              width: '18.45%',  // 324.61 / 1759
              height: '0.87%',  // 56.94 / 6548
              borderRadius: '8px',
            }}
            aria-label="Go to Transaction Lifecycle"
          />

          {/* UTXO link rectangle at position 699.12, 1893 */}
          <a
            href="/decoding/utxo"
            className="absolute block transition-colors duration-300 hover:bg-orange-500/30"
            style={{
              left: '39.75%',   // 699.12 / 1759
              top: '28.91%',    // 1893 / 6548
              width: '24.09%',  // 423.8 / 1759
              height: '0.87%',  // 56.94 / 6548
              borderRadius: '8px',
            }}
            aria-label="Go to UTXO Page"
          />

          {/* Inputs-InputCount link rectangle at position 527.3, 1677.7 */}
          <a
            href="/decoding/inputs-inputcount"
            className="absolute block transition-colors duration-300 hover:bg-orange-500/30"
            style={{
              left: '29.98%',   // 527.3 / 1759
              top: '25.62%',    // 1677.7 / 6548
              width: '8.39%',   // 147.63 / 1759
              height: '0.74%',  // 48.23 / 6548
              borderRadius: '8px',
            }}
            aria-label="Go to Inputs InputCount Page"
          />

          {/* Tagged Hashes link rectangle at position 257, 5609 */}
          <a
            href="/decoding/tagged-hashes"
            className="absolute block transition-colors duration-300 hover:bg-orange-500/30"
            style={{
              left: '14.61%',   // 257 / 1759
              top: '85.66%',    // 5609 / 6548
              width: '19.22%',  // 338 / 1759
              height: '1.19%',  // 78 / 6548
              borderRadius: '8px',
            }}
            aria-label="Go to Tagged Hashes Page"
          />

          {/* Schnorr Signature link rectangle */}
          <a
            href="/decoding/schnorr-signature"
            className="absolute block transition-colors duration-300 hover:bg-orange-500/30"
            style={{
              left: '35.87%',   // 631 / 1759
              top: '85.66%',    // 5609 / 6548
              width: '19.22%',  // 338 / 1759
              height: '1.19%',  // 78 / 6548
              borderRadius: '8px',
            }}
            aria-label="Go to Schnorr Signature Page"
          />

        </div>

      </div>
    </div>
  )
} 