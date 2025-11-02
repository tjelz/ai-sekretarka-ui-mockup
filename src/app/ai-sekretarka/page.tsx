"use client"

import { Button } from "@/components/ui/button"
import { Phone, Calendar, MessageSquare, Shield, Clock, Zap, TrendingUp, CheckCircle2, Users, Settings, ArrowRight, Star, Sparkles, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import Image from "next/image"
import LostRevenueCalculator from "../components/LostRevenueCalculator"
import { Slider } from "@/components/ui/slider"

// Inline Calculator Component
function InlineCalculator() {
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(20)
  const [avgTransactionValue, setAvgTransactionValue] = useState(150)
  const [noShowPercentage, setNoShowPercentage] = useState(15)

  const missedCallsPerMonth = missedCallsPerWeek * (52 / 12)
  const successfulTransactions = missedCallsPerMonth * (1 - noShowPercentage / 100)
  const monthlyLoss = successfulTransactions * avgTransactionValue
  const annualLoss = monthlyLoss * 12

  const formatNumber = (num: number) => num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Kalkulator Oszczędności</h3>

      <div className="space-y-6">
        {/* Missed Calls */}
        <div className="bg-blue-50/30 rounded-xl p-4 space-y-3 border border-blue-100/50">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-[#007BFF]" />
              </div>
              <label className="text-sm font-semibold text-gray-900">
                Nieodebrane telefony (tygodniowo)
              </label>
            </div>
            <input
              type="number"
              value={missedCallsPerWeek}
              onChange={(e) => setMissedCallsPerWeek(Math.max(0, Math.min(100, Number(e.target.value))))}
              className="w-16 h-9 text-center text-base font-bold border-2 border-gray-200 focus:border-[#007BFF] rounded-lg transition-all bg-white"
            />
          </div>
          <Slider
            value={[missedCallsPerWeek]}
            onValueChange={(val: number[]) => setMissedCallsPerWeek(val[0])}
            max={100}
            step={1}
            className="cursor-pointer"
          />
        </div>

        {/* Average Transaction */}
        <div className="bg-green-50/30 rounded-xl p-4 space-y-3 border border-green-100/50">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <label className="text-sm font-semibold text-gray-900">
                Średnia wartość transakcji
              </label>
            </div>
            <div className="relative w-20">
              <input
                type="number"
                value={avgTransactionValue}
                onChange={(e) => setAvgTransactionValue(Math.max(0, Math.min(500, Number(e.target.value))))}
                className="w-full h-9 text-center text-base font-bold border-2 border-gray-200 focus:border-[#007BFF] rounded-lg pr-8 transition-all bg-white"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 pointer-events-none">
                zł
              </span>
            </div>
          </div>
          <Slider
            value={[avgTransactionValue]}
            onValueChange={(val: number[]) => setAvgTransactionValue(val[0])}
            max={500}
            step={5}
            className="cursor-pointer"
          />
        </div>

        {/* No-Show % */}
        <div className="bg-orange-50/30 rounded-xl p-4 space-y-3 border border-orange-100/50">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-orange-600" />
              </div>
              <label className="text-sm font-semibold text-gray-900">
                Procent niestawiennictwa
              </label>
            </div>
            <div className="relative w-16">
              <input
                type="number"
                value={noShowPercentage}
                onChange={(e) => setNoShowPercentage(Math.max(0, Math.min(50, Number(e.target.value))))}
                className="w-full h-9 text-center text-base font-bold border-2 border-gray-200 focus:border-[#007BFF] rounded-lg pr-7 transition-all bg-white"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 pointer-events-none">%</span>
            </div>
          </div>
          <Slider
            value={[noShowPercentage]}
            onValueChange={(val: number[]) => setNoShowPercentage(val[0])}
            max={50}
            step={1}
            className="cursor-pointer"
          />
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200/20 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 text-[#007BFF]" />
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Twoje straty finansowe
              </h4>
            </div>
            <div className="mb-4">
              <p className="text-xs text-gray-600 mb-1">Miesięcznie tracisz:</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-gray-900">
                  {formatNumber(monthlyLoss)}
                </span>
                <span className="text-lg font-bold text-gray-600">zł</span>
              </div>
            </div>
            <div className="pt-4 border-t-2 border-blue-200">
              <p className="text-xs text-gray-600 mb-1">Rocznie tracisz:</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#007BFF]">
                  {formatNumber(annualLoss)}
                </span>
                <span className="text-base font-bold text-[#007BFF]">zł</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-xl bg-gray-50">
            <div className="text-2xl font-black text-[#007BFF] mb-1">
              {Math.round(successfulTransactions)}
            </div>
            <p className="text-xs text-gray-600 font-medium leading-tight">
              Utraconych transakcji/m-c
            </p>
          </div>
          <div className="text-center p-3 rounded-xl bg-gray-50">
            <div className="text-2xl font-black text-[#007BFF] mb-1">
              {missedCallsPerWeek}
            </div>
            <p className="text-xs text-gray-600 font-medium leading-tight">
              Nieodebranych połączeń/tydz.
            </p>
          </div>
          <div className="text-center p-3 rounded-xl bg-gray-50">
            <div className="text-2xl font-black text-[#007BFF] mb-1">
              {noShowPercentage}%
            </div>
            <p className="text-xs text-gray-600 font-medium leading-tight">
              Niestawiennictwo
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AISekretarkaPage() {
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

      // Reset form
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
            <Image
              src="/logo.png"
              alt="Yieldo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <div className="flex items-center gap-4">
              <a href="#contact" className="text-sm font-semibold text-gray-700 hover:text-[#007BFF] transition-colors">
                Kontakt
              </a>
              <a href="#pricing" className="text-sm font-semibold text-gray-700 hover:text-[#007BFF] transition-colors">
                Cennik
              </a>
              <Link href="/login">
                <Button
                  size="sm"
                  className="bg-[#007BFF] hover:bg-[#0056b3] text-white text-sm px-6 py-2 rounded-lg font-semibold transition-all"
                >
                  Zaloguj
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#007BFF] px-5 py-2.5 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Automatyczna AI Recepcjonistka
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            AI Sekretarka Odbiera Telefony
            <span className="text-[#007BFF] block mt-2">24/7 i Umawia Klientów</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Dla małych firm, salonów beauty i usług – rozmawia naturalnym głosem, pamięta klientów, automatycznie zapisuje terminy i wysyła SMS-y. Przełącza się między głosem a tekstem bezproblemowo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
            <a href="#contact">
              <Button
                size="lg"
                className="bg-[#007BFF] hover:bg-[#0056b3] text-white text-base px-8 py-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Zamów Demo
              </Button>
            </a>
            <a href="#pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-base px-8 py-6 rounded-lg font-semibold transition-all"
              >
                Zobacz Cennik
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gray-400" />
              <span>Bez kart kredytowych</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gray-400" />
              <span>Szybkie wdrożenie</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gray-400" />
              <span>Zgodne z RODO</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 px-4 bg-[#007BFF] text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-1">99.9%</div>
              <div className="text-blue-100 text-xs sm:text-sm">Dostępność</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-1">&lt;3s</div>
              <div className="text-blue-100 text-xs sm:text-sm">Czas odpowiedzi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-1">24/7</div>
              <div className="text-blue-100 text-xs sm:text-sm">Wsparcie</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-1">50+</div>
              <div className="text-blue-100 text-xs sm:text-sm">Zadowolonych firm</div>
            </div>
          </div>
        </div>
      </section>

      <LostRevenueCalculator />


      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#007BFF] px-5 py-2.5 rounded-full text-sm font-medium mb-5">
              <Zap className="w-4 h-4" />
              Funkcje
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Funkcje AI Sekretarki
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wszystko czego potrzebujesz, aby nigdy nie stracić żadnego klienta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1 */}
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-5">
                <Phone className="w-7 h-7 text-[#007BFF]" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Odbieranie 24/7
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                AI rozumie po polsku, odpowiada na pytania o ceny, terminy i usługi
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center mb-5">
                <Calendar className="w-7 h-7 text-green-600" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Automatyczne Rezerwacje
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Wpisywanie terminów do kalendarza (Google Calendar lub Booksy)
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-50 rounded-lg flex items-center justify-center mb-5">
                <MessageSquare className="w-7 h-7 text-purple-600" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                SMS Podsumowania
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Wysyła skrót rozmowy do właściciela, np. "Klient Anna, wizyta pt 15:00"
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-5">
                <Shield className="w-7 h-7 text-orange-600" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Bezpieczne i Proste
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Zgodne z RODO, łatwa konfiguracja w kilka minut
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#007BFF] px-5 py-2.5 rounded-full text-sm font-medium mb-5">
              <Clock className="w-4 h-4" />
              Wdrożenie
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Jak Wygląda Wdrożenie AI Sekretarki
            </h2>
            <p className="text-lg text-gray-600 mb-3">
              Prosty proces w 4 krokach – gotowe w kilka godzin
            </p>
            <p className="text-sm text-[#007BFF] font-semibold">
              ⚡ Wszystko gotowe w kilka godzin po wypełnieniu formularza
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-[#007BFF] rounded-lg flex items-center justify-center mb-5 text-white text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#007BFF]" />
                Wypełnij Formularz
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Podajesz dane firmy: usługi, ceny, godziny pracy i preferencje
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 relative">
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                AUTO
              </div>
              <div className="w-12 h-12 bg-[#007BFF] rounded-lg flex items-center justify-center mb-5 text-white text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#007BFF]" />
                Automatyczna Konfiguracja
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                System automatycznie konfiguruje AI, numer telefonu i integracje
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 relative">
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                AUTO
              </div>
              <div className="w-12 h-12 bg-[#007BFF] rounded-lg flex items-center justify-center mb-5 text-white text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#007BFF]" />
                Testy i Weryfikacja
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                System automatycznie testuje połączenia i gotowość do pracy
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#007BFF] to-[#0056b3] p-6 rounded-xl shadow-md text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-5 text-white text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Start w Kilka Godzin!
              </h3>
              <p className="text-sm text-blue-100 leading-relaxed">
                AI gotowa do pracy – Twój biznes nigdy nie śpi!
              </p>
            </div>
          </div>

          <div className="text-center">
            <a href="#contact">
              <Button
                size="lg"
                className="bg-[#007BFF] hover:bg-[#0056b3] text-white text-base px-10 py-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Rozpocznij Teraz
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Call Example Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-[#007BFF] px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <MessageSquare className="w-4 h-4" />
              Przykład
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
              Przykładowa Rozmowa z AI Sekretarką
            </h2>
          </div>
          
          <div className="bg-gradient-to-br from-white to-blue-50 border-2 border-[#007BFF]/20 p-10 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-md flex-1">
                <p className="text-black">Dzień dobry, chcę umówić strzyżenie na piątek.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 justify-end">
              <div className="bg-gradient-to-br from-[#007BFF] to-[#0056b3] p-4 rounded-2xl rounded-tr-none shadow-md flex-1 max-w-md">
                <p className="text-white">Dzień dobry! Wolny termin na piątek o 15:00. Czy pasuje?</p>
              </div>
              <div className="w-10 h-10 bg-[#007BFF] rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-md flex-1">
                <p className="text-black">Tak, na imię Anna.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 justify-end">
              <div className="bg-gradient-to-br from-[#007BFF] to-[#0056b3] p-4 rounded-2xl rounded-tr-none shadow-md flex-1 max-w-md">
                <p className="text-white">Zarezerwowano! Wysyłam SMS potwierdzenie. Dziękujemy!</p>
              </div>
              <div className="w-10 h-10 bg-[#007BFF] rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          
          <p className="text-center text-gray-600 mt-8 text-lg flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            AI może ustalić termin wizyty, sprawdzić ceny, potwierdzić i wysłać SMS
          </p>
        </div>
      </section>

      {/* Savings Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-[#007BFF] px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <TrendingUp className="w-4 h-4" />
              Oszczędności
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
              Ile Zaoszczędzisz z AI Sekretarką
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#007BFF]" />
                </div>
                <div>
                  <h3 className="font-bold text-black mb-2">Oszczędność czasu</h3>
                  <p className="text-gray-600 leading-relaxed">
                    <span className="text-[#007BFF] font-bold">2-3 godziny dziennie</span> na odbieranie tel (wartość: <span className="text-[#007BFF] font-bold">100-200 zł/dzień</span>)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-black mb-2">Więcej klientów</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Mniej straconych połączeń = <span className="text-[#007BFF] font-bold">+10-20% rezerwacji</span> (dodatkowe <span className="text-[#007BFF] font-bold">500-1000 zł/mies.</span>)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-black mb-2">Koszt vs. Zysk</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Zamiast zatrudniać recepcjonistkę (<span className="text-[#007BFF] font-bold">2000 zł/mies.</span>), płacisz <span className="text-[#007BFF] font-bold">199 zł/mies.</span> – ROI w <span className="text-[#007BFF] font-bold">1 tydzień</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#007BFF] to-[#0056b3] p-8 rounded-2xl shadow-lg text-white hover:shadow-2xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Kalkulator</h3>
                  <p className="leading-relaxed">
                    Dla salonu z <span className="font-bold">20 tel/dzień</span>: Zaoszczędź <span className="font-bold text-2xl">3000 zł/mies.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg px-12 py-7 rounded-full font-semibold"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Oblicz Swoje Oszczędności
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#007BFF] px-5 py-2.5 rounded-full text-sm font-medium mb-5">
              <Star className="w-4 h-4" />
              Cennik
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Cennik AI Sekretarki
            </h2>
            <p className="text-lg text-gray-600">
              Proste, przejrzyste ceny bez ukrytych kosztów
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {/* Pricing Card 1 */}
            <div className="bg-white border-2 border-gray-200 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <Settings className="w-7 h-7 text-[#007BFF]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Konfiguracja
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#007BFF]">499 zł</span>
                <span className="text-gray-600 ml-2">jednorazowo</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Pełna personalizacja pod Twoje wymagania – gotowe do działania w kilka godzin
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Dostosowanie do Twoich potrzeb
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Integracja z kalendarzem
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Wdrożenie w kilka godzin
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Pełne szkolenie
                </li>
              </ul>
            </div>

            {/* Pricing Card 2 - Featured */}
            <div className="bg-gradient-to-br from-[#007BFF] to-[#0056b3] p-8 rounded-2xl shadow-xl text-white">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Miesięczny Abonament
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-bold">199 zł</span>
                <span className="text-blue-100 ml-2">/miesiąc</span>
              </div>
              <p className="text-blue-100 leading-relaxed mb-6">
                Pełna obsługa, wsparcie i nieograniczone rozmowy
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  24/7 obsługa połączeń
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  24/7 wsparcie techniczne
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  Nieograniczone SMS-y
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  Regularne aktualizacje
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-6 flex items-center justify-center gap-2 flex-wrap">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Bez ukrytych kosztów
              <span className="text-gray-400">•</span>
              <span className="text-[#007BFF] font-bold">Szybki start</span>
              <span className="text-gray-400">•</span>
              Anuluj w każdej chwili
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg px-12 py-7 rounded-full font-semibold group"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Rozpocznij
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section id="contact" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#007BFF] px-5 py-2.5 rounded-full text-sm font-medium mb-5">
              <Phone className="w-4 h-4" />
              Kontakt & Kalkulator
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Zamów Demo i Oblicz Swoje Oszczędności
            </h2>
            <p className="text-lg text-gray-600">
              Wypełnij formularz i zobacz ile możesz zaoszczędzić
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Formularz Kontaktowy</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-black font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#007BFF]" />
                    Imię
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
                  className="w-full bg-[#007BFF] hover:bg-[#0056b3] text-white text-lg py-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? "Wysyłanie..." : "Wyślij Zgłoszenie"}
                </Button>

                <div className="text-center text-gray-600 text-sm space-y-2">
                  <p className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Odpowiadamy w ciągu kilku godzin
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    24/7 wsparcie techniczne po wdrożeniu
                  </p>
                </div>
              </form>
            </div>

            {/* Calculator */}
            <InlineCalculator />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Image
              src="/logo.png"
              alt="Yieldo"
              width={120}
              height={40}
              className="h-10 w-auto mx-auto mb-4"
            />
            <p className="text-gray-600 mb-6">
              Agencja AI dla Nowoczesnych Firm
            </p>
            <p className="text-sm text-gray-500">
              © 2025 Yieldo. Wszystkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}