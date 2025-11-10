import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generateMetadata({
  title: 'Panel Klienta - Dashboard',
  description: 'Panel zarządzania kontem Yieldo. Statystyki połączeń, ustawienia AI Sekretarki i billing.',
  canonical: '/dashboard',
  noindex: true
})
