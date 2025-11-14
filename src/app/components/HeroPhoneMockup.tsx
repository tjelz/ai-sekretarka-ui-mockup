'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, X } from 'lucide-react';
import FloatingStatsCard from './FloatingStatsCard';
import { Clock, TrendingUp, Shield } from 'lucide-react';

type CallState = 'incoming' | 'active' | 'ended';

export default function HeroPhoneMockup() {
  const [callState, setCallState] = useState<CallState>('incoming');
  const [isMobile, setIsMobile] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const callerInfo = {
    name: 'Anna Kowalska',
    number: '+48 123 456 789',
    avatar: '👤'
  };

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio('/audio-call-2.mp3');
    audioRef.current.preload = 'auto';
    
    // Handle audio events
    const audio = audioRef.current;
    
    const handleEnded = () => {
      setCallState('ended');
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
    const handleError = () => {
      console.error('Error loading audio file');
      setCallState('ended');
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, []);

  // Track call duration
  useEffect(() => {
    if (callState === 'active') {
      durationIntervalRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    }

    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, [callState]);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Update current time every minute
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    // Update immediately
    updateTime();

    // Update every minute
    const timeInterval = setInterval(updateTime, 60000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatCurrentTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleAcceptCall = async () => {
    if (!audioRef.current) return;

    try {
      setCallState('active');
      setCallDuration(0);
      await audioRef.current.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      setCallState('ended');
    }
  };

  const handleDeclineCall = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCallState('ended');
    setCallDuration(0);
  };

  const handleEndCall = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCallState('ended');
    setCallDuration(0);
  };

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setCallState('incoming');
    setCallDuration(0);
  };

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
        <div className="absolute inset-2 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[32px] overflow-hidden z-20">
          {/* Status Bar */}
          <div className="h-12 bg-black/30 flex items-center justify-between px-4 text-white text-xs relative z-30 backdrop-blur-sm">
            <span className="font-semibold">AI Sekretarka</span>
            <span>{formatCurrentTime(currentTime)}</span>
          </div>

          {/* Call Screen */}
          <div className="h-[calc(100%-3rem)] flex flex-col items-center justify-between py-12 px-6 relative z-20">
            <AnimatePresence mode="wait">
              {callState === 'incoming' && (
                <motion.div
                  key="incoming"
                  className="flex flex-col items-center justify-center h-full w-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  {/* Caller Avatar */}
                  <motion.div
                    className="w-32 h-32 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center mb-6 shadow-2xl"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-6xl">{callerInfo.avatar}</span>
                  </motion.div>

                  {/* Caller Info */}
                  <motion.div
                    className="text-center mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-3xl font-bold text-white mb-2">{callerInfo.name}</h2>
                    <p className="text-gray-300 text-lg">{callerInfo.number}</p>
                    <motion.p
                      className="text-gray-400 mt-4 text-sm"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Przychodzące połączenie...
                    </motion.p>
                  </motion.div>

                  {/* Call Buttons */}
                  <motion.div
                    className="flex items-center gap-8 w-full justify-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {/* Decline Button */}
                    <motion.button
                      onClick={handleDeclineCall}
                      className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Decline call"
                    >
                      <X className="w-8 h-8 text-white" />
                    </motion.button>

                    {/* Accept Button */}
                    <motion.button
                      onClick={handleAcceptCall}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Accept call"
                    >
                      <Phone className="w-10 h-10 text-white" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {callState === 'active' && (
                <motion.div
                  key="active"
                  className="flex flex-col items-center justify-center h-full w-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  {/* Caller Avatar */}
                  <motion.div
                    className="w-32 h-32 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center mb-6 shadow-2xl"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="text-6xl">{callerInfo.avatar}</span>
                  </motion.div>

                  {/* Caller Info */}
                  <div className="text-center mb-4">
                    <h2 className="text-3xl font-bold text-white mb-2">{callerInfo.name}</h2>
                    <p className="text-gray-300 text-lg mb-4">{callerInfo.number}</p>
                    <motion.p
                      className="text-green-400 text-sm font-semibold"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Połączenie aktywne
                    </motion.p>
                    <p className="text-white text-2xl font-mono mt-4">
                      {formatCallDuration(callDuration)}
                    </p>
                  </div>

                  {/* Hang Up Button */}
                  <motion.button
                    onClick={handleEndCall}
                    className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-xl hover:bg-red-600 transition-colors mt-8"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="End call"
                  >
                    <PhoneOff className="w-10 h-10 text-white" />
                  </motion.button>
                </motion.div>
              )}

              {callState === 'ended' && (
                <motion.div
                  key="ended"
                  className="flex flex-col items-center justify-center h-full w-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  {/* Caller Avatar */}
                  <motion.div
                    className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center mb-6 shadow-2xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <span className="text-6xl">{callerInfo.avatar}</span>
                  </motion.div>

                  {/* Call Ended Info */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">{callerInfo.name}</h2>
                    <p className="text-gray-400 text-lg mb-4">Połączenie zakończone</p>
                    <p className="text-gray-500 text-sm">
                      Czas trwania: {formatCallDuration(callDuration)}
                    </p>
                  </div>

                  {/* Reset Button */}
                  <motion.button
                    onClick={handleReset}
                    className="px-6 py-3 bg-[#007BFF] rounded-full text-white font-semibold hover:bg-[#0056b3] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Reset call"
                  >
                    Odtwórz ponownie
                  </motion.button>
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
