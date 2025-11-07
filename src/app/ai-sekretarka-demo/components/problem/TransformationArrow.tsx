'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function TransformationArrow() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
        className="bg-gradient-to-r from-red-500 to-green-500 p-4 rounded-full shadow-2xl"
      >
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight className="w-8 h-8 text-white" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        <div className="bg-white px-4 py-2 rounded-full shadow-lg border-2 border-gray-200">
          <span className="text-sm font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
            Z AI Sekretarką
          </span>
        </div>
      </motion.div>
    </div>
  );
}
