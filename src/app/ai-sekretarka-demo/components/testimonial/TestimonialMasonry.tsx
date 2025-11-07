'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Star } from 'lucide-react';
import Masonry from 'react-masonry-css';
import testimonialsData from '../../data/testimonials.json';
import VideoTestimonialCard from './VideoTestimonialCard';
import MetricCard from './MetricCard';
import QuoteCard from './QuoteCard';
import IndustryFilter from './IndustryFilter';

const breakpointColumns = {
  default: 3,
  1100: 2,
  700: 1
};

export default function TestimonialMasonry() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Filter testimonials by industry
  const filteredTestimonials = activeFilter === 'all'
    ? testimonialsData
    : testimonialsData.filter(t => t.industry === activeFilter);

  // Get unique industries
  const industries = ['all', ...Array.from(new Set(testimonialsData.map(t => t.industry)))];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-5 py-2.5 rounded-full text-sm font-medium mb-5">
            <Users className="w-4 h-4" />
            Opinie klientów
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Już Ponad 50 Firm Oszczędza Czas i Pieniądze
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Zobacz, co mówią nasi klienci z różnych branż
          </p>

          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div>
              <div className="text-3xl font-black text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-600">Średnia ocena</div>
            </div>
            <div className="h-12 w-px bg-gray-300" />
            <div>
              <div className="text-3xl font-black text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Zadowolonych firm</div>
            </div>
          </div>

          {/* Industry Filter */}
          <IndustryFilter
            industries={industries}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.div>

        {/* Masonry Grid */}
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-6 w-auto"
          columnClassName="pl-6 bg-clip-padding"
        >
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="mb-6"
            >
              {testimonial.type === 'video' && (
                <VideoTestimonialCard testimonial={testimonial} />
              )}
              {testimonial.type === 'metric' && (
                <MetricCard testimonial={testimonial} />
              )}
              {(testimonial.type === 'quote' || testimonial.type === 'text') && (
                <QuoteCard testimonial={testimonial} />
              )}
            </motion.div>
          ))}
        </Masonry>

        {/* CTA Below Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Dołącz do Zadowolonych Firm
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Zobacz sam, jak AI Sekretarka może zmienić sposób, w jaki zarządzasz komunikacją z klientami
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl">
              Rozpocznij 14-Dniowy Test
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
