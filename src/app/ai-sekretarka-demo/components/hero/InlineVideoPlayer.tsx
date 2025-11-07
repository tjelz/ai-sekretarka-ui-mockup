'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InlineVideoPlayerProps {
  thumbnail?: string;
  videoSrc?: string;
  title?: string;
}

export default function InlineVideoPlayer({
  thumbnail = '/demo-thumb.jpg',
  videoSrc = '/demo.mp4',
  title = 'Zobacz jak działa AI Sekretarka'
}: InlineVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="relative max-w-sm mx-auto rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200/50 group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-auto"
        poster={thumbnail}
        muted={isMuted}
        loop
        playsInline
        onClick={togglePlay}
      >
        {/* In production, add actual video source */}
        {/* <source src={videoSrc} type="video/mp4" /> */}
      </video>

      {/* Thumbnail overlay when not playing */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
          >
            <Play className="w-8 h-8 text-[#007BFF] ml-1" />
          </motion.button>
        </div>
      )}

      {/* Title badge */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
        <p className="text-xs font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-600">15 sekund demo</p>
      </div>

      {/* Controls overlay */}
      <AnimatePresence>
        {showControls && isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
          >
            <div className="flex items-center justify-between gap-2">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white ml-0.5" />
                )}
              </button>

              {/* Mute toggle */}
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white" />
                )}
              </button>

              {/* Fullscreen */}
              <button
                onClick={handleFullscreen}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors ml-auto"
              >
                <Maximize2 className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auto-play indicator */}
      {!isPlaying && (
        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          DEMO
        </div>
      )}
    </motion.div>
  );
}
