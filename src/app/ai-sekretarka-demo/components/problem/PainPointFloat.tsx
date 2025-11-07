'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PainPointFloatProps {
  text: string;
  delay?: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
}

export default function PainPointFloat({ text, delay = 0, position }: PainPointFloatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0],
        scale: 1
      }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5 },
        y: {
          delay: delay + 0.5,
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      className="absolute bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold shadow-lg border-2 border-red-300 whitespace-nowrap"
      style={position}
    >
      ❌ {text}
    </motion.div>
  );
}
