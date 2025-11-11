"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Clock, CheckCircle2, Sparkles, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative flex-1 flex items-center justify-center py-16 px-4 pt-28 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23007BFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#007BFF] px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              AI Recepcjonistka dla Twojej Firmy
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1]">
              Nigdy Nie Trać Klienta przez{' '}
              <span className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] bg-clip-text text-transparent">
                Nieodebrany Telefon
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              <strong className="text-gray-900">AI Sekretarka</strong> odbiera 24/7, umawia wizyty automatycznie i wysyła SMS-y.{' '}
              <span className="text-[#007BFF] font-semibold">Konfiguracja w 5 minut.</span>
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Obsługa 24/7</p>
                  <p className="text-sm text-gray-600">Zawsze dostępna dla klientów</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Automatyczne Rezerwacje</p>
                  <p className="text-sm text-gray-600">Umawia wizyty bez Twojej pomocy</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">SMS Powiadomienia</p>
                  <p className="text-sm text-gray-600">Informuje Cię o każdej rozmowie</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Integracje</p>
                  <p className="text-sm text-gray-600">Google Calendar i Booksy</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="https://forms.fillout.com/t/xityvM2L42us"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl px-12 py-7 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all hover:scale-105 group"
                >
                  <Zap className="w-6 h-6 mr-2 group-hover:animate-pulse" />
                  Rozpocznij Bezpłatnie
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
                  className="border-2 border-[#007BFF] text-[#007BFF] hover:bg-blue-50 text-xl px-10 py-7 rounded-xl font-semibold transition-all group"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Zobacz Demo
                </Button>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-3 h-3 text-green-600" />
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
                <span className="text-lg">🇵🇱</span>
                <span className="font-medium">Zgodne z RODO</span>
              </div>
            </div>
          </div>

          {/* Right: Visual/Stats */}
          <div className="relative">
            {/* Phone Mockup or Stats Display */}
            <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-8 border border-gray-100">
              {/* Live Stats Display */}
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Aktywne Teraz
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">AI Sekretarka w Akcji</h3>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                    <div className="text-3xl font-bold text-[#007BFF] mb-1">24/7</div>
                    <div className="text-sm text-gray-600">Dostępność</div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                    <div className="text-3xl font-bold text-green-600 mb-1">&lt;3s</div>
                    <div className="text-sm text-gray-600">Czas odpowiedzi</div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                    <div className="text-3xl font-bold text-purple-600 mb-1">99%</div>
                    <div className="text-sm text-gray-600">Skuteczność</div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                    <div className="text-3xl font-bold text-orange-600 mb-1">20+</div>
                    <div className="text-sm text-gray-600">Firm</div>
                  </div>
                </div>

                {/* Features List */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-4">Co Robi AI Sekretarka?</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#007BFF]" />
                      <span className="text-sm text-gray-700">Odbiera telefony po polsku</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Umawia wizyty automatycznie</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-gray-700">Wysyła SMS z potwierdzeniem</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 bg-blue-100 text-[#007BFF] px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
              Od 299 zł/mies.
            </div>
            <div className="absolute -bottom-4 -right-4 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              ✓ 100 Rozmów w cenie
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
