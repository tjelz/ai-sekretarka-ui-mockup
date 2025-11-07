'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

export default function LossCalculatorEmbed() {
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(20);
  const [avgTransactionValue, setAvgTransactionValue] = useState(150);
  const [noShowPercentage, setNoShowPercentage] = useState(15);

  const missedCallsPerMonth = missedCallsPerWeek * (52 / 12);
  const successfulTransactions = missedCallsPerMonth * (1 - noShowPercentage / 100);
  const monthlyLoss = successfulTransactions * avgTransactionValue;
  const annualLoss = monthlyLoss * 12;

  const formatNumber = (num: number) => num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-red-100"
    >
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="w-6 h-6 text-red-600" />
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
          Ile Tracisz Przez Nieodebrane Telefony?
        </h3>
      </div>

      <div className="space-y-6">
        {/* Missed Calls */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <Phone className="w-4 h-4 text-red-600" />
              </div>
              <label className="text-sm font-semibold text-gray-900">
                Nieodebrane telefony (tygodniowo)
              </label>
            </div>
            <span className="text-lg font-bold text-red-600">{missedCallsPerWeek}</span>
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
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-orange-600" />
              </div>
              <label className="text-sm font-semibold text-gray-900">
                Średnia wartość transakcji
              </label>
            </div>
            <span className="text-lg font-bold text-orange-600">{avgTransactionValue} zł</span>
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
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-yellow-600" />
              </div>
              <label className="text-sm font-semibold text-gray-900">
                Procent niestawiennictwa
              </label>
            </div>
            <span className="text-lg font-bold text-yellow-600">{noShowPercentage}%</span>
          </div>
          <Slider
            value={[noShowPercentage]}
            onValueChange={(val: number[]) => setNoShowPercentage(val[0])}
            max={50}
            step={1}
            className="cursor-pointer"
          />
        </div>

        {/* Results */}
        <motion.div
          key={`${monthlyLoss}-${annualLoss}`}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-600 mb-1 uppercase tracking-wide font-semibold">
                💸 Miesięczne straty
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-red-600">
                  {formatNumber(monthlyLoss)}
                </span>
                <span className="text-xl font-bold text-red-500">zł</span>
              </div>
            </div>
            <div className="pt-4 border-t-2 border-red-200">
              <p className="text-xs text-gray-600 mb-1 uppercase tracking-wide font-semibold">
                😱 Roczne straty
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-red-700">
                  {formatNumber(annualLoss)}
                </span>
                <span className="text-lg font-bold text-red-600">zł</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
