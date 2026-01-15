'use client'

import { useRef, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import AnimatedText from '@/components/ui/AnimatedText'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { personalInfo, getMailtoUrl } from '@/data/portfolio'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import SafeImage from '@/components/ui/SafeImage'

// Dynamic import for Three.js scene to avoid SSR issues
const HeroScene = dynamic(() => import('@/components/three/HeroScene').catch((error) => {
  console.error('Failed to load HeroScene:', error)
  return { default: () => null }
}), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-primary flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

// Fallback component if Three.js fails
function HeroSceneFallback() {
  return (
    <div className="absolute inset-0 -z-10 bg-primary">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
    </div>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.9])

  const handleScrollToAbout = useCallback(() => {
    try {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' })
      } else if (typeof window !== 'undefined') {
        window.location.hash = '#about'
      }
    } catch (error) {
      console.error('Scroll to about error:', error)
      if (typeof window !== 'undefined') {
        window.location.hash = '#about'
      }
    }
  }, [])

  const handleContactClick = useCallback(() => {
    try {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      } else if (typeof window !== 'undefined') {
        window.location.hash = '#contact'
      }
    } catch (error) {
      console.error('Scroll to contact error:', error)
      if (typeof window !== 'undefined') {
        window.location.hash = '#contact'
      }
    }
  }, [])


  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-visible pt-20 md:pt-24"
      aria-label="Hero section"
    >
      {/* 3D Background */}
      <ErrorBoundary fallback={<HeroSceneFallback />}>
        <HeroScene />
      </ErrorBoundary>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 md:px-6 text-center pb-8"
        style={{ y, opacity, scale }}
      >
        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2.5 px-4 md:px-5 py-2 md:py-2.5 rounded-full glass mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{ willChange: 'transform, opacity' }}
          role="status"
          aria-live="polite"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
          <span className="text-xs md:text-sm text-text-secondary font-medium">Available for opportunities</span>
        </motion.div>

        {/* Avatar and Name - Side by Side */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-4 md:mb-6">
          {/* Avatar */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative">
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent via-purple-500 to-accent blur-xl opacity-40"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ willChange: 'transform, opacity' }}
              />
              
              {/* Glass border */}
              <div className="relative p-1 rounded-full glass border-2 border-white/20">
                {/* Avatar image */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden">
                  <SafeImage
                    src="/avatar.png"
                    alt="Wasim Ekram"
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    width={160}
                    height={160}
                    sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 160px"
                  />
                  {/* Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                </div>
              </div>

              {/* Floating particles effect */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-accent rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [
                      Math.cos((i * Math.PI * 2) / 6) * 50,
                      Math.cos((i * Math.PI * 2) / 6) * 70,
                      Math.cos((i * Math.PI * 2) / 6) * 50,
                    ],
                    y: [
                      Math.sin((i * Math.PI * 2) / 6) * 50,
                      Math.sin((i * Math.PI * 2) / 6) * 70,
                      Math.sin((i * Math.PI * 2) / 6) * 50,
                    ],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Main heading */}
          <h1 className="flex flex-col">
            <AnimatedText
              text="Wasim"
              className="text-4xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight block select-text"
              delay={0.3}
            />
            <AnimatedText
              text="Ekram"
              className="text-4xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight block select-text"
              delay={0.35}
            />
          </h1>
        </div>

        {/* Title */}
        <motion.p
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          style={{ willChange: 'transform, opacity' }}
        >
          <span className="text-xl md:text-3xl lg:text-4xl gradient-text font-display font-semibold select-text">
            {personalInfo.title}
          </span>
        </motion.p>

        {/* Description */}
        <motion.p
          className="max-w-2xl mx-auto text-sm md:text-lg lg:text-xl text-text-secondary mb-8 md:mb-12 px-4 select-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{ willChange: 'transform, opacity' }}
        >
          Building scalable, accessible, and data-driven web applications with React, Next.js, Flask, and Python.
          <span className="text-accent"> 7+ years</span> of experience delivering enterprise, academic, and freelance solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          style={{ willChange: 'transform, opacity' }}
        >
          <MagneticButton
            className="px-6 md:px-8 py-3 md:py-4 bg-accent text-white font-medium rounded-full hover:bg-accent-light transition-all glow text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary min-h-[44px]"
            onClick={handleContactClick}
            aria-label="Navigate to contact section"
          >
            Get in Touch
          </MagneticButton>

          <MagneticButton
            as="a"
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 md:px-8 py-3 md:py-4 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary min-h-[44px]"
            aria-label="Visit GitHub profile (opens in new tab)"
          >
            <span className="flex items-center gap-2">
              View GitHub
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          style={{ 
            willChange: 'transform, opacity',
            position: 'relative',
            zIndex: 20,
          }}
          role="list"
          aria-label="Professional achievements"
        >
          {[
            { value: '7+', label: 'Years Experience' },
            { value: '60%', label: 'Performance Improvement' },
            { value: '30+', label: 'Websites Delivered' },
            { value: '250+', label: 'Sites Maintained' },
          ].map((stat, index) => (
            <div key={index} className="text-center" role="listitem">
              <div className="text-2xl md:text-4xl font-display font-bold gradient-text select-text" aria-label={stat.value}>
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-text-secondary mt-1 select-text">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded-lg"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={handleScrollToAbout}
        aria-label="Scroll to about section"
      >
        <div className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5 md:pt-2" aria-hidden="true">
          <motion.div
            className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.button>

      {/* Social links - hidden on mobile */}
      <motion.nav
        className="absolute left-6 bottom-1/4 hidden lg:flex flex-col gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4 }}
        aria-label="Social media links"
      >
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-white hover:bg-white/5 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
          aria-label="Visit GitHub profile (opens in new tab)"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-white hover:bg-white/5 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
          aria-label="Visit LinkedIn profile (opens in new tab)"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <div className="w-px h-20 bg-white/20 mx-auto mt-4" aria-hidden="true" />
      </motion.nav>

      {/* Email link - hidden on mobile */}
      <a
        href={getMailtoUrl(personalInfo.email)}
        className="absolute right-6 bottom-1/4 hidden lg:block text-text-secondary hover:text-white hover:bg-white/5 transition-all duration-300 text-sm tracking-widest min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg px-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
        style={{ writingMode: 'vertical-rl' }}
        aria-label={`Send email to ${personalInfo.email}`}
      >
        📧 {personalInfo.email}
      </a>
    </section>
  )
}
