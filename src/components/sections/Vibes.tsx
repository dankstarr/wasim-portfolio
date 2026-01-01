'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import YouTube, { YouTubePlayer, YouTubeEvent } from 'react-youtube'
import { VinylData, vinylCollection } from '@/components/three/VibesScene'

const VibesScene = dynamic(() => import('@/components/three/VibesScene'), {
  ssr: false,
  loading: () => null,
})

export default function Vibes() {
  const [currentVinyl, setCurrentVinyl] = useState<VinylData | null>(vinylCollection[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const playerRef = useRef<YouTubePlayer | null>(null)

  const handleSelectVinyl = useCallback((vinyl: VinylData) => {
    if (currentVinyl?.id === vinyl.id) {
      if (isPlaying) {
        playerRef.current?.pauseVideo()
      } else {
        playerRef.current?.playVideo()
      }
    } else {
      setCurrentVinyl(vinyl)
      setIsPlaying(true)
    }
  }, [currentVinyl, isPlaying])

  const handlePlayerReady = (event: YouTubeEvent) => {
    playerRef.current = event.target
    if (isPlaying) {
      event.target.playVideo()
    }
  }

  const handlePlayerStateChange = (event: YouTubeEvent) => {
    if (event.data === 1) {
      setIsPlaying(true)
    } else if (event.data === 2 || event.data === 0) {
      setIsPlaying(false)
    }
  }

  const togglePlayPause = () => {
    if (!currentVinyl) return
    if (isPlaying) {
      playerRef.current?.pauseVideo()
    } else {
      playerRef.current?.playVideo()
    }
  }

  const playNext = () => {
    const currentIndex = vinylCollection.findIndex(v => v.id === currentVinyl?.id)
    const nextIndex = (currentIndex + 1) % vinylCollection.length
    setCurrentVinyl(vinylCollection[nextIndex])
    setIsPlaying(true)
  }

  const playPrev = () => {
    const currentIndex = vinylCollection.findIndex(v => v.id === currentVinyl?.id)
    const prevIndex = currentIndex === 0 ? vinylCollection.length - 1 : currentIndex - 1
    setCurrentVinyl(vinylCollection[prevIndex])
    setIsPlaying(true)
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#060609]">
      {/* Three.js Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 4.5, 5], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <VibesScene currentVinyl={currentVinyl} isPlaying={isPlaying} />
        </Canvas>
      </div>

      {/* Hidden YouTube Player */}
      {currentVinyl && (
        <div className="absolute top-0 left-0 w-0 h-0 overflow-hidden opacity-0 pointer-events-none">
          <YouTube
            key={currentVinyl.id}
            videoId={currentVinyl.youtubeId}
            opts={{
              height: '1',
              width: '1',
              playerVars: {
                autoplay: isPlaying ? 1 : 0,
                controls: 0,
              },
            }}
            onReady={handlePlayerReady}
            onStateChange={handlePlayerStateChange}
          />
        </div>
      )}

      {/* Overlay Controls - Centered on vinyl */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative flex flex-col items-center pointer-events-auto">
          {/* Play/Pause Button - Center of vinyl */}
          <motion.button
            onClick={togglePlayPause}
            className="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all border-2"
            style={{
              backgroundColor: `${currentVinyl?.color}20`,
              borderColor: `${currentVinyl?.color}60`,
              boxShadow: isPlaying ? `0 0 40px ${currentVinyl?.color}40` : 'none',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.button>

          {/* Track Info - Below play button */}
          <AnimatePresence mode="wait">
            {currentVinyl && (
              <motion.div
                key={currentVinyl.id}
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                  {currentVinyl.title}
                </h3>
                <p className="text-text-secondary text-sm mt-1">
                  {currentVinyl.artist}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Prev/Next Controls */}
          <div className="flex items-center gap-8 mt-6">
            <button
              onClick={playPrev}
              className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            <button
              onClick={playNext}
              className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          {/* Track Selection */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-md px-4">
            {vinylCollection.map((vinyl) => (
              <motion.button
                key={vinyl.id}
                onClick={() => handleSelectVinyl(vinyl)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  currentVinyl?.id === vinyl.id
                    ? 'text-white'
                    : 'text-text-secondary hover:text-white'
                }`}
                style={{
                  backgroundColor: currentVinyl?.id === vinyl.id
                    ? `${vinyl.color}25`
                    : 'rgba(255,255,255,0.05)',
                  borderWidth: 1,
                  borderColor: currentVinyl?.id === vinyl.id
                    ? `${vinyl.color}80`
                    : 'rgba(255,255,255,0.1)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {currentVinyl?.id === vinyl.id && isPlaying && (
                  <span className="flex items-end gap-0.5 h-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-0.5 rounded-full"
                        style={{ backgroundColor: vinyl.color }}
                        animate={{ height: ['40%', '100%', '40%'] }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </span>
                )}
                <span>{vinyl.artist}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Section Label - Top */}
      <div className="absolute top-8 inset-x-0 z-10 flex justify-center pointer-events-none">
        <motion.p
          className="text-text-secondary/30 text-xs font-mono tracking-widest uppercase"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Coding Vibes
        </motion.p>
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#060609] via-[#060609]/50 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#060609] via-[#060609]/50 to-transparent pointer-events-none" />
    </section>
  )
}
