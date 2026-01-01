'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const VibesScene = dynamic(() => import('@/components/three/VibesScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

export default function Vibes() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-primary">
      {/* Three.js Scene */}
      <VibesScene />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/80 pointer-events-none" />

      {/* Content overlay - positioned at bottom */}
      <div className="absolute inset-x-0 bottom-0 pb-20 md:pb-24 pointer-events-none">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="font-mono text-xs tracking-[0.3em] uppercase text-accent/80 mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              The Flow State
            </motion.p>

            <motion.h2
              className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white/90 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
            >
              <span className="gradient-text">Techno + Black Coffee + Code</span>
            </motion.h2>

            <motion.p
              className="text-text-secondary text-sm md:text-base max-w-md mx-auto mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
            >
              Click the jukebox to vibe with me
            </motion.p>

            {/* Visual hint */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs md:text-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              viewport={{ once: true }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(139, 92, 246, 0.3)',
                  '0 0 40px rgba(139, 92, 246, 0.5)',
                  '0 0 20px rgba(139, 92, 246, 0.3)',
                ]
              }}
            >
              <span className="text-accent">♪</span>
              <span className="text-text-secondary">Interactive 3D Scene</span>
              <span className="text-accent">♪</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 2 }}
        viewport={{ once: true }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 20, 0.6) 100%)'
        }}
      />
    </section>
  )
}
