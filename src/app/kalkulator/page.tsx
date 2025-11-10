"use client"

import { Button } from "@/components/ui/button"
import { Phone, TrendingUp, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"
import Script from "next/script"

export default function CalculatorPage() {
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(20)
  const [avgTransactionValue, setAvgTransactionValue] = useState(150)

  const missedCallsPerMonth = missedCallsPerWeek * (52 / 12)
  const successfulTransactions = missedCallsPerMonth
  const monthlyLoss = successfulTransactions * avgTransactionValue
  const annualLoss = monthlyLoss * 12

  const formatNumber = (num: number) => num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  const calendlyUrl = "https://calendly.com/info-yieldo/ai-recepcjonistka"

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
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
                className="h-10 w-auto"
                priority
              />
            </Link>
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/ai-sekretarka" className="hidden sm:block text-sm font-semibold text-gray-700 hover:text-[#007BFF] transition-colors">
                AI Sekretarka
              </Link>
              <Link href="/kalkulator" className="hidden sm:block text-sm font-semibold text-[#007BFF]">
                Kalkulator
              </Link>
              <Link href="/login">
                <Button
                  size="sm"
                  className="bg-[#007BFF] hover:bg-[#0056b3] text-white text-sm px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all"
                >
                  Zaloguj
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight px-4">
            Ile Tracisz Przez
            <span className="text-[#007BFF] block mt-2">Nieodebrane Telefony?</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed px-4">
            Użyj kalkulatora, aby zobaczyć ile pieniędzy tracisz miesięcznie i rocznie przez nieodebrane połączenia od klientów.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="px-4 pb-6">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8 border border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
              Oblicz Swoje Straty Finansowe
            </h2>

            <div className="space-y-5">
              {/* Missed Calls */}
              <div className="bg-blue-50/30 rounded-xl p-4 space-y-3 border border-blue-100/50">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#007BFF]" />
                    </div>
                    <label className="text-base font-semibold text-gray-900">
                      Nieodebrane telefony (tygodniowo)
                    </label>
                  </div>
                  <input
                    type="number"
                    value={missedCallsPerWeek}
                    onChange={(e) => setMissedCallsPerWeek(Math.max(0, Math.min(100, Number(e.target.value))))}
                    className="w-20 h-10 text-center text-lg font-bold border-2 border-gray-200 focus:border-[#007BFF] rounded-lg transition-all bg-white"
                  />
                </div>
                <Slider
                  value={[missedCallsPerWeek]}
                  onValueChange={(val: number[]) => setMissedCallsPerWeek(val[0])}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Średnio ile połączeń tygodniowo nie odbierasz?
                </p>
              </div>

              {/* Average Transaction */}
              <div className="bg-green-50/30 rounded-xl p-4 space-y-3 border border-green-100/50">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <label className="text-base font-semibold text-gray-900">
                      Średnia wartość transakcji
                    </label>
                  </div>
                  <div className="relative w-32">
                    <input
                      type="number"
                      value={avgTransactionValue}
                      onChange={(e) => setAvgTransactionValue(Math.max(0, Math.min(5000, Number(e.target.value))))}
                      className="w-full h-10 text-center text-lg font-bold border-2 border-gray-200 focus:border-[#007BFF] rounded-lg pr-10 transition-all bg-white"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 pointer-events-none">
                      zł
                    </span>
                  </div>
                </div>
                <Slider
                  value={[avgTransactionValue]}
                  onValueChange={(val: number[]) => setAvgTransactionValue(val[0])}
                  max={5000}
                  step={50}
                  className="cursor-pointer"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Ile wynosi średnia wartość usługi/produktu?
                </p>
              </div>

              {/* Results */}
              <div className="bg-gradient-to-br from-red-50 via-red-50 to-orange-50 rounded-2xl p-5 sm:p-6 border-2 border-red-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 uppercase tracking-wide">
                      Twoje Straty Finansowe
                    </h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Tracisz miesięcznie:</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl md:text-5xl font-black text-red-600">
                          {formatNumber(monthlyLoss)}
                        </span>
                        <span className="text-lg sm:text-xl font-bold text-gray-700">zł</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Tracisz rocznie:</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl md:text-5xl font-black text-red-600">
                          {formatNumber(annualLoss)}
                        </span>
                        <span className="text-lg sm:text-xl font-bold text-gray-700">zł</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-red-200 mb-4">
                    <p className="text-sm text-gray-700 font-medium">
                      💡 Z AI Sekretarką możesz odzyskać nawet <span className="text-red-600 font-bold">80-90%</span> tych strat!
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <a
                      href={calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        size="lg"
                        className="w-full bg-[#007BFF] hover:bg-[#0056b3] text-white text-base sm:text-lg px-6 py-5 sm:py-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                      >
                        Zamów Demo Teraz
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </a>
                    <Link href="/ai-sekretarka" className="flex-1">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-base sm:text-lg px-6 py-5 sm:py-6 rounded-lg font-semibold transition-all"
                      >
                        Dowiedz Się Więcej
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-4 pb-6 mt-10">
        <div className="container mx-auto max-w-2xl">
          <div
            style={{ width: '100%', minHeight: '500px' }}
            data-fillout-id="teKGg5hwJpus"
            data-fillout-embed-type="standard"
            data-fillout-inherit-parameters
            data-fillout-dynamic-resize
          />
          <Script
            src="https://server.fillout.com/embed/v1/"
            strategy="lazyOnload"
          />
        </div>
      </section>

      {/* Bottom CTA Section - Simplified on mobile */}
      <section className="px-4 pb-8">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center text-white shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
              Gotowy Zatrzymać Te Straty?
            </h2>
            <p className="text-base sm:text-lg text-blue-100 mb-4 sm:mb-6 max-w-2xl mx-auto">
              AI Sekretarka odbierze każde połączenie, umówi klienta i wyśle potwierdzenie SMS. Wszystko automatycznie, 24/7.
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-blue-100 mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Wdrożenie w kilka godzin</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Od 299 zł/miesiąc</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>ROI w 1 tydzień</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Yieldo"
              width={120}
              height={40}
              className="h-10 w-auto mx-auto mb-3"
            />
          </Link>
          <p className="text-gray-600 mb-2">
            Agencja AI dla Nowoczesnych Firm
          </p>
          <p className="text-sm text-gray-500">
            © 2025 Yieldo. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </div>
  )
}
