'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

interface VinylData {
  id: string
  title: string
  artist: string
  youtubeId: string
  color: string
}

// Main vinyl record component
function VinylRecord({
  isPlaying,
  color = '#8b5cf6'
}: {
  isPlaying: boolean
  color: string
}) {
  const discRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (discRef.current) {
      // Smooth rotation when playing
      if (isPlaying) {
        discRef.current.rotation.z += 0.008
      }
    }
    if (glowRef.current) {
      // Pulsing glow effect
      const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.1 + 0.9
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <Float
      speed={isPlaying ? 0 : 1.5}
      rotationIntensity={isPlaying ? 0 : 0.2}
      floatIntensity={isPlaying ? 0 : 0.3}
    >
      <group ref={discRef}>
        {/* Main vinyl disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.5, 2.5, 0.05, 64]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>

        {/* Vinyl grooves - multiple rings */}
        {[0.5, 0.8, 1.1, 1.4, 1.7, 2.0, 2.3].map((radius, i) => (
          <mesh key={i} position={[0, 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.03, radius, 64]} />
            <meshStandardMaterial
              color="#151515"
              metalness={0.7}
              roughness={0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}

        {/* Center label */}
        <mesh position={[0, 0.035, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.45, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isPlaying ? 0.4 : 0.15}
            metalness={0.3}
            roughness={0.6}
          />
        </mesh>

        {/* Center hole */}
        <mesh position={[0, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.03, 0.08, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} />
        </mesh>

        {/* Outer rim shine */}
        <mesh position={[0, 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.45, 2.5, 64]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isPlaying ? 0.3 : 0.1}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Glow effect underneath */}
      <mesh ref={glowRef} position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isPlaying ? 0.15 : 0.05}
        />
      </mesh>
    </Float>
  )
}

// Tonearm component
function Tonearm({ isPlaying, color }: { isPlaying: boolean; color: string }) {
  const armRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (armRef.current) {
      const targetRotation = isPlaying ? -0.35 : 0.2
      armRef.current.rotation.y += (targetRotation - armRef.current.rotation.y) * 0.05
    }
  })

  return (
    <group position={[2.8, 0.3, -1.5]}>
      {/* Base */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.4, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Arm pivot */}
      <group ref={armRef}>
        {/* Horizontal arm */}
        <mesh position={[-1.5, 0, 0.3]} rotation={[0, 0, 0.05]}>
          <boxGeometry args={[3.2, 0.06, 0.06]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Headshell */}
        <mesh position={[-3, -0.05, 0.3]}>
          <boxGeometry args={[0.25, 0.12, 0.15]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isPlaying ? 0.4 : 0.1}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        {/* Counterweight */}
        <mesh position={[0.5, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.3, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </group>
  )
}

// Ambient particles
function Particles({ color, isPlaying }: { color: string; isPlaying: boolean }) {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 100

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5
  }

  useFrame(({ clock }) => {
    if (!particlesRef.current) return
    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3 + 1] += isPlaying ? 0.015 : 0.005
      pos[i3] += Math.sin(clock.getElapsedTime() + i) * 0.003

      if (pos[i3 + 1] > 5) {
        pos[i3 + 1] = -5
        pos[i3] = (Math.random() - 0.5) * 15
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={color}
        transparent
        opacity={isPlaying ? 0.8 : 0.3}
        sizeAttenuation
      />
    </points>
  )
}

// Audio visualizer rings
function VisualizerRings({ isPlaying, color }: { isPlaying: boolean; color: string }) {
  const ringsRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!ringsRef.current || !isPlaying) return
    ringsRef.current.children.forEach((ring, i) => {
      const mesh = ring as THREE.Mesh
      const scale = 1 + Math.sin(clock.getElapsedTime() * 3 + i * 0.5) * 0.1
      mesh.scale.setScalar(scale)
      const mat = mesh.material as THREE.MeshBasicMaterial
      mat.opacity = 0.1 + Math.sin(clock.getElapsedTime() * 2 + i) * 0.05
    })
  })

  if (!isPlaying) return null

  return (
    <group ref={ringsRef} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      {[3, 3.5, 4].map((radius, i) => (
        <mesh key={i}>
          <ringGeometry args={[radius, radius + 0.02, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  )
}

// Main scene
function Scene({ isPlaying, color }: { isPlaying: boolean; color: string }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, 3, -5]} intensity={0.4} color={color} />
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={0.5}
        intensity={1}
        color="#ffffff"
      />

      {/* Main elements */}
      <VinylRecord isPlaying={isPlaying} color={color} />
      <Tonearm isPlaying={isPlaying} color={color} />
      <Particles color={color} isPlaying={isPlaying} />
      <VisualizerRings isPlaying={isPlaying} color={color} />

      {/* Environment for reflections */}
      <Environment preset="night" />
    </>
  )
}

export default function VibesScene({
  currentVinyl,
  isPlaying,
  onSelectVinyl,
}: {
  currentVinyl: VinylData | null
  isPlaying: boolean
  onSelectVinyl: (vinyl: VinylData) => void
}) {
  const color = currentVinyl?.color || '#8b5cf6'

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 3, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene isPlaying={isPlaying} color={color} />
      </Canvas>
    </div>
  )
}

// Export types and data for parent component
export type { VinylData }
export const vinylCollection: VinylData[] = [
  {
    id: '1',
    title: 'HEAVEN',
    artist: 'The Blaze',
    youtubeId: 'YxVZbMgA3p0',
    color: '#8b5cf6',
  },
  {
    id: '2',
    title: 'Innerbloom',
    artist: 'RÜFÜS DU SOL',
    youtubeId: 'Tx9zMFodNtA',
    color: '#3b82f6',
  },
  {
    id: '3',
    title: 'Cola',
    artist: 'CamelPhat',
    youtubeId: 'zTmYsgWDsVI',
    color: '#ec4899',
  },
  {
    id: '4',
    title: 'Opus',
    artist: 'Eric Prydz',
    youtubeId: 'iRA82xLsb_w',
    color: '#f59e0b',
  },
  {
    id: '5',
    title: 'Strobe',
    artist: 'Deadmau5',
    youtubeId: 'tKi9Z-f6qX4',
    color: '#22c55e',
  },
]
