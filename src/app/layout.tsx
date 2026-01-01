import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'
import SmoothScroll from '@/components/ui/SmoothScroll'
import LoadingScreen from '@/components/ui/LoadingScreen'

export const metadata: Metadata = {
  metadataBase: new URL('https://jashanshetty.com'),
  title: 'Jashan Shetty | Frontend Engineer',
  description: 'Results-driven Full Stack Developer with 4 years of professional experience crafting robust web and mobile applications using React, React Native, and Node.js.',
  keywords: ['Frontend Engineer', 'React Developer', 'Full Stack Developer', 'Jashan Shetty', 'Web Developer', 'React Native', 'Node.js', 'TypeScript'],
  authors: [{ name: 'Jashan Shetty' }],
  openGraph: {
    title: 'Jashan Shetty | Frontend Engineer',
    description: 'Results-driven Full Stack Developer with 4 years of professional experience',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jashan Shetty | Frontend Engineer',
    description: 'Results-driven Full Stack Developer with 4 years of professional experience',
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
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-primary text-text-primary">
        <LoadingScreen />
        <CustomCursor />
        <SmoothScroll>
          <div className="noise-overlay" />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
