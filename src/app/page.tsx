import dynamic from 'next/dynamic'
import Navigation from '@/components/ui/Navigation'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

// Lazy load non-critical components with error handling
const Vibes = dynamic(() => import('@/components/sections/Vibes').catch((error) => {
  console.error('Failed to load Vibes component:', error)
  return { default: () => null }
}), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  return (
    <main className="relative" id="main-content">
      <ErrorBoundary fallback={null}>
        <Navigation />
      </ErrorBoundary>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary>
        <About />
      </ErrorBoundary>
      <ErrorBoundary>
        <Experience />
      </ErrorBoundary>
      <ErrorBoundary>
        <Projects />
      </ErrorBoundary>
      <ErrorBoundary>
        <Skills />
      </ErrorBoundary>
      <ErrorBoundary>
        <Contact />
      </ErrorBoundary>
      <ErrorBoundary fallback={null}>
        <Vibes />
      </ErrorBoundary>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </main>
  )
}
