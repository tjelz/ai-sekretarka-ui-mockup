"use client"

import { Button } from "@/components/ui/button"
import { Phone, Calendar, MessageSquare, Shield, Clock, Zap, TrendingUp, CheckCircle2, Users, Settings, ArrowRight, Sparkles, Star } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

export default function AISekretarkaPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      toast.success("Zgłoszenie wysłane!", {
        description: "Skontaktujemy się z Tobą wkrótce."
      })

      // Reset form
      setFormData({ name: "", email: "", phone: "" })
    } catch (error) {
      toast.error("Wystąpił błąd", {
        description: "Spróbuj ponownie później lub skontaktuj się z nami bezpośrednio."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Modern Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-2xl font-bold text-black flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              Yieldo<span className="text-[#007BFF]">.ai</span>
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/ai-sekretarka" className="text-sm font-semibold text-[#007BFF] hover:text-[#0056b3] transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" />
                AI Sekretarka
              </Link>
              <Button className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-full px-6">
                <MessageSquare className="w-4 h-4 mr-2" />
                Kontakt
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Gradient */}
      <section className="py-20 sm:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#007BFF]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#007BFF]/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-[#007BFF] px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-md">
            <Zap className="w-4 h-4" />
            Automatyczna AI Recepcjonistka
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-8 leading-tight">
            AI Sekretarka Odbiera Telefony
            <span className="text-[#007BFF] block mt-2">24/7 i Umawia Klientów</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Dla małych firm, salonów beauty i usług – automatycznie zapisuje terminy, wysyła SMS-y i nigdy nie traci klientów
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg px-10 py-7 rounded-full font-semibold group"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Rozpocznij Teraz
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white transition-all duration-300 text-lg px-10 py-7 rounded-full font-semibold"
            >
              <Phone className="w-5 h-5 mr-2" />
              Zobacz Demo
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Bez kart kredytowych</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Szybkie wdrożenie</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Zgodne z RODO</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100 text-sm">Dostępność</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">&lt;3s</div>
              <div className="text-blue-100 text-sm">Czas odpowiedzi</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100 text-sm">Wsparcie</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100 text-sm">Zadowolonych firm</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-[#007BFF] px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4" />
              Funkcje
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
              Funkcje AI Sekretarki
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wszystko czego potrzebujesz, aby nigdy nie stracić żadnego klienta
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-2xl hover:scale-105 hover:border-[#007BFF] transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-[#007BFF]" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                Odbieranie 24/7
              </h3>
              <p className="text-gray-600 leading-relaxed">
                AI rozumie po polsku, odpowiada na pytania o ceny, terminy i usługi
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-2xl hover:scale-105 hover:border-[#007BFF] transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8 text-green-600" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                Automatyczne Rezerwacje
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Wpisywanie terminów do kalendarza (Google Calendar lub Booksy)
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-2xl hover:scale-105 hover:border-[#007BFF] transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8 text-purple-600" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                SMS Podsumowania
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Wysyła skrót rozmowy do właściciela, np. "Klient Anna, wizyta pt 15:00"
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-2xl hover:scale-105 hover:border-[#007BFF] transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-orange-600" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                Bezpieczne i Proste
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Zgodne z RODO, łatwa konfiguracja w kilka minut
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-[#007BFF] px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <Settings className="w-4 h-4" />
              Wdrożenie
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
              Jak Wygląda Wdrożenie AI Sekretarki
            </h2>
            <p className="text-xl text-gray-600">
              Prosty proces w 4 krokach – od kontaktu do działającej AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-xl flex items-center justify-center mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-[#007BFF]" />
                Pierwszy Kontakt
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Kontaktujesz się z nami – podajesz dane firmy (usługi, ceny, godziny).
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-xl flex items-center justify-center mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6 text-[#007BFF]" />
                Konfiguracja AI
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Konfigurujemy AI (numer Twilio, integracja kalendarza) – trwa 1-2 dni.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-xl flex items-center justify-center mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-[#007BFF]" />
                Testy i Szkolenie
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Testujemy połączenia i szkolimy Cię (SMS-y, logi).
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-xl flex items-center justify-center mb-6 text-white text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-[#007BFF]" />
                Start!
              </h3>
              <p className="text-gray-600 leading-relaxed">
                AI działa, płacisz po wdrożeniu. Twój biznes nigdy nie śpi!
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg px-12 py-7 rounded-full font-semibold group"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Rozpocznij Wdrożenie
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
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
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-[#007BFF] px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4" />
              Cennik
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
              Cennik AI Sekretarki
            </h2>
            <p className="text-xl text-gray-600">
              Proste, przejrzyste ceny bez ukrytych kosztów
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            {/* Pricing Card 1 */}
            <div className="bg-white border-2 border-gray-200 p-10 rounded-3xl hover:shadow-2xl hover:border-[#007BFF] transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Settings className="w-7 h-7 text-[#007BFF]" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Wdrożenie
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#007BFF]">499 zł</span>
                <span className="text-gray-600 ml-2">jednorazowo</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Konfiguracja i testy – wszystko gotowe w 1-2 dni
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Pełna konfiguracja
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Integracja kalendarza
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Szkolenie zespołu
                </li>
              </ul>
            </div>

            {/* Pricing Card 2 - Featured */}
            <div className="bg-gradient-to-br from-[#007BFF] to-[#0056b3] p-10 rounded-3xl shadow-2xl relative transform hover:scale-105 transition-all duration-300 text-white">
              <div className="absolute -top-4 right-8 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold">
                Popularne
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Abonament
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-bold">199 zł</span>
                <span className="text-blue-100 ml-2">miesięcznie</span>
              </div>
              <p className="text-blue-100 leading-relaxed mb-6">
                Pełna obsługa i regularne aktualizacje
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  24/7 obsługa telefonów
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  Nieograniczone SMS-y
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  Priorytetowe wsparcie
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
      <section className="py-24 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-[#007BFF] px-6 py-3 rounded-full text-sm font-semibold mb-6">
                <Phone className="w-4 h-4" />
                Kontakt
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
                Zamów Demo
              </h2>
              <p className="text-xl text-gray-600">
                Zobacz AI Sekretarkę w akcji – umów się na prezentację
              </p>
            </div>
            
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
                className="w-full bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg py-7 rounded-xl font-semibold group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {isSubmitting ? "Wysyłanie..." : "Wyślij Zgłoszenie"}
                {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
              </Button>
            </form>
            
            <p className="text-center text-gray-600 mt-8 text-lg font-medium">
              AI Sekretarka – Proste Rozwiązanie dla Twojego Biznesu
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/" className="text-2xl font-bold text-black inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              Yieldo<span className="text-[#007BFF]">.ai</span>
            </Link>
            <p className="text-gray-700 mb-6 text-lg">
              Agencja AI dla Nowoczesnych Firm
            </p>
            <div className="flex justify-center gap-6 mb-8">
              <Link href="/ai-sekretarka" className="text-gray-600 hover:text-[#007BFF] transition-colors">
                AI Sekretarka
              </Link>
              <Link href="/" className="text-gray-600 hover:text-[#007BFF] transition-colors">
                Kontakt
              </Link>
              <Link href="/" className="text-gray-600 hover:text-[#007BFF] transition-colors">
                O nas
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              © 2024 Yieldo AI Agency. Wszystkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}