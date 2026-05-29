'use client'

import { LenisScroll } from '@/components/LenisScroll'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const workDetails = {
  1: {
    title: 'Ethereal Visions',
    category: 'Brand Direction',
    year: '2024',
    description: 'A complete brand identity overhaul for an emerging luxury lifestyle brand seeking to establish a distinctive presence in a competitive market.',
    challenge: 'The client needed a cohesive visual language that communicated luxury, sustainability, and innovation while appealing to a Gen Z audience.',
    solution: 'We developed a minimalist design system with an emphasis on typography and whitespace, paired with a sophisticated color palette rooted in natural tones.',
    results: 'The new brand identity increased brand recognition by 65% and led to a 40% increase in customer engagement across social media platforms.',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stockImg1-JAP5KRNxd7AxxiZqHfORVvCUPk9eMU.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stockImg2-FHgRJTZvG5PXCWWbLxjxqDuhylXg4x.jpg',
    ],
    tags: ['Branding', 'Identity', 'Visual Design', 'Luxury'],
    credits: [
      { role: 'Creative Direction', name: 'ByTheBay Studio' },
      { role: 'Visual Design', name: 'Design Team' },
      { role: 'Typography', name: 'Brand Specialist' },
    ],
  },
  2: {
    title: 'Nature&apos;s Canvas',
    category: 'Content Creation',
    year: '2024',
    description: 'A comprehensive content series documenting environmental stories and conservation efforts for a nonprofit organization.',
    challenge: 'Create compelling visual narratives that inspire action without relying on traditional environmental messaging.',
    solution: 'We produced cinematic photography and video content that focuses on human connections to nature, highlighting both the beauty and fragility of our environment.',
    results: 'The content campaign reached 2M+ people, resulting in a 120% increase in donations and 500+ new volunteer sign-ups.',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stockImg3-OSjgN7cT95RqrcOednAdXTDZnCOq9m.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stockImg4-VSI56mmr1i3q5EEt6JJPigiNldsJmT.jpg',
    ],
    tags: ['Photography', 'Content', 'Storytelling', 'Environmental'],
    credits: [
      { role: 'Creative Direction', name: 'ByTheBay Studio' },
      { role: 'Photography', name: 'Production Team' },
      { role: 'Post Production', name: 'Creative Specialists' },
    ],
  },
  3: {
    title: 'Cinematic Moments',
    category: 'Visual Design',
    year: '2023',
    description: 'A comprehensive design system for a digital media platform serving millions of daily active users.',
    challenge: 'Create a scalable design system that maintains consistency across web and mobile while accommodating diverse content types.',
    solution: 'We developed a modular component library with clear design principles, ensuring flexibility and scalability across all platforms.',
    results: 'The design system improved development velocity by 45% and increased user satisfaction scores by 38%.',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stockImg2-FHgRJTZvG5PXCWWbLxjxqDuhylXg4x.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stockImg1-JAP5KRNxd7AxxiZqHfORVvCUPk9eMU.jpg',
    ],
    tags: ['Design Systems', 'Digital', 'UI/UX', 'Web Design'],
    credits: [
      { role: 'Design Direction', name: 'ByTheBay Studio' },
      { role: 'UI Design', name: 'Design Team' },
      { role: 'Design Systems', name: 'Systems Architect' },
    ],
  },
  4: {
    title: 'Digital Transformation',
    category: 'Digital Strategy',
    year: '2023',
    description: 'A full digital presence overhaul and website redesign for a B2B technology company.',
    challenge: 'Communicate complex technical services in an accessible way while establishing thought leadership in the industry.',
    solution: 'We created a content-driven website architecture with clear messaging hierarchy, supported by strategic SEO and content marketing.',
    results: 'Organic traffic increased by 250%, lead generation improved by 180%, and the company was featured in 15+ industry publications.',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stockImg4-VSI56mmr1i3q5EEt6JJPigiNldsJmT.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stockImg3-OSjgN7cT95RqrcOednAdXTDZnCOq9m.jpg',
    ],
    tags: ['Strategy', 'Web Design', 'Digital', 'SEO'],
    credits: [
      { role: 'Strategy & Planning', name: 'ByTheBay Studio' },
      { role: 'Web Design', name: 'Design Team' },
      { role: 'Development', name: 'Tech Team' },
    ],
  },
}

