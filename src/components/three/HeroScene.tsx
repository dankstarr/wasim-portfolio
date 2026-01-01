'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  Box,
  Torus,
  Octahedron,
  Environment,
  Stars
} from '@react-three/drei'
import * as THREE from 'three'
import { useMousePosition } from '@/hooks/useMousePosition'

function FloatingShapeSphere({
  position,
  color,
  scale = 1,
  speed = 1
}: {
  position: [number, number, number]
  color: string
  scale?: number
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouse = useMousePosition()

  useFrame(() => {
    if (!meshRef.current) return
    const targetX = position[0] + mouse.normalizedX * 0.3
    const targetY = position[1] + mouse.normalizedY * 0.3
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.02)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.02)
    meshRef.current.rotation.x += 0.003 * speed
    meshRef.current.rotation.y += 0.005 * speed
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <Sphere args={[1, 32, 32]}>
          <MeshDistortMaterial color={color} roughness={0.2} metalness={0.8} distort={0.3} speed={2} transparent opacity={0.8} />
        </Sphere>
      </mesh>
    </Float>
  )
}

function FloatingShapeOctahedron({
  position,
  color,
  scale = 1,
  speed = 1
}: {
  position: [number, number, number]
  color: string
  scale?: number
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouse = useMousePosition()

  useFrame(() => {
    if (!meshRef.current) return
    const targetX = position[0] + mouse.normalizedX * 0.3
    const targetY = position[1] + mouse.normalizedY * 0.3
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.02)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.02)
    meshRef.current.rotation.x += 0.003 * speed
    meshRef.current.rotation.y += 0.005 * speed
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <Octahedron args={[1, 0]}>
          <MeshDistortMaterial color={color} roughness={0.2} metalness={0.8} distort={0.3} speed={2} transparent opacity={0.8} />
        </Octahedron>
      </mesh>
    </Float>
  )
}

function FloatingShapeTorus({
  position,
  color,
  scale = 1,
  speed = 1
}: {
  position: [number, number, number]
  color: string
  scale?: number
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouse = useMousePosition()

  useFrame(() => {
    if (!meshRef.current) return
    const targetX = position[0] + mouse.normalizedX * 0.3
    const targetY = position[1] + mouse.normalizedY * 0.3
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.02)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.02)
    meshRef.current.rotation.x += 0.003 * speed
    meshRef.current.rotation.y += 0.005 * speed
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <Torus args={[0.5, 0.2, 16, 32]}>
          <MeshDistortMaterial color={color} roughness={0.2} metalness={0.8} distort={0.3} speed={2} transparent opacity={0.8} />
        </Torus>
      </mesh>
    </Float>
  )
}

function FloatingShapeBox({
  position,
  color,
  scale = 1,
  speed = 1
}: {
  position: [number, number, number]
  color: string
  scale?: number
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouse = useMousePosition()

  useFrame(() => {
    if (!meshRef.current) return
    const targetX = position[0] + mouse.normalizedX * 0.3
    const targetY = position[1] + mouse.normalizedY * 0.3
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.02)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.02)
    meshRef.current.rotation.x += 0.003 * speed
    meshRef.current.rotation.y += 0.005 * speed
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <Box args={[1, 1, 1]}>
          <MeshDistortMaterial color={color} roughness={0.2} metalness={0.8} distort={0.3} speed={2} transparent opacity={0.8} />
        </Box>
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 2000

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return positions
  }, [])

  useFrame((state) => {
    if (!particlesRef.current) return
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
    particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01
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
        size={0.03}
        color="#6366f1"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function GlowingOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouse = useMousePosition()

  useFrame((state) => {
    if (!meshRef.current) return

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      mouse.normalizedX * 2,
      0.05
    )
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      mouse.normalizedY * 2,
      0.05
    )

    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color="#6366f1"
        emissive="#4338ca"
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

function CameraController() {
  const { camera } = useThree()
  const mouse = useMousePosition()

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.normalizedX * 0.5,
      0.02
    )
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.normalizedY * 0.5,
      0.02
    )
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#0a0a0a']} />
      <fog attach="fog" args={['#0a0a0a', 5, 25]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />

      <CameraController />

      {/* Main glowing orb */}
      <GlowingOrb />

      {/* Floating shapes */}
      <FloatingShapeSphere position={[-3, 2, -3]} color="#6366f1" scale={0.5} speed={1.2} />
      <FloatingShapeOctahedron position={[3, -1, -4]} color="#8b5cf6" scale={0.4} speed={0.8} />
      <FloatingShapeTorus position={[-2, -2, -2]} color="#d946ef" scale={0.6} speed={1.5} />
      <FloatingShapeBox position={[2.5, 1.5, -5]} color="#6366f1" scale={0.3} speed={1} />
      <FloatingShapeSphere position={[-4, 0, -6]} color="#818cf8" scale={0.4} speed={0.7} />
      <FloatingShapeOctahedron position={[4, -2, -4]} color="#a78bfa" scale={0.3} speed={1.3} />

      {/* Particle field */}
      <ParticleField />

      {/* Background stars */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

      <Environment preset="night" />
    </>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
