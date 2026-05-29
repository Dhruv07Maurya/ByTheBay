'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    title: 'Web Design &\nDevelopment',
    desc: 'From pixel-perfect interfaces to high-performance builds — we craft digital experiences that load fast, look premium, and convert.',
    tags: ['UI / UX Design', 'Next.js & React', 'E-commerce & CMS', 'Performance Optimisation'],
    bg: '#f0ede6',
    text: '#111111',
    sub: '#744f3a',
    border: 'rgba(116,79,58,0.2)',
  },
  {
    num: '02',
    title: 'Photography &\nVideo Editing',
    desc: 'We shoot and edit content that stops the scroll. Brand films, product shoots, social campaigns — cinematic quality every time.',
    tags: ['Brand Photography', 'Reels & Short-form Video', 'Product Shoots', 'Post-production & Colour'],
    bg: '#2b160a',
    text: '#e8e5de',
    sub: '#c8b89a',
    border: 'rgba(200,184,154,0.2)',
  },
  {
    num: '03',
    title: 'Digital Growth\n& Identity',
    desc: 'Strategy-first brand building. We define your voice, design your identity, and build the channels that compound over time.',
    tags: ['Brand Identity', 'Social Media Strategy', 'Content Calendars', 'Community Building'],
    bg: '#1a1208',
    text: '#f0ede6',
    sub: '#a89880',
    border: 'rgba(168,152,128,0.2)',
  },
]

export function ServicesSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Disable scroll animations on mobile / tablet to prevent lag and clipping
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return

    // Wait a tick so layout is settled
    const id = setTimeout(() => {
      const ctx = gsap.context(() => {
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]

        cards.forEach((card, i) => {
          if (i === cards.length - 1) return // last card doesn't scale out

          // Scale + fade the card as the next one scrolls over it
          gsap.to(card, {
            scale: 0.94,
            opacity: 0.5,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      }, wrapperRef)

      return () => ctx.revert()
    }, 50)

    return () => clearTimeout(id)
  }, [])

  return (
    <section id="services" ref={wrapperRef} className="bg-[#f0ede6]">
      {/* Static header that scrolls away */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-12">
        <p className="font-outfit text-xs tracking-[0.22em] uppercase text-[#744f3a] mb-5">
          What we do
        </p>
        <h2 className="font-outfit font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#111] tracking-tight leading-[0.92]">
          Our Services
        </h2>
      </div>

      {/* Sticky stack */}
      <div className="flex flex-col">
        {SERVICES.map((svc, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el }}
            className="relative lg:sticky lg:top-0 min-h-[auto] lg:min-h-screen flex flex-col justify-center"
            style={{
              backgroundColor: svc.bg,
              zIndex: 10 + i,
            }}
          >
            {/* Inner card content */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full py-12 sm:py-16 lg:py-24">
              {/* Top meta row */}
              <div className="flex items-center justify-between mb-8 md:mb-16">
                <span
                  className="font-outfit text-xs tracking-[0.2em] uppercase opacity-50"
                  style={{ color: svc.text }}
                >
                  {svc.num} / 03
                </span>
                <span
                  className="font-outfit font-black text-[4rem] sm:text-[5rem] md:text-[8rem] leading-none opacity-[0.07] select-none"
                  style={{ color: svc.text }}
                >
                  {svc.num}
                </span>
              </div>

              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
                {/* Left */}
                <div>
                  <h3
                    className="font-outfit font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight mb-6 sm:mb-8 whitespace-pre-line"
                    style={{ color: svc.text }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className="font-outfit text-sm sm:text-base md:text-lg leading-relaxed max-w-[40ch]"
                    style={{ color: svc.text, opacity: 0.72 }}
                  >
                    {svc.desc}
                  </p>
                </div>

                {/* Right — tag list */}
                <div className="flex flex-col mt-2">
                  {svc.tags.map((tag, ti) => (
                    <div
                      key={ti}
                      className="flex items-center justify-between py-3 sm:py-4 border-b"
                      style={{ borderColor: svc.border }}
                    >
                      <span
                        className="font-outfit text-xs sm:text-sm md:text-base font-medium"
                        style={{ color: svc.sub }}
                      >
                        {tag}
                      </span>
                      <span
                        className="font-outfit text-xs opacity-30"
                        style={{ color: svc.text }}
                      >
                        ↗
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

