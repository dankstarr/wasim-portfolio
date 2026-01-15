'use client'

import { ErrorBoundary } from './ErrorBoundary'
import CustomCursor from './CustomCursor'
import SmoothScroll from './SmoothScroll'
import LighthouseScript from './LighthouseScript'

interface ClientErrorBoundariesProps {
  children: React.ReactNode
}

export default function ClientErrorBoundaries({ children }: ClientErrorBoundariesProps) {
  return (
    <>
      <ErrorBoundary fallback={null}>
        <CustomCursor />
      </ErrorBoundary>
      <ErrorBoundary>
        <SmoothScroll>
          <div className="noise-overlay" />
          {children}
        </SmoothScroll>
      </ErrorBoundary>
      <LighthouseScript />
    </>
  )
}
