'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import AnimatedText from '@/components/ui/AnimatedText'
import { skillsWithLevels } from '@/data/portfolio'

// Map skills to categories and colors
const skillColors: Record<string, string> = {
  'React': '#61DAFB',
  'Next.js': '#000000',
  'JavaScript': '#F7DF1E',
  'HTML': '#E34F26',
  'CSS': '#1572B6',
  'Python': '#3776AB',
  'Flask': '#000000',
  'SQL': '#336791',
  'Google Analytics': '#F4B400',
  'TerminalFour': '#6366f1',
  'AWS': '#FF9900',
  'Docker': '#2496ED',
  'Git': '#F05032',
  'Accessibility (WCAG)': '#005F9E',
}

const allSkills = skillsWithLevels.map(skill => ({
  name: skill.name,
  category: skill.name.includes('React') || skill.name.includes('Next.js') || skill.name.includes('Flask') ? 'frameworks' :
           skill.name.includes('JavaScript') || skill.name.includes('HTML') || skill.name.includes('CSS') || skill.name.includes('Python') || skill.name.includes('SQL') ? 'languages' : 'tools',
  level: skill.level,
  color: skillColors[skill.name] || '#6366f1',
}))

const categories = [
  { id: 'all', label: 'All' },
  { id: 'languages', label: 'Languages' },
  { id: 'frameworks', label: 'Frameworks' },
  { id: 'tools', label: 'Tools' },
]

export default function Skills() {
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.2, triggerOnce: true })
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const filteredSkills = activeCategory === 'all'
    ? allSkills
    : allSkills.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="relative py-16 md:py-24 overflow-hidden" aria-label="Skills section">
      {/* Background orbs - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          style={{ willChange: 'transform' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-2xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ willChange: 'transform' }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <motion.span
            className="text-accent font-mono text-xs md:text-sm tracking-wider uppercase mb-3 md:mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
            style={{ willChange: 'transform, opacity' }}
          >
            Technical Expertise
          </motion.span>
          <h2>
            <AnimatedText
              text="Skills & Technologies"
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold select-text"
            />
          </h2>
        </div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.3 }}
          style={{ willChange: 'transform, opacity' }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 md:px-4 py-1.5 text-xs md:text-sm rounded-full font-medium transition-all duration-300 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary ${
                activeCategory === category.id
                  ? 'bg-accent text-white'
                  : 'glass text-text-secondary hover:text-white hover:bg-white/10'
              }`}
              aria-pressed={activeCategory === category.id}
              aria-label={`Filter skills by ${category.label}`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Visualization */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Skill Orbs - Hidden on mobile/tablet */}
          <div className="relative h-[300px] hidden lg:flex items-center justify-center">
            <SkillOrbitVisualization
              skills={filteredSkills}
              hoveredSkill={hoveredSkill}
              setHoveredSkill={setHoveredSkill}
            />
          </div>

          {/* Skills Grid - Two Columns */}
          <div
            className="grid md:grid-cols-2 gap-3 md:gap-4"
            role="list"
            aria-label="Skills proficiency list"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  index={index}
                  isHovered={hoveredSkill === skill.name}
                  onHover={setHoveredSkill}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillOrbitVisualization({
  skills,
  hoveredSkill,
  setHoveredSkill,
}: {
  skills: typeof allSkills
  hoveredSkill: string | null
  setHoveredSkill: (name: string | null) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
      {/* Orbit rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-white/10"
          style={{
            width: ring * 120,
            height: ring * 120,
            left: centerX - (ring * 60),
            top: centerY - (ring * 60),
            willChange: 'transform',
          }}
          animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 40 + ring * 15, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Center glow */}
      <div
        className="absolute w-16 h-16 rounded-full bg-accent/30 blur-xl"
        style={{
          left: centerX - 32,
          top: centerY - 32,
        }}
      />

      {/* Skill nodes */}
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2
        const radius = 80 + (index % 3) * 50
        const x = centerX + Math.cos(angle) * radius - 28
        const y = centerY + Math.sin(angle) * radius - 28

        return (
          <motion.div
            key={skill.name}
            className={`absolute w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all ${
              hoveredSkill === skill.name ? 'z-20' : 'z-10'
            }`}
            style={{
              left: x,
              top: y,
              background: `linear-gradient(135deg, ${skill.color}40, ${skill.color}20)`,
              border: `2px solid ${skill.color}80`,
              boxShadow: hoveredSkill === skill.name ? `0 0 30px ${skill.color}60` : 'none',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: hoveredSkill === skill.name ? 1.2 : 1,
            }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
            whileHover={{ scale: 1.2 }}
          >
            <span className="text-[10px] font-bold text-white text-center leading-tight px-1">
              {skill.name.length > 8 ? skill.name.substring(0, 6) + '..' : skill.name}
            </span>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredSkill === skill.name && (
                <motion.div
                  className="absolute -bottom-14 left-1/2 -translate-x-1/2 glass rounded-lg px-3 py-2 whitespace-nowrap z-30"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="font-semibold text-white text-sm">{skill.name}</div>
                  <div className="text-accent text-xs">{skill.level}% proficiency</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}

      {/* Connecting lines to hovered skill */}
      {hoveredSkill && (
        <svg className="absolute inset-0 pointer-events-none">
          {skills.map((skill, index) => {
            if (skill.name !== hoveredSkill) return null
            const angle = (index / skills.length) * Math.PI * 2
            const radius = 80 + (index % 3) * 50
            const x = centerX + Math.cos(angle) * radius
            const y = centerY + Math.sin(angle) * radius

            return (
              <motion.line
                key={skill.name}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke={skill.color}
                strokeWidth={2}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                exit={{ pathLength: 0, opacity: 0 }}
              />
            )
          })}
        </svg>
      )}
    </div>
  )
}

function SkillBar({
  skill,
  index,
  isHovered,
  onHover,
}: {
  skill: typeof allSkills[0]
  index: number
  isHovered: boolean
  onHover: (name: string | null) => void
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      className={`glass rounded-xl p-3 md:p-4 transition-all duration-300 cursor-pointer focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-primary ${
        isHovered ? 'ring-2 ring-accent/50 scale-[1.02]' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      onMouseEnter={() => onHover(skill.name)}
      onMouseLeave={() => onHover(null)}
      layout
      style={{ willChange: 'transform, opacity' }}
      tabIndex={0}
      role="listitem"
      aria-label={`${skill.name} - ${skill.level}% proficiency`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: skill.color }}
          />
          <span className="font-medium text-white text-sm">{skill.name}</span>
        </div>
        <span className="text-accent font-mono text-xs">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 0.6, delay: index * 0.02, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}
