'use client'

import { motion } from 'framer-motion'
import { personalInfo, navItems, getMailtoUrl } from '@/data/portfolio'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-16 bg-secondary" role="contentinfo" aria-label="Site footer">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a
              href="#home"
              className="text-3xl font-display font-bold gradient-text inline-block mb-4 hover:scale-105 transition-transform duration-300"
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById('home')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Wasim Ekram
            </a>
            <p className="text-text-secondary max-w-xs select-text leading-relaxed">
              Web Developer passionate about building accessible, scalable, and intelligent digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-text-secondary hover:text-white hover:bg-white/5 transition-all duration-300 min-h-[44px] flex items-center rounded-lg px-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary"
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.getElementById(item.href.slice(1))
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={getMailtoUrl(personalInfo.email)}
                  className="text-text-secondary hover:text-white hover:bg-white/5 transition-all duration-300 min-h-[44px] flex items-center rounded-lg px-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary"
                  aria-label={`Send email to ${personalInfo.email}`}
                >
                  <span aria-hidden="true">📧</span> <span className="ml-2">{personalInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
                  className="text-text-secondary hover:text-white hover:bg-white/5 transition-all duration-300 min-h-[44px] flex items-center rounded-lg px-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary"
                  aria-label={`Call ${personalInfo.phone}`}
                >
                  <span aria-hidden="true">📞</span> <span className="ml-2">{personalInfo.phone}</span>
                </a>
              </li>
              <li className="text-text-secondary min-h-[44px] flex items-center">
                <span aria-hidden="true">📍</span> <span className="ml-2">{personalInfo.location}</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4" role="group" aria-label="Social media links">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-white hover:bg-white/5 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary"
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
                className="text-text-secondary hover:text-white hover:bg-white/5 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary"
                aria-label="Visit LinkedIn profile (opens in new tab)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm">
            © {currentYear} Wasim Ekram. All rights reserved.
          </p>
          <p className="text-text-secondary text-sm">
            Built with <span className="text-accent">Next.js</span>, <span className="text-accent">Three.js</span> & <span className="text-accent">Framer Motion</span>
          </p>
        </div>
      </div>

      {/* Back to top button */}
      <motion.button
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary min-w-[48px] min-h-[48px]"
        onClick={() => {
          try {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } catch (error) {
            console.error('Scroll to top error:', error)
            // Fallback: instant scroll
            window.scrollTo(0, 0)
          }
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </footer>
  )
}
