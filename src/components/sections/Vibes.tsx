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
  const [currentVinyl, setCurrentVinyl] = useState<VinylData | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const playerRef = useRef<YouTubePlayer | null>(null)

  const handleSelectVinyl = useCallback((vinyl: VinylData) => {
    if (currentVinyl?.id === vinyl.id) {
      // Toggle play/pause for same vinyl
      if (isPlaying) {
        playerRef.current?.pauseVideo()
        setIsPlaying(false)
      } else {
        playerRef.current?.playVideo()
        setIsPlaying(true)
      }
    } else {
      // Switch to new vinyl
      setCurrentVinyl(vinyl)
      setIsPlaying(true)
    }
  }, [currentVinyl, isPlaying])

  const handlePlayerReady = (event: YouTubeEvent) => {
    playerRef.current = event.target
    event.target.playVideo()
  }

  const handlePlayerStateChange = (event: YouTubeEvent) => {
    // 1 = playing, 2 = paused, 0 = ended
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

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0a15]">
      {/* Three.js Scene */}
      <VibesScene
        currentVinyl={currentVinyl}
        isPlaying={isPlaying}
        onSelectVinyl={handleSelectVinyl}
      />

      {/* Hidden YouTube Player */}
      {currentVinyl && (
        <div className="absolute top-0 left-0 w-0 h-0 overflow-hidden">
          <YouTube
            key={currentVinyl.id}
            videoId={currentVinyl.youtubeId}
            opts={{
              height: '1',
              width: '1',
              playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                fs: 0,
                modestbranding: 1,
              },
            }}
            onReady={handlePlayerReady}
            onStateChange={handlePlayerStateChange}
          />
        </div>
      )}

      {/* Top gradient */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary to-transparent pointer-events-none" />

      {/* Now Playing UI */}
      <AnimatePresence>
        {currentVinyl && (
          <motion.div
            className="absolute top-24 left-1/2 -translate-x-1/2 z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center gap-4 px-6 py-3 rounded-full glass">
              {/* Vinyl color indicator */}
              <div
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: currentVinyl.color }}
              />

              {/* Track info */}
              <div className="text-center">
                <p className="text-white font-medium text-sm md:text-base">
                  {currentVinyl.title}
                </p>
                <p className="text-text-secondary text-xs">
                  {currentVinyl.artist}
                </p>
              </div>

              {/* Play/Pause button */}
              <button
                onClick={togglePlayPause}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: `${currentVinyl.color}30` }}
              >
                {isPlaying ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom content area */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <div className="h-32 bg-gradient-to-t from-primary to-transparent" />

        <div className="bg-primary pb-8 md:pb-12">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.p
                className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-accent mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                The Vibe Check
              </motion.p>

              <motion.h2
                className="text-xl md:text-3xl font-display font-bold text-white mb-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Select a Record to Play
              </motion.h2>

              {/* Track list */}
              <motion.div
                className="flex flex-wrap justify-center gap-2 mt-4 pointer-events-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {vinylCollection.map((vinyl) => (
                  <button
                    key={vinyl.id}
                    onClick={() => handleSelectVinyl(vinyl)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      currentVinyl?.id === vinyl.id
                        ? 'text-white scale-105'
                        : 'text-text-secondary hover:text-white'
                    }`}
                    style={{
                      backgroundColor: currentVinyl?.id === vinyl.id ? `${vinyl.color}40` : 'transparent',
                      borderWidth: 1,
                      borderColor: currentVinyl?.id === vinyl.id ? vinyl.color : '#ffffff20',
                    }}
                  >
                    {vinyl.artist}
                  </button>
                ))}
              </motion.div>

              {/* Instruction */}
              <motion.p
                className="text-text-secondary/60 text-xs mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Click records in the 3D scene or buttons above
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Visualizer bars when playing */}
      <AnimatePresence>
        {isPlaying && currentVinyl && (
          <motion.div
            className="absolute bottom-40 left-1/2 -translate-x-1/2 flex items-end gap-1 h-8 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full"
                style={{ backgroundColor: currentVinyl.color }}
                animate={{
                  height: [8, 20 + Math.random() * 12, 8],
                }}
                transition={{
                  duration: 0.5 + Math.random() * 0.3,
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
