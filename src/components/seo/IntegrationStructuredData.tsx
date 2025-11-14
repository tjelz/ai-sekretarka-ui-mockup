'use client';

import React from 'react';

export interface IntegrationStructuredDataProps {
  integrations?: string[];
}

const IntegrationStructuredData: React.FC<IntegrationStructuredDataProps> = ({
  integrations = ['Booksy', 'Google Calendar', 'Microsoft Outlook', 'Calendly']
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI Sekretarka Yieldo",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web-based, iOS, Android",
    "description": "Profesjonalna AI Sekretarka z integracją Booksy i innymi systemami rezerwacji. Jesteśmy jedną z nielicznych, jeśli nie jedyną AI sekretarką z pełną integracją Booksy. Automatyczna obsługa telefonów 24/7, umawianie wizyt i zarządzanie kalendarzem.",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "PLN",
      "lowPrice": "299",
      "highPrice": "999",
      "offerCount": "3",
      "priceSpecification": [
        {
          "@type": "UnitPriceSpecification",
          "price": "299",
          "priceCurrency": "PLN",
          "name": "Solo Plan",
          "billingDuration": "P1M"
        },
        {
          "@type": "UnitPriceSpecification",
          "price": "599",
          "priceCurrency": "PLN",
          "name": "Ekipa Plan",
          "billingDuration": "P1M"
        },
        {
          "@type": "UnitPriceSpecification",
          "price": "999",
          "priceCurrency": "PLN",
          "name": "Firma Plan",
          "billingDuration": "P1M"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "Integracja z Booksy - pełna synchronizacja rezerwacji",
      "Integracja z Google Calendar",
      "Integracja z Microsoft Outlook",
      "Integracja z Calendly",
      "Automatyczne odbieranie telefonów 24/7",
      "Obsługa języka polskiego przez AI",
      "Automatyczne umawianie wizyt",
      "SMS potwierdzenia dla klientów",
      "Dwukierunkowa synchronizacja kalendarza",
      "Zarządzanie dostępnością w czasie rzeczywistym",
      "Przypomnienia o wizytach",
      "Raporty i analytics",
      "RODO compliance",
      "SSL encryption",
      "24/7 wsparcie techniczne"
    ],
    "integrationsWith": integrations.map(integration => ({
      "@type": "SoftwareApplication",
      "name": integration,
      "applicationCategory": integration === "Booksy" ? "BookingSystem" : "CalendarApplication"
    })),
    "potentialAction": {
      "@type": "UseAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.yieldo.pl/ai-sekretarka-demo",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      }
    },
    "sameAs": [
      "https://www.facebook.com/yieldo",
      "https://www.linkedin.com/company/yieldo",
      "https://twitter.com/yieldo"
    ],
    "author": {
      "@type": "Organization",
      "name": "Yieldo",
      "url": "https://www.yieldo.pl"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Yieldo",
      "url": "https://www.yieldo.pl",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.yieldo.pl/logo.png"
      }
    },
    "screenshot": "https://www.yieldo.pl/screenshots/ai-sekretarka-dashboard.jpg",
    "softwareVersion": "2.0",
    "releaseNotes": "Pełna integracja z systemem Booksy - jako jedna z nielicznych, jeśli nie jedyna AI sekretarka na rynku polskim z taką funkcjonalnością",
    "keywords": "AI Sekretarka, integracja Booksy, automatyzacja rezerwacji, calendar integration, Google Calendar, Outlook, Calendly, automatyczna obsługa telefonów",
    "inLanguage": "pl-PL"
  };

  // Additional FAQ Schema specific to integrations
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Czy AI Sekretarka integruje się z Booksy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tak! AI Sekretarka oferuje pełną, dwukierunkową integrację z systemem Booksy. Jesteśmy jedną z nielicznych, jeśli nie jedyną AI sekretarką na polskim rynku z taką funkcjonalnością. Integracja obejmuje automatyczną synchronizację wizyt, zarządzanie dostępnością i przypomnienia dla klientów."
        }
      },
      {
        "@type": "Question",
        "name": "Jak działa integracja z Booksy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Integracja z Booksy działa automatycznie w czasie rzeczywistym. Gdy klient dzwoni i AI umawia wizytę, termin jest natychmiast zapisywany w systemie Booksy. Synchronizacja działa w obie strony - zmiany w Booksy są widoczne dla AI, co zapobiega podwójnym rezerwacjom."
        }
      },
      {
        "@type": "Question",
        "name": "Jakie inne kalendarze obsługuje AI Sekretarka?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oprócz Booksy, AI Sekretarka integruje się z Google Calendar, Microsoft Outlook, Calendly i innymi popularnymi systemami kalendarzowymi. Wszystkie integracje działają w czasie rzeczywistym z pełną synchronizacją dwukierunkową."
        }
      },
      {
        "@type": "Question",
        "name": "Czy integracja z Booksy jest bezpieczna?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tak, wszystkie integracje są w pełni zabezpieczone poprzez szyfrowanie SSL/TLS. Jesteśmy zgodni z RODO i ISO 27001. Dane są przesyłane bezpiecznie i nie są udostępniane osobom trzecim."
        }
      },
      {
        "@type": "Question",
        "name": "Ile kosztuje integracja z Booksy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Integracja z Booksy jest wliczona w cenę wszystkich naszych planów - od 299 zł miesięcznie. Nie ma dodatkowych opłat za synchronizację z kalendarzem Booksy."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </>
  );
};

export default IntegrationStructuredData;
