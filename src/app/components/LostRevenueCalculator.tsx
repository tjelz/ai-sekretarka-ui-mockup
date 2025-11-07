'use client';

import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TrendingUp, Phone, Calendar, AlertCircle } from 'lucide-react';

export default function LostRevenueCalculator() {
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(20);
  const [avgTransactionValue, setAvgTransactionValue] = useState(150);
  const [noShowPercentage, setNoShowPercentage] = useState(15);

  // Calculate lost revenue
  // More accurate: 52 weeks / 12 months = 4.33 weeks per month on average
  const missedCallsPerMonth = missedCallsPerWeek * (52 / 12);
  const successfulTransactions = missedCallsPerMonth * (1 - noShowPercentage / 100);
  const monthlyLoss = successfulTransactions * avgTransactionValue;
  const annualLoss = monthlyLoss * 12;

  // Format numbers with spaces
  const formatNumber = (num: number) => num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50 py-4 md:py-8 px-3 sm:px-4 lg:px-6 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-4 md:mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-medium mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            Kalkulator Przychodów
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight px-2">
            Ile pieniędzy tracisz co miesiąc
            <br/>
            <span className="text-blue-600">przez nieodebrane telefony?</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2">
            Oblicz, ile Twojej firmie ucieka zysków przez nieodebrane połączenia i nieprzychodzących klientów
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-5 md:p-6 lg:p-8 mb-4">
          <div className="grid lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {/* Inputs */}
            <div className="lg:col-span-3 space-y-6 md:space-y-8">
              {/* Missed Calls */}
              <div className="bg-blue-50/30 rounded-xl p-4 space-y-3 border border-blue-100/50 hover:border-blue-200 transition-all">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-blue-600" />
                    </div>
                    <label className="text-xs md:text-sm font-semibold text-gray-900">
                      Nieodebrane telefony (tygodniowo)
                    </label>
                  </div>
                  <input
                    type="number"
                    value={missedCallsPerWeek}
                    onChange={(e) => setMissedCallsPerWeek(Math.max(0, Math.min(100, Number(e.target.value))))}
                    className="w-16 sm:w-20 h-9 text-center text-base font-bold border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all bg-white"
                  />
                </div>
                <Slider
                  value={[missedCallsPerWeek]}
                  onValueChange={(val: number[]) => setMissedCallsPerWeek(val[0])}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
              </div>

              {/* Average Transaction */}
              <div className="bg-green-50/30 rounded-xl p-4 space-y-3 border border-green-100/50 hover:border-green-200 transition-all">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <label className="text-xs md:text-sm font-semibold text-gray-900">
                      Średnia wartość transakcji
                    </label>
                  </div>
                  <div className="relative w-20 sm:w-24">
                    <input
                      type="number"
                      value={avgTransactionValue}
                      onChange={(e) => setAvgTransactionValue(Math.max(0, Math.min(500, Number(e.target.value))))}
                      className="w-full h-9 text-center text-base font-bold border-2 border-gray-200 focus:border-blue-500 rounded-lg pr-8 transition-all bg-white"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 pointer-events-none">
                      zł
                    </span>
                  </div>
                </div>
                <Slider
                  value={[avgTransactionValue]}
                  onValueChange={(val: number[]) => setAvgTransactionValue(val[0])}
                  max={500}
                  step={5}
                  className="cursor-pointer"
                />
              </div>

              {/* No-Show % */}
              <div className="bg-orange-50/30 rounded-xl p-4 space-y-3 border border-orange-100/50 hover:border-orange-200 transition-all">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-orange-600" />
                    </div>
                    <label className="text-xs md:text-sm font-semibold text-gray-900">
                      Procent niestawiennictwa
                    </label>
                  </div>
                  <div className="relative w-16 sm:w-20">
                    <input
                      type="number"
                      value={noShowPercentage}
                      onChange={(e) => setNoShowPercentage(Math.max(0, Math.min(50, Number(e.target.value))))}
                      className="w-full h-9 text-center text-base font-bold border-2 border-gray-200 focus:border-blue-500 rounded-lg pr-7 transition-all bg-white"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 pointer-events-none">%</span>
                  </div>
                </div>
                <Slider
                  value={[noShowPercentage]}
                  onValueChange={(val: number[]) => setNoShowPercentage(val[0])}
                  max={50}
                  step={1}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200/20 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Twoje straty finansowe
                    </h3>
                  </div>
                  <div className="mb-3 md:mb-4">
                    <p className="text-xs text-gray-600 mb-1">Miesięcznie tracisz:</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
                        {formatNumber(monthlyLoss)}
                      </span>
                      <span className="text-base md:text-xl font-bold text-gray-600">zł</span>
                    </div>
                  </div>
                  <div className="pt-3 md:pt-4 border-t-2 border-blue-200">
                    <p className="text-xs text-gray-600 mb-1">Rocznie tracisz:</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl md:text-3xl font-black text-blue-600">
                        {formatNumber(annualLoss)}
                      </span>
                      <span className="text-sm md:text-lg font-bold text-blue-600">zł</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="mt-3 md:mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 md:py-3.5 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base">
                Odzyskaj Utracone Przychody →
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="pt-4 md:pt-5 mt-4 md:mt-5 border-t-2 border-gray-100">
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="text-center p-2.5 md:p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-blue-600 mb-1">
                  {Math.round(successfulTransactions)}
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 font-medium leading-tight">
                  Utraconych <br className="sm:hidden" /> transakcji/m-c
                </p>
              </div>
              <div className="text-center p-2.5 md:p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-blue-600 mb-1">
                  {missedCallsPerWeek}
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 font-medium leading-tight">
                  Nieodebranych <br className="sm:hidden" /> połączeń/tydz.
                </p>
              </div>
              <div className="text-center p-2.5 md:p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-blue-600 mb-1">
                  {noShowPercentage}%
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 font-medium leading-tight">
                  Niestawiennictwo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center max-w-4xl mx-auto px-2">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 md:p-6 text-white shadow-xl">
            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-2">
              Odzyskaj te pieniądze z naszą wirtualną recepcjonistką 24/7
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-blue-100 mb-3 md:mb-4 leading-relaxed">
              Zautomatyzuj swój biznes i zwiększ przychody już dziś.

            </p>
            <Button className="bg-white text-blue-600 font-bold py-2.5 md:py-3 px-5 md:px-6 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-xs sm:text-sm md:text-base">
              Umów się na darmową prezentację            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}