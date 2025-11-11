"use client"

import { Settings, Zap, Code, Link2, CheckCircle2, ArrowRight } from "lucide-react"
import { useState } from "react"

/**
 * Showcase component for custom integration capabilities
 * Highlights API access, webhooks, and custom workflow options
 */
export function CustomIntegrationShowcase() {
  const [activeTab, setActiveTab] = useState<"api" | "webhooks" | "zapier">("api")

  const integrationOptions = {
    api: {
      title: "REST API",
      icon: <Code className="w-6 h-6" />,
      description: "Pełny dostęp do naszego API dla zaawansowanych integracji",
      features: [
        "RESTful endpoints z dokumentacją OpenAPI",
        "Autentykacja OAuth 2.0 i API keys",
        "Rate limiting: 1000 req/min",
        "Webhooks dla event-driven workflows",
        "SDKs dla Node.js, Python, PHP"
      ],
      codeExample: `// Przykład wysyłki SMS
const response = await fetch('https://api.yieldo.pl/v1/sms', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: '+48123456789',
    message: 'Potwierdzenie wizyty',
    scheduledAt: '2025-11-15T10:00:00Z'
  })
});`
    },
    webhooks: {
      title: "Webhooks",
      icon: <Link2 className="w-6 h-6" />,
      description: "Otrzymuj powiadomienia w czasie rzeczywistym o wszystkich zdarzeniach",
      features: [
        "Powiadomienia o nowych wiadomościach",
        "Statusy dostarczeń SMS/WhatsApp",
        "Umówione wizyty i rezerwacje",
        "Próby ponownego wysłania (retry logic)",
        "Podpisy HMAC dla bezpieczeństwa"
      ],
      codeExample: `// Webhook payload - nowa wiadomość
{
  "event": "message.received",
  "timestamp": "2025-11-11T16:30:00Z",
  "data": {
    "messageId": "msg_abc123",
    "from": "+48123456789",
    "channel": "whatsapp",
    "content": "Chcę umówić wizytę",
    "metadata": {
      "intent": "appointment_booking",
      "confidence": 0.95
    }
  }
}`
    },
    zapier: {
      title: "Zapier & Make",
      icon: <Zap className="w-6 h-6" />,
      description: "Integracja z 5000+ aplikacjami bez kodowania",
      features: [
        "Gotowe szablony workflow (Zaps)",
        "Połączenie z CRM (Salesforce, HubSpot)",
        "Integracja z kalendarzami (Google, Outlook)",
        "Automatyzacja z arkuszami (Google Sheets, Airtable)",
        "Powiadomienia Slack/Discord/Teams"
      ],
      codeExample: `# Przykładowy workflow Zapier
1. Trigger: Nowa wiadomość w AI Sekretarka
2. Action: Dodaj kontakt do HubSpot CRM
3. Action: Wyślij powiadomienie do Slacka
4. Action: Zapisz dane do Google Sheets
5. Action: Wyślij email z potwierdzeniem`
    }
  }

  const currentTab = integrationOptions[activeTab]

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Własne Integracje</h3>
            <p className="text-gray-300 text-sm">API, Webhooks i No-Code Solutions</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex">
          {(["api", "webhooks", "zapier"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-4 font-semibold text-sm transition-all ${
                activeTab === tab
                  ? "bg-white text-[#007BFF] border-b-2 border-[#007BFF]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {integrationOptions[tab].icon}
                {integrationOptions[tab].title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Features */}
          <div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {currentTab.description}
            </p>

            <div className="space-y-3">
              {currentTab.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-gray-700 mb-3">
                <strong>Potrzebujesz pomocy z integracją?</strong>
              </p>
              <p className="text-xs text-gray-600 mb-4">
                Nasz zespół pomoże Ci skonfigurować dowolną integrację - od prostych webhooków po zaawansowane workflow.
              </p>
              <a
                href="https://calendly.com/info-yieldo/ai-recepcjonistka"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#007BFF] font-semibold text-sm hover:gap-3 transition-all"
              >
                Umów konsultację techniczną
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Code Example */}
          <div>
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-gray-400 text-xs font-mono">
                  {activeTab === "zapier" ? "workflow.txt" : `example.${activeTab === "api" ? "js" : "json"}`}
                </span>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="text-xs text-gray-300 font-mono leading-relaxed">
                  {currentTab.codeExample}
                </pre>
              </div>
            </div>

            {/* Documentation Link */}
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <Code className="w-4 h-4" />
              <span>
                Pełna dokumentacja dostępna w{" "}
                <a
                  href="https://docs.yieldo.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#007BFF] font-semibold hover:underline"
                >
                  Developer Portal
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
