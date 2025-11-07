'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AudioWaveformProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

export default function AudioWaveform({ isPlaying, currentTime, duration }: AudioWaveformProps) {
  const bars = 40;
  const progress = currentTime / duration;

  return (
    <div className="flex items-center justify-center gap-1 h-20">
      {[...Array(bars)].map((_, i) => {
        // Deterministic height pattern
        const baseHeight = 20 + ((i * 13 + 7) % 40);
        const isPast = i / bars < progress;

        return (
          <motion.div
            key={i}
            animate={{
              height: isPlaying
                ? [baseHeight, baseHeight * 1.5, baseHeight]
                : baseHeight,
            }}
            transition={{
              duration: 0.5,
              repeat: isPlaying ? Infinity : 0,
              delay: i * 0.05,
              ease: 'easeInOut',
            }}
            className={`
              w-1 rounded-full transition-colors duration-300
              ${isPast
                ? 'bg-gradient-to-t from-blue-500 to-purple-500'
                : 'bg-gray-300'
              }
            `}
            style={{ height: `${baseHeight}px` }}
          />
        );
      })}
    </div>
  );
}
