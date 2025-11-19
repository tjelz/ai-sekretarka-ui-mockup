"use client"

import { OrganizationSchema, ProductSchema, FAQSchema, BreadcrumbSchema } from "@/components/seo"
import IntegrationStructuredData from "@/components/seo/IntegrationStructuredData"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Phone, Calendar, MessageSquare, Shield, Zap, TrendingUp, CheckCircle2, Play, Pause, Volume2 } from "lucide-react"
import { useState, useRef } from "react"
import { toast } from "sonner"
import LostRevenueCalculator from "../components/LostRevenueCalculator"
import EnhancedPricingCard from "../components/EnhancedPricingCard"
import CalendarIntegrationSection from "../components/CalendarIntegrationSection"
import OnboardingModal from "../components/OnboardingModal"
import { Navbar } from "@/components/ui/navbar"
import { motion } from "framer-motion"
import { AnimatedHeroBackground } from "@/components/landing/AnimatedHeroBackground"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

export default function AISekretarkaPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false)
  
  // Audio Player Logic
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggleAudio = () => {
    if (!audioRef.current) return
    if (isPlaying) {
        audioRef.current.pause()
    } else {
        audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

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
        description: "Skontaktujemy się wkrótce!"
      })

      setFormData({ name: "", email: "", phone: "" })
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error("Wystąpił błąd", {
        description: "Spróbuj ponownie później."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white selection:bg-primary/20 font-sans">
      {/* SEO */}
      <OrganizationSchema />
      <ProductSchema />
      <IntegrationStructuredData integrations={['Booksy', 'Google Calendar', 'Microsoft Outlook', 'Calendly']} />
      <FAQSchema faqs={[
        {
          question: 'Jak szybko mogę wdrożyć AI Sekretarkę?',
          answer: 'AI Sekretarka może być gotowa do pracy w ciągu kilku godzin po wypełnieniu formularza.'
        },
        {
          question: 'Czy AI Sekretarka rozumie po polsku?',
            answer: 'Tak! AI Sekretarka jest w pełni dostosowana do języka polskiego i rozumie kontekst rozmowy.'
        }
      ]} />
      <BreadcrumbSchema items={[
        { name: 'Strona Główna', url: 'https://www.yieldo.pl' },
        { name: 'AI Sekretarka', url: 'https://www.yieldo.pl/ai-sekretarka' }
      ]} />

      <Navbar />

      {/* Hero Section - High Conversion */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden">
        <AnimatedHeroBackground />
        
        <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="space-y-10"
            >
                <motion.div 
                  variants={fadeInUp}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50/80 backdrop-blur border border-green-100 text-green-700 text-sm font-bold shadow-sm"
              >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    Dostępne 24/7
                </motion.div>

                <motion.h1 
                  variants={fadeInUp}
                  className="text-6xl lg:text-8xl font-black text-gray-900 leading-[1.05] tracking-tight"
                >
                    Nigdy nie trać <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 relative">
                      klienta
                      <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
                    </span> <br/>
                    przez telefon
                </motion.h1>
                
                <motion.p 
                  variants={fadeInUp}
                  className="text-xl text-gray-600 leading-relaxed max-w-xl font-medium"
            >
                    AI Sekretarka odbiera <span className="text-gray-900 font-bold">100% połączeń</span>, umawia wizyty w Booksy/Google i wysyła SMS-y. 
                    Zwraca się w 1. tygodniu.
                </motion.p>

                <motion.div 
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-5"
                >
                  <Button
                    size="lg"
                        onClick={() => setIsOnboardingOpen(true)}
                        className="h-16 px-8 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-blue-500/20 transition-all hover:scale-105 hover:-translate-y-1"
                  >
                        <Zap className="w-6 h-6 mr-2" />
                        Wypróbuj za darmo
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                        className="h-16 px-8 text-lg rounded-2xl border-2 hover:bg-white/80 backdrop-blur bg-white/50"
                        onClick={() => {
                            document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                  >
                        <Volume2 className="w-6 h-6 mr-2" />
                        Posłuchaj demo
                  </Button>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="flex items-center gap-6 text-sm font-medium text-gray-500 pt-4 border-t border-gray-100"
                >
                <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span>Setup w 5 min</span>
                </div>
                <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span>Bez karty</span>
                </div>
                <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span>Integracja Booksy</span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Hero Interactive Element - Audio Demo Mockup */}
            <motion.div 
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
                <div className="relative bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/60 p-10 max-w-md mx-auto ring-1 ring-gray-900/5 transition-transform hover:scale-[1.02] duration-500">
                    <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl transform rotate-6 flex items-center gap-2 z-20">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        LIVE DEMO
                  </div>
                    
                    <div className="flex items-center gap-5 mb-10">
                        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center relative shadow-lg shadow-blue-500/30">
                            <Phone className="h-10 w-10 text-white" />
                            <div className="absolute -bottom-2 -right-2 h-6 w-6 bg-green-500 border-4 border-white rounded-full animate-pulse"></div>
                </div>
                        <div>
                            <h3 className="font-black text-2xl text-gray-900">Asystentka AI</h3>
                            <p className="text-base text-green-600 font-bold flex items-center gap-2">
                                {isPlaying ? (
                                  <span className="flex gap-1">
                                    <span className="animate-bounce">.</span>
                                    <span className="animate-bounce delay-100">.</span>
                                    <span className="animate-bounce delay-200">.</span>
                                    Rozmowa trwa
                                  </span>
                                ) : "Oczekiwanie na połączenie"}
                            </p>
              </div>
            </div>

                    {/* Audio Visualizer Mockup */}
                    <div className="flex items-center justify-center gap-1.5 h-20 mb-10 bg-gray-50 rounded-3xl px-6 border border-gray-100 inner-shadow">
                        {[...Array(16)].map((_, i) => (
                            <div 
                                key={i} 
                                className={`w-2 bg-gradient-to-t from-primary to-blue-400 rounded-full transition-all duration-100 ease-in-out ${isPlaying ? '' : 'h-2 opacity-20'}`}
                                style={{ 
                                    height: isPlaying ? `${Math.max(15, Math.random() * 100)}%` : '8px',
                                    opacity: isPlaying ? 0.8 + Math.random() * 0.2 : 0.2
                                }} 
                            />
                        ))}
            </div>

                    <audio ref={audioRef} src="/audio-call-1.mp3" onEnded={() => setIsPlaying(false)} />
                    
                    <Button 
                        onClick={toggleAudio}
                        className={`w-full h-16 text-xl font-bold rounded-2xl mb-4 transition-all duration-300 shadow-lg ${isPlaying ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-primary hover:bg-primary/90 shadow-blue-500/20'}`}
                    >
                        {isPlaying ? (
                            <><Pause className="w-6 h-6 mr-3" /> Zatrzymaj rozmowę</>
                        ) : (
                            <><Play className="w-6 h-6 mr-3" /> Odtwórz przykładową rozmowę</>
                        )}
                    </Button>
                    
                    <p className="text-xs text-center text-gray-400 font-medium">
                        * To jest nagranie prawdziwej rozmowy AI z klientem
                    </p>
          </div>
            </motion.div>
        </div>
      </section>

      <section id="demo" className="py-32 bg-gray-50/50 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
        <CalendarIntegrationSection />
      </section>

      <LostRevenueCalculator compact={true} />

      {/* Features Grid - Interactive */}
      <section id="funkcje" className="py-32 px-4 bg-white relative">
         <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white -z-10" />
        <div className="container mx-auto max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
                <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">Więcej niż sekretarka</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">Pełna automatyzacja obsługi klienta w Twojej kieszeni. Działa 24/7 bez przerw na kawę.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { icon: Calendar, title: "Integracja z Kalendarzem", desc: "Automatycznie sprawdza dostępność i wpisuje wizyty prosto do Twojego Google Calendar lub Booksy. Bez konfliktów terminów.", color: "blue" },
                    { icon: MessageSquare, title: "Inteligentne SMS", desc: "Po każdej rozmowie wysyła podsumowanie do Ciebie i potwierdzenie do klienta. Możesz spać spokojnie.", color: "purple" },
                    { icon: TrendingUp, title: "Skuteczność 99.9%", desc: "Odbiera każdy telefon, nawet gdy Ty śpisz, pracujesz lub jesteś na wakacjach. Żaden klient nie odejdzie do konkurencji.", color: "green" }
                ].map((feature, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2, duration: 0.5 }}
                        whileHover={{ y: -12, scale: 1.02 }}
                        className="p-10 rounded-[2rem] border border-gray-100 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-${feature.color}-50 rounded-bl-[5rem] -mr-10 -mt-10 transition-transform group-hover:scale-110`} />
                        
                        <div className={`relative h-16 w-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center text-${feature.color}-600 mb-8 group-hover:rotate-6 transition-transform duration-300`}>
                            <feature.icon className="h-8 w-8" />
              </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {feature.desc}
                        </p>
                    </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="cennik" className="py-32 px-4 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
             <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl mix-blend-multiply animate-blob" />
             <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
          </div>
          
        <div className="container mx-auto max-w-7xl relative z-10">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">Prosty cennik</h2>
                <p className="text-xl text-gray-600">Bez ukrytych opłat. Płacisz za rezultaty.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <EnhancedPricingCard
              name="Solo"
              price={299}
                    description="Dla jednoosobowej działalności"
              features={[
                "100 rozmów w cenie",
                "1,50 zł dodatkowa rozmowa",
                        "Odbieranie 24/7",
                "SMS potwierdzenia"
              ]}
            />
            <EnhancedPricingCard
              name="Ekipa"
              price={599}
                    description="Dla małych zespołów"
              features={[
                "225 rozmów w cenie",
                "1,50 zł dodatkowa rozmowa",
                        "Integracja Booksy",
                "Wsparcie priorytetowe"
              ]}
              isPopular={true}
            />
            <EnhancedPricingCard
              name="Firma"
              price={999}
                    description="Dla większych firm"
              features={[
                "500 rozmów w cenie",
                        "Pełna analityka",
                        "Dedykowany opiekun",
                        "Raporty miesięczne"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="kontakt" className="py-32 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-foreground rounded-[3rem] p-16 text-center text-white shadow-2xl shadow-gray-900/30 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-5" />
                
                <h2 className="text-4xl md:text-5xl font-black mb-8 relative z-10">Zacznij oszczędzać czas i pieniądze</h2>
                <p className="text-gray-400 mb-12 text-xl relative z-10 max-w-2xl mx-auto">
                    Skonfiguruj swoją AI Sekretarkę w 5 minut.
                    <span className="text-white font-bold"> Pierwsze 7 dni testujesz za darmo.</span>
                </p>

                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/10 max-w-lg mx-auto relative z-10">
                    <form onSubmit={handleSubmit} className="space-y-5">
                  <input
                    type="text"
                            placeholder="Twoje Imię"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-6 py-4 rounded-xl bg-white/90 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-primary outline-none shadow-sm text-lg"
                    required
                  />
                  <input
                    type="email"
                            placeholder="Adres Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-6 py-4 rounded-xl bg-white/90 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-primary outline-none shadow-sm text-lg"
                    required
                  />
                  <input
                    type="tel"
                            placeholder="Numer Telefonu"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-6 py-4 rounded-xl bg-white/90 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-primary outline-none shadow-sm text-lg"
                    required
                  />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                            className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-bold text-xl rounded-xl shadow-lg transition-all"
                >
                            {isSubmitting ? "Wysyłanie..." : "Rozpocznij Za Darmo"}
                </Button>
                    </form>
                </div>
                <p className="mt-8 text-sm text-gray-500 opacity-80 relative z-10">
                    * Nie wymagamy karty kredytowej do rozpoczęcia.
                </p>
            </motion.div>
        </div>
      </section>

      <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />
      <Footer />
    </div>
  )
}
