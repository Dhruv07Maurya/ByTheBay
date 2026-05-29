'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { SquigglyText } from '../ui/squiggly-text'

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 px-6 sm:px-8 bg-dark-900 text-cream grain overflow-hidden relative" ref={ref}>
      {/* Decorative background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 opacity-5 pointer-events-none">
        <div className="w-full h-full rounded-full bg-cream blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-playfair font-bold mb-8 leading-tight">
            Ready to Create Something <SquigglyText
              stepDuration={100}
              scale={[6, 9]}
            >
              Great?
            </SquigglyText>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 30 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl font-outfit text-gray-light mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Let&apos;s discuss your vision and explore how we can bring your creative goals to life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link
            href="/contact"
            className="px-10 py-4 bg-cream text-dark-900 font-outfit font-semibold rounded-full hover:bg-gray-light transition-all duration-300 hover:scale-105 inline-block"
          >
            Start a Project
          </Link>
          <Link
            href="/works"
            className="px-10 py-4 border-2 border-cream text-cream font-outfit font-semibold rounded-full hover:bg-cream hover:text-dark-900 transition-all duration-300 inline-block"
          >
            View Portfolio
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm font-outfit text-gray-med mt-12"
        >
          Or email us at{' '}
          <a href="mailto:hello@bythebay.studio" className="text-cream hover:text-white transition-colors underline">
            hello@bythebay.studio
          </a>
        </motion.p>
      </div>
    </section>
  )
}
