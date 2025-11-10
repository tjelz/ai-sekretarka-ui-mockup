import Script from 'next/script'

export interface LocalBusinessSchemaProps {
  name?: string
  description?: string
  image?: string
  telephone?: string
  email?: string
  address?: {
    streetAddress?: string
    addressLocality?: string
    postalCode?: string
    addressCountry?: string
  }
  openingHours?: string[]
  priceRange?: string
  geo?: {
    latitude: number
    longitude: number
  }
}

export default function LocalBusinessSchema({
  name = 'Yieldo',
  description = 'Profesjonalna AI Sekretarka dla Twojej firmy',
  image = 'https://yieldo.com/logo.png',
  telephone = '+48-123-456-789',
  email = 'info.yieldo@gmail.com',
  address = {
    addressLocality: 'Warszawa',
    addressCountry: 'PL'
  },
  openingHours = ['Mo-Su 00:00-24:00'],
  priceRange = '$$',
  geo
}: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    image,
    description,
    telephone,
    email,
    address: {
      '@type': 'PostalAddress',
      ...address
    },
    openingHoursSpecification: openingHours.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.split(' ')[0],
      opens: hours.split(' ')[1]?.split('-')[0],
      closes: hours.split(' ')[1]?.split('-')[1]
    })),
    priceRange,
    ...(geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: geo.latitude,
        longitude: geo.longitude
      }
    })
  }

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
