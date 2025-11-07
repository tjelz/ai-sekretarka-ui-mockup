'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterTextProps {
  phrases: string[];
  className?: string;
}

export default function TypewriterText({ phrases, className = '' }: TypewriterTextProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3000); // Change phrase every 3 seconds

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className={`relative inline-block min-h-[2.2em] align-top ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentPhraseIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="block bg-gradient-to-r from-[#007BFF] to-[#0056b3] bg-clip-text text-transparent"
        >
          {phrases[currentPhraseIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
