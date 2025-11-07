'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ROIMicroCalculator from './ROIMicroCalculator';
import ImpactGraph from './ImpactGraph';
import CaseStudyMini from './CaseStudyMini';

interface Benefit {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  bgGradient: string;
  description: string;
  calculator: {
    type: string;
    question: string;
    formula: string;
    result: string;
  };
  caseStudy: {
    business: string;
    stat: string;
  };
  graph: {
    before: number;
    after: number;
    label: string;
  };
}

interface BenefitCardExpandingProps {
  benefit: Benefit;
  index: number;
}

export default function BenefitCardExpanding({ benefit, index }: BenefitCardExpandingProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Card */}
      <div className={`
        bg-white rounded-2xl shadow-xl border-2 overflow-hidden
        ${isExpanded ? 'border-blue-300' : 'border-gray-200'}
        hover:shadow-2xl transition-all cursor-pointer
      `}>
        {/* Header - Always Visible */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-6 ${benefit.bgGradient} bg-gradient-to-br`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              {/* Icon */}
              <div className="text-5xl">{benefit.icon}</div>

              {/* Title */}
              <div className="flex-1">
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-700 font-medium">
                  {benefit.subtitle}
                </p>
              </div>
            </div>

            {/* Expand Button */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 ml-4"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <ChevronDown className="w-6 h-6 text-gray-700" />
              </div>
            </motion.div>
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-800 leading-relaxed">
            {benefit.description}
          </p>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 space-y-6 bg-gray-50">
                {/* ROI Calculator */}
                <ROIMicroCalculator calculator={benefit.calculator} color={benefit.color} />

                {/* Impact Graph */}
                <ImpactGraph graph={benefit.graph} color={benefit.color} />

                {/* Case Study */}
                <CaseStudyMini caseStudy={benefit.caseStudy} />

                {/* CTA */}
                <div className="flex gap-3">
                  <button className={`
                    flex-1 px-6 py-3 bg-gradient-to-r ${benefit.bgGradient}
                    text-gray-900 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg
                  `}>
                    Wypróbuj Teraz
                  </button>
                  <button className="px-6 py-3 bg-white border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                    Dowiedz się więcej
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Badge */}
      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="absolute -top-3 -right-3 bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg"
        >
          Kliknij, aby policzyć ROI
        </motion.div>
      )}
    </motion.div>
  );
}
