"use client"

import { Button } from "@/components/ui/button"
import { Phone, Search, ArrowRight, Globe, MapPin, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/ui/navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section - Centered with top padding for fixed navbar */}
      <section className="flex-1 flex items-center justify-center py-8 px-4 pt-24">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
          <Image
              src="/logo.png"
              alt="Yieldo"
              width={120}
              height={40}
              className="h-8 md:h-12 w-auto mx-auto mb-6"
              priority
            />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Wszystko, Czego Potrzebujesz Do Rozwoju Firmy
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Kompleksowe rozwiązania AI - od obsługi klientów, przez tworzenie stron, po automatyzację dotacji
            </p>
          </div>

          {/* Modules Grid - 2x2 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* AI Sekretarka - Available */}
            <Link href="/ai-sekretarka" className="group">
              <div className="bg-gradient-to-br from-[#007BFF] to-[#0056b3] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-white relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    AI Sekretarka
                  </h3>
                  <p className="text-blue-100 mb-6 text-sm leading-relaxed">
                    Automatyczna obsługa telefonów 24/7. Rozmawia, pamięta klientów i umawia spotkania.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Dostępne Teraz
                  </div>
                  <div className="flex items-center text-white font-semibold group-hover:gap-3 transition-all">
                    Odkryj Moduł
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Website Creation - NEW */}
            <Link href="/website-creation" className="group">
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-white relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute top-4 right-4 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  NOWOŚĆ
                </div>
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    Tworzenie Stron WWW
                  </h3>
                  <p className="text-purple-100 mb-6 text-sm leading-relaxed">
                    Profesjonalna strona internetowa w 24h. Responsywna, szybka i gotowa do działania.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Dostępne Teraz
                  </div>
                  <div className="flex items-center text-white font-semibold group-hover:gap-3 transition-all">
                    Odkryj Moduł
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Google Business Listings - NEW */}
            <Link href="/google-business" className="group">
              <div className="bg-gradient-to-br from-green-600 to-green-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-white relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute top-4 right-4 bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  NOWOŚĆ
                </div>
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    Google Business Profile
                  </h3>
                  <p className="text-green-100 mb-6 text-sm leading-relaxed">
                    Optymalizacja wizytówki Google. Zwiększ widoczność lokalną i przyciągnij więcej klientów.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Dostępne Teraz
                  </div>
                  <div className="flex items-center text-white font-semibold group-hover:gap-3 transition-all">
                    Odkryj Moduł
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Grant Radar - Coming Soon */}
            <div className="bg-white p-8 rounded-2xl shadow-md border-2 border-gray-200 relative hover:shadow-lg transition-all duration-300">
              <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                Wkrótce
              </div>
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Automatyzacja Dotacji
              </h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Znajdź idealne dotacje i granty dla swojej firmy automatycznie.
              </p>
              <div className="text-gray-400 font-medium">
                W przygotowaniu
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Gotowy Na Rozwój Firmy?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Wybierz jedno rozwiązanie lub skorzystaj z kompleksowego pakietu wszystkich narzędzi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://calendly.com/info-yieldo/ai-recepcjonistka"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] hover:from-[#0056b3] hover:to-[#003d82] text-white text-lg px-10 py-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Zamów Bezpłatną Konsultację
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link href="/ai-sekretarka">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-lg px-10 py-6 rounded-lg font-semibold transition-all"
                >
                  Dowiedz Się Więcej
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 bg-white mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Yieldo. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </div>
  )
}
