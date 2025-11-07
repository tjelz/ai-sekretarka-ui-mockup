'use client';

import React from 'react';
import { TrendingUp, Calculator } from 'lucide-react';

interface PricingCalculatorInputsProps {
  avgPrice: number;
  setAvgPrice: (value: number) => void;
  conversion: number;
  setConversion: (value: number) => void;
}

export default function PricingCalculatorInputs({
  avgPrice,
  setAvgPrice,
  conversion,
  setConversion,
}: PricingCalculatorInputsProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-[#007BFF] rounded-lg flex items-center justify-center">
          <Calculator className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">
          Oblicz swój potencjalny zysk
        </h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Dostosuj parametry, aby zobaczyć ile możesz zarobić z każdym planem
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Average Price Input */}
        <div className="bg-white rounded-xl p-4 border border-blue-200">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <TrendingUp className="w-4 h-4 text-[#007BFF]" />
            Średnia wartość wizyty
          </label>
          <div className="relative">
            <input
              type="number"
              value={avgPrice}
              onChange={(e) => setAvgPrice(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-3 text-center text-xl font-bold border-2 border-gray-200 focus:border-[#007BFF] rounded-lg transition-all bg-white pr-12"
              min="0"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
              zł
            </span>
          </div>
        </div>

        {/* Conversion Percentage Input */}
        <div className="bg-white rounded-xl p-4 border border-green-200">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <Calculator className="w-4 h-4 text-green-600" />
            Współczynnik konwersji
          </label>
          <div className="relative">
            <input
              type="number"
              value={conversion}
              onChange={(e) => setConversion(Math.max(0, Math.min(100, Number(e.target.value))))}
              className="w-full px-4 py-3 text-center text-xl font-bold border-2 border-gray-200 focus:border-[#007BFF] rounded-lg transition-all bg-white pr-12"
              min="0"
              max="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
              %
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        💡 Przykład: Jeśli średnia wizyta = 125 zł i 40% rozmów kończy się wizytą, zobaczysz swój realny zysk
      </p>
    </div>
  );
}
