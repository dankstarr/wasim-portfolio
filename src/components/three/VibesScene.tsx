'use client'

import { useRef, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import * as THREE from 'three'

// Simple box component for building pixel art
function Block({
  position,
  size = [1, 1, 1],
  color,
  emissive,
  emissiveIntensity = 0,
}: {
  position: [number, number, number]
  size?: [number, number, number]
  color: string
  emissive?: string
  emissiveIntensity?: number
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        emissive={emissive || color}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  )
}

// Room structure - walls and floor
function Room() {
  const floorColor = '#1a1a2e'
  const wallColor = '#12121f'
  const accentWall = '#0f0f1a'

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 3, -6]}>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-6, 3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color={accentWall} />
      </mesh>

      {/* Accent strip on wall */}
      <Block position={[0, 5.5, -5.9]} size={[10, 0.3, 0.1]} color="#8b5cf6" emissiveIntensity={0.3} />
    </group>
  )
}

// Desk with monitor setup
function DeskSetup() {
  const screenRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.5 + Math.sin(clock.getElapsedTime() * 2) * 0.2
    }
  })

  return (
    <group position={[-2, 0, -3]}>
      {/* Desk */}
      <Block position={[0, 1.2, 0]} size={[4, 0.15, 2]} color="#2d2d44" />
      {/* Desk legs */}
      <Block position={[-1.8, 0.6, -0.8]} size={[0.15, 1.2, 0.15]} color="#1f1f35" />
      <Block position={[1.8, 0.6, -0.8]} size={[0.15, 1.2, 0.15]} color="#1f1f35" />
      <Block position={[-1.8, 0.6, 0.8]} size={[0.15, 1.2, 0.15]} color="#1f1f35" />
      <Block position={[1.8, 0.6, 0.8]} size={[0.15, 1.2, 0.15]} color="#1f1f35" />

      {/* Monitor stand */}
      <Block position={[0, 1.5, -0.5]} size={[0.8, 0.5, 0.3]} color="#1a1a2e" />
      <Block position={[0, 1.3, -0.3]} size={[0.4, 0.1, 0.4]} color="#1a1a2e" />

      {/* Monitor frame */}
      <Block position={[0, 2.5, -0.6]} size={[2.8, 1.8, 0.15]} color="#1a1a2e" />

      {/* Monitor screen */}
      <mesh ref={screenRef} position={[0, 2.5, -0.5]}>
        <boxGeometry args={[2.5, 1.5, 0.05]} />
        <meshStandardMaterial
          color="#0a0a15"
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Code lines on screen */}
      <CodeLines position={[0, 2.5, -0.45]} />

      {/* Keyboard */}
      <Block position={[0, 1.35, 0.3]} size={[1.5, 0.08, 0.5]} color="#1a1a2e" />
      {/* Keys glow */}
      <Block position={[0, 1.4, 0.3]} size={[1.3, 0.02, 0.35]} color="#8b5cf6" emissiveIntensity={0.2} />

      {/* Mouse */}
      <Block position={[1.2, 1.35, 0.4]} size={[0.25, 0.1, 0.4]} color="#1a1a2e" />

      {/* Coffee mug */}
      <group position={[1.5, 1.35, -0.3]}>
        <Block position={[0, 0.15, 0]} size={[0.3, 0.35, 0.3]} color="#1f1f35" />
        <Block position={[0.2, 0.15, 0]} size={[0.1, 0.2, 0.15]} color="#1f1f35" />
        {/* Coffee */}
        <Block position={[0, 0.28, 0]} size={[0.22, 0.08, 0.22]} color="#3d2817" />
        {/* Steam */}
        <Steam position={[0, 0.45, 0]} />
      </group>
    </group>
  )
}

