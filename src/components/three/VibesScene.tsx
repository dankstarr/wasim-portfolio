'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, MeshReflectorMaterial } from '@react-three/drei'
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
  { id: '6', title: 'Losing It', artist: 'Fisher', youtubeId: 'sSHsljNkjMY', color: '#ef4444' },
  { id: '7', title: 'Teardrops', artist: 'Boris Brejcha', youtubeId: 'qjNrqDPHCuM', color: '#14b8a6' },
  { id: '8', title: 'Scary Monsters', artist: 'Skrillex', youtubeId: 'WSeNSzJ2-Jw', color: '#eab308' },
  { id: '9', title: 'Pjanoo', artist: 'Eric Prydz', youtubeId: 'lLW6DH-qKc8', color: '#6366f1' },
  { id: '10', title: 'L\'Amour Toujours', artist: 'Gigi D\'Agostino', youtubeId: 'iNj6Z4l8Wlk', color: '#f472b6' },
  { id: '11', title: 'Blue Monday', artist: 'New Order', youtubeId: 'c1GxjzHm5us', color: '#0ea5e9' },
  { id: '12', title: 'Teardrop', artist: 'Massive Attack', youtubeId: 'u7K72X4eo_s', color: '#a855f7' },
  { id: '13', title: 'Born Slippy', artist: 'Underworld', youtubeId: 'iTFrJ6WUx6c', color: '#84cc16' },
  { id: '14', title: 'Insomnia', artist: 'Faithless', youtubeId: 'P8JEm4d6Wu4', color: '#f97316' },
  { id: '15', title: 'Sandstorm', artist: 'Darude', youtubeId: 'y6120QOlsfU', color: '#fbbf24' },
  { id: '16', title: 'Children', artist: 'Robert Miles', youtubeId: 'CC5ca6Hsb2Q', color: '#2dd4bf' },
  { id: '17', title: 'Kernkraft 400', artist: 'Zombie Nation', youtubeId: 'xbL-xBRNrdo', color: '#dc2626' },
  { id: '18', title: 'Around The World', artist: 'Daft Punk', youtubeId: 's9MszVE7aR4', color: '#7c3aed' },
  { id: '19', title: 'Gecko', artist: 'Oliver Heldens', youtubeId: 'LDODtkC-cHc', color: '#059669' },
  { id: '20', title: 'On My Mind', artist: 'Disciples', youtubeId: 'fV4DiAyExN0', color: '#e11d48' },
]

// Circular visualizer bars on the vinyl
function VisualizerBars({ color, isPlaying }: { color: string; isPlaying: boolean }) {
  const barsRef = useRef<THREE.Mesh[]>([])
  const barCount = 48

  useFrame((state) => {
    const time = state.clock.elapsedTime
    barsRef.current.forEach((bar, i) => {
      if (!bar) return
      if (isPlaying) {
        const freq1 = Math.sin(time * 3 + i * 0.25) * 0.5 + 0.5
        const freq2 = Math.sin(time * 5 + i * 0.5) * 0.3 + 0.5
        const freq3 = Math.cos(time * 2 + i * 0.15) * 0.4 + 0.6
        const height = 0.03 + (freq1 * freq2 * freq3) * 0.12
        bar.scale.z = height / 0.03
      } else {
        bar.scale.z = THREE.MathUtils.lerp(bar.scale.z, 1, 0.1)
      }
    })
  })

  return (
    <group position={[0, 0.025, 0]}>
      {Array.from({ length: barCount }).map((_, i) => {
        const angle = (i / barCount) * Math.PI * 2
        const radius = 1.6
        return (
          <mesh
            key={i}
            ref={(el) => { if (el) barsRef.current[i] = el }}
            position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.12, 0.5, 0.03]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={isPlaying ? 1 : 0.2}
              transparent
              opacity={0.9}
              toneMapped={false}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Neon ring that pulses
function NeonRing({ color, isPlaying, radius }: { color: string; isPlaying: boolean; radius: number }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshBasicMaterial
      const pulse = isPlaying
        ? 0.6 + Math.sin(state.clock.elapsedTime * 4) * 0.4
        : 0.2
      mat.opacity = pulse
    }
  })

  return (
    <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.3}
        toneMapped={false}
      />
    </mesh>
  )
}

// Main vinyl record - more attractive
function VinylRecord({ color, isPlaying }: { color: string; isPlaying: boolean }) {
  const vinylRef = useRef<THREE.Group>(null)
  const grooveRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (vinylRef.current) {
      const targetSpeed = isPlaying ? 0.8 : 0
      vinylRef.current.rotation.y += delta * targetSpeed
    }
    // Rainbow shimmer on grooves
    if (grooveRef.current && isPlaying) {
      const mat = grooveRef.current.material as THREE.MeshStandardMaterial
      const hue = (state.clock.elapsedTime * 0.05) % 1
      mat.color.setHSL(hue, 0.3, 0.15)
    }
  })

  return (
    <group ref={vinylRef}>
      {/* Main vinyl disc - glossy black */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.8, 2.8, 0.06, 128]} />
        <meshStandardMaterial
          color="#050505"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Reflective groove area */}
      <mesh ref={grooveRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.032, 0]}>
        <ringGeometry args={[0.8, 2.6, 128, 1]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={1}
          roughness={0.1}
        />
      </mesh>

      {/* Fine groove lines */}
      {[1.0, 1.3, 1.6, 1.9, 2.2, 2.5].map((r, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.035, 0]}>
          <ringGeometry args={[r - 0.01, r + 0.01, 128]} />
          <meshBasicMaterial color="#2a2a3e" transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Outer edge - chrome */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.031, 0]}>
        <ringGeometry args={[2.7, 2.8, 128]} />
        <meshStandardMaterial
          color="#444"
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Center label - vibrant */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.035, 0]}>
        <circleGeometry args={[0.7, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isPlaying ? 0.5 : 0.15}
          metalness={0.3}
          roughness={0.5}
          toneMapped={false}
        />
      </mesh>

      {/* Label inner ring decoration */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.037, 0]}>
        <ringGeometry args={[0.35, 0.45, 64]} />
        <meshBasicMaterial color="#000" transparent opacity={0.3} />
      </mesh>

      {/* Center spindle hole */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <ringGeometry args={[0.05, 0.12, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.05} />
      </mesh>

      {/* Neon accent rings */}
      <NeonRing color={color} isPlaying={isPlaying} radius={0.75} />
      <NeonRing color={color} isPlaying={isPlaying} radius={2.65} />

      {/* Visualizer bars */}
      <VisualizerBars color={color} isPlaying={isPlaying} />
    </group>
  )
}

