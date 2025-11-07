'use client';

import React from 'react';
import { Shield, Lock, CheckCircle2, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrustBadgeBar() {
  const badges = [
    {
      icon: Shield,
      label: 'RODO',
      sublabel: 'Zgodne',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: Lock,
      label: 'SSL',
      sublabel: 'Szyfrowane',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: CheckCircle2,
      label: '100%',
      sublabel: 'Bezpieczne',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: Award,
      label: 'ISO 27001',
      sublabel: 'Certyfikat',
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="flex flex-wrap items-center justify-center gap-4 pt-4"
    >
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
            className={`flex items-center gap-2 ${badge.bg} px-3 py-2 rounded-lg border border-gray-200/50`}
          >
            <Icon className={`w-4 h-4 ${badge.color}`} />
            <div className="flex flex-col">
              <span className={`text-xs font-bold ${badge.color}`}>
                {badge.label}
              </span>
              <span className="text-xs text-gray-600">
                {badge.sublabel}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
