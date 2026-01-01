'use client'

import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
  as?: 'button' | 'div' | 'a'
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
}

export default function Magnetic({
  children,
  className = '',
  strength = 0.3,
  as = 'div',
  onClick,
  href,
  target,
  rel,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 400 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const rotateX = useTransform(ySpring, [-50, 50], [3, -3])
  const rotateY = useTransform(xSpring, [-50, 50], [-3, 3])

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

  const Component = motion[as] as typeof motion.div

  const props = {
    ref,
    className: `magnetic-wrap inline-block ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: {
      x: xSpring,
      y: ySpring,
      rotateX,
      rotateY,
      transformPerspective: 1000,
    },
    ...(as === 'button' && { onClick, type: 'button' as const }),
    ...(as === 'a' && { href, target, rel }),
  }

  return <Component {...props}>{children}</Component>
}

// Simple wrapper for buttons with magnetic effect
export function MagneticButton({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}) {
  const ref = useRef<HTMLButtonElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 400 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: xSpring,
        y: ySpring,
      }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
