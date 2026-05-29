'use client'

import { LenisScroll } from '@/components/LenisScroll'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/* ─────────────────────────────────────────────
   Flork-style doodle with cursor-following
   eyes & hands
───────────────────────────────────────────── */
function FlorkCharacter() {
  const svgRef = useRef<SVGSVGElement>(null)

  // Eye pupil offsets (max 4px)
  const [pupils, setPupils] = useState({ lx: 0, ly: 0, rx: 0, ry: 0 })
  // Hand rotation angles (degrees)
  const [lAngle, setLAngle] = useState(0)
  const [rAngle, setRAngle] = useState(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const svg = svgRef.current
      if (!svg) return
      const rect = svg.getBoundingClientRect()

      // Convert mouse to SVG coordinate space (viewBox 400x500)
      const scaleX = 400 / rect.width
      const scaleY = 500 / rect.height
      const mx = (e.clientX - rect.left) * scaleX
      const my = (e.clientY - rect.top) * scaleY

      // Eye centers in SVG coords
      const LEye = { x: 174, y: 186 }
      const REye = { x: 210, y: 186 }

      const clampEye = (dx: number, dy: number) => {
        const maxR = 4
        const d = Math.hypot(dx, dy) || 1
        const r = Math.min(d * 0.4, maxR)
        return { x: (dx / d) * r, y: (dy / d) * r }
      }

      const le = clampEye(mx - LEye.x, my - LEye.y)
      const re = clampEye(mx - REye.x, my - REye.y)
      setPupils({ lx: le.x, ly: le.y, rx: re.x, ry: re.y })

      // Hand pivot points in SVG coords
      const LHand = { x: 155, y: 240 }
      const RHand = { x: 260, y: 215 }

      const angleTo = (pivot: { x: number; y: number }) =>
        Math.atan2(my - pivot.y, mx - pivot.x) * (180 / Math.PI)

      setLAngle(angleTo(LHand))
      setRAngle(angleTo(RHand))
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Convert angle to arm tip offset (arm length ~70 units)
  const armTip = (pivot: { x: number; y: number }, angleDeg: number, len: number) => {
    const a = (angleDeg * Math.PI) / 180
    return {
      x: pivot.x + Math.cos(a) * len,
      y: pivot.y + Math.sin(a) * len,
    }
  }

  const LPivot = { x: 155, y: 230 }
  const RPivot = { x: 255, y: 215 }
  const LTip = armTip(LPivot, lAngle, 65)
  const RTip = armTip(RPivot, rAngle, 60)

  // Finger directions (3 lines spread from tip)
  const fingers = (tip: { x: number; y: number }, angleDeg: number) => {
    const a = (angleDeg * Math.PI) / 180
    return [-25, 0, 25].map((spread) => {
      const sa = a + (spread * Math.PI) / 180
      return {
        x2: tip.x + Math.cos(sa) * 14,
        y2: tip.y + Math.sin(sa) * 14,
      }
    })
  }

  const LFingers = fingers(LTip, lAngle)
  const RFingers = fingers(RTip, rAngle)

  const S = { stroke: '#1a1208', strokeWidth: 4.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' }

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 500"
      className="w-full h-auto max-h-[75vh]"
      style={{ overflow: 'visible', cursor: 'crosshair' }}
    >
      {/* Soft background circle */}
      <circle cx="200" cy="250" r="195" fill="#dedad2" opacity="0.45" />

      {/* ── Body ── */}
      <path
        d="M 140 290 L 160 215 L 134 213 C 130 193, 152 155, 200 155 C 248 155, 270 195, 280 290 Z"
        stroke="#1a1208" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="#f0ede6"
      />

      {/* ── Left arm (dynamic) ── */}
      <line x1={LPivot.x} y1={LPivot.y} x2={LTip.x} y2={LTip.y} {...S} strokeWidth={5} />
      {LFingers.map((f, i) => (
        <line key={i} x1={LTip.x} y1={LTip.y} x2={f.x2} y2={f.y2} {...S} />
      ))}

      {/* ── Right arm (dynamic) ── */}
      <line x1={RPivot.x} y1={RPivot.y} x2={RTip.x} y2={RTip.y} {...S} strokeWidth={5} />
      {RFingers.map((f, i) => (
        <line key={i} x1={RTip.x} y1={RTip.y} x2={f.x2} y2={f.y2} {...S} />
      ))}

      {/* ── Left leg ── */}
      <line x1={180} y1={290} x2={170} y2={345} {...S} strokeWidth={5} />
      <line x1={170} y1={345} x2={162} y2={353} {...S} />
      <line x1={170} y1={345} x2={170} y2={355} {...S} />
      <line x1={170} y1={345} x2={179} y2={350} {...S} />

      {/* ── Right leg ── */}
      <line x1={230} y1={290} x2={233} y2={345} {...S} strokeWidth={5} />
      <line x1={233} y1={345} x2={224} y2={352} {...S} />
      <line x1={233} y1={345} x2={233} y2={355} {...S} />
      <line x1={233} y1={345} x2={241} y2={351} {...S} />

      {/* ── Left eyebrow arch ── */}
      <path d="M 166 191 L 174 181 L 182 191" {...S} strokeWidth={4} />
      <path d="M 202 191 L 210 181 L 218 191" {...S} strokeWidth={4} />
      {/* ── Smile ── */}
      <path d="M 183 212 Q 200 225 217 212" {...S} strokeWidth={3.5} />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   About Page
───────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <LenisScroll />
      <main style={{ backgroundColor: '#f0ede6' }}>

        {/* ══ HERO ══════════════════════════════════════ */}
        <section
          style={{
            minHeight: '100vh',
            backgroundColor: '#f0ede6',
            padding: '2.5rem 2.5rem 9rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative large number */}
          <div style={{
            position: 'absolute', right: '-2rem', bottom: '4rem',
            fontFamily: 'var(--font-outfit)', fontWeight: 900,
            fontSize: 'clamp(8rem,22vw,18rem)', color: 'rgba(43,22,10,0.04)',
            lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
          }}>01</div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-outfit)', fontSize: '0.68rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#a89880', marginBottom: '1.5rem', display: 'block',
            }}
          >
            Who we are
          </motion.span>

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 w-full justify-between">
            {/* Left – text */}
            <div className="w-full md:w-1/2 flex-grow">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                style={{
                  fontFamily: 'var(--font-outfit)', fontWeight: 900,
                  fontSize: 'clamp(3rem,8vw,7rem)', color: '#111',
                  letterSpacing: '-0.03em', lineHeight: 0.9, margin: '0 0 1.5rem',
                }}
              >
                We craft<br />
                <span style={{ color: '#2b160a' }}>stories</span><br />
                that move.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                style={{
                  fontFamily: 'var(--font-outfit)', fontSize: '1rem',
                  color: '#6b6057', lineHeight: 1.75, maxWidth: '38ch',
                  margin: '0 0 2.5rem',
                }}
              >
                ByTheBay is a creative studio at the intersection of brand
                direction, content, and culture. We build brands that feel alive
                — and campaigns people actually remember.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}
              >
                <Link
                  href="/contact"
                  style={{
                    fontFamily: 'var(--font-outfit)', fontWeight: 600,
                    fontSize: '0.85rem', padding: '0.75rem 1.75rem',
                    borderRadius: '100px', backgroundColor: '#2b160a',
                    color: '#e8e5de', textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  Work with us
                </Link>
                <Link
                  href="/works"
                  style={{
                    fontFamily: 'var(--font-outfit)', fontSize: '0.85rem',
                    color: '#6b6057', textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                  }}
                >
                  See our work →
                </Link>
              </motion.div>
            </div>

            {/* Right – Flork character */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="hidden md:block w-full md:w-1/2 max-w-[480px]"
              style={{
                aspectRatio: '4/5',
                filter: 'drop-shadow(0 16px 40px rgba(43,22,10,0.12))',
              }}
            >
              <FlorkCharacter />
            </motion.div>
          </div>
        </section>

        {/* ══ STORY (dark) ══════════════════════════════ */}
        <section className="btb-about-section-padding" style={{ backgroundColor: '#2b160a', padding: '6rem 2.5rem' }}>
          <div className="btb-about-story-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '4rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a89880', display: 'block', marginBottom: '1rem' }}>
                Our Story
              </span>
              <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: 'clamp(2rem,5vw,4rem)', color: '#e8e5de', letterSpacing: '-0.02em', lineHeight: 0.95, margin: '0 0 1.5rem' }}>
                Born by the<br />water.
              </h2>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '1rem', color: '#c8b89a', lineHeight: 1.75, margin: '0 0 1rem' }}>
                Founded on one belief: great creative work starts with real understanding.
                We don&apos;t just make things look beautiful — we make sure they mean something.
              </p>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '1rem', color: '#c8b89a', lineHeight: 1.75, margin: 0 }}>
                From brand identity to content strategy, from single campaigns to multi-year
                partnerships — we bring a fresh perspective to every project.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ height: '420px', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stockImg1-JAP5KRNxd7AxxiZqHfORVvCUPk9eMU.jpg"
                alt="Our studio"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(43,22,10,0.55), transparent)' }} />
            </motion.div>
          </div>
        </section>

        {/* ══ VALUES ════════════════════════════════════ */}
        <section className="btb-about-section-padding" style={{ backgroundColor: '#f0ede6', padding: '6rem 2.5rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}
            >
              <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: 'clamp(2rem,5vw,4rem)', color: '#111', letterSpacing: '-0.02em', margin: 0 }}>
                What drives us.
              </h2>
              <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.7rem', color: '#a89880', letterSpacing: '0.12em' }}>02 / VALUES</span>
            </motion.div>

            <div className="btb-about-values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 0, border: '1px solid #d0ccbf' }}>
              {[
                { num: '01', title: 'Authenticity', desc: 'We create work that feels genuine and true to your brand\'s core identity — never formulaic.' },
                { num: '02', title: 'Innovation', desc: 'We push creative boundaries constantly, exploring fresh approaches to every hard problem.' },
                { num: '03', title: 'Collaboration', desc: 'Your vision drives every decision. We\'re partners in the truest sense, not vendors.' },
                { num: '04', title: 'Excellence', desc: 'Every pixel, word, and frame is held to the highest possible standard. Always.' },
              ].map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="btb-value-item"
                  style={{
                    padding: '2.5rem',
                    borderRight: i % 2 === 0 ? '1px solid #d0ccbf' : 'none',
                    borderBottom: i < 2 ? '1px solid #d0ccbf' : 'none',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.65rem', color: '#a89880', display: 'block', marginBottom: '0.75rem' }}>{v.num}</span>
                  <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '1.4rem', color: '#111', margin: '0 0 0.75rem' }}>{v.title}</h3>
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.92rem', color: '#6b6057', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ STATS ═════════════════════════════════════ */}
        <section className="btb-about-stats-section" style={{ backgroundColor: '#1a1208', padding: '5rem 2.5rem' }}>
          <div className="btb-about-stats-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1px', backgroundColor: 'rgba(255,255,255,0.07)' }}>
            {[
              { num: '80+', label: 'Projects' },
              { num: '5yr', label: 'In the game' },
              { num: '3×', label: 'Avg ROI' },
              { num: '∞', label: 'Ambition' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="btb-stat-item"
                style={{ backgroundColor: '#1a1208', padding: '3.5rem 2rem', textAlign: 'center' }}
              >
                <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: 'clamp(2.5rem,6vw,4rem)', color: '#e8e5de', display: 'block', lineHeight: 1 }}>{s.num}</span>
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.65rem', color: '#a89880', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginTop: '0.5rem' }}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════ */}
        <section className="btb-about-cta-section" style={{ backgroundColor: '#f0ede6', padding: '7rem 2.5rem 10rem', textAlign: 'center' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: 'clamp(2.5rem,8vw,6rem)', color: '#111', letterSpacing: '-0.03em', lineHeight: 0.9, margin: '0 0 1.5rem' }}
          >
            Let&apos;s build<br />something.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-outfit)', fontSize: '1rem', color: '#6b6057', margin: '0 0 2.5rem' }}
          >
            Ready to start a conversation?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              style={{
                fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '0.9rem',
                padding: '1rem 2.5rem', borderRadius: '100px',
                backgroundColor: '#2b160a', color: '#e8e5de',
                textDecoration: 'none', display: 'inline-block',
                transition: 'transform 0.2s',
              }}
            >
              Get in touch →
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />

      <style>{`
        .btb-about-section-padding {
          padding: 3.5rem 1.5rem !important;
        }
        @media (min-width: 768px) {
          .btb-about-section-padding {
            padding: 6rem 2.5rem !important;
          }
        }
        
        .btb-about-story-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        @media (min-width: 768px) {
          .btb-about-story-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
        }

        .btb-about-values-grid {
          display: grid;
          grid-template-columns: 1fr !important;
          gap: 0;
          border: 1px solid #d0ccbf;
        }
        @media (min-width: 550px) {
          .btb-about-values-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (min-width: 900px) {
          .btb-about-values-grid {
            grid-template-columns: 1fr 1fr 1fr 1fr !important;
          }
        }

        .btb-value-item {
          padding: 2rem 1.5rem !important;
          border-right: none !important;
          border-bottom: 1px solid #d0ccbf !important;
        }
        .btb-value-item:last-child {
          border-bottom: none !important;
        }
        
        @media (min-width: 550px) and (max-width: 899px) {
          .btb-value-item {
            padding: 2.5rem !important;
          }
          .btb-value-item:nth-child(odd) {
            border-right: 1px solid #d0ccbf !important;
          }
          .btb-value-item:nth-child(1),
          .btb-value-item:nth-child(2) {
            border-bottom: 1px solid #d0ccbf !important;
          }
          .btb-value-item:nth-child(3),
          .btb-value-item:nth-child(4) {
            border-bottom: none !important;
          }
        }

        @media (min-width: 900px) {
          .btb-value-item {
            padding: 2.5rem !important;
            border-bottom: none !important;
          }
          .btb-value-item:not(:last-child) {
            border-right: 1px solid #d0ccbf !important;
          }
        }

        .btb-about-stats-section {
          padding: 3.5rem 1.5rem !important;
        }
        @media (min-width: 768px) {
          .btb-about-stats-section {
            padding: 5rem 2.5rem !important;
          }
        }

        .btb-about-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr !important;
          gap: 1px;
          background-color: rgba(255,255,255,0.07);
        }
        @media (min-width: 768px) {
          .btb-about-stats-grid {
            grid-template-columns: 1fr 1fr 1fr 1fr !important;
          }
        }

        .btb-stat-item {
          padding: 2.5rem 1rem !important;
        }
        @media (min-width: 768px) {
          .btb-stat-item {
            padding: 3.5rem 2rem !important;
          }
        }

        .btb-about-cta-section {
          padding: 4.5rem 1.5rem 7.5rem !important;
        }
        @media (min-width: 768px) {
          .btb-about-cta-section {
            padding: 7rem 2.5rem 10rem !important;
          }
        }
      `}</style>
    </>
  )
}
