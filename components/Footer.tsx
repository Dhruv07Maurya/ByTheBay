'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'America/New_York',
        }) + ' GMT-4'
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer style={{ backgroundColor: '#e8e5de', fontFamily: 'var(--font-outfit)' }}>

      {/* ── Main info row ─────────────────────────────────── */}
      <div style={{ borderTop: '1px solid #b5b0a6', borderBottom: '1px solid #b5b0a6' }}>
        <div
          className="btb-foot-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            alignItems: 'start',
            padding: '2rem 2rem 2.5rem',
          }}
        >
          {/* LEFT – Follow */}
          <div>
            <p
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#3b1f14',
                marginBottom: '1rem',
                fontWeight: 500,
              }}
            >
              (Follow)
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {[
                { label: 'INSTAGRAM', href: '#' },
                { label: 'LINKEDIN', href: '#' },
                { label: 'BEHANCE', href: '#' },
                { label: 'EMAIL', href: 'mailto:hello@bythebay.studio' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    color: '#1a1208',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* CENTER – Back to Top */}
          <div className="btb-foot-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '2.5rem' }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#3b1f14',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-outfit)',
                fontWeight: 500,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              BACK TO TOP
            </button>
          </div>

          {/* RIGHT – Navigation */}
          <div className="btb-foot-right" style={{ textAlign: 'right' }}>
            <p
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#3b1f14',
                marginBottom: '1rem',
                fontWeight: 500,
              }}
            >
              (Navigation)
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {[
                { label: 'HOME', href: '/' },
                { label: 'WORKS', href: '/works' },
                { label: 'BREAK', href: '#' },
                { label: 'ABOUT', href: '/about' },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    color: '#1a1208',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Marquee band ──────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#2b160a',
          overflow: 'hidden',
          padding: '1.25rem 0',
        }}
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              style={{
                fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                fontWeight: 900,
                color: '#e8e5de',
                fontFamily: 'var(--font-outfit)',
                letterSpacing: '-0.02em',
                paddingRight: '2rem',
                lineHeight: 1,
              }}
            >
              LET&apos;S TALK&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────── */}
      <div
        className="btb-foot-bottom"
        style={{
          backgroundColor: '#eedcb5ff',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderBottom: '3px solid rgba(54, 54, 54, 0.1)',
          padding: '0.6rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '0.6rem', color: '#2b160a', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          ● MUMBAI, IN &nbsp; {time}
        </span>
        <span style={{ fontSize: '0.6rem', color: '#2b160a', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          © {currentYear} ALL RIGHTS RESERVED
        </span>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .btb-foot-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
            padding: 2rem 1.5rem !important;
          }
          .btb-foot-center {
            grid-column: 1 / -1;
            justify-content: center !important;
            padding-top: 1rem !important;
            order: 3;
          }
          .btb-foot-right {
            text-align: right !important;
          }
          .btb-foot-bottom {
            flex-direction: column !important;
            gap: 0.5rem !important;
            text-align: center !important;
            padding: 1rem 1.5rem !important;
          }
        }
      `}</style>
    </footer>
  )
}
