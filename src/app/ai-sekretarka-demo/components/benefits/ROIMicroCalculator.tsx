'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface ROIMicroCalculatorProps {
  calculator: {
    type: string;
    question: string;
    formula: string;
    result: string;
  };
  color: string;
}

export default function ROIMicroCalculator({ calculator, color }: ROIMicroCalculatorProps) {
  const [value, setValue] = useState(10);

  // Calculate result based on type
  const calculateResult = () => {
    switch (calculator.type) {
      case 'evening_calls':
        // Evening calls * avg value * conversion rate
        return value * 150 * 0.6;
      case 'time_saved':
        // Hours saved * hourly rate
        return value * 100;
      case 'no_show':
        // No-shows * avg value
        return value * 200;
      case 'bookings':
        // Extra bookings * avg value
        return value * 150;
      default:
        return value * 100;
    }
  };

  const result = calculateResult();

  // Get max value based on type
  const getMax = () => {
    switch (calculator.type) {
      case 'evening_calls':
        return 50; // Max 50 evening calls
      case 'time_saved':
        return 40; // Max 40 hours
      case 'no_show':
        return 30; // Max 30 no-shows
      case 'bookings':
        return 50; // Max 50 extra bookings
      default:
        return 50;
    }
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className={`w-5 h-5 text-${color}-600`} />
        <h4 className="text-lg font-bold text-gray-900">Oblicz Swój ROI</h4>
      </div>

      {/* Question */}
      <p className="text-sm text-gray-700 mb-4 font-medium">
        {calculator.question}
      </p>

      {/* Slider */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Wartość:</span>
          <span className={`text-2xl font-black text-${color}-600`}>{value}</span>
        </div>
        <Slider
          value={[value]}
          onValueChange={(val: number[]) => setValue(val[0])}
          max={getMax()}
          step={1}
          className="cursor-pointer"
        />
      </div>

      {/* Result */}
      <motion.div
        key={result}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className={`bg-gradient-to-r from-${color}-50 to-${color}-100 rounded-xl p-4 border-2 border-${color}-300`}
      >
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className={`w-5 h-5 text-${color}-600`} />
          <span className="text-xs text-gray-600 font-semibold uppercase">
            Twój Zysk
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-black text-${color}-700`}>
            {result.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
          </span>
          <span className={`text-lg font-bold text-${color}-600`}>zł/miesiąc</span>
        </div>
      </motion.div>
    </div>
  );
}
