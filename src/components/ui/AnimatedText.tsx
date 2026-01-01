'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
  type?: 'words' | 'chars' | 'lines'
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  once = true,
  type = 'words'
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-100px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else if (!once) {
      controls.start('hidden')
    }
  }, [isInView, controls, once])

  const getElements = () => {
    switch (type) {
      case 'chars':
        return text.split('')
      case 'lines':
        return text.split('\n')
      case 'words':
      default:
        return text.split(' ')
    }
  }

  const elements = getElements()

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: type === 'chars' ? 0.02 : 0.08,
        delayChildren: delay,
      },
    },
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex flex-wrap">
        {elements.map((element, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block"
            style={{ transformOrigin: 'bottom', perspective: '1000px' }}
          >
            {element}
            {type === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        ))}
      </span>
    </motion.div>
  )
}
