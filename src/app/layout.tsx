import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from '@vercel/analytics/react';
import { AnalyticsProvider } from '@/components/analytics';

// Export viewport separately (Next.js 15 requirement)
export { viewport } from './viewport';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.yieldo.pl'),
  title: {
    default: 'Yieldo - Inteligentna Automatyzacja Biznesu',
    template: '%s | Yieldo'
  },
  description: 'Yieldo dostarcza zaawansowanych agentów AI, którzy automatyzują obsługę klienta, sprzedaż i rezerwacje wizyt 24/7. Zwiększ zyski swojej firmy.',
  keywords: [
    'AI Sekretarka',
    'automatyzacja biznesu',
    'sztuczna inteligencja dla firm',
    'wirtualna recepcjonistka',
    'obsługa klienta AI',
    'automatyczne umawianie wizyt',
    'Booksy integracja AI',
    'Yieldo'
  ],
  authors: [{ name: 'Yieldo Team' }],
  creator: 'Yieldo',
  publisher: 'Yieldo',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://www.yieldo.pl',
    siteName: 'Yieldo',
    title: 'Yieldo - Inteligentna Automatyzacja Biznesu',
    description: 'Yieldo dostarcza zaawansowanych agentów AI, którzy automatyzują obsługę klienta, sprzedaż i rezerwacje wizyt 24/7.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yieldo AI Platform',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yieldo - Inteligentna Automatyzacja Biznesu',
    description: 'Zwiększ zyski swojej firmy dzięki agentom AI pracującym 24/7.',
    images: ['/og-image.jpg'],
    creator: '@yieldo_pl',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://www.yieldo.pl',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning className="scroll-smooth light" style={{ colorScheme: 'light' }}>
      <body className="antialiased font-sans selection:bg-blue-100 selection:text-blue-900 bg-white text-slate-900">
        {children}
        <Toaster />
        <Analytics />
        <AnalyticsProvider showCookieConsent />
      </body>
    </html>
  );
}
