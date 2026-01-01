'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

export interface VinylData {
  id: string
  title: string
  artist: string
  youtubeId: string
  color: string
}

export const vinylCollection: VinylData[] = [
  { id: '1', title: 'HEAVEN', artist: 'The Blaze', youtubeId: 'YxVZbMgA3p0', color: '#8b5cf6' },
  { id: '2', title: 'Innerbloom', artist: 'RÜFÜS DU SOL', youtubeId: 'Tx9zMFodNtA', color: '#3b82f6' },
  { id: '3', title: 'Cola', artist: 'CamelPhat', youtubeId: 'zTmYsgWDsVI', color: '#ec4899' },
  { id: '4', title: 'Opus', artist: 'Eric Prydz', youtubeId: 'iRA82xLsb_w', color: '#f59e0b' },
  { id: '5', title: 'Strobe', artist: 'Deadmau5', youtubeId: 'tKi9Z-f6qX4', color: '#22c55e' },
]

// Visualizer bars arranged in a circle on the vinyl
function VisualizerBars({ color, isPlaying }: { color: string; isPlaying: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const barsRef = useRef<THREE.Mesh[]>([])

  const barCount = 40
  const innerRadius = 0.55
  const outerRadius = 2.3

  useFrame((state) => {
    barsRef.current.forEach((bar, i) => {
      if (!bar) return

      const time = state.clock.elapsedTime
      const baseHeight = 0.02

      if (isPlaying) {
        // Create pseudo-random audio visualization
        const freq1 = Math.sin(time * 2.5 + i * 0.3) * 0.5 + 0.5
        const freq2 = Math.sin(time * 4.1 + i * 0.7) * 0.3 + 0.5
        const freq3 = Math.sin(time * 1.3 + i * 0.15) * 0.4 + 0.6
        const height = baseHeight + (freq1 * freq2 * freq3) * 0.15
        bar.scale.y = height / baseHeight
      } else {
        bar.scale.y = 1
      }
    })
  })

  return (
    <group ref={groupRef} position={[0, 0.04, 0]}>
      {Array.from({ length: barCount }).map((_, i) => {
        const angle = (i / barCount) * Math.PI * 2
        const barLength = outerRadius - innerRadius
        const centerRadius = innerRadius + barLength / 2

        return (
          <mesh
            key={i}
            ref={(el) => { if (el) barsRef.current[i] = el }}
            position={[
              Math.cos(angle) * centerRadius,
              0.02,
              Math.sin(angle) * centerRadius
            ]}
            rotation={[-Math.PI / 2, 0, angle]}
          >
            <boxGeometry args={[0.06, barLength, 0.02]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={isPlaying ? 0.6 : 0.15}
              transparent
              opacity={0.85}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Inner glow ring
function GlowRing({ color, isPlaying }: { color: string; isPlaying: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshBasicMaterial
      if (isPlaying) {
        const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.15 + 0.35
        mat.opacity = pulse
      } else {
        mat.opacity = 0.1
      }
    }
  })

  return (
    <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.035, 0]}>
      <ringGeometry args={[0.45, 0.55, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Main vinyl record
function VinylRecord({ color, isPlaying }: { color: string; isPlaying: boolean }) {
  const vinylRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (vinylRef.current && isPlaying) {
      vinylRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group ref={vinylRef}>
      {/* Main vinyl disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.04, 64]} />
        <meshStandardMaterial
          color="#080808"
          metalness={0.4}
          roughness={0.5}
        />
      </mesh>

      {/* Vinyl grooves */}
      {[0.7, 1.0, 1.3, 1.6, 1.9, 2.2].map((radius, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
          <ringGeometry args={[radius - 0.02, radius, 64]} />
          <meshStandardMaterial
            color="#151515"
            metalness={0.6}
            roughness={0.4}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}

      {/* Outer rim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[2.4, 2.5, 64]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Center label background */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <circleGeometry args={[0.5, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isPlaying ? 0.3 : 0.1}
          metalness={0.2}
          roughness={0.7}
        />
      </mesh>

      {/* Center spindle hole */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[0.03, 0.08, 32]} />
        <meshStandardMaterial color="#000" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Glow ring around label */}
      <GlowRing color={color} isPlaying={isPlaying} />

      {/* Visualizer bars */}
      <VisualizerBars color={color} isPlaying={isPlaying} />
    </group>
  )
}

// Ambient floating particles
function Particles({ color, isPlaying }: { color: string; isPlaying: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 80
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 3.5 + Math.random() * 4
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    return positions
  }, [])

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * (isPlaying ? 0.08 : 0.02)
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={color}
        transparent
        opacity={isPlaying ? 0.7 : 0.3}
        sizeAttenuation
      />
    </points>
  )
}

// Outer glow effect beneath vinyl
function VinylGlow({ color, isPlaying }: { color: string; isPlaying: boolean }) {
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      const pulse = isPlaying
        ? 0.12 + Math.sin(state.clock.elapsedTime * 2) * 0.05
        : 0.05
      mat.opacity = pulse
    }
  })

  return (
    <mesh ref={glowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
      <circleGeometry args={[3.5, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.1}
      />
    </mesh>
  )
}

interface VibesSceneProps {
  currentVinyl: VinylData | null
  isPlaying: boolean
}

export default function VibesScene({ currentVinyl, isPlaying }: VibesSceneProps) {
  const color = currentVinyl?.color || '#8b5cf6'

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 6, 0]} intensity={1.2} color="#fff" />
      <pointLight position={[4, 3, 4]} intensity={0.4} color={color} />
      <pointLight position={[-4, 3, -4]} intensity={0.3} color={color} />
      <spotLight
        position={[0, 8, 2]}
        angle={0.5}
        penumbra={0.6}
        intensity={1}
        color="#ffffff"
      />

      {/* Main vinyl */}
      <VinylRecord color={color} isPlaying={isPlaying} />

      {/* Glow underneath */}
      <VinylGlow color={color} isPlaying={isPlaying} />

      {/* Particles */}
      <Particles color={color} isPlaying={isPlaying} />

      {/* Environment for subtle reflections */}
      <Environment preset="night" />
    </>
  )
}
