'use client';

import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TrendingUp, Phone, AlertCircle } from 'lucide-react';

interface LostRevenueCalculatorProps {
  showCta?: boolean;
  compact?: boolean;
  onCtaClick?: () => void;
  ctaText?: string;
}

export default function LostRevenueCalculator({ showCta = true, compact = false, onCtaClick, ctaText = 'Odzyskaj Utracone Przychody →' }: LostRevenueCalculatorProps) {
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(20);
  const [avgTransactionValue, setAvgTransactionValue] = useState(150);

  // Calculate lost revenue
  // More accurate: 52 weeks / 12 months = 4.33 weeks per month on average
  const missedCallsPerMonth = missedCallsPerWeek * (52 / 12);
  const successfulTransactions = missedCallsPerMonth;
  const monthlyLoss = successfulTransactions * avgTransactionValue;
  const annualLoss = monthlyLoss * 12;

  // Format numbers with spaces
  const formatNumber = (num: number) => num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return (
    <section className={`w-full bg-gradient-to-b from-white to-gray-50 px-3 sm:px-4 lg:px-6 ${compact ? 'py-10' : 'min-h-screen py-4 md:py-8 flex items-center'}`}>
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className={`text-center ${compact ? 'mb-3' : 'mb-4 md:mb-6'}`}>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-medium mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            Kalkulator Przychodów
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight px-2">
            Ile pieniędzy tracisz co miesiąc
            <br />
            <span className="text-blue-600">przez nieodebrane telefony?</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2">
            Oblicz, ile Twojej firmie ucieka zysków przez nieodebrane połączenia i nieprzychodzących klientów
          </p>
        </div>

        {/* Calculator Card */}
        <div className={`bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 ${compact ? 'p-4 sm:p-5 md:p-6 mb-3' : 'p-4 sm:p-5 md:p-6 mb-4'}`}>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Inputs */}
            <div className="flex-[2] space-y-4">
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
                <p className="text-xs md:text-sm text-gray-600 mt-2">
                  Średnio ile połączeń tygodniowo nie odbierasz?
                </p>
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
                <p className="text-xs md:text-sm text-gray-600 mt-2">
                  Ile wynosi średnia wartość usługi/produktu?
                </p>
              </div>

            </div>

            {/* Results */}
            <div className="flex-none w-full md:w-auto flex flex-col justify-center items-center md:items-start">
              <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-100 relative overflow-hidden w-full max-w-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200/20 rounded-full blur-3xl" />
                <div className="relative text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Twoje straty finansowe
                    </h3>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1">Miesięcznie tracisz:</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-black text-gray-900">
                        {formatNumber(monthlyLoss)}
                      </span>
                      <span className="text-base font-bold text-gray-600">zł</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t-2 border-blue-200">
                    <p className="text-xs text-gray-600 mb-1">Rocznie tracisz:</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-2xl font-black text-blue-600">
                        {formatNumber(annualLoss)}
                      </span>
                      <span className="text-sm font-bold text-blue-600">zł</span>
                    </div>
                  </div>
                </div>
              </div>
              {showCta && (
                onCtaClick ? (
                  <Button
                    onClick={onCtaClick}
                    className="mt-3 md:mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 md:py-3.5 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base"
                  >
                    {ctaText}
                  </Button>
                ) : (
                  <a
                    href="https://forms.fillout.com/t/xityvM2L42us"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="mt-3 md:mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 md:py-3.5 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base">
                      {ctaText}
                    </Button>
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        {showCta && (
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
        )}
      </div>
    </section>
  );
}