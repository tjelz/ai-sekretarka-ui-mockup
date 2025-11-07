'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, CheckCircle2, Clock, Shield, TrendingUp } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-white rounded-full blur-3xl"
            animate={{
              x: [
                `${((i * 37 + 13) % 100)}%`,
                `${((i * 37 + 13 + 30) % 100)}%`,
                `${((i * 37 + 13) % 100)}%`
              ],
              y: [
                `${((i * 23 + 7) % 100)}%`,
                `${((i * 23 + 7 + 20) % 100)}%`,
                `${((i * 23 + 7) % 100)}%`
              ]
            }}
            transition={{
              duration: 10 + (i % 10),
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              left: `${((i * 37 + 13) % 100)}%`,
              top: `${((i * 23 + 7) % 100)}%`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          {/* Urgency Badge */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-2xl"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            Promocja kończy się za 48 godzin!
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Przestań Tracić Klientów.
            <br />
            <span className="text-yellow-300">Zacznij Zarabiać Dziś.</span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Dołącz do 50+ firm, które już oszczędzają czas i pieniądze dzięki AI Sekretarce
          </p>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { icon: Zap, text: 'Setup w 5 minut' },
              { icon: Clock, text: '24/7 dostępność' },
              { icon: Shield, text: '30-dniowa gwarancja' },
              { icon: TrendingUp, text: 'ROI w 1 miesiąc' }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <Icon className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                  <div className="text-white font-semibold text-sm">{benefit.text}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://forms.fillout.com/t/xityvM2L42us"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-full text-xl font-black shadow-2xl hover:shadow-3xl transition-all group"
            >
              <Zap className="w-6 h-6 group-hover:animate-pulse" />
              Rozpocznij 14-Dniowy Test
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://calendly.com/info-yieldo/ai-recepcjonistka"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/20 backdrop-blur-sm text-white border-2 border-white rounded-full text-xl font-bold hover:bg-white/30 transition-all"
            >
              Zobacz 2-Min Demo
            </motion.a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-blue-100 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Bez karty kredytowej
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Anuluj w każdej chwili
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              RODO Compliance
            </div>
          </div>

          {/* Live Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
          >
            <div className="flex items-center gap-3 text-white">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold">
                Anna z Krakowa właśnie założyła konto • 3 minuty temu
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
