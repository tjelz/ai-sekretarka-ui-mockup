import { FAQPage, WithContext } from 'schema-dts';

export function getAISekretarkaFAQSchema(): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Jak działa AI Sekretarka?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI Sekretarka to zaawansowany system oparty na sztucznej inteligencji, który automatycznie odbiera telefony do Twojej firmy 24/7. Rozmawia z klientami w języku polskim jak prawdziwa osoba, odpowiada na pytania, umawia spotkania w kalendarzu i wysyła SMS-y z potwierdzeniami."
        }
      },
      {
        "@type": "Question",
        "name": "Ile kosztuje AI Sekretarka?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI Sekretarka dostępna jest w planach od 399 PLN miesięcznie. Oferujemy 14-dniowy bezpłatny okres próbny, podczas którego możesz przetestować wszystkie funkcje bez podawania danych karty kredytowej."
        }
      },
      {
        "@type": "Question",
        "name": "Czy AI Sekretarka integruje się z moim kalendarzem?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tak, AI Sekretarka integruje się z popularnymi systemami kalendarzowymi takimi jak Google Calendar, Outlook Calendar oraz dedykowanymi systemami rezerwacji. Automatycznie sprawdza dostępność i umawia spotkania bez Twojego udziału."
        }
      },
      {
        "@type": "Question",
        "name": "Czy klienci zorientują się, że rozmawiają z AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nasza AI Sekretarka wykorzystuje najnowsze technologie przetwarzania języka naturalnego i brzmi bardzo naturalnie. Informujemy klientów, że rozmawiają z asystentem AI, zachowując transparentność, jednocześnie zapewniając profesjonalną obsługę na najwyższym poziomie."
        }
      },
      {
        "@type": "Question",
        "name": "Jak szybko mogę uruchomić AI Sekretarkę?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI Sekretarkę możesz uruchomić już w 24 godziny. Po zarejestrowaniu konta, nasz zespół pomoże Ci w konfiguracji, integracji z systemami i dostosowaniu scenariuszy rozmów do specyfiki Twojej branży."
        }
      },
      {
        "@type": "Question",
        "name": "Czy AI Sekretarka obsługuje wiele języków?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Obecnie AI Sekretarka specjalizuje się w języku polskim, zapewniając najwyższą jakość obsługi dla polskich firm i klientów. Pracujemy nad rozszerzeniem o dodatkowe języki, w tym angielski i niemiecki."
        }
      }
    ]
  };
}
