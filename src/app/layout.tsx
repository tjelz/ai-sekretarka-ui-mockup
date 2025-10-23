import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Yieldo - Agencja AI dla Nowoczesnych Firm | AI Sekretarka 24/7",
  description: "Automatyzujemy procesy biznesowe za pomocą AI. Nasza AI Sekretarka odbiera telefony 24/7, umawia klientów i wysyła SMS-y. Oszczędź czas i zwiększ efektywność swojej firmy.",
  keywords: "AI Sekretarka, automatyzacja biznesu, AI dla firm, asystent AI, obsługa telefonów AI, rezerwacje automatyczne",
  openGraph: {
    title: "Yieldo - AI Sekretarka 24/7 dla Twojej Firmy",
    description: "Automatyczna obsługa połączeń, umawianie wizyt i SMS-y. Twój biznes nigdy nie śpi.",
    type: "website",
    locale: "pl_PL",
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
      </body>
    </html>
  );
}
