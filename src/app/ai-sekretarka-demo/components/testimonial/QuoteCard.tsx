'use client';

import React from 'react';
import { Star, MapPin, Quote } from 'lucide-react';

interface QuoteCardProps {
  testimonial: {
    id: number;
    name: string;
    business: string;
    industry: string;
    location: string;
    quote: string;
    metric?: string;
    rating: number;
  };
}

export default function QuoteCard({ testimonial }: QuoteCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow p-6">
      {/* Quote Icon */}
      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <Quote className="w-6 h-6 text-blue-600" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-gray-900 font-medium text-lg mb-4 leading-relaxed">
        "{testimonial.quote}"
      </p>

      {/* Metric */}
      {testimonial.metric && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-3 mb-4">
          <div className="text-sm font-bold text-blue-700">{testimonial.metric}</div>
        </div>
      )}

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
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
  );
}
