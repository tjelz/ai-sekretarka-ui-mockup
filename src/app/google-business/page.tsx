"use client"

import { Button } from "@/components/ui/button"
import { Footer } from "@/components/ui/footer"
import { MapPin, Search, Star, TrendingUp, CheckCircle2, Users, Clock, Zap, ArrowRight, Shield, Sparkles, Phone, MessageSquare, Target, BarChart3, Globe, Award, AlertCircle, ChevronDown, Wrench } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import Image from "next/image"
import AnimatedBackground from "../components/AnimatedBackground"
import AnimatedStatCard from "../components/AnimatedStatCard"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"

// Interactive Map Preview Component
function InteractiveMapPreview() {
  const [activePin, setActivePin] = useState(1)

  return (
    <div className="relative bg-white rounded-3xl shadow-2xl p-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/50" />

      <div className="relative z-10">
        {/* Simulated Map with Business Markers */}
        <div className="bg-gray-100 rounded-2xl h-80 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-50" />

          {/* Business Markers */}
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
                {activePin === pin.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow-xl whitespace-nowrap"
                  >
                    <div className="font-bold text-sm text-gray-900">{pin.name}</div>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{pin.rating}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Search Radius Indicator */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-green-400/30 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ width: '200px', height: '200px' }}
          />
        </div>

        {/* Map Legend */}
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
  )
}

