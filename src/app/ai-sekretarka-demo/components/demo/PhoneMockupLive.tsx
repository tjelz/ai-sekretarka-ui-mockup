'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Wifi, Battery } from 'lucide-react';

interface PhoneMockupLiveProps {
  scenario: {
    title: string;
    transcript: Array<{
      time: number;
      speaker: 'customer' | 'ai';
      text: string;
    }>;
  };
  currentTime: number;
  isPlaying: boolean;
}

export default function PhoneMockupLive({ scenario, currentTime, isPlaying }: PhoneMockupLiveProps) {
  // Get currently active message based on time
  const activeMessages = scenario.transcript.filter(msg => msg.time <= currentTime);
  const latestMessage = activeMessages[activeMessages.length - 1];

  return (
    <div className="relative">
      {/* Phone Frame */}
      <div className="relative mx-auto w-full max-w-sm">
        {/* Phone Border */}
        <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-4 shadow-2xl border-8 border-gray-900">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10" />

          {/* Status Bar */}
          <div className="relative z-20 flex items-center justify-between px-6 py-2 text-white text-xs">
            <span className="font-semibold">9:41</span>
            <div className="flex items-center gap-1">
              <Wifi className="w-4 h-4" />
              <Battery className="w-5 h-4" />
            </div>
          </div>

          {/* Screen */}
          <div className="relative bg-gradient-to-b from-blue-50 to-white rounded-[2.5rem] overflow-hidden h-[600px]">
            {/* Call Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 text-center">
              <motion.div
                animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
                className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center"
              >
                <Phone className="w-10 h-10" />
              </motion.div>
              <div className="text-lg font-bold">AI Sekretarka</div>
              <div className="text-sm opacity-90">Beauty Salon</div>
              <div className="text-xs opacity-75 mt-2">
                {isPlaying ? 'Połączenie aktywne...' : 'Gotowa do rozmowy'}
              </div>
            </div>

            {/* Conversation Bubbles */}
            <div className="p-4 space-y-3 overflow-y-auto h-[400px]">
              {activeMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.speaker === 'ai' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`
                      max-w-[80%] px-4 py-3 rounded-2xl
                      ${msg.speaker === 'ai'
                        ? 'bg-gray-200 text-gray-900 rounded-tl-none'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-tr-none'
                      }
                    `}
                  >
                    <div className="text-sm">{msg.text}</div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isPlaying && latestMessage?.speaker === 'customer' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-200 px-4 py-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Call Actions */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
              <div className="flex justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg"
                >
                  <Phone className="w-8 h-8" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Glow Effect */}
        {isPlaying && (
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl -z-10"
          />
        )}
      </div>
    </div>
  );
}
