'use client'

import { useState, useEffect, useRef } from 'react'

interface MousePosition {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  })
  const rafRef = useRef<number>()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateMousePosition = (event: MouseEvent) => {
      try {
        // Cancel previous RAF
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }

        // Use RAF to throttle updates
        rafRef.current = requestAnimationFrame(() => {
          try {
            const { clientX, clientY } = event
            const normalizedX = (clientX / window.innerWidth) * 2 - 1
            const normalizedY = -(clientY / window.innerHeight) * 2 + 1

            setMousePosition({
              x: clientX,
              y: clientY,
              normalizedX,
              normalizedY,
            })
          } catch (error) {
            console.error('Mouse position update error:', error)
          }
        })
      } catch (error) {
        console.error('Mouse position handler error:', error)
      }
    }

    try {
      window.addEventListener('mousemove', updateMousePosition, { passive: true })
    } catch (error) {
      console.error('Failed to add mouse event listener:', error)
    }

    return () => {
      try {
        window.removeEventListener('mousemove', updateMousePosition)
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }
      } catch (error) {
        console.error('Failed to cleanup mouse event listener:', error)
      }
    }
  }, [])

  return mousePosition
}
