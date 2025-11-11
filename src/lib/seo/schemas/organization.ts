import { Organization, WithContext } from 'schema-dts';

export function getOrganizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.yieldo.pl/#organization",
    "name": "Yieldo",
    "legalName": "Yieldo Sp. z o.o.",
    "url": "https://www.yieldo.pl",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.yieldo.pl/logo.png",
      "width": 250,
      "height": 60
    },
    "image": "https://www.yieldo.pl/og-image.jpg",
    "description": "Yieldo to agencja AI specjalizująca się w automatyzacji procesów biznesowych. Oferujemy AI Sekretarkę 24/7, tworzenie stron internetowych i automatyzację dotacji dla polskich firm.",
    "foundingDate": "2024",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "email": "info.yieldo@gmail.com",
        "contactType": "customer service",
        "areaServed": "PL",
        "availableLanguage": ["Polish", "English"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PL",
      "addressLocality": "Warsaw",
      "addressRegion": "Mazowieckie"
    },
    "sameAs": [
      "https://www.linkedin.com/company/yieldopl/",
      "https://instagram.com/yieldo_pl",
      "https://x.com/yieldo_pl"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Poland"
    }
  };
}
