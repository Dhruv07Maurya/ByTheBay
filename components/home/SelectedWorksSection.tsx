'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const works = [
  {
    id: 1,
    title: 'Ethereal Visions',
    category: 'Brand Direction',
    year: '2024',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stockImg1-JAP5KRNxd7AxxiZqHfORVvCUPk9eMU.jpg',
    link: '#',
  },
  {
    id: 2,
    title: "Nature's Canvas",
    category: 'Content Creation',
    year: '2024',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stockImg3-OSjgN7cT95RqrcOednAdXTDZnCOq9m.jpg',
    link: '#',
  },
  {
    id: 3,
    title: 'Cinematic Moments',
    category: 'Visual Design',
    year: '2024',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stockImg2-FHgRJTZvG5PXCWWbLxjxqDuhylXg4x.jpg',
    link: '#',
  },
]

/* ─── Card component ─── */
function BentoCard({
  work,
  cardClass,
  hoveredId,
  onHover,
  index,
  isInView,
}: {
  work: typeof works[0]
  cardClass: string
  hoveredId: number | null
  onHover: (id: number | null) => void
  index: number
  isInView: boolean
}) {
  const isActive = hoveredId === work.id
  const isDimmed = hoveredId !== null && !isActive

  return (
    <motion.div
      className={`btb-card ${cardClass}`}
      initial={{ opacity: 0, y: 30 }}
      animate={
        isInView
          ? {
              opacity: isDimmed ? 0.4 : 1,
              y: 0,
              filter: isDimmed ? 'blur(3px)' : 'blur(0px)',
              scale: isActive ? 1.015 : 1,
            }
          : { opacity: 0, y: 30 }
      }
      transition={{
        y: { duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
        opacity: { duration: 0.3 },
        filter: { duration: 0.3 },
        scale: { duration: 0.35 },
      }}
      onMouseEnter={() => onHover(work.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Link href={work.link} className="btb-card-link" aria-label={work.title}>
        {/* Background image */}
        <Image
          src={work.image}
          alt={work.title}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 58vw"
          style={{
            objectFit: 'cover',
            transition: 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)',
            transform: isActive ? 'scale(1.07)' : 'scale(1.01)',
          }}
        />
        {/* Gradient */}
        <div className="btb-grad" />
        {/* Text */}
        <div className="btb-text">
          <div>
            <p className="btb-cat">{work.category} · {work.year}</p>
            <h3 className="btb-title">{work.title}</h3>
          </div>
          <div
            className="btb-arrow"
            style={{
              backgroundColor: isActive ? '#f0ede6' : 'rgba(240,237,230,0.12)',
              color: isActive ? '#1a1208' : '#f0ede6',
            }}
          >
            ↗
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/* ─── Section ─── */
export function SelectedWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section ref={ref} className="btb-works">
      <div className="btb-inner">
        {/* Header */}
        <motion.div
          className="btb-header"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="btb-eyebrow">Portfolio</p>
            <h2 className="btb-heading">Selected<br />Works</h2>
          </div>
          <Link href="/works" className="btb-view-all">
            View all works <span>→</span>
          </Link>
        </motion.div>

        {/* Bento Grid */}
        <div className="btb-grid">
          <BentoCard work={works[0]} cardClass="btb-c1" hoveredId={hoveredId} onHover={setHoveredId} index={0} isInView={isInView} />
          <BentoCard work={works[1]} cardClass="btb-c2" hoveredId={hoveredId} onHover={setHoveredId} index={1} isInView={isInView} />
          <BentoCard work={works[2]} cardClass="btb-c3" hoveredId={hoveredId} onHover={setHoveredId} index={2} isInView={isInView} />
        </div>

        {/* Footer */}
        <motion.div
          className="btb-footer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span>Hover to explore</span>
          <span>3 of 12 projects</span>
        </motion.div>
      </div>

      <style>{`
        /* ── Section wrapper ── */
        .btb-works {
          background: #f0ede6;
          padding: 5rem 1.5rem;
        }
        .btb-inner {
          max-width: 1280px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .btb-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        .btb-eyebrow {
          font-family: var(--font-outfit);
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #744f3a;
          margin: 0 0 0.75rem;
        }
        .btb-heading {
          font-family: var(--font-outfit);
          font-weight: 900;
          font-size: clamp(2.6rem, 7vw, 5.5rem);
          color: #111;
          letter-spacing: -0.03em;
          line-height: 0.92;
          margin: 0;
        }
        .btb-view-all {
          font-family: var(--font-outfit);
          font-weight: 600;
          font-size: 0.875rem;
          color: #2b160a;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          border-bottom: 2px solid #2b160a;
          padding-bottom: 2px;
        }

        /* ── Grid ── */
        .btb-grid {
          display: grid;
          gap: 0.75rem;
        }

        /* ── Shared card styles ── */
        .btb-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          will-change: transform, filter, opacity;
        }
        .btb-card-link {
          display: block;
          width: 100%;
          height: 100%;
          text-decoration: none;
          position: relative;
        }
        .btb-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(26,18,8,0.88) 0%,
            rgba(26,18,8,0.2) 50%,
            transparent 80%
          );
          pointer-events: none;
        }
        .btb-text {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 0.75rem;
        }
        .btb-cat {
          font-family: var(--font-outfit);
          font-size: 0.6rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #c8b89a;
          margin: 0 0 0.3rem;
        }
        .btb-title {
          font-family: var(--font-outfit);
          font-weight: 900;
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          color: #f0ede6;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
        }
        .btb-arrow {
          flex-shrink: 0;
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 50%;
          border: 1px solid rgba(240,237,230,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        /* ══════════════════════════════
           DESKTOP  ≥ 768px
           Left: large card (tall)
           Right: two stacked cards
        ══════════════════════════════ */
        @media (min-width: 768px) {
          .btb-works {
            padding: 6rem 2.5rem;
          }
          .btb-grid {
            grid-template-columns: 58fr 42fr;
            grid-template-rows: 290px 290px;
          }
          .btb-c1 {
            grid-column: 1;
            grid-row: 1 / 3; /* spans both rows → tall card */
          }
          .btb-c2 {
            grid-column: 2;
            grid-row: 1;
          }
          .btb-c3 {
            grid-column: 2;
            grid-row: 2;
          }
        }

        /* ══════════════════════════════
           MOBILE  < 768px
           Top: large card (full width)
           Bottom: two side-by-side cards
        ══════════════════════════════ */
        @media (max-width: 767px) {
          .btb-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 240px 180px;
          }
          .btb-c1 {
            grid-column: 1 / -1; /* full width */
            grid-row: 1;
          }
          .btb-c2 {
            grid-column: 1;
            grid-row: 2;
          }
          .btb-c3 {
            grid-column: 2;
            grid-row: 2;
          }
        }

        /* ── Footer ── */
        .btb-footer {
          margin-top: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-outfit);
          font-size: 0.68rem;
          color: #a89880;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
      `}</style>
    </section>
  )
}
