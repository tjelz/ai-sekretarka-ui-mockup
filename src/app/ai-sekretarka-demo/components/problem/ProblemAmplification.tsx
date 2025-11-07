'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PhoneOff, PhoneMissed, TrendingDown, Clock, Users, DollarSign } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';
import PainPointFloat from './PainPointFloat';
import TransformationArrow from './TransformationArrow';
import LossCalculatorEmbed from './LossCalculatorEmbed';
import { PhoneIncoming, Calendar, MessageSquare, TrendingUp, Smile, Zap } from 'lucide-react';

export default function ProblemAmplification() {
  // Before content (stressed, losing money)
  const beforeContent = (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-8 flex flex-col items-center justify-center">
      {/* Stressed owner illustration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        {/* Central stressed figure */}
        <div className="w-48 h-48 bg-red-200 rounded-full flex items-center justify-center relative">
          <Users className="w-24 h-24 text-red-700" />
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <PhoneOff className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Floating pain points */}
        <PainPointFloat text="22:00 połączenie" delay={0.3} position={{ top: '-40px', left: '-60px' }} />
        <PainPointFloat text="Urlop" delay={0.5} position={{ top: '-20px', right: '-80px' }} />
        <PainPointFloat text="Weekend" delay={0.7} position={{ bottom: '-40px', left: '-40px' }} />
        <PainPointFloat text="Zajęty" delay={0.9} position={{ bottom: '-20px', right: '-60px' }} />
      </motion.div>

      {/* Loss counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center"
      >
        <div className="bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-2 justify-center mb-2">
            <DollarSign className="w-6 h-6" />
            <span className="text-sm font-semibold">Stracone pieniądze</span>
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl font-black"
          >
            3,247 zł
          </motion.div>
          <div className="text-sm opacity-90">miesięcznie</div>
        </div>
      </motion.div>

      {/* Problem icons scattered */}
      <div className="absolute inset-0 pointer-events-none">
        <PhoneMissed className="absolute top-20 left-12 w-8 h-8 text-red-400 opacity-60" />
        <TrendingDown className="absolute top-32 right-20 w-8 h-8 text-red-400 opacity-60" />
        <Clock className="absolute bottom-32 left-20 w-8 h-8 text-red-400 opacity-60" />
      </div>
    </div>
  );

  // After content (relaxed, earning money)
  const afterContent = (
    <div className="relative w-full h-full bg-gradient-to-br from-green-50 via-blue-50 to-green-100 p-8 flex flex-col items-center justify-center">
      {/* Relaxed owner illustration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        {/* Central relaxed figure */}
        <div className="w-48 h-48 bg-green-200 rounded-full flex items-center justify-center relative">
          <Smile className="w-24 h-24 text-green-700" />
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
            <Zap className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Floating success indicators */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute -top-10 -left-16 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
        >
          ✓ 24/7 dostępność
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-6 -right-20 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
        >
          ✓ Automatyzacja
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="absolute -bottom-10 -left-12 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
        >
          ✓ Spokój
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="absolute -bottom-6 -right-16 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
        >
          ✓ Więcej klientów
        </motion.div>
      </motion.div>

      {/* Savings counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center"
      >
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-2 justify-center mb-2">
            <TrendingUp className="w-6 h-6" />
            <span className="text-sm font-semibold">Zaoszczędzone pieniądze</span>
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl font-black"
          >
            3,247 zł
          </motion.div>
          <div className="text-sm opacity-90">miesięcznie</div>
        </div>
      </motion.div>

      {/* Success icons scattered */}
      <div className="absolute inset-0 pointer-events-none">
        <PhoneIncoming className="absolute top-20 left-12 w-8 h-8 text-green-500 opacity-60" />
        <Calendar className="absolute top-32 right-20 w-8 h-8 text-blue-500 opacity-60" />
        <MessageSquare className="absolute bottom-32 left-20 w-8 h-8 text-purple-500 opacity-60" />
      </div>
    </div>
  );

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-full text-sm font-medium mb-5">
            <PhoneMissed className="w-4 h-4" />
            Problem
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Ile Kosztują Cię Nieodebrane Telefony?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Przeciągnij suwak, aby zobaczyć różnicę między chaosem a spokojem
          </p>
        </motion.div>

        {/* Before/After Slider */}
        <div className="mb-12">
          <BeforeAfterSlider
            beforeContent={beforeContent}
            afterContent={afterContent}
          />
        </div>

        {/* Embedded Calculator */}
        <div className="max-w-2xl mx-auto">
          <LossCalculatorEmbed />
        </div>
      </div>
    </section>
  );
}
