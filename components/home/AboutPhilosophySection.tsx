'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function AboutPhilosophySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const items = [
    { text: 'Never Ship Mid', align: 'text-left pl-0' },
    { text: 'Obsess Over Details', align: 'text-left pl-[10%] sm:pl-[20%]' },
    { text: 'Taking Risks', align: 'text-right pr-[5%] sm:pr-[10%]' },
    { text: 'Give A F*ck', align: 'text-center' },
    { text: 'Make It Hurt (A Little)', align: 'text-left pl-[5%] sm:pl-[15%]' },
    { text: 'Build With Intent', align: 'text-right' },
  ]

  return (
    <section className="py-24 px-6 sm:px-10 bg-cream grain relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6 }}
          className="font-outfit text-lg sm:text-base tracking-widest text-[#2b160a] uppercase mb-5 text-center"
        >
          Our values
        </motion.p>

        {/* Asymmetrical Typography List */}
        <div className="w-full flex flex-col gap-6 md:gap-8 select-none">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.15,
                ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
              }}
              className={`w-full ${item.align}`}
            >
              <h2 className="font-outfit font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] tracking-tight leading-[0.9] text-[#111111] hover:text-[#2b160a] transition-colors duration-300">
                {item.text}
              </h2>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
