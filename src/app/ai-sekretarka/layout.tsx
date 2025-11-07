import type { Metadata } from "next";

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
  },
};

export default function AISekretarkaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
