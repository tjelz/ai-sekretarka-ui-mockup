import type { Metadata } from 'next'
import { generateMetadata, defaultKeywords } from '@/lib/seo/metadata'

export const metadata: Metadata = generateMetadata({
  title: 'Tworzenie Stron Internetowych - Profesjonalne Strony WWW',
  description: 'Profesjonalne tworzenie stron internetowych dla firm. Nowoczesne, responsywne strony WWW zoptymalizowane pod SEO. Szybkie wdrożenie i konkurencyjne ceny.',
  keywords: [
    ...defaultKeywords,
    'tworzenie stron www',
    'strony internetowe',
    'projektowanie stron',
    'strony firmowe',
    'strony responsywne',
    'SEO',
    'strony na zamówienie',
    'development',
    'web design'
  ],
  canonical: '/website-creation'
})
