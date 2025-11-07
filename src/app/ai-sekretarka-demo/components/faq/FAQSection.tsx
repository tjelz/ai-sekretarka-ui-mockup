'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Shield, Zap, Phone } from 'lucide-react';
import faqData from '../../data/faq.json';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-5 py-2.5 rounded-full text-sm font-medium mb-5">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Często Zadawane Pytania
          </h2>
          <p className="text-xl text-gray-600">
            Wszystko, co musisz wiedzieć o AI Sekretarce
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;

            // Get icon based on category
            const getIcon = () => {
              if (faq.category === 'technical') return Phone;
              if (faq.category === 'pricing') return Zap;
              return Shield;
            };

            const Icon = getIcon();

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  bg-white rounded-2xl shadow-xl border-2 overflow-hidden
                  ${isOpen ? 'border-blue-300' : 'border-gray-200'}
                `}
              >
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      ${isOpen ? 'bg-blue-500' : 'bg-gray-100'}
                    `}>
                      <Icon className={`w-6 h-6 ${isOpen ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <span className="text-lg font-bold text-gray-900">{faq.question}</span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-gray-600" />
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed mb-4">{faq.answer}</p>

                        {/* Media (audio samples, badges, etc.) */}
                        {faq.media && (
                          <div className="bg-gray-50 rounded-xl p-4">
                            {faq.media.type === 'audio' && (
                              <div className="space-y-2">
                                <div className="text-sm font-semibold text-gray-700 mb-2">
                                  Posłuchaj przykładów:
                                </div>
                                {faq.media.samples?.map((sample: any, i: number) => (
                                  <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                      <Phone className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">{sample.region}</span>
                                    <button className="ml-auto text-blue-600 text-sm font-semibold hover:underline">
                                      ▶ Odtwórz
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}

                            {faq.media.type === 'badges' && (
                              <div className="grid grid-cols-2 gap-3">
                                {faq.media.badges?.map((badge: string, i: number) => (
                                  <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-green-600" />
                                    <span className="text-sm font-bold text-green-700">{badge}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {faq.media.type === 'pricing' && (
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="text-sm font-semibold text-blue-900 mb-2">Przejrzyste Ceny:</div>
                                <div className="text-2xl font-black text-blue-700">
                                  {faq.media.content}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Embedded CTA */}
                        {faq.cta && (
                          <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-gray-900">{faq.cta.text}</span>
                              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors">
                                {faq.cta.buttonText}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-100"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Nadal Masz Pytania?
          </h3>
          <p className="text-gray-600 mb-6">
            Nasz zespół jest tutaj, aby pomóc. Umów się na bezpłatną konsultację.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl">
            Porozmawiaj z Ekspertem
          </button>
        </motion.div>
      </div>
    </section>
  );
}
