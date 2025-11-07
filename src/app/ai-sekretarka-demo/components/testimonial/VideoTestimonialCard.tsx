'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Star, MapPin } from 'lucide-react';

interface VideoTestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    business: string;
    industry: string;
    location: string;
    quote: string;
    metric?: string;
    rating: number;
    videoUrl?: string;
    thumbnail?: string;
  };
}

export default function VideoTestimonialCard({ testimonial }: VideoTestimonialCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow">
      {/* Video Player */}
      <div
        className="relative aspect-video bg-gray-900 cursor-pointer group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onClick={togglePlay}
      >
        {/* Placeholder thumbnail */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-6xl font-black mb-2">{testimonial.name[0]}</div>
            <div className="text-sm opacity-75">Video Testimonial</div>
          </div>
        </div>

        {/* Play Button Overlay */}
        {!isPlaying && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/30"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl"
            >
              <Play className="w-10 h-10 text-blue-500 ml-1" />
            </motion.div>
          </motion.div>
        )}

        {/* Controls */}
        {showControls && isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-4 right-4 flex gap-2"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stars */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>

        {/* Quote */}
        <p className="text-gray-900 font-medium mb-4 leading-relaxed">
          "{testimonial.quote}"
        </p>

        {/* Metric */}
        {testimonial.metric && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
            <div className="text-sm font-bold text-green-700">{testimonial.metric}</div>
          </div>
        )}

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {testimonial.name[0]}
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-900">{testimonial.name}</div>
            <div className="text-sm text-gray-600">{testimonial.business}</div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <MapPin className="w-3 h-3" />
              {testimonial.location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
