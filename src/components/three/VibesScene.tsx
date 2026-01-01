'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

// Vinyl record data
export interface VinylData {
  id: string
  title: string
  artist: string
  youtubeId: string
  color: string
  labelColor: string
}

export const vinylCollection: VinylData[] = [
  {
    id: '1',
    title: 'HEAVEN',
    artist: 'The Blaze',
    youtubeId: 'YxVZbMgA3p0',
    color: '#8b5cf6',
    labelColor: '#c084fc',
  },
  {
    id: '2',
    title: 'Teardrops',
    artist: 'RÜFÜS DU SOL',
    youtubeId: 'Tx9MPC7YSLI',
    color: '#3b82f6',
    labelColor: '#60a5fa',
  },
  {
    id: '3',
    title: 'Cola',
    artist: 'CamelPhat',
    youtubeId: 'zTmYsgWDsVI',
    color: '#ec4899',
    labelColor: '#f472b6',
  },
  {
    id: '4',
    title: 'Opus',
    artist: 'Eric Prydz',
    youtubeId: 'iRA82xLsb_w',
    color: '#f59e0b',
    labelColor: '#fbbf24',
  },
  {
    id: '5',
    title: 'Strobe',
    artist: 'Deadmau5',
    youtubeId: 'tKi9Z-f6qX4',
    color: '#22c55e',
    labelColor: '#4ade80',
  },
]

// Turntable component
function Turntable({ currentVinyl, isPlaying }: { currentVinyl: VinylData | null; isPlaying: boolean }) {
  const discRef = useRef<THREE.Group>(null)
  const tonearmRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (discRef.current && isPlaying) {
      discRef.current.rotation.y += 0.015
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Base */}
      <RoundedBox args={[5, 0.4, 4]} radius={0.1} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.3} />
      </RoundedBox>

      {/* Top surface */}
      <RoundedBox args={[4.8, 0.15, 3.8]} radius={0.05} position={[0, 0.48, 0]}>
        <meshStandardMaterial color="#0f0f1a" metalness={0.6} roughness={0.2} />
      </RoundedBox>

      {/* Platter */}
      <mesh position={[-0.5, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.4, 1.4, 0.08, 64]} />
        <meshStandardMaterial color="#1f1f35" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Slip mat */}
      <mesh position={[-0.5, 0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.35, 1.35, 0.02, 64]} />
        <meshStandardMaterial color="#2d2d44" />
      </mesh>

      {/* Vinyl record */}
      {currentVinyl && (
        <group ref={discRef} position={[-0.5, 0.68, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1.3, 1.3, 0.02, 64]} />
            <meshStandardMaterial
              color="#0a0a0a"
              metalness={0.9}
              roughness={0.1}
              emissive={currentVinyl.color}
              emissiveIntensity={isPlaying ? 0.15 : 0.05}
            />
          </mesh>
          {/* Grooves */}
          {[0.3, 0.5, 0.7, 0.9, 1.1].map((r, i) => (
            <mesh key={i} position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[r - 0.02, r, 64]} />
              <meshStandardMaterial color="#1a1a1a" transparent opacity={0.5} />
            </mesh>
          ))}
          {/* Label */}
          <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.01, 32]} />
            <meshStandardMaterial
              color={currentVinyl.labelColor}
              emissive={currentVinyl.labelColor}
              emissiveIntensity={isPlaying ? 0.4 : 0.15}
            />
          </mesh>
        </group>
      )}

      {/* Spindle */}
      <mesh position={[-0.5, 0.75, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 16]} />
        <meshStandardMaterial color="#4a4a6a" metalness={0.9} />
      </mesh>

      {/* Tonearm base */}
      <group position={[1.5, 0.6, -1.2]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
          <meshStandardMaterial color="#2d2d44" metalness={0.7} />
        </mesh>

        {/* Tonearm */}
        <group ref={tonearmRef} rotation={[0, isPlaying ? -0.4 : 0.3, 0]}>
          <mesh position={[-0.8, 0.1, 0.3]} rotation={[0, 0, -0.1]}>
            <boxGeometry args={[1.8, 0.04, 0.04]} />
            <meshStandardMaterial color="#4a4a6a" metalness={0.8} />
          </mesh>
          {/* Headshell */}
          <mesh position={[-1.65, 0.05, 0.3]}>
            <boxGeometry args={[0.15, 0.08, 0.1]} />
            <meshStandardMaterial color={currentVinyl?.color || '#8b5cf6'} emissive={currentVinyl?.color || '#8b5cf6'} emissiveIntensity={0.3} />
          </mesh>
        </group>
      </group>

      {/* Power LED */}
      <mesh position={[2, 0.55, 1.5]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color={isPlaying ? '#22c55e' : '#4a4a6a'}
          emissive={isPlaying ? '#22c55e' : '#4a4a6a'}
          emissiveIntensity={isPlaying ? 1 : 0.2}
        />
      </mesh>

      {/* Speed buttons */}
      {[0, 0.3].map((x, i) => (
        <mesh key={i} position={[1.5 + x, 0.55, 1.5]}>
          <cylinderGeometry args={[0.08, 0.08, 0.03, 16]} />
          <meshStandardMaterial color={i === 0 ? '#8b5cf6' : '#4a4a6a'} />
        </mesh>
      ))}
    </group>
  )
}

