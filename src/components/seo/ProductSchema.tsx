import Script from 'next/script'

export interface ProductOffer {
  name: string
  price: number
  currency?: string
  description?: string
  priceCurrency?: string
}

export interface ProductSchemaProps {
  name: string
  description: string
  image?: string
  brand?: string
  offers?: ProductOffer[]
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
}

export default function ProductSchema({
  name,
  description,
  image = 'https://www.yieldo.pl/og-image.jpg',
  brand = 'Yieldo',
  offers = [],
  aggregateRating
}: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    brand: {
      '@type': 'Brand',
      name: brand
    },
    offers: offers.map(offer => ({
      '@type': 'Offer',
      name: offer.name,
      price: offer.price,
      priceCurrency: offer.priceCurrency || offer.currency || 'PLN',
      availability: 'https://schema.org/InStock',
      url: 'https://www.yieldo.pl/ai-sekretarka',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
    })),
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
        bestRating: 5,
        worstRating: 1
      }
    })
  }

  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
