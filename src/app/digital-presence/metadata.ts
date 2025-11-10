import type { Metadata } from 'next'
import { generateMetadata, defaultKeywords } from '@/lib/seo/metadata'

export const metadata: Metadata = generateMetadata({
  title: 'Kompletna Obecność Online - Strona WWW + Google Business',
  description: 'Profesjonalna strona internetowa i optymalizacja Google Business Profile w jednym pakiecie. Zwiększ swoją widoczność online i przyciągnij więcej klientów.',
  keywords: [
    ...defaultKeywords,
    'strona internetowa',
    'Google Business Profile',
    'obecność online',
    'pozycjonowanie lokalne',
    'marketing lokalny',
    'widoczność w Google',
    'pakiet digital',
    'kompleksowe rozwiązanie'
  ],
  canonical: '/digital-presence'
})
