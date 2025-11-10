import type { Metadata } from 'next'
import { generateMetadata, defaultKeywords } from '@/lib/seo/metadata'

export const metadata: Metadata = generateMetadata({
  title: 'Demo AI Sekretarki - Zobacz Jak Działa w Praktyce',
  description: 'Interaktywne demo AI Sekretarki Yieldo. Przetestuj funkcjonalność, zobacz jak AI odbiera telefony, umawia wizyty i zarządza kalendarzem. Bezpłatne demo bez zobowiązań.',
  keywords: [
    ...defaultKeywords,
    'demo AI',
    'demo sekretarki',
    'test AI Sekretarki',
    'prezentacja systemu',
    'demo online',
    'trial',
    'bezpłatne demo'
  ],
  canonical: '/ai-sekretarka-demo',
  noindex: true // Demo page - nie indeksujemy
})
