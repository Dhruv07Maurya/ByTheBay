'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number
  className?: string
}

export function ParallaxImage({ src, alt, speed = 0.5, className = '' }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return

    gsap.to(imageRef.current, {
      y: (i, target) => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return 0
        return gsap.getProperty(target, 'y') || 0
      },
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: 1,
        markers: false,
      },
      ease: 'none',
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div ref={imageRef} className="w-full h-full transform-gpu">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          quality={85}
        />
      </div>
    </div>
  )
}
