'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar, MessageSquare, Check } from 'lucide-react';
import FloatingStatsCard from './FloatingStatsCard';
import { Clock, TrendingUp, Shield } from 'lucide-react';

export default function HeroPhoneMockup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Animation sequence
  const steps = [
    { type: 'incoming', text: 'Dzwoni: Anna Kowalska' },
    { type: 'ai-response', text: 'Dzień dobry! Jak mogę pomóc?' },
    { type: 'user-message', text: 'Chcę umówić wizytę na piątek' },
    { type: 'ai-thinking', text: '...' },
    { type: 'calendar', text: 'Dostępny termin: piątek 15:00' },
    { type: 'confirmation', text: 'Wizyta zarezerwowana!' },
    { type: 'sms', text: 'SMS wysłany do klienta' },
  ];

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Slower animation on mobile for better performance
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, isMobile ? 3500 : 2500);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Floating Stats Cards */}
      <FloatingStatsCard
        icon={Clock}
        value="<3s"
        label="Czas odpowiedzi"
        delay={0.2}
        position={{ top: '10%', left: '0%' }}
      />
      <FloatingStatsCard
        icon={TrendingUp}
        value="99.9%"
        label="Dostępność"
        delay={0.4}
        position={{ top: '5%', right: '5%' }}
      />
      <FloatingStatsCard
        icon={Shield}
        value="24/7"
        label="Wsparcie"
        delay={0.6}
        position={{ bottom: '15%', left: '-5%' }}
      />

      {/* Phone Mockup */}
      <motion.div
        className="relative w-[280px] h-[560px] bg-gray-900 rounded-[40px] shadow-2xl border-8 border-gray-800 z-10"
        initial={{ opacity: 0, x: isMobile ? 0 : 100, rotateY: isMobile ? 0 : -20 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0.3 : 0.9 }}
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-30" />

        {/* Phone Screen */}
        <div className="absolute inset-2 bg-white rounded-[32px] overflow-hidden z-20">
          {/* Status Bar */}
          <div className="h-12 bg-gradient-to-r from-[#007BFF] to-[#0056b3] flex items-center justify-between px-4 text-white text-xs relative z-30">
            <span className="font-semibold">AI Sekretarka</span>
            <span>9:41</span>
          </div>

          {/* Chat Area */}
          <div className="p-4 space-y-3 bg-gray-50 h-[calc(100%-3rem)] overflow-hidden relative z-20">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="incoming"
                  className="flex items-center gap-3 bg-green-100 p-4 rounded-xl"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <motion.div
                    className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Phone className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-gray-900">Przychodzące</p>
                    <p className="text-sm text-gray-600">{steps[0].text}</p>
                  </div>
                </motion.div>
              )}

              {currentStep >= 1 && currentStep <= 4 && (
                <motion.div
                  key="chat"
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* AI Response */}
                  <motion.div
                    className="flex items-start gap-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    <div className="w-8 h-8 bg-[#007BFF] rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-blue-100 rounded-2xl rounded-tl-none px-4 py-2 max-w-[70%]">
                      <p className="text-sm text-gray-900">{steps[1].text}</p>
                    </div>
                  </motion.div>

                  {/* User Message */}
                  {currentStep >= 2 && (
                    <motion.div
                      className="flex justify-end"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                    >
                      <div className="bg-gray-200 rounded-2xl rounded-tr-none px-4 py-2 max-w-[70%]">
                        <p className="text-sm text-gray-900">{steps[2].text}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* AI Thinking */}
                  {currentStep === 3 && (
                    <motion.div
                      className="flex items-start gap-2"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                    >
                      <div className="w-8 h-8 bg-[#007BFF] rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-blue-100 rounded-2xl rounded-tl-none px-4 py-3">
                        <motion.div
                          className="flex gap-1"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <div className="w-2 h-2 bg-[#007BFF] rounded-full" />
                          <div className="w-2 h-2 bg-[#007BFF] rounded-full" />
                          <div className="w-2 h-2 bg-[#007BFF] rounded-full" />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* Calendar Event */}
                  {currentStep === 4 && (
                    <motion.div
                      className="flex items-start gap-2"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                    >
                      <div className="w-8 h-8 bg-[#007BFF] rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-blue-100 rounded-2xl rounded-tl-none px-4 py-2">
                        <p className="text-sm text-gray-900">{steps[4].text}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Confirmation */}
              {currentStep === 5 && (
                <motion.div
                  key="confirmation"
                  className="flex flex-col items-center justify-center h-full gap-4"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                  <p className="text-lg font-bold text-gray-900">{steps[5].text}</p>
                  <p className="text-sm text-gray-600 text-center px-4">
                    Anna Kowalska<br />Piątek, 15:00
                  </p>
                </motion.div>
              )}

              {/* SMS Notification */}
              {currentStep === 6 && (
                <motion.div
                  key="sms"
                  className="flex items-center gap-3 bg-purple-100 p-4 rounded-xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                >
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{steps[6].text}</p>
                    <p className="text-xs text-gray-600">Potwierdzenie wizyty</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-30" />
      </motion.div>
    </div>
  );
}
