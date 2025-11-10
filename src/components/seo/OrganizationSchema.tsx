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
  url = 'https://yieldo.com',
  logo = 'https://yieldo.com/logo.png',
  description = 'Profesjonalna AI Sekretarka dla Twojej firmy. Automatyczna obsługa telefonów 24/7, umawianie wizyt i zarządzanie klientami.',
  email = 'info.yieldo@gmail.com',
  telephone = '+48-123-456-789',
  address = {
    addressLocality: 'Warszawa',
    addressCountry: 'PL'
  },
  sameAs = [
    'https://www.facebook.com/yieldo',
    'https://www.linkedin.com/company/yieldo',
    'https://twitter.com/yieldo'
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
    telephone,
    address: {
      '@type': 'PostalAddress',
      ...address
    },
    sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone,
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
