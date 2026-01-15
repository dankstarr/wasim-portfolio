'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import AnimatedText from '@/components/ui/AnimatedText'
import { projects } from '@/data/portfolio'

// Map projects with gradients
const gradients = [
  'from-violet-600 to-indigo-600',
  'from-emerald-600 to-teal-600',
  'from-amber-600 to-orange-600',
  'from-cyan-600 to-blue-600',
]

const featuredProjects = projects.map((p, i) => ({
  ...p,
  gradient: gradients[i % gradients.length],
}))

export default function Projects() {
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="projects" className="relative py-20 md:py-24 overflow-hidden" aria-label="Projects section">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <motion.span
            className="text-accent font-mono text-sm tracking-wider uppercase mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
            style={{ willChange: 'transform, opacity' }}
          >
            Featured Work
          </motion.span>
          <h2>
            <AnimatedText
              text="Projects & Products"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold select-text"
            />
          </h2>
          <motion.p
            className="mt-6 text-text-secondary max-w-2xl mx-auto select-text"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.2 }}
            style={{ willChange: 'transform, opacity' }}
          >
            A selection of platforms and systems I&apos;ve built or contributed to
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface Project {
  title: string
  description: string
  highlights: string[]
  technologies: string[]
  link: string | null
  gradient: string
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1, triggerOnce: true })
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e: React.MouseEvent) => {
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
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective-1000"
    >
      <motion.article
        ref={cardRef}
        className="relative group cursor-pointer focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-primary rounded-2xl"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        tabIndex={0}
        role="article"
        aria-label={`Project: ${project.title}`}
      >
        {/* Card Background */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />

        {/* Card Content */}
        <div className="relative glass rounded-2xl p-8 md:p-10 h-full border border-white/10 group-hover:border-white/20 transition-all duration-300 overflow-hidden">
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)',
              backgroundSize: '200% 100%',
              willChange: 'transform',
            }}
            animate={{
              x: isHovered ? ['-200%', '200%'] : '-200%',
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
            aria-hidden="true"
          />

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-display font-bold text-white group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-text-secondary group-hover:text-text-primary mt-2 select-text transition-colors duration-300">{project.description}</p>
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-white hover:bg-white/10 transition-all duration-300 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Visit ${project.title} project (opens in new tab)`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>

          {/* Highlights */}
          <ul className="space-y-2 mb-6">
            {project.highlights.slice(0, 3).map((highlight, idx) => (
              <motion.li
                key={idx}
                className="text-text-secondary group-hover:text-text-primary text-sm flex gap-2 select-text transition-colors duration-300"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <span className="text-accent">→</span>
                {highlight}
              </motion.li>
            ))}
          </ul>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-full bg-white/5 text-white text-xs font-medium border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* 3D floating effect element */}
          <motion.div
            className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-accent/30 to-purple-500/30 blur-2xl"
            style={{ transform: 'translateZ(50px)' }}
            animate={{
              scale: isHovered ? 1.5 : 1,
              opacity: isHovered ? 0.8 : 0.3,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.article>
    </motion.div>
  )
}
