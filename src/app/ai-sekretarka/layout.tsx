import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Sekretarka 24/7 - Automatyczna Obsługa Telefonów | Yieldo",
  description: "AI Sekretarka odbiera telefony 24/7, umawia klientów automatycznie i wysyła SMS. Idealne rozwiązanie dla małych firm, salonów beauty i usług. Oszczędź czas i zwiększ przychody.",
  keywords: "AI Sekretarka, automatyczne umawianie wizyt, obsługa telefonów 24/7, rezerwacje online, asystent AI, sekretarka wirtualna",
  icons: {
    icon: '/favicon.jpeg',
    shortcut: '/favicon.jpeg',
    apple: '/favicon.jpeg',
  },
  openGraph: {
    title: "AI Sekretarka 24/7 - Twój Biznes Nigdy Nie Śpi",
    description: "Automatyczna obsługa połączeń, umawianie wizyt i SMS-y dla małych firm i salonów. Od 199 zł/mies.",
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
