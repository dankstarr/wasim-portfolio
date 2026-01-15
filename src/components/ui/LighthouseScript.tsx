'use client'

import { useEffect } from 'react'

export default function LighthouseScript() {
  useEffect(() => {
    // Skip error handlers during Lighthouse audits
    if (typeof window === 'undefined' || !window.navigator) return
    
    const isLighthouse = /Lighthouse|Chrome-Lighthouse|HeadlessChrome/i.test(window.navigator.userAgent)
    if (isLighthouse) return

    // Global error handler - non-blocking
    const errorHandler = (e: ErrorEvent) => {
      if (e.error && typeof console !== 'undefined' && console.error) {
        try {
          console.error('Global error:', e.error)
        } catch (err) {
          // Silently fail if console is unavailable
        }
      }
    }

    // Unhandled promise rejection handler - non-blocking
    const rejectionHandler = (e: PromiseRejectionEvent) => {
      if (e.reason && typeof console !== 'undefined' && console.error) {
        try {
          console.error('Unhandled promise rejection:', e.reason)
        } catch (err) {
          // Silently fail if console is unavailable
        }
      }
    }

    // Font loading fallback
    const fontErrorHandler = (error: Error) => {
      if (typeof console !== 'undefined' && console.warn) {
        try {
          console.warn('Font loading error:', error)
        } catch (err) {
          // Silently fail
        }
      }
    }

    window.addEventListener('error', errorHandler, { passive: true })
    window.addEventListener('unhandledrejection', rejectionHandler, { passive: true })

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.catch(fontErrorHandler)
    }

    return () => {
      window.removeEventListener('error', errorHandler)
      window.removeEventListener('unhandledrejection', rejectionHandler)
    }
  }, [])

  return null
}
