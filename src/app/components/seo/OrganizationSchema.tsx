import Script from 'next/script'

export interface OrganizationSchemaProps {
  name?: string
  url?: string
  logo?: string
  description?: string
  email?: string
  telephone?: string
  address?: {
    streetAddress?: string
    addressLocality?: string
    postalCode?: string
    addressCountry?: string
  }
  sameAs?: string[]
}

export default function OrganizationSchema({
  name = 'Yieldo',
  url = 'https://www.yieldo.pl',
  logo = 'https://www.yieldo.pl/logo.png',
  description = 'Profesjonalna AI Sekretarka dla Twojej firmy. Automatyczna obsługa telefonów 24/7, umawianie wizyt i zarządzanie klientami.',
  email = 'info.yieldo@gmail.com',
  telephone,
  address = {
    addressLocality: 'Warszawa',
    addressCountry: 'PL'
  },
  sameAs = [
    'https://www.linkedin.com/company/yieldopl/',
    'https://instagram.com/yieldo_pl',
    'https://x.com/yieldo_pl'
  ]
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo
    },
    description,
    email,
    ...(telephone && { telephone }),
    address: {
      '@type': 'PostalAddress',
      ...address
    },
    sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      ...(telephone && { telephone }),
      email,
      contactType: 'customer service',
      areaServed: 'PL',
      availableLanguage: ['Polish']
    }
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
