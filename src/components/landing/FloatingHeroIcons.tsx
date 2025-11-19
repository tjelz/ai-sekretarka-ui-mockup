"use client"

import { motion } from "framer-motion"
import { Phone, Calendar, MessageSquare, Sparkles, Bell, User, Globe, BarChart } from "lucide-react"

const icons = [
  { Icon: Phone, delay: 0, x: -220, y: -80, size: 48 },
  { Icon: Calendar, delay: 1.5, x: 240, y: -100, size: 40 },
  { Icon: MessageSquare, delay: 3, x: -260, y: 80, size: 36 },
  { Icon: BarChart, delay: 2, x: 280, y: 60, size: 44 },
  { Icon: Globe, delay: 4, x: -120, y: 180, size: 32 },
  { Icon: User, delay: 2.5, x: 140, y: -180, size: 32 },
]

export function FloatingHeroIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 hidden md:block overflow-visible">
      {icons.map(({ Icon, delay, x, y, size }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [y, y - 10, y],
          }}
          transition={{
            opacity: { duration: 0.8, delay },
            scale: { duration: 0.8, delay },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 1.2 },
          }}
          className="absolute left-1/2 top-1/2"
          style={{ marginLeft: x, marginTop: y }}
        >
          {/* Glassmorphism Card instead of solid color bubble */}
          <div className="p-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-lg shadow-slate-200/50 ring-1 ring-white/50">
             <Icon className="text-slate-700" style={{ width: size * 0.6, height: size * 0.6 }} strokeWidth={1.5} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