// Single vinyl in rack
function VinylInRack({
  vinyl,
  index,
  isSelected,
  onClick,
}: {
  vinyl: VinylData
  index: number
  isSelected: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      const targetY = hovered ? 0.3 : 0
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.1
    }
  })

  return (
    <group
      ref={groupRef}
      position={[index * 0.4 - 0.8, 0, 0]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      {/* Vinyl sleeve */}
      <RoundedBox args={[0.35, 2.5, 2.5]} radius={0.02}>
        <meshStandardMaterial
          color={vinyl.color}
          emissive={vinyl.color}
          emissiveIntensity={isSelected ? 0.4 : hovered ? 0.25 : 0.1}
        />
      </RoundedBox>

      {/* Cover design - circle */}
      <mesh position={[0.18, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial
          color={vinyl.labelColor}
          emissive={vinyl.labelColor}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Inner circle */}
      <mesh position={[0.185, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.2, 0.5, 32]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
    </group>
  )
}

// Vinyl rack
function VinylRack({
  vinyls,
  selectedId,
  onSelect,
}: {
  vinyls: VinylData[]
  selectedId: string | null
  onSelect: (vinyl: VinylData) => void
}) {
  return (
    <group position={[5, 0.8, 0]} rotation={[0, -0.3, 0]}>
      {/* Rack frame */}
      <RoundedBox args={[3, 0.2, 3]} radius={0.05} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.3} />
      </RoundedBox>

      {/* Rack back */}
      <RoundedBox args={[3, 3, 0.1]} radius={0.02} position={[0, 1.5, -1.4]}>
        <meshStandardMaterial color="#0f0f1a" />
      </RoundedBox>

      {/* Dividers */}
      <RoundedBox args={[0.05, 2.8, 2.8]} radius={0.01} position={[-1.2, 1.5, 0]}>
        <meshStandardMaterial color="#2d2d44" />
      </RoundedBox>
      <RoundedBox args={[0.05, 2.8, 2.8]} radius={0.01} position={[1.2, 1.5, 0]}>
        <meshStandardMaterial color="#2d2d44" />
      </RoundedBox>

      {/* Vinyls */}
      <group position={[0, 1.4, 0.3]}>
        {vinyls.map((vinyl, i) => (
          <VinylInRack
            key={vinyl.id}
            vinyl={vinyl}
            index={i}
            isSelected={selectedId === vinyl.id}
            onClick={() => onSelect(vinyl)}
          />
        ))}
      </group>

      {/* Label */}
      <mesh position={[0, 3.2, -1.35]}>
        <planeGeometry args={[2, 0.3]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

// Ambient lighting orbs
function AmbientOrbs({ isPlaying, color }: { isPlaying: boolean; color: string }) {
  const orb1Ref = useRef<THREE.Mesh>(null)
  const orb2Ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (orb1Ref.current) {
      orb1Ref.current.position.y = 3 + Math.sin(t * 0.5) * 0.5
      orb1Ref.current.position.x = -3 + Math.sin(t * 0.3) * 0.3
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.y = 2.5 + Math.cos(t * 0.4) * 0.5
      orb2Ref.current.position.x = 4 + Math.cos(t * 0.35) * 0.3
    }
  })

  return (
    <>
      <mesh ref={orb1Ref} position={[-3, 3, -2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isPlaying ? 0.8 : 0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={orb2Ref} position={[4, 2.5, -2]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isPlaying ? 0.6 : 0.2}
          transparent
          opacity={0.5}
        />
      </mesh>
    </>
  )
}

// Main scene component
function Scene({
  currentVinyl,
  isPlaying,
  onSelectVinyl,
}: {
  currentVinyl: VinylData | null
  isPlaying: boolean
  onSelectVinyl: (vinyl: VinylData) => void
}) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-5, 3, 0]} intensity={0.5} color={currentVinyl?.color || '#8b5cf6'} />
      <pointLight position={[5, 3, 0]} intensity={0.5} color={currentVinyl?.color || '#c084fc'} />
      <spotLight position={[0, 8, 0]} angle={0.4} intensity={0.8} color="#ffffff" />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0a0a15" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Components */}
      <Turntable currentVinyl={currentVinyl} isPlaying={isPlaying} />
      <VinylRack
        vinyls={vinylCollection}
        selectedId={currentVinyl?.id || null}
        onSelect={onSelectVinyl}
      />
      <AmbientOrbs isPlaying={isPlaying} color={currentVinyl?.color || '#8b5cf6'} />

      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.5}
        minAzimuthAngle={-Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
      />
    </>
  )
}

// Main export - receives state from parent
export default function VibesScene({
  currentVinyl,
  isPlaying,
  onSelectVinyl,
}: {
  currentVinyl: VinylData | null
  isPlaying: boolean
  onSelectVinyl: (vinyl: VinylData) => void
}) {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 4, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene
          currentVinyl={currentVinyl}
          isPlaying={isPlaying}
          onSelectVinyl={onSelectVinyl}
        />
      </Canvas>
    </div>
  )
}
