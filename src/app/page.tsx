"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, Brain, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-black">
              Yieldo<span style={{ color: "var(--blue-accent)" }}>.ai</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/ai-sekretarka" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                AI Sekretarka
              </Link>
              <Button style={{ backgroundColor: "var(--blue-accent)" }} className="text-white hover:opacity-90">
                Kontakt
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Agencja <span style={{ color: "var(--blue-accent)" }}>AI</span> dla Nowoczesnych Firm
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Automatyzujemy procesy biznesowe za pomocą sztucznej inteligencji. Zwiększ efektywność, obniż koszty i rozwijaj się bez limitów.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ai-sekretarka">
                <Button size="lg" className="text-lg px-8 py-6 text-white" style={{ backgroundColor: "var(--blue-accent)" }}>
                  Poznaj AI Sekretarkę
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-black text-black hover:bg-gray-50">
                Wszystkie Usługi
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-12 text-center">
            Nasze <span style={{ color: "var(--blue-accent)" }}>Rozwiązania AI</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link href="/ai-sekretarka" className="group">
              <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-[var(--blue-accent)] transition-all duration-300 hover:shadow-lg h-full">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "var(--blue-accent)", opacity: 0.1 }}>
                  <Bot className="h-6 w-6" style={{ color: "var(--blue-accent)" }} />
                </div>
                <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[var(--blue-accent)] transition-colors">
                  AI Sekretarka
                </h3>
                <p className="text-gray-600 mb-4">
                  Automatyczna obsługa połączeń 24/7. Twój biznes nigdy nie śpi.
                </p>
                <span className="text-[var(--blue-accent)] font-medium inline-flex items-center">
                  Dowiedz się więcej
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            <div className="bg-white p-8 rounded-xl border-2 border-gray-200 opacity-75">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gray-100">
                <Brain className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-400 mb-3">
                AI Asystent
              </h3>
              <p className="text-gray-400 mb-4">
                Inteligentny asystent do automatyzacji zadań i procesów.
              </p>
              <span className="text-gray-400 font-medium">
                Wkrótce
              </span>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-gray-200 opacity-75">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gray-100">
                <Sparkles className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-400 mb-3">
                AI Analytics
              </h3>
              <p className="text-gray-400 mb-4">
                Zaawansowana analityka biznesowa powered by AI.
              </p>
              <span className="text-gray-400 font-medium">
                Wkrótce
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/" className="text-2xl font-bold text-black inline-block mb-4">
              Yieldo<span style={{ color: "var(--blue-accent)" }}>.ai</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Agencja AI dla Nowoczesnych Firm
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Yieldo AI Agency. Wszystkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}