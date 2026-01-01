'use client'

import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  strength?: number
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.3
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 300 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const rotateX = useTransform(ySpring, [-50, 50], [5, -5])
  const rotateY = useTransform(xSpring, [-50, 50], [-5, 5])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = (e.clientX - centerX) * strength
    const distanceY = (e.clientY - centerY) * strength

    x.set(distanceX)
    y.set(distanceY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      className={`magnetic-btn ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: xSpring,
        y: ySpring,
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}
