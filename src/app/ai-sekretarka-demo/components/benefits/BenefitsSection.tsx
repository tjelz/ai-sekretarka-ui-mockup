'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import benefitsData from '../../data/benefits.json';
import BenefitCardExpanding from './BenefitCardExpanding';

export default function BenefitsSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-5 py-2.5 rounded-full text-sm font-medium mb-5">
            <Zap className="w-4 h-4" />
            Korzyści
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            4 Powody, Dla Których Twoi Konkurenci Już Korzystają
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kliknij każdą kartę, aby policzyć swój ROI
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {benefitsData.map((benefit, index) => (
            <BenefitCardExpanding
              key={benefit.id}
              benefit={benefit}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Zobacz Wszystkie Korzyści w Akcji
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Umów się na bezpłatną 15-minutową prezentację i zobacz, jak AI Sekretarka może zmienić Twój biznes
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl">
              Umów Prezentację
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
