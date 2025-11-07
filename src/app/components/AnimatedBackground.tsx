'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-50" />

      {/* Geometric Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated Blur Orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: '10%', left: '5%' }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-purple-400/15 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: '40%', right: '10%' }}
      />

      <motion.div
        className="absolute w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ bottom: '15%', left: '30%' }}
      />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => {
        // Use deterministic "random" values based on index to prevent hydration mismatch
        const xPosition = ((i * 37 + 13) % 100); // Deterministic spread 0-100
        const duration = 10 + ((i * 7) % 10); // Duration 10-20s
        const delay = (i * 0.5) % 5; // Delay 0-5s

        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-300/40 rounded-full"
            initial={{
              x: `${xPosition}%`,
              y: '100%',
            }}
            animate={{
              y: '-100%',
              opacity: [0, 1, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
            }}
          />
        );
      })}
    </div>
  );
}
