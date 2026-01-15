'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems, personalInfo } from '@/data/portfolio'
import { MagneticButton } from './MagneticButton'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Find active section
      const sections = navItems.map((item) => item.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    try {
      e?.preventDefault()
      setIsMenuOpen(false)
      const element = document.getElementById(href.slice(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else {
        // Fallback: use window.location for anchor links
        if (typeof window !== 'undefined') {
          window.location.hash = href
        }
      }
    } catch (error) {
      console.error('Navigation click error:', error)
      // Fallback: direct navigation
      if (typeof window !== 'undefined' && href.startsWith('#')) {
        window.location.hash = href
      }
    }
  }

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:font-medium"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Main Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-6">
          <div
            className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${
              isScrolled ? 'glass backdrop-blur-lg' : ''
            }`}
          >
            {/* Logo */}
            <a
              href="#home"
              className="text-2xl font-display font-bold gradient-text focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded hover:scale-105 transition-transform duration-300"
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById('home')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              aria-label="Wasim Ekram - Home"
            >
              WE
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Desktop navigation">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary ${
                    activeSection === item.href.slice(1)
                      ? 'text-white'
                      : 'text-text-secondary hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Navigate to ${item.name} section`}
                  aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
                >
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      className="absolute inset-0 bg-accent/20 rounded-full"
                      layoutId="activeSection"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </motion.a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <MagneticButton
                className="px-6 py-2 bg-accent text-white text-sm font-medium rounded-full hover:bg-accent-light transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
                onClick={() => handleNavClick('#contact')}
                aria-label="Navigate to contact section"
              >
                Let&apos;s Talk
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-white rounded-full"
                  animate={isMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-white rounded-full"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-white rounded-full"
                  animate={isMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div
              className="absolute inset-0 bg-primary/95 backdrop-blur-lg"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              className="relative h-full flex flex-col items-center justify-center gap-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ delay: 0.1 }}
              aria-label="Mobile navigation"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className="text-3xl font-display font-bold text-white hover:text-accent transition-colors min-h-[44px] px-4 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                className="mt-8 flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                role="group"
                aria-label="Social links"
              >
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded-lg"
                  aria-label="Visit GitHub profile (opens in new tab)"
                >
                  GitHub
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded-lg"
                  aria-label="Visit LinkedIn profile (opens in new tab)"
                >
                  LinkedIn
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <ScrollProgress />
    </>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
      style={{ scaleX: progress / 100 }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  )
}
