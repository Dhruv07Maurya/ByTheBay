'use client'

import { useEffect, useRef, useState } from 'react'

const spriteSets: Record<string, number[][]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
}

export function OnekoCat() {
  const nekoRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      // strictly desktop screen (>= 768px)
      setIsDesktop(window.innerWidth >= 768)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    // Prefers reduced motion check
    const isReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) return

    const nekoEl = nekoRef.current
    if (!nekoEl) return

    let nekoPosX = 32
    let nekoPosY = 32
    let mousePosX = 0
    let mousePosY = 0
    let frameCount = 0
    let idleTime = 0
    let idleAnimation: string | null = null
    let idleAnimationFrame = 0
    const nekoSpeed = 22

    // Try load stored position
    try {
      const stored = window.localStorage.getItem('oneko')
      if (stored) {
        const parsed = JSON.parse(stored)
        nekoPosX = parsed.nekoPosX ?? 32
        nekoPosY = parsed.nekoPosY ?? 32
        mousePosX = parsed.mousePosX ?? 0
        mousePosY = parsed.mousePosY ?? 0
        frameCount = parsed.frameCount ?? 0
        idleTime = parsed.idleTime ?? 0
        idleAnimation = parsed.idleAnimation ?? null
        idleAnimationFrame = parsed.idleAnimationFrame ?? 0
        if (parsed.bgPos) {
          nekoEl.style.backgroundPosition = parsed.bgPos
        }
      }
    } catch (e) {
      // ignore storage errors
    }

    nekoEl.style.left = `${nekoPosX - 16}px`
    nekoEl.style.top = `${nekoPosY - 16}px`

    const handleMouseMove = (event: MouseEvent) => {
      mousePosX = event.clientX
      mousePosY = event.clientY
    }
    document.addEventListener('mousemove', handleMouseMove)

    const handleUnload = () => {
      try {
        window.localStorage.setItem(
          'oneko',
          JSON.stringify({
            nekoPosX,
            nekoPosY,
            mousePosX,
            mousePosY,
            frameCount,
            idleTime,
            idleAnimation,
            idleAnimationFrame,
            bgPos: nekoEl.style.backgroundPosition,
          })
        )
      } catch (e) {
        // ignore storage errors
      }
    }
    window.addEventListener('beforeunload', handleUnload)

    let lastFrameTimestamp = 0
    let animationFrameId: number

    function setSprite(name: string, frame: number) {
      const set = spriteSets[name]
      if (!set) return
      const sprite = set[frame % set.length]
      if (nekoEl) {
        nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`
      }
    }

    function resetIdleAnimation() {
      idleAnimation = null
      idleAnimationFrame = 0
    }

    function idle() {
      idleTime += 1

      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) === 0 &&
        idleAnimation === null
      ) {
        const availableAnimations = ['sleeping', 'scratchSelf']
        if (nekoPosX < 32) availableAnimations.push('scratchWallW')
        if (nekoPosY < 32) availableAnimations.push('scratchWallN')
        if (nekoPosX > window.innerWidth - 32) availableAnimations.push('scratchWallE')
        if (nekoPosY > window.innerHeight - 32) availableAnimations.push('scratchWallS')
        
        idleAnimation = availableAnimations[Math.floor(Math.random() * availableAnimations.length)]
      }

      switch (idleAnimation) {
        case 'sleeping':
          if (idleAnimationFrame < 8) {
            setSprite('tired', 0)
            break
          }
          setSprite('sleeping', Math.floor(idleAnimationFrame / 4))
          if (idleAnimationFrame > 192) {
            resetIdleAnimation()
          }
          break
        case 'scratchWallN':
        case 'scratchWallS':
        case 'scratchWallE':
        case 'scratchWallW':
        case 'scratchSelf':
          setSprite(idleAnimation, idleAnimationFrame)
          if (idleAnimationFrame > 9) {
            resetIdleAnimation()
          }
          break
        default:
          setSprite('idle', 0)
          return
      }
      idleAnimationFrame += 1
    }

    function frame() {
      frameCount += 1
      const diffX = nekoPosX - mousePosX
      const diffY = nekoPosY - mousePosY
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2)

      if (distance < nekoSpeed || distance < 48) {
        idle()
        return
      }

      idleAnimation = null
      idleAnimationFrame = 0

      if (idleTime > 1) {
        setSprite('alert', 0)
        idleTime = Math.min(idleTime, 7)
        idleTime -= 1
        return
      }

      let direction = ''
      direction = diffY / distance > 0.5 ? 'N' : ''
      direction += diffY / distance < -0.5 ? 'S' : ''
      direction += diffX / distance > 0.5 ? 'W' : ''
      direction += diffX / distance < -0.5 ? 'E' : ''
      setSprite(direction, frameCount)

      nekoPosX -= (diffX / distance) * nekoSpeed
      nekoPosY -= (diffY / distance) * nekoSpeed

      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16)
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16)

      if (nekoEl) {
        nekoEl.style.left = `${nekoPosX - 16}px`
        nekoEl.style.top = `${nekoPosY - 16}px`
      }
    }

    function onAnimationFrame(timestamp: number) {
      if (!lastFrameTimestamp) {
        lastFrameTimestamp = timestamp
      }
      if (timestamp - lastFrameTimestamp > 100) {
        lastFrameTimestamp = timestamp
        frame()
      }
      animationFrameId = window.requestAnimationFrame(onAnimationFrame)
    }

    animationFrameId = window.requestAnimationFrame(onAnimationFrame)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('beforeunload', handleUnload)
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <div
      ref={nekoRef}
      style={{
        width: '32px',
        height: '32px',
        position: 'fixed',
        pointerEvents: 'none',
        imageRendering: 'pixelated',
        zIndex: 999999,
        backgroundImage: 'url("/oneko.gif")',
        left: '-32px',
        top: '-32px',
      }}
    />
  )
}
