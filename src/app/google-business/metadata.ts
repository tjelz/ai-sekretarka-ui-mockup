import type { Metadata } from 'next'
import { generateMetadata, defaultKeywords } from '@/lib/seo/metadata'

export const metadata: Metadata = generateMetadata({
  title: 'Optymalizacja Google Business Profile - Więcej Klientów z Google',
  description: 'Profesjonalna optymalizacja i zarządzanie profilem Google Business. Zwiększ widoczność lokalną, przyciągnij więcej klientów i buduj pozytywną reputację online.',
  keywords: [
    ...defaultKeywords,
    'Google Business Profile',
    'Google Moja Firma',
    'optymalizacja Google',
    'pozycjonowanie lokalne',
    'marketing lokalny',
    'widoczność w Google Maps',
    'opinie Google',
    'zarządzanie profilem',
    'GBP'
  ],
  canonical: '/google-business'
})
