"use client"

import { OrganizationSchema, BreadcrumbSchema, ProductSchema, WebPageSchema } from "@/components/seo"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import ProductShowcaseHero from "@/components/landing/ProductShowcaseHero"
import VisionMission from "@/components/landing/VisionMission"
import BespokeSolutionsSection from "@/components/landing/BespokeSolutionsSection"

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
      <section id="produkty">
        <ProductShowcaseHero />
      </section>

      {/* Vision & Mission Section */}
      <section id="o-nas">
        <VisionMission />
      </section>

      {/* Bespoke Solutions Consultation Section */}
      <section id="rozwiazania">
        <BespokeSolutionsSection />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
