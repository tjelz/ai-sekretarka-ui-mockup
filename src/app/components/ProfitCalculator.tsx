'use client';

import React, { useState } from 'react';
import { TrendingUp, Sparkles } from 'lucide-react';

interface Plan {
  name: string;
  price: number;
  calls: number;
}

const PLANS: Plan[] = [
  { name: 'Solo', price: 299, calls: 100 },
  { name: 'Ekipa', price: 599, calls: 225 },
  { name: 'Firma', price: 999, calls: 500 },
];

const OVERAGE_PER_CALL = 1.5;

export default function ProfitCalculator() {
  const [avgPrice, setAvgPrice] = useState(125);
  const [conversionPercent, setConversionPercent] = useState(40);

  // Format PLN with no decimals
  const formatPLN = (num: number): string => {
    return Math.floor(num).toLocaleString('pl-PL');
  };

  // Calculate metrics for each plan
  const calculateMetrics = (plan: Plan) => {
    const visits = Math.floor(plan.calls * (conversionPercent / 100));
    const revenue = visits * avgPrice;
    const profit = revenue - plan.price;

    return { visits, revenue, profit };
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-[#007BFF]" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Kalkulator Zysku</h3>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Oblicz potencjalny zysk z AI Sekretarki na podstawie Twoich danych
      </p>

      {/* Inputs */}
      <div className="space-y-5 mb-6">
        {/* Average Price Input */}
        <div className="bg-blue-50/30 rounded-xl p-4 border border-blue-100/50">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Średnia wartość wizyty (zł)
          </label>
          <input
            type="number"
            value={avgPrice}
            onChange={(e) => setAvgPrice(Math.max(0, Number(e.target.value)))}
            className="w-full px-4 py-3 text-center text-lg font-bold border-2 border-gray-200 focus:border-[#007BFF] rounded-lg transition-all bg-white"
            min="0"
          />
        </div>

        {/* Conversion Percentage Input */}
        <div className="bg-green-50/30 rounded-xl p-4 border border-green-100/50">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Współczynnik konwersji (%)
          </label>
          <input
            type="number"
            value={conversionPercent}
            onChange={(e) => setConversionPercent(Math.max(0, Math.min(100, Number(e.target.value))))}
            className="w-full px-4 py-3 text-center text-lg font-bold border-2 border-gray-200 focus:border-[#007BFF] rounded-lg transition-all bg-white"
            min="0"
            max="100"
          />
        </div>
      </div>

      {/* Results Cards */}
      <div className="space-y-4">
        {PLANS.map((plan) => {
          const { visits, revenue, profit } = calculateMetrics(plan);
          const isProfitable = profit > 0;

          return (
            <div
              key={plan.name}
              className={`rounded-xl p-5 border-2 transition-all ${
                plan.name === 'Ekipa'
                  ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-[#007BFF]'
                  : 'bg-gray-50 border-gray-200 hover:border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{plan.name}</h4>
                  <p className="text-xs text-gray-600">
                    {plan.calls} rozmów | {formatPLN(plan.price)} zł/mies.
                  </p>
                </div>
                {plan.name === 'Ekipa' && (
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    POPULARNE
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/60 rounded-lg p-2">
                  <div className="text-xs text-gray-600 mb-1">Wizyty</div>
                  <div className="text-base font-bold text-gray-900">{visits}</div>
                </div>
                <div className="bg-white/60 rounded-lg p-2">
                  <div className="text-xs text-gray-600 mb-1">Przychód</div>
                  <div className="text-base font-bold text-[#007BFF]">
                    {formatPLN(revenue)} zł
                  </div>
                </div>
                <div className="bg-white/80 rounded-lg p-2 border-2 border-green-200">
                  <div className="text-xs text-gray-600 mb-1 flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Zysk
                  </div>
                  <div
                    className={`text-base font-black ${
                      isProfitable ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {isProfitable ? '+' : ''}{formatPLN(profit)} zł
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note about overage */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-xs text-gray-700">
          <span className="font-semibold">Uwaga:</span> Dodatkowe rozmowy kosztują{' '}
          <span className="font-bold text-[#007BFF]">{OVERAGE_PER_CALL.toFixed(2)} zł</span> za
          połączenie. Ceny są miesięczne.
        </p>
      </div>
    </div>
  );
}
