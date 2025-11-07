'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, CheckCircle2, Zap, Settings, Rocket } from 'lucide-react';

const steps = [
  {
    time: '0 minut',
    title: 'Zarejestruj się',
    description: 'Wypełnij prosty formularz. Bez karty kredytowej.',
    icon: CheckCircle2,
    color: 'blue'
  },
  {
    time: '2 minuty',
    title: 'Wybierz numer',
    description: 'Przekieruj swój numer lub otrzymaj nowy.',
    icon: Settings,
    color: 'purple'
  },
  {
    time: '3 minuty',
    title: 'Skonfiguruj AI',
    description: 'Naucz AI swojego cennika i dostępności.',
    icon: Zap,
    color: 'orange'
  },
  {
    time: '5 minut',
    title: 'Gotowe!',
    description: 'AI odbiera pierwsze połączenie. Zero instalacji.',
    icon: Rocket,
    color: 'green'
  }
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  return (
    <section ref={containerRef} className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2.5 rounded-full text-sm font-medium mb-5">
            <Clock className="w-4 h-4" />
            Szybki Start
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Od Rejestracji do Pierwszego Połączenia w 5 Minut
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bez instalacji, bez szkoleń, bez problemów
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-20 left-0 right-0 h-1 bg-gray-200 hidden md:block">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
              style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
            />
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600',
                purple: 'from-purple-500 to-purple-600',
                orange: 'from-orange-500 to-orange-600',
                green: 'from-green-500 to-green-600'
              };

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Step Number & Icon */}
                  <div className="flex flex-col items-center mb-4">
                    <div className={`
                      w-20 h-20 rounded-full bg-gradient-to-r ${colorClasses[step.color as keyof typeof colorClasses]}
                      flex items-center justify-center shadow-xl mb-3 relative z-10
                    `}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className={`text-sm font-bold text-${step.color}-600`}>
                      {step.time}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-white rounded-xl p-6 shadow-xl border-2 border-gray-200 text-center">
                    <h3 className="text-xl font-black text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Mobile Arrow */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center my-4 md:hidden">
                      <div className="text-gray-400">↓</div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl">
            Zacznij Teraz - To Zajmie 5 Minut
          </button>
        </motion.div>
      </div>
    </section>
  );
}
