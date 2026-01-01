'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import YouTube, { YouTubePlayer, YouTubeEvent } from 'react-youtube'
import { VinylData, vinylCollection } from '@/components/three/VibesScene'

const VibesScene = dynamic(() => import('@/components/three/VibesScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a15]">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

export default function Vibes() {
  const [currentVinyl, setCurrentVinyl] = useState<VinylData | null>(vinylCollection[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const playerRef = useRef<YouTubePlayer | null>(null)

  const handleSelectVinyl = useCallback((vinyl: VinylData) => {
    if (currentVinyl?.id === vinyl.id) {
      // Toggle play/pause
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
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0a12]">
      {/* Three.js Scene */}
      <VibesScene
        currentVinyl={currentVinyl}
        isPlaying={isPlaying}
        onSelectVinyl={handleSelectVinyl}
      />

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

      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary to-transparent pointer-events-none z-10" />

      {/* Player Controls - Bottom Center */}
      <div className="absolute bottom-0 inset-x-0 z-20">
        <div className="bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/95 to-transparent pt-20 pb-8">
          <div className="container mx-auto px-4 max-w-2xl">
            {/* Track Info */}
            <AnimatePresence mode="wait">
              {currentVinyl && (
                <motion.div
                  key={currentVinyl.id}
                  className="text-center mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-1">
                    {currentVinyl.title}
                  </h3>
                  <p className="text-text-secondary text-sm md:text-base">
                    {currentVinyl.artist}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-6 mb-8">
              {/* Previous */}
              <button
                onClick={playPrev}
                className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              {/* Play/Pause */}
              <motion.button
                onClick={togglePlayPause}
                className="w-16 h-16 rounded-full flex items-center justify-center transition-all"
                style={{
                  backgroundColor: currentVinyl?.color || '#8b5cf6',
                  boxShadow: isPlaying ? `0 0 30px ${currentVinyl?.color}50` : 'none'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </motion.button>

              {/* Next */}
              <button
                onClick={playNext}
                className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>
            </div>

            {/* Track List */}
            <div className="flex justify-center gap-2 flex-wrap">
              {vinylCollection.map((vinyl) => (
                <motion.button
                  key={vinyl.id}
                  onClick={() => handleSelectVinyl(vinyl)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 ${
                    currentVinyl?.id === vinyl.id
                      ? 'text-white'
                      : 'text-text-secondary hover:text-white'
                  }`}
                  style={{
                    backgroundColor: currentVinyl?.id === vinyl.id
                      ? `${vinyl.color}30`
                      : 'rgba(255,255,255,0.05)',
                    borderWidth: 1,
                    borderColor: currentVinyl?.id === vinyl.id
                      ? vinyl.color
                      : 'transparent',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Playing indicator */}
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

            {/* Section Label */}
            <motion.p
              className="text-center text-text-secondary/40 text-xs mt-6 font-mono tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Coding Vibes
            </motion.p>
          </div>
        </div>
      </div>

      {/* Animated equalizer when playing */}
      <AnimatePresence>
        {isPlaying && currentVinyl && (
          <motion.div
            className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col items-center gap-1 pointer-events-none"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full"
                style={{ backgroundColor: currentVinyl.color }}
                animate={{
                  height: [4, 16 + Math.random() * 20, 4],
                }}
                transition={{
                  duration: 0.4 + Math.random() * 0.3,
                  repeat: Infinity,
                  delay: i * 0.05,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
