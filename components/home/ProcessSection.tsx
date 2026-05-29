'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your brand, understanding your vision, goals, and target audience.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'We craft a comprehensive creative strategy aligned with your business objectives.',
  },
  {
    number: '03',
    title: 'Execution',
    description: 'Our team brings the strategy to life with high-quality creative deliverables.',
  },
  {
    number: '04',
    title: 'Refinement',
    description: 'We iterate based on feedback, ensuring the final work exceeds expectations.',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'We support you in rolling out the creative across all channels and platforms.',
  },
  {
    number: '06',
    title: 'Growth',
    description: 'Ongoing optimization and strategic guidance to maximize impact and reach.',
  },
]

export function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <section className="py-20 px-6 sm:px-8 bg-white grain" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold text-dark-900 mb-4">
            Our Process
          </h2>
          <p className="text-lg font-outfit text-gray-dark max-w-2xl">
            A structured approach to creative excellence, from initial concept through successful launch.
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="group p-8 border border-gray-light rounded-lg hover:border-brown-800 hover:bg-cream transition-all duration-300"
            >
              <div className="mb-4">
                <span className="text-4xl font-playfair font-bold text-brown-800 group-hover:text-dark-900 transition-colors">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-dark-900 mb-3">
                {step.title}
              </h3>
              <p className="font-outfit text-gray-dark text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
