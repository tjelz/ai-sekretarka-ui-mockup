import type { Metadata } from 'next'

export interface PageMetadataConfig {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
  noindex?: boolean
}

const SITE_NAME = 'Yieldo'
const SITE_URL = 'https://yieldo.pl'
const DEFAULT_OG_IMAGE = '/og-image.jpg'

export function generateMetadata(config: PageMetadataConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    ogImage = DEFAULT_OG_IMAGE,
    canonical,
    noindex = false
  } = config

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: url
    },
    openGraph: {
      type: 'website',
      locale: 'pl_PL',
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@yieldo_pl'
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5
    },
    verification: {
      google: 'your-google-verification-code'
    }
  }
}

export const defaultKeywords = [
  'AI Sekretarka',
  'automatyczna obsługa telefonów',
  'wirtualna sekretarka',
  'AI dla biznesu',
  'automatyzacja biznesu',
  'Yieldo',
  'obsługa klienta AI',
  'rezerwacje online',
  'umówienie wizyty'
]
