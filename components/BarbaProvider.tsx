'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'

/**
 * CinematicTransition
 *
 * A GSAP-powered full-page curtain transition system that intercepts
 * internal navigation link clicks, runs a cinematic wipe-in/out animation,
 * then navigates to the new page.
 *
 * Works by:
 *  1. Rendering two overlapping "curtain" divs (top & bottom halves) as a
 *     fixed full-screen overlay.
 *  2. Intercepting clicks on internal <a> links globally.
 *  3. On click → GSAP animates curtains to COVER the screen (0.5s).
 *  4. After cover → navigate via router.push().
 *  5. On new page load → GSAP animates curtains to UNCOVER (0.5s).
 */
export function CinematicTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const curtainTopRef = useRef<HTMLDivElement>(null)
  const curtainBotRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isTransitioningRef = useRef(false)

  // On every route change → Reveal new page
  useEffect(() => {
    const top = curtainTopRef.current
    const bot = curtainBotRef.current
    const content = contentRef.current
    if (!top || !bot) return

    gsap.killTweensOf([top, bot, content])

    // Reset curtains to fully covered
    gsap.set(top, { scaleY: 1, transformOrigin: 'top center' })
    gsap.set(bot, { scaleY: 1, transformOrigin: 'bottom center' })

    // Reset content to faded out and slightly scaled down
    if (content) {
      gsap.set(content, { opacity: 0, scale: 0.98, y: 10 })
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioningRef.current = false
        gsap.set([top, bot], { pointerEvents: 'none' })
      },
    })

    // Curtains split open smoothly (Expo curve)
    tl.to(top, { scaleY: 0, duration: 0.75, ease: 'expo.out' }, 0)
    tl.to(bot, { scaleY: 0, duration: 0.75, ease: 'expo.out' }, 0)

    // Content fades & slides up gently
    if (content) {
      tl.to(content, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.08 }, 0)
    }
  }, [pathname])

  // Intercept clicks on internal links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      // Skip: external, hash-only, or already transitioning
      const isExternal =
        anchor.target === '_blank' ||
        href.startsWith('http') ||
        href.startsWith('mailto') ||
        href.startsWith('tel')
      const isHashOnly = href.startsWith('#')
      const isSamePage = href === pathname

      if (isExternal || isHashOnly || isSamePage || isTransitioningRef.current) return

      e.preventDefault()
      isTransitioningRef.current = true

      const top = curtainTopRef.current
      const bot = curtainBotRef.current
      const content = contentRef.current
      if (!top || !bot) {
        router.push(href)
        return
      }

      gsap.killTweensOf([top, bot, content])
      gsap.set([top, bot], { pointerEvents: 'all' })

      // Reset curtains to fully open (uncovered)
      gsap.set(top, { scaleY: 0, transformOrigin: 'top center' })
      gsap.set(bot, { scaleY: 0, transformOrigin: 'bottom center' })

      const tl = gsap.timeline({
        onComplete: () => {
          router.push(href)
        },
      })

      // Fade & scale out the current content
      if (content) {
        tl.to(content, { opacity: 0, scale: 0.98, y: -10, duration: 0.45, ease: 'power3.inOut' }, 0)
      }

      // Close the curtains (cover screen)
      tl.to(top, { scaleY: 1, duration: 0.55, ease: 'expo.inOut', delay: 0.05 }, 0)
      tl.to(bot, { scaleY: 1, duration: 0.55, ease: 'expo.inOut', delay: 0.05 }, 0)
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname, router])

  return (
    <>
      {/* ── Cinematic curtains ── */}
      {/* Top curtain: covers from top → scaleY 0→1 on leave, 1→0 on enter */}
      <div
        ref={curtainTopRef}
        style={{
          position: 'fixed',
          inset: 0,
          bottom: '50%',
          backgroundColor: '#1a1208',
          zIndex: 99999,
          transformOrigin: 'top center',
          scaleY: 0,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
        aria-hidden
      />
      {/* Bottom curtain */}
      <div
        ref={curtainBotRef}
        style={{
          position: 'fixed',
          inset: 0,
          top: '50%',
          backgroundColor: '#1a1208',
          zIndex: 99999,
          transformOrigin: 'bottom center',
          scaleY: 0,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
        aria-hidden
      />
      <div ref={contentRef} style={{ willChange: 'opacity, transform' }}>
        {children}
      </div>
    </>
  )
}
