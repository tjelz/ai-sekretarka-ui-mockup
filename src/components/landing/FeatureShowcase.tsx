"use client"

import { Phone, Globe, MapPin, Search, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  status: "available" | "coming-soon"
  link?: string
  benefits?: string[]
}

function FeatureCard({ icon, title, description, status, link, benefits }: FeatureCardProps) {
  const content = (
    <div className={`relative bg-white p-8 rounded-2xl shadow-md border-2 transition-all duration-300 h-full ${
      status === "available"
        ? "border-[#007BFF] hover:shadow-xl hover:scale-105"
        : "border-gray-200 hover:shadow-lg"
    }`}>
      {/* Status Badge */}
      {status === "coming-soon" && (
        <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
          Wkrótce
        </div>
      )}
      {status === "available" && (
        <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Dostępne Teraz
        </div>
      )}

      <div className="space-y-4">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
          status === "available" ? "bg-blue-50" : "bg-gray-100"
        }`}>
          {icon}
        </div>

        {/* Title */}
        <h3 className={`text-2xl font-bold ${
          status === "available" ? "text-gray-900" : "text-gray-700"
        }`}>
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>

        {/* Benefits */}
        {benefits && benefits.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {benefits.map((benefit, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  status === "available"
                    ? "bg-blue-50 text-[#007BFF]"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {benefit}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        {status === "available" && link ? (
          <div className="pt-4">
            <span className="inline-flex items-center text-[#007BFF] font-semibold hover:gap-2 transition-all cursor-pointer">
              Odkryj Więcej
              <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        ) : (
          <div className="pt-4 text-gray-400 font-medium text-sm">
            W przygotowaniu
          </div>
        )}
      </div>
    </div>
  )

  if (status === "available" && link) {
    return (
      <Link href={link} className="block h-full group">
        {content}
      </Link>
    )
  }

  return <div className="h-full">{content}</div>
}

export default function FeatureShowcase() {
  const features = [
    {
      icon: <Phone className="w-8 h-8 text-[#007BFF]" strokeWidth={2} />,
      title: "AI Sekretarka",
      description: "Automatyczna obsługa telefonów 24/7. Rozmawia z klientami po polsku, umawia spotkania i pamięta szczegóły.",
      status: "available" as const,
      link: "/ai-sekretarka",
      benefits: ["✓ Odbieranie 24/7", "✓ Automatyczne rezerwacje", "✓ SMS powiadomienia"]
    },
    {
      icon: (
        <div className="flex gap-2">
          <Globe className="w-7 h-7 text-gray-400" strokeWidth={2} />
          <MapPin className="w-7 h-7 text-gray-400" strokeWidth={2} />
        </div>
      ),
      title: "Kompletna Obecność Online",
      description: "Profesjonalna strona WWW + Optymalizacja Google Business Profile w jednym pakiecie. Zwiększ swoją widoczność.",
      status: "coming-soon" as const,
      benefits: ["✓ Strona WWW", "✓ Google Business", "✓ SEO"]
    },
    {
      icon: <Search className="w-8 h-8 text-gray-400" strokeWidth={2} />,
      title: "Automatyzacja Dotacji",
      description: "Znajdź idealne dotacje i granty dla swojej firmy automatycznie. Oszczędź czas na poszukiwania.",
      status: "coming-soon" as const,
      benefits: ["✓ Automatyczne wyszukiwanie", "✓ Powiadomienia", "✓ Wsparcie w aplikacji"]
    }
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#007BFF] px-5 py-2.5 rounded-full text-sm font-medium mb-5">
            <Sparkles className="w-4 h-4" />
            Nasze Rozwiązania
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Wszystko, Czego Potrzebujesz
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kompleksowe rozwiązania AI dla rozwoju Twojej firmy – od obsługi klientów po cyfrową obecność
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Gotowy Na Rozwój Firmy?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Zacznij od AI Sekretarki – dostępnej już teraz. Kolejne rozwiązania wkrótce!
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
                Dowiedz Się Więcej o AI Sekretarce
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
