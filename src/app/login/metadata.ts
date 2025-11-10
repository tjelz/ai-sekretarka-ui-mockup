import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generateMetadata({
  title: 'Logowanie - Panel Klienta Yieldo',
  description: 'Zaloguj się do panelu klienta Yieldo. Zarządzaj swoją AI Sekretarką, sprawdzaj statystyki połączeń i konfiguruj ustawienia.',
  keywords: [
    'logowanie',
    'panel klienta',
    'dashboard',
    'Yieldo login',
    'konto użytkownika'
  ],
  canonical: '/login',
  noindex: true
})
