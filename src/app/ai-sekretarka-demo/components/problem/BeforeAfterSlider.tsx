'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BeforeAfterSliderProps {
  beforeContent: React.ReactNode;
  afterContent: React.ReactNode;
}

export default function BeforeAfterSlider({ beforeContent, afterContent }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  return (
    <div
      className="relative w-full h-[600px] select-none cursor-ew-resize overflow-hidden rounded-2xl"
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* After (Right side - full width) */}
      <div className="absolute inset-0">
        {afterContent}
      </div>

      {/* Before (Left side - clipped) */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        {beforeContent}
      </motion.div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ scale: isDragging ? 1.2 : 1 }}
            className="w-12 h-12 bg-white rounded-full shadow-2xl border-4 border-gray-300 flex items-center justify-center"
          >
            <div className="flex gap-1">
              <div className="w-0.5 h-6 bg-gray-400 rounded-full" />
              <div className="w-0.5 h-6 bg-gray-400 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10">
        ❌ Bez AI
      </div>
      <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10">
        ✅ Z AI Sekretarką
      </div>
    </div>
  );
}
