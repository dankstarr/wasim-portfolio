'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import AnimatedText from '@/components/ui/AnimatedText'
import MagneticButton from '@/components/ui/MagneticButton'
import { personalInfo } from '@/data/portfolio'

// Dynamic import for Three.js scene to avoid SSR issues
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-primary flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <HeroScene />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 text-center"
        style={{ y, opacity, scale }}
      >
        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-text-secondary">Available for opportunities</span>
        </motion.div>

        {/* Main heading */}
        <div className="mb-6">
          <AnimatedText
            text={personalInfo.name}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight"
            delay={0.3}
          />
        </div>

        {/* Title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-2xl md:text-3xl lg:text-4xl gradient-text font-display font-semibold">
            {personalInfo.title}
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="max-w-2xl mx-auto text-lg md:text-xl text-text-secondary mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Building robust web & mobile applications with React, React Native, and Node.js.
          <span className="text-accent"> 4+ years</span> of crafting scalable solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <MagneticButton
            className="px-8 py-4 bg-accent text-white font-medium rounded-full hover:bg-accent-light transition-all glow"
            onClick={() => {
              const contactSection = document.getElementById('contact')
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            Get in Touch
          </MagneticButton>

          <MagneticButton
            className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all group"
            onClick={() => window.open(personalInfo.github, '_blank')}
          >
            <span className="flex items-center gap-2">
              View GitHub
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {[
            { value: '4+', label: 'Years Experience' },
            { value: '40%', label: 'Performance Boost' },
            { value: '5+', label: 'Projects Delivered' },
            { value: '95%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-text-secondary mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={handleScrollToAbout}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Social links */}
      <motion.div
        className="absolute left-6 bottom-1/4 hidden lg:flex flex-col gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4 }}
      >
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-accent transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-accent transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <div className="w-px h-20 bg-white/20 mx-auto mt-4" />
      </motion.div>

      {/* Email link */}
      <motion.a
        href={`mailto:${personalInfo.email}`}
        className="absolute right-6 bottom-1/4 hidden lg:block text-text-secondary hover:text-accent transition-colors text-sm tracking-widest"
        style={{ writingMode: 'vertical-rl' }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4 }}
      >
        {personalInfo.email}
      </motion.a>
    </section>
  )
}
