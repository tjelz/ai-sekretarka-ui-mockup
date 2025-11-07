'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';

export default function LiveIndicator() {
  return (
    <motion.div
      className="inline-flex items-center gap-2 bg-green-100 border-2 border-green-300 text-green-700 px-4 py-2 rounded-full shadow-md"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'backOut' }}
    >
      {/* Pulsing dot */}
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>

      {/* Radio icon */}
      <Radio className="w-4 h-4" />

      {/* Text */}
      <span className="text-sm font-bold">
        Live Now
      </span>
    </motion.div>
  );
}
