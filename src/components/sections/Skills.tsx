'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import AnimatedText from '@/components/ui/AnimatedText'

const allSkills = [
  { name: 'React', category: 'frameworks', level: 95, color: '#61DAFB' },
  { name: 'React Native', category: 'frameworks', level: 90, color: '#61DAFB' },
  { name: 'Next.js', category: 'frameworks', level: 88, color: '#ffffff' },
  { name: 'TypeScript', category: 'languages', level: 92, color: '#3178C6' },
  { name: 'JavaScript', category: 'languages', level: 95, color: '#F7DF1E' },
  { name: 'Node.js', category: 'frameworks', level: 85, color: '#339933' },
  { name: 'Python', category: 'languages', level: 70, color: '#3776AB' },
  { name: 'GraphQL', category: 'tools', level: 80, color: '#E10098' },
  { name: 'WebSockets', category: 'tools', level: 85, color: '#6366f1' },
  { name: 'Solidity', category: 'tools', level: 75, color: '#363636' },
  { name: 'AWS', category: 'tools', level: 72, color: '#FF9900' },
  { name: 'Git', category: 'tools', level: 90, color: '#F05032' },
  { name: 'HTML', category: 'languages', level: 98, color: '#E34F26' },
  { name: 'CSS', category: 'languages', level: 95, color: '#1572B6' },
  { name: 'Sentry', category: 'tools', level: 80, color: '#362D59' },
  { name: 'CI/CD', category: 'methodologies', level: 82, color: '#6366f1' },
]

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
    <section id="skills" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background orbs - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-10 md:mb-16">
          <motion.span
            className="text-accent font-mono text-xs md:text-sm tracking-wider uppercase mb-3 md:mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Technical Expertise
          </motion.span>
          <AnimatedText
            text="Skills & Technologies"
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold"
          />
        </div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 md:px-6 py-2 text-sm md:text-base rounded-full font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-accent text-white'
                  : 'glass text-text-secondary hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Visualization */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Skill Orbs - Hidden on mobile/tablet */}
          <div className="relative h-[400px] hidden lg:block">
            <SkillOrbitVisualization
              skills={filteredSkills}
              hoveredSkill={hoveredSkill}
              setHoveredSkill={setHoveredSkill}
            />
          </div>

          {/* Skill List - Full width on mobile */}
          <div className="space-y-3 md:space-y-4 lg:col-span-1">
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
    <div ref={containerRef} className="absolute inset-0">
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
          }}
          animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 60 + ring * 20, repeat: Infinity, ease: 'linear' }}
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
      className={`glass rounded-xl p-3 md:p-4 transition-all cursor-pointer ${
        isHovered ? 'ring-2 ring-accent' : ''
      }`}
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      exit={{ opacity: 0, x: -30 }}
      transition={{ delay: index * 0.03 }}
      onMouseEnter={() => onHover(skill.name)}
      onMouseLeave={() => onHover(null)}
      layout
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 md:gap-3">
          <div
            className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: skill.color }}
          />
          <span className="font-medium text-white text-sm md:text-base">{skill.name}</span>
        </div>
        <span className="text-accent font-mono text-xs md:text-sm">{skill.level}%</span>
      </div>
      <div className="h-1.5 md:h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay: index * 0.03, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}
