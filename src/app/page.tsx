"use client"

import { Button } from "@/components/ui/button"
import { Phone, TrendingUp, Search, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-20">
            <div className="text-2xl font-bold text-black flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              Yieldo
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Centered */}
      <section className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Ekosystem <span className="text-[#007BFF]">Yieldo</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
              Kompleksowe rozwiązania AI dla rozwoju Twojego biznesu
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                    Automatyczna obsługa telefonów 24/7. Rozmawia, pamięta klientów i umawia wizyty.
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

            {/* Company Booster - Coming Soon */}
            <div className="bg-white p-8 rounded-2xl shadow-md border-2 border-gray-200 relative">
              <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                Wkrótce
              </div>
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Company Booster
              </h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Zwiększ sprzedaż i efektywność działań marketingowych dzięki AI.
              </p>
              <div className="text-gray-400 font-medium">
                W przygotowaniu
              </div>
            </div>

            {/* Grant Radar - Coming Soon */}
            <div className="bg-white p-8 rounded-2xl shadow-md border-2 border-gray-200 relative">
              <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                Wkrótce
              </div>
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Grant Radar
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
            <Link href="/ai-sekretarka">
              <Button
                size="lg"
                className="bg-[#007BFF] hover:bg-[#0056b3] text-white text-lg px-10 py-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Zacznij od AI Sekretarki
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 bg-white mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            ©2025 Yieldo Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </div>
  )
}
