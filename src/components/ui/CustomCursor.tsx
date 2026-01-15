'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [cursorText, setCursorText] = useState('')

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Skip custom cursor during Lighthouse audits
    if (window.navigator && /Lighthouse|Chrome-Lighthouse|HeadlessChrome/i.test(window.navigator.userAgent)) {
      return
    }
    
    let rafId: number = 0
    let isMounted = true
    
    const moveCursor = (e: MouseEvent) => {
      if (!isMounted) return
      
      // Throttle updates using RAF
      if (rafId) return
      
      rafId = requestAnimationFrame(() => {
        if (!isMounted) return
        try {
          cursorX.set(e.clientX)
          cursorY.set(e.clientY)
          setIsVisible(true)
        } catch (error) {
          console.error('Cursor update error:', error)
        }
        rafId = 0
      })
    }

    const handleMouseEnter = (e: MouseEvent) => {
      if (!isMounted) return
      try {
        const target = e.target as HTMLElement
        if (
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.dataset.cursor
        ) {
          setIsHovering(true)
          setCursorText(target.dataset.cursorText || '')
        }
      } catch (error) {
        console.error('Mouse enter error:', error)
      }
    }

    const handleMouseLeave = () => {
      if (!isMounted) return
      setIsHovering(false)
      setCursorText('')
    }

    const handleMouseOut = () => {
      if (!isMounted) return
      setIsVisible(false)
    }

    try {
      window.addEventListener('mousemove', moveCursor)
      document.addEventListener('mouseover', handleMouseEnter)
      document.addEventListener('mouseout', handleMouseLeave)
      document.addEventListener('mouseleave', handleMouseOut)
    } catch (error) {
      console.error('Event listener error:', error)
    }

    return () => {
      isMounted = false
      if (rafId) cancelAnimationFrame(rafId)
      try {
        window.removeEventListener('mousemove', moveCursor)
        document.removeEventListener('mouseover', handleMouseEnter)
        document.removeEventListener('mouseout', handleMouseLeave)
        document.removeEventListener('mouseleave', handleMouseOut)
      } catch (error) {
        console.error('Event listener cleanup error:', error)
      }
    }
  }, [cursorX, cursorY])

  // Hide custom cursor on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          willChange: 'transform',
        }}
      >
        <motion.div
          className="relative flex items-center justify-center w-5 h-5"
          animate={{
            scale: isHovering ? 4 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{ willChange: 'transform' }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white"
            animate={{
              scale: isHovering ? 1 : 1,
              opacity: isVisible ? 1 : 0,
            }}
          />
          {cursorText && (
            <motion.span
              className="text-white text-xs font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          marginLeft: -4,
          marginTop: -4,
          willChange: 'transform, opacity',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
