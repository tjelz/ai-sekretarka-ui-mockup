"use client"

import { MessageCircle, Sparkles, CheckCircle2, ArrowRight, TrendingUp, DollarSign, Lightbulb, Users, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function BespokeSolutionsSection() {
  const [isHovered, setIsHovered] = useState(false)

  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      title: "Oszczędź Tysiące",
      description: "Zautomatyzuj procesy i zmniejsz koszty operacyjne"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      title: "Zwiększ Efektywność",
      description: "Rozwiązania dopasowane do Twojego biznesu"
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-purple-600" />,
      title: "Innowacyjne Podejście",
      description: "Wykorzystaj najnowsze technologie AI"
    }
  ]

  const trustIndicators = [
    "Bezpłatna konsultacja biznesowa",
    "Analiza procesów bez zobowiązań",
    "Dedykowane rozwiązania",
    "Wsparcie na każdym etapie"
  ]

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-white/20">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Rozwiązania Na Miarę
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                Masz Problem?
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Stworzymy Rozwiązanie
                </span>
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Żaden z naszych produktów nie odpowiada Twoim potrzebom? Nie ma problemu!
              </p>
            </div>

            {/* Value Proposition */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 space-y-6">
              <div className="flex items-start gap-4">
                <MessageCircle className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Bezpłatna Konsultacja Biznesowa
                  </h3>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    Umów się na bezpłatną konsultację. Przeanalizujemy Twój biznes,
                    zrozumiemy wyzwania i zaproponujemy konkretne sposoby, jak możemy
                    usprawnić Twoje systemy i <strong className="text-white">zaoszczędzić tysiące złotych</strong>.
                  </p>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid sm:grid-cols-3 gap-4 pt-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all hover:scale-105"
                  >
                    <div className="mb-3">{benefit.icon}</div>
                    <h4 className="text-white font-bold text-sm mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-blue-200 text-xs leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-3">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-medium text-lg">{indicator}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - CTA Card */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={`relative bg-gradient-to-br from-white to-blue-50 rounded-3xl p-10 shadow-2xl border-2 border-blue-200 transition-all duration-500 ${
              isHovered ? "scale-105 shadow-blue-500/50" : ""
            }`}>
              {/* Decorative Element */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 blur-2xl" />

              <div className="relative z-10 space-y-8">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto transform rotate-3 hover:rotate-6 transition-transform">
                  <Users className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>

                {/* Heading */}
                <div className="text-center space-y-3">
                  <h3 className="text-3xl font-black text-gray-900">
                    Porozmawiajmy o Twoich Potrzebach
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Wypełnij formularz lub zadzwoń. Wspólnie znajdziemy najlepsze rozwiązanie dla Twojej firmy.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-6">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-3xl font-black text-blue-600">100%</div>
                    <div className="text-sm text-gray-600 font-medium">Darmowa</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-3xl font-black text-purple-600">30 min</div>
                    <div className="text-sm text-gray-600 font-medium">Konsultacja</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-4">
                  <a
                    href="https://forms.fillout.com/t/xityvM2L42us"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-7 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105 group"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Wypełnij Formularz Kontaktowy
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>

                  <a
                    href="https://calendly.com/info-yieldo/ai-recepcjonistka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-7 rounded-xl font-bold transition-all hover:scale-105 group"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Umów Bezpłatną Konsultację
                    </Button>
                  </a>
                </div>

                {/* Subtext */}
                <p className="text-center text-sm text-gray-500 leading-relaxed pt-4 border-t border-gray-200">
                  Bez zobowiązań. Bez ukrytych kosztów. Po prostu szczera rozmowa o tym,
                  jak możemy pomóc Twojej firmie.
                </p>
              </div>
            </div>

            {/* Shadow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-20 -z-10" />
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="font-medium">RODO Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="font-medium">Doświadczony Zespół</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="font-medium">Wsparcie po Wdrożeniu</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="font-medium">Elastyczne Płatności</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
