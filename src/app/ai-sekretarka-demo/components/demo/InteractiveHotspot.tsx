'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

interface InteractiveHotspotProps {
  title: string;
  description: string;
}

export default function InteractiveHotspot({ title, description }: InteractiveHotspotProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Hotspot Button */}
      <motion.button
        onHoverStart={() => setIsOpen(true)}
        onHoverEnd={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors relative z-20"
      >
        <HelpCircle className="w-3 h-3" />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white rounded-xl p-4 shadow-2xl z-30"
          >
            {/* Arrow */}
            <div className="absolute -top-2 left-2 w-4 h-4 bg-gray-900 transform rotate-45" />

            {/* Content */}
            <div className="relative z-10">
              <h4 className="text-sm font-bold mb-2">{title}</h4>
              <p className="text-xs text-gray-300 leading-relaxed">{description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
