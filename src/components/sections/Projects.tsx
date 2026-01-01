'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import AnimatedText from '@/components/ui/AnimatedText'
import { projects, experience } from '@/data/portfolio'

// Get featured company projects
const featuredProjects = [
  {
    title: 'DeepReel',
    description: 'AI-powered video platform with React-based interface and advanced analytics',
    highlights: [
      'Built Remotion Genie Editor with SVG masking and dynamic captions',
      'Created dashboards with heatmaps and funnel charts',
      'Integrated granular analytics for video interactions',
    ],
    technologies: ['React', 'Next.js', 'Remotion', 'Analytics', 'BAML'],
    link: 'https://www.deepreel.com/',
    image: '/projects/deepreel.png',
    gradient: 'from-violet-600 to-indigo-600',
  },
  {
    title: 'LXME',
    description: 'Financial platform for women with 8,000+ daily active users',
    highlights: [
      'Upgraded React Native from 0.69 to 0.74',
      'Reduced crash rate from 6% to 1.25%',
      'Spearheaded Savings Challenge feature driving 30% SIP growth',
    ],
    technologies: ['React Native', 'Sentry', 'TypeScript'],
    link: 'https://lxme.in',
    image: '/projects/lxme.png',
    gradient: 'from-pink-600 to-rose-600',
  },
  {
    title: 'Rep3',
    description: 'Web3 community engagement platform with 250K+ gas-less badges minted',
    highlights: [
      'Built SaaS platform for DAO contributor compensation',
      'Created NPM package for protocol integration',
      'Implemented robust CI/CD pipelines',
    ],
    technologies: ['Node.js', 'Solidity', 'JavaScript', 'CI/CD'],
    link: 'https://app.rep3.gg/',
    image: '/projects/rep3.png',
    gradient: 'from-emerald-600 to-teal-600',
  },
  ...projects.map((p, i) => ({
    ...p,
    gradient: i === 0 ? 'from-amber-600 to-orange-600' : 'from-cyan-600 to-blue-600',
  })),
]

export default function Projects() {
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.span
            className="text-accent font-mono text-sm tracking-wider uppercase mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Featured Work
          </motion.span>
          <AnimatedText
            text="Projects & Products"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold"
          />
          <motion.p
            className="mt-6 text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            A showcase of products and platforms I&apos;ve helped build
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
      <motion.div
        ref={cardRef}
        className="relative group cursor-pointer"
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
      >
        {/* Card Background */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

        {/* Card Content */}
        <div className="relative glass rounded-2xl p-8 h-full border border-white/10 group-hover:border-white/20 transition-colors overflow-hidden">
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)',
              transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
              transition: 'transform 0.6s ease-out',
            }}
          />

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-display font-bold text-white group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-text-secondary mt-2">{project.description}</p>
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                className="text-text-secondary text-sm flex gap-2"
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
                className="px-3 py-1 rounded-full bg-white/5 text-white text-xs border border-white/10"
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
      </motion.div>
    </motion.div>
  )
}
