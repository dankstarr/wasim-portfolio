'use client'

import { useRef, useMemo, useState, useCallback } from 'react'
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber'
import { Float, Text, Box, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

// Voxel/Pixel style helper
function Voxel({
  position,
  color,
  scale = 1,
  emissive,
  emissiveIntensity = 0
}: {
  position: [number, number, number]
  color: string
  scale?: number
  emissive?: string
  emissiveIntensity?: number
}) {
  return (
    <Box position={position} args={[scale * 0.9, scale * 0.9, scale * 0.9]}>
      <meshStandardMaterial
        color={color}
        emissive={emissive || color}
        emissiveIntensity={emissiveIntensity}
      />
    </Box>
  )
}

// Pixelated Coder Character
function PixelCoder() {
  const groupRef = useRef<THREE.Group>(null)
  const [headBob, setHeadBob] = useState(0)
  const [typing, setTyping] = useState(0)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    // Head bobbing to the beat
    setHeadBob(Math.sin(t * 3) * 0.05)
    // Typing animation
    setTyping(Math.sin(t * 8) * 0.03)
  })

  // Pixel art person sitting at desk
  const skinColor = '#f5d0c5'
  const hairColor = '#1a1a2e'
  const shirtColor = '#8b5cf6'
  const pantsColor = '#1a1a2e'
  const deskColor = '#2d2d44'
  const screenColor = '#0f0f1a'
  const screenGlow = '#8b5cf6'

  return (
    <group ref={groupRef} position={[-4, -1.5, 0]} scale={0.4}>
      {/* Chair */}
      <Voxel position={[0, 0, 0]} color="#1a1a2e" />
      <Voxel position={[0, 1, 0]} color="#1a1a2e" />
      <Voxel position={[0, 2, -0.5]} color="#1a1a2e" />
      <Voxel position={[0, 3, -0.5]} color="#1a1a2e" />
      <Voxel position={[0, 4, -0.5]} color="#1a1a2e" />

      {/* Body - Torso */}
      <Voxel position={[0, 2, 0]} color={shirtColor} emissiveIntensity={0.2} />
      <Voxel position={[0, 3, 0]} color={shirtColor} emissiveIntensity={0.2} />
      <Voxel position={[0, 4, 0]} color={shirtColor} emissiveIntensity={0.2} />

      {/* Legs */}
      <Voxel position={[-0.5, 1, 0.5]} color={pantsColor} />
      <Voxel position={[0.5, 1, 0.5]} color={pantsColor} />
      <Voxel position={[-0.5, 0, 0.5]} color={pantsColor} />
      <Voxel position={[0.5, 0, 0.5]} color={pantsColor} />

      {/* Head */}
      <group position={[0, headBob, 0]}>
        <Voxel position={[0, 5, 0]} color={skinColor} />
        <Voxel position={[0, 6, 0]} color={skinColor} />
        {/* Hair */}
        <Voxel position={[0, 7, 0]} color={hairColor} />
        <Voxel position={[0, 6, -0.5]} color={hairColor} />
        <Voxel position={[-0.5, 6, 0]} color={hairColor} />
        <Voxel position={[0.5, 6, 0]} color={hairColor} />
        {/* Headphones */}
        <Voxel position={[-1, 5.5, 0]} color="#8b5cf6" scale={0.6} emissiveIntensity={0.5} />
        <Voxel position={[1, 5.5, 0]} color="#8b5cf6" scale={0.6} emissiveIntensity={0.5} />
        <Voxel position={[0, 7.2, 0]} color="#4a4a6a" scale={0.5} />
      </group>

      {/* Arms - typing animation */}
      <group position={[0, typing, 0]}>
        <Voxel position={[-1, 3.5, 0.5]} color={shirtColor} emissiveIntensity={0.2} />
        <Voxel position={[1, 3.5, 0.5]} color={shirtColor} emissiveIntensity={0.2} />
        <Voxel position={[-1.5, 3, 1]} color={skinColor} />
        <Voxel position={[1.5, 3, 1]} color={skinColor} />
      </group>

      {/* Desk */}
      <Voxel position={[0, 2.5, 2]} color={deskColor} scale={3} />
      <Voxel position={[-2, 2.5, 2]} color={deskColor} />
      <Voxel position={[2, 2.5, 2]} color={deskColor} />

      {/* Desk legs */}
      <Voxel position={[-2, 1.5, 2]} color={deskColor} scale={0.5} />
      <Voxel position={[-2, 0.5, 2]} color={deskColor} scale={0.5} />
      <Voxel position={[2, 1.5, 2]} color={deskColor} scale={0.5} />
      <Voxel position={[2, 0.5, 2]} color={deskColor} scale={0.5} />

      {/* Monitor */}
      <Voxel position={[0, 4.5, 2]} color="#2d2d44" scale={2.5} />
      <Voxel position={[0, 5.5, 2]} color="#2d2d44" scale={2.5} />
      <Voxel position={[0, 6.5, 2]} color="#2d2d44" scale={2.5} />

      {/* Screen glow */}
      <Box position={[0, 5.5, 1.7]} args={[2, 2, 0.1]}>
        <meshStandardMaterial
          color={screenColor}
          emissive={screenGlow}
          emissiveIntensity={0.8}
        />
      </Box>

      {/* Code lines on screen */}
      <CodeLines position={[0, 5.5, 1.6]} />

      {/* Coffee mug */}
      <Voxel position={[2.5, 3.2, 1.5]} color="#1a1a2e" scale={0.6} />
      <Voxel position={[2.5, 3.6, 1.5]} color="#1a1a2e" scale={0.6} />
      {/* Coffee */}
      <Voxel position={[2.5, 3.8, 1.5]} color="#3d2817" scale={0.5} />
      {/* Steam */}
      <CoffeeSteam position={[2.5, 4.2, 1.5]} />
    </group>
  )
}

