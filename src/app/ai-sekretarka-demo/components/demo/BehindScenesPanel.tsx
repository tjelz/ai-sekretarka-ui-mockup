'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle2, Loader2, Zap } from 'lucide-react';
import InteractiveHotspot from './InteractiveHotspot';

interface AIThinkingStep {
  time: number;
  process: string;
  detail: string;
}

interface BehindScenesPanelProps {
  aiThinking: AIThinkingStep[];
  currentTime: number;
}

export default function BehindScenesPanel({ aiThinking, currentTime }: BehindScenesPanelProps) {
  const activeSteps = aiThinking.filter(step => step.time <= currentTime);
  const currentStep = activeSteps[activeSteps.length - 1];
  const nextStep = aiThinking.find(step => step.time > currentTime);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 shadow-xl border-2 border-purple-100 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Kulisy AI</h3>
          <p className="text-sm text-gray-600">Co dzieje się w tle</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {aiThinking.map((step, index) => {
            const isActive = step.time <= currentTime;
            const isCurrent = currentStep?.time === step.time;
            const isPending = step.time > currentTime;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  x: 0,
                  scale: isCurrent ? 1.02 : 1
                }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Line */}
                {index < aiThinking.length - 1 && (
                  <div
                    className={`
                      absolute left-5 top-12 w-0.5 h-full
                      ${isActive ? 'bg-gradient-to-b from-purple-500 to-blue-500' : 'bg-gray-300'}
                    `}
                  />
                )}

                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="relative z-10">
                    <motion.div
                      animate={{
                        scale: isCurrent ? [1, 1.2, 1] : 1,
                        rotate: isCurrent ? [0, 360] : 0
                      }}
                      transition={{ duration: 2, repeat: isCurrent ? Infinity : 0 }}
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${isActive
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                        }
                      `}
                    >
                      {isPending ? (
                        <Loader2 className="w-5 h-5" />
                      ) : isCurrent ? (
                        <Zap className="w-5 h-5" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5" />
                      )}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-500">{step.time.toFixed(1)}s</span>
                      <InteractiveHotspot
                        title={step.process}
                        description={step.detail}
                      />
                    </div>
                    <h4 className={`
                      text-sm font-bold mb-1
                      ${isActive ? 'text-gray-900' : 'text-gray-500'}
                    `}>
                      {step.process}
                    </h4>
                    <p className={`
                      text-xs
                      ${isActive ? 'text-gray-600' : 'text-gray-400'}
                    `}>
                      {step.detail}
                    </p>

                    {/* Progress Bar for Current Step */}
                    {isCurrent && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1 }}
                        className="mt-2 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Next Step Preview */}
      {nextStep && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-white rounded-xl border-2 border-dashed border-purple-300"
        >
          <div className="flex items-center gap-2 text-sm text-purple-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="font-semibold">Następny krok:</span>
            <span>{nextStep.process}</span>
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-2xl font-black text-purple-600">{activeSteps.length}</div>
          <div className="text-xs text-gray-600">Procesów wykonanych</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-2xl font-black text-blue-600">{currentTime.toFixed(1)}s</div>
          <div className="text-xs text-gray-600">Czas odpowiedzi</div>
        </div>
      </div>
    </div>
  );
}
