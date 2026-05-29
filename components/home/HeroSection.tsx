'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SquigglyText } from '../ui/squiggly-text'
import { DitherShader } from '../ui/dither-shader'

export function HeroSection() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f0ede6] pb-24 md:pb-32 flex flex-col justify-between">
      {/* Background DitherShader */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
        <DitherShader
          src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=3432&auto=format&fit=crop"
          gridSize={4}
          ditherMode="bayer"
          colorMode="duotone"
          primaryColor="rgb(99,99,99)"
          secondaryColor="rgb(79,44,23)"
          animated={true}
          animationSpeed={0.012}
          className="w-full h-full"
        />
      </div>

      {/* ── Top bar ── */}
      <div className="relative z-10 flex items-start justify-between px-6 py-6 md:px-10 md:py-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link href="/" className="flex items-start gap-3 no-underline">
            <span className="font-playfair font-black text-3xl md:text-5xl lg:text-6xl text-neutral-900 leading-none">
              ByTheBay
            </span>
            <div className="flex flex-col font-outfit text-xs md:text-sm leading-normal text-[#744f3aff]">
              <span>Studio</span>
              <span>Community</span>
              <span>Space</span>
            </div>
          </Link>
        </motion.div>

        {/* Status dot + time */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center gap-2 md:gap-3 pt-1.5"
        >
          <span className="font-outfit text-sm md:text-base text-neutral-500">{time}</span>
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#2b160a] animate-pulse" />
        </motion.div>
      </div>

      {/* ── Giant typography ── */}
      <div className="relative z-10 px-6 md:px-10 flex-grow flex flex-col justify-center my-auto py-8">
        {/* Coordinates */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 font-outfit text-xs md:text-sm text-gray tracking-widest whitespace-nowrap z-10"
        >
          Let’s Have Coffee Together!
        </motion.p>

        <div className="flex flex-col gap-1 md:gap-3 max-w-full">
          {/* Row 1: Crafting */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-outfit font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] text-neutral-900 tracking-tight leading-none"
          >
            Crafting
          </motion.h1>

          {/* Row 2: digital */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-outfit font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6.5rem] text-neutral-900 tracking-tight leading-none text-right"
          >
            <SquigglyText
              stepDuration={100}
              scale={[6, 9]}
              className="text-[#2b160a]"
            >
              digital
            </SquigglyText>
          </motion.h1>

          {/* Row 3: experiences */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-outfit font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7rem] text-neutral-900 tracking-tight leading-none"
          >
            experiences.
          </motion.h1>
        </div>
      </div>

      {/* ── Bottom info bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10 px-6 py-6 md:px-10 md:py-8 flex items-center justify-between"
      >
        <p className="font-outfit text-xs md:text-sm text-neutral-500 m-0">
          Nice to meet you
        </p>
        <Link
          href="/about"
          className="font-outfit text-xs md:text-sm text-neutral-500 no-underline hover:text-neutral-900 transition-colors"
        >
          About us →
        </Link>
      </motion.div>
    </section>
  )
}
