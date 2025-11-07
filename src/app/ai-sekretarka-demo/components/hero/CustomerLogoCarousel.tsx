'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function CustomerLogoCarousel() {
  // Mock customer logos - in production, replace with actual logos
  const logos = [
    { name: 'Salon Beauty', industry: 'Kraków' },
    { name: 'Gabinet Zdrowie', industry: 'Warszawa' },
    { name: 'Auto Serwis', industry: 'Gdańsk' },
    { name: 'Studio Uroda', industry: 'Poznań' },
    { name: 'Klinika Dental', industry: 'Wrocław' },
    { name: 'Fizjo Aktywni', industry: 'Katowice' },
    { name: 'Moto Fix', industry: 'Lublin' },
    { name: 'Beauty Spa', industry: 'Szczecin' }
  ];

  // Duplicate for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-sm font-semibold text-gray-600">
          Zaufało nam 50+ firm w całej Polsce
        </p>
      </div>

      {/* Scrolling logos */}
      <motion.div
        className="flex gap-8"
        animate={{
          x: [0, -100 * logos.length]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear"
          }
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex-shrink-0 w-40 h-20 bg-white rounded-xl border border-gray-200 flex flex-col items-center justify-center gap-1 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-sm font-bold text-gray-900">{logo.name}</div>
            <div className="text-xs text-gray-500">{logo.industry}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
