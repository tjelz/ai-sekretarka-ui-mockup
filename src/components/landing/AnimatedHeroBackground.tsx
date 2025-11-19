"use client"

import { motion } from "framer-motion"

export function AnimatedHeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-slate-50/50">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-80" />
      
      {/* Abstract Tech Shapes - Less Blobby, More Geometric/Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[20%] -left-[10%] h-[800px] w-[800px] rounded-full bg-gradient-to-br from-blue-100/40 to-indigo-100/40 blur-[100px]"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -15, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
        className="absolute top-[10%] right-[0%] h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-purple-100/30 to-blue-100/30 blur-[80px]"
      />

      <motion.div
        animate={{
          y: [0, -50, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute -bottom-[20%] left-[20%] h-[700px] w-[700px] rounded-full bg-gradient-to-t from-slate-200/40 to-transparent blur-[120px]"
      />

      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Subtle Noise Texture for Professional Feel */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("/noise.png")' }} />
    </div>
  )
}
