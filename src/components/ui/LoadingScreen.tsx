'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    // Complete loading after progress reaches 100
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 grid-pattern opacity-20" />

          {/* Logo animation */}
          <motion.div
            className="relative z-10 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-6xl md:text-8xl font-display font-bold gradient-text"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              JS
            </motion.div>
          </motion.div>

          {/* Progress bar */}
          <div className="relative w-64 h-1 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            className="mt-4 text-text-secondary font-mono text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Loading experience...
          </motion.p>

          {/* Animated dots */}
          <div className="absolute bottom-20 flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-accent rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