// Floating particles
function Particles({ color, isPlaying }: { color: string; isPlaying: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 100

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 4 + Math.random() * 5
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = Math.sin(angle) * radius
      sz[i] = 0.02 + Math.random() * 0.04
    }
    return [pos, sz]
  }, [])

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * (isPlaying ? 0.1 : 0.02)
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += (isPlaying ? 0.02 : 0.005) * Math.sin(state.clock.elapsedTime + i)
        if (positions[i * 3 + 1] > 3) positions[i * 3 + 1] = -3
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={color}
        transparent
        opacity={isPlaying ? 0.8 : 0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Ground reflection
function ReflectiveGround({ color }: { color: string }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#050510"
        metalness={0.5}
        mirror={0.5}
      />
    </mesh>
  )
}

// Glow underneath vinyl
function VinylGlow({ color, isPlaying }: { color: string; isPlaying: boolean }) {
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      const pulse = isPlaying
        ? 0.25 + Math.sin(state.clock.elapsedTime * 2) * 0.1
        : 0.08
      mat.opacity = pulse
      glowRef.current.scale.setScalar(1 + (isPlaying ? Math.sin(state.clock.elapsedTime * 3) * 0.03 : 0))
    }
  })

  return (
    <mesh ref={glowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <circleGeometry args={[4, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
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
      {/* Dramatic lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 8, 0]} intensity={2} color="#fff" />
      <pointLight position={[5, 4, 5]} intensity={0.8} color={color} />
      <pointLight position={[-5, 4, -5]} intensity={0.6} color={color} />
      <spotLight
        position={[0, 10, 5]}
        angle={0.3}
        penumbra={0.8}
        intensity={2}
        color="#ffffff"
        castShadow
      />

      {/* Colored rim lights */}
      <pointLight position={[4, 0, 0]} intensity={0.5} color={color} distance={8} />
      <pointLight position={[-4, 0, 0]} intensity={0.5} color={color} distance={8} />

      {/* Main vinyl */}
      <VinylRecord color={color} isPlaying={isPlaying} />

      {/* Glow underneath */}
      <VinylGlow color={color} isPlaying={isPlaying} />

      {/* Particles */}
      <Particles color={color} isPlaying={isPlaying} />

      {/* Reflective ground */}
      <ReflectiveGround color={color} />

      {/* Environment for reflections */}
      <Environment preset="night" />

      {/* Fog for depth */}
      <fog attach="fog" args={['#060609', 8, 25]} />
    </>
  )
}
