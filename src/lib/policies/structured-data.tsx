import Script from 'next/script';

interface WebPageSchemaProps {
  title: string;
  description: string;
  url: string;
  lastModified: string;
  policyType: 'PrivacyPolicy' | 'TermsOfService' | 'RefundPolicy';
}

export function PolicyStructuredData({ title, description, url, lastModified, policyType }: WebPageSchemaProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    name: title,
    description: description,
    url: url,
    dateModified: lastModified,
    inLanguage: 'pl-PL',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Yieldo',
      url: 'https://www.yieldo.pl',
    },
    about: {
      '@type': policyType,
      name: title,
      publisher: {
        '@type': 'Organization',
        name: 'Yieldo Sp. z o.o.',
        url: 'https://www.yieldo.pl',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.yieldo.pl/logo.png',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ul. Drukarska 3',
          addressLocality: 'Kraków',
          postalCode: '30-348',
          addressCountry: 'PL',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'info.yieldo@gmail.com',
          contactType: 'Customer Service',
          availableLanguage: 'Polish',
        },
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Strona główna',
          item: 'https://www.yieldo.pl',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Polityki',
          item: 'https://www.yieldo.pl/polityki',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: title,
          item: url,
        },
      ],
    },
  };

  return (
    <Script
      id={`policy-structured-data-${policyType}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
