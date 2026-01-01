'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
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
  const [currentVinyl, setCurrentVinyl] = useState<VinylData>(vinylCollection[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const playerRef = useRef<YouTubePlayer | null>(null)

  // Handle YouTube player ready
  const handlePlayerReady = useCallback((event: YouTubeEvent) => {
    playerRef.current = event.target
    setIsReady(true)
  }, [])

  // Handle YouTube player state changes
  const handlePlayerStateChange = useCallback((event: YouTubeEvent) => {
    // 1 = playing, 2 = paused, 0 = ended
    if (event.data === 1) {
      setIsPlaying(true)
    } else if (event.data === 2 || event.data === 0) {
      setIsPlaying(false)
    }
  }, [])

  // Play/pause toggle
  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      playerRef.current?.pauseVideo()
      setIsPlaying(false)
    } else {
      playerRef.current?.playVideo()
      setIsPlaying(true)
    }
  }, [isPlaying])

  // Change track
  const changeTrack = useCallback((vinyl: VinylData, autoPlay: boolean = true) => {
    setCurrentVinyl(vinyl)
    setIsReady(false)
    if (autoPlay) {
      setIsPlaying(true)
    }
  }, [])

  // Feel Lucky - random track
  const feelLucky = useCallback(() => {
    const availableTracks = vinylCollection.filter(v => v.id !== currentVinyl.id)
    const randomTrack = availableTracks[Math.floor(Math.random() * availableTracks.length)]
    changeTrack(randomTrack, true)
  }, [currentVinyl, changeTrack])

  // Play next track
  const playNext = useCallback(() => {
    const currentIndex = vinylCollection.findIndex(v => v.id === currentVinyl.id)
    const nextIndex = (currentIndex + 1) % vinylCollection.length
    changeTrack(vinylCollection[nextIndex], true)
  }, [currentVinyl, changeTrack])

  // Play previous track
  const playPrev = useCallback(() => {
    const currentIndex = vinylCollection.findIndex(v => v.id === currentVinyl.id)
    const prevIndex = currentIndex === 0 ? vinylCollection.length - 1 : currentIndex - 1
    changeTrack(vinylCollection[prevIndex], true)
  }, [currentVinyl, changeTrack])

  // Auto-play when player is ready and isPlaying is true
  useEffect(() => {
    if (isReady && isPlaying) {
      playerRef.current?.playVideo()
    }
  }, [isReady, isPlaying])

  // Featured tracks (first 5) for quick access
  const featuredTracks = vinylCollection.slice(0, 5)

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#060609]">
      {/* Three.js Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 5, 6], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <VibesScene currentVinyl={currentVinyl} isPlaying={isPlaying} />
        </Canvas>
      </div>

      {/* Hidden YouTube Player */}
      <div className="absolute top-0 left-0 w-0 h-0 overflow-hidden opacity-0 pointer-events-none">
        <YouTube
          key={currentVinyl.id}
          videoId={currentVinyl.youtubeId}
          opts={{
            height: '1',
            width: '1',
            playerVars: {
              autoplay: 0,
              controls: 0,
              modestbranding: 1,
              rel: 0,
            },
          }}
          onReady={handlePlayerReady}
          onStateChange={handlePlayerStateChange}
        />
      </div>

      {/* Overlay Controls - Centered */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative flex flex-col items-center pointer-events-auto">
          {/* Play/Pause Button */}
          <motion.button
            onClick={togglePlayPause}
            className="w-24 h-24 rounded-full flex items-center justify-center backdrop-blur-md transition-all border-2"
            style={{
              backgroundColor: `${currentVinyl.color}15`,
              borderColor: `${currentVinyl.color}50`,
              boxShadow: isPlaying
                ? `0 0 60px ${currentVinyl.color}50, inset 0 0 30px ${currentVinyl.color}20`
                : `0 0 20px ${currentVinyl.color}20`,
            }}
            whileHover={{ scale: 1.08, boxShadow: `0 0 80px ${currentVinyl.color}60` }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.svg
                  key="pause"
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="play"
                  className="w-10 h-10 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ scale: 0, rotate: 90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M8 5.14v14l11-7-11-7z" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Track Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVinyl.id}
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
                {currentVinyl.title}
              </h3>
              <p className="text-text-secondary text-base mt-1">
                {currentVinyl.artist}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Transport Controls */}
          <div className="flex items-center gap-6 mt-6">
            <motion.button
              onClick={playPrev}
              className="w-12 h-12 flex items-center justify-center text-text-secondary hover:text-white transition-all rounded-full hover:bg-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </motion.button>

            <motion.button
              onClick={playNext}
              className="w-12 h-12 flex items-center justify-center text-text-secondary hover:text-white transition-all rounded-full hover:bg-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </motion.button>
          </div>

          {/* Feel Lucky Button */}
          <motion.button
            onClick={feelLucky}
            className="mt-6 px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all"
            style={{
              background: `linear-gradient(135deg, ${currentVinyl.color}40, ${currentVinyl.color}20)`,
              border: `1px solid ${currentVinyl.color}60`,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 30px ${currentVinyl.color}40`,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span className="text-white">Feel Lucky</span>
          </motion.button>

          {/* Featured Tracks */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-lg px-4">
            {featuredTracks.map((vinyl) => (
              <motion.button
                key={vinyl.id}
                onClick={() => changeTrack(vinyl, true)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  currentVinyl.id === vinyl.id
                    ? 'text-white'
                    : 'text-text-secondary hover:text-white'
                }`}
                style={{
                  backgroundColor: currentVinyl.id === vinyl.id
                    ? `${vinyl.color}30`
                    : 'rgba(255,255,255,0.05)',
                  borderWidth: 1,
                  borderColor: currentVinyl.id === vinyl.id
                    ? `${vinyl.color}80`
                    : 'rgba(255,255,255,0.1)',
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {currentVinyl.id === vinyl.id && isPlaying && (
                  <span className="flex items-end gap-0.5 h-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-0.5 rounded-full"
                        style={{ backgroundColor: vinyl.color }}
                        animate={{ height: ['40%', '100%', '40%'] }}
                        transition={{
                          duration: 0.4,
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

          {/* Track counter */}
          <p className="text-text-secondary/40 text-xs mt-4 font-mono">
            {vinylCollection.findIndex(v => v.id === currentVinyl.id) + 1} / {vinylCollection.length} tracks
          </p>
        </div>
      </div>

      {/* Section Label */}
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

      {/* Gradient overlays */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#060609] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#060609] to-transparent pointer-events-none" />
    </section>
  )
}
