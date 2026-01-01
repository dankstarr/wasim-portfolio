'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GradientBorderProps {
  children: ReactNode
  className?: string
  borderWidth?: number
  animate?: boolean
}

export default function GradientBorder({
  children,
  className = '',
  borderWidth = 2,
  animate = true
}: GradientBorderProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Gradient border */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          padding: borderWidth,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef, #6366f1)',
          backgroundSize: '400% 400%',
        }}
        animate={animate ? {
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        } : undefined}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-full h-full bg-secondary rounded-2xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 bg-secondary rounded-2xl">
        {children}
      </div>
    </div>
  )
}
