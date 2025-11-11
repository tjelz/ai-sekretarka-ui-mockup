"use client"

import { MessageSquare, Phone, Zap, CheckCircle2, Globe, Settings } from "lucide-react"
import { MessagingChannelCard } from "./MessagingChannelCard"
import { CustomIntegrationShowcase } from "./CustomIntegrationShowcase"

/**
 * Comprehensive messaging integration section showcasing multi-channel support
 * Displays SMS, WhatsApp, Facebook Messenger, and custom integration capabilities
 */
export function MessagingIntegrationSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23007BFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#007BFF] px-5 py-2.5 rounded-full text-sm font-medium mb-5">
            <MessageSquare className="w-4 h-4" />
            Integracje Komunikacyjne
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Wielokanałowa Obsługa Klientów
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Obsługuj klientów tam, gdzie są. Jedna platforma, wszystkie kanały komunikacji.
          </p>
        </div>

        {/* Key Benefits Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5 text-[#007BFF]" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Natychmiastowa Odpowiedź</p>
                <p className="text-sm text-gray-600">Pod 3 sekundy</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Jedna Platforma</p>
                <p className="text-sm text-gray-600">Wszystkie kanały w jednym</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Globalna Dostępność</p>
                <p className="text-sm text-gray-600">24/7 w każdej strefie</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messaging Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* SMS Integration */}
          <MessagingChannelCard
            icon="📱"
            title="SMS / Wiadomości"
            description="Bezpośredni kontakt z klientami przez SMS"
            features={[
              "Potwierdzenia wizyt",
              "Przypomnienia o terminach",
              "Statusy zamówień",
              "Linki do płatności"
            ]}
            metrics={{
              deliveryRate: "99.5%",
              responseTime: "< 2s",
              openRate: "98%"
            }}
            color="blue"
          />

          {/* WhatsApp Integration */}
          <MessagingChannelCard
            icon="💬"
            title="WhatsApp Business"
            description="Najpopularniejszy komunikator w Polsce"
            features={[
              "Bogate wiadomości (zdjęcia, dokumenty)",
              "Integracja z katalogiem produktów",
              "Szybkie odpowiedzi (Quick Replies)",
              "Statusy dostarczeń i przeczytań"
            ]}
            metrics={{
              activeUsers: "2.5 mld",
              responseTime: "< 3s",
              engagement: "4x wyższe"
            }}
            color="green"
            isPopular={true}
          />

          {/* Facebook Messenger Integration */}
          <MessagingChannelCard
            icon="💙"
            title="Facebook Messenger"
            description="Integracja z ekosystemem Meta"
            features={[
              "Chatboty i automatyzacja",
              "Integracja z Facebook Page",
              "Płatności w wiadomościach",
              "Analityka konwersacji"
            ]}
            metrics={{
              activeUsers: "1.3 mld",
              responseTime: "< 3s",
              reachGrowth: "+23%"
            }}
            color="purple"
          />
        </div>

        {/* Custom Integration Showcase */}
        <CustomIntegrationShowcase />

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Gotowy na Wielokanałową Komunikację?
              </h3>
              <p className="text-blue-100 text-lg mb-8">
                Zacznij obsługiwać klientów na wszystkich platformach w jednym miejscu.
                Konfiguracja w 5 minut.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://forms.fillout.com/t/xityvM2L42us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="bg-white text-[#007BFF] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg">
                    <Zap className="w-5 h-5 inline mr-2" />
                    Zacznij Teraz
                  </button>
                </a>
                <a
                  href="https://calendly.com/info-yieldo/ai-recepcjonistka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-xl font-semibold text-lg transition-all border-2 border-white/20">
                    <Phone className="w-5 h-5 inline mr-2" />
                    Zobacz Demo
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
