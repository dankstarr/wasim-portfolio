import type { Metadata } from 'next'
import './globals.css'
import ClientErrorBoundaries from '@/components/ui/ClientErrorBoundaries'

export const metadata: Metadata = {
  metadataBase: new URL('https://wasimekram.com'),
  title: 'Wasim Ekram | Web Developer & Full-Stack Engineer',
  description: 'Results-driven Web Developer with 7+ years of professional experience building full-stack and hybrid applications using React, Next.js, Flask, and Python.',
  keywords: ['Web Developer', 'Full-Stack Engineer', 'React Developer', 'Next.js Developer', 'Wasim Ekram', 'Python Developer', 'Flask Developer', 'TerminalFour', 'Accessibility'],
  authors: [{ name: 'Wasim Ekram' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Wasim Ekram | Web Developer & Full-Stack Engineer',
    description: 'Results-driven Web Developer with 7+ years of professional experience building scalable, accessible, and data-driven web applications',
    type: 'website',
    locale: 'en_US',
    images: ['/avatar.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wasim Ekram | Web Developer & Full-Stack Engineer',
    description: 'Results-driven Web Developer with 7+ years of professional experience building scalable, accessible, and data-driven web applications',
    images: ['/avatar.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload critical font files */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Optimized font loading - async load with fallback */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-primary text-text-primary">
        <ClientErrorBoundaries>
          {children}
        </ClientErrorBoundaries>
      </body>
    </html>
  )
}
