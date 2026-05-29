'use client'

import { LenisScroll } from '@/components/LenisScroll'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [time, setTime] = useState('')
  const [focused, setFocused] = useState<string | null>(null)

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', message: '' })
      setSubmitted(false)
    }, 4000)
  }

  const fieldStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `2px solid ${focused === name ? '#2b160a' : '#d4cfc8'}`,
    outline: 'none',
    padding: '0.6rem 0',
    fontFamily: 'var(--font-outfit)',
    fontSize: '1rem',
    color: '#111',
    transition: 'border-color 0.25s ease',
    boxSizing: 'border-box',
  })

  return (
    <>
      <LenisScroll />
      <main style={{ minHeight: '100vh', backgroundColor: '#f0ede6', paddingBottom: '7rem' }}>

        {/* ── Top bar ── */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          padding: '1.5rem 1.5rem',
          borderBottom: '1px solid rgba(43,22,10,0.1)',
          backgroundColor: '#f0ede6',
        }}>
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', textDecoration: 'none' }}>
              <span style={{ fontFamily: 'var(--font-playfair)', fontWeight: 900, fontSize: 'clamp(1.6rem,4vw,2.8rem)', color: '#111', lineHeight: 1 }}>
                ByTheBay
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-outfit)', fontSize: '0.75rem', lineHeight: 1.4, color: '#744f3a', paddingTop: '2px' }}>
                <span>Studio</span>
                <span>Community</span>
                <span>Space</span>
              </div>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '4px' }}>
            <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.8rem', color: '#999' }}>{time}</span>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2b160a' }} />
          </motion.div>
        </div>

        {/* ── Page heading ── */}
        <div style={{ padding: '3.5rem 1.5rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#744f3a', marginBottom: '1rem' }}
          >
            Get in touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: 'clamp(2.8rem,8vw,6.5rem)', color: '#111', letterSpacing: '-0.03em', lineHeight: 0.9, margin: 0 }}
          >
            Send us a<br />Message
          </motion.h1>
        </div>

        {/* ── Content grid ── */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0' }}>
          <div className="contact-grid">

            {/* ── Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.2 }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                  style={{
                    padding: '2.5rem', borderRadius: '16px',
                    backgroundColor: '#2b160a', color: '#f0ede6',
                  }}
                >
                  <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                    Message sent ✦
                  </h3>
                  <p style={{ fontFamily: 'var(--font-outfit)', opacity: 0.75, lineHeight: 1.6 }}>
                    We&apos;ve received your message and will get back to you within 24–48 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  {/* Name */}
                  <div>
                    <label htmlFor="name" style={{ display: 'block', fontFamily: 'var(--font-outfit)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#744f3a', marginBottom: '0.6rem' }}>
                      Your Name *
                    </label>
                    <input
                      type="text" id="name" name="name"
                      value={formData.name} onChange={handleChange}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                      required
                      placeholder="Jane Smith"
                      style={fieldStyle('name')}
                    />
                  </div>

                  {/* Email + Company side by side on desktop */}
                  <div className="contact-row">
                    <div style={{ flex: 1 }}>
                      <label htmlFor="email" style={{ display: 'block', fontFamily: 'var(--font-outfit)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#744f3a', marginBottom: '0.6rem' }}>
                        Email Address *
                      </label>
                      <input
                        type="email" id="email" name="email"
                        value={formData.email} onChange={handleChange}
                        onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                        required
                        placeholder="jane@example.com"
                        style={fieldStyle('email')}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label htmlFor="company" style={{ display: 'block', fontFamily: 'var(--font-outfit)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#744f3a', marginBottom: '0.6rem' }}>
                        Company / Brand
                      </label>
                      <input
                        type="text" id="company" name="company"
                        value={formData.company} onChange={handleChange}
                        onFocus={() => setFocused('company')} onBlur={() => setFocused(null)}
                        placeholder="Your Brand"
                        style={fieldStyle('company')}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" style={{ display: 'block', fontFamily: 'var(--font-outfit)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#744f3a', marginBottom: '0.6rem' }}>
                      Project Details *
                    </label>
                    <textarea
                      id="message" name="message"
                      value={formData.message} onChange={handleChange}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                      required rows={6}
                      placeholder="Tell us about your project, goals, timeline..."
                      style={{
                        ...fieldStyle('message'),
                        resize: 'none',
                        borderBottom: 'none',
                        border: `2px solid ${focused === 'message' ? '#2b160a' : '#d4cfc8'}`,
                        borderRadius: '10px',
                        padding: '1rem',
                        lineHeight: 1.6,
                        transition: 'border-color 0.25s ease',
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    style={{
                      alignSelf: 'flex-start',
                      padding: '0.85rem 2.5rem',
                      backgroundColor: '#1a1208',
                      color: '#f0ede6',
                      fontFamily: 'var(--font-outfit)',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      letterSpacing: '0.03em',
                      border: 'none',
                      borderRadius: '999px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    Send Message →
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* ── Info panel ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
            >
              {/* Email */}
              <div style={{ paddingBottom: '2rem', borderBottom: '1px solid rgba(43,22,10,0.1)' }}>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#744f3a', marginBottom: '0.7rem' }}>
                  Email
                </p>
                <a href="mailto:hello@bythebay.studio" style={{ fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: 'clamp(1rem,2.5vw,1.35rem)', color: '#111', textDecoration: 'none' }}>
                  hello@bythebay.studio
                </a>
              </div>

              {/* Follow */}
              <div style={{ paddingBottom: '2rem', borderBottom: '1px solid rgba(43,22,10,0.1)' }}>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#744f3a', marginBottom: '0.7rem' }}>
                  Follow
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {['Instagram', 'LinkedIn', 'Behance'].map((s) => (
                    <a key={s} href="#" style={{ fontFamily: 'var(--font-outfit)', fontWeight: 500, fontSize: '1.05rem', color: '#2b160a', textDecoration: 'none' }}>
                      {s} ↗
                    </a>
                  ))}
                </div>
              </div>

              {/* Response time */}
              <div style={{ paddingBottom: '2rem', borderBottom: '1px solid rgba(43,22,10,0.1)' }}>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#744f3a', marginBottom: '0.7rem' }}>
                  Response Time
                </p>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.95rem', color: '#555', lineHeight: 1.6 }}>
                  Within 24–48 hours. For urgent matters, reach us directly by email.
                </p>
              </div>

              {/* Location */}
              <div>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#744f3a', marginBottom: '0.7rem' }}>
                  Based In
                </p>
                <p style={{ fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '1rem', color: '#111' }}>
                  San Francisco Bay Area, CA
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <style>{`
        /* Two-column on desktop, single column on mobile */
        .contact-grid {
          display: grid;
          gap: 4rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 3fr 2fr;
            gap: 5rem;
          }
        }

        /* Email + Company row */
        .contact-row {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        @media (min-width: 540px) {
          .contact-row {
            flex-direction: row;
            gap: 2.5rem;
          }
        }

        /* Kill browser autofill background */
        input:-webkit-autofill,
        textarea:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px #f0ede6 inset !important;
          -webkit-text-fill-color: #111 !important;
        }

        /* Placeholder colour */
        input::placeholder,
        textarea::placeholder {
          color: #b0a898;
          font-family: var(--font-outfit);
        }
      `}</style>
    </>
  )
}
