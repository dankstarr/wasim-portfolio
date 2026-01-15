'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import AnimatedText from '@/components/ui/AnimatedText'
import { personalInfo, getMailtoUrl } from '@/data/portfolio'

export default function Contact() {
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.2, triggerOnce: true })
  const [cardsRef, cardsInView] = useInView<HTMLDivElement>({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden" aria-label="Contact section">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-accent/5" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ willChange: 'transform' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-2xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ willChange: 'transform' }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <motion.span
            className="inline-block text-accent font-mono text-xs md:text-sm tracking-wider uppercase mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Let&apos;s Connect
          </motion.span>

          <motion.div
            className="mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{ willChange: 'transform, opacity' }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold select-text">
              Ready to Build Something Great?
            </h2>
          </motion.div>

          <motion.p
            className="text-text-secondary max-w-2xl mx-auto text-base md:text-xl leading-relaxed select-text"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            style={{ willChange: 'transform, opacity' }}
          >
            I&apos;m currently open to new opportunities and would love to hear from you.
            Let&apos;s discuss how we can create something amazing together.
          </motion.p>
        </div>

        {/* Social Cards */}
        <div ref={cardsRef} className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <SocialCard
              href={personalInfo.github}
              platform="GitHub"
              username="@wasimekram"
              description="Check out my code, open source contributions, and side projects"
              icon={
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              }
              gradient="from-gray-500 to-gray-700"
              delay={0}
              inView={cardsInView}
            />

            <SocialCard
              href={personalInfo.linkedin}
              platform="LinkedIn"
              username="Wasim Ekram"
              description="Connect with me professionally and explore my career journey"
              icon={
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              }
              gradient="from-blue-500 to-blue-700"
              delay={0.1}
              inView={cardsInView}
            />
          </div>

          {/* Email CTA */}
          <motion.div
            className="mt-12 md:mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="text-text-secondary text-sm md:text-base mb-4 select-text">
              Prefer email? Reach out directly
            </p>
            <a
              href={getMailtoUrl(personalInfo.email)}
              className="group inline-flex items-center gap-3 text-xl md:text-2xl lg:text-3xl font-display font-semibold text-white hover:text-accent transition-colors select-text min-h-[44px] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded-lg px-2"
              aria-label={`Send email to ${personalInfo.email}`}
            >
              <span>{personalInfo.email}</span>
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-accent group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

          {/* Availability Badge */}
          <motion.div
            className="mt-12 md:mt-16 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={cardsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full glass">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="text-sm md:text-base text-text-secondary select-text leading-relaxed">
                Currently available for <span className="text-white font-semibold">Web Developer / Full-Stack Engineer</span> roles
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
    </section>
  )
}

function SocialCard({
  href,
  platform,
  username,
  description,
  icon,
  gradient,
  delay,
  inView,
}: {
  href: string
  platform: string
  username: string
  description: string
  icon: React.ReactNode
  gradient: string
  delay: number
  inView: boolean
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={cardRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`Visit ${platform} profile - ${username} (opens in new tab)`}
    >
      {/* Animated gradient border */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-sm"
        style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
      />
      <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />

      {/* Card content */}
      <div className="relative glass rounded-2xl p-6 md:p-8 lg:p-10 h-full overflow-hidden">
        {/* Hover glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-8 transition-opacity duration-500`} />

        {/* Icon */}
        <motion.div
          className={`relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 text-white`}
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>

        {/* Text content */}
        <div className="relative z-10">
          <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-1 group-hover:text-white transition-colors duration-300 select-text">
            {platform}
          </h3>
          <p className="text-accent font-mono text-sm md:text-base mb-3 group-hover:text-white select-text transition-colors duration-300">
            {username}
          </p>
          <p className="text-text-secondary group-hover:text-white text-sm md:text-base leading-relaxed select-text transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Arrow indicator */}
        <motion.div
          className="absolute top-6 md:top-8 right-6 md:right-8 text-text-secondary group-hover:text-white transition-colors duration-300 z-10"
          initial={{ x: 0, y: 0 }}
          whileHover={{ x: 5, y: -5 }}
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </motion.div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 pointer-events-none overflow-hidden"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 55%, transparent 60%)',
            backgroundSize: '200% 100%',
            willChange: 'transform',
          }}
          animate={{
            x: ['200%', '-200%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </motion.a>
  )
}
