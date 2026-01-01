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
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary pointer-events-none" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {/* Minimal text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-accent/80 mb-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            The Flow State
          </motion.p>

          <motion.h2
            className="text-3xl md:text-5xl lg:text-7xl font-display font-bold text-white/90 mb-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <span className="block">Techno.</span>
            <span className="block gradient-text">Black Coffee.</span>
            <span className="block">Code.</span>
          </motion.h2>

          <motion.p
            className="text-text-secondary text-sm md:text-base max-w-md mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
          >
            Where the beats sync with the keystrokes
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2 }}
          viewport={{ once: true }}
          animate={{ y: [0, 8, 0] }}
        >
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-2">
            <motion.div
              className="w-1 h-1 bg-accent rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 20, 0.4) 100%)'
      }} />
    </section>
  )
}
