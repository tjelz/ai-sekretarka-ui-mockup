"use client"

import { Phone, Globe, Search, Sparkles, ArrowRight, Zap, TrendingUp, Rocket, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ProductCardProps {
  icon: React.ReactNode
  title: string
  description: string
  status: "available" | "coming-soon"
  link?: string
  badge?: string
  gradient: string
  size?: "large" | "medium"
  quarter?: string
}

function ProductCard({ icon, title, description, status, link, badge, gradient, size = "medium", quarter }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const content = (
    <div
      className={`relative group overflow-hidden rounded-3xl transition-all duration-500 h-full ${
        size === "large" ? "md:col-span-2 md:row-span-2" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative h-full p-8 rounded-3xl ${gradient} ${
        status === "available"
          ? "bg-gradient-to-br shadow-2xl border-2 border-white/20"
          : "bg-gradient-to-br shadow-xl border-2 border-gray-200"
      } transition-all duration-500 ${
        isHovered && status === "available"
          ? "scale-[1.02] shadow-3xl"
          : ""
      }`}>

        {/* Animated background gradient */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
          status === "available" ? gradient.replace("from-", "from-opacity-50 from-").replace("to-", "to-opacity-50 to-") : ""
        }`} />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            {/* Status Badge */}
            <div className="flex justify-between items-start mb-6">
              {status === "available" ? (
                <div className="bg-white/90 backdrop-blur-sm text-green-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Dostępne Teraz
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-sm text-amber-700 px-4 py-2 rounded-full text-sm font-bold shadow-md">
                  Wkrótce
                </div>
              )}
              {badge && (
                <div className="bg-white/80 backdrop-blur-sm text-purple-700 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  {badge}
                </div>
              )}
            </div>

            {/* Icon */}
            <div className={`mb-6 transform transition-transform duration-500 ${
              isHovered ? "scale-110 rotate-3" : ""
            }`}>
              {icon}
            </div>

            {/* Title */}
            <h3 className={`text-3xl font-black mb-4 ${
              status === "available" ? "text-white" : "text-gray-700"
            } ${size === "large" ? "md:text-5xl" : ""}`}>
              {title}
            </h3>

            {/* Description */}
            <p className={`text-lg leading-relaxed mb-6 ${
              status === "available" ? "text-white/90" : "text-gray-600"
            } ${size === "large" ? "md:text-xl max-w-2xl" : ""}`}>
              {description}
            </p>
          </div>

          {/* CTA */}
          {status === "available" && link ? (
            <div className="mt-auto">
              <span className={`inline-flex items-center gap-2 font-bold text-lg group-hover:gap-4 transition-all ${
                status === "available" ? "text-white" : "text-gray-700"
              }`}>
                Odkryj Więcej
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </div>
          ) : (
            <div className="mt-auto">
              <span className="text-gray-500 font-medium text-sm">
                W przygotowaniu
              </span>
            </div>
          )}
        </div>

        {/* Hover effect overlay */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
          status === "available" ? "bg-white" : ""
        }`} />
      </div>
    </div>
  )

  if (status === "available" && link) {
    return (
      <Link href={link} className="block h-full">
        {content}
      </Link>
    )
  }

  return content
}

export default function ProductShowcaseHero() {
  const products = [
    {
      icon: <Phone className="w-16 h-16 text-white drop-shadow-lg" strokeWidth={2.5} />,
      title: "AI Sekretarka",
      description: "Automatyczna obsługa telefonów 24/7. Nigdy więcej nie trać klientów przez nieodebrane połączenia. Rozmawia po polsku, umawia wizyty i wysyła potwierdzenia SMS.",
      status: "available" as const,
      link: "/ai-sekretarka",
      badge: "Bestseller",
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      size: "large" as const
    },
    {
      icon: <Globe className="w-12 h-12 text-gray-700" strokeWidth={2.5} />,
      title: "Digital Presence",
      description: "Kompleksowy pakiet: profesjonalna strona WWW + optymalizacja Google Business Profile.",
      status: "coming-soon" as const,
      gradient: "from-white to-gray-50"
    },
    {
      icon: <Search className="w-12 h-12 text-gray-700" strokeWidth={2.5} />,
      title: "Grant Automation",
      description: "Automatyczne wyszukiwanie idealnych dotacji i grantów dla Twojej firmy. Oszczędź czas i nie przegap okazji.",
      status: "coming-soon" as const,
      gradient: "from-white to-gray-50"
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23007BFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm text-blue-600 px-6 py-3 rounded-full text-sm font-bold shadow-lg border border-blue-200/50 animate-fade-in">
            <Sparkles className="w-5 h-5 animate-pulse" />
            Rozwiązania AI dla Rozwoju Firm
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] max-w-5xl mx-auto">
            Rozwiązania, Które{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Rozwijają Twój Biznes
            </span>
          </h1>

          {/* Subheadline with "Always Building" */}
          <div className="flex items-center justify-center gap-3 text-xl text-gray-600 max-w-3xl mx-auto">
            <Rocket className="w-6 h-6 text-blue-600 animate-bounce" />
            <p className="font-semibold">
              Ciągle budujemy nowe produkty i rozwiązania dla Twojego sukcesu
            </p>
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>

          {/* Value Props */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 pt-4">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="font-semibold">Automatyzacja AI</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">Wsparcie 24/7</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              <span className="font-semibold">Zgodność z RODO</span>
            </div>
          </div>
        </div>

        {/* Bento Grid Product Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 auto-rows-fr">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
              // Add stagger animation delay
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <p className="text-lg text-gray-700 font-medium">
            Zacznij od AI Sekretarki – dostępnej już dziś. Kolejne produkty już wkrótce!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://forms.fillout.com/t/xityvM2L42us"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl px-12 py-7 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all hover:scale-105 group"
              >
                <Zap className="w-6 h-6 mr-2 group-hover:animate-pulse" />
                Rozpocznij Za Darmo
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
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-xl px-10 py-7 rounded-2xl font-semibold transition-all group"
              >
                <Phone className="w-5 h-5 mr-2" />
                Bezpłatna Konsultacja
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  )
}