// Animated code lines on screen
function CodeLines({ position }: { position: [number, number, number] }) {
  const linesRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        const material = mesh.material as THREE.MeshStandardMaterial
        const pulse = Math.sin(clock.getElapsedTime() * 2 + i * 0.5) * 0.3 + 0.7
        material.emissiveIntensity = pulse
      })
    }
  })

  return (
    <group ref={linesRef} position={position}>
      {[0.6, 0.3, 0, -0.3, -0.6].map((y, i) => (
        <Box key={i} position={[-0.3, y, 0]} args={[0.8 + Math.random() * 0.5, 0.08, 0.01]}>
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
          />
        </Box>
      ))}
    </group>
  )
}

// Coffee steam particles
function CoffeeSteam({ position }: { position: [number, number, number] }) {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 20

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.2
      pos[i * 3 + 1] = Math.random() * 0.8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.2
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (!particlesRef.current) return
    const posAttr = particlesRef.current.geometry.attributes.position
    const arr = posAttr.array as Float32Array

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += 0.01
      arr[i * 3] += Math.sin(clock.getElapsedTime() + i) * 0.002
      if (arr[i * 3 + 1] > 1) {
        arr[i * 3 + 1] = 0
        arr[i * 3] = (Math.random() - 0.5) * 0.2
      }
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.4} />
    </points>
  )
}

// Interactive Jukebox
function Jukebox({ onPlay }: { onPlay: () => void }) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const discRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1
    }
    if (discRef.current && isPlaying) {
      discRef.current.rotation.z += 0.02
    }
  })

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    setIsPlaying(true)
    onPlay()
  }, [onPlay])

  const bodyColor = '#1a1a2e'
  const accentColor = '#8b5cf6'
  const glowIntensity = hovered ? 0.8 : 0.3

  return (
    <group
      ref={groupRef}
      position={[4.5, -0.5, 0]}
      scale={0.5}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Jukebox body */}
      <RoundedBox args={[3, 5, 2]} radius={0.2} position={[0, 2, 0]}>
        <meshStandardMaterial color={bodyColor} metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* Top arch */}
      <RoundedBox args={[3.2, 1.5, 2.2]} radius={0.3} position={[0, 5, 0]}>
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={glowIntensity}
          metalness={0.9}
          roughness={0.1}
        />
      </RoundedBox>

      {/* Display window */}
      <RoundedBox args={[2.4, 2, 0.1]} radius={0.1} position={[0, 3, 1]}>
        <meshStandardMaterial
          color="#0a0a15"
          emissive={accentColor}
          emissiveIntensity={0.2}
        />
      </RoundedBox>

      {/* Vinyl disc */}
      <mesh ref={discRef} position={[0, 3, 1.1]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive={accentColor}
          emissiveIntensity={isPlaying ? 0.3 : 0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Disc label */}
      <mesh position={[0, 3, 1.15]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.25, 32]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={isPlaying ? 0.8 : 0.3}
        />
      </mesh>

      {/* Play button - Main interactive */}
      <group position={[0, 0.8, 1.1]} onClick={handleClick}>
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
          <meshStandardMaterial
            color={isPlaying ? "#22c55e" : accentColor}
            emissive={isPlaying ? "#22c55e" : accentColor}
            emissiveIntensity={hovered ? 1 : 0.5}
            metalness={0.8}
          />
        </mesh>
        {/* Play triangle or pause bars */}
        {!isPlaying ? (
          <mesh position={[0.05, 0, 0.11]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <coneGeometry args={[0.2, 0.3, 3]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
        ) : (
          <>
            <Box position={[-0.08, 0, 0.11]} args={[0.08, 0.25, 0.02]}>
              <meshStandardMaterial color="#ffffff" />
            </Box>
            <Box position={[0.08, 0, 0.11]} args={[0.08, 0.25, 0.02]}>
              <meshStandardMaterial color="#ffffff" />
            </Box>
          </>
        )}
      </group>

      {/* Song selection buttons */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
        <mesh key={i} position={[x, -0.2, 1.1]}>
          <boxGeometry args={[0.25, 0.15, 0.1]} />
          <meshStandardMaterial
            color={i === 2 ? accentColor : '#2d2d44'}
            emissive={i === 2 ? accentColor : '#2d2d44'}
            emissiveIntensity={i === 2 ? 0.5 : 0.1}
          />
        </mesh>
      ))}

      {/* Speaker grills */}
      {[-0.8, 0.8].map((x, i) => (
        <group key={i} position={[x, 1.8, 1]}>
          {[0, 0.15, 0.3, 0.45].map((y, j) => (
            <Box key={j} position={[0, y, 0]} args={[0.5, 0.08, 0.05]}>
              <meshStandardMaterial color="#0a0a15" />
            </Box>
          ))}
        </group>
      ))}

      {/* Neon trim lights */}
      <NeonTrim position={[0, 0, 0]} isPlaying={isPlaying} />

      {/* "CLICK TO PLAY" text */}
      {!isPlaying && (
        <Float speed={2} floatIntensity={0.3}>
          <Text
            position={[0, 6.5, 0]}
            fontSize={0.3}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/SpaceGrotesk-Bold.ttf"
          >
            {hovered ? 'CLICK!' : 'PLAY'}
          </Text>
        </Float>
      )}
    </group>
  )
}