// Before/After Ranking Visualizer
function RankingVisualizer() {
  const [showAfter, setShowAfter] = useState(false)

  const beforeRankings = [
    { name: 'Konkurencja Premium', stars: 4.5, reviews: 250 },
    { name: 'Top Service', stars: 4.3, reviews: 180 },
    { name: 'Twoja Firma', stars: 3.8, reviews: 45, highlight: true }
  ]

  const afterRankings = [
    { name: 'Twoja Firma', stars: 4.7, reviews: 120, highlight: true },
    { name: 'Konkurencja Premium', stars: 4.5, reviews: 250 },
    { name: 'Top Service', stars: 4.3, reviews: 180 }
  ]

  const rankings = showAfter ? afterRankings : beforeRankings

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          {showAfter ? 'Po Optymalizacji' : 'Przed Optymalizacją'}
        </h3>
        <Button
          onClick={() => setShowAfter(!showAfter)}
          className="bg-[#007BFF] hover:bg-[#0056b3] text-white"
        >
          {showAfter ? 'Pokaż Przed' : 'Pokaż Po'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="space-y-3">
        {rankings.map((business, index) => (
          <motion.div
            key={business.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border-2 transition-all ${
              business.highlight
                ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-400'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  business.highlight ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <div className={`font-bold ${business.highlight ? 'text-green-700' : 'text-gray-900'}`}>
                    {business.name}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(business.stars)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{business.stars}</span>
                    <span className="text-gray-500">({business.reviews} opinii)</span>
                  </div>
                </div>
              </div>
              {business.highlight && showAfter && (
                <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  TOP 1
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ROI Calculator Component
function ROICalculator() {
  const [monthlySearches, setMonthlySearches] = useState(1000)
  const [conversionRate, setConversionRate] = useState(5)
  const [avgTransactionValue, setAvgTransactionValue] = useState(200)

  const currentVisibility = 15 // %
  const afterOptimization = 45 // %

  const currentCustomers = Math.round((monthlySearches * currentVisibility / 100) * (conversionRate / 100))
  const afterCustomers = Math.round((monthlySearches * afterOptimization / 100) * (conversionRate / 100))

  const currentRevenue = currentCustomers * avgTransactionValue
  const afterRevenue = afterCustomers * avgTransactionValue
  const additionalRevenue = afterRevenue - currentRevenue
  const roi = Math.round(((additionalRevenue - 499) / 499) * 100)

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-[#007BFF]" />
        Kalkulator ROI
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Miesięczne wyszukiwania lokalne w Twojej branży
          </label>
          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={monthlySearches}
            onChange={(e) => setMonthlySearches(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-right text-xl font-bold text-[#007BFF]">{monthlySearches}</div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Współczynnik konwersji (%)
          </label>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={conversionRate}
            onChange={(e) => setConversionRate(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-right text-xl font-bold text-[#007BFF]">{conversionRate}%</div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Średnia wartość transakcji (zł)
          </label>
          <input
            type="range"
            min="50"
            max="1000"
            step="10"
            value={avgTransactionValue}
            onChange={(e) => setAvgTransactionValue(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-right text-xl font-bold text-[#007BFF]">{avgTransactionValue} zł</div>
        </div>

        <div className="border-t-2 border-gray-100 pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-xl">
              <div className="text-xs text-gray-600 mb-1">Obecny miesięczny przychód</div>
              <div className="text-2xl font-black text-gray-900">
                {currentRevenue.toLocaleString()} zł
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <div className="text-xs text-gray-600 mb-1">Po optymalizacji</div>
              <div className="text-2xl font-black text-green-600">
                {afterRevenue.toLocaleString()} zł
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] p-6 rounded-2xl text-white">
            <div className="text-sm mb-2">Dodatkowy miesięczny przychód</div>
            <div className="text-4xl font-black mb-3">
              +{additionalRevenue.toLocaleString()} zł
            </div>
            <div className="text-sm opacity-90">
              ROI: <span className="font-bold text-lg">{roi}%</span> miesięcznie
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Case Study Card
function CaseStudyCard({ business, industry, metric, increase, timeframe }: {
  business: string
  industry: string
  metric: string
  increase: string
  timeframe: string
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all hover:scale-105"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-bold text-lg text-gray-900">{business}</h4>
          <p className="text-sm text-gray-600">{industry}</p>
        </div>
        <Award className="w-8 h-8 text-yellow-500" />
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl mb-3">
        <div className="text-4xl font-black text-green-600 mb-1">{increase}</div>
        <div className="text-sm font-semibold text-gray-700">{metric}</div>
      </div>

      <div className="text-xs text-gray-500 flex items-center gap-2">
        <Clock className="w-3 h-3" />
        {timeframe}
      </div>
    </motion.div>
  )
}

export default function GoogleBusinessPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      toast.success("Zgłoszenie wysłane!", {
        description: "Email wysłany do info.yieldo@gmail.com. Skontaktujemy się wkrótce!"
      })

      setFormData({ name: "", email: "", phone: "" })
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error("Wystąpił błąd", {
        description: "Spróbuj ponownie później lub napisz bezpośrednio na info.yieldo@gmail.com"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Navigation */}
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
              <Link href="/ai-sekretarka" className="hidden sm:block text-sm font-semibold text-gray-700 hover:text-[#007BFF] transition-colors">
                AI Sekretarka
              </Link>
              <a href="#pricing" className="hidden sm:block text-sm font-semibold text-gray-700 hover:text-[#007BFF] transition-colors">
                Cennik
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced with Interactive Elements */}
      <section className="relative py-10 px-4 overflow-hidden">
        <AnimatedBackground />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold"
              >
                <Sparkles className="w-4 h-4" />
                Certyfikowany Partner Google
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1]">
                Znajdź Klientów{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  W Twojej Okolicy
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Optymalizacja Google Business Profile.{' '}
                <span className="text-[#007BFF] font-semibold">
                  Więcej widoczności = więcej klientów = wyższe przychody.
                </span>
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
                    Zacznij Dziś
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
                    Darmowy Audyt
                  </Button>
                </a>
              </div>

              {/* Quick Value Props */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="font-medium">Setup w 48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="font-medium">Partner Google</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="font-medium">Gwarancja +30% wyświetleń</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Map Preview */}
            <div className="relative flex justify-center lg:justify-end">
              <InteractiveMapPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-blue-50/30 via-white to-blue-50/30">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23007BFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Lokalne Wyszukiwania w Liczbach
            </h2>
            <p className="text-lg text-gray-600">
              Twoi klienci już Cię szukają. Upewnij się, że Cię znajdą.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedStatCard
              icon={Search}
              value={46}
              suffix="%"
              label="Wszystkich wyszukiwań Google"
              sublabel="ma charakter lokalny"
              trend="↗ Google Research"
              color="blue"
              delay={0}
            />
            <AnimatedStatCard
              icon={MapPin}
              value={76}
              suffix="%"
              label="Użytkowników"
              sublabel="odwiedza firmę w 24h"
              trend="✓ Verified data"
              color="green"
              delay={0.1}
            />
            <AnimatedStatCard
              icon={Star}
              value={88}
              suffix="%"
              label="Konsumentów"
              sublabel="ufa recenzjom online"
              trend="↗ +5.3x konwersji"
              color="purple"
              delay={0.2}
            />
            <AnimatedStatCard
              icon={TrendingUp}
              value={320}
              suffix="%"
              label="Wzrost wyświetleń"
              sublabel="po optymalizacji GBP"
              trend="↗ Nasi klienci"
              color="orange"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Problem Amplification - Why It Matters */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-5 py-2.5 rounded-full text-sm font-medium mb-5">
              <AlertCircle className="w-4 h-4" />
              Problem
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Co Tracisz Bez Optymalizacji Google Business
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Każdego dnia setki potencjalnych klientów szuka usług jak Twoja. Czy ich znajdziesz?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-white p-8 rounded-xl border-2 border-red-100">
              <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-5">
                <Search className="w-7 h-7 text-red-600" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Niewidoczność w Wynikach
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Bez optymalizacji Twoja firma pojawia się dopiero na <span className="font-bold text-red-600">2-3 stronie wyników</span>.
                Klienci wybierają konkurencję, która jest wyżej.
              </p>
              <div className="text-2xl font-black text-red-600">-60% klientów</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-xl border-2 border-orange-100">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-5">
                <Star className="w-7 h-7 text-orange-600" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Niskie Oceny i Brak Recenzji
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                <span className="font-bold text-orange-600">92% użytkowników</span> czyta recenzje przed kontaktem.
                Bez zarządzania reputacją tracisz zaufanie.
              </p>
              <div className="text-2xl font-black text-orange-600">-45% konwersji</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl border-2 border-purple-100">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-5">
                <TrendingUp className="w-7 h-7 text-purple-600" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Stracone Przychody
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Nieoptymalizowany profil to <span className="font-bold text-purple-600">średnio 15-30 straconych klientów miesięcznie</span>.
                Policz ile to kosztuje Twój biznes.
              </p>
              <div className="text-2xl font-black text-purple-600">-3000+ zł/mies.</div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Konkurencja Nie Czeka
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Twoi konkurenci już optymalizują swoje profile. Każdy dzień bez działania to straceni klienci i przychody.
            </p>
            <a
              href="https://forms.fillout.com/t/xityvM2L42us"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white text-lg px-12 py-6 rounded-xl font-bold shadow-lg hover:scale-105 transition-all"
              >
                <Target className="w-5 h-5 mr-2" />
                Bezpłatny Audyt - Zobacz Gdzie Jesteś
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Before/After Visualization */}
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-[#007BFF] px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <TrendingUp className="w-4 h-4" />
              Transformacja
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
              Przed i Po Optymalizacji
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Zobacz jak Twoja pozycja może się zmienić w lokalnych wynikach wyszukiwania
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Ranking Visualizer */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
              <RankingVisualizer />
            </div>

            {/* Metrics Comparison */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Porównanie Wyników</h3>

                <div className="space-y-6">
                  {[
                    { label: 'Miesięczne wyświetlenia', before: 500, after: 2100, unit: '' },
                    { label: 'Telefony od klientów', before: 12, after: 45, unit: '' },
                    { label: 'Średnia ocena', before: 3.8, after: 4.7, unit: '⭐' },
                    { label: 'Liczba recenzji', before: 45, after: 120, unit: '' },
                    { label: 'Nawigacje do firmy', before: 25, after: 95, unit: '' }
                  ].map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-700">{metric.label}</span>
                        <span className="text-xs text-green-600 font-bold">
                          +{Math.round(((metric.after - metric.before) / metric.before) * 100)}%
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-500 mb-1">Przed</div>
                          <div className="text-lg font-bold text-gray-900">{metric.before}{metric.unit}</div>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border-2 border-green-200">
                          <div className="text-xs text-green-700 mb-1">Po</div>
                          <div className="text-lg font-bold text-green-600">{metric.after}{metric.unit}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6 text-lg flex items-center justify-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              Średnie wyniki naszych klientów po 3 miesiącach współpracy
            </p>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-5 py-2.5 rounded-full text-sm font-medium mb-5">
              <BarChart3 className="w-4 h-4" />
              Oblicz Swój Potencjał
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ile Możesz Zarobić Dzięki Optymalizacji?
            </h2>
            <p className="text-lg text-gray-600">
              Użyj kalkulatora, aby zobaczyć realny zwrot z inwestycji w Google Business Profile
            </p>
          </div>

          <ROICalculator />

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
              * Obliczenia bazują na średnich wynikach naszych klientów i danych branżowych
            </p>
            <a
              href="https://forms.fillout.com/t/xityvM2L42us"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg px-12 py-6 rounded-xl font-bold shadow-lg hover:scale-105 transition-all"
              >
                Chcę Te Wyniki - Zacznij Teraz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-5 py-2.5 rounded-full text-sm font-medium mb-5">
              <Award className="w-4 h-4" />
              Historie Sukcesu
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Realne Wyniki Naszych Klientów
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Zobacz jak inne firmy zwiększyły swoją widoczność i przychody
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CaseStudyCard
              business="Salon Fryzjerski Anna"
              industry="Beauty & Wellness"
              metric="wzrost rezerwacji online"
              increase="+340%"
              timeframe="Po 2 miesiącach"
            />
            <CaseStudyCard
              business="Serwis Samochodowy Pro"
              industry="Automotive"
              metric="więcej telefonów od klientów"
              increase="+280%"
              timeframe="Po 3 miesiącach"
            />
            <CaseStudyCard
              business="Restauracja Smaki"
              industry="Food & Dining"
              metric="wzrost wyświetleń profilu"
              increase="+450%"
              timeframe="Po 6 tygodniach"
            />
            <CaseStudyCard
              business="Dentysta Med+"
              industry="Healthcare"
              metric="nowych pacjentów miesięcznie"
              increase="+65"
              timeframe="Po 4 miesiącach"
            />
            <CaseStudyCard
              business="Studio Fitness Max"
              industry="Fitness"
              metric="nawigacji do lokalizacji"
              increase="+520%"
              timeframe="Po 2 miesiącach"
            />
            <CaseStudyCard
              business="Prawnik Jan Nowak"
              industry="Legal Services"
              metric="zapytań o konsultacje"
              increase="+190%"
              timeframe="Po 3 miesiącach"
            />
          </div>

          <div className="mt-12 bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Twoja Firma Może Być Następna</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Dołącz do ponad 50+ zadowolonych firm, które zwiększyły swoją widoczność i przychody dzięki optymalizacji Google Business Profile
            </p>
            <a
              href="https://calendly.com/info-yieldo/ai-recepcjonistka"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-white text-[#007BFF] hover:bg-gray-100 font-semibold py-6 text-lg px-12 rounded-xl"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Umów Bezpłatną Konsultację
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* What We Offer - Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#007BFF] px-5 py-2.5 rounded-full text-sm font-medium mb-5">
              <Zap className="w-4 h-4" />
              Co Oferujemy
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Kompleksowa Obsługa Google Business Profile
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wszystko czego potrzebujesz, aby zdominować lokalne wyniki wyszukiwania
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Search,
                title: 'Optymalizacja SEO',
                description: 'Słowa kluczowe, kategorie, opisy - wszystko dla maksymalnej widoczności w lokalnych wynikach',
                color: 'blue'
              },
              {
                icon: Star,
                title: 'Zarządzanie Recenzjami',
                description: 'Automatyczne prośby o opinie, profesjonalne odpowiedzi i strategia budowania pozytywnej reputacji',
                color: 'yellow'
              },
              {
                icon: MessageSquare,
                title: 'Posty i Aktualizacje',
                description: 'Regularne posty o promocjach, wydarzeniach i nowościach angażujące potencjalnych klientów',
                color: 'purple'
              },
              {
                icon: Target,
                title: 'Lokalne Kampanie',
                description: 'Precyzyjne targetowanie klientów w Twojej okolicy z dokładnością do kilometra',
                color: 'green'
              },
              {
                icon: BarChart3,
                title: 'Analityka i Raporty',
                description: 'Cotygodniowe raporty: wyświetlenia, kliknięcia, telefony, nawigacje i porównanie z konkurencją',
                color: 'blue'
              },
              {
                icon: Shield,
                title: 'Ochrona Reputacji',
                description: 'Monitoring negatywnych opinii, szybka reakcja na problemy i profesjonalna komunikacja kryzysowa',
                color: 'red'
              },
              {
                icon: Globe,
                title: 'Optymalizacja Zdjęć',
                description: 'Profesjonalne zdjęcia, optymalizacja nazw plików i geotagowanie dla lepszego rankingu',
                color: 'orange'
              },
              {
                icon: Users,
                title: 'Q&A Management',
                description: 'Monitorowanie i odpowiadanie na pytania klientów, tworzenie bazy FAQ',
                color: 'teal'
              },
              {
                icon: Clock,
                title: 'Konkurencja Analysis',
                description: 'Regularna analiza konkurencji i dostosowywanie strategii dla utrzymania przewagi',
                color: 'indigo'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border-2 border-gray-100 p-6 rounded-xl hover:shadow-xl transition-all hover:scale-105 group"
              >
                <div className={`w-14 h-14 bg-${feature.color}-50 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-600`} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup Process Timeline */}
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#007BFF] px-5 py-2.5 rounded-full text-sm font-medium mb-5">
              <Clock className="w-4 h-4" />
              Proces Wdrożenia
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Jak Wygląda Wdrożenie?
            </h2>
            <p className="text-lg text-gray-600 mb-3">
              Prosty, sprawdzony proces w 4 krokach
            </p>
            <p className="text-sm text-[#007BFF] font-semibold">
              ⚡ Start w 48 godzin po wypełnieniu formularza
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                step: '1',
                icon: Users,
                title: 'Bezpłatny Audyt',
                description: 'Analizujemy Twój obecny profil, sprawdzamy pozycję w wynikach i identyfikujemy wszystkie możliwości poprawy',
                highlight: false
              },
              {
                step: '2',
                icon: Wrench,
                title: 'Kompleksowa Optymalizacja',
                description: 'Dodajemy słowa kluczowe, optymalizujemy zdjęcia, uzupełniamy wszystkie sekcje i konfigurujemy zaawansowane funkcje',
                highlight: false
              },
              {
                step: '3',
                icon: Star,
                title: 'Uruchomienie Strategii',
                description: 'Startujemy z zarządzaniem recenzjami, regularnym publikowaniem postów i monitorowaniem konkurencji',
                highlight: false
              },
              {
                step: '4',
                icon: TrendingUp,
                title: 'Ciągła Optymalizacja',
                description: 'Cotygodniowe raporty, stała analiza wyników i dostosowywanie strategii dla maksymalnych rezultatów',
                highlight: true
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl shadow-lg transition-all hover:shadow-2xl ${
                  item.highlight
                    ? 'bg-gradient-to-br from-[#007BFF] to-[#0056b3] text-white'
                    : 'bg-white border-2 border-gray-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 text-xl font-bold ${
                  item.highlight ? 'bg-white/20 text-white' : 'bg-[#007BFF] text-white'
                }`}>
                  {item.step}
                </div>
                <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${
                  item.highlight ? 'text-white' : 'text-gray-900'
                }`}>
                  <item.icon className={`w-5 h-5 ${item.highlight ? 'text-white' : 'text-[#007BFF]'}`} />
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  item.highlight ? 'text-blue-100' : 'text-gray-600'
                }`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://forms.fillout.com/t/xityvM2L42us"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-[#007BFF] hover:bg-[#0056b3] text-white text-lg px-12 py-6 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Rozpocznij Współpracę
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-5 py-2.5 rounded-full text-sm font-medium mb-5">
              <Star className="w-4 h-4" />
              Cennik
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Proste, Przejrzyste Ceny
            </h2>
            <p className="text-lg text-gray-600">
              Jedna cena, wszystkie funkcje, maksymalne rezultaty
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#007BFF] to-[#0056b3] p-8 rounded-2xl shadow-2xl text-white relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-block bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold mb-4">
                    NAJPOPULARNIEJSZY
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Google Business Pro</h3>
                  <div className="flex items-baseline justify-center gap-2 mb-4">
                    <span className="text-5xl font-black">499</span>
                    <span className="text-xl text-blue-200">zł/mies.</span>
                  </div>
                  <p className="text-blue-100">Kompleksowa obsługa profilu</p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    'Pełna optymalizacja SEO profilu',
                    'Zarządzanie recenzjami (prośby + odpowiedzi)',
                    '4-6 postów miesięcznie',
                    'Cotygodniowe raporty analityczne',
                    'Monitoring konkurencji',
                    'Optymalizacja zdjęć',
                    'Q&A management',
                    'Ochrona reputacji 24/7',
                    'Priorytetowe wsparcie',
                    'Gwarancja +30% wyświetleń lub zwrot pieniędzy'
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <a
                  href="https://forms.fillout.com/t/xityvM2L42us"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="w-full bg-white text-[#007BFF] hover:bg-gray-100 font-bold py-6 text-lg hover:scale-105 transition-all"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Zacznij Teraz
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 flex items-center justify-center gap-2 flex-wrap">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Bez ukrytych kosztów
              <span className="text-gray-400">•</span>
              <span className="text-[#007BFF] font-bold">Start w 48h</span>
              <span className="text-gray-400">•</span>
              Anuluj w każdej chwili
            </p>
          </div>

          <div className="mt-12 bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
            <Shield className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              Gwarancja Wyników
            </h3>
            <p className="text-gray-700">
              Jeśli w ciągu <span className="font-bold text-green-600">3 miesięcy</span> nie zwiększymy Twoich miesięcznych wyświetleń o minimum <span className="font-bold text-green-600">30%</span>, zwrócimy pełną kwotę.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Najczęściej Zadawane Pytania
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Jak długo trwa wdrożenie?',
                a: 'Rozpoczynamy pracę w ciągu 48 godzin od wypełnienia formularza. Pełna optymalizacja profilu trwa 3-5 dni roboczych. Pierwsze rezultaty widoczne są już po 1-2 tygodniach.'
              },
              {
                q: 'Czy muszę mieć już profil Google Business?',
                a: 'Nie musisz! Możemy utworzyć nowy profil od podstaw lub zoptymalizować istniejący. Jeśli masz już profil, to świetnie - będzie nam łatwiej.'
              },
              {
                q: 'Co jeśli nie jestem zadowolony z wyników?',
                a: 'Oferujemy gwarancję wyników - minimum +30% wzrost wyświetleń w ciągu 3 miesięcy lub zwrot pieniędzy. Bez ryzyka dla Ciebie.'
              },
              {
                q: 'Czy muszę coś robić ze swojej strony?',
                a: 'Nie! My zajmujemy się wszystkim: optymalizacją, postami, odpowiadaniem na recenzje, raportami. Ty tylko obserwujesz wzrost liczby klientów.'
              },
              {
                q: 'Czy to zadziała w mojej branży?',
                a: 'Tak! Obsługujemy salony fryzjerskie, gabinety lekarskie, restauracje, serwisy samochodowe, prawników, fitness kluby i wiele innych. Każda lokalna firma może zyskać na optymalizacji GBP.'
              },
              {
                q: 'Czy mogę anulować w każdej chwili?',
                a: 'Tak, umowa jest miesięczna i możesz ją anulować w dowolnym momencie. Bez długoterminowych zobowiązań.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-3">
                  <ChevronDown className="w-5 h-5 text-[#007BFF] flex-shrink-0 mt-1" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 leading-relaxed pl-8">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="py-16 px-4 bg-gradient-to-br from-[#007BFF] to-[#0056b3] relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Gotowy Na Więcej Klientów?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Dołącz do firm, które zdominowały lokalne wyniki wyszukiwania. Zacznij już dziś!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Bezpłatny Audyt</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-black font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#007BFF]" />
                    Imię i Nazwisko
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent transition-all"
                    placeholder="Jan Kowalski"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-black font-semibold mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#007BFF]" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent transition-all"
                    placeholder="jan@firma.pl"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-black font-semibold mb-3 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#007BFF]" />
                    Numer Telefonu
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent transition-all"
                    placeholder="+48 123 456 789"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg py-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? "Wysyłanie..." : "Wyślij Zgłoszenie"}
                </Button>

                <div className="text-center text-gray-600 text-sm space-y-2">
                  <p className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Odpowiadamy w ciągu kilku godzin
                  </p>
                </div>
              </form>
            </div>

            {/* Benefits Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Co Otrzymasz</h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'Bezpłatny Audyt Profilu',
                    desc: 'Szczegółowa analiza obecnej pozycji i możliwości'
                  },
                  {
                    title: 'Spersonalizowana Strategia',
                    desc: 'Plan działania dostosowany do Twojej branży'
                  },
                  {
                    title: 'Gwarancja Wyników',
                    desc: '+30% wyświetleń lub zwrot pieniędzy'
                  },
                  {
                    title: 'Certyfikowani Eksperci',
                    desc: 'Partner Google z doświadczeniem 50+ firm'
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold mb-1">{benefit.title}</div>
                      <div className="text-sm text-blue-100">{benefit.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <a
                  href="https://calendly.com/info-yieldo/ai-recepcjonistka"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="w-full bg-white text-[#007BFF] hover:bg-gray-100 font-semibold py-6 text-lg group"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Lub Umów Rozmowę
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
