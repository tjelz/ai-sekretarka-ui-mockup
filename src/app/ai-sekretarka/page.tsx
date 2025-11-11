"use client"

import { OrganizationSchema, ProductSchema, FAQSchema, BreadcrumbSchema } from "@/components/seo"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Phone, Calendar, MessageSquare, Shield, Clock, Zap, TrendingUp, CheckCircle2, Users, Settings, ArrowRight, Star, Sparkles, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import LostRevenueCalculator from "../components/LostRevenueCalculator"
import EnhancedPricingCard from "../components/EnhancedPricingCard"
import AnimatedBackground from "../components/AnimatedBackground"
import HeroPhoneMockup from "../components/HeroPhoneMockup"
import TypewriterText from "../components/TypewriterText"
import AnimatedStatCard from "../components/AnimatedStatCard"

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
      {/* JSON-LD Structured Data */}
      <OrganizationSchema />
      <ProductSchema />
      <FAQSchema faqs={[
        {
          question: 'Jak szybko mogę wdrożyć AI Sekretarkę?',
          answer: 'AI Sekretarka może być gotowa do pracy w ciągu kilku godzin po wypełnieniu formularza. System automatycznie konfiguruje AI, numer telefonu i integracje.'
        },
        {
          question: 'Czy AI Sekretarka rozumie po polsku?',
          answer: 'Tak! AI Sekretarka jest w pełni dostosowana do języka polskiego i rozumie kontekst rozmowy, odpowiada na pytania o ceny, terminy i usługi.'
        },
        {
          question: 'Ile kosztuje AI Sekretarka?',
          answer: 'Mamy trzy plany: Solo (299 zł/mies., 100 rozmów), Ekipa (599 zł/mies., 225 rozmów) i Firma (999 zł/mies., 500 rozmów). Dodatkowe rozmowy to 1,50 zł każda.'
        },
        {
          question: 'Czy AI Sekretarka może umawiać wizyty?',
          answer: 'Tak! AI Sekretarka automatycznie zapisuje terminy do kalendarza (Google Calendar lub Booksy) i wysyła SMS-y potwierdzające zarówno do klienta jak i właściciela firmy.'
        },
        {
          question: 'Czy mogę anulować w każdej chwili?',
          answer: 'Tak, możesz anulować subskrypcję w dowolnym momencie bez ukrytych kosztów. Nie ma żadnych kar ani długoterminowych zobowiązań.'
        }
      ]} />
      <BreadcrumbSchema items={[
        { name: 'Strona Główna', url: 'https://www.yieldo.pl' },
        { name: 'AI Sekretarka', url: 'https://www.yieldo.pl/ai-sekretarka' }
      ]} />

      {/* Navigation Bar - Shared Component */}
      <Navbar />

      {/* Hero Section - Enhanced Split Layout */}
      <section className="relative py-10 px-4 overflow-hidden mt-12">
        {/* Animated Background */}
        <AnimatedBackground />

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Split Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              {/* Headline with Typewriter */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1]">
                Nigdy Nie Trać Klienta przez{' '}
                <TypewriterText
                  phrases={[
                    'Nieodebrany Telefon',
                    'Brak Czasu',
                    'Brak Personelu',
                    'Wieczorne Połączenia'
                  ]}
                />
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                AI Sekretarka odbiera 24/7, umawia wizyty i wysyła SMS-y.{' '}
                <span className="text-[#007BFF] font-semibold">Konfiguracja w 5 minut.</span>
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
                    Zacznij Oszczędzać Dziś
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
                    Zobacz 15-Min Demo
                  </Button>
                </a>
              </div>

              {/* Quick Value Props */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-green-600" />
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
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="font-medium">🇵🇱 Zgodne z RODO</span>
                </div>
              </div>
            </div>

            {/* Right: Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <HeroPhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Live Activity Dashboard */}
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-blue-50/30 via-white to-blue-50/30">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23007BFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Animated Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <AnimatedStatCard
              icon={Users}
              value={42}
              suffix="+"
              label="Aktywne sesje"
              sublabel="w tym momencie"
              trend="↗ +18% w tym tygodniu"
              color="blue"
              delay={0}
            />
            <AnimatedStatCard
              icon={Clock}
              value={2.8}
              suffix="s"
              label="Czas odpowiedzi"
              sublabel="średnio"
              trend="↘ -12% szybciej"
              color="green"
              delay={0.1}
            />
            <AnimatedStatCard
              icon={TrendingUp}
              value={99.9}
              suffix="%"
              label="Dostępność"
              sublabel="ostatnie 30 dni"
              trend="✓ 100% SLA"
              color="purple"
              delay={0.2}
            />
            <AnimatedStatCard
              icon={Star}
              value={20}
              suffix="+"
              label="Zadowolonych firm"
              sublabel="aktywnych klientów"
              trend="↗ +5 w tym miesiącu"
              color="orange"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      <LostRevenueCalculator />


      {/* Features Section */}
      <section className="py-12 px-4 bg-gray-50">
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
      <section className="py-12 px-4 bg-gray-50">
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
            <a
              href="https://calendly.com/info-yieldo/ai-recepcjonistka"
              target="_blank"
              rel="noopener noreferrer"
            >
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
      <section className="py-16 px-4">
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
                <p className="text-black">Dzień dobry, chcę umówić spotkanie na piątek.</p>
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
            AI może ustalić termin spotkania, sprawdzić ceny, potwierdzić i wysłać SMS
          </p>
        </div>
      </section>

      {/* Savings Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50/50 to-white">
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
                    Zamiast zatrudniać recepcjonistkę (<span className="text-[#007BFF] font-bold">2000 zł/mies.</span>), płacisz od <span className="text-[#007BFF] font-bold">299 zł/mies.</span> – ROI w <span className="text-[#007BFF] font-bold">1 tydzień</span>
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
                    Dla firmy z <span className="font-bold">20 tel/dzień</span>: Zaoszczędź <span className="font-bold text-2xl">3000 zł/mies.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/kalkulator">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg px-12 py-7 rounded-full font-semibold"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Oblicz Swoje Oszczędności
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 px-4 bg-white relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#007BFF] px-5 py-2.5 rounded-full text-sm font-medium mb-5">
              <Star className="w-4 h-4" />
              Cennik i Kalkulator
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Cennik AI Sekretarki i Kalkulator Zysku
            </h2>
            <p className="text-lg text-gray-600">
              Proste, przejrzyste ceny bez ukrytych kosztów + oblicz swój potencjalny zysk
            </p>
          </div>
          {/* Enhanced Pricing Cards with Integrated Calculator */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Solo Plan */}
            <EnhancedPricingCard
              name="Solo"
              price={299}
              description="1 osoba / działalność jednoosobowa"
              features={[
                "100 rozmów w cenie",
                "1,50 zł dodatkowa rozmowa",
                "24/7 obsługa połączeń",
                "Integracja z kalendarzem",
                "SMS potwierdzenia"
              ]}
            />

            {/* Ekipa Plan - Popular */}
            <EnhancedPricingCard
              name="Ekipa"
              price={599}
              description="2–4 osoby w terenie"
              features={[
                "225 rozmów w cenie",
                "1,50 zł dodatkowa rozmowa",
                "24/7 obsługa połączeń",
                "Integracja z kalendarzem",
                "SMS potwierdzenia",
                "Wsparcie priorytetowe"
              ]}
              isPopular={true}
            />

            {/* Firma Plan */}
            <EnhancedPricingCard
              name="Firma"
              price={999}
              description="większa firma / kilka ekip / stały ruch"
              features={[
                "500 rozmów w cenie",
                "1,50 zł dodatkowa rozmowa",
                "24/7 obsługa połączeń",
                "Integracja z kalendarzem",
                "SMS potwierdzenia",
                "Dedykowane wsparcie",
                "Zaawansowane raportowanie"
              ]}
            />
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://forms.fillout.com/t/xityvM2L42us"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg px-12 py-7 rounded-full font-semibold group"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  START NOW
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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
                  className="border-2 border-[#007BFF] text-[#007BFF] hover:bg-blue-50 text-lg px-12 py-7 rounded-full font-semibold transition-all group"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Zamów Demo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section id="contact" className="py-12 px-4 bg-gray-50">
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

            {/* Calculator Link Card */}
            <div className="bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-2xl shadow-lg p-8 border border-blue-600 text-white">
              <h3 className="text-2xl font-bold mb-4">Kalkulator Oszczędności</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Oblicz ile pieniędzy tracisz przez nieodebrane telefony i zobacz jak AI Sekretarka może pomóc!
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                  <span className="text-blue-100">Zobacz miesięczne i roczne straty</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                  <span className="text-blue-100">Spersonalizowane wyliczenia</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                  <span className="text-blue-100">Porównanie z kosztami AI</span>
                </div>
              </div>
              <Link href="/kalkulator">
                <Button
                  size="lg"
                  className="w-full bg-white text-[#007BFF] hover:bg-gray-100 font-semibold py-6 text-lg group"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Przejdź do Kalkulatora
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}