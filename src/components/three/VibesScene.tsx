'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// Audio visualizer bars arranged in a ring
function AudioRing() {
  const groupRef = useRef<THREE.Group>(null)
  const barsRef = useRef<THREE.Mesh[]>([])
  const barCount = 64
  const radius = 3

  const bars = useMemo(() => {
    return Array.from({ length: barCount }, (_, i) => {
      const angle = (i / barCount) * Math.PI * 2
      return {
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        angle,
        phase: i * 0.15,
      }
    })
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    barsRef.current.forEach((bar, i) => {
      if (bar) {
        // Simulate audio frequencies with multiple sine waves
        const wave1 = Math.sin(t * 2 + bars[i].phase) * 0.5
        const wave2 = Math.sin(t * 3.5 + bars[i].phase * 0.7) * 0.3
        const wave3 = Math.sin(t * 1.2 + bars[i].phase * 1.3) * 0.2
        const height = 0.3 + Math.abs(wave1 + wave2 + wave3)

        bar.scale.y = height
        bar.position.y = height / 2

        // Color shift based on height
        const material = bar.material as THREE.MeshStandardMaterial
        const hue = 0.85 + height * 0.1 // Purple to pink range
        material.color.setHSL(hue, 0.8, 0.5 + height * 0.2)
        material.emissive.setHSL(hue, 0.9, height * 0.3)
      }
    })

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {bars.map((bar, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) barsRef.current[i] = el
          }}
          position={[bar.x, 0, bar.z]}
          rotation={[0, -bar.angle, 0]}
        >
          <boxGeometry args={[0.08, 1, 0.08]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

// Central pulsing core
function Core() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      const pulse = 1 + Math.sin(t * 2) * 0.1
      meshRef.current.scale.setScalar(pulse)
      meshRef.current.rotation.y = t * 0.3
      meshRef.current.rotation.x = t * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[0.8, 64, 64]}>
        <MeshDistortMaterial
          color="#1a1a2e"
          emissive="#8b5cf6"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
          distort={0.3}
          speed={3}
        />
      </Sphere>
    </Float>
  )
}

// Steam/smoke particles rising
function SteamParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 200

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const vel = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      // Start in a small area (like from a coffee cup)
      pos[i3] = (Math.random() - 0.5) * 0.5
      pos[i3 + 1] = -2 + Math.random() * 4
      pos[i3 + 2] = (Math.random() - 0.5) * 0.5

      // Upward velocity with slight drift
      vel[i3] = (Math.random() - 0.5) * 0.02
      vel[i3 + 1] = 0.01 + Math.random() * 0.02
      vel[i3 + 2] = (Math.random() - 0.5) * 0.02
    }

    return [pos, vel]
  }, [])

  const sizes = useMemo(() => {
    const s = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      s[i] = Math.random() * 3 + 1
    }
    return s
  }, [])

  useFrame(({ clock }) => {
    if (!particlesRef.current) return

    const positionAttr = particlesRef.current.geometry.attributes.position
    const posArray = positionAttr.array as Float32Array
    const t = clock.getElapsedTime()

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Move upward
      posArray[i3] += velocities[i3] + Math.sin(t + i) * 0.002
      posArray[i3 + 1] += velocities[i3 + 1]
      posArray[i3 + 2] += velocities[i3 + 2] + Math.cos(t + i) * 0.002

      // Reset when too high
      if (posArray[i3 + 1] > 3) {
        posArray[i3] = (Math.random() - 0.5) * 0.5
        posArray[i3 + 1] = -2
        posArray[i3 + 2] = (Math.random() - 0.5) * 0.5
      }
    }

    positionAttr.needsUpdate = true
    particlesRef.current.rotation.y = t * 0.05
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Orbiting rings
function OrbitalRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5
      ring1Ref.current.rotation.y = t * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.PI / 3 + t * 0.3
      ring2Ref.current.rotation.z = t * 0.4
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.6
      ring3Ref.current.rotation.z = Math.PI / 4 + t * 0.2
    }
  })

  return (
    <group>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.3, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.5}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.6, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#c084fc"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}

// Floating coffee cup silhouette made of particles
function CoffeeCupOutline() {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const points: number[] = []
    const segments = 50

    // Cup body (cylinder outline)
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const radius = 0.4
      // Bottom circle
      points.push(Math.cos(angle) * radius * 0.8, -0.5, Math.sin(angle) * radius * 0.8)
      // Top circle
      points.push(Math.cos(angle) * radius, 0.3, Math.sin(angle) * radius)
    }

    // Handle
    for (let i = 0; i < 20; i++) {
      const t = i / 19
      const angle = -Math.PI / 2 + t * Math.PI
      points.push(
        0.4 + Math.cos(angle) * 0.25,
        -0.1 + Math.sin(angle) * 0.3,
        0
      )
    }

    return new Float32Array(points)
  }, [])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.2
      pointsRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1 - 1.5
    }
  })

  return (
    <points ref={pointsRef} position={[4, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#c084fc"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 0]} intensity={1} color="#8b5cf6" />
      <pointLight position={[5, 0, 5]} intensity={0.5} color="#a855f7" />
      <pointLight position={[-5, 0, -5]} intensity={0.5} color="#c084fc" />

      <Core />
      <AudioRing />
      <OrbitalRings />
      <SteamParticles />
      <CoffeeCupOutline />
    </>
  )
}

export default function VibesScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
