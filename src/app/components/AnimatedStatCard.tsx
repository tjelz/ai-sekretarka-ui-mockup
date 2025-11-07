'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { LucideIcon } from 'lucide-react';

interface AnimatedStatCardProps {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  label: string;
  sublabel: string;
  trend: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
  delay?: number;
}

const colorConfig = {
  blue: {
    iconBg: 'bg-blue-100',
    iconColor: 'text-[#007BFF]',
    trendBg: 'bg-blue-50',
    trendText: 'text-[#007BFF]',
    sparkline: '#007BFF'
  },
  green: {
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    trendBg: 'bg-green-50',
    trendText: 'text-green-600',
    sparkline: '#10B981'
  },
  purple: {
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    trendBg: 'bg-purple-50',
    trendText: 'text-purple-600',
    sparkline: '#9333EA'
  },
  orange: {
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    trendBg: 'bg-orange-50',
    trendText: 'text-orange-600',
    sparkline: '#F97316'
  }
};

export default function AnimatedStatCard({
  icon: Icon,
  value,
  suffix = '',
  label,
  sublabel,
  trend,
  color,
  delay = 0
}: AnimatedStatCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const colors = colorConfig[color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="bg-white/80 backdrop-blur-lg border border-white/50 shadow-xl rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 group relative overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with pulse animation */}
        <motion.div
          className={`w-14 h-14 ${colors.iconBg} rounded-xl flex items-center justify-center mb-4`}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon className={`w-7 h-7 ${colors.iconColor}`} />
        </motion.div>

        {/* Animated Number */}
        <div className="mb-2">
          {inView && (
            <div className="text-5xl font-black text-gray-900 tracking-tight">
              <CountUp
                end={value}
                duration={2.5}
                decimals={suffix === 's' ? 1 : (suffix === '%' ? 1 : 0)}
                delay={delay}
              />
              <span className="text-4xl">{suffix}</span>
            </div>
          )}
        </div>

        {/* Label */}
        <h3 className="text-sm font-semibold text-gray-600 mb-1">
          {label}
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          {sublabel}
        </p>

        {/* Trend Badge */}
        <div className={`inline-flex items-center gap-1.5 ${colors.trendBg} ${colors.trendText} px-3 py-1.5 rounded-full text-xs font-semibold`}>
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors.iconBg} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${colors.iconBg}`}></span>
          </span>
          {trend}
        </div>
      </div>
    </motion.div>
  );
}
