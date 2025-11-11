import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  metadataBase: new URL('https://yieldo.pl'),
  title: {
    default: 'Yieldo - AI Sekretarka | Automatyczna Obsługa Telefonów 24/7',
    template: '%s | Yieldo'
  },
  description: 'Profesjonalna AI Sekretarka dla Twojej firmy. Automatyczna obsługa telefonów 24/7, umawianie wizyt i zarządzanie klientami. Oszczędź czas i zwiększ przychody.',
  keywords: [
    'AI Sekretarka',
    'automatyczna obsługa telefonów',
    'wirtualna sekretarka',
    'AI dla biznesu',
    'automatyzacja biznesu',
    'Yieldo',
    'obsługa klienta AI',
    'rezerwacje online',
    'umówienie wizyty',
    'asystent AI',
    'sekretarka 24/7'
  ],
  authors: [{ name: 'Yieldo' }],
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
    url: 'https://yieldo.pl',
    siteName: 'Yieldo',
    title: 'Yieldo - AI Sekretarka | Automatyczna Obsługa Telefonów 24/7',
    description: 'Profesjonalna AI Sekretarka dla Twojej firmy. Automatyczna obsługa telefonów 24/7, umawianie wizyt i zarządzanie klientami.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yieldo - AI Sekretarka',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yieldo - AI Sekretarka | Automatyczna Obsługa Telefonów 24/7',
    description: 'Profesjonalna AI Sekretarka dla Twojej firmy. Automatyczna obsługa telefonów 24/7, umawianie wizyt i zarządzanie klientami.',
    images: ['/og-image.jpg'],
    creator: '@yieldo_pl',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://yieldo.pl',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className="antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
