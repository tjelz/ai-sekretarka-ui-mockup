'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Star, MapPin, ArrowRight } from 'lucide-react';

interface MetricCardProps {
  testimonial: {
    id: number;
    name: string;
    business: string;
    industry: string;
    location: string;
    quote: string;
    metric?: string;
    rating: number;
    before?: {
      label: string;
      value: string;
    };
    after?: {
      label: string;
      value: string;
    };
  };
}

export default function MetricCard({ testimonial }: MetricCardProps) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl overflow-hidden border-2 border-green-200 hover:shadow-2xl transition-shadow">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-6 h-6" />
          <span className="text-sm font-bold uppercase tracking-wide">Wyniki</span>
        </div>
        <h3 className="text-2xl font-black">{testimonial.business}</h3>
        <div className="text-sm opacity-90">{testimonial.industry}</div>
      </div>

      {/* Before/After Comparison */}
      {testimonial.before && testimonial.after && (
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 items-center mb-6">
            {/* Before */}
            <div className="text-center">
              <div className="text-xs text-gray-600 mb-2 uppercase font-semibold">Przed</div>
              <div className="bg-red-100 rounded-xl p-4 border-2 border-red-200">
                <div className="text-2xl font-black text-red-600 mb-1">
                  {testimonial.before.value}
                </div>
                <div className="text-xs text-red-700">{testimonial.before.label}</div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center"
              >
                <ArrowRight className="w-6 h-6 text-white" />
              </motion.div>
            </div>

            {/* After */}
            <div className="text-center">
              <div className="text-xs text-gray-600 mb-2 uppercase font-semibold">Po</div>
              <div className="bg-green-100 rounded-xl p-4 border-2 border-green-200">
                <div className="text-2xl font-black text-green-600 mb-1">
                  {testimonial.after.value}
                </div>
                <div className="text-xs text-green-700">{testimonial.after.label}</div>
              </div>
            </div>
          </div>

          {/* Metric Highlight */}
          {testimonial.metric && (
            <div className="bg-white rounded-xl p-4 border-2 border-green-300 mb-4">
              <div className="text-center font-bold text-green-700 text-sm">
                {testimonial.metric}
              </div>
            </div>
          )}

          {/* Quote */}
          <p className="text-gray-900 font-medium mb-4 leading-relaxed italic">
            "{testimonial.quote}"
          </p>

          {/* Rating */}
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {testimonial.name[0]}
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-900 text-sm">{testimonial.name}</div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />
                {testimonial.location}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
