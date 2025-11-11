'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import {
  Phone, Calendar, MessageSquare, Shield, Clock, Zap,
  TrendingUp, CheckCircle2, Users, ArrowRight, Sparkles
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Existing components from main page
import AnimatedBackground from "../components/AnimatedBackground";
import HeroPhoneMockup from "../components/HeroPhoneMockup";
import TypewriterText from "../components/TypewriterText";

// New hero components
import TrustBadgeBar from "./components/hero/TrustBadgeBar";
import CustomerLogoCarousel from "./components/hero/CustomerLogoCarousel";
import InlineVideoPlayer from "./components/hero/InlineVideoPlayer";

// Phase 3: Problem components
import ProblemAmplification from "./components/problem/ProblemAmplification";

// Phase 4: Demo components
import InteractiveDemoTabs from "./components/demo/InteractiveDemoTabs";

// Phase 5: Testimonial components
import TestimonialMasonry from "./components/testimonial/TestimonialMasonry";

// Phase 6: Benefits components
import BenefitsSection from "./components/benefits/BenefitsSection";

// Phase 7: Timeline components
import TimelineSection from "./components/timeline/TimelineSection";

// Phase 8: Pricing components
import PricingSection from "./components/pricing/PricingSection";

// Phase 9: FAQ components
import FAQSection from "./components/faq/FAQSection";

// Phase 10: Final CTA
import FinalCTASection from "./components/cta/FinalCTASection";

export default function AISekretarkaDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Yieldo"
                width={120}
                height={40}
                className="h-10 w-auto cursor-pointer"
                priority
              />
            </Link>
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/ai-sekretarka" className="text-sm font-semibold text-gray-700 hover:text-[#007BFF] transition-colors">
                ← Wróć do głównej
              </Link>
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
                DEMO
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* SECTION 1: ENHANCED HERO */}
      <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
        <AnimatedBackground />

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Urgency Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-3 rounded-full text-sm font-bold shadow-md border border-orange-200">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              🔥 Promocja: Pierwszy miesiąc -50% dla nowych klientów
            </div>
          </div>

          {/* Split Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#007BFF] px-5 py-2.5 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                Ponad 50 firm już oszczędza czas
              </div>

              {/* Headline with Typewriter */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1]">
                Nigdy Nie Trać Klienta przez{' '}
                <TypewriterText
                  phrases={[
                    'Nieodebrany Telefon',
                    'Brak Czasu',
                    'Brak Personelu',
                    'Wieczorne Połączenia'
                  ]}
                />
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                AI Sekretarka odbiera 24/7, umawia wizyty i wysyła SMS-y.{' '}
                <span className="text-[#007BFF] font-semibold">Konfiguracja w 5 minut.</span>
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://forms.fillout.com/t/xityvM2L42us"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl px-14 py-8 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all hover:scale-105 group"
                  >
                    <Zap className="w-6 h-6 mr-2 group-hover:animate-pulse" />
                    Zacznij Oszczędzać Dziś
                    <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a
                  href="https://calendly.com/info-yieldo/ai-recepcjonistka"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#007BFF] text-[#007BFF] hover:bg-blue-50 text-xl px-10 py-8 rounded-xl font-semibold transition-all group"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Zobacz 2-Min Demo
                  </Button>
                </a>
              </div>

              {/* NEW: Trust Badge Bar */}
              <TrustBadgeBar />

              {/* Quick Value Props */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="font-medium">Setup w 5 minut</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="font-medium">Bez karty kredytowej</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="font-medium">🇵🇱 Zgodne z RODO</span>
                </div>
              </div>
            </div>

            {/* Right: Phone Mockup + Video */}
            <div className="relative flex flex-col gap-8 justify-center lg:justify-end">
              {/* NEW: Inline Video Player */}
              <InlineVideoPlayer />

              {/* Existing Phone Mockup */}
              <HeroPhoneMockup />
            </div>
          </div>

          {/* NEW: Customer Logo Carousel */}
          <CustomerLogoCarousel />
        </div>
      </section>

      {/* SECTION 2: PROBLEM AMPLIFICATION */}
      <ProblemAmplification />

      {/* SECTION 3: INTERACTIVE DEMO SHOWCASE */}
      <InteractiveDemoTabs />

      {/* SECTION 4: SOCIAL PROOF WALL */}
      <TestimonialMasonry />

      {/* SECTION 5: BENEFITS SECTION */}
      <BenefitsSection />

      {/* SECTION 6: TIMELINE SECTION */}
      <TimelineSection />

      {/* SECTION 7: PRICING SECTION */}
      <PricingSection />

      {/* SECTION 8: FAQ SECTION */}
      <FAQSection />

      {/* SECTION 9: FINAL CTA */}
      <FinalCTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
