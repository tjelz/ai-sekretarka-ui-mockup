'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WebsiteROICalculator() {
  const [monthlyLeads, setMonthlyLeads] = useState(50);
  const [conversionRate, setConversionRate] = useState(2);
  const [averageValue, setAverageValue] = useState(500);

  const currentConversions = monthlyLeads * (conversionRate / 100);
  const currentRevenue = currentConversions * averageValue;

  // Professional website typically improves conversion by 30-50%
  const improvedConversionRate = conversionRate * 1.4;
  const newConversions = monthlyLeads * (improvedConversionRate / 100);
  const newRevenue = newConversions * averageValue;

  const monthlyIncrease = newRevenue - currentRevenue;
  const yearlyIncrease = monthlyIncrease * 12;

  // Website cost (using Professional package)
  const websiteCost = 5000;
  const monthsToROI = Math.ceil(websiteCost / monthlyIncrease);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-full text-sm font-bold mb-6">
            <Calculator className="w-4 h-4" />
            Kalkulator ROI
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Oblicz Zwrot z Inwestycji
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Zobacz ile możesz zarobić dzięki profesjonalnej stronie internetowej
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Inputs */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-purple-600" />
              Twoje Dane
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Miesięczny ruch na stronie (odwiedziny)
                </label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  value={monthlyLeads}
                  onChange={(e) => setMonthlyLeads(parseInt(e.target.value))}
                  className="w-full h-3 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="mt-2 text-center">
                  <span className="text-3xl font-bold text-purple-600">{monthlyLeads}</span>
                  <span className="text-gray-600 ml-2">odwiedzin/miesiąc</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Obecny współczynnik konwersji (%)
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(parseFloat(e.target.value))}
                  className="w-full h-3 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="mt-2 text-center">
                  <span className="text-3xl font-bold text-purple-600">{conversionRate}%</span>
                  <span className="text-gray-600 ml-2">konwersja</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Średnia wartość zamówienia (PLN)
                </label>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={averageValue}
                  onChange={(e) => setAverageValue(parseInt(e.target.value))}
                  className="w-full h-3 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="mt-2 text-center">
                  <span className="text-3xl font-bold text-purple-600">{averageValue} zł</span>
                  <span className="text-gray-600 ml-2">średnia wartość</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Current vs New */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Obecna Sytuacja</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Konwersje miesięcznie:</span>
                  <span className="text-2xl font-bold text-gray-900">{currentConversions.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Przychód miesięczny:</span>
                  <span className="text-2xl font-bold text-gray-900">{currentRevenue.toFixed(0)} zł</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 shadow-2xl text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Z Profesjonalną Stroną</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-100">Nowy wsp. konwersji:</span>
                    <span className="text-2xl font-bold flex items-center gap-2">
                      {improvedConversionRate.toFixed(1)}%
                      <span className="text-sm bg-green-400 text-green-900 px-2 py-1 rounded-full">
                        +40%
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-100">Nowe konwersje:</span>
                    <span className="text-2xl font-bold">{newConversions.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-purple-400">
                    <span className="text-purple-100">Nowy przychód:</span>
                    <span className="text-3xl font-bold">{newRevenue.toFixed(0)} zł</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Dodatkowy przychód/mies:</span>
                    <span className="text-2xl font-bold text-green-300">
                      +{monthlyIncrease.toFixed(0)} zł
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Dodatkowy przychód/rok:</span>
                    <span className="text-2xl font-bold text-green-300">
                      +{yearlyIncrease.toFixed(0)} zł
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-purple-400">
                    <span className="font-semibold">ROI w:</span>
                    <span className="text-3xl font-bold text-yellow-300">
                      {monthsToROI} {monthsToROI === 1 ? 'miesiąc' : monthsToROI < 5 ? 'miesiące' : 'miesięcy'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://forms.fillout.com/t/xityvM2L42us"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl py-8 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all hover:scale-105 group"
              >
                <TrendingUp className="w-6 h-6 mr-2" />
                Zacznij Zarabiać Więcej
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm max-w-3xl mx-auto">
            *Wyliczenia bazują na średniej poprawie konwersji o 40% po wdrożeniu profesjonalnej strony internetowej.
            Faktyczne wyniki mogą się różnić w zależności od branży i działań marketingowych.
          </p>
        </div>
      </div>
    </section>
  );
}