// Animated code lines
function CodeLines({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        const material = mesh.material as THREE.MeshStandardMaterial
        material.emissiveIntensity = 0.5 + Math.sin(clock.getElapsedTime() * 3 + i) * 0.3
      })
    }
  })

  const lines = [
    { width: 0.8, x: -0.6 },
    { width: 1.2, x: -0.4 },
    { width: 0.6, x: -0.7 },
    { width: 1.0, x: -0.5 },
    { width: 0.9, x: -0.55 },
  ]

  return (
    <group ref={groupRef} position={position}>
      {lines.map((line, i) => (
        <mesh key={i} position={[line.x, 0.4 - i * 0.2, 0]}>
          <boxGeometry args={[line.width, 0.06, 0.01]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

// Steam effect
function Steam({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y = 0.1 + ((clock.getElapsedTime() * 0.3 + i * 0.3) % 0.5)
        child.position.x = Math.sin(clock.getElapsedTime() * 2 + i) * 0.05
        const mesh = child as THREE.Mesh
        const material = mesh.material as THREE.MeshStandardMaterial
        material.opacity = 0.6 - child.position.y
      })
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0.1 + i * 0.15, 0]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

// Pixel character sitting
function Character() {
  const groupRef = useRef<THREE.Group>(null)
  const [headBob, setHeadBob] = useState(0)

  useFrame(({ clock }) => {
    setHeadBob(Math.sin(clock.getElapsedTime() * 2) * 0.03)
  })

  const skin = '#f5d0c5'
  const hair = '#1a1a2e'
  const shirt = '#8b5cf6'
  const pants = '#1f1f35'

  return (
    <group ref={groupRef} position={[-2, 0, -1.8]} scale={0.35}>
      {/* Chair */}
      <Block position={[0, 1.5, 0]} size={[1.2, 0.2, 1.2]} color="#2d2d44" />
      <Block position={[0, 2.5, -0.5]} size={[1.2, 2, 0.2]} color="#2d2d44" />
      <Block position={[0, 0.7, 0]} size={[0.2, 1.4, 0.2]} color="#1f1f35" />

      {/* Legs */}
      <Block position={[-0.25, 2, 0.8]} size={[0.4, 0.8, 0.4]} color={pants} />
      <Block position={[0.25, 2, 0.8]} size={[0.4, 0.8, 0.4]} color={pants} />

      {/* Body */}
      <Block position={[0, 2.8, 0]} size={[0.9, 1, 0.6]} color={shirt} emissiveIntensity={0.1} />
      <Block position={[0, 3.4, 0]} size={[0.7, 0.5, 0.5]} color={shirt} emissiveIntensity={0.1} />

      {/* Arms */}
      <Block position={[-0.6, 2.8, 0.4]} size={[0.35, 0.8, 0.35]} color={shirt} emissiveIntensity={0.1} />
      <Block position={[0.6, 2.8, 0.4]} size={[0.35, 0.8, 0.35]} color={shirt} emissiveIntensity={0.1} />
      <Block position={[-0.6, 2.4, 0.7]} size={[0.3, 0.3, 0.3]} color={skin} />
      <Block position={[0.6, 2.4, 0.7]} size={[0.3, 0.3, 0.3]} color={skin} />

      {/* Head */}
      <group position={[0, headBob, 0]}>
        <Block position={[0, 4, 0]} size={[0.7, 0.8, 0.7]} color={skin} />
        {/* Hair */}
        <Block position={[0, 4.5, -0.1]} size={[0.75, 0.4, 0.6]} color={hair} />
        <Block position={[0, 4.2, -0.35]} size={[0.7, 0.6, 0.2]} color={hair} />
        {/* Headphones */}
        <Block position={[-0.45, 4, 0]} size={[0.15, 0.4, 0.4]} color="#8b5cf6" emissiveIntensity={0.3} />
        <Block position={[0.45, 4, 0]} size={[0.15, 0.4, 0.4]} color="#8b5cf6" emissiveIntensity={0.3} />
        <Block position={[0, 4.55, 0]} size={[0.6, 0.1, 0.3]} color="#4a4a6a" />
      </group>
    </group>
  )
}

// Vinyl/Record player setup
function VinylPlayer({ onPlay, isPlaying }: { onPlay: () => void; isPlaying: boolean }) {
  const discRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (discRef.current && isPlaying) {
      discRef.current.rotation.y += 0.02
    }
  })

  return (
    <group
      position={[2.5, 0, -2]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        onPlay()
      }}
    >
      {/* Table/Stand */}
      <Block position={[0, 0.9, 0]} size={[2.2, 0.15, 1.8]} color="#2d2d44" />
      <Block position={[-0.9, 0.45, -0.7]} size={[0.15, 0.9, 0.15]} color="#1f1f35" />
      <Block position={[0.9, 0.45, -0.7]} size={[0.15, 0.9, 0.15]} color="#1f1f35" />
      <Block position={[-0.9, 0.45, 0.7]} size={[0.15, 0.9, 0.15]} color="#1f1f35" />
      <Block position={[0.9, 0.45, 0.7]} size={[0.15, 0.9, 0.15]} color="#1f1f35" />

      {/* Turntable base */}
      <Block position={[0, 1.1, 0]} size={[2, 0.2, 1.6]} color="#1a1a2e" />

      {/* Platter */}
      <mesh position={[-0.3, 1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.05, 32]} />
        <meshStandardMaterial color="#0f0f1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Vinyl record */}
      <mesh ref={discRef} position={[-0.3, 1.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.02, 32]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive={isPlaying ? '#8b5cf6' : '#4a4a6a'}
          emissiveIntensity={isPlaying ? 0.3 : 0.1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Record label */}
      <mesh position={[-0.3, 1.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={isPlaying ? 0.6 : 0.2}
        />
      </mesh>

      {/* Tonearm */}
      <group position={[0.6, 1.3, -0.4]} rotation={[0, isPlaying ? -0.3 : 0.2, 0]}>
        <Block position={[0, 0.1, 0]} size={[0.08, 0.2, 0.08]} color="#4a4a6a" />
        <Block position={[-0.3, 0.15, 0.1]} size={[0.6, 0.05, 0.05]} color="#4a4a6a" />
        <Block position={[-0.55, 0.15, 0.1]} size={[0.1, 0.08, 0.06]} color="#8b5cf6" emissiveIntensity={0.3} />
      </group>

      {/* Play indicator light */}
      <mesh position={[0.7, 1.25, 0.5]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color={isPlaying ? '#22c55e' : '#4a4a6a'}
          emissive={isPlaying ? '#22c55e' : '#4a4a6a'}
          emissiveIntensity={isPlaying ? 0.8 : 0.2}
        />
      </mesh>

      {/* Hover/Click indicator */}
      {hovered && !isPlaying && (
        <mesh position={[-0.3, 1.8, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.8}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}
    </group>
  )
}

// Speakers
function Speakers() {
  return (
    <group>
      {/* Left speaker */}
      <group position={[-4.5, 0, -4]}>
        <Block position={[0, 0.8, 0]} size={[0.8, 1.6, 0.6]} color="#1a1a2e" />
        <mesh position={[0, 1.1, 0.31]}>
          <circleGeometry args={[0.25, 16]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
        <mesh position={[0, 0.5, 0.31]}>
          <circleGeometry args={[0.15, 16]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* Right speaker */}
      <group position={[0.5, 0, -4]}>
        <Block position={[0, 0.8, 0]} size={[0.8, 1.6, 0.6]} color="#1a1a2e" />
        <mesh position={[0, 1.1, 0.31]}>
          <circleGeometry args={[0.25, 16]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
        <mesh position={[0, 0.5, 0.31]}>
          <circleGeometry args={[0.15, 16]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </group>
  )
}

// Decorative plant
function Plant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Pot */}
      <Block position={[0, 0.25, 0]} size={[0.4, 0.5, 0.4]} color="#4a3728" />
      <Block position={[0, 0.55, 0]} size={[0.45, 0.1, 0.45]} color="#4a3728" />
      {/* Soil */}
      <Block position={[0, 0.52, 0]} size={[0.35, 0.05, 0.35]} color="#2d1f14" />
      {/* Leaves */}
      <Block position={[0, 0.8, 0]} size={[0.15, 0.4, 0.15]} color="#22c55e" emissiveIntensity={0.1} />
      <Block position={[-0.15, 0.9, 0.1]} size={[0.25, 0.15, 0.08]} color="#22c55e" emissiveIntensity={0.1} />
      <Block position={[0.15, 0.85, -0.1]} size={[0.25, 0.15, 0.08]} color="#22c55e" emissiveIntensity={0.1} />
      <Block position={[0.1, 1, 0.12]} size={[0.2, 0.12, 0.06]} color="#16a34a" emissiveIntensity={0.1} />
    </group>
  )
}

// Wall poster
function Poster({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Block position={[0, 0, 0.05]} size={[1.2, 1.6, 0.05]} color="#1f1f35" />
      <Block position={[0, 0, 0.08]} size={[1, 1.4, 0.02]} color="#8b5cf6" emissiveIntensity={0.1} />
      {/* Abstract design */}
      <Block position={[-0.2, 0.3, 0.1]} size={[0.3, 0.3, 0.01]} color="#c084fc" emissiveIntensity={0.2} />
      <Block position={[0.2, -0.2, 0.1]} size={[0.4, 0.2, 0.01]} color="#a855f7" emissiveIntensity={0.2} />
      <mesh position={[0, 0, 0.1]}>
        <circleGeometry args={[0.2, 16]} />
        <meshStandardMaterial color="#f0abfc" emissive="#f0abfc" emissiveIntensity={0.15} />
      </mesh>
    </group>
  )
}

// Shelf with items
function Shelf({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Block position={[0, 0, 0]} size={[2, 0.1, 0.4]} color="#2d2d44" />
      {/* Books */}
      <Block position={[-0.6, 0.25, 0]} size={[0.15, 0.4, 0.25]} color="#8b5cf6" emissiveIntensity={0.1} />
      <Block position={[-0.4, 0.2, 0]} size={[0.12, 0.3, 0.25]} color="#c084fc" emissiveIntensity={0.1} />
      <Block position={[-0.25, 0.25, 0]} size={[0.1, 0.4, 0.25]} color="#a855f7" emissiveIntensity={0.1} />
      {/* Small plant */}
      <Block position={[0.3, 0.15, 0]} size={[0.2, 0.2, 0.2]} color="#4a3728" />
      <Block position={[0.3, 0.3, 0]} size={[0.1, 0.15, 0.1]} color="#22c55e" emissiveIntensity={0.1} />
      {/* Vinyl record display */}
      <Block position={[0.7, 0.25, -0.1]} size={[0.4, 0.4, 0.05]} color="#0a0a0a" />
      <mesh position={[0.7, 0.25, -0.05]}>
        <circleGeometry args={[0.12, 16]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

// Ambient particles
function AmbientParticles({ isPlaying }: { isPlaying: boolean }) {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 50

  useFrame(({ clock }) => {
    if (!particlesRef.current) return
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3 + 1] += isPlaying ? 0.02 : 0.005
      positions[i3] += Math.sin(clock.getElapsedTime() + i) * 0.005

      if (positions[i3 + 1] > 6) {
        positions[i3 + 1] = 0
        positions[i3] = (Math.random() - 0.5) * 10
        positions[i3 + 2] = (Math.random() - 0.5) * 10
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = Math.random() * 6
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#8b5cf6"
        transparent
        opacity={isPlaying ? 0.8 : 0.3}
        sizeAttenuation
      />
    </points>
  )
}

// Main scene
function Scene({ onPlay }: { onPlay: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
    onPlay()
  }, [onPlay])

  return (
    <>
      {/* Isometric camera */}
      <OrthographicCamera
        makeDefault
        zoom={70}
        position={[10, 10, 10]}
        rotation={[-Math.PI / 6, Math.PI / 4, 0]}
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 5, 0]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[-4, 3, -2]} intensity={0.5} color="#c084fc" />
      <pointLight position={[3, 3, 0]} intensity={0.4} color="#a855f7" />
      <directionalLight position={[5, 8, 5]} intensity={0.3} color="#ffffff" />

      {/* Room elements */}
      <Room />
      <DeskSetup />
      <Character />
      <VinylPlayer onPlay={handlePlay} isPlaying={isPlaying} />
      <Speakers />

      {/* Decorations */}
      <Plant position={[3.5, 0, 0]} />
      <Plant position={[-5, 0, -2]} />
      <Poster position={[-2, 3.5, -5.9]} />
      <Shelf position={[2, 2.5, -5.9]} />

      {/* Ambient effects */}
      <AmbientParticles isPlaying={isPlaying} />
    </>
  )
}

export default function VibesScene() {
  const handlePlay = useCallback(() => {
    window.open('https://youtu.be/YxVZbMgA3p0?si=GalEaYZtQf_HDrjk', '_blank')
  }, [])

  return (
    <div className="absolute inset-0">
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <Scene onPlay={handlePlay} />
      </Canvas>
    </div>
  )
}
