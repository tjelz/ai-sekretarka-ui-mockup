import { Organization, WithContext } from 'schema-dts';

export function getOrganizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://yieldo.com/#organization",
    "name": "Yieldo",
    "legalName": "Yieldo Sp. z o.o.",
    "url": "https://yieldo.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yieldo.com/logo.png",
      "width": 250,
      "height": 60
    },
    "image": "https://yieldo.com/og-image.jpg",
    "description": "Yieldo to agencja AI specjalizująca się w automatyzacji procesów biznesowych. Oferujemy AI Sekretarkę 24/7, tworzenie stron internetowych i automatyzację dotacji dla polskich firm.",
    "foundingDate": "2024",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+48-XXX-XXX-XXX",
        "contactType": "customer service",
        "areaServed": "PL",
        "availableLanguage": ["Polish", "English"]
      },
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "info@yieldo.io",
        "areaServed": "PL",
        "availableLanguage": ["Polish"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PL",
      "addressLocality": "Warsaw",
      "addressRegion": "Mazowieckie"
    },
    "sameAs": [
      "https://www.linkedin.com/company/yieldo",
      "https://www.facebook.com/yieldo",
      "https://twitter.com/yieldo_io"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Poland"
    }
  };
}
