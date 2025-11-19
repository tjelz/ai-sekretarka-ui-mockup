import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, Caveat } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "AI Sekretarka 24/7 - Automatyczna Obsługa Telefonów | Yieldo",
  description: "AI Sekretarka odbiera telefony 24/7, umawia spotkania automatycznie i wysyła SMS. Idealne rozwiązanie dla małych firm, usług lokalnych i biznesów. Oszczędź czas i zwiększ przychody.",
  keywords: "AI Sekretarka, automatyczne umawianie spotkań, obsługa telefonów 24/7, rezerwacje online, asystent AI, sekretarka wirtualna, automatyzacja biznesu",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "AI Sekretarka 24/7 - Twój Biznes Nigdy Nie Śpi",
    description: "Automatyczna obsługa połączeń, umawianie spotkań i SMS-y dla małych firm i usług lokalnych. Od 299 zł/mies.",
    type: "website",
    locale: "pl_PL",
    images: [
      {
        url: '/banner.png',
        width: 1200,
        height: 630,
        alt: 'AI Sekretarka 24/7 - Yieldo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "AI Sekretarka 24/7 - Twój Biznes Nigdy Nie Śpi",
    description: "Automatyczna obsługa połączeń, umawianie spotkań i SMS-y dla małych firm i usług lokalnych. Od 299 zł/mies.",
    images: ['/banner.png'],
  },
};

export default function AISekretarkaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${plusJakartaSans.variable} ${outfit.variable} ${caveat.variable} font-sans bg-white text-slate-900 antialiased scroll-smooth`}>
      <style>{`
        :root {
          --font-sans: var(--font-plus-jakarta-sans);
          --font-codec: var(--font-outfit);
          --font-handwriting: var(--font-caveat);
        }
        body {
          font-family: var(--font-plus-jakarta-sans), sans-serif;
        }
        .font-sans {
          font-family: var(--font-plus-jakarta-sans), sans-serif;
        }
        .font-codec {
          font-family: var(--font-outfit), sans-serif;
        }
        .font-handwriting {
          font-family: var(--font-caveat), cursive;
        }
        html {
            scroll-padding-top: 100px;
        }
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 10px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f5f9;
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 5px;
            border: 2px solid #f1f5f9;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
        
        /* Custom Animations from Tailwind Config */
        @keyframes pulse-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
            animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes shimmer {
            0% { background-position: 0% 0; }
            100% { background-position: 200% 0; }
        }
        .animate-shimmer {
            animation: shimmer 2s linear infinite;
        }
        
        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
            animation: blob 7s infinite;
        }
        
        @keyframes border-rotate {
            0% { --border-angle: 0deg; }
            100% { --border-angle: 360deg; }
        }
        .animate-border-rotate {
            animation: border-rotate 4s linear infinite;
        }
        
        @keyframes button-shine {
            0% { left: -100%; }
            20% { left: 100%; }
            100% { left: 100%; }
        }
        .animate-button-shine {
            animation: button-shine 3s ease-in-out infinite;
        }

        .animation-delay-2000 {
            animation-delay: 2s;
        }
        .animation-delay-4000 {
            animation-delay: 4s;
        }
      `}</style>
      {children}
    </div>
  );
}
