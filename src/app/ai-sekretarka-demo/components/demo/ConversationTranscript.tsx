'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bot } from 'lucide-react';

interface TranscriptMessage {
  time: number;
  speaker: 'customer' | 'ai';
  text: string;
}

interface ConversationTranscriptProps {
  transcript: TranscriptMessage[];
  currentTime: number;
}

export default function ConversationTranscript({ transcript, currentTime }: ConversationTranscriptProps) {
  const activeMessages = transcript.filter(msg => msg.time <= currentTime);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900">Transkrypcja rozmowy</h3>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {activeMessages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex gap-3"
            >
              {/* Avatar */}
              <div className={`
                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                ${msg.speaker === 'ai'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                  : 'bg-gray-300'
                }
              `}>
                {msg.speaker === 'ai' ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-gray-700" />
                )}
              </div>

              {/* Message */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`
                    text-xs font-bold
                    ${msg.speaker === 'ai' ? 'text-blue-600' : 'text-gray-600'}
                  `}>
                    {msg.speaker === 'ai' ? 'AI Sekretarka' : 'Klient'}
                  </span>
                  <span className="text-xs text-gray-400">{msg.time.toFixed(1)}s</span>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-sm text-gray-900 leading-relaxed"
                >
                  {msg.text}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator for next message */}
        {activeMessages.length < transcript.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold text-blue-600 mb-1">AI Sekretarka</div>
              <div className="flex gap-1">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
