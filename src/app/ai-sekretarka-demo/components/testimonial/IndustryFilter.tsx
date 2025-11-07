'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

interface IndustryFilterProps {
  industries: string[];
  activeFilter: string;
  onFilterChange: (industry: string) => void;
}

const industryLabels: Record<string, string> = {
  all: 'Wszystkie',
  salon: '💇 Salon',
  gabinet: '🏥 Gabinet',
  warsztat: '🔧 Warsztat',
  kancelaria: '⚖️ Kancelaria',
  fizjoterapia: '💆 Fizjoterapia',
};

export default function IndustryFilter({ industries, activeFilter, onFilterChange }: IndustryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {/* Filter Icon Label */}
      <div className="flex items-center gap-2 text-gray-600 font-semibold text-sm">
        <Filter className="w-4 h-4" />
        Filtruj:
      </div>

      {/* Filter Buttons */}
      {industries.map((industry) => {
        const isActive = activeFilter === industry;
        const label = industryLabels[industry] || industry;

        return (
          <motion.button
            key={industry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange(industry)}
            className={`
              relative px-5 py-2.5 rounded-full font-bold text-sm transition-all
              ${isActive
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-300'
              }
            `}
          >
            {label}

            {/* Active Indicator */}
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 -z-10"
                transition={{ type: 'spring', duration: 0.6 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
