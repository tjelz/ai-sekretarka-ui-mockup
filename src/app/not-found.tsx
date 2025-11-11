'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Custom 404 Not Found Page
 *
 * Features:
 * - Friendly error message in Polish
 * - Multiple navigation options
 * - Search suggestions
 * - Animated entrance
 * - Mobile responsive
 */
export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-primary/10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl">🤖</div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Strona nie została znaleziona
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Przepraszamy, ale strona której szukasz nie istnieje lub została przeniesiona.
          </p>
        </div>

        {/* Popular Pages */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Popularne strony
          </h3>
          <div className="grid gap-2">
            <Link
              href="/"
              className="text-left px-4 py-3 rounded-md hover:bg-muted transition-colors group"
            >
              <div className="font-medium group-hover:text-primary transition-colors">
                Strona główna
              </div>
              <div className="text-sm text-muted-foreground">
                AI Sekretarka - Automatyczna obsługa telefonów
              </div>
            </Link>
            <Link
              href="/ai-sekretarka-demo"
              className="text-left px-4 py-3 rounded-md hover:bg-muted transition-colors group"
            >
              <div className="font-medium group-hover:text-primary transition-colors">
                Demo AI Sekretarki
              </div>
              <div className="text-sm text-muted-foreground">
                Zobacz jak działa nasza AI Sekretarka
              </div>
            </Link>
            <Link
              href="/kalkulator"
              className="text-left px-4 py-3 rounded-md hover:bg-muted transition-colors group"
            >
              <div className="font-medium group-hover:text-primary transition-colors">
                Kalkulator ROI
              </div>
              <div className="text-sm text-muted-foreground">
                Oblicz korzyści dla Twojej firmy
              </div>
            </Link>
            <Link
              href="/dashboard"
              className="text-left px-4 py-3 rounded-md hover:bg-muted transition-colors group"
            >
              <div className="font-medium group-hover:text-primary transition-colors">
                Panel klienta
              </div>
              <div className="text-sm text-muted-foreground">
                Zaloguj się do swojego konta
              </div>
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="min-w-[200px]">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Strona główna
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-w-[200px]">
            <Link href="/ai-sekretarka-demo">
              <Search className="mr-2 h-5 w-5" />
              Zobacz demo
            </Link>
          </Button>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Wróć do poprzedniej strony
        </button>

        {/* Help Text */}
        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Potrzebujesz pomocy? Skontaktuj się z nami:{' '}
            <a
              href="mailto:kontakt@yieldo.pl"
              className="text-primary hover:underline"
            >
              kontakt@yieldo.pl
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
