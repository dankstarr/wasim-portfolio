'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const VibesScene = dynamic(() => import('@/components/three/VibesScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-primary">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

export default function Vibes() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0a15]">
      {/* Three.js Scene */}
      <VibesScene />

      {/* Top gradient fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary to-transparent pointer-events-none" />

      {/* Bottom content area */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        {/* Gradient fade */}
        <div className="h-40 bg-gradient-to-t from-primary via-primary/80 to-transparent" />

        {/* Content */}
        <div className="bg-primary pb-16 md:pb-20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.p
                className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-accent mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                My Happy Place
              </motion.p>

              <motion.h2
                className="text-2xl md:text-4xl font-display font-bold text-white mb-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Techno + Coffee + Code
              </motion.h2>

              <motion.p
                className="text-text-secondary text-sm md:text-base mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Click the vinyl player to vibe with me
              </motion.p>

              {/* Subtle hint */}
              <motion.div
                className="inline-flex items-center gap-2 text-xs text-text-secondary/60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>Interactive 3D Scene</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
