import Script from 'next/script'

export interface WebPageSchemaProps {
  name: string
  description: string
  url: string
  breadcrumbs?: Array<{ name: string; url: string }>
}

export default function WebPageSchema({
  name,
  description,
  url,
  breadcrumbs = []
}: WebPageSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    publisher: {
      '@type': 'Organization',
      name: 'Yieldo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yieldo.com/logo.png'
      }
    },
    ...(breadcrumbs.length > 0 && {
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      }
    })
  }

  return (
    <Script
      id="webpage-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
