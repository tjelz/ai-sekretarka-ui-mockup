import { Product, WithContext } from 'schema-dts';

export function getAISekretrkaProductSchema(): WithContext<Product> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://yieldo.pl/ai-sekretarka/#product",
    "name": "AI Sekretarka Yieldo",
    "description": "Profesjonalna AI Sekretarka, która automatycznie odbiera telefony 24/7, umawia spotkania, odpowiada na pytania klientów i wysyła SMS-y z potwierdzeniami. Rozmawia naturalnie jak człowiek.",
    "brand": {
      "@type": "Brand",
      "name": "Yieldo"
    },
    "image": [
      "https://yieldo.pl/product-ai-sekretarka-1.png",
      "https://yieldo.pl/product-ai-sekretarka-2.png",
      "https://yieldo.pl/product-ai-sekretarka-3.png"
    ],
    "offers": {
      "@type": "Offer",
      "url": "https://yieldo.pl/ai-sekretarka/",
      "priceCurrency": "PLN",
      "price": "399.00",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Yieldo"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "category": "Business Software",
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Availability",
        "value": "24/7"
      },
      {
        "@type": "PropertyValue",
        "name": "Language",
        "value": "Polish"
      },
      {
        "@type": "PropertyValue",
        "name": "Integration",
        "value": "Calendar, CRM, SMS"
      }
    ]
  };
}
