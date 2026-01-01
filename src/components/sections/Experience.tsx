'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import AnimatedText from '@/components/ui/AnimatedText'
import { experience } from '@/data/portfolio'

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.2, triggerOnce: true })
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.span
            className="text-accent font-mono text-sm tracking-wider uppercase mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Career Journey
          </motion.span>
          <AnimatedText
            text="Work Experience"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold"
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Timeline Navigation */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-2">
              {experience.map((job, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    activeIndex === index
                      ? 'bg-accent/20 border-l-4 border-accent'
                      : 'hover:bg-white/5 border-l-4 border-transparent'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="font-display font-semibold text-white">
                    {job.company}
                  </div>
                  <div className="text-text-secondary text-sm">{job.title}</div>
                  <div className="text-accent text-xs font-mono mt-1">{job.period}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Job Details */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl p-8"
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-1">
                      {experience[activeIndex].title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {experience[activeIndex].link ? (
                        <a
                          href={experience[activeIndex].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline font-medium"
                        >
                          {experience[activeIndex].company}
                        </a>
                      ) : (
                        <span className="text-accent font-medium">
                          {experience[activeIndex].company}
                        </span>
                      )}
                      <span className="text-text-secondary">•</span>
                      <span className="text-text-secondary">
                        {experience[activeIndex].location}
                      </span>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-mono">
                    {experience[activeIndex].period}
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-secondary mb-6">
                  {experience[activeIndex].description}
                </p>

                {/* Highlights */}
                <div className="space-y-3 mb-8">
                  {experience[activeIndex].highlights.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="text-accent mt-1.5 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      <p className="text-text-secondary">{highlight}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm text-text-secondary uppercase tracking-wider mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experience[activeIndex].technologies.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-white/5 text-white text-sm border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-colors"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden mt-16 space-y-8">
          {experience.map((job, index) => (
            <ExperienceCard key={index} job={job} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({
  job,
  index
}: {
  job: typeof experience[0]
  index: number
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2, triggerOnce: true })
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 border-l-2 border-white/10"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-primary" />

      <div className="glass rounded-xl p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="font-display font-bold text-white">{job.title}</h3>
            <p className="text-accent">{job.company}</p>
          </div>
          <span className="text-xs font-mono text-text-secondary whitespace-nowrap">
            {job.period}
          </span>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="space-y-2 mb-4">
                {job.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-text-secondary text-sm flex gap-2">
                    <span className="text-accent">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {job.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded-full bg-white/5 text-white text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-accent text-sm flex items-center gap-1 hover:underline"
        >
          {isExpanded ? 'Show less' : 'Show more'}
          <motion.svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ rotate: isExpanded ? 180 : 0 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      </div>
    </motion.div>
  )
}
