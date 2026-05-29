'use client'

import { LenisScroll } from '@/components/LenisScroll'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const allWorks = [
  {
    id: 1,
    title: 'Ethereal Visions',
    category: 'Brand Direction',
    description: 'A complete brand identity overhaul for an emerging luxury lifestyle brand.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stockImg1-JAP5KRNxd7AxxiZqHfORVvCUPk9eMU.jpg',
    year: '2024',
    tags: ['Branding', 'Identity', 'Visual Design'],
  },
  {
    id: 2,
    title: 'Nature&apos;s Canvas',
    category: 'Content Creation',
    description: 'A series of environmental photography and storytelling content for a conservation nonprofit.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stockImg3-OSjgN7cT95RqrcOednAdXTDZnCOq9m.jpg',
    year: '2024',
    tags: ['Photography', 'Content', 'Storytelling'],
  },
  {
    id: 3,
    title: 'Cinematic Moments',
    category: 'Visual Design',
    description: 'High-impact visual design system for a digital media platform.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stockImg2-FHgRJTZvG5PXCWWbLxjxqDuhylXg4x.jpg',
    year: '2023',
    tags: ['Design Systems', 'Digital', 'UI/UX'],
  },
  {
    id: 4,
    title: 'Digital Transformation',
    category: 'Digital Strategy',
    description: 'End-to-end digital presence strategy and website redesign for a B2B tech company.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stockImg4-VSI56mmr1i3q5EEt6JJPigiNldsJmT.jpg',
    year: '2023',
    tags: ['Strategy', 'Web Design', 'Digital'],
  },
]

export default function WorksPage() {
  return (
    <>
      <LenisScroll />
      <main className="min-h-screen">
        {/* Header Section */}
        <section className="pt-32 pb-20 px-6 sm:px-8 bg-cream grain">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-playfair font-bold text-dark-900 mb-6">
                Our Works
              </h1>
              <p className="text-xl font-outfit text-gray-dark max-w-3xl leading-relaxed">
                A selection of projects that showcase our approach to creative direction, design, and strategic thinking.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Works Grid */}
        <section className="py-20 px-6 sm:px-8 bg-white grain">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allWorks.map((work, index) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  viewport={{ once: true, margin: '-100px' }}
                  className="group"
                >
                  <Link href={`/works/${work.id}`}>
                    <div className="space-y-4">
                      {/* Image Container */}
                      <div className="relative h-80 overflow-hidden rounded-lg">
                        <Image
                          src={work.image}
                          alt={work.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-2xl font-playfair font-bold text-dark-900 group-hover:text-brown-800 transition-colors">
                            {work.title}
                          </h3>
                          <span className="text-sm font-outfit text-gray-dark">{work.year}</span>
                        </div>
                        <p className="text-sm font-outfit text-gray-dark mb-4">{work.category}</p>
                        <p className="text-base font-outfit text-gray-dark leading-relaxed mb-4">
                          {work.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {work.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-block px-3 py-1 text-xs font-outfit text-gray-dark border border-gray-light rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
