'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ExploreButtonProps {
  href: string
  text?: string
  variant?: 'dark' | 'light'
}

export function ExploreButton({ href, text = 'Explore More', variant = 'dark' }: ExploreButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.8 }}
    >
      <Link href={href}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`group flex items-center gap-3 px-8 py-4 font-outfit font-semibold rounded-full transition-all duration-300 ${
            variant === 'dark'
              ? 'bg-dark-900 text-cream hover:bg-gray-dark'
              : 'border-2 border-dark-900 text-dark-900 hover:bg-dark-900 hover:text-cream'
          }`}
        >
          {text}
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </motion.div>
        </motion.button>
      </Link>
    </motion.div>
  )
}
