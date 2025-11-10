import type { Metadata } from 'next'
import { generateMetadata, defaultKeywords } from '@/lib/seo/metadata'

export const homeMetadata: Metadata = generateMetadata({
  title: 'Yieldo - Wszystko, Czego Potrzebujesz Do Rozwoju Firmy',
  description: 'Kompleksowe rozwiązania AI dla nowoczesnych firm - od obsługi klientów przez AI Sekretarkę 24/7, tworzenie stron internetowych, po automatyzację dotacji. Rozwijaj swoją firmę z Yieldo.',
  keywords: [
    ...defaultKeywords,
    'rozwój firmy',
    'kompleksowe rozwiązania AI',
    'tworzenie stron www',
    'Google Business',
    'automatyzacja dotacji',
    'cyfrowa obecność'
  ],
  canonical: '/'
})

export const aiSekretarkaMetadata: Metadata = generateMetadata({
  title: 'AI Sekretarka - Automatyczna Obsługa Telefonów 24/7',
  description: 'Profesjonalna AI Sekretarka odbiera telefony 24/7, umawia wizyty automatycznie i wysyła SMS-y. Konfiguracja w 5 minut. Od 299 zł/miesiąc. Oszczędź czas i nie trać żadnego klienta.',
  keywords: [
    ...defaultKeywords,
    'recepcjonistka AI',
    'automatyczne umawianie wizyt',
    'odbieranie telefonów',
    'sekretarka wirtualna',
    'kalendarz wizyt',
    'Booksy',
    'Google Calendar',
    'SMS powiadomienia',
    'obsługa klienta 24/7'
  ],
  canonical: '/ai-sekretarka'
})

export const kalkulatorMetadata: Metadata = generateMetadata({
  title: 'Kalkulator Oszczędności - Ile Tracisz Przez Nieodebrane Telefony?',
  description: 'Oblicz ile pieniędzy tracisz przez nieodebrane telefony każdego dnia. Kalkulator ROI dla AI Sekretarki - zobacz swoje miesięczne i roczne straty oraz potencjalne oszczędności.',
  keywords: [
    ...defaultKeywords,
    'kalkulator strat',
    'nieodebrane telefony',
    'ROI AI Sekretarki',
    'kalkulator oszczędności',
    'stracone przychody',
    'wycena strat biznesowych'
  ],
  canonical: '/kalkulator'
})

export const digitalPresenceMetadata: Metadata = generateMetadata({
  title: 'Kompletna Obecność Online - Strona WWW + Google Business',
  description: 'Profesjonalna strona internetowa i optymalizacja Google Business Profile w jednym pakiecie. Zwiększ swoją widoczność online i przyciągnij więcej klientów.',
  keywords: [
    ...defaultKeywords,
    'strona internetowa',
    'Google Business Profile',
    'obecność online',
    'pozycjonowanie lokalne',
    'marketing lokalny',
    'widoczność w Google'
  ],
  canonical: '/digital-presence'
})

export const websiteCreationMetadata: Metadata = generateMetadata({
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
    'strony na zamówienie'
  ],
  canonical: '/website-creation'
})

export const googleBusinessMetadata: Metadata = generateMetadata({
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
    'opinie Google'
  ],
  canonical: '/google-business'
})

export const loginMetadata: Metadata = generateMetadata({
  title: 'Logowanie - Panel Klienta Yieldo',
  description: 'Zaloguj się do panelu klienta Yieldo. Zarządzaj swoją AI Sekretarką, sprawdzaj statystyki połączeń i konfiguruj ustawienia.',
  keywords: [
    'logowanie',
    'panel klienta',
    'dashboard',
    'Yieldo login'
  ],
  canonical: '/login',
  noindex: true
})

export const dashboardMetadata: Metadata = generateMetadata({
  title: 'Panel Klienta - Dashboard',
  description: 'Panel zarządzania kontem Yieldo. Statystyki połączeń, ustawienia AI Sekretarki i billing.',
  canonical: '/dashboard',
  noindex: true
})
