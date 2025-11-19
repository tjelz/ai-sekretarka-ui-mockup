'use client';

import Link from 'next/link';
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Strona główna
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
