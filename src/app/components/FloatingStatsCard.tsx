'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { LucideProps } from 'lucide-react';

interface FloatingStatsCardProps {
  icon: React.FC<LucideProps>;
  value: string;
  label: string;
  delay?: number;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

export default function FloatingStatsCard({
  icon: Icon,
  value,
  label,
  delay = 0,
  position,
}: FloatingStatsCardProps) {
  return (
    <motion.div
      className="absolute bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 p-3 min-w-[140px] hidden md:block"
      style={position}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0],
        scale: 1,
      }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5 },
        y: {
          delay: delay + 0.5,
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-[#007BFF]" />
        </div>
        <span className="text-lg font-black text-gray-900">{value}</span>
      </div>
      <p className="text-xs text-gray-600 font-medium">{label}</p>
    </motion.div>
  );
}
