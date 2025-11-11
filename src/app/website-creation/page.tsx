'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import {
  Globe, Zap, Code, Palette, Smartphone, TrendingUp,
  CheckCircle2, Shield, Clock, ArrowRight, Sparkles,
  Layout, Search, Settings, Users, BarChart, MessageSquare,
  Star, Rocket, Target
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import WebsiteTypewriter from "../components/WebsiteTypewriter";
import WebsiteAnimatedMockup from "../components/WebsiteAnimatedMockup";
import WebsiteROICalculator from "../components/WebsiteROICalculator";
import WebsitePortfolioShowcase from "../components/WebsitePortfolioShowcase";
import WebsiteTestimonials from "../components/WebsiteTestimonials";
import WebsiteAnimatedStats from "../components/WebsiteAnimatedStats";
import AnimatedBackground from "../components/AnimatedBackground";

export default function WebsiteCreationPage() {
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

      {/* HERO SECTION - Enhanced */}
      <section className="relative py-10 px-4 overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground />

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Urgency Badge */}
          <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-top-5 duration-700">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-3 rounded-full text-sm font-bold shadow-md border border-orange-200">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              🚀 Limitowana oferta: Pierwsza strona z rabatem 30%
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-5 py-2.5 rounded-full text-sm font-medium animate-in fade-in slide-in-from-left-5 duration-700">
                <Sparkles className="w-4 h-4" />
                Nowoczesne strony internetowe dla Twojej firmy
              </div>

              {/* Headline with Typewriter */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] animate-in fade-in slide-in-from-left-5 duration-700">
                Strona Która{' '}
                <WebsiteTypewriter
                  phrases={[
                    'Przyciąga Klientów',
                    'Sprzedaje 24/7',
                    'Buduje Zaufanie',
                    'Generuje Leady'
                  ]}
                />
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl animate-in fade-in slide-in-from-left-5 duration-700 delay-100">
                Profesjonalna strona internetowa stworzona w{' '}
                <span className="text-purple-600 font-semibold">2 tygodnie</span>.
                Responsywna, szybka i zoptymalizowana pod SEO.
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
                    className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 text-xl px-10 py-8 rounded-xl font-semibold transition-all group"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Zobacz 15-Min Demo
                  </Button>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600 pt-4 animate-in fade-in slide-in-from-left-5 duration-700 delay-300">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="font-medium">Gotowa w 2 tygodnie</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="font-medium">100% Responsywna</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="font-medium">SEO Friendly</span>
                </div>
              </div>
            </div>

            {/* Right: Animated Mockup */}
            <div className="relative animate-in fade-in slide-in-from-right-5 duration-700 delay-200">
              <WebsiteAnimatedMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <WebsiteAnimatedStats />

      {/* Portfolio Showcase */}
      <WebsitePortfolioShowcase />

      {/* ROI Calculator */}
      <WebsiteROICalculator />

      {/* BENEFITS SECTION - Enhanced */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Target className="w-4 h-4" />
              Korzyści
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Dlaczego Warto Wybrać Nas?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tworzymy strony, które nie tylko wyglądają pięknie, ale przede wszystkim{' '}
              <span className="text-purple-600 font-semibold">generują wyniki</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Błyskawiczna Realizacja",
                description: "Twoja strona gotowa w 2 tygodnie. Żadnych miesięcy oczekiwania.",
                gradient: "from-orange-500 to-orange-600"
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "100% Responsywna",
                description: "Idealne wyświetlanie na wszystkich urządzeniach - telefon, tablet, komputer.",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                icon: <Search className="w-8 h-8" />,
                title: "SEO Zoptymalizowane",
                description: "Znajdą Cię w Google. Struktura i kod zgodne z wytycznymi SEO.",
                gradient: "from-green-500 to-green-600"
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: "Nowoczesny Design",
                description: "Piękny, profesjonalny wygląd, który buduje zaufanie klientów.",
                gradient: "from-purple-500 to-purple-600"
              },
              {
                icon: <Settings className="w-8 h-8" />,
                title: "Łatwa Edycja",
                description: "Prosty panel CMS - zmieniaj treści bez pomocy programisty.",
                gradient: "from-indigo-500 to-indigo-600"
              },
              {
                icon: <BarChart className="w-8 h-8" />,
                title: "Analityka Wbudowana",
                description: "Śledź statystyki odwiedzin i konwersji w czasie rzeczywistym.",
                gradient: "from-pink-500 to-pink-600"
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="group bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-purple-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${benefit.gradient} text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Co Otrzymujesz?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kompletny pakiet - wszystko czego potrzebujesz do profesjonalnej obecności online
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Feature List */}
            <div className="space-y-6">
              {[
                {
                  title: "Responsywny Design",
                  description: "Strona dopasowana do każdego ekranu - desktop, tablet, mobile"
                },
                {
                  title: "Formularz Kontaktowy",
                  description: "Zbieraj leady i zapytania bezpośrednio ze strony"
                },
                {
                  title: "Optymalizacja SEO",
                  description: "Struktura, meta tagi i kod zgodny z wytycznymi Google"
                },
                {
                  title: "Google Analytics",
                  description: "Śledź odwiedziny, źródła ruchu i zachowania użytkowników"
                },
                {
                  title: "Hosting & Domena",
                  description: "Pomoc w wyborze i konfiguracji hostingu oraz domeny"
                },
                {
                  title: "Panel CMS",
                  description: "Łatwa edycja treści bez wiedzy technicznej"
                },
                {
                  title: "Mapa Google",
                  description: "Integracja z Google Maps - klienci łatwo Cię znajdą"
                },
                {
                  title: "Social Media",
                  description: "Linki do profili społecznościowych i przyciski udostępniania"
                }
              ].map((feature, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-[#007BFF] flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Representation */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border-2 border-blue-100">
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Layout className="w-6 h-6 text-[#007BFF]" />
                    <h4 className="font-bold text-gray-900">Sekcja Hero</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-8 bg-[#007BFF] rounded w-1/2 mt-4"></div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-green-600" />
                    <h4 className="font-bold text-gray-900">Oferta / Usługi</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-16 bg-blue-100 rounded"></div>
                    <div className="h-16 bg-blue-100 rounded"></div>
                    <div className="h-16 bg-blue-100 rounded"></div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                    <h4 className="font-bold text-gray-900">Kontakt</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <WebsiteTestimonials />

      {/* PROCESS SECTION - Enhanced */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Clock className="w-4 h-4" />
              Proces
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Jak Wygląda Realizacja?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Prosty i przejrzysty proces - od pomysłu do gotowej strony w 4 krokach
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-200 to-purple-600"></div>

            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Konsultacja",
                  description: "Rozmawiamy o Twoich potrzebach, celach i oczekiwaniach. Określamy zakres projektu i najlepsze rozwiązania dla Twojej branży.",
                  duration: "1 dzień",
                  icon: <MessageSquare className="w-6 h-6" />,
                  gradient: "from-blue-500 to-blue-600"
                },
                {
                  step: "02",
                  title: "Projekt Graficzny",
                  description: "Tworzymy profesjonalne makiety strony. Dopracowujemy każdy detal aż do pełnej satysfakcji i zaakceptowania projektu.",
                  duration: "3-5 dni",
                  icon: <Palette className="w-6 h-6" />,
                  gradient: "from-purple-500 to-purple-600"
                },
                {
                  step: "03",
                  title: "Kodowanie i Wdrożenie",
                  description: "Budujemy stronę używając najnowszych technologii. Responsywna, szybka i zgodna z najlepszymi praktykami SEO.",
                  duration: "5-7 dni",
                  icon: <Code className="w-6 h-6" />,
                  gradient: "from-green-500 to-green-600"
                },
                {
                  step: "04",
                  title: "Publikacja i Szkolenie",
                  description: "Testujemy wszystko, publikujemy stronę i szkolimy Cię z obsługi panelu CMS. Gwarantujemy pełne wsparcie!",
                  duration: "1-2 dni",
                  icon: <Globe className="w-6 h-6" />,
                  gradient: "from-orange-500 to-orange-600"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`relative grid lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 0 ? 'lg:text-right' : 'lg:col-start-2'}>
                    <div className={`inline-block bg-gradient-to-r ${item.gradient} text-white px-5 py-2 rounded-full text-sm font-bold mb-4 shadow-lg`}>
                      KROK {item.step}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full font-semibold">
                      <Clock className="w-5 h-5" />
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  {/* Icon Circle */}
                  <div className={`hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white border-4 border-purple-600 rounded-full items-center justify-center shadow-xl z-10`}>
                    <div className={`bg-gradient-to-br ${item.gradient} p-3 rounded-full text-white`}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={index % 2 === 0 ? 'lg:col-start-2' : ''}>
                    <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-4 bg-gradient-to-br ${item.gradient} rounded-xl text-white shadow-md`}>
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="h-3 bg-purple-200 rounded mb-2 w-full animate-pulse"></div>
                          <div className="h-3 bg-purple-100 rounded w-3/4 animate-pulse" style={{ animationDelay: '200ms' }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-purple-100 rounded w-full"></div>
                        <div className="h-2 bg-purple-100 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Duration */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-6 rounded-2xl shadow-2xl">
              <Zap className="w-8 h-8" />
              <div className="text-left">
                <div className="text-sm opacity-90">Łączny czas realizacji</div>
                <div className="text-3xl font-black">10-15 Dni Roboczych</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION - Enhanced */}
      <section id="pricing" className="py-20 px-4 bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Star className="w-4 h-4" />
              Cennik
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Przejrzyste Ceny, Żadnych Niespodzianek
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wybierz pakiet dopasowany do potrzeb Twojej firmy. Wszystkie pakiety z gwarancją jakości.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="group bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-purple-600 transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                <p className="text-gray-600 mb-4">Idealna dla małych firm</p>
                <div className="text-5xl font-black text-gray-900 mb-2">
                  2,500
                  <span className="text-2xl text-gray-600"> zł</span>
                </div>
                <div className="text-sm text-gray-500">jednorazowo</div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Do 5 podstron",
                  "Responsywny design",
                  "Formularz kontaktowy",
                  "Podstawowe SEO",
                  "Google Analytics",
                  "1 miesiąc wsparcia"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://forms.fillout.com/t/xityvM2L42us"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 text-lg font-bold group-hover:scale-105 transition-transform">
                  Wybierz Starter
                </Button>
              </a>
            </div>

            {/* Professional - Recommended */}
            <div className="relative bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 shadow-2xl scale-105 text-white transform hover:scale-110 transition-all">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                  <Star className="w-4 h-4 fill-current" />
                  Najpopularniejszy
                </span>
              </div>
              <div className="text-center mb-6 mt-4">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <p className="text-purple-200 mb-4">Dla rosnących biznesów</p>
                <div className="text-5xl font-black mb-2">
                  5,000
                  <span className="text-2xl text-purple-200"> zł</span>
                </div>
                <div className="text-sm text-purple-200">jednorazowo</div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Do 10 podstron",
                  "Premium design",
                  "Zaawansowane formularze",
                  "Pełne SEO",
                  "Panel CMS",
                  "Integracja z social media",
                  "Blog/Aktualności",
                  "3 miesiące wsparcia"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
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

            {/* Enterprise */}
            <div className="group bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-purple-600 transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-4">Dla dużych projektów</p>
                <div className="text-4xl font-black text-gray-900 mb-2">
                  Indywidualna
                </div>
                <div className="text-sm text-gray-500">wycena</div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Bez limitu podstron",
                  "Custom design",
                  "Dedykowane funkcje",
                  "Zaawansowane SEO",
                  "Panel administracyjny",
                  "Integracje API",
                  "E-commerce (opcjonalnie)",
                  "6 miesięcy wsparcia",
                  "Dedykowany opiekun"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
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
                <div className="font-bold text-gray-900">Bonus do każdego pakietu</div>
                <div className="text-sm text-gray-600">Bezpłatne szkolenie z obsługi CMS</div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              *Hosting i domena rozliczane oddzielnie (~150-300 zł/rok)
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION - Enhanced */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-full text-sm font-bold mb-6">
              <MessageSquare className="w-4 h-4" />
              FAQ
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Najczęściej Zadawane Pytania
            </h2>
            <p className="text-xl text-gray-600">
              Wszystko, co musisz wiedzieć o naszych usługach
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Jak długo trwa realizacja strony?",
                answer: "Standardowa strona jest gotowa w 2 tygodnie (10-15 dni roboczych) od zaakceptowania projektu graficznego. Większe projekty mogą zająć 3-4 tygodnie.",
                icon: <Clock className="w-5 h-5" />
              },
              {
                question: "Czy będę mógł sam edytować treści na stronie?",
                answer: "Tak! Każda strona ma prosty panel CMS, który pozwala na łatwą edycję tekstów, zdjęć i innych treści bez znajomości programowania. Dodatkowo szkolimy z obsługi!",
                icon: <Settings className="w-5 h-5" />
              },
              {
                question: "Czy strona będzie dobrze wyglądać na telefonach?",
                answer: "Absolutnie! Wszystkie nasze strony są w 100% responsywne - idealnie wyglądają i działają na komputerach, tabletach i smartfonach.",
                icon: <Smartphone className="w-5 h-5" />
              },
              {
                question: "Co jeśli będę potrzebować zmian po realizacji?",
                answer: "W zależności od pakietu otrzymujesz 1-6 miesięcy wsparcia technicznego. Potem możemy ustalić stałą opiekę lub pracować projektowo.",
                icon: <Shield className="w-5 h-5" />
              },
              {
                question: "Czy pomożecie mi z domeną i hostingiem?",
                answer: "Tak! Pomożemy wybrać domenę, hosting i wszystko skonfigurujemy. Koszty hostingu to ok. 150-300 zł rocznie. Zajmiemy się wszystkimi aspektami technicznymi.",
                icon: <Globe className="w-5 h-5" />
              },
              {
                question: "Czy strona będzie widoczna w Google?",
                answer: "Tak, wszystkie strony są zoptymalizowane pod SEO od podstaw. Dodatkowo możemy pomóc w pozycjonowaniu i kampaniach Google Ads (osobna usługa).",
                icon: <Search className="w-5 h-5" />
              },
              {
                question: "Jakie są koszty utrzymania strony?",
                answer: "Podstawowe koszty to hosting (~150-300 zł/rok) i domena (~50-100 zł/rok). Opcjonalnie możesz wykupić stałą opiekę techniczną od 200 zł/mies.",
                icon: <TrendingUp className="w-5 h-5" />
              },
              {
                question: "Czy mogę zobaczyć przykładowe realizacje?",
                answer: "Oczywiście! Skontaktuj się z nami, a pokażemy nasze portfolio, referencje klientów i dopasujemy projekt do specyfiki Twojej branży.",
                icon: <Star className="w-5 h-5" />
              }
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-purple-600 transition-all hover:shadow-lg"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-gray-900 text-lg hover:text-purple-600 transition-colors">
                  <span className="flex items-center gap-3">
                    <span className="text-purple-600 group-hover:scale-110 transition-transform">
                      {faq.icon}
                    </span>
                    {faq.question}
                  </span>
                  <span className="text-purple-600 group-open:rotate-180 transition-transform flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100">
                  <div className="pt-4">{faq.answer}</div>
                </div>
              </details>
            ))}
          </div>

          {/* Additional Help */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Nie znalazłeś odpowiedzi na swoje pytanie?
            </p>
            <a
              href="https://calendly.com/info-yieldo/ai-recepcjonistka"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg font-bold">
                <MessageSquare className="w-5 h-5 mr-2" />
                Porozmawiaj z Nami
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION - Enhanced */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
            <Rocket className="w-4 h-4" />
            Rozpocznij już dziś
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Gotowy, Aby Twoja Firma<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
              Dominowała Online?
            </span>
          </h2>

          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Dołącz do zadowolonych przedsiębiorców, którzy rozwinęli swoje biznesy dzięki profesjonalnej stronie internetowej. Twoja strona gotowa w 2 tygodnie!
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
                Rozpocznij Projekt
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
                Umów Bezpłatną Konsultację
              </Button>
            </a>
          </div>

          {/* Risk Reversal & Trust Elements */}
          <div className="mt-16 pt-12 border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Gwarancja Jakości</h3>
                <p className="text-sm opacity-80">100% satysfakcji lub zwrot pieniędzy</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Bez Ukrytych Kosztów</h3>
                <p className="text-sm opacity-80">Przejrzysta wycena, jasne zasady</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Wsparcie Po Wdrożeniu</h3>
                <p className="text-sm opacity-80">Nie zostawiamy Cię samego</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-300" />
                <span>Szybki start - bez czekania</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-300" />
                <span>Profesjonalne wykonanie</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-300" />
                <span>Gwarancja satysfakcji</span>
              </div>
            </div>
          </div>

          {/* Urgency Element */}
          <div className="mt-12 inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg animate-pulse">
            <Zap className="w-4 h-4" />
            Tylko 3 sloty dostępne w tym miesiącu!
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