// Neon trim lights around jukebox
function NeonTrim({ position, isPlaying }: { position: [number, number, number]; isPlaying: boolean }) {
  const lightsRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!lightsRef.current || !isPlaying) return
    lightsRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh
      const material = mesh.material as THREE.MeshStandardMaterial
      const wave = Math.sin(clock.getElapsedTime() * 4 + i * 0.5) * 0.5 + 0.5
      material.emissiveIntensity = wave
    })
  })

  const lightPositions: [number, number, number][] = [
    [-1.5, 4.5, 1], [-1.5, 3.5, 1], [-1.5, 2.5, 1], [-1.5, 1.5, 1],
    [1.5, 4.5, 1], [1.5, 3.5, 1], [1.5, 2.5, 1], [1.5, 1.5, 1],
  ]

  return (
    <group ref={lightsRef} position={position}>
      {lightPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={isPlaying ? 0.8 : 0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

// Audio visualizer bars (simplified, responding to "music")
function AudioBars({ isPlaying }: { isPlaying: boolean }) {
  const barsRef = useRef<THREE.Group>(null)
  const barCount = 16
  const meshRefs = useRef<THREE.Mesh[]>([])

  useFrame(({ clock }) => {
    if (!isPlaying) return
    const t = clock.getElapsedTime()

    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const wave = Math.sin(t * 4 + i * 0.4) * 0.5 +
                    Math.sin(t * 6 + i * 0.3) * 0.3 +
                    Math.sin(t * 2 + i * 0.6) * 0.2
        const height = 0.5 + Math.abs(wave) * 1.5
        mesh.scale.y = height
        mesh.position.y = -2.5 + height / 2

        const material = mesh.material as THREE.MeshStandardMaterial
        material.emissiveIntensity = 0.3 + Math.abs(wave) * 0.5
      }
    })
  })

  return (
    <group ref={barsRef} position={[0, 0, -3]}>
      {Array.from({ length: barCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) meshRefs.current[i] = el }}
          position={[(i - barCount / 2) * 0.5, -2, 0]}
        >
          <boxGeometry args={[0.3, 1, 0.3]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

// Floating music notes
function MusicNotes({ isPlaying }: { isPlaying: boolean }) {
  const notesRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!notesRef.current || !isPlaying) return
    notesRef.current.children.forEach((child, i) => {
      child.position.y += 0.02
      child.position.x += Math.sin(clock.getElapsedTime() + i) * 0.01
      child.rotation.z = Math.sin(clock.getElapsedTime() * 2 + i) * 0.2

      if (child.position.y > 5) {
        child.position.y = -2
        child.position.x = (Math.random() - 0.5) * 8
      }
    })
  })

  if (!isPlaying) return null

  return (
    <group ref={notesRef}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Text
          key={i}
          position={[(Math.random() - 0.5) * 8, Math.random() * 4 - 2, -1]}
          fontSize={0.4}
          color="#8b5cf6"
        >
          ♪
        </Text>
      ))}
    </group>
  )
}

// Main Scene
function Scene({ onPlay }: { onPlay: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
    onPlay()
  }, [onPlay])

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-5, 3, 0]} intensity={0.5} color="#a855f7" />
      <pointLight position={[5, 3, 0]} intensity={0.5} color="#c084fc" />
      <spotLight position={[0, 8, 0]} angle={0.5} intensity={0.5} color="#8b5cf6" />

      <PixelCoder />
      <Jukebox onPlay={handlePlay} />
      <AudioBars isPlaying={isPlaying} />
      <MusicNotes isPlaying={isPlaying} />

      {/* Floor reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#0a0a15"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </>
  )
}

export default function VibesScene() {
  const handlePlay = useCallback(() => {
    // Open YouTube link in new tab
    window.open('https://youtu.be/YxVZbMgA3p0?si=GalEaYZtQf_HDrjk', '_blank')
  }, [])

  return (
    <div className="absolute inset-0 cursor-pointer">
      <Canvas
        camera={{ position: [0, 1, 10], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene onPlay={handlePlay} />
      </Canvas>
    </div>
  )
}
