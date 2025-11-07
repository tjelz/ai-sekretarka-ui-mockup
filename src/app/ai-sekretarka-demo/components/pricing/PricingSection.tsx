'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Check, Zap, TrendingUp } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const plans = [
  {
    name: 'Starter',
    price: 299,
    features: [
      '100 minut połączeń/miesiąc',
      '1 numer telefonu',
      'Podstawowa integracja',
      'Email support'
    ],
    color: 'blue',
    popular: false
  },
  {
    name: 'Professional',
    price: 599,
    features: [
      '500 minut połączeń/miesiąc',
      '3 numery telefonu',
      'Zaawansowane integracje',
      'SMS potwierdzenia',
      'Priority support',
      'Własny głos AI'
    ],
    color: 'purple',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 1299,
    features: [
      'Nielimitowane połączenia',
      'Nielimitowane numery',
      'Wszystkie integracje',
      'Dedykowany account manager',
      'SLA 99.9%',
      'Custom AI training'
    ],
    color: 'green',
    popular: false
  }
];

export default function PricingSection() {
  const [expectedCalls, setExpectedCalls] = useState(30);

  // Smart recommendation based on calls
  const getRecommendation = () => {
    if (expectedCalls <= 20) return 0; // Starter
    if (expectedCalls <= 100) return 1; // Professional
    return 2; // Enterprise
  };

  const recommendedIndex = getRecommendation();
  const savings = expectedCalls * 100 - plans[recommendedIndex].price;

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-5 py-2.5 rounded-full text-sm font-medium mb-5">
            <DollarSign className="w-4 h-4" />
            Przejrzyste Ceny
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Wybierz Plan Dopasowany do Twojego Biznesu
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Płać tylko za to, czego potrzebujesz. Zmień plan w każdej chwili.
          </p>
        </motion.div>

        {/* Smart Calculator */}
        <div className="max-w-2xl mx-auto mb-12 bg-white rounded-2xl border-2 border-blue-200 p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Znajdź Swój Idealny Plan</h3>
          </div>

          <p className="text-sm text-gray-700 mb-4 font-medium">
            Ile połączeń spodziewasz się tygodniowo?
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Połączenia tygodniowo:</span>
              <span className="text-2xl font-black text-blue-600">{expectedCalls}</span>
            </div>
            <Slider
              value={[expectedCalls]}
              onValueChange={(val: number[]) => setExpectedCalls(val[0])}
              max={150}
              step={5}
              className="cursor-pointer"
            />
          </div>

          {/* Recommendation */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-300">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-xs text-gray-600 font-semibold uppercase">Rekomendacja</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-black text-blue-700">{plans[recommendedIndex].name}</span>
              <span className="text-lg font-bold text-blue-600">{plans[recommendedIndex].price} zł/mies</span>
            </div>
            <div className="text-sm text-gray-700">
              Oszczędzasz <span className="font-bold text-green-600">{savings.toFixed(0)} zł/mies</span> vs zatrudnienie recepcjonistki
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const isRecommended = index === recommendedIndex;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                    Najpopularniejszy
                  </div>
                )}

                {/* Recommended Badge */}
                {isRecommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                    ✓ Polecany dla Ciebie
                  </div>
                )}

                <div className={`
                  bg-white rounded-2xl p-8 shadow-xl border-2
                  ${isRecommended ? 'border-green-300 scale-105' : 'border-gray-200'}
                  hover:shadow-2xl transition-all
                `}>
                  {/* Plan Name */}
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{plan.name}</h3>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">zł/mies</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button className={`
                    w-full px-6 py-3 rounded-xl font-bold transition-all
                    ${isRecommended
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:scale-105 shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }
                  `}>
                    {isRecommended ? 'Wybierz Ten Plan' : 'Wybierz Plan'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200"
        >
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            30-Dniowa Gwarancja Zwrotu Pieniędzy
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jeśli nie będziesz zadowolony z AI Sekretarki w ciągu pierwszych 30 dni, zwrócimy Ci 100% pieniędzy. Bez pytań.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
