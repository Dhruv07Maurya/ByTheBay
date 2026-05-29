'use client'

import { motion } from 'framer-motion'

interface AnimatedMarqueeProps {
  text: string
  className?: string
  duration?: number
}

export function AnimatedMarquee({ text, className = '', duration = 20 }: AnimatedMarqueeProps) {
  return (
    <div className={`overflow-hidden w-full bg-brown ${className}`}>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: -1000 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex whitespace-nowrap"
      >
        {/* Repeat text multiple times for seamless loop */}
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <span key={i} className="px-8 text-4xl md:text-6xl font-playfair font-bold text-cream">
              {text}
            </span>
          ))}
      </motion.div>
    </div>
  )
}
