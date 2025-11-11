"use client"

import { OrganizationSchema, BreadcrumbSchema, ProductSchema, WebPageSchema } from "@/components/seo"
import { Navbar } from "@/components/ui/navbar"
import ProductShowcaseHero from "@/components/landing/ProductShowcaseHero"
import VisionMission from "@/components/landing/VisionMission"

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* SEO: JSON-LD Structured Data */}
      <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: 'Strona Główna', url: 'https://www.yieldo.pl' }
      ]} />
      <ProductSchema
        name="AI Sekretarka - Automatyczna Obsługa Telefonów 24/7"
        description="Profesjonalna AI Sekretarka odbiera telefony 24/7, umawia wizyty automatycznie i wysyła SMS-y. Konfiguracja w 5 minut. Nigdy nie trać klienta przez nieodebrany telefon."
        price={299}
        currency="PLN"
        availability="https://schema.org/InStock"
        url="https://www.yieldo.pl/ai-sekretarka"
      />
      <WebPageSchema
        name="Yieldo - AI Sekretarka i Rozwiązania dla Firm"
        description="Kompleksowe rozwiązania AI dla nowoczesnych firm. AI Sekretarka 24/7, automatyczne umawianie wizyt, integracje z kalendarzami. Od 299 zł/miesiąc."
        url="https://www.yieldo.pl"
      />

      {/* Navigation Bar */}
      <Navbar />

      {/* Product Showcase Hero - Modern Bento Grid with Animations */}
      <ProductShowcaseHero />

      {/* Vision & Mission Section */}
      <VisionMission />

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-white mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-4 font-medium">
            Yieldo - Agencja AI dla Nowoczesnych Firm
          </p>
          <p className="text-sm text-gray-500">
            © 2025 Yieldo. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </div>
  )
}
