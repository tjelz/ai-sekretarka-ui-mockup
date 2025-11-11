'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { LucideProps } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import {
  Globe, Zap, Code, Palette, Smartphone, TrendingUp,
  CheckCircle2, Shield, Clock, ArrowRight, Sparkles,
  Layout, Search, Settings, Users, BarChart, MessageSquare,
  Star, Rocket, Target, MapPin, Phone, Award, AlertCircle,
  Eye, EyeOff, TrendingDown, XCircle, HeartCrack, UserX,
  CheckCircle, BadgeCheck, Zap as Lightning, ArrowRightCircle
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";

// Import reusable components
import AnimatedBackground from "../components/AnimatedBackground";
import WebsiteTypewriter from "../components/WebsiteTypewriter";
import AnimatedStatCard from "../components/AnimatedStatCard";

// Interactive Map Preview Component
function InteractiveMapPreview() {
  const [activePin, setActivePin] = useState(1);

  return (
    <div className="relative bg-white rounded-3xl shadow-2xl p-8 overflow-hidden notranslate" translate="no">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/50" />

      <div className="relative z-10">
        <div className="bg-gray-100 rounded-2xl h-80 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-50" />

          {[
            { id: 1, left: '30%', top: '40%', name: 'Twoja Firma', rating: 4.8, visible: true },
            { id: 2, left: '60%', top: '25%', name: 'Konkurencja A', rating: 3.5, visible: false },
            { id: 3, left: '45%', top: '70%', name: 'Konkurencja B', rating: 4.1, visible: false }
          ].map((pin) => (
            <motion.div
              key={pin.id}
              className={`absolute cursor-pointer transition-all duration-300 ${activePin === pin.id ? 'z-20 scale-125' : 'z-10'}`}
              style={{ left: pin.left, top: pin.top }}
              onClick={() => setActivePin(pin.id)}
              whileHover={{ scale: 1.2 }}
            >
              <div className={`relative ${activePin === pin.id ? 'animate-bounce' : ''}`}>
                <MapPin
                  className={`w-10 h-10 ${pin.visible ? 'text-green-600' : 'text-gray-400'} drop-shadow-lg`}
                  fill={pin.visible ? '#16a34a' : '#9ca3af'}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={activePin === pin.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  className={`absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow-xl whitespace-nowrap ${activePin === pin.id ? '' : 'pointer-events-none'} notranslate`}
                  style={{ visibility: activePin === pin.id ? 'visible' : 'hidden' }}
                  translate="no"
                >
                  <div className="font-bold text-sm text-gray-900">{pin.name}</div>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{pin.rating}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-green-400/30 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: '200px', height: '200px' }}
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-green-50 p-3 rounded-xl">
            <MapPin className="w-5 h-5 text-green-600" fill="#16a34a" />
            <div>
              <div className="font-bold text-sm text-gray-900">Twoja Firma</div>
              <div className="text-xs text-gray-600">Widoczna dla klientów</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            <MapPin className="w-5 h-5 text-gray-400" fill="#9ca3af" />
            <div>
              <div className="font-bold text-sm text-gray-900">Konkurencja</div>
              <div className="text-xs text-gray-600">Niższa widoczność</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Timeline Step Component - Extracted to fix React Hooks violations
function TimelineStep({
  item,
  index,
  activeStep,
  setActiveStep
}: {
  item: {
    step: string;
    title: string;
    description: string;
    duration: string;
    icon: React.FC<LucideProps>;
    gradient: string;
    color: string;
  };
  index: number;
  activeStep: number;
  setActiveStep: (step: number) => void;
}) {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setActiveStep(index);
    }
  }, [inView, index, setActiveStep]);

  const Icon = item.icon;
  const isActive = activeStep >= index;

  return (
    <motion.div
      ref={ref}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Node */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className={`w-20 h-20 rounded-full bg-white border-4 ${isActive ? 'border-purple-600 shadow-2xl' : 'border-gray-300 shadow-lg'
                    } flex items-center justify-center transition-all duration-300`}>
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-inner`}>
                      <Icon className="w-7 h-7" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Pulse Effect When Active */}
                  {isActive && (
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-${item.color}-400 -z-10`}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Content Cards - Alternating Sides */}
              <div className={`grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}>
                {/* Empty space for timeline */}
                <div className={index % 2 === 0 ? '' : 'lg:order-2'} />

                {/* Content Card */}
                <motion.div
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16 lg:order-1'}`}
                >
                  <div className={`bg-white rounded-2xl p-8 shadow-xl border-2 ${isActive ? `border-${item.color}-500` : 'border-gray-100'
                    } hover:shadow-2xl transition-all duration-300 group`}>
                    {/* Step Badge */}
                    <div className={`inline-block bg-gradient-to-r ${item.gradient} text-white px-5 py-2 rounded-full text-sm font-bold mb-6 shadow-lg group-hover:scale-105 transition-transform`}>
                      KROK {item.step}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Duration Badge */}
                    <div className={`inline-flex items-center gap-2 bg-${item.color}-50 text-${item.color}-700 px-4 py-2 rounded-full font-semibold`}>
                      <Clock className="w-5 h-5" />
                      <span>{item.duration}</span>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                        <span>Postęp</span>
                        <span className="font-semibold">{isActive ? '100%' : '0%'}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${item.gradient} rounded-full`}
                          initial={{ width: '0%' }}
                          animate={{ width: isActive ? '100%' : '0%' }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
  );
}

// Scroll Progress Timeline Component
function ScrollProgressTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const steps = [
    {
      step: "01",
      title: "Konsultacja i Audyt",
      description: "Rozmawiamy o Twoich celach i analizujemy obecną sytuację. Dla Google Business: sprawdzamy obecny profil i konkurencję. Dla strony: określamy zakres i funkcje.",
      duration: "1 dzień",
      icon: MessageSquare,
      gradient: "from-blue-500 to-blue-600",
      color: "blue"
    },
    {
      step: "02",
      title: "Setup Google Business (Start w 48h)",
      description: "Zaczynamy od Google Business - optymalizujemy profil, dodajemy zdjęcia, konfigurujemy wszystkie sekcje. Klienci mogą Cię znaleźć już w weekend!",
      duration: "2-3 dni",
      icon: MapPin,
      gradient: "from-green-500 to-green-600",
      color: "green"
    },
    {
      step: "03",
      title: "Projekt i Budowa Strony",
      description: "Tworzymy makiety, po zatwierdzeniu budujemy stronę. Responsywna, szybka, SEO-friendly. Integrujemy ze stroną link do Google Business.",
      duration: "10-14 dni",
      icon: Code,
      gradient: "from-purple-500 to-purple-600",
      color: "purple"
    },
    {
      step: "04",
      title: "Launch i Ciągła Optymalizacja",
      description: "Publikujemy stronę, kontynuujemy zarządzanie Google Business (posty, recenzje), dostarczamy raporty. Ciągle optymalizujemy dla lepszych wyników.",
      duration: "Ongoing",
      icon: Rocket,
      gradient: "from-orange-500 to-orange-600",
      color: "orange"
    }
  ];

  return (
    <div ref={containerRef} className="relative py-12 notranslate" translate="no">
      {/* Progress Line Background */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2 rounded-full" />

      {/* Animated Progress Line */}
      <motion.div
        className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-purple-500 to-purple-600 transform -translate-x-1/2 rounded-full origin-top"
        style={{
          scaleY: scrollYProgress,
        }}
      />

      <div className="space-y-24">
        {steps.map((item, index) => (
          <TimelineStep
            key={index}
            item={item}
            index={index}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        ))}
      </div>

      {/* Overall Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-4 shadow-lg border border-purple-100">
          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeStep >= index ? 'bg-purple-600 scale-125' : 'bg-gray-300'
                  }`}
              />
            ))}
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div className="text-left">
            <div className="text-sm text-gray-500">Aktualny krok</div>
            <div className="text-lg font-bold text-gray-900">
              {activeStep + 1} / {steps.length}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function DigitalPresencePage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast.success("Zgłoszenie wysłane!", {
        description: "Skontaktujemy się wkrótce!"
      });

      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Wystąpił błąd", {
        description: "Spróbuj ponownie później"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Link href="/" className="text-sm font-semibold text-gray-700 hover:text-[#007BFF] transition-colors">
                ← Wróć do głównej
              </Link>
              <a
                href="https://forms.fillout.com/t/xityvM2L42us"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" className="bg-[#007BFF] hover:bg-[#0056b3] text-white">
                  Rozpocznij projekt
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - Unified Message */}
      <section className="relative py-20 md:py-28 px-4 overflow-hidden min-h-screen flex items-center">
        <AnimatedBackground />

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Urgency Badge */}
          <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-top-5 duration-700">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-3 rounded-full text-sm font-bold shadow-md border border-orange-200">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              🚀 Oferta Specjalna: Kompletny pakiet -25%
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-5 py-2.5 rounded-full text-sm font-medium animate-in fade-in slide-in-from-left-5 duration-700">
                <Sparkles className="w-4 h-4" />
                Kompletna Obecność Online dla Twojej Firmy
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] animate-in fade-in slide-in-from-left-5 duration-700">
                Strona + Google Business =
                <span className="block min-h-[1.2em]" translate="no" data-notranslate="true">
                  <WebsiteTypewriter
                    phrases={[
                      'Więcej Klientów',
                      'Wyższa Sprzedaż',
                      'Lepsza Widoczność',
                      'Wzrost Przychodów'
                    ]}
                  />
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl animate-in fade-in slide-in-from-left-5 duration-700 delay-100">
                Nie budujemy tylko stron - tworzymy{' '}
                <span className="text-purple-600 font-semibold">kompletną obecność online</span>.
                Profesjonalna strona + widoczność w Google = dominacja w Twojej branży.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-left-5 duration-700 delay-200">
                <a
                  href="https://forms.fillout.com/t/xityvM2L42us"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl px-14 py-8 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all hover:scale-105 group"
                  >
                    <Rocket className="w-6 h-6 mr-2 group-hover:animate-pulse" />
                    Zacznij Teraz
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
                    className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 text-xl px-10 py-8 rounded-xl font-semibold transition-all group"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Darmowa Konsultacja
                  </Button>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600 pt-4 animate-in fade-in slide-in-from-left-5 duration-700 delay-300">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="font-medium">Strona w 2 tygodnie</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="font-medium">Google w 48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="font-medium">Gwarancja wyników</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Map/Website Visual */}
            <div className="relative animate-in fade-in slide-in-from-right-5 duration-700 delay-200">
              <InteractiveMapPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Combined Impact */}
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Moc Połączenia: Strona + Google Business
            </h2>
            <p className="text-lg text-gray-600">
              Razem tworzą nieprzerwany lejek pozyskiwania klientów
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedStatCard
              icon={Globe}
              value={320}
              suffix="%"
              label="Wzrost widoczności online"
              sublabel="strona + Google Business"
              trend="↗ Synergiczny efekt"
              color="blue"
              delay={0}
            />
            <AnimatedStatCard
              icon={Users}
              value={76}
              suffix="%"
              label="Klientów sprawdza stronę"
              sublabel="po znalezieniu w Google"
              trend="✓ Verified data"
              color="green"
              delay={0.1}
            />
            <AnimatedStatCard
              icon={TrendingUp}
              value={450}
              suffix="%"
              label="Więcej konwersji"
              sublabel="z pełną obecnością"
              trend="↗ +5.3x ROI"
              color="purple"
              delay={0.2}
            />
            <AnimatedStatCard
              icon={Star}
              value={88}
              suffix="%"
              label="Wyższe zaufanie"
              sublabel="profesjonalna strona + opinie"
              trend="↗ Trust factor"
              color="orange"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Problem Section - Animated Comparison */}
      <section className="py-20 px-4 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-5 py-2.5 rounded-full text-sm font-medium mb-5"
            >
              <AlertCircle className="w-4 h-4" />
              Dlaczego Potrzebujesz Obu
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-gray-900 mb-4"
            >
              Samą Stroną Nie Wygrasz.<br />Sam Google Też Nie Wystarczy.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Potrzebujesz kompletnej strategii, która łączy widoczność z konwersją
            </motion.p>
          </div>

          {/* Animated Visual Comparison */}
          <div className="relative max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Scenario 1: Without Google */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 p-8 rounded-3xl border-2 border-red-200 hover:border-red-400 transition-all duration-300 h-full">
                  {/* Animated Icon */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, -5, 0, 5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors"
                  >
                    <Search className="w-10 h-10 text-red-600" strokeWidth={2.5} />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Bez Google:<br />
                    <span className="text-red-600">Niewidoczność</span>
                  </h3>

                  <div className="space-y-3 mb-6">
                    {[
                      { icon: Search, text: "Nikt nie znajdzie Twojej firmy" },
                      { icon: TrendingDown, text: "46% rynku lokalnego traci" },
                      { icon: EyeOff, text: "Jesteś niewidzialny dla klientów" },
                    ].map((item, i) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-6 h-6 flex items-center justify-center bg-red-100 rounded-lg flex-shrink-0">
                            <IconComponent className="w-4 h-4 text-red-600" />
                          </div>
                          <p className="text-sm text-gray-700">{item.text}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Animated Loss Bar */}
                  <div className="bg-white rounded-xl p-4 border border-red-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-gray-600">Strata potencjału</span>
                      <span className="text-xs font-bold text-red-600">-50%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "50%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Connecting Arrow - Hidden on mobile */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-xl font-bold">+</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Scenario 2: Without Website */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 p-8 rounded-3xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 h-full">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors"
                  >
                    <Globe className="w-10 h-10 text-orange-600" strokeWidth={2.5} />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Bez Strony:<br />
                    <span className="text-orange-600">Brak Konwersji</span>
                  </h3>

                  <div className="space-y-3 mb-6">
                    {[
                      { icon: XCircle, text: "76% sprawdza stronę przed zakupem" },
                      { icon: HeartCrack, text: "Tracisz zaufanie klientów" },
                      { icon: UserX, text: "Brak miejsca na przekonanie" },
                    ].map((item, i) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-6 h-6 flex items-center justify-center bg-orange-100 rounded-lg flex-shrink-0">
                            <IconComponent className="w-4 h-4 text-orange-600" />
                          </div>
                          <p className="text-sm text-gray-700">{item.text}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-orange-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-gray-600">Strata konwersji</span>
                      <span className="text-xs font-bold text-orange-600">-70%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "70%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Equals Sign */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                  className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10"
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xl font-bold">=</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Scenario 3: Together - Success */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-8 rounded-3xl border-2 border-purple-400 hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full text-white relative overflow-hidden">
                  {/* Sparkle Effect */}
                  <motion.div
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-4 right-4 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"
                  />

                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      rotate: [0, 10, 0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors"
                  >
                    <TrendingUp className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-4">
                    Razem:<br />
                    <span className="text-yellow-300">Dominacja</span>
                  </h3>

                  <div className="space-y-3 mb-6">
                    {[
                      { icon: Eye, text: "Pełna widoczność w Google" },
                      { icon: BadgeCheck, text: "Profesjonalne pierwsze wrażenie" },
                      { icon: Lightning, text: "Kompletny lejek sprzedażowy" },
                    ].map((item, i) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.7 + i * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-lg flex-shrink-0">
                            <IconComponent className="w-4 h-4 text-yellow-300" />
                          </div>
                          <p className="text-sm text-white/90">{item.text}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-white/80">Wzrost wyników</span>
                      <span className="text-xs font-bold text-yellow-300">+320%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.9 }}
                        className="h-full bg-gradient-to-r from-yellow-400 to-green-400 rounded-full relative"
                      >
                        <motion.div
                          animate={{
                            x: ["-100%", "200%"],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-purple-50 px-8 py-4 rounded-2xl border-2 border-purple-200 shadow-lg">
                <Lightning className="w-6 h-6 text-purple-600" />
                <p className="text-lg font-bold text-gray-900">
                  1 + 1 = 3 • Synergiczny efekt dominacji online
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Benefits Section - Animated Grid Customer Journey */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-full text-sm font-bold mb-6"
            >
              <Target className="w-4 h-4" />
              Jak To Działa Razem
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-gray-900 mb-4"
            >
              Kompletny Ekosystem Przyciągania Klientów
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Każdy element wzmacnia drugi, tworząc nieprzerwany przepływ nowych klientów
            </motion.p>
          </div>

          {/* Animated Grid of Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {/* Card 1: Google Finds You */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-blue-500 to-blue-700 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 text-9xl font-black text-white/5 -mr-4 -mt-4 select-none">01</div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                  <Search className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold mb-4">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  WIDOCZNOŚĆ
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Google Znajdzie Cię</h3>
                <p className="text-white/90 leading-relaxed">
                  Optymalizacja Google Business sprawia, że pojawiasz się w TOP 3 lokalnych wyników.
                  Klienci widzą Twoją firmę jako pierwszą.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Website Converts */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-green-500 to-green-700 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 text-9xl font-black text-white/5 -mr-4 -mt-4 select-none">02</div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                  <Globe className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold mb-4">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  KONWERSJA
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Strona Przekonuje</h3>
                <p className="text-white/90 leading-relaxed">
                  76% sprawdza stronę po znalezieniu w Google. Profesjonalna strona buduje zaufanie
                  i przekształca zainteresowanie w działanie.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Reviews Confirm */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-yellow-500 to-orange-600 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 text-9xl font-black text-white/5 -mr-4 -mt-4 select-none">03</div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                  <Star className="w-8 h-8 text-white" strokeWidth={2.5} fill="white" />
                </div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold mb-4">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  ZAUFANIE
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Recenzje Potwierdzają</h3>
                <p className="text-white/90 leading-relaxed">
                  Zarządzanie opiniami na Google Business daje społeczny dowód jakości.
                  88% użytkowników ufa recenzjom online.
                </p>
              </div>
            </motion.div>

            {/* Card 4: Easy Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-purple-500 to-purple-700 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 text-9xl font-black text-white/5 -mr-4 -mt-4 select-none">04</div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                  <Phone className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold mb-4">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  DZIAŁANIE
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Kontakt Jeden Klik</h3>
                <p className="text-white/90 leading-relaxed">
                  Formularz kontaktowy na stronie + przycisk telefonu w Google Business =
                  maksymalna łatwość kontaktu.
                </p>
              </div>
            </motion.div>

            {/* Card 5: Data Drives Growth */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 text-9xl font-black text-white/5 -mr-4 -mt-4 select-none">05</div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                  <BarChart className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold mb-4">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  OPTYMALIZACJA
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Dane Napędzają Wzrost</h3>
                <p className="text-white/90 leading-relaxed">
                  Google Analytics ze strony + statystyki Google Business = pełna wiedza o klientach
                  i ciągła optymalizacja strategii.
                </p>
              </div>
            </motion.div>

            {/* Card 6: SEO Amplifies */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-pink-500 to-pink-700 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 text-9xl font-black text-white/5 -mr-4 -mt-4 select-none">06</div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                  <TrendingUp className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold mb-4">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  SYNERGIA
                </div>
                <h3 className="text-2xl font-black text-white mb-3">SEO Wzmacnia Ranking</h3>
                <p className="text-white/90 leading-relaxed">
                  Link ze strony do Google Business i na odwrót. Google premiuje Cię wyższą pozycją
                  w wynikach wyszukiwania.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Summary */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-5 rounded-2xl text-white shadow-2xl"
            >
              <Lightning className="w-7 h-7" />
              <div className="text-left">
                <div className="text-lg font-bold">Nieprzerwany Przepływ Klientów</div>
                <div className="text-sm text-purple-200">Każdy element wzmacnia pozostałe w ciągłym cyklu wzrostu</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION - Unified Packages */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Star className="w-4 h-4" />
              Pakiety Kompletnej Obecności
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Wszystko Czego Potrzebujesz w Jednym Pakiecie
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Strona + Google Business + Zarządzanie = Kompletne rozwiązanie
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Package */}
            <div className="group bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-purple-600 transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Start</h3>
                <p className="text-gray-600 mb-4">Dla małych firm startujących online</p>
                <div className="text-5xl font-black text-gray-900 mb-2">
                  2,999
                  <span className="text-2xl text-gray-600"> zł</span>
                </div>
                <div className="text-sm text-gray-500">jednorazowo + 299 zł/mies.</div>
              </div>

              <div className="space-y-1 mb-4">
                <div className="text-xs font-bold text-purple-600 uppercase mb-3">✦ Strona Internetowa:</div>
                {[
                  "Do 5 podstron",
                  "Responsywny design",
                  "Formularz kontaktowy",
                  "Podstawowe SEO",
                  "Google Analytics"
                ].map((feature, i) => (
                  <div key={`start-web-${i}-${feature.substring(0, 10)}`} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 mb-8 pt-4 border-t border-gray-100">
                <div className="text-xs font-bold text-blue-600 uppercase mb-3">✦ Google Business:</div>
                {[
                  "Setup i optymalizacja profilu",
                  "2 posty miesięcznie",
                  "Podstawowe zarządzanie recenzjami",
                  "Miesięczne raporty"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://forms.fillout.com/t/xityvM2L42us"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 text-lg font-bold group-hover:scale-105 transition-transform">
                  Wybierz Start
                </Button>
              </a>
            </div>

            {/* Professional Package - RECOMMENDED */}
            <div className="relative bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 shadow-2xl scale-105 text-white transform hover:scale-110 transition-all">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                  <Star className="w-4 h-4 fill-current" />
                  Najpopularniejszy
                </span>
              </div>
              <div className="text-center mb-6 mt-4">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <p className="text-purple-200 mb-4">Kompletne rozwiązanie dla rosnących firm</p>
                <div className="text-5xl font-black mb-2">
                  6,499
                  <span className="text-2xl text-purple-200"> zł</span>
                </div>
                <div className="text-sm text-purple-200">jednorazowo + 499 zł/mies.</div>
              </div>

              <div className="space-y-1 mb-4">
                <div className="text-xs font-bold text-yellow-300 uppercase mb-3">✦ Strona Internetowa:</div>
                {[
                  "Do 10 podstron",
                  "Premium design",
                  "Panel CMS",
                  "Zaawansowane formularze",
                  "Pełne SEO + Blog",
                  "Integracja social media"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 mb-8 pt-4 border-t border-purple-400/30">
                <div className="text-xs font-bold text-yellow-300 uppercase mb-3">✦ Google Business Pro:</div>
                {[
                  "Pełna optymalizacja SEO",
                  "4-6 postów + aktualizacje",
                  "Profesjonalne zarządzanie recenzjami",
                  "Cotygodniowe raporty",
                  "Monitoring konkurencji",
                  "Q&A management"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://forms.fillout.com/t/xityvM2L42us"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 py-6 text-lg font-bold hover:scale-105 transition-transform">
                  Wybierz Professional
                </Button>
              </a>
            </div>

            {/* Enterprise Package */}
            <div className="group bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-purple-600 transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-4">Dla firm wymagających maximum</p>
                <div className="text-4xl font-black text-gray-900 mb-2">
                  Indywidualna
                </div>
                <div className="text-sm text-gray-500">wycena</div>
              </div>

              <div className="space-y-1 mb-4">
                <div className="text-xs font-bold text-purple-600 uppercase mb-3">✦ Strona Premium:</div>
                {[
                  "Bez limitu podstron",
                  "Custom design i funkcje",
                  "Zaawansowany panel CMS",
                  "E-commerce (opcjonalnie)",
                  "Integracje API",
                  "Dedykowany support"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 mb-8 pt-4 border-t border-gray-100">
                <div className="text-xs font-bold text-blue-600 uppercase mb-3">✦ Google Business Elite:</div>
                {[
                  "Pełna obsługa + strategia",
                  "Nielimitowane posty i aktualizacje",
                  "24/7 zarządzanie reputacją",
                  "Lokalne kampanie reklamowe",
                  "Dedykowany account manager",
                  "Priorytetowe wsparcie"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://calendly.com/info-yieldo/ai-recepcjonistka"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 text-lg font-bold group-hover:scale-105 transition-transform">
                  Skontaktuj się
                </Button>
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center space-y-4">
            <div className="inline-flex items-center gap-3 bg-white rounded-xl px-8 py-4 shadow-lg border border-purple-100">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <div className="text-left">
                <div className="font-bold text-gray-900">Oszczędzasz 25%</div>
                <div className="text-sm text-gray-600">kupując pakiet zamiast osobno</div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              *Koszty miesięczne obejmują hosting, domenę i pełną obsługę Google Business
            </p>
          </div>
        </div>
      </section>

      {/* Process Section - New Scroll-Based Timeline */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Clock className="w-4 h-4" />
              Jak To Wygląda?
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Prosty Proces w 4 Krokach
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Od konsultacji do pełnej obecności online - szybko i efektywnie
            </p>
          </div>

          <ScrollProgressTimeline />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
            <Rocket className="w-4 h-4" />
            Czas Na Dominację
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Gotowy Zdominować<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
              Swoją Lokalną Branżę?
            </span>
          </h2>

          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Dołącz do firm, które łączą profesjonalną stronę z widocznością w Google.
            Start już w tym tygodniu!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="https://forms.fillout.com/t/xityvM2L42us"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white text-xl px-14 py-8 rounded-xl font-bold shadow-2xl hover:shadow-3xl transition-all hover:scale-105 group border-0"
              >
                <Rocket className="w-6 h-6 mr-2 group-hover:animate-pulse" />
                Rozpocznij Teraz
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
                className="border-2 border-white text-black hover:bg-white hover:text-purple-600 text-xl px-10 py-8 rounded-xl font-bold transition-all backdrop-blur-sm group"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Darmowa Konsultacja
              </Button>
            </a>
          </div>

          {/* Trust Elements */}
          <div className="mt-16 pt-12 border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Gwarancja Jakości</h3>
                <p className="text-sm opacity-80">Strona + Google = 100% satysfakcji</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Wszystko w Jednym</h3>
                <p className="text-sm opacity-80">Kompleksowe rozwiązanie bez ukrytych kosztów</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Wsparcie 24/7</h3>
                <p className="text-sm opacity-80">Ciągła optymalizacja i pomoc</p>
              </div>
            </div>
          </div>

          <div className="mt-12 inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg animate-pulse">
            <Zap className="w-4 h-4" />
            Tylko 5 miejsc dostępnych w tym miesiącu!
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
