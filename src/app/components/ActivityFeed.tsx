'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const activities = [
  "✓ Anna K. zarezerwowała wizytę",
  "✓ Marek P. otrzymał SMS potwierdzenie",
  "✓ Firma XYZ obsłużyła 23 rozmowy dzisiaj",
  "✓ Kasia M. potwierdziła termin",
  "✓ Jan W. został dodany do kalendarza",
  "✓ Salon Beauty obsłużył 15 klientów",
  "✓ Gabinet Zdrowie umówił 8 wizyt",
  "✓ Tomasz S. otrzymał przypomnienie SMS"
];

export default function ActivityFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 3000); // Change activity every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Show 3 activities in a sliding window
  const visibleActivities = [
    activities[currentIndex],
    activities[(currentIndex + 1) % activities.length],
    activities[(currentIndex + 2) % activities.length]
  ];

  return (
    <div className="relative overflow-hidden bg-white/40 backdrop-blur-sm rounded-xl border border-white/60 py-3 px-4">
      <div className="flex items-center gap-4 overflow-hidden">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
            Aktywność na żywo:
          </span>
        </div>

        {/* Scrolling activities */}
        <div className="flex-1 overflow-hidden relative h-6">
          {visibleActivities.map((activity, index) => (
            <motion.div
              key={`${currentIndex}-${index}`}
              className="absolute left-0 right-0 text-sm text-gray-600 whitespace-nowrap"
              initial={{ y: index === 0 ? 0 : 24, opacity: index === 0 ? 1 : 0 }}
              animate={{
                y: index === 0 ? -24 : (index === 1 ? 0 : 24),
                opacity: index === 1 ? 1 : 0
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {activity}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
