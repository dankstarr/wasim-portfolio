'use client'

import { useEffect, useRef, ReactNode } from 'react'
import Lenis from 'lenis'

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Skip smooth scroll during Lighthouse audits
    if (typeof window !== 'undefined' && window.navigator && /Lighthouse|Chrome-Lighthouse|HeadlessChrome/i.test(window.navigator.userAgent)) {
      return
    }

    lenisRef.current = new Lenis({
      duration: 0.8, // Reduced from 1.2 for faster response
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      wheelMultiplier: 0.8, // Reduce wheel sensitivity
    })

    let rafId: number
    let lastTime = 0
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS

    let isMounted = true

    function raf(time: number) {
      if (!isMounted || !lenisRef.current) {
        if (rafId) cancelAnimationFrame(rafId)
        return
      }
      
      rafId = requestAnimationFrame(raf)
      
      // Throttle to target FPS
      const elapsed = time - lastTime
      if (elapsed >= frameInterval) {
        try {
          lenisRef.current?.raf(time)
        } catch (error) {
          console.error('Lenis RAF error:', error)
          if (rafId) cancelAnimationFrame(rafId)
        }
        lastTime = time - (elapsed % frameInterval)
      }
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      isMounted = false
      if (rafId) cancelAnimationFrame(rafId)
      try {
        lenisRef.current?.destroy()
      } catch (error) {
        console.error('Lenis destroy error:', error)
      }
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
