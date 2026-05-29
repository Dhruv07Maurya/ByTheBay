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
  const isTransitioningRef = useRef(false)

  // On every route change → UNCOVER (page reveal)
  useEffect(() => {
    const top = curtainTopRef.current
    const bot = curtainBotRef.current
    if (!top || !bot) return

    gsap.killTweensOf([top, bot])

    // Reset to covered, then uncover
    gsap.set(top, { scaleY: 1, transformOrigin: 'top center' })
    gsap.set(bot, { scaleY: 1, transformOrigin: 'bottom center' })

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioningRef.current = false
        gsap.set([top, bot], { pointerEvents: 'none' })
      },
    })

    tl.to(top, { scaleY: 0, duration: 0.65, ease: 'power3.inOut', delay: 0.05 }, 0)
    tl.to(bot, { scaleY: 0, duration: 0.65, ease: 'power3.inOut', delay: 0.15 }, 0)
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
      if (!top || !bot) {
        router.push(href)
        return
      }

      gsap.killTweensOf([top, bot])
      gsap.set([top, bot], { pointerEvents: 'all' })

      // Reset to uncovered
      gsap.set(top, { scaleY: 0, transformOrigin: 'top center' })
      gsap.set(bot, { scaleY: 0, transformOrigin: 'bottom center' })

      const tl = gsap.timeline({
        onComplete: () => {
          router.push(href)
        },
      })

      // Cover the screen — staggered for cinematic feel
      tl.to(top, { scaleY: 1, duration: 0.55, ease: 'power3.inOut' }, 0)
      tl.to(bot, { scaleY: 1, duration: 0.55, ease: 'power3.inOut', delay: 0.07 }, 0)
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
      {children}
    </>
  )
}