export default function WorkDetailPage({ params }: { params: { id: string } }) {
  const work = workDetails[params.id as keyof typeof workDetails]

  if (!work) {
    notFound()
  }

  const workIds = Object.keys(workDetails).map(Number)
  const currentIndex = workIds.indexOf(parseInt(params.id))
  const nextId = currentIndex < workIds.length - 1 ? workIds[currentIndex + 1] : workIds[0]
  const prevId = currentIndex > 0 ? workIds[currentIndex - 1] : workIds[workIds.length - 1]

  return (
    <>
      <LenisScroll />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-12 px-6 sm:px-8 bg-cream grain">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm font-outfit uppercase tracking-widest text-gray-dark mb-4">Work</p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-playfair font-bold text-dark-900 mb-6">
                {work.title}
              </h1>
              <div className="flex flex-col md:flex-row gap-8 pt-8">
                <div>
                  <p className="text-sm font-outfit uppercase tracking-widest text-gray-dark mb-2">Category</p>
                  <p className="text-lg font-playfair font-bold text-dark-900">{work.category}</p>
                </div>
                <div>
                  <p className="text-sm font-outfit uppercase tracking-widest text-gray-dark mb-2">Year</p>
                  <p className="text-lg font-playfair font-bold text-dark-900">{work.year}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Image */}
        <section className="px-6 sm:px-8 py-12 bg-white grain">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 md:h-[600px] overflow-hidden rounded-lg"
            >
              <Image
                src={work.images[0]}
                alt={work.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 px-6 sm:px-8 bg-cream grain">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm font-outfit uppercase tracking-widest text-gray-dark mb-4">Overview</h3>
                <p className="text-lg font-playfair font-bold text-dark-900 leading-relaxed">
                  {work.description}
                </p>
              </motion.div>

              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm font-outfit uppercase tracking-widest text-gray-dark mb-4">Challenge</h3>
                <p className="font-outfit text-gray-dark leading-relaxed">
                  {work.challenge}
                </p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm font-outfit uppercase tracking-widest text-gray-dark mb-4">Solution</h3>
                <p className="font-outfit text-gray-dark leading-relaxed">
                  {work.solution}
                </p>
              </motion.div>
            </div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="border-t border-gray-light pt-12 pb-16"
            >
              <h3 className="text-sm font-outfit uppercase tracking-widest text-gray-dark mb-4">Results</h3>
              <p className="text-xl font-playfair font-bold text-dark-900 leading-relaxed max-w-2xl">
                {work.results}
              </p>
            </motion.div>

            {/* Additional Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {work.images.slice(1).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative h-80 overflow-hidden rounded-lg"
                >
                  <Image
                    src={image}
                    alt={`${work.title} detail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>

            {/* Tags */}
            <div className="mb-16 pb-16 border-b border-gray-light">
              <h3 className="text-sm font-outfit uppercase tracking-widest text-gray-dark mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-4 py-2 text-sm font-outfit text-gray-dark border border-gray-light rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Credits */}
            <div className="mb-16">
              <h3 className="text-sm font-outfit uppercase tracking-widest text-gray-dark mb-6">Credits</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {work.credits.map((credit, index) => (
                  <div key={index}>
                    <p className="text-xs font-outfit uppercase tracking-widest text-gray-dark mb-2">{credit.role}</p>
                    <p className="font-playfair font-bold text-dark-900">{credit.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Navigation to other works */}
        <section className="py-16 px-6 sm:px-8 bg-white grain border-t border-gray-light">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <Link
              href={`/works/${prevId}`}
              className="group text-center md:text-left"
            >
              <p className="text-sm font-outfit uppercase tracking-widest text-gray-dark mb-2">Previous</p>
              <p className="text-2xl font-playfair font-bold text-dark-900 group-hover:text-brown-800 transition-colors">
                ← Previous Work
              </p>
            </Link>

            <Link
              href="/works"
              className="px-6 py-3 border-2 border-dark-900 text-dark-900 font-outfit font-semibold rounded-full hover:bg-dark-900 hover:text-cream transition-all duration-300"
            >
              View All Works
            </Link>

            <Link
              href={`/works/${nextId}`}
              className="group text-center md:text-right"
            >
              <p className="text-sm font-outfit uppercase tracking-widest text-gray-dark mb-2">Next</p>
              <p className="text-2xl font-playfair font-bold text-dark-900 group-hover:text-brown-800 transition-colors">
                Next Work →
              </p>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
