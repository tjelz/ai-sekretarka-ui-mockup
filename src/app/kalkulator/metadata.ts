import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kalkulator Oszczędności - Ile Tracisz Przez Nieodebrane Telefony?',
  description: 'Oblicz ile pieniędzy tracisz przez nieodebrane telefony. Interaktywny kalkulator oszczędności pokazuje ROI AI Sekretarki dla Twojej firmy.',
  keywords: [
    'kalkulator strat',
    'nieodebrane telefony',
    'ROI AI Sekretarki',
    'stracone przychody',
    'kalkulator oszczędności',
    'wirtualna sekretarka ROI',
    'koszty nieobsługi klienta',
    'oszczędności w firmie'
  ],
  openGraph: {
    title: 'Kalkulator Oszczędności - Ile Tracisz Przez Nieodebrane Telefony?',
    description: 'Oblicz ile pieniędzy tracisz przez nieodebrane telefony. Interaktywny kalkulator oszczędności pokazuje ROI AI Sekretarki dla Twojej firmy.',
    type: 'website',
    url: 'https://yieldo.pl/kalkulator',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yieldo Kalkulator Oszczędności',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalkulator Oszczędności - Ile Tracisz Przez Nieodebrane Telefony?',
    description: 'Oblicz ile pieniędzy tracisz przez nieodebrane telefony i zobacz ROI AI Sekretarki.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://yieldo.pl/kalkulator',
  },
};
